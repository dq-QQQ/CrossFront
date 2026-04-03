# Chapter 15. 고급 아키텍처

앱이 복잡해질수록 구조가 중요해집니다. 기능 하나 추가할 때마다 기존 코드를 건드려야 한다면 아키텍처가 무너진 신호입니다. 이 챕터에서는 iOS 생태계에서 실무적으로 쓰이는 고급 아키텍처 패턴들을 Android·웹과 철저히 비교합니다. TCA의 단방향 데이터 흐름, VIPER의 역할 분리, Coordinator의 화면 흐름 관리, Clean Architecture의 레이어 구조, SPM 기반 모듈화, 그리고 다양한 DI 전략을 실무 코드 수준으로 다룹니다.

---

## 1. TCA (The Composable Architecture)

### TCA란 무엇인가

TCA는 Point-Free(Brandon Williams & Stephen Celis)가 설계한 Swift 전용 단방향 아키텍처 라이브러리입니다. SwiftUI와 UIKit 모두에서 쓸 수 있으며, 2024년 기준 GitHub Star 12k+로 iOS 생태계에서 가장 영향력 있는 오픈소스 아키텍처 프레임워크입니다.

**핵심 철학**: 모든 상태 변경은 명시적인 Action을 통해서만 발생하며, Effect는 Reducer 외부에서 처리됩니다. 이는 React/Redux의 철학과 매우 유사하지만 Swift의 타입 시스템을 최대한 활용합니다.

### TCA 구성 요소

```
TCA 레이어 구조
├── State      — 해당 기능의 불변 상태 값 (struct)
├── Action     — 사용자 인터랙션 + 시스템 이벤트 열거형 (enum)
├── Reducer    — (State, Action) → (State, Effect) 순수 함수
├── Effect     — 비동기 사이드 이펙트 (네트워크, 타이머 등)
├── Store      — State를 보유하고 Action을 처리하는 런타임
└── @Dependency — 외부 의존성 주입 시스템
```

### Android MVI / Redux와 구조 비교

| 항목 | TCA (iOS) | MVI (Android) | Redux (웹) |
|------|-----------|---------------|-----------|
| 상태 타입 | `struct State` | `data class UiState` | `plain object` |
| 이벤트 타입 | `enum Action` | `sealed class Intent` | `type Action = { type: string }` |
| 상태 변경 | `Reducer` (순수 함수) | `ViewModel.reduce()` | `reducer(state, action)` |
| 사이드 이펙트 | `Effect<Action>` | `Flow<SideEffect>` | `Redux-Thunk / Saga` |
| DI | `@Dependency` | `@HiltViewModel` | `useSelector / Context` |
| 테스트 | `TestStore` | `turbine + coTest` | `mock store` |
| 범위 | 기능 단위 Reducer 조합 | ViewModel 단위 | 전역 Store |
| 구독 방식 | `store.observe(\.state)` | `collectAsState()` | `useSelector()` |

### Reducer: 상태 변경의 단일 진입점

COMPARE_BLOCK:arch_tca_reducer

### 주요 기능 상세

**Scope & Pullback**: 자식 Reducer를 부모에 합성합니다. 큰 앱을 기능 단위로 쪼갠 뒤 상위에서 조합할 수 있어 모듈화의 핵심입니다.

```swift
// 자식 Reducer를 부모에 합성
struct AppReducer: Reducer {
    struct State {
        var login: LoginFeature.State = LoginFeature.State()
        var home: HomeFeature.State = HomeFeature.State()
    }

    enum Action {
        case login(LoginFeature.Action)
        case home(HomeFeature.Action)
    }

    var body: some Reducer<State, Action> {
        Scope(state: \.login, action: \.login) {
            LoginFeature()
        }
        Scope(state: \.home, action: \.home) {
            HomeFeature()
        }
    }
}
```

**ifLet**: 옵셔널 자식 상태를 안전하게 처리합니다.

```swift
// 상세 화면이 nil일 때 Reducer 미실행
Reduce { state, action in
    // ...
}
.ifLet(\.detail, action: \.detail) {
    DetailFeature()
}
```

**forEach**: 리스트 아이템마다 독립적인 Reducer를 붙입니다.

```swift
Reduce { state, action in
    // ...
}
.forEach(\.items, action: \.items) {
    ItemFeature()
}
```

