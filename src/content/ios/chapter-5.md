# Chapter 5. 앱 구조 — 아키텍처

앱이 점점 커지면 가장 먼저 느끼는 고통은 "어디서 이 버그가 나는 거지?"입니다. 뷰 코드와 비즈니스 로직이 뒤섞여 있고, 동일한 API 호출이 세 군데에 중복되어 있고, 테스트를 작성하려고 해도 UI가 없으면 실행 자체가 안 되는 상황. 아키텍처는 이런 문제를 예방하기 위한 코드 배치 설계입니다.

이 챕터에서는 iOS/SwiftUI 앱을 구조화하는 방법을 단계적으로 배웁니다. **왜 구조가 필요한지**, **MVVM 패턴의 핵심 도구들**, **의존성 주입**, **Repository 패턴**까지, 실전 뉴스 앱을 함께 만들면서 익혀봅니다.

---

## 1. 아키텍처가 왜 중요한가

### 뷰에 모든 것을 넣으면 생기는 일

처음 SwiftUI를 배울 때 가장 빠른 방법은 View 안에 모든 것을 쓰는 것입니다. API 호출, 상태 변수, 버튼 액션 로직, 날짜 포매팅, 에러 처리—전부 `body` 프로퍼티 주변에 몰아넣습니다. 처음 몇 화면은 괜찮습니다. 그러나 앱이 자라면서 다음과 같은 문제들이 나타납니다.

- **테스트 불가**: 비즈니스 로직이 View 안에 있으면 SwiftUI 런타임 없이는 테스트가 불가능합니다. 네트워크 없이 로직만 검증하고 싶어도 View를 통째로 초기화해야 합니다.
- **재사용 불가**: 같은 API 호출이 다른 화면에서도 필요할 때, 복붙하게 됩니다. 나중에 엔드포인트가 바뀌면 모든 복붙 지점을 찾아야 합니다.
- **추론 불가**: 버그를 찾을 때 "이 상태가 왜 이 값이 됐지?"를 추적하려면 View의 모든 코드를 처음부터 읽어야 합니다.
- **협업 불가**: 여러 명이 동시에 같은 파일을 수정하면 충돌이 끊이지 않습니다.

아키텍처는 이를 **관심사의 분리(Separation of Concerns)** 로 해결합니다. 각 레이어가 맡은 역할만 수행하도록 경계를 만드는 것입니다.

### iOS 아키텍처의 역사

| 시대 | 패턴 | 특징 |
|------|------|------|
| UIKit 초기 | **MVC** (Model-View-Controller) | Apple 공식 권장. ViewController가 너무 비대해지는 "Massive ViewController" 문제 |
| UIKit 전성기 | **MVVM** | ViewModel 분리로 테스트 가능성 향상. RxSwift/Combine과 궁합 좋음 |
| SwiftUI 시대 | **MVVM + ObservableObject** | SwiftUI 바인딩과 자연스럽게 통합됨. 현재 가장 널리 쓰이는 패턴 |
| 최신 트렌드 | **TCA** (The Composable Architecture) | 단방향 데이터 흐름, 테스트·모듈화 극대화. 러닝 커브 높음 |
| iOS 17+ | **@Observable** | Swift 매크로 기반, ObservableObject보다 가볍고 직관적 |

이 챕터에서는 **MVVM + ObservableObject** 를 중점적으로 배우고, 마지막에 `@Observable`(iOS 17+)도 살펴봅니다. TCA는 별도 챕터에서 다룹니다.

---

## 2. MVVM 패턴

MVVM은 **Model**, **View**, **ViewModel** 세 레이어로 책임을 나눕니다.

```
┌─────────────────────────────────────────────────┐
│  View (SwiftUI View)                            │
│  • UI 렌더링만 담당                               │
│  • 사용자 입력을 ViewModel에 전달                  │
│  • ViewModel의 상태를 구독해서 화면 갱신             │
└───────────────────┬─────────────────────────────┘
                    │ @Published 변화 → 재렌더링
                    │ 사용자 이벤트 →
┌───────────────────▼─────────────────────────────┐
│  ViewModel (ObservableObject)                   │
│  • UI 상태 관리 (@Published 프로퍼티)              │
│  • 비즈니스 로직 처리                              │
│  • Repository/UseCase 호출                      │
│  • 절대 UIKit/SwiftUI import 안 함               │
└───────────────────┬─────────────────────────────┘
                    │ 데이터 요청 / 결과 반환
┌───────────────────▼─────────────────────────────┐
│  Model (Data + Repository)                      │
│  • 데이터 구조 정의 (struct/class)                │
│  • 네트워크/DB 접근                               │
│  • 순수 Swift — 플랫폼 독립                       │
└─────────────────────────────────────────────────┘
```

### View의 역할

