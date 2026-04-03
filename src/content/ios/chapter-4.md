# Chapter 4. 데이터와 네트워크

현대 앱의 핵심은 서버와 데이터를 주고받는 것입니다. 사용자 프로필을 불러오고, 피드를 갱신하고, 로그인 토큰을 저장하고, 오프라인 캐시를 관리하는 모든 일이 이 챕터의 주제입니다. iOS에서는 네트워크 통신에 **URLSession**, JSON 직렬화에 **Codable**, 비동기 처리에 **async/await**, 로컬 저장에 **UserDefaults/FileManager**를 사용합니다.

Android 개발자라면 Retrofit + Coroutine + Gson/Moshi 조합과 개념이 매우 유사하게 느껴질 것입니다. 웹 개발자라면 fetch/axios + async/await + localStorage와의 유사성을 통해 빠르게 적응할 수 있습니다. 각 플랫폼 간 차이를 비교하면서 iOS 방식에 익숙해져 봅시다.

---

## 1. URLSession 개요

### URLSession이란?

`URLSession`은 iOS/macOS의 표준 HTTP 클라이언트입니다. Apple이 제공하는 First-party 라이브러리로, 별도의 의존성 추가 없이 바로 사용할 수 있습니다. HTTP/HTTPS 요청, 파일 다운로드/업로드, WebSocket 등을 모두 지원합니다.

다른 플랫폼과의 포지셔닝을 비교하면 다음과 같습니다.

| iOS | Android | Web |
|-----|---------|-----|
| `URLSession` | `OkHttp` / `Retrofit` | `fetch` / `axios` |
| 표준 라이브러리 | 서드파티 | 브라우저 내장 / 서드파티 |
| async/await 지원 (iOS 15+) | Coroutine suspend | Promise / async-await |

> 💡 **Android 개발자라면**: Retrofit은 URLSession 위에 추상화 레이어를 추가한 것과 유사합니다. iOS에서도 Moya나 Alamofire 같은 서드파티 라이브러리가 있지만, Swift 5.5+ async/await의 등장으로 URLSession 단독 사용이 충분히 실용적이 되었습니다.

> 💡 **웹 개발자라면**: `fetch(url)`처럼 심플한 인터페이스는 아니지만, `URLSession.shared.data(from: url)`로 유사한 흐름을 구현할 수 있습니다. axios의 인터셉터 기능은 URLSession의 `URLSessionDelegate`나 커스텀 래퍼로 구현합니다.

### URLSession.shared vs 커스텀 URLSession

대부분의 경우 `URLSession.shared`를 사용하면 충분합니다. 하지만 타임아웃 설정, 커스텀 헤더, 캐시 정책, SSL 인증서 핀닝 등이 필요한 경우에는 `URLSessionConfiguration`으로 커스텀 세션을 만들어야 합니다.

```swift
// 기본 공유 세션 — 대부분의 경우 충분
let (data, response) = try await URLSession.shared.data(from: url)

// 커스텀 세션 — 세밀한 제어가 필요한 경우
let config = URLSessionConfiguration.default
config.timeoutIntervalForRequest = 30    // 요청 타임아웃 30초
config.timeoutIntervalForResource = 60  // 리소스 타임아웃 60초
config.httpAdditionalHeaders = [
    "Accept": "application/json",
    "App-Version": "1.0.0"
]
config.requestCachePolicy = .reloadIgnoringLocalCacheData

let session = URLSession(configuration: config)
```

`URLSessionConfiguration`에는 세 가지 기본 템플릿이 있습니다.

| 타입 | 설명 | 사용 상황 |
|------|------|---------|
| `.default` | 기본 설정, 디스크 캐시 사용 | 일반적인 API 요청 |
| `.ephemeral` | 캐시/쿠키 저장 안 함 | 프라이빗 모드, 테스트 |
| `.background(withIdentifier:)` | 앱이 백그라운드일 때도 실행 | 대용량 다운로드/업로드 |

### 기본 GET 요청 흐름

COMPARE_BLOCK:net_get

세 플랫폼 모두 URL을 구성하고, HTTP 요청을 보내고, 응답을 받아 처리하는 흐름은 동일합니다. iOS에서는 `URL` 구조체를 먼저 만들고, `URLSession`으로 데이터를 받은 뒤, 응답 상태코드를 확인하고, `JSONDecoder`로 파싱하는 4단계를 거칩니다.