> 💡 **Android 개발자라면**: TCA의 Scope/Pullback은 Android의 SavedStateHandle을 각 ViewModel에 주입하는 개념과 유사하지만, 타입 안전하게 계층적으로 조합할 수 있다는 점이 다릅니다.

> 💡 **웹 개발자라면**: Redux의 `combineReducers`와 유사한 개념이지만 TCA는 상태 경로(KeyPath)를 통해 컴파일 타임에 타입 검증이 이루어집니다.

---

## 2. TCA Effect: 사이드 이펙트 처리

### Effect가 필요한 이유

Reducer는 순수 함수여야 합니다. 네트워크 요청, 파일 I/O, 타이머, 알림 스케줄링 등은 **순수하지 않은 연산**이므로 Effect로 분리됩니다. Effect는 Reducer에서 반환되며, Store가 실행을 위임받아 처리합니다.

```
사용자 탭 → Action 발송 → Reducer (순수) → Effect 반환 → Store가 비동기 실행
                              ↑                                    |
                              └──────── Action (결과) ◄────────────┘
```

### Effect 종류

| Effect 타입 | 용도 |
|------------|------|
| `.none` | 사이드 이펙트 없음 |
| `.run { }` | 비동기 Task (네트워크, DB 등) |
| `.send(action)` | 즉시 다른 Action 발송 |
| `.concatenate(...)` | 순차 Effect 체인 |
| `.merge(...)` | 병렬 Effect |
| `.cancel(id:)` | 진행 중인 Effect 취소 |
| `withEscapedDependencies` | Effect 내 의존성 접근 |

COMPARE_BLOCK:arch_tca_effect

### Effect 취소 패턴

```swift
// CancelID: 취소 식별자 (Hashable 필수)
private enum CancelID { case search }

var body: some Reducer<State, Action> {
    Reduce { state, action in
        switch action {
        case .searchTextChanged(let text):
            state.searchText = text
            // 이전 검색 요청 취소 후 디바운스
            return .run { send in
                try await Task.sleep(nanoseconds: 300_000_000) // 300ms
                await send(.searchResponse(try await apiClient.search(text)))
            }
            .cancellable(id: CancelID.search, cancelInFlight: true)

        case .cancelSearch:
            return .cancel(id: CancelID.search)

        // ...
        }
    }
}
```

> 💡 **Android 개발자라면**: `.cancellable(cancelInFlight: true)`는 Kotlin의 `job.cancel()` 후 재실행하는 패턴, 혹은 `flatMapLatest`와 동등합니다. TCA는 이를 선언적으로 표현합니다.

> 💡 **웹 개발자라면**: Redux-Saga의 `takeLatest`와 같은 개념입니다. TCA는 별도 미들웨어 없이 Reducer 내에서 취소 로직을 표현합니다.

---

## 3. TCA @Dependency: 의존성 주입

### 왜 @Dependency인가

TCA는 `@Dependency` 프로퍼티 래퍼를 통해 의존성을 주입합니다. 이는 세 가지 목적을 동시에 달성합니다:

1. **테스트 격리**: 프로덕션 의존성을 테스트용 Mock으로 자동 교체
2. **명시성**: Reducer가 어떤 외부 의존성에 의존하는지 코드에서 즉시 확인
3. **컴파일 타임 안전성**: 누락된 의존성은 컴파일 에러

COMPARE_BLOCK:arch_tca_dependency

### DependencyKey 프로토콜

```swift
// 의존성 정의 — 라이브/테스트/프리뷰 값을 함께 선언
struct APIClient {
    var fetchUser: (String) async throws -> User
    var updateProfile: (UserProfile) async throws -> Void
}

extension APIClient: DependencyKey {
    // 실제 앱에서 사용하는 구현체
    static let liveValue = APIClient(
        fetchUser: { id in
            let (data, _) = try await URLSession.shared.data(from: URL(string: "/users/\(id)")!)
            return try JSONDecoder().decode(User.self, from: data)
        },
        updateProfile: { profile in
            var request = URLRequest(url: URL(string: "/profile")!)
            request.httpMethod = "PUT"
            request.httpBody = try JSONEncoder().encode(profile)
            _ = try await URLSession.shared.data(for: request)
        }
    )

    // 테스트 시 기본값 (실제 네트워크 미호출)
    static let testValue = APIClient(
        fetchUser: { _ in .mock },
        updateProfile: { _ in }
    )

    // SwiftUI Preview 시 기본값
    static let previewValue = APIClient(
        fetchUser: { _ in .preview },
        updateProfile: { _ in }
    )
}

// DependencyValues에 등록
extension DependencyValues {
    var apiClient: APIClient {
        get { self[APIClient.self] }
        set { self[APIClient.self] = newValue }
    }
}
```

