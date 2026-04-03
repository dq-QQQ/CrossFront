# Chapter 8. Swift Concurrency 심화

Swift 5.5(iOS 15)에서 등장한 Swift Concurrency는 단순한 async/await 도입에 그치지 않습니다. Actor 모델, Sendable 프로토콜, AsyncStream, 구조화된 동시성(Structured Concurrency)에 이르기까지 언어 수준에서 동시성 안전성을 보장하는 완전한 체계입니다. 이 챕터에서는 Kotlin Coroutines, JavaScript Promise/async-await와 비교하면서 Swift Concurrency의 핵심 개념들을 실무 관점으로 깊이 있게 살펴봅니다.

> 💡 이 챕터는 **iOS 16+** 환경을 기준으로 합니다. Swift Concurrency의 일부 기능(예: `AsyncStream`, `withTaskCancellationHandler`)은 iOS 15에서 사용 가능하고, `Clock` API 등은 iOS 16+에 추가되었습니다.

---

## 1. Swift Concurrency가 해결하는 문제

### 기존 방식의 한계

iOS 개발 역사에서 비동기 처리는 Grand Central Dispatch(GCD)와 콜백 기반의 completion handler가 주류였습니다. 다음 코드를 보면 무엇이 문제인지 직관적으로 알 수 있습니다.

```swift
// ❌ 콜백 지옥 (Completion Handler)
func loadUserDashboard(userId: String) {
    ProfileService.fetch(userId: userId) { profile, error in
        guard let profile = profile else { return }
        FeedService.fetch(userId: userId) { feed, error in
            guard let feed = feed else { return }
            NotificationService.fetch(userId: userId) { notifications, error in
                guard let notifications = notifications else { return }
                DispatchQueue.main.async {
                    self.updateUI(profile: profile, feed: feed, notifications: notifications)
                }
            }
        }
    }
}
```

이 패턴의 문제점은 다음과 같습니다.

1. **에러 처리 누락 가능성**: `guard let`으로 nil을 막아도 에러 케이스를 조용히 무시하기 쉽습니다.
2. **데이터 레이스(Data Race)**: 여러 콜백이 같은 프로퍼티를 동시에 수정할 때 Xcode Thread Sanitizer(TSan)이 아니면 발견하기 어렵습니다.
3. **취소 불가**: 화면을 떠났을 때 진행 중인 요청을 취소할 표준 방법이 없습니다.
4. **유지보수 어려움**: 흐름을 따라가기 힘들고, 테스트 작성도 복잡합니다.

Swift Concurrency는 이 문제들을 **컴파일 타임**에 잡아냅니다. 데이터 레이스 경고, 메인 스레드 접근 강제, Sendable 검사가 모두 컴파일 단계에서 동작합니다.

### Swift Concurrency 핵심 구성 요소

| 구성 요소 | 역할 | 비교 |
|-----------|------|------|
| `async/await` | 비동기 코드를 동기처럼 작성 | Kotlin suspend, JS async/await |
| `Task` | 비동기 작업 단위 | Coroutine Job, Promise |
| `Actor` | 공유 상태를 안전하게 격리 | synchronized class, Monitor |
| `@MainActor` | 메인 스레드 실행 보장 | Dispatchers.Main, runOnUiThread |
| `Sendable` | 스레드 간 안전한 값 전달 검증 | (컴파일러 수준 — 타 언어 없음) |
| `AsyncStream` | 비동기 스트림 생성 | callbackFlow, ReadableStream |
| `AsyncSequence` | 비동기 시퀀스 소비 | Flow collect, for await...of |
| `withTaskGroup` | 동적 병렬 작업 | async/awaitAll, Promise.all |
| `async let` | 선언적 병렬 시작 | async { }.await(), Promise 변수 |
| `withCheckedContinuation` | 콜백을 async로 변환 | suspendCoroutine, new Promise() |

---

## 2. Actor — 동시성 안전한 상태 관리

### Actor란 무엇인가?

Actor는 **내부 상태에 대한 직렬화된 접근을 컴파일러가 강제**하는 참조 타입입니다. 클래스처럼 정의하지만, actor로 선언한 타입의 저장 프로퍼티와 메서드는 동시에 하나의 호출만 실행될 수 있습니다. 이를 **actor isolation**이라고 합니다.