---

## 2. Codable — JSON 파싱

### Codable이란?

Swift의 `Codable`은 JSON, PropertyList 등 외부 표현과 Swift 타입 사이의 변환을 담당합니다. `Codable`은 `Encodable`과 `Decodable`을 합친 타입 별칭(`typealias`)입니다.

```swift
typealias Codable = Encodable & Decodable

// Decodable만 필요한 경우 (API 응답 파싱)
struct User: Decodable { ... }

// Encodable만 필요한 경우 (요청 바디 생성)
struct CreateUserRequest: Encodable { ... }

// 둘 다 필요한 경우 (로컬 저장 + API)
struct UserProfile: Codable { ... }
```

Swift 컴파일러는 프로퍼티 이름이 JSON 키와 일치할 경우 `Codable` 구현을 **자동으로 합성(synthesize)**합니다. 별도의 파싱 코드를 작성할 필요가 없습니다.

### struct 기반 모델 정의와 CodingKeys

서버 API는 보통 `snake_case` 키를 사용하지만, Swift 코드에서는 `camelCase`를 씁니다. `CodingKeys` enum을 사용하거나 `keyDecodingStrategy`를 설정해 자동 변환할 수 있습니다.

COMPARE_BLOCK:net_codable

`CodingKeys`를 직접 정의하면 특정 키만 선택적으로 매핑하고 나머지는 기본값을 사용할 수 있습니다. `keyDecodingStrategy = .convertFromSnakeCase`는 모든 키를 자동 변환하므로 코드가 줄어들지만, 변환 규칙이 맞지 않는 엣지 케이스가 생길 수 있습니다.

### 중첩 JSON과 배열 처리

실제 API 응답은 중첩 구조나 배열을 포함하는 경우가 많습니다.

```swift
// 중첩 JSON 구조
// {
//   "user": { "id": 1, "name": "홍길동" },
//   "repos": [{ "name": "my-app", "stars": 42 }],
//   "metadata": { "page": 1, "total": 100 }
// }

struct Repo: Codable {
    let name: String
    let stargazersCount: Int   // "stargazers_count"에서 자동 변환
    let isPrivate: Bool        // "private"은 Swift 키워드이므로 CodingKeys 필요

    enum CodingKeys: String, CodingKey {
        case name
        case stargazersCount = "stargazers_count"
        case isPrivate = "private"
    }
}

struct Metadata: Codable {
    let page: Int
    let total: Int
}

struct APIResponse: Codable {
    let user: GitHubUser
    let repos: [Repo]       // 배열 — 자동 처리
    let metadata: Metadata  // 중첩 객체
}

// 배열 응답 바로 디코딩
let repos = try JSONDecoder().decode([Repo].self, from: data)
```

### 옵셔널 필드와 기본값

JSON에 키가 없거나 `null`인 경우를 처리하려면 프로퍼티를 `Optional`로 선언합니다.

```swift
struct GitHubUser: Codable {
    let id: Int
    let login: String
    let name: String?      // null 또는 키 없음 → nil
    let bio: String?       // null 또는 키 없음 → nil
    let company: String?
    let blog: String?

    // 기본값이 필요하면 커스텀 init(from:) 구현
    let followers: Int     // 항상 있음 → 비옵셔널
}
```

> 💡 **Android 개발자라면**: Gson의 `@SerializedName`, Moshi의 `@Json`과 동일한 역할을 `CodingKeys`가 합니다. Kotlin의 `data class`처럼 Swift의 `struct`도 불변 데이터 모델에 이상적입니다.

> 💡 **웹 개발자라면**: TypeScript의 `interface`는 컴파일 타임 타입 체크만 제공하지만, Swift의 `Codable`은 런타임에 실제 JSON 파싱과 검증까지 수행합니다. Zod로 런타임 검증을 추가하는 것과 유사하게 생각하면 됩니다.

---

## 3. async/await 비동기 처리

### Swift async/await 개요

Swift 5.5 (iOS 15+)에서 도입된 `async/await`는 비동기 코드를 동기 코드처럼 읽기 쉽게 만들어 줍니다. 기존의 콜백(completion handler) 방식이나 Combine에 비해 코드가 직관적입니다.