---

## 4. VIPER 아키텍처

### VIPER 개요

VIPER는 **V**iew-**I**nteractor-**P**resenter-**E**ntity-**R**outer의 약자입니다. 단일 책임 원칙(SRP)을 극단적으로 적용한 아키텍처로, iOS에서 대규모 앱 개발 시 사용됩니다. 각 레이어가 엄격히 분리되어 테스트하기 쉽지만, 보일러플레이트가 많아 소규모 기능에는 과도한 구조일 수 있습니다.

### 레이어별 역할

```
View ←→ Presenter ←→ Interactor ←→ Entity
            ↓
          Router ←→ 다른 Module
```

| 레이어 | 역할 | 의존 방향 |
|--------|------|-----------|
| **View** | UI 표시, 사용자 입력 전달 | → Presenter |
| **Interactor** | 비즈니스 로직, UseCase 실행 | → Entity, 외부 서비스 |
| **Presenter** | View ↔ Interactor 중재, 표시 로직 | → View, Interactor |
| **Entity** | 순수 데이터 모델 (비즈니스 오브젝트) | 없음 |
| **Router** | 화면 전환 로직 | → 다른 모듈 Builder |

### Android Clean / React Feature 구조와 비교

COMPARE_BLOCK:arch_viper_structure

### VIPER 적합 시나리오

**사용하면 좋은 경우:**
- 팀 규모가 크고 기능별 소유권 분리가 명확해야 할 때
- 동일 기능을 여러 플랫폼(iOS, iPadOS, macOS)에 적용할 때
- 레거시 Objective-C 코드베이스 위에 점진적으로 적용할 때
- 모든 비즈니스 로직을 100% 유닛 테스트해야 할 때

**주의할 점:**
- 5개 파일 × 기능 수 = 엄청난 파일 수
- 프로토콜 기반 인터페이스가 많아 Xcode에서 정의로 이동이 번거로울 수 있음
- SwiftUI와의 궁합은 UIKit보다 어색함 (SwiftUI View는 Presenter와 직접 연결하기 어색)

> 💡 **Android 개발자라면**: VIPER의 Interactor는 Android Clean Architecture의 UseCase와 거의 동일합니다. Router는 Android Navigation Component의 NavController와 유사하지만 완전히 프로그래매틱합니다.

> 💡 **웹 개발자라면**: Next.js의 Feature 폴더 구조(`/features/auth/components`, `/features/auth/hooks`, `/features/auth/api`)와 목적은 비슷하지만, VIPER는 레이어 간 의존 방향을 단방향으로 엄격히 강제합니다.

---

## 5. Coordinator 패턴

### 화면 흐름을 누가 책임지는가

SwiftUI의 `NavigationStack`이나 UIKit의 `UINavigationController`는 화면 이동 API를 제공하지만, "어느 화면에서 어느 화면으로 이동해야 하는가"의 비즈니스 로직은 View나 ViewController가 직접 알면 안 됩니다. Coordinator는 이 책임을 분리합니다.

**문제 상황**: 로그인 화면이 "로그인 성공 후 홈으로, 첫 실행이면 온보딩으로, 관리자면 어드민 패널로" 분기해야 할 때 View에 이 로직이 있으면 재사용도 테스트도 어렵습니다.

### Coordinator 패턴 구조

```swift
// 코디네이터 프로토콜
protocol Coordinator: AnyObject {
    var childCoordinators: [Coordinator] { get set }
    func start()
}

// 앱 레벨 코디네이터
class AppCoordinator: Coordinator {
    var childCoordinators: [Coordinator] = []
    private let window: UIWindow

    init(window: UIWindow) {
        self.window = window
    }

    func start() {
        if AuthService.shared.isLoggedIn {
            showMain()
        } else {
            showAuth()
        }
    }

    private func showAuth() {
        let coordinator = AuthCoordinator(window: window)
        coordinator.onFinish = { [weak self] in
            self?.childCoordinators.removeAll { $0 is AuthCoordinator }
            self?.showMain()
        }
        childCoordinators.append(coordinator)
        coordinator.start()
    }

    private func showMain() {
        let coordinator = MainTabCoordinator(window: window)
        childCoordinators.append(coordinator)
        coordinator.start()
    }
}
```