```swift
// actor 선언 — 클래스와 문법이 유사
actor Counter {
    private var count = 0

    func increment() {
        count += 1
    }

    func reset() {
        count = 0
    }

    var value: Int { count }
}
```

외부에서 `count`에 직접 접근하려 하면 컴파일 오류가 발생합니다.

```swift
let counter = Counter()
// counter.count = 10  // ❌ error: property 'count' is inaccessible due to 'private' protection level
// counter.increment()  // ❌ error: expression is 'async' but is not marked with 'await'
await counter.increment()  // ✅
let v = await counter.value  // ✅
```

### Actor vs 클래스 + Mutex 비교

COMPARE_BLOCK:concurrency_actor_basics

Actor의 핵심 장점은 Mutex나 `synchronized` 블록을 직접 관리할 필요가 없다는 점입니다. 개발자가 Lock을 잊어버리는 실수를 컴파일러가 원천 차단합니다.

### Actor Reentrancy (재진입성)

Actor는 `await` 포인트에서 다른 작업을 처리할 수 있습니다. 이를 **Actor Reentrancy**라고 합니다.

```swift
actor ImageCache {
    private var cache: [String: UIImage] = [:]
    private var loadingTasks: [String: Task<UIImage, Error>] = [:]

    func image(for url: String) async throws -> UIImage {
        // 캐시에 있으면 즉시 반환
        if let cached = cache[url] { return cached }

        // 이미 로딩 중인 Task가 있으면 그것을 기다림 (중복 요청 방지)
        if let existingTask = loadingTasks[url] {
            return try await existingTask.value
        }

        // 새 Task 시작
        let task = Task<UIImage, Error> {
            let (data, _) = try await URLSession.shared.data(from: URL(string: url)!)
            guard let image = UIImage(data: data) else {
                throw ImageError.invalidData
            }
            return image
        }

        loadingTasks[url] = task

        do {
            // ⚠️ await 포인트 — 다른 actor 메서드가 실행될 수 있음
            let image = try await task.value
            cache[url] = image
            loadingTasks[url] = nil
            return image
        } catch {
            loadingTasks[url] = nil
            throw error
        }
    }
}
```

> 💡 **Android 개발자라면**: Kotlin Mutex의 `withLock`도 비슷하지만, 블록 안에서 `suspend` 함수를 호출하면 잠금을 유지한 채로 중단합니다. Actor는 `await`에서 잠금을 자동으로 해제하고, 재개될 때 다시 획득합니다. 이 차이가 교착 상태(Deadlock) 발생 가능성을 크게 줄입니다.

### nonisolated — actor에서 일부를 격리 해제

```swift
actor UserManager {
    private var users: [String: User] = [:]
    let version = "1.0"  // 불변 값

    // nonisolated — await 없이 호출 가능
    // (상태를 읽지 않는 순수 계산)
    nonisolated func displayName(for id: String) -> String {
        "User-\(id)"
    }

    // nonisolated var — 불변(let)이거나 명시적으로 안전할 때
    nonisolated var description: String {
        "UserManager v\(version)"
    }
}

let manager = UserManager()
// nonisolated 멤버는 await 불필요
print(manager.description)  // ✅ await 없이 호출 가능
print(manager.displayName(for: "123"))
```

---

## 3. @MainActor — 메인 스레드 보장

### 왜 @MainActor가 필요한가?

UIKit과 SwiftUI는 모두 메인 스레드에서만 UI를 업데이트해야 합니다. 백그라운드 스레드에서 `UILabel.text`를 바꾸면 앱이 크래시하거나 예측 불가한 동작이 발생합니다. 기존에는 이를 개발자가 수동으로 `DispatchQueue.main.async { }` 로 처리했지만, @MainActor는 이를 **컴파일 타임 규칙**으로 바꿉니다.

COMPARE_BLOCK:concurrency_main_actor

### @MainActor의 작동 원리

`@MainActor`는 특수한 전역 Actor입니다. 주요 특징은 다음과 같습니다.

- `@MainActor`로 마킹된 모든 코드는 메인 스레드에서 실행됩니다.
- `@MainActor`가 아닌 컨텍스트에서 `@MainActor` 메서드를 호출하면 `await`이 필요합니다.
- SwiftUI의 `View`, `ObservableObject`의 `@Published` 등은 이미 `@MainActor`에서 동작합니다.