```swift
// 기존 completion handler 방식
func fetchUser(completion: @escaping (Result<GitHubUser, Error>) -> Void) {
    URLSession.shared.dataTask(with: url) { data, response, error in
        // 콜백 헬(callback hell) 가능성
        if let error = error {
            completion(.failure(error))
            return
        }
        // ...
        completion(.success(user))
    }.resume()
}

// async/await 방식 — 훨씬 간결
func fetchUser() async throws -> GitHubUser {
    let (data, _) = try await URLSession.shared.data(from: url)
    return try JSONDecoder().decode(GitHubUser.self, from: data)
}
```

### try await 패턴

`async` 함수는 반드시 `await` 키워드로 호출해야 합니다. 오류를 던질 수 있는 함수는 `try await`를 함께 사용합니다.

COMPARE_BLOCK:net_async

`await`는 실행을 일시 중단하고 다른 작업이 실행되도록 양보합니다. 이는 스레드를 차단하지 않으므로 UI가 멈추지 않습니다. Kotlin의 `suspend` 함수와 동일한 원리입니다.

### Task {} — 비동기 컨텍스트 시작

`async` 함수는 비동기 컨텍스트 내에서만 호출할 수 있습니다. 동기 컨텍스트(예: `init`, 버튼 탭 핸들러)에서 비동기 함수를 시작하려면 `Task {}`를 사용합니다.

```swift
// 버튼 탭 — 동기 컨텍스트
Button("검색") {
    Task {                           // 비동기 컨텍스트 시작
        await viewModel.search()    // async 함수 호출
    }
}

// Task 취소
let task = Task {
    await doSomethingLong()
}
task.cancel()   // 취소 요청

// 취소 확인 — 긴 작업 중간에 확인
Task {
    for item in largeList {
        try Task.checkCancellation()  // 취소되었으면 throws
        await process(item)
    }
}

// Task.detached — 현재 컨텍스트 상속 안 함 (Actor 등)
Task.detached(priority: .background) {
    await heavyComputation()
}
```

### @MainActor — UI 업데이트는 메인 스레드에서

iOS에서 UI 업데이트는 반드시 메인 스레드(Main Thread)에서 이루어져야 합니다. `@MainActor`를 사용하면 해당 코드가 항상 메인 스레드에서 실행되도록 보장합니다.

```swift
// ViewModel 전체에 @MainActor 적용 (권장)
@MainActor
class SearchViewModel: ObservableObject {
    @Published var users: [GitHubUser] = []
    @Published var isLoading = false
    @Published var errorMessage: String?

    func search(query: String) {
        isLoading = true  // 메인 스레드 — 안전
        Task {
            do {
                // 네트워크 요청은 백그라운드에서 실행
                let result = try await repository.search(query: query)
                // @MainActor 덕분에 여기도 메인 스레드
                users = result
            } catch {
                errorMessage = error.localizedDescription
            }
            isLoading = false
        }
    }
}

// 특정 코드 블록만 메인 스레드로 전환
Task {
    let data = try await fetchData()     // 백그라운드
    await MainActor.run {
        self.label.text = data.title     // 메인 스레드
    }
}
```

> 💡 **Android 개발자라면**: `viewModelScope.launch`가 `Task {}`에, `Dispatchers.Main`이 `@MainActor`에 대응됩니다. `withContext(Dispatchers.IO)`로 IO 작업을 분리하듯, Swift에서는 `URLSession`이 자동으로 백그라운드 스레드에서 네트워크 작업을 처리합니다.

> 💡 **웹 개발자라면**: JavaScript는 싱글 스레드이므로 메인 스레드 문제가 없지만, iOS는 멀티스레드 환경입니다. `@MainActor`는 React의 `setState`를 이벤트 루프에서만 호출해야 하는 규칙과 유사한 맥락입니다.

### async let — 병렬 실행

여러 비동기 작업을 동시에 실행하려면 `async let`을 사용합니다.

```swift
// 순차 실행 — 느림 (user 완료 후 repos 시작)
let user = try await fetchUser(username: "octocat")
let repos = try await fetchRepos(username: "octocat")

// 병렬 실행 — 빠름 (동시에 두 요청)
async let user = fetchUser(username: "octocat")
async let repos = fetchRepos(username: "octocat")

// 두 결과를 동시에 기다림
let (resolvedUser, resolvedRepos) = try await (user, repos)
```