COMPARE_BLOCK:arch_coordinator

### SwiftUI에서의 Coordinator

SwiftUI는 NavigationStack의 path 기반 라우팅이 강력해져서 고전적인 UIKit Coordinator를 그대로 쓰기 어렵습니다. 실무에서는 다음 두 가지 접근이 병존합니다:

**접근 1: NavigationPath + AppRouter (권장)**

```swift
// 네비게이션 대상을 enum으로 정의
enum AppRoute: Hashable {
    case login
    case home
    case profile(userID: String)
    case settings
    case onboarding(step: Int)
}

// 앱 전체 라우터
@Observable
class AppRouter {
    var path = NavigationPath()
    var presentedSheet: AppRoute?
    var presentedFullScreen: AppRoute?

    func push(_ route: AppRoute) {
        path.append(route)
    }

    func pop() {
        path.removeLast()
    }

    func popToRoot() {
        path.removeLast(path.count)
    }

    func present(_ route: AppRoute, style: PresentationStyle = .sheet) {
        switch style {
        case .sheet: presentedSheet = route
        case .fullScreen: presentedFullScreen = route
        }
    }

    func dismiss() {
        presentedSheet = nil
        presentedFullScreen = nil
    }
}

// 루트 뷰
struct AppView: View {
    @State private var router = AppRouter()

    var body: some View {
        NavigationStack(path: $router.path) {
            HomeView()
                .navigationDestination(for: AppRoute.self) { route in
                    routeView(for: route)
                }
        }
        .sheet(item: $router.presentedSheet) { route in
            routeView(for: route)
        }
        .environment(router)
    }

    @ViewBuilder
    private func routeView(for route: AppRoute) -> some View {
        switch route {
        case .login: LoginView()
        case .home: HomeView()
        case .profile(let id): ProfileView(userID: id)
        case .settings: SettingsView()
        case .onboarding(let step): OnboardingView(step: step)
        }
    }
}
```

**접근 2: TCA NavigationStack 통합**

TCA 1.0+에서는 `navigationDestination(store:)`를 통해 TCA Store와 NavigationStack을 통합합니다. Coordinator 역할을 부모 Reducer가 담당하며 타입 안전한 화면 전환을 보장합니다.

> 💡 **Android 개발자라면**: Coordinator 패턴의 `NavigationPath + AppRouter`는 Android Navigation Component의 NavController + SafeArgs와 유사합니다. `AppRoute` enum은 SafeArgs의 Destination과 같은 역할입니다.

> 💡 **웹 개발자라면**: React Router v6의 `<Routes>` + `useNavigate()`와 구조적으로 동일합니다. `AppRouter`의 `push/pop`은 `navigate('/profile/123')`과 동일한 추상화입니다.

---

## 6. Clean Architecture

### 레이어 구조

Clean Architecture는 Uncle Bob(Robert C. Martin)의 원칙을 iOS에 적용한 것입니다. 의존성은 항상 바깥 레이어에서 안쪽 레이어(Domain)를 향합니다.

```
Presentation Layer (SwiftUI View / ViewModel)
         ↓
Domain Layer (UseCase, Repository Protocol, Entity)
         ↓
Data Layer (Repository 구현체, Remote/Local DataSource, DTO)
```

**핵심 원칙**: Domain Layer는 iOS 프레임워크를 `import`하지 않습니다. UIKit, SwiftUI, Foundation도 최소화합니다. 이렇게 하면 Domain 로직을 macOS, watchOS, 서버(Vapor) 등에도 재사용할 수 있습니다.

### UseCase: 비즈니스 로직의 단위

COMPARE_BLOCK:arch_clean_usecase

### Repository 패턴

COMPARE_BLOCK:arch_clean_repository

### Domain Layer 격리 예시