View는 **렌더링만** 합니다. 조건문과 루프는 있어도 됩니다. 하지만 `URLSession.dataTask`, 날짜 계산, 비즈니스 규칙 같은 것은 View에 없어야 합니다. View는 ViewModel이 제공한 데이터를 그리고, 사용자 이벤트를 ViewModel 메서드로 전달하는 것이 전부입니다.

### ViewModel의 역할

ViewModel은 View가 필요한 형태로 데이터를 가공합니다. 예를 들어 서버에서 `Date` 타입으로 오는 날짜를 `"2024년 3월 15일"` 같은 `String`으로 변환하는 것은 ViewModel의 일입니다. `URLSession`을 직접 부르지 않고 Repository를 통해 데이터를 가져옵니다. ViewModel은 `import SwiftUI`가 없어도 됩니다.

### Model의 역할

데이터를 표현하는 `struct`와 데이터를 가져오는 `Repository`가 여기 속합니다. 플랫폼에 의존하지 않는 순수 Swift 코드입니다. 이 레이어를 잘 분리해야 유닛 테스트를 작성하기 쉬워집니다.

COMPARE_BLOCK:arch_viewmodel

> 💡 **Android 개발자라면**: Jetpack ViewModel + StateFlow 조합과 개념이 매우 유사합니다. `StateFlow`가 `@Published`에 해당하고, `collectAsStateWithLifecycle()`이 SwiftUI의 자동 View 업데이트에 해당합니다. 다만 iOS는 Hilt 같은 DI 프레임워크 없이 생성자 주입으로 충분한 경우가 많습니다.

> 💡 **웹 개발자라면**: React의 Custom Hook이 ViewModel과 역할이 가장 가깝습니다. `useState`/`useEffect`로 상태를 관리하고, 컴포넌트는 hook이 리턴한 값을 렌더링합니다. 차이점은 iOS ViewModel은 클래스 인스턴스로 존재하고 View와 생명주기가 연결된다는 점입니다.

---

## 3. ObservableObject — 클래스 기반 상태 컨테이너

`ObservableObject`는 SwiftUI에게 "이 객체를 구독해. 바뀌면 알려줄게"라고 알리는 프로토콜입니다. 반드시 **class**여야 합니다 (값 타입인 struct는 안 됩니다).

```swift
// ObservableObject를 채택한 클래스
class CounterViewModel: ObservableObject {
    @Published var count = 0      // 바뀌면 View 갱신

    func increment() { count += 1 }
    func decrement() { count -= 1 }
}
```

### 왜 class인가?

`struct`는 값 타입이라 복사본이 전달됩니다. View가 ViewModel을 복사본으로 갖고 있으면 원본을 바꿔도 View가 모릅니다. `class`는 참조 타입이라 View와 ViewModel이 같은 인스턴스를 바라보므로 변경 사항이 즉시 반영됩니다.

### @Published의 동작 원리

`@Published`는 프로퍼티 래퍼입니다. 값이 변경되려는 순간(`willSet`) `ObservableObject`의 `objectWillChange` 퍼블리셔에 알림을 보냅니다. SwiftUI는 이 알림을 받아 해당 ViewModel을 구독 중인 View를 재렌더링합니다.

```swift
// 내부적으로는 이렇게 동작합니다
var count: Int = 0 {
    willSet {
        objectWillChange.send()  // View에 "곧 바뀐다"고 알림
    }
}
```

### 수동으로 알림 보내기

`@Published`가 붙지 않은 프로퍼티도 필요하면 직접 알림을 보낼 수 있습니다.

```swift
class DataViewModel: ObservableObject {
    var internalCache: [String: Any] = [:]  // @Published 없음

    func updateCache(key: String, value: Any) {
        objectWillChange.send()  // 수동으로 알림
        internalCache[key] = value
    }
}
```

### @MainActor — 메인 스레드 보장

UI 업데이트는 반드시 메인 스레드에서 해야 합니다. `@MainActor`를 ViewModel 클래스에 붙이면 모든 프로퍼티 접근과 메서드 호출이 자동으로 메인 스레드에서 실행됩니다.

```swift
@MainActor  // 클래스 전체를 메인 스레드에서 실행
final class NewsViewModel: ObservableObject {
    @Published var articles: [Article] = []

    func loadNews() async {
        // async 코드도 @MainActor 덕분에 메인 스레드에서 안전하게 실행
        articles = try await repository.fetchArticles()
    }
}
```

COMPARE_BLOCK:arch_published

---

## 4. @StateObject vs @ObservedObject — 소유권 문제

SwiftUI에서 가장 많이 실수하는 부분 중 하나입니다. 두 래퍼의 차이는 단 하나, **소유권**입니다.

### @StateObject: 이 View가 ViewModel을 만들고 소유