---

## 4. 에러 처리

### Swift의 throws / try / catch

Swift는 오류를 값으로 처리합니다. `throws` 함수는 오류를 던질 수 있음을 명시하고, 호출하는 측은 반드시 `do-catch`로 처리하거나 `try?`/`try!`로 다르게 처리해야 합니다.

COMPARE_BLOCK:net_error

### 커스텀 Error enum

`Error` 프로토콜을 채택한 enum으로 도메인별 오류 타입을 정의합니다. `LocalizedError`를 추가하면 사용자에게 보여줄 메시지를 제공할 수 있습니다.

```swift
enum NetworkError: Error, LocalizedError {
    case invalidURL
    case invalidResponse
    case httpError(statusCode: Int)
    case decodingFailed(Error)
    case noInternet

    var errorDescription: String? {
        switch self {
        case .invalidURL:
            return "잘못된 URL입니다"
        case .invalidResponse:
            return "서버 응답이 올바르지 않습니다"
        case .httpError(let code):
            return "서버 오류: \(code)"
        case .decodingFailed(let error):
            return "데이터 처리 오류: \(error.localizedDescription)"
        case .noInternet:
            return "인터넷 연결을 확인해주세요"
        }
    }
}
```

### HTTP 상태코드 처리 패턴

API 서버는 상태코드로 결과를 알립니다. 올바른 처리를 위해 상태코드를 명시적으로 검사하는 것이 중요합니다.

```swift
func validateResponse(_ response: URLResponse) throws {
    guard let http = response as? HTTPURLResponse else {
        throw NetworkError.invalidResponse
    }

    switch http.statusCode {
    case 200..<300:
        return  // 성공
    case 400:
        throw NetworkError.httpError(statusCode: 400)  // Bad Request
    case 401:
        throw NetworkError.unauthorized               // 인증 실패
    case 403:
        throw NetworkError.forbidden                  // 권한 없음
    case 404:
        throw NetworkError.notFound                   // 리소스 없음
    case 429:
        throw NetworkError.rateLimited                // 요청 초과
    case 500..<600:
        throw NetworkError.serverError(statusCode: http.statusCode)
    default:
        throw NetworkError.httpError(statusCode: http.statusCode)
    }
}
```

### try?, try!, rethrows

```swift
// try? — 오류 시 nil 반환 (오류 무시)
let user = try? JSONDecoder().decode(GitHubUser.self, from: data)
// user는 GitHubUser? — 오류가 나도 크래시 없음

// try! — 오류 시 크래시 (오류 절대 없다고 확신할 때만 사용)
let user = try! JSONDecoder().decode(GitHubUser.self, from: data)
// ⚠️ 파싱 실패 시 앱 크래시 — 프로덕션에서 지양

// rethrows — 클로저의 오류를 그대로 전달
func transform<T, U>(_ value: T, using closure: (T) throws -> U) rethrows -> U {
    return try closure(value)
}
```

> 💡 **Android 개발자라면**: Kotlin의 `runCatching { }.onSuccess { }.onFailure { }` 패턴과 Swift의 `do-catch`는 유사합니다. 단, Swift는 checked exceptions처럼 컴파일러가 오류 처리를 강제합니다.

> 💡 **웹 개발자라면**: JavaScript의 `try-catch`와 문법이 동일합니다. 다만 Swift는 `throws` 키워드로 오류를 던질 수 있는 함수임을 타입 시스템에서 명시적으로 표현합니다.

---

## 5. 실전 API 호출 패턴

### URLSession POST 요청

GET 이외의 HTTP 메서드는 `URLRequest`를 사용해 직접 구성합니다.

COMPARE_BLOCK:net_post

### 제네릭 네트워크 함수

반복되는 네트워크 코드를 제네릭 함수로 추상화하면 코드 중복을 줄일 수 있습니다.