```swift
// Domain Layer — iOS 프레임워크 미사용
// import Foundation 최소화

// Entity (비즈니스 규칙을 포함한 순수 Swift 타입)
struct User {
    let id: String
    let email: String
    let displayName: String
    var isPremium: Bool

    // 비즈니스 규칙: 사용자 이름 유효성
    var isValidDisplayName: Bool {
        displayName.count >= 2 && displayName.count <= 30
    }
}

// Repository 프로토콜 (구현 없이 계약만)
protocol UserRepository {
    func getUser(id: String) async throws -> User
    func updateUser(_ user: User) async throws -> User
    func deleteUser(id: String) async throws
}

// UseCase
struct GetUserProfileUseCase {
    let repository: UserRepository

    func execute(userID: String) async throws -> User {
        let user = try await repository.getUser(id: userID)
        // 비즈니스 규칙: 프리미엄 만료 체크 등
        return user
    }
}

// ─────────────────────────────────
// Data Layer — 실제 구현체
// ─────────────────────────────────
struct UserRepositoryImpl: UserRepository {
    let remoteDataSource: UserRemoteDataSource
    let localDataSource: UserLocalDataSource

    func getUser(id: String) async throws -> User {
        // 캐시 우선 전략
        if let cached = try? await localDataSource.getUser(id: id) {
            return cached
        }
        let dto = try await remoteDataSource.fetchUser(id: id)
        let user = dto.toDomain() // DTO → Domain Entity 변환
        try? await localDataSource.saveUser(user)
        return user
    }

    func updateUser(_ user: User) async throws -> User {
        let dto = try await remoteDataSource.updateUser(UserDTO(from: user))
        let updated = dto.toDomain()
        try? await localDataSource.saveUser(updated)
        return updated
    }

    func deleteUser(id: String) async throws {
        try await remoteDataSource.deleteUser(id: id)
        try? await localDataSource.deleteUser(id: id)
    }
}
```

> 💡 **Android 개발자라면**: iOS Clean Architecture는 Android Clean Architecture(Uncle Bob 적용)와 거의 동일합니다. UseCase 클래스가 `operator fun invoke()`를 갖는지 vs Swift struct에 `execute()`를 갖는지 정도의 차이입니다.

> 💡 **웹 개발자라면**: React Query의 `queryFn`이 Data Layer, `useQuery` 훅이 UseCase + Presentation 경계 역할을 합니다. Clean Architecture는 이를 명시적 레이어로 분리합니다.

---

## 7. Swift Package Manager로 피처 모듈 분리

### 왜 모듈화인가

모노리식 앱 타겟은 코드가 늘어날수록 빌드 시간이 기하급수적으로 증가합니다. 기능 A를 수정했는데 기능 B까지 재컴파일되는 상황이 반복됩니다. 모듈화는 이를 해결합니다:

| 문제 | 모듈화 해결책 |
|------|-------------|
| 빌드 시간 증가 | 변경된 모듈만 재컴파일 |
| 기능 간 경계 없음 | 접근 제어(`internal`, `public`)로 강제 |
| 팀 간 충돌 | 모듈 단위 소유권 분리 |
| 테스트 속도 | 모듈 단위 독립 테스트 |
| 코드 재사용 | 다른 앱 타겟(위젯, 확장 앱)에서 공유 |

### SPM 모듈 구조 설계

```
MyApp/
├── App/                     ← 앱 타겟 (최소한의 진입점만)
│   ├── MyApp.swift
│   └── ContentView.swift
├── Sources/
│   ├── AppFeature/          ← 앱 루트 기능 (라우팅)
│   ├── HomeFeature/         ← 홈 피처
│   ├── ProfileFeature/      ← 프로필 피처
│   ├── AuthFeature/         ← 인증 피처
│   ├── DesignSystem/        ← 공통 UI 컴포넌트
│   ├── NetworkKit/          ← 네트워크 레이어
│   ├── DatabaseKit/         ← 데이터베이스 레이어
│   └── CoreDomain/          ← 공통 도메인 모델
└── Package.swift
```

COMPARE_BLOCK:arch_modularization

### 접근 제어 전략