```swift
@MainActor
class ViewModel: ObservableObject {
    @Published var title = ""

    // 이 메서드는 메인 스레드에서 실행됨
    func updateTitle(_ newTitle: String) {
        title = newTitle  // 안전 — 메인 스레드
    }

    func fetchAndUpdate() async {
        // Task 내부의 await 후에도 @MainActor가 유지됨
        let result = try? await APIService.fetchTitle()
        title = result ?? "오류"  // 여전히 메인 스레드
    }
}
```

### Task의 스레드 상속

`Task { }` 는 생성된 컨텍스트의 actor를 상속합니다. `Task.detached { }` 는 어떤 actor도 상속하지 않습니다.

```swift
@MainActor
class SomeViewModel: ObservableObject {
    func doWork() {
        // Task — @MainActor 컨텍스트 상속
        Task {
            // 이 Task는 @MainActor에서 실행 시작
            await someAsyncWork()
            title = "완료"  // ✅ 여전히 @MainActor
        }

        // Task.detached — actor 미상속
        Task.detached {
            await someAsyncWork()
            // await self.updateTitle()  // @MainActor 필요 → await
            await MainActor.run {
                self.title = "완료"  // 명시적으로 메인으로 hop
            }
        }
    }
}
```

> 💡 **웹 개발자라면**: React의 상태 업데이트는 항상 렌더 사이클에 맞춰 배치 처리됩니다. @MainActor는 이보다 더 저수준으로, 실제 OS 스레드 수준에서 실행 컨텍스트를 보장합니다. React에서 비동기 작업 후 setState를 호출하는 것과 Swift에서 @MainActor 메서드를 await하는 것은 개념적으로 유사하지만, @MainActor는 컴파일러가 강제합니다.

---

## 4. Sendable — 타입 안전한 동시성

### Sendable이 필요한 이유

여러 스레드나 Actor 사이에 값을 전달할 때, 그 값이 안전하게 공유될 수 있는지를 Swift 컴파일러가 `Sendable` 프로토콜로 검증합니다.

COMPARE_BLOCK:concurrency_sendable

### Sendable 적합 조건

Swift에서 타입이 `Sendable`이 되려면 다음 조건 중 하나를 만족해야 합니다.

| 조건 | 예시 |
|------|------|
| 값 타입 (struct/enum)이고 모든 저장 프로퍼티가 Sendable | `struct Point: Sendable { let x: Double; let y: Double }` |
| `final class`이고 모든 저장 프로퍼티가 불변(let) | `final class Config: Sendable { let url: String }` |
| `actor` | 기본적으로 Sendable |
| 기본 타입 | `Int`, `String`, `Bool`, `Double` 등 |
| 표준 컬렉션 (요소가 Sendable이면) | `[String]`, `[Int: Bool]` 등 |

```swift
// ✅ Sendable — 모든 프로퍼티가 Sendable한 struct
struct Message: Sendable {
    let id: UUID
    let text: String
    let timestamp: Date
}

// ❌ Sendable 불가 — 가변 클래스 프로퍼티
struct BrokenState: Sendable {
    var controller: UIViewController  // ❌ UIViewController는 @MainActor에 격리됨
}

// ✅ @unchecked Sendable — 직접 보장할 때
final class LockProtectedCache: @unchecked Sendable {
    private var data: [String: Any] = [:]
    private let lock = NSLock()

    func set(_ value: Any, for key: String) {
        lock.withLock { data[key] = value }
    }
}
```

### Sendable과 클로저

`@Sendable` 어노테이션은 클로저가 동시성 컨텍스트에서 안전하게 사용될 수 있음을 나타냅니다.

```swift
// Task는 @Sendable 클로저를 요구
func Task<Success>(
    priority: TaskPriority? = nil,
    operation: @escaping @Sendable () async throws -> Success
) -> Task<Success, Error>

// @Sendable 클로저는 가변 캡처 불가
var counter = 0
Task {
    counter += 1  // ⚠️ Swift 6에서 에러: mutation of captured var 'counter' in concurrently-executing code
}

// ✅ 해결: Actor나 값 복사 사용
actor SafeCounter {
    var count = 0
    func increment() { count += 1 }
}

let safeCounter = SafeCounter()
Task { await safeCounter.increment() }
```

### Swift 6 Strict Concurrency