```swift
struct NewsListView: View {
    // ✅ 이 View가 ViewModel의 생명주기를 책임짐
    // View가 처음 렌더링될 때 한 번만 초기화됨
    @StateObject private var viewModel = NewsViewModel()

    var body: some View { ... }
}
```

`@StateObject`로 선언하면 SwiftUI가 해당 View 인스턴스의 생명주기 동안 ViewModel을 유지합니다. 부모 View가 재렌더링되어 이 View가 새로 그려져도 ViewModel은 **재생성되지 않습니다**.

### @ObservedObject: 외부에서 전달받은 ViewModel 구독

```swift
struct NewsDetailView: View {
    // ✅ 이 View는 소유자가 아님 — 부모가 만들어서 넘겨줌
    @ObservedObject var viewModel: NewsDetailViewModel

    var body: some View { ... }
}
```

`@ObservedObject`는 외부에서 주입받은 ViewModel을 구독합니다. 이 View가 재생성되면 래퍼는 초기화되지만 ViewModel 인스턴스 자체는 부모가 소유하므로 유지됩니다.

### 헷갈리는 상황과 판단 기준

| 질문 | 답 | 사용할 래퍼 |
|------|-----|------------|
| 이 View가 ViewModel을 생성하는가? | 예 | `@StateObject` |
| ViewModel을 부모에게서 받는가? | 예 | `@ObservedObject` |
| ViewModel을 init 파라미터로 받는가? | 예 | `@ObservedObject` |
| 앱 진입점에서 만드는 앱 전체 상태인가? | 예 | `@StateObject` |

### 잘못된 패턴 — @ObservedObject로 직접 생성

```swift
// ❌ 이렇게 하면 부모가 재렌더링될 때마다 ViewModel이 새로 만들어짐
struct BadView: View {
    @ObservedObject var viewModel = NewsViewModel()  // 매 렌더마다 초기화!
    var body: some View { ... }
}

// ✅ 올바른 방법
struct GoodView: View {
    @StateObject private var viewModel = NewsViewModel()  // 한 번만 초기화
    var body: some View { ... }
}
```

COMPARE_BLOCK:arch_stateobject

> 💡 **Android 개발자라면**: `hiltViewModel()`은 내부적으로 `@StateObject`처럼 동작합니다. Composable의 생명주기에 ViewModel을 연결하고, 재구성(recomposition)에도 같은 인스턴스를 유지합니다. `@ObservedObject`는 Compose에서 props로 ViewModel을 전달받고 `observeAsState()`로 구독하는 패턴과 유사합니다.

> 💡 **웹 개발자라면**: `@StateObject`는 Custom Hook 내부의 `useRef`로 초기화된 값과 비슷합니다—컴포넌트가 마운트될 때 한 번만 생성되고, 리렌더링에도 유지됩니다. `@ObservedObject`는 props로 전달받은 상태를 구독하는 것과 유사합니다.

---

## 5. @EnvironmentObject — 전역 상태 공유

View 계층이 깊어지면 상태를 props로 계속 내려보내는 "prop drilling" 문제가 생깁니다. `@EnvironmentObject`는 View 계층 어디서든 꺼내 쓸 수 있는 전역 상태 주입 메커니즘입니다.

### 사용 방법

```
App
└── ContentView
    ├── TabView
    │   ├── HomeTab → ProfileView → EditProfileView ← UserSession 필요!
    │   └── SettingsTab
```

`EditProfileView`까지 `UserSession`을 전달하려면 중간에 있는 모든 View가 파라미터로 받아 내려줘야 합니다. `@EnvironmentObject`를 쓰면 앱 최상단에서 한 번 주입하고 어디서든 꺼내 씁니다.

```swift
// 앱 최상단에서 주입
@main
struct MyApp: App {
    @StateObject private var session = UserSession()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(session)  // 한 번만!
        }
    }
}

// 어디서든 꺼내 씀
struct EditProfileView: View {
    @EnvironmentObject var session: UserSession  // 선언만 하면 됨

    var body: some View {
        TextField("이름", text: $session.userName)
    }
}
```

### 주의사항

`@EnvironmentObject`는 런타임에 주입된 값을 찾습니다. `.environmentObject()`로 주입하지 않은 상태에서 접근하면 **런타임 크래시**가 발생합니다. Preview와 테스트에서는 반드시 수동으로 주입해야 합니다.

```swift
// Preview에서 필수 주입
#Preview {
    EditProfileView()
        .environmentObject(UserSession.preview)  // 필수!
}
```

COMPARE_BLOCK:arch_envobject

> 💡 **Android 개발자라면**: `CompositionLocalProvider`와 정확히 같은 개념입니다. `LocalUserSession.current`로 꺼내 쓰듯이, SwiftUI에서는 `@EnvironmentObject`로 꺼냅니다. 둘 다 해당 값이 공급되지 않으면 에러가 납니다.