```swift
// 제네릭 request 함수
struct NetworkClient {
    private let baseURL: String
    private let session: URLSession
    private let decoder: JSONDecoder

    init(baseURL: String, session: URLSession = .shared) {
        self.baseURL = baseURL
        self.session = session
        self.decoder = {
            let d = JSONDecoder()
            d.keyDecodingStrategy = .convertFromSnakeCase
            return d
        }()
    }

    func request<T: Decodable>(
        endpoint: String,
        method: String = "GET",
        body: (any Encodable)? = nil,
        headers: [String: String] = [:]
    ) async throws -> T {
        guard let url = URL(string: baseURL + endpoint) else {
            throw NetworkError.invalidURL
        }

        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = method
        urlRequest.setValue("application/json", forHTTPHeaderField: "Content-Type")

        headers.forEach { key, value in
            urlRequest.setValue(value, forHTTPHeaderField: key)
        }

        if let body = body {
            urlRequest.httpBody = try JSONEncoder().encode(body)
        }

        let (data, response) = try await session.data(for: urlRequest)
        try validateResponse(response)

        return try decoder.decode(T.self, from: data)
    }
}

// 사용
let client = NetworkClient(baseURL: "https://api.github.com")

let user: GitHubUser = try await client.request(endpoint: "/users/octocat")
let repos: [Repo] = try await client.request(endpoint: "/users/octocat/repos")
```

### 인터셉터 패턴 — 토큰 자동 첨부

매 요청마다 인증 토큰을 수동으로 첨부하는 것은 번거롭습니다. `URLSessionTaskDelegate`나 커스텀 래퍼로 자동 처리할 수 있습니다.

```swift
// TokenInjector — 모든 요청에 자동으로 토큰 첨부
actor AuthenticatedNetworkClient {
    private var accessToken: String?
    private let baseClient: NetworkClient

    init(baseURL: String) {
        self.baseClient = NetworkClient(baseURL: baseURL)
    }

    func setToken(_ token: String) {
        self.accessToken = token
    }

    func request<T: Decodable>(
        endpoint: String,
        method: String = "GET",
        body: (any Encodable)? = nil
    ) async throws -> T {
        var headers: [String: String] = [:]

        if let token = accessToken {
            headers["Authorization"] = "Bearer \(token)"
        }

        // 401 응답 시 토큰 갱신 후 재시도
        do {
            return try await baseClient.request(
                endpoint: endpoint,
                method: method,
                body: body,
                headers: headers
            )
        } catch NetworkError.httpError(statusCode: 401) {
            try await refreshToken()
            // 갱신 후 재시도
            headers["Authorization"] = "Bearer \(accessToken ?? "")"
            return try await baseClient.request(
                endpoint: endpoint,
                method: method,
                body: body,
                headers: headers
            )
        }
    }

    private func refreshToken() async throws {
        // 토큰 갱신 로직
    }
}
```

> **주의사항**: `actor`는 Swift의 동시성 안전 타입입니다. 여러 스레드에서 동시에 `accessToken`을 읽고 쓰는 데이터 경합(Data Race)을 컴파일러 레벨에서 방지합니다.

---

## 6. 로컬 데이터 저장

네트워크에서 받아온 데이터나 사용자 설정을 앱 내에 저장하는 세 가지 주요 방법이 있습니다.

| 저장 방식 | 용도 | 용량 | 비고 |
|----------|------|------|------|
| `UserDefaults` | 설정값, 토큰, 플래그 | 수 KB 권장 | 암호화 없음 |
| `FileManager` | 이미지, 캐시, 문서 | 제한 없음 | Documents/Caches 디렉토리 |
| `SwiftData` / `Core Data` | 구조화된 데이터, 복잡한 쿼리 | 제한 없음 | ORM, 관계형 |
| `Keychain` | 민감 정보 (비밀번호, 토큰) | 수 KB | 암호화, OS 관리 |

### UserDefaults

COMPARE_BLOCK:net_userdefaults

**중요**: 민감한 정보(비밀번호, 개인 식별 정보)는 `UserDefaults`에 저장하면 안 됩니다. 파일 시스템에 평문으로 저장되기 때문입니다. 인증 토큰이나 비밀번호는 `Keychain`을 사용하세요.

```swift
// Keychain 사용 (Security 프레임워크)
import Security

func saveToKeychain(key: String, value: String) {
    let data = value.data(using: .utf8)!
    let query: [String: Any] = [
        kSecClass as String: kSecClassGenericPassword,
        kSecAttrAccount as String: key,
        kSecValueData as String: data
    ]
    SecItemDelete(query as CFDictionary)  // 기존 삭제
    SecItemAdd(query as CFDictionary, nil)
}
```