Swift 6에서는 동시성 안전 검사가 기본 활성화됩니다. 마이그레이션 준비를 위해 Xcode에서 `SWIFT_STRICT_CONCURRENCY = complete`로 설정해 미리 경고를 확인할 수 있습니다.

```swift
// Swift 6 대비 — 명시적 Sendable 채택
struct ApiResponse: Sendable, Codable {
    let status: Int
    let data: String
}

// actor 기반 상태 관리로 전환
actor AppState {
    var currentUser: User?
    var isLoggedIn: Bool { currentUser != nil }
}
```

---

## 5. AsyncStream — 비동기 스트림 생성

### AsyncStream의 위치

Swift Concurrency에서 데이터 스트림을 다루는 계층은 다음과 같습니다.

```
AsyncSequence (프로토콜)
├── AsyncStream<Element>       — 버퍼링, 취소 지원
├── AsyncThrowingStream<E, Error>  — 에러 throw 가능
└── 커스텀 AsyncSequence 구현
```

`AsyncStream`은 콜백/델리게이트 기반 API를 `AsyncSequence`로 변환하거나, 새로운 비동기 스트림을 생성할 때 사용하는 핵심 타입입니다.

COMPARE_BLOCK:concurrency_async_stream

### AsyncStream 버퍼 전략

`AsyncStream`은 생성 시 버퍼 전략을 지정할 수 있습니다.

```swift
// bufferingPolicy — 버퍼가 가득 찰 때 동작
let stream = AsyncStream(Int.self, bufferingPolicy: .bufferingNewest(10)) { continuation in
    // 최신 10개만 유지, 오래된 것은 drop
    for i in 0... {
        continuation.yield(i)
    }
}

// bufferingOldest — 오래된 것 유지 (새 것 drop)
let stream2 = AsyncStream(Int.self, bufferingPolicy: .bufferingOldest(5)) { continuation in
    // ...
}

// unbounded — 무제한 버퍼 (메모리 주의)
let stream3 = AsyncStream(Int.self, bufferingPolicy: .unbounded) { continuation in
    // ...
}
```

### 실전 패턴 — NotificationCenter를 AsyncStream으로

```swift
extension NotificationCenter {
    func notifications(
        named name: Notification.Name,
        object: AnyObject? = nil
    ) -> AsyncStream<Notification> {
        AsyncStream { continuation in
            let observer = self.addObserver(
                forName: name,
                object: object,
                queue: nil
            ) { notification in
                continuation.yield(notification)
            }

            continuation.onTermination = { [weak self] _ in
                self?.removeObserver(observer)
            }
        }
    }
}

// 사용
Task {
    for await notification in NotificationCenter.default
        .notifications(named: UIApplication.didBecomeActiveNotification) {
        print("앱 활성화됨: \(notification)")
    }
}
```

### 실전 패턴 — WebSocket을 AsyncStream으로

```swift
func webSocketMessages(url: URL) -> AsyncThrowingStream<String, Error> {
    AsyncThrowingStream { continuation in
        let task = URLSession.shared.webSocketTask(with: url)
        task.resume()

        Task {
            do {
                while true {
                    let message = try await task.receive()
                    switch message {
                    case .string(let text):
                        continuation.yield(text)
                    case .data(let data):
                        if let text = String(data: data, encoding: .utf8) {
                            continuation.yield(text)
                        }
                    @unknown default:
                        break
                    }
                }
            } catch {
                continuation.finish(throwing: error)
            }
        }

        continuation.onTermination = { _ in
            task.cancel(with: .goingAway, reason: nil)
        }
    }
}
```

---

## 6. AsyncSequence 소비 — 연산자와 패턴

### for await in 구문

`AsyncSequence`를 소비하는 기본 방법은 `for await in` 루프입니다. `break`를 만나면 시퀀스가 자동으로 취소됩니다.

COMPARE_BLOCK:concurrency_async_sequence

### 내장 AsyncSequence

Swift 표준 라이브러리와 Foundation에는 유용한 AsyncSequence 구현들이 포함되어 있습니다.

| 타입 | 용도 |
|------|------|
| `URLSession.AsyncBytes` | HTTP 바이트 스트리밍 |
| `URLSession.AsyncBytes.lines` | HTTP 라인 스트리밍 (SSE 등) |
| `FileHandle.AsyncBytes` | 파일 바이트 스트리밍 |
| `AsyncStream<T>` | 커스텀 스트림 |
| `AsyncThrowingStream<T, E>` | 에러 있는 커스텀 스트림 |