> 💡 **웹 개발자라면**: React의 `createContext` + `useContext` 패턴과 동일합니다. Provider 바깥에서 `useContext`를 쓰면 기본값(또는 throw)이 되는 것처럼, SwiftUI도 주입되지 않으면 크래시됩니다.

---

## 6. Swift 5.9 @Observable 매크로 (iOS 17+)

iOS 17부터 `Observation` 프레임워크가 도입되었고, `@Observable` 매크로로 훨씬 간결하게 관찰 가능한 객체를 만들 수 있습니다.

### ObservableObject와 @Observable 비교

```swift
// 기존 방식 (iOS 14+)
class OldViewModel: ObservableObject {
    @Published var title = ""
    @Published var count = 0
    @Published var isLoading = false
}

// 새 방식 (iOS 17+) — @Published 불필요!
@Observable
class NewViewModel {
    var title = ""     // 모든 프로퍼티가 자동으로 관찰 대상
    var count = 0
    var isLoading = false
}
```

### @Observable의 장점

1. **더 적은 코드**: `@Published`를 매번 붙일 필요 없습니다.
2. **세밀한 업데이트**: `ObservableObject`는 어느 `@Published` 프로퍼티가 바뀌든 View 전체를 재렌더링합니다. `@Observable`은 실제로 View가 읽는 프로퍼티가 바뀔 때만 재렌더링합니다.
3. **@StateObject 불필요**: `@State`로 선언해도 올바르게 동작합니다.

```swift
// @Observable 사용 시 View에서 @StateObject 대신 @State 사용
struct NewsListView: View {
    @State private var viewModel = NewNewsViewModel()  // @State로!

    var body: some View {
        List(viewModel.articles) { article in
            Text(article.title)
        }
        .task { await viewModel.loadNews() }
    }
}
```

### 하위 호환 전략

iOS 17 미만을 지원해야 한다면 `ObservableObject`를 사용해야 합니다. 조직에서 iOS 16 지원을 유지하는 경우가 많으므로, 현시점에서는 `ObservableObject`를 기본으로, 17+ 전용 기능은 `@available(iOS 17, *)` 조건부로 도입하는 것이 현실적입니다.

```swift
// 하위 호환 래퍼 패턴
#if compiler(>=5.9)
@available(iOS 17, *)
@Observable
class ModernNewsViewModel { ... }
#endif

// iOS 16 이하용
class LegacyNewsViewModel: ObservableObject { ... }
```

---

## 7. 의존성 주입 (Dependency Injection)

### 왜 DI가 필요한가

ViewModel이 내부에서 직접 `URLSession`을 만들면 어떤 문제가 생길까요?

```swift
// ❌ 나쁜 예 — 의존성이 내부에 숨겨져 있음
class NewsViewModel: ObservableObject {
    func loadNews() async {
        // URLSession.shared가 하드코딩됨
        let (data, _) = try! await URLSession.shared.data(from: url)
        // ...
    }
}
```

이 ViewModel을 테스트하려면 실제 네트워크가 필요합니다. 인터넷이 없는 환경에서는 테스트가 실패합니다. 테스트마다 실제 서버에 요청을 보내면 느리고, 서버 상태에 따라 결과가 달라집니다. 또한 특정 에러 상황(404, 타임아웃)을 재현하기 어렵습니다.

**DI는 의존성을 외부에서 주입함으로써 이 문제를 해결합니다.**

### 생성자 주입 패턴

```swift
// ✅ 좋은 예 — 의존성을 생성자로 받음
class NewsViewModel: ObservableObject {
    private let repository: NewsRepositoryProtocol

    // 기본값으로 실제 구현체를, 테스트에서는 Mock을 전달
    init(repository: NewsRepositoryProtocol = NewsRepository()) {
        self.repository = repository
    }

    func loadNews() async {
        let articles = try? await repository.fetchArticles()
        // ...
    }
}

// 실제 앱
let vm = NewsViewModel()  // 기본값: NewsRepository() 사용

// 테스트
let vm = NewsViewModel(repository: MockNewsRepository())  // Mock 주입
```

### 프로토콜로 추상화

프로토콜은 Swift에서 인터페이스 역할을 합니다. 구체적인 구현 대신 프로토콜 타입을 사용하면 런타임에 어떤 구현체든 교체할 수 있습니다.

```swift
// 프로토콜 = 계약서 (무엇을 할 수 있는지만 정의)
protocol NewsRepositoryProtocol {
    func fetchArticles() async throws -> [Article]
}

// 실제 구현체
final class NewsRepository: NewsRepositoryProtocol {
    func fetchArticles() async throws -> [Article] {
        // 실제 네트워크 요청
    }
}

// Mock 구현체
final class MockNewsRepository: NewsRepositoryProtocol {
    var stubbedArticles: [Article] = []

    func fetchArticles() async throws -> [Article] {
        return stubbedArticles  // 미리 설정한 데이터 반환
    }
}
```