```swift
// DesignSystem 모듈 — 공개 API만 노출
// Sources/DesignSystem/DSButton.swift

public struct DSButton: View {
    public enum Style {
        case primary, secondary, destructive
    }

    public let title: String
    public let style: Style
    public let action: () -> Void

    // public init 필수 — 다른 모듈에서 생성 가능하게
    public init(title: String, style: Style = .primary, action: @escaping () -> Void) {
        self.title = title
        self.style = style
        self.action = action
    }

    public var body: some View {
        Button(title, action: action)
            .buttonStyle(DSButtonStyle(style: style))
    }
}

// internal — 모듈 내부에서만 사용 (기본값)
struct DSButtonStyle: ButtonStyle {
    let style: DSButton.Style

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding(.horizontal, 16)
            .padding(.vertical, 10)
            .background(backgroundColor(for: style))
            .foregroundColor(.white)
            .cornerRadius(8)
            .opacity(configuration.isPressed ? 0.8 : 1.0)
    }

    private func backgroundColor(for style: DSButton.Style) -> Color {
        switch style {
        case .primary: return .blue
        case .secondary: return .gray
        case .destructive: return .red
        }
    }
}
```

### 모듈 간 의존성 규칙

```
앱 타겟
└── AppFeature (라우터, 앱 상태)
    ├── HomeFeature
    │   ├── CoreDomain
    │   ├── DesignSystem
    │   └── NetworkKit
    ├── ProfileFeature
    │   ├── CoreDomain
    │   ├── DesignSystem
    │   └── DatabaseKit
    └── AuthFeature
        ├── CoreDomain
        └── NetworkKit

규칙:
- Feature 모듈은 다른 Feature 모듈을 직접 의존하지 않음
- Feature 간 통신은 AppFeature(또는 AppCoordinator)를 통해서만
- CoreDomain은 어떤 모듈도 의존하지 않음 (최하위)
- DesignSystem은 CoreDomain만 의존 가능
```

> 💡 **Android 개발자라면**: SPM 모듈화는 Android의 Gradle 멀티모듈과 목적과 구조가 동일합니다. `Package.swift`가 `build.gradle`의 역할이고, SPM의 `target.dependencies`가 Gradle의 `implementation(project(":feature:home"))`에 해당합니다.

> 💡 **웹 개발자라면**: Nx monorepo의 `libs/` 구조와 유사합니다. Nx의 `tags`와 `depConstraints`가 SPM의 접근 제어(`public`/`internal`)와 같은 역할을 합니다.

---

## 8. Dependency Injection 전략

### iOS DI 생태계 개요

iOS에서는 몇 가지 DI 접근 방식이 공존합니다. 프로젝트 규모와 아키텍처 선택에 따라 적합한 방법이 다릅니다.

| 방식 | 라이브러리 | 적합 아키텍처 | 특징 |
|------|-----------|-------------|------|
| 생성자 주입 (수동) | 없음 | 모든 패턴 | 가장 단순, 보일러플레이트 |
| Environment | SwiftUI 기본 | SwiftUI 앱 | 뷰 트리 통해 자동 전파 |
| @Dependency | TCA | TCA | 컴파일 타임 안전, 테스트 강력 |
| Swinject | Swinject | UIKit, MVVM, VIPER | 런타임 DI, 복잡한 그래프 |
| Factory | Factory | MVVM, Clean | 경량, 스레드 안전, 테스트 쉬움 |

COMPARE_BLOCK:arch_dependency_injection

### Factory 패턴 (경량 DI)

Factory는 Mike Buss가 만든 Swift 전용 경량 DI 라이브러리입니다. Swinject보다 타입 안전하고 설정이 간단합니다.

```swift
// Factory 등록 — Service Locator 스타일
extension Container {
    var userRepository: Factory<UserRepository> {
        self { UserRepositoryImpl() }
    }

    var apiClient: Factory<APIClientProtocol> {
        self { APIClient(baseURL: AppConfig.baseURL) }
            .singleton // 앱 전체에서 하나만
    }

    var analyticsService: Factory<AnalyticsProtocol> {
        self { FirebaseAnalyticsAdapter() }
            .singleton
    }
}

// 사용 — 생성자 주입
class ProfileViewModel: ObservableObject {
    @Injected(\.userRepository) private var repository
    @Injected(\.analyticsService) private var analytics

    func loadProfile() async {
        // ...
    }
}

// 테스트 — Mock으로 교체
class ProfileViewModelTests: XCTestCase {
    override func setUp() {
        // 테스트에서 Mock으로 교체
        Container.shared.userRepository.register { MockUserRepository() }
    }

    override func tearDown() {
        Container.shared.reset()
    }
}
```