```swift
// URLSession 라인 스트리밍 — LLM 스트리밍 응답 처리 예시
func streamChatResponse(prompt: String) async throws {
    var request = URLRequest(url: URL(string: "https://api.example.com/chat")!)
    request.httpMethod = "POST"
    request.setValue("text/event-stream", forHTTPHeaderField: "Accept")
    request.httpBody = try JSONEncoder().encode(["prompt": prompt])

    let (bytes, _) = try await URLSession.shared.bytes(for: request)

    for try await line in bytes.lines {
        guard line.hasPrefix("data: "),
              let data = line.dropFirst(6).data(using: .utf8),
              let chunk = try? JSONDecoder().decode(ChatChunk.self, from: data)
        else { continue }

        await MainActor.run {
            appendText(chunk.content)
        }
    }
}
```

---

## 7. Structured Concurrency — TaskGroup

### 구조화된 동시성이란?

Structured Concurrency는 Task의 생명주기가 **스코프에 묶이는** 패턴입니다. 스코프를 벗어나면 모든 자식 Task가 완료되거나 취소됩니다. 이는 메모리 누수와 "불꽃(fire-and-forget)" 패턴을 방지합니다.

```
async let ─────────────────── 선언적, 고정된 수
withTaskGroup ─────────────── 동적, 가변 수
withThrowingTaskGroup ──────── 동적 + 에러 지원
```

COMPARE_BLOCK:concurrency_task_group

### TaskGroup 고급 패턴

```swift
// 결과를 스트리밍으로 처리 — 완료되는 즉시 UI 업데이트
func fetchAndDisplayProfiles(userIds: [String]) async {
    await withTaskGroup(of: Profile?.self) { group in
        for userId in userIds {
            group.addTask {
                try? await ProfileService.fetch(userId: userId)
            }
        }

        // 완료되는 순서로 처리 (순서 보장 없음)
        for await profile in group {
            if let profile {
                await MainActor.run {
                    self.profiles.append(profile)  // 완료될 때마다 즉시 추가
                }
            }
        }
    }
}

// 조기 종료 패턴 — 첫 성공 시 나머지 취소
func fetchFromFastestServer(urls: [URL]) async throws -> Data {
    try await withThrowingTaskGroup(of: Data.self) { group in
        for url in urls {
            group.addTask {
                try await URLSession.shared.data(from: url).0
            }
        }

        // 첫 번째 성공한 결과 반환, 나머지 취소
        guard let first = try await group.next() else {
            throw FetchError.allFailed
        }
        group.cancelAll()  // 나머지 Task 취소
        return first
    }
}
```

> 💡 **Android 개발자라면**: Kotlin의 `supervisorScope`에 해당하는 Swift 패턴은 `withTaskGroup` (non-throwing) 입니다. 하나의 자식 Task가 실패해도 다른 자식들이 계속 실행됩니다. `withThrowingTaskGroup`은 자식 중 하나가 throw하면 전체 그룹을 취소하는 일반 `coroutineScope`에 가깝습니다.

---

## 8. async let — 선언적 병렬 실행

### async let의 동작 원리

`async let`은 오른쪽 표현식을 **즉시 별도 Task로 시작**하고, `await`할 때까지 결과를 보류합니다. 여러 `async let`을 동시에 선언하면 모두 병렬로 실행됩니다.

COMPARE_BLOCK:concurrency_async_let

### async let vs withTaskGroup 선택 기준

| 상황 | 권장 방법 |
|------|----------|
| 작업 수가 컴파일 타임에 고정 | `async let` |
| 배열을 병렬로 처리 (동적 수) | `withTaskGroup` |
| 각 결과 타입이 다름 | `async let` |
| 중간 결과를 스트리밍 처리 | `withTaskGroup` |
| 최대 동시 실행 수 제한 필요 | `withTaskGroup` (직접 구현) |