COMPARE_BLOCK:arch_di

> 💡 **Android 개발자라면**: Hilt의 `@Inject constructor`와 `@Binds`가 하는 일을 iOS에서는 생성자 파라미터의 기본값과 프로토콜로 구현합니다. 별도 DI 프레임워크 없이도 충분히 가능하며, 더 복잡한 경우 Swinject 같은 서드파티 라이브러리를 사용하기도 합니다.

> 💡 **웹 개발자라면**: React Context로 서비스를 주입하고 Custom Hook으로 꺼내 쓰는 패턴이 iOS의 생성자 주입 + 프로토콜과 유사합니다. 둘 다 "구체적인 구현을 추상화하고, 필요한 곳에 주입한다"는 원칙을 따릅니다.

---

## 8. Repository 패턴

Repository 패턴은 **데이터 접근 로직을 ViewModel에서 분리**하는 방법입니다. ViewModel은 "기사 목록을 주세요"만 요청하고, 그 데이터가 네트워크에서 오는지 로컬 DB에서 오는지 신경 쓰지 않습니다.

### 레이어 구조

```
View
  └── ViewModel (비즈니스 로직 + UI 상태)
        └── Repository (데이터 접근 추상화)
              ├── NetworkService (API 통신)
              └── LocalStorage (Core Data, UserDefaults 등)
```

### 기본 Repository 구현

```swift
// 프로토콜 — 계약 정의
protocol ArticleRepositoryProtocol {
    func getArticles() async throws -> [Article]
    func getArticle(id: String) async throws -> Article?
    func saveArticle(_ article: Article) async throws
}

// 실제 구현 — 네트워크 + 캐시
final class ArticleRepository: ArticleRepositoryProtocol {
    private let networkService: NetworkServiceProtocol
    private var cache: [Article]?

    init(networkService: NetworkServiceProtocol = NetworkService()) {
        self.networkService = networkService
    }

    func getArticles() async throws -> [Article] {
        // 캐시가 있으면 반환, 없으면 네트워크 요청
        if let cached = cache { return cached }
        let articles = try await networkService.fetch(
            endpoint: "/articles",
            as: [Article].self
        )
        cache = articles
        return articles
    }

    func getArticle(id: String) async throws -> Article? {
        let articles = try await getArticles()
        return articles.first { $0.id == id }
    }

    func saveArticle(_ article: Article) async throws {
        // 로컬 저장 로직
    }
}
```

### UseCase 레이어 — Clean Architecture 맛보기

Repository 하나에 여러 비즈니스 로직이 쌓이면 UseCase로 분리합니다. UseCase는 단 하나의 행동만 수행합니다.

```swift
// UseCase: 단일 책임 원칙
struct FetchTopArticlesUseCase {
    private let repository: ArticleRepositoryProtocol

    init(repository: ArticleRepositoryProtocol = ArticleRepository()) {
        self.repository = repository
    }

    // 호출 연산자로 자연스럽게 사용 가능
    func callAsFunction(limit: Int = 10) async throws -> [Article] {
        let articles = try await repository.getArticles()
        // 비즈니스 로직: 최신 N개, 정렬 기준 등
        return articles
            .sorted { $0.publishedAt > $1.publishedAt }
            .prefix(limit)
            .map { $0 }
    }
}

// ViewModel에서 사용
class ArticleViewModel: ObservableObject {
    private let fetchTopArticles = FetchTopArticlesUseCase()

    func loadNews() async {
        do {
            articles = try await fetchTopArticles(limit: 20)
        } catch { ... }
    }
}
```

COMPARE_BLOCK:arch_repository

> 💡 **Android 개발자라면**: Android의 Repository 패턴과 동일합니다. `Room DAO`가 `LocalStorage`, `Retrofit API`가 `NetworkService`, `Repository`가 이 둘을 조합합니다. UseCase 레이어도 Clean Architecture 가이드에서 권장하는 구조와 일치합니다.

> 💡 **웹 개발자라면**: React Query나 SWR 같은 라이브러리가 Repository의 캐싱 로직을 대신 해주는 경우가 많습니다. 그러나 복잡한 비즈니스 앱에서는 서비스 레이어를 별도로 두고 Custom Hook에서 호출하는 방식이 Swift Repository 패턴과 유사합니다.

---

## 9. 실전 예제 — 뉴스 앱 전체 아키텍처

지금까지 배운 것을 모두 합쳐 실제 동작하는 뉴스 앱을 만들어봅니다.

### 프로젝트 구조