### FileManager — 파일 저장

이미지 캐시, 다운로드한 파일, 사용자 문서 등을 저장할 때 사용합니다.

```swift
// 파일 저장 경로 — Documents (사용자 데이터) vs Caches (임시 캐시)
let documentsURL = FileManager.default.urls(
    for: .documentDirectory,
    in: .userDomainMask
).first!

let cachesURL = FileManager.default.urls(
    for: .cachesDirectory,
    in: .userDomainMask
).first!

// JSON 데이터 파일로 저장
func saveData<T: Encodable>(_ value: T, filename: String) throws {
    let url = documentsURL.appendingPathComponent(filename)
    let data = try JSONEncoder().encode(value)
    try data.write(to: url, options: .atomic)
}

// 파일에서 읽기
func loadData<T: Decodable>(filename: String) throws -> T {
    let url = documentsURL.appendingPathComponent(filename)
    let data = try Data(contentsOf: url)
    return try JSONDecoder().decode(T.self, from: data)
}

// 이미지 캐싱 예시
func cacheImage(_ image: UIImage, forKey key: String) {
    let url = cachesURL.appendingPathComponent(key)
    if let data = image.jpegData(compressionQuality: 0.8) {
        try? data.write(to: url)
    }
}

func loadCachedImage(forKey key: String) -> UIImage? {
    let url = cachesURL.appendingPathComponent(key)
    guard let data = try? Data(contentsOf: url) else { return nil }
    return UIImage(data: data)
}
```

### SwiftData — 구조화된 데이터 저장

iOS 17+에서 도입된 `SwiftData`는 Core Data의 현대적인 대안입니다. `@Model` 매크로로 간단하게 영속성 모델을 정의할 수 있습니다.

```swift
import SwiftData

// 모델 정의
@Model
class CachedUser {
    @Attribute(.unique) var id: Int
    var login: String
    var name: String?
    var avatarUrl: String
    var cachedAt: Date

    init(id: Int, login: String, name: String?, avatarUrl: String) {
        self.id = id
        self.login = login
        self.name = name
        self.avatarUrl = avatarUrl
        self.cachedAt = Date()
    }
}

// SwiftUI에서 사용
struct ContentView: View {
    @Environment(\.modelContext) private var context
    @Query(sort: \CachedUser.login) private var users: [CachedUser]

    var body: some View {
        List(users) { user in
            Text(user.login)
        }
    }
}

// 저장
let newUser = CachedUser(id: 1, login: "octocat", name: "The Octocat", avatarUrl: "...")
context.insert(newUser)

// 삭제
context.delete(user)
```

| 저장 방식 | iOS | Android | Web |
|----------|-----|---------|-----|
| 키-값 저장 | `UserDefaults` | `SharedPreferences` / `DataStore` | `localStorage` |
| 파일 저장 | `FileManager` | `FileOutputStream` / `File` | `IndexedDB` / File API |
| 관계형 DB | `SwiftData` / Core Data | `Room` | `IndexedDB` / SQLite (WASM) |
| 민감 정보 | `Keychain` | `EncryptedSharedPreferences` | `sessionStorage` / 서버 관리 |

> 💡 **Android 개발자라면**: SwiftData의 `@Model`은 Room의 `@Entity`와 유사하며, `@Query`는 `@Query` DAO 메서드처럼 데이터를 자동 감지·업데이트합니다.

> 💡 **웹 개발자라면**: `localStorage`는 탭/브라우저를 닫아도 유지되고, `sessionStorage`는 탭을 닫으면 사라집니다. iOS의 `UserDefaults`는 `localStorage`와 유사하게 영구 저장되며, 앱을 삭제하면 함께 삭제됩니다.

---

## 7. Combine 기초 (심화)

### Combine이란?

`Combine`은 Apple이 iOS 13에서 도입한 반응형 프로그래밍 프레임워크입니다. 시간이 지남에 따라 값을 발행(publish)하는 스트림을 선언적으로 처리합니다. RxJava/RxKotlin, RxJS와 동일한 개념입니다.