```swift
// ✅ async let — 타입이 다른 3개 병렬 요청
func loadDetailPage(itemId: String) async throws -> DetailPage {
    async let item: Item = ItemService.fetch(id: itemId)
    async let reviews: [Review] = ReviewService.fetch(itemId: itemId)
    async let similar: [Item] = SimilarService.fetch(itemId: itemId)

    return try await DetailPage(
        item: item,
        reviews: reviews,
        similar: similar
    )
}

// ✅ withTaskGroup — 배열 크기가 런타임에 결정
func fetchAllItems(ids: [String]) async -> [Item] {
    await withTaskGroup(of: Item?.self) { group in
        for id in ids {
            group.addTask { try? await ItemService.fetch(id: id) }
        }
        var items: [Item] = []
        for await item in group {
            if let item { items.append(item) }
        }
        return items
    }
}
```

---

## 9. Task 취소 — 협력적 취소 모델

### Swift의 취소 철학

Swift Concurrency의 취소는 **협력적(Cooperative)** 입니다. 취소를 요청해도 즉시 중단되지 않고, Task 내부에서 취소 상태를 주기적으로 확인해야 합니다. 이는 리소스가 올바르게 정리될 수 있도록 보장합니다.

COMPARE_BLOCK:concurrency_cancellation

### 취소 전파 규칙

```
부모 Task 취소
    ├── 자식 Task 자동 취소 (structured)
    ├── async let 자동 취소
    └── TaskGroup의 모든 Task 취소

단, Task.detached는 부모와 무관 (unstructured)
```

### withTaskCancellationHandler 심화

```swift
// 네트워크 요청 + 즉각적인 취소 응답
func downloadImage(url: URL) async throws -> UIImage {
    // dataTask는 URLSession level에서 취소 지원
    let dataTask = Task<UIImage, Error> {
        let (data, response) = try await URLSession.shared.data(from: url)
        guard let image = UIImage(data: data) else {
            throw ImageError.invalidData
        }
        return image
    }

    return try await withTaskCancellationHandler {
        try await dataTask.value
    } onCancel: {
        // 즉시, 어느 스레드에서든 호출됨
        // 동기 코드만 허용
        dataTask.cancel()
    }
}

// SwiftUI에서 뷰 생명주기와 연동
struct ArticleView: View {
    @State private var article: Article?
    @State private var loadTask: Task<Void, Never>?

    var body: some View {
        Group {
            if let article { ArticleContent(article: article) }
            else { ProgressView() }
        }
        .onAppear {
            loadTask = Task {
                article = try? await ArticleService.fetch(id: articleId)
            }
        }
        .onDisappear {
            loadTask?.cancel()  // 화면 이탈 시 명시적 취소
        }
        // 또는 .task { } 수정자 사용 — 자동으로 생명주기와 연동
    }
}
```

### .task 뷰 수정자 — 자동 취소

SwiftUI에서 `.task { }` 수정자는 뷰가 나타날 때 Task를 시작하고, 사라질 때 자동으로 취소합니다.

```swift
struct UserListView: View {
    @State private var users: [User] = []

    var body: some View {
        List(users) { UserRow(user: $0) }
            .task {
                // 뷰가 사라지면 자동 취소
                do {
                    users = try await UserService.fetchAll()
                } catch is CancellationError {
                    // 정상 취소 — 처리 불필요
                } catch {
                    print("오류: \(error)")
                }
            }
    }
}
```

> 💡 **Android 개발자라면**: `.task { }` 는 `LaunchedEffect(Unit) { }`과 정확히 대응합니다. Compose의 `LaunchedEffect`도 컴포저블이 Composition에서 제거될 때 자동으로 코루틴을 취소합니다.

---

## 10. withCheckedContinuation — 레거시 API 브릿지

### 언제 사용하는가?

iOS SDK에는 아직 `async/await`을 지원하지 않는 구버전 API들이 많습니다. `withCheckedContinuation`은 이러한 콜백 기반 API를 `async` 함수로 래핑할 때 사용합니다.

COMPARE_BLOCK:concurrency_continuation

### 주의사항 — Resume은 정확히 한 번

`continuation.resume()`은 **반드시 정확히 한 번** 호출해야 합니다.

```swift
// ❌ 위험 — resume 두 번 호출 가능성
func dangerousWrap(completion: @escaping (String?, Error?) -> Void) async throws -> String {
    try await withCheckedThrowingContinuation { continuation in
        completion("result", nil)  // resume 1번
        completion(nil, SomeError.unknown)  // resume 2번 → 크래시 (Checked)
    }
}

// ✅ 안전 — guard로 단 한 번만 resume
class SafeDelegate: NSObject, SomeDelegate {
    private var continuation: CheckedContinuation<String, Error>?

    func wrap() async throws -> String {
        try await withCheckedThrowingContinuation { [weak self] continuation in
            self?.continuation = continuation
            startOperation()
        }
    }

    func operationDidSucceed(_ result: String) {
        continuation?.resume(returning: result)
        continuation = nil  // nil로 만들어 중복 resume 방지
    }

    func operationDidFail(_ error: Error) {
        continuation?.resume(throwing: error)
        continuation = nil
    }
}
```