```
NewsApp/
├── Models/
│   └── Article.swift
├── Repositories/
│   ├── NewsRepositoryProtocol.swift
│   ├── NewsRepository.swift
│   └── MockNewsRepository.swift
├── ViewModels/
│   ├── NewsListViewModel.swift
│   └── NewsDetailViewModel.swift
└── Views/
    ├── NewsListView.swift
    ├── NewsDetailView.swift
    └── NewsRowView.swift
```

### 1단계: 모델 정의

```swift
// Article.swift
import Foundation

struct Article: Identifiable, Codable, Hashable {
    let id: String
    let title: String
    let body: String
    let author: String
    let publishedAt: Date
    let imageURL: URL?
    let category: Category

    enum Category: String, Codable {
        case technology = "technology"
        case business = "business"
        case sports = "sports"
        case entertainment = "entertainment"
    }

    // Preview 및 테스트용 샘플 데이터
    static let samples: [Article] = [
        Article(
            id: "1",
            title: "Swift 6.0 주요 변경사항",
            body: "Swift 6.0에서는 데이터 레이스를 컴파일 타임에 방지하는 완전한 동시성 모델이 도입됩니다.",
            author: "홍길동",
            publishedAt: Date(),
            imageURL: URL(string: "https://example.com/image1.jpg"),
            category: .technology
        ),
        Article(
            id: "2",
            title: "SwiftUI와 UIKit 통합 심화",
            body: "UIViewRepresentable을 활용해 복잡한 UIKit 컴포넌트를 SwiftUI에 통합하는 방법을 알아봅니다.",
            author: "김철수",
            publishedAt: Date().addingTimeInterval(-3600),
            imageURL: nil,
            category: .technology
        ),
    ]
}
```

### 2단계: Repository 프로토콜 및 구현체

```swift
// NewsRepositoryProtocol.swift
protocol NewsRepositoryProtocol {
    func fetchArticles() async throws -> [Article]
    func fetchArticle(id: String) async throws -> Article
}

// NewsRepository.swift
import Foundation

final class NewsRepository: NewsRepositoryProtocol {
    private let baseURL = URL(string: "https://api.newsapp.example.com")!
    private let session: URLSession

    init(session: URLSession = .shared) {
        self.session = session
    }

    func fetchArticles() async throws -> [Article] {
        let url = baseURL.appendingPathComponent("/articles")
        let (data, response) = try await session.data(from: url)

        guard let httpResponse = response as? HTTPURLResponse,
              httpResponse.statusCode == 200 else {
            throw NewsError.invalidResponse
        }

        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .iso8601
        return try decoder.decode([Article].self, from: data)
    }

    func fetchArticle(id: String) async throws -> Article {
        let url = baseURL.appendingPathComponent("/articles/\(id)")
        let (data, _) = try await session.data(from: url)
        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .iso8601
        return try decoder.decode(Article.self, from: data)
    }
}

enum NewsError: LocalizedError {
    case invalidResponse
    case notFound

    var errorDescription: String? {
        switch self {
        case .invalidResponse: return "서버 응답이 올바르지 않습니다."
        case .notFound: return "기사를 찾을 수 없습니다."
        }
    }
}

// MockNewsRepository.swift
final class MockNewsRepository: NewsRepositoryProtocol {
    var stubbedArticles: [Article] = Article.samples
    var shouldThrowError = false
    var delay: Duration = .zero

    func fetchArticles() async throws -> [Article] {
        if delay != .zero { try await Task.sleep(for: delay) }
        if shouldThrowError { throw NewsError.invalidResponse }
        return stubbedArticles
    }

    func fetchArticle(id: String) async throws -> Article {
        guard let article = stubbedArticles.first(where: { $0.id == id }) else {
            throw NewsError.notFound
        }
        return article
    }
}
```

### 3단계: ViewModel 구현

```swift
// NewsListViewModel.swift
import Foundation

@MainActor
final class NewsListViewModel: ObservableObject {

    // MARK: - Published 상태
    @Published var articles: [Article] = []
    @Published var isLoading = false
    @Published var errorMessage: String?
    @Published var selectedCategory: Article.Category?
    @Published var searchText = ""

    // MARK: - 파생 상태 (Published 불필요)
    var filteredArticles: [Article] {
        var result = articles

        // 카테고리 필터
        if let category = selectedCategory {
            result = result.filter { $0.category == category }
        }

        // 검색 필터
        if !searchText.isEmpty {
            result = result.filter {
                $0.title.localizedCaseInsensitiveContains(searchText) ||
                $0.author.localizedCaseInsensitiveContains(searchText)
            }
        }

        return result
    }

    // MARK: - 의존성
    private let repository: NewsRepositoryProtocol

    init(repository: NewsRepositoryProtocol = NewsRepository()) {
        self.repository = repository
    }

    // MARK: - 인텐트 (사용자 액션 처리)
    func onAppear() async {
        await loadArticles()
    }

    func onRefresh() async {
        await loadArticles()
    }

    func onCategorySelected(_ category: Article.Category?) {
        selectedCategory = category
    }

    // MARK: - 내부 로직
    private func loadArticles() async {
        isLoading = true
        errorMessage = nil

        do {
            articles = try await repository.fetchArticles()
        } catch {
            errorMessage = error.localizedDescription
        }

        isLoading = false
    }
}
```