| Combine | RxJava/RxKotlin | RxJS |
|---------|-----------------|------|
| `Publisher` | `Observable` | `Observable` |
| `Subscriber` | `Observer` | `Observer` |
| `Subject` | `Subject` | `Subject` |
| `@Published` | `MutableStateFlow` | `BehaviorSubject` |
| `.sink()` | `.subscribe()` | `.subscribe()` |
| `.map()` | `.map()` | `.map()` |
| `AnyCancellable` | `Disposable` | `Subscription` |

### @Published 프로퍼티

`@Published`는 Combine과 SwiftUI를 연결하는 핵심 Property Wrapper입니다. 값이 변경될 때마다 자동으로 이벤트를 발행합니다.

```swift
class SearchViewModel: ObservableObject {
    @Published var query = ""             // 검색어
    @Published var results: [GitHubUser] = []
    @Published var isLoading = false

    private var cancellables = Set<AnyCancellable>()

    init() {
        // 검색어 변경 시 자동으로 검색 트리거 (debounce 포함)
        $query
            .debounce(for: .milliseconds(500), scheduler: RunLoop.main)
            .removeDuplicates()
            .filter { !$0.isEmpty }
            .sink { [weak self] query in
                Task {
                    await self?.performSearch(query: query)
                }
            }
            .store(in: &cancellables)
    }

    @MainActor
    private func performSearch(query: String) async {
        isLoading = true
        defer { isLoading = false }

        do {
            results = try await repository.search(query: query)
        } catch {
            print("Search error: \(error)")
        }
    }
}
```

### 주요 Combine 오퍼레이터

```swift
// map — 값 변환
$username
    .map { $0.lowercased() }
    .assign(to: &$normalizedUsername)

// filter — 조건 필터링
$searchText
    .filter { $0.count >= 3 }
    .sink { text in print("검색: \(text)") }

// combineLatest — 여러 스트림 결합
Publishers.CombineLatest($username, $password)
    .map { !$0.isEmpty && $1.count >= 8 }
    .assign(to: &$isLoginEnabled)

// flatMap — 스트림을 다른 스트림으로 변환
$query
    .flatMap { query in
        self.searchPublisher(query: query)
    }
    .sink { results in self.results = results }
```

> **참고**: iOS 15+에서는 Combine 대신 `async/await` + `AsyncStream`으로 많은 것을 해결할 수 있습니다. 새 프로젝트라면 async/await를 주로 사용하고, Combine은 `@Published`나 UI 바인딩 위주로 활용하는 것을 권장합니다.

---

## 8. 실전 예제 — GitHub 사용자 검색 앱

이 섹션에서는 지금까지 배운 모든 내용을 통합해 GitHub API로 사용자를 검색하는 완전한 기능을 구현합니다.

### 전체 아키텍처

```
SearchView (SwiftUI)
    ↕ @StateObject
SearchViewModel (@MainActor, ObservableObject)
    ↕ async/await
UserRepository
    ↕ async/await
NetworkService (actor)
    ↕ URLSession
GitHub API
```

### 완전한 구현

COMPARE_BLOCK:net_combined

### 이미지 비동기 로딩

GitHub 사용자 아바타 이미지를 비동기로 불러오는 방법입니다.

```swift
// AsyncImage — iOS 15+ 내장
struct UserRowView: View {
    let user: GitHubUser

    var body: some View {
        HStack(spacing: 12) {
            // URL에서 이미지 자동 로딩
            AsyncImage(url: URL(string: user.avatarUrl)) { phase in
                switch phase {
                case .empty:
                    ProgressView()
                        .frame(width: 44, height: 44)
                case .success(let image):
                    image
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                        .frame(width: 44, height: 44)
                        .clipShape(Circle())
                case .failure:
                    Image(systemName: "person.circle.fill")
                        .font(.system(size: 44))
                        .foregroundStyle(.gray)
                @unknown default:
                    EmptyView()
                }
            }

            VStack(alignment: .leading, spacing: 2) {
                Text(user.login)
                    .font(.headline)
                if let name = user.name {
                    Text(name)
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
                if let bio = user.bio {
                    Text(bio)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .lineLimit(2)
                }
            }

            Spacer()

            VStack(alignment: .trailing) {
                Label("\(user.followers)", systemImage: "person.2")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
        }
        .padding(.vertical, 4)
    }
}
```

### Pagination — 무한 스크롤