### Checked vs Unsafe Continuation

| 타입 | 특징 | 사용 시점 |
|------|------|----------|
| `withCheckedContinuation` | 잘못된 사용(0번/2번 resume) 감지, 크래시 | 개발 중, 코드 신뢰도가 낮을 때 |
| `withCheckedThrowingContinuation` | Checked + 에러 throw 가능 | 개발 중, 에러 있는 콜백 |
| `withUnsafeContinuation` | 검사 없음, 약간 빠름 | 성능 최적화, 코드가 100% 확실할 때 |
| `withUnsafeThrowingContinuation` | Unsafe + 에러 throw | 위와 동일 |

---

## 11. 실전 패턴 모음

### 패턴 1 — Repository 계층의 Actor

```swift
actor UserRepository {
    private var cache: [String: User] = [:]
    private var pendingRequests: [String: Task<User, Error>] = [:]

    private let networkClient: NetworkClient

    init(networkClient: NetworkClient) {
        self.networkClient = networkClient
    }

    func user(id: String) async throws -> User {
        // 캐시 히트
        if let cached = cache[id] { return cached }

        // 중복 요청 방지 (요청 병합)
        if let pending = pendingRequests[id] {
            return try await pending.value
        }

        let task = Task<User, Error> { [weak self] in
            guard let self else { throw RepositoryError.deallocated }
            let user = try await networkClient.fetchUser(id: id)
            await self.store(user: user, for: id)
            return user
        }

        pendingRequests[id] = task

        do {
            let user = try await task.value
            pendingRequests[id] = nil
            return user
        } catch {
            pendingRequests[id] = nil
            throw error
        }
    }

    private func store(user: User, for id: String) {
        cache[id] = user
    }

    func invalidate(id: String) {
        cache[id] = nil
    }

    func invalidateAll() {
        cache.removeAll()
    }
}
```

### 패턴 2 — AsyncStream 기반 상태 머신

```swift
enum ConnectionState {
    case disconnected, connecting, connected, failed(Error)
}

actor ConnectionManager {
    private var state: ConnectionState = .disconnected
    private var subscribers: [UUID: AsyncStream<ConnectionState>.Continuation] = [:]

    var stateStream: AsyncStream<ConnectionState> {
        AsyncStream { [weak self] continuation in
            let id = UUID()
            Task { await self?.addSubscriber(id: id, continuation: continuation) }

            continuation.onTermination = { [weak self] _ in
                Task { await self?.removeSubscriber(id: id) }
            }
        }
    }

    private func addSubscriber(id: UUID, continuation: AsyncStream<ConnectionState>.Continuation) {
        continuation.yield(state)  // 현재 상태 즉시 전달
        subscribers[id] = continuation
    }

    private func removeSubscriber(id: UUID) {
        subscribers[id] = nil
    }

    private func updateState(_ newState: ConnectionState) {
        state = newState
        subscribers.values.forEach { $0.yield(newState) }
    }

    func connect() async {
        updateState(.connecting)
        do {
            try await networkConnect()
            updateState(.connected)
        } catch {
            updateState(.failed(error))
        }
    }
}

// 사용
let manager = ConnectionManager()
Task {
    for await state in await manager.stateStream {
        switch state {
        case .connected: print("연결됨")
        case .failed(let error): print("실패: \(error)")
        default: break
        }
    }
}
```

### 패턴 3 — 재시도 로직

```swift
func retry<T: Sendable>(
    maxAttempts: Int,
    delay: Duration,
    operation: @Sendable () async throws -> T
) async throws -> T {
    var lastError: Error?

    for attempt in 1...maxAttempts {
        do {
            return try await operation()
        } catch is CancellationError {
            throw CancellationError()  // 취소는 재시도하지 않음
        } catch {
            lastError = error
            if attempt < maxAttempts {
                // 지수 백오프
                let backoff = Duration.seconds(pow(2.0, Double(attempt - 1)))
                try await Task.sleep(for: min(backoff, delay))
            }
        }
    }

    throw lastError ?? FetchError.unknown
}

// 사용
let data = try await retry(maxAttempts: 3, delay: .seconds(30)) {
    try await APIService.fetchData()
}
```