```swift
// NewsDetailViewModel.swift
@MainActor
final class NewsDetailViewModel: ObservableObject {
    @Published var article: Article
    @Published var isBookmarked = false
    @Published var relatedArticles: [Article] = []

    private let repository: NewsRepositoryProtocol

    init(article: Article, repository: NewsRepositoryProtocol = NewsRepository()) {
        self.article = article
        self.repository = repository
    }

    func onAppear() async {
        await loadRelatedArticles()
        checkBookmarkStatus()
    }

    func toggleBookmark() {
        isBookmarked.toggle()
        // UserDefaults 또는 Core Data에 저장
    }

    private func loadRelatedArticles() async {
        let all = (try? await repository.fetchArticles()) ?? []
        relatedArticles = all
            .filter { $0.category == article.category && $0.id != article.id }
            .prefix(3)
            .map { $0 }
    }

    private func checkBookmarkStatus() {
        // UserDefaults에서 북마크 상태 확인
        let bookmarks = UserDefaults.standard.stringArray(forKey: "bookmarks") ?? []
        isBookmarked = bookmarks.contains(article.id)
    }
}
```

### 4단계: View 구현

```swift
// NewsListView.swift
import SwiftUI

struct NewsListView: View {
    @StateObject private var viewModel = NewsListViewModel()

    var body: some View {
        NavigationStack {
            Group {
                if viewModel.isLoading && viewModel.articles.isEmpty {
                    ProgressView("뉴스 불러오는 중...")
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                } else if let error = viewModel.errorMessage {
                    ErrorView(message: error) {
                        Task { await viewModel.onRefresh() }
                    }
                } else {
                    articleList
                }
            }
            .navigationTitle("뉴스")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    CategoryPicker(
                        selection: $viewModel.selectedCategory
                    )
                }
            }
            .searchable(text: $viewModel.searchText, prompt: "기사 검색")
        }
        .task {
            await viewModel.onAppear()
        }
        .refreshable {
            await viewModel.onRefresh()
        }
    }

    private var articleList: some View {
        List(viewModel.filteredArticles) { article in
            NavigationLink(value: article) {
                NewsRowView(article: article)
            }
        }
        .listStyle(.plain)
        .navigationDestination(for: Article.self) { article in
            NewsDetailView(
                viewModel: NewsDetailViewModel(article: article)
            )
        }
        .overlay {
            if viewModel.filteredArticles.isEmpty {
                ContentUnavailableView(
                    "검색 결과 없음",
                    systemImage: "newspaper",
                    description: Text("다른 검색어를 시도해보세요.")
                )
            }
        }
    }
}

// NewsRowView.swift
struct NewsRowView: View {
    let article: Article

    private var formattedDate: String {
        article.publishedAt.formatted(date: .abbreviated, time: .omitted)
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Text(article.category.rawValue.capitalized)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 2)
                    .background(.quaternary, in: Capsule())

                Spacer()

                Text(formattedDate)
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }

            Text(article.title)
                .font(.headline)
                .lineLimit(2)

            Text(article.author)
                .font(.caption)
                .foregroundStyle(.secondary)
        }
        .padding(.vertical, 4)
    }
}

// NewsDetailView.swift
struct NewsDetailView: View {
    @ObservedObject var viewModel: NewsDetailViewModel  // @ObservedObject — 부모가 소유

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                // 헤더
                VStack(alignment: .leading, spacing: 8) {
                    Text(viewModel.article.category.rawValue.capitalized)
                        .font(.caption)
                        .foregroundStyle(.secondary)

                    Text(viewModel.article.title)
                        .font(.title2.bold())

                    HStack {
                        Text(viewModel.article.author)
                        Text("·")
                        Text(viewModel.article.publishedAt.formatted())
                    }
                    .font(.caption)
                    .foregroundStyle(.secondary)
                }
                .padding(.horizontal)

                Divider()

                // 본문
                Text(viewModel.article.body)
                    .padding(.horizontal)

                // 연관 기사
                if !viewModel.relatedArticles.isEmpty {
                    Divider()
                    VStack(alignment: .leading) {
                        Text("연관 기사")
                            .font(.headline)
                            .padding(.horizontal)

                        ForEach(viewModel.relatedArticles) { related in
                            NewsRowView(article: related)
                                .padding(.horizontal)
                        }
                    }
                }
            }
            .padding(.vertical)
        }
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                Button {
                    viewModel.toggleBookmark()
                } label: {
                    Image(systemName: viewModel.isBookmarked ? "bookmark.fill" : "bookmark")
                }
            }
        }
        .task {
            await viewModel.onAppear()
        }
    }
}
```