### Swinject (엔터프라이즈 DI)

```swift
// Swinject 컨테이너 설정
let container = Container()

// 등록
container.register(NetworkSession.self) { _ in
    URLSession.shared
}

container.register(APIClientProtocol.self) { r in
    APIClient(session: r.resolve(NetworkSession.self)!)
}
.inObjectScope(.container) // 싱글톤

container.register(UserRepository.self) { r in
    UserRepositoryImpl(
        apiClient: r.resolve(APIClientProtocol.self)!
    )
}

// Assembly 패턴으로 등록 그룹화
class NetworkAssembly: Assembly {
    func assemble(container: Container) {
        container.register(NetworkSession.self) { _ in URLSession.shared }
        container.register(APIClientProtocol.self) { r in
            APIClient(session: r.resolve(NetworkSession.self)!)
        }
        .inObjectScope(.container)
    }
}

let assembler = Assembler([
    NetworkAssembly(),
    RepositoryAssembly(),
    ViewModelAssembly(),
])
```

> 💡 **Android 개발자라면**: Hilt/Dagger는 어노테이션 프로세서로 컴파일 타임 DI를 합니다. iOS의 `@Dependency`(TCA)가 가장 유사하고, Swinject는 Koin(런타임 DI)과 비슷합니다. Factory는 Koin보다 타입 안전합니다.

> 💡 **웹 개발자라면**: tsyringe/InversifyJS는 데코레이터 기반 런타임 DI로 Swinject와 유사합니다. TCA의 `@Dependency`는 React의 Context API와 개념적으로 유사하지만 전역이 아닌 Reducer 스코프에서 동작합니다.

---

## 9. TCA 테스팅 전략

### TestStore: 결정론적 테스트

TCA의 가장 강력한 장점 중 하나가 **TestStore**입니다. 모든 상태 변화를 단계별로 검증하며, 예상치 못한 상태 변경이 있으면 테스트가 실패합니다. 이는 앱 동작을 문서처럼 명세할 수 있게 해줍니다.

```swift
// TCA TestStore의 핵심 원칙:
// 1. 모든 Action 발송 후 상태 변화를 명시적으로 선언
// 2. 선언하지 않은 상태 변화가 있으면 실패
// 3. 모든 Effect가 완료되었는지 검증
```

COMPARE_BLOCK:arch_testing_tca

### TestStore 고급 패턴

```swift
// 네트워크 에러 시나리오 테스트
@Test
func testLoadProfileFailure() async {
    let store = TestStore(initialState: ProfileFeature.State()) {
        ProfileFeature()
    } withDependencies: {
        $0.apiClient.fetchUser = { _ in
            throw NetworkError.serverError(500)
        }
    }

    await store.send(.loadProfile) {
        $0.isLoading = true
    }

    await store.receive(\.profileResponse.failure) {
        $0.isLoading = false
        $0.errorMessage = "서버 오류가 발생했습니다. (500)"
    }
}

// 시간 의존적 동작 테스트 (타이머, 디바운스)
@Test
func testSearchDebounce() async {
    let clock = TestClock()
    let store = TestStore(initialState: SearchFeature.State()) {
        SearchFeature()
    } withDependencies: {
        $0.continuousClock = clock
        $0.searchClient.search = { query in [.mock(name: query)] }
    }

    await store.send(.textChanged("swift")) {
        $0.query = "swift"
    }

    // 300ms 경과 전에는 검색 미발생
    await clock.advance(by: .milliseconds(200))
    // 아직 effect 없음 — TestStore가 자동 검증

    // 300ms 경과 후 검색 발생
    await clock.advance(by: .milliseconds(100))

    await store.receive(\.searchResponse.success) {
        $0.results = [.mock(name: "swift")]
    }
}
```

### TestStore vs 일반 XCTest 비교