---

## 12. 성능과 디버깅

### Swift Concurrency 스레드 모델

Swift Concurrency는 **협력적 스레드 풀(Cooperative Thread Pool)** 을 사용합니다. 스레드 수는 CPU 코어 수에 맞게 자동 조정됩니다. GCD와 달리 스레드를 블로킹(blocking)하는 것을 피해야 합니다.

```swift
// ❌ 블로킹 — 스레드 풀을 소모함
Task {
    Thread.sleep(forTimeInterval: 5)  // 스레드 블로킹 — 풀 고갈 가능
    doWork()
}

// ✅ 비블로킹 — 스레드를 반환하고 대기
Task {
    try await Task.sleep(for: .seconds(5))  // 스레드 반환
    doWork()
}

// ❌ 동기 블로킹 I/O
Task {
    let data = try Data(contentsOf: url)  // 동기 I/O — 블로킹
}

// ✅ 비동기 I/O
Task {
    let (data, _) = try await URLSession.shared.data(from: url)
}
```

### Instruments로 Concurrency 분석

Xcode의 Instruments에는 Swift Concurrency 전용 템플릿이 있습니다.

- **Swift Concurrency Instrument**: Task 생성/소멸, Actor 대기 시간 시각화
- **Thread Performance Checker**: 메인 스레드 블로킹 감지
- **Hangs**: 메인 스레드 블로킹으로 인한 앱 무응답 감지

```swift
// os_signpost로 Task 구간 마킹
import os.signpost

let log = OSLog(subsystem: "com.example.app", category: "networking")

func fetchData() async throws -> Data {
    let signpostID = OSSignpostID(log: log)
    os_signpost(.begin, log: log, name: "fetchData", signpostID: signpostID)
    defer { os_signpost(.end, log: log, name: "fetchData", signpostID: signpostID) }

    return try await URLSession.shared.data(from: apiURL).0
}
```

### 흔한 실수와 해결법

| 실수 | 증상 | 해결 |
|------|------|------|
| `Task.detached`를 습관적으로 사용 | 메모리 누수, 취소 미전파 | `Task { }` 사용 (context 상속) |
| `actor` 외부에서 직접 프로퍼티 접근 | 컴파일 오류 | `await`으로 접근 |
| `continuation.resume` 누락 | Task가 영원히 대기 (메모리 누수) | `defer { continuation.resume(...) }` |
| 동기 코드를 `Task`로 감싸기 | 불필요한 오버헤드 | 동기 코드는 그대로 사용 |
| `@MainActor`에서 대용량 계산 | UI 지연(jank) | `Task.detached` + 결과만 @MainActor로 |
| Actor 내에서 긴 동기 작업 | 다른 Task의 Actor 접근 지연 | 작업을 `Task.detached`로 분리 |

---

## 정리

Swift Concurrency는 단순한 문법적 편의를 넘어 **언어 수준에서 동시성 안전성을 보장**하는 체계입니다.

- **Actor**: 공유 상태를 격리하여 데이터 레이스를 컴파일 타임에 방지
- **@MainActor**: 메인 스레드 접근을 컴파일러가 보장
- **Sendable**: 스레드 간 안전하지 않은 값 전달을 컴파일 타임에 차단
- **AsyncStream**: 콜백/델리게이트 기반 API를 비동기 시퀀스로 래핑
- **AsyncSequence**: `for await in`으로 비동기 스트림을 동기 루프처럼 소비
- **withTaskGroup**: 동적 수의 병렬 작업을 구조화된 방식으로 관리
- **async let**: 고정된 수의 작업을 선언적으로 병렬 실행
- **Task 취소**: 협력적 취소 모델로 리소스 누수 방지
- **withCheckedContinuation**: 레거시 API를 현대적인 async/await으로 브릿지

Swift 6로 전환되면서 Strict Concurrency 검사가 기본 활성화됩니다. 지금부터 `SWIFT_STRICT_CONCURRENCY = complete`로 설정하고 경고를 해결해 두면 마이그레이션 비용을 크게 줄일 수 있습니다.