```swift
@MainActor
class SearchViewModel: ObservableObject {
    @Published var users: [GitHubUser] = []
    @Published var isLoading = false
    @Published var hasMore = true
    @Published var query = ""

    private var currentPage = 1
    private let perPage = 30
    private let repository = UserRepository()

    func search(query: String) {
        self.query = query
        users = []
        currentPage = 1
        hasMore = true
        Task { await loadNextPage() }
    }

    func loadNextPage() async {
        guard !isLoading, hasMore else { return }
        isLoading = true
        defer { isLoading = false }

        do {
            let newUsers = try await repository.searchUsers(
                query: query,
                page: currentPage,
                perPage: perPage
            )
            users.append(contentsOf: newUsers)
            hasMore = newUsers.count == perPage
            currentPage += 1
        } catch {
            print("Page load error: \(error)")
        }
    }
}

// View에서 무한 스크롤
struct SearchResultList: View {
    @ObservedObject var vm: SearchViewModel

    var body: some View {
        List {
            ForEach(vm.users) { user in
                UserRowView(user: user)
                    .onAppear {
                        // 마지막에서 5번째 아이템 보이면 다음 페이지 로드
                        if user.id == vm.users[max(0, vm.users.count - 5)].id {
                            Task { await vm.loadNextPage() }
                        }
                    }
            }

            if vm.isLoading {
                HStack {
                    Spacer()
                    ProgressView()
                    Spacer()
                }
            }
        }
    }
}
```

---

## 9. 네트워크 레이어 설계 요약

실제 프로덕션 앱의 네트워크 레이어는 다음과 같은 구조를 권장합니다.

```
NetworkClient (actor)
├── session: URLSession
├── decoder: JSONDecoder
└── request<T: Decodable>(...) async throws -> T

Repository Layer
├── UserRepository
│   ├── getUser(username:) async throws -> GitHubUser
│   └── searchUsers(query:page:) async throws -> [GitHubUser]
└── RepoRepository
    └── getRepos(username:) async throws -> [Repo]

ViewModel Layer (@MainActor)
├── SearchViewModel: ObservableObject
│   ├── @Published state
│   └── search(query:)
└── UserDetailViewModel: ObservableObject
    └── loadUser(username:)

View Layer (SwiftUI)
├── SearchView
├── UserDetailView
└── UserRowView
```

### 체크리스트

네트워크 기능 구현 시 반드시 확인할 항목입니다.

- [ ] HTTP 상태코드를 명시적으로 확인하고 있는가?
- [ ] 오류를 적절히 처리하고 사용자에게 안내하고 있는가?
- [ ] 민감한 정보(토큰)를 UserDefaults가 아닌 Keychain에 저장하고 있는가?
- [ ] UI 업데이트가 메인 스레드에서 이루어지고 있는가?(`@MainActor`)
- [ ] 뷰가 사라질 때 진행 중인 네트워크 요청을 취소하고 있는가?
- [ ] 로딩/에러/빈 상태를 각각 처리하고 있는가?
- [ ] 페이지네이션이 필요한 목록에 구현되어 있는가?

---

## 챕터 요약

| 개념 | Swift/iOS | Android (Kotlin) | Web (TypeScript) |
|------|-----------|------------------|------------------|
| HTTP 클라이언트 | `URLSession` | `OkHttp` / `Retrofit` | `fetch` / `axios` |
| JSON 직렬화 | `Codable` + `JSONDecoder` | `Gson` / `Moshi` | `JSON.parse` / `Zod` |
| 비동기 모델 | `async/await` + `Task` | `suspend` + `Coroutine` | `async/await` + `Promise` |
| 스레드 관리 | `@MainActor` | `Dispatchers.Main` | (싱글스레드) |
| 에러 처리 | `throws` / `do-catch` | `Result` / `try-catch` | `try-catch` / `Promise.catch` |
| 키-값 저장 | `UserDefaults` | `SharedPreferences` / `DataStore` | `localStorage` |
| 파일 저장 | `FileManager` | `File` / `FileOutputStream` | `IndexedDB` / File API |
| DB | `SwiftData` / `Core Data` | `Room` / `SQLite` | `IndexedDB` / SQLite (WASM) |
| 반응형 | `Combine` + `@Published` | `Flow` / `LiveData` | `RxJS` / `Zustand` / `Signals` |