```
일반 XCTest:
- ViewModel.load() 호출
- XCTAssertEqual(viewModel.state, .loading)     // 상태 A 검증
- await Task.sleep(seconds: 1)                  // 비동기 대기
- XCTAssertEqual(viewModel.users.count, 3)      // 상태 B 검증

TestStore:
- store.send(.load) { $0.isLoading = true }     // 발송 + 즉각 검증
- store.receive(\.usersLoaded) { $0.users = [mock1, mock2, mock3] }  // Effect 결과 검증
- 임의의 Task.sleep 불필요, 결정론적 실행 보장
```

> 💡 **Android 개발자라면**: TCA TestStore는 Turbine 라이브러리로 `StateFlow`를 단계별로 검증하는 것과 유사합니다. 다만 TestStore는 "모든 상태 변화를 명시해야 한다"는 더 엄격한 계약을 요구합니다.

> 💡 **웹 개발자라면**: Redux의 `redux-mock-store` + `jest`보다 훨씬 엄격합니다. 모든 Action 흐름과 상태 변화를 순서대로 선언해야 하며, 누락 시 테스트 실패 — 이것이 "exhaustive testing"입니다.

---

## 10. 아키텍처 선택 가이드

### 프로젝트 특성별 추천

| 시나리오 | 추천 아키텍처 | 이유 |
|---------|------------|------|
| 스타트업 신규 앱 (팀 1~3명) | MVVM + Clean Architecture | 빠른 개발, 충분한 구조 |
| 복잡한 단방향 상태 관리 필요 | TCA | Effect 취소, 테스트, 조합 |
| 레거시 UIKit 대규모 앱 | VIPER | 명확한 역할 분리, 점진적 적용 |
| 팀 규모 확장, 빌드 시간 문제 | TCA + SPM 모듈화 | 기능별 소유권 + 빌드 최적화 |
| SwiftUI 신규 앱, 빠른 프로토타입 | MVVM + @Observable | Xcode 미리보기 활용 최적 |
| 엔터프라이즈 (팀 10명+) | TCA 또는 Clean + Coordinator | 명확한 경계, 테스트 용이 |

### 패턴 간 조합 가능성

```
실무에서 자주 보이는 조합:

1. TCA + SPM 모듈화 + swift-dependencies
   → 현재 가장 현대적인 조합. Point-Free 권장 방식.

2. Clean Architecture + Coordinator + Swinject
   → UIKit 레거시 앱에서 많이 사용.

3. MVVM + @Observable + Factory DI
   → SwiftUI 중소 앱에서 균형 잡힌 선택.

4. VIPER + Clean Architecture
   → 엔터프라이즈, 테스트 커버리지 100% 요구 시.
```

### 점진적 도입 전략

완전히 새로운 아키텍처를 레거시 앱에 한 번에 적용하는 것은 위험합니다. 실무에서 검증된 점진적 전략:

```
1단계 (즉시): 새로 추가되는 기능에만 새 아키텍처 적용
2단계 (3개월): 가장 버그가 많은 기존 기능 리팩토링
3단계 (6개월): 나머지 기능 점진적 마이그레이션
4단계 (12개월): 레거시 코드 제거, 아키텍처 통일
```

> **핵심 조언**: 완벽한 아키텍처는 없습니다. 팀이 이해하고 유지할 수 있는 아키텍처가 최선입니다. 복잡한 TCA를 팀원 아무도 이해 못 한다면 간단한 MVVM이 낫습니다.

---

## 정리

이 챕터에서 다룬 아키텍처 패턴들은 각각 해결하려는 문제가 다릅니다:

| 패턴 | 핵심 해결 문제 |
|------|-------------|
| **TCA** | 복잡한 상태·사이드 이펙트의 예측 가능한 관리 |
| **VIPER** | 레이어별 단일 책임, 대규모 팀 협업 |
| **Coordinator** | 화면 흐름 로직의 View 분리 |
| **Clean Architecture** | 비즈니스 로직의 프레임워크 독립성 |
| **SPM 모듈화** | 빌드 시간 단축, 기능 경계 강제 |
| **DI 패턴** | 의존성 교체 가능성, 테스트 격리 |

Android·웹 개발자에게 가장 낯선 개념은 아마 TCA의 `@Dependency`와 `TestStore`일 것입니다. 하지만 한 번 익히면 앱 상태를 완전히 통제하는 경험을 할 수 있습니다. 실습은 [TCA GitHub 저장소](https://github.com/pointfreeco/swift-composable-architecture)의 예제 앱으로 시작하세요.