### 5단계: Preview에서 Mock 활용

```swift
// 다양한 Preview 시나리오
#Preview("기본 — 데이터 있음") {
    NewsListView(viewModel: {
        let vm = NewsListViewModel(repository: MockNewsRepository())
        return vm
    }())
}

#Preview("로딩 중") {
    NewsListView(viewModel: {
        let mock = MockNewsRepository()
        mock.delay = .seconds(60)  // 매우 긴 딜레이 → 로딩 상태 유지
        return NewsListViewModel(repository: mock)
    }())
}

#Preview("에러 상태") {
    NewsListView(viewModel: {
        let mock = MockNewsRepository()
        mock.shouldThrowError = true
        return NewsListViewModel(repository: mock)
    }())
}

#Preview("상세 화면") {
    NavigationStack {
        NewsDetailView(
            viewModel: NewsDetailViewModel(
                article: Article.samples[0],
                repository: MockNewsRepository()
            )
        )
    }
}
```

---

## 10. 아키텍처 결정 가이드

실제 프로젝트에서 어떤 패턴을 써야 할지 판단하는 기준입니다.

### 상태 선언 래퍼 선택

| 상황 | 사용할 것 | 이유 |
|------|----------|------|
| View가 직접 ViewModel 생성 | `@StateObject` | 생명주기 소유 |
| 부모에게서 ViewModel 전달받음 | `@ObservedObject` | 소유권 없음 |
| 단순 로컬 UI 상태 (토글, 텍스트 입력) | `@State` | 뷰 내부에서 완결 |
| 앱 전체에서 공유되는 상태 | `@EnvironmentObject` | 계층 전파 |
| iOS 17+, 더 간결한 코드 원함 | `@Observable` + `@State` | 최신 방식 |

### 레이어 분리 기준

```
단순 앱 (화면 1~3개):
  View + @State 만으로도 충분

중간 규모 (화면 5~10개):
  MVVM (View + ViewModel + Repository)

복잡한 앱 (화면 10개+, 팀 협업):
  MVVM + UseCase + Repository + DI
  또는 TCA 고려
```

### 흔한 실수 모음

```swift
// ❌ 실수 1: View에서 API 직접 호출
struct BadView: View {
    @State var articles: [Article] = []
    var body: some View {
        List(articles) { a in Text(a.title) }
            .task {
                // View에 네트워크 로직 X
                let (data, _) = try! await URLSession.shared.data(from: url)
                articles = try! JSONDecoder().decode([Article].self, from: data)
            }
    }
}

// ❌ 실수 2: @Published를 사용하지 않아 View가 업데이트 안 됨
class BrokenViewModel: ObservableObject {
    var articles: [Article] = []  // @Published 빠짐 — View 업데이트 안 됨!
}

// ❌ 실수 3: ViewModel을 @ObservedObject로 직접 생성
struct BadView2: View {
    @ObservedObject var vm = SomeViewModel()  // 매 렌더마다 재생성
}

// ❌ 실수 4: @EnvironmentObject 주입 없이 접근 — 런타임 크래시
#Preview {
    SomeView()  // @EnvironmentObject 사용하는데 주입 안 함 → 크래시!
}
```

---

## 11. 챕터 요약

이 챕터에서 배운 내용을 정리합니다.

| 개념 | 핵심 요약 |
|------|----------|
| **MVVM** | View는 렌더링, ViewModel은 상태+로직, Model은 데이터 |
| **ObservableObject** | class 기반 관찰 가능 객체. `@Published`로 상태 변화 알림 |
| **@StateObject** | 이 View가 ViewModel을 생성하고 소유함 |
| **@ObservedObject** | 외부에서 전달받은 ViewModel을 구독함 |
| **@EnvironmentObject** | 뷰 계층 전체에 전역 상태 주입 |
| **@Observable** | iOS 17+, 더 간결한 관찰 가능 객체 |
| **의존성 주입** | 프로토콜로 추상화하고 생성자로 주입 → 테스트 용이 |
| **Repository** | 데이터 접근을 추상화. ViewModel은 데이터 출처 모름 |
| **UseCase** | 단일 비즈니스 로직 단위. Repository 위에 위치 |

### 다음 챕터 예고

Chapter 6에서는 **비동기 프로그래밍**을 깊이 다룹니다. `async/await`, `Task`, `TaskGroup`, Swift Concurrency의 Actor 모델 등을 통해 복잡한 비동기 코드를 안전하게 작성하는 방법을 배웁니다.
