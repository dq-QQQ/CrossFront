# Chapter 9. 테스팅 전략

앱을 빠르게 만드는 것보다 **깨지지 않게 만드는 것**이 더 어렵습니다. 테스트는 리팩토링 안전망이고, 팀 협업의 계약이며, 버그 재발을 막는 문서입니다. 이 챕터에서는 iOS 테스팅 생태계의 전체 지형을 실무 관점에서 살펴봅니다. Android와 웹 개발자가 이미 알고 있는 JUnit/Mockito/Jest/Espresso/Playwright와 하나하나 비교하면서, XCTest와 XCUITest의 설계 철학을 이해합니다.

---

## 1. iOS 테스팅 생태계 개요

### 계층별 테스트 전략

테스팅 피라미드는 플랫폼을 불문하고 유효한 원칙입니다.

| 계층 | iOS | Android | Web |
|------|-----|---------|-----|
| 단위 테스트 | XCTest | JUnit 4/5 | Jest / Vitest |
| 통합 테스트 | XCTest + 실제 의존성 | JUnit + Robolectric | Jest + Testing Library |
| UI/E2E 테스트 | XCUITest | Espresso / UIAutomator | Playwright / Cypress |
| 스냅샷 테스트 | swift-snapshot-testing | Paparazzi / Screenshot Tests | Jest Snapshot |
| 성능 테스트 | XCTMetric (XCTest) | Android Benchmark | Lighthouse / k6 |

**iOS만의 특징**:
- 테스팅 프레임워크가 Xcode에 완전히 통합되어 있습니다. 별도 라이브러리 없이 `XCTest`만으로 단위·통합·성능 테스트 모두 가능합니다.
- UI 테스트(`XCUITest`)도 같은 프레임워크 아래에 있어 설정 부담이 없습니다.
- 실제 기기와 시뮬레이터 모두에서 동일한 테스트 스위트를 실행할 수 있습니다.
- `xcodebuild test` 명령으로 CI 통합이 직관적입니다.

> 💡 **Android 개발자라면**: JUnit이 별도 라이브러리인 것과 달리, XCTest는 Xcode 내장입니다. Mockito에 해당하는 공식 mocking 라이브러리는 없고, 대신 Swift의 Protocol을 활용한 DI 기반 mocking이 관용적 방식입니다.

> 💡 **웹 개발자라면**: Jest의 `describe/it/expect` 문법과 XCTest의 `class/func test/XCTAssert` 문법은 다르게 생겼지만 역할은 동일합니다. 가장 큰 차이는 XCTest가 클래스 기반이라는 점과, 비동기 테스트 패턴이 다르다는 점입니다.

### Test Target 구조

Xcode 프로젝트에는 앱 타겟과 별도로 **Test Target**이 존재합니다.

```
MyApp (App Target)
├── Sources/
│   ├── Models/
│   ├── ViewModels/
│   └── Views/
MyAppTests (Unit Test Target)         ← XCTestCase 서브클래스
└── MyAppUITests (UI Test Target)     ← XCUIApplication 제어
```

테스트 타겟은 앱 바이너리를 **import** 하거나 **@testable import**로 내부 접근 레벨을 열어서 테스트합니다.

```swift
// 테스트 파일 최상단
@testable import MyApp   // internal 멤버까지 테스트에서 접근 가능
import XCTest
```

> 💡 **Android 개발자라면**: `@testable import`는 Android의 `@VisibleForTesting`과 비슷한 개념입니다. 단, iOS에서는 어노테이션이 아닌 import 선언 자체로 접근성을 확장합니다.

---

## 2. XCTest 단위 테스트 기초

### 테스트 클래스 구조

COMPARE_BLOCK:testing_xctest_basic

### 생명주기 메서드

XCTest의 생명주기는 JUnit의 `@Before/@After`와 직접 대응됩니다.

```swift
final class CartViewModelTests: XCTestCase {

    var sut: CartViewModel!     // SUT = System Under Test
    var mockRepository: MockCartRepository!

    // 각 테스트 함수 실행 전 호출 — JUnit의 @Before, Jest의 beforeEach
    override func setUp() {
        super.setUp()
        mockRepository = MockCartRepository()
        sut = CartViewModel(repository: mockRepository)
    }

    // 각 테스트 함수 실행 후 호출 — JUnit의 @After, Jest의 afterEach
    override func tearDown() {
        sut = nil
        mockRepository = nil
        super.tearDown()
    }

    // 모든 테스트 전에 한 번만 실행 — JUnit의 @BeforeClass, Jest의 beforeAll
    override class func setUp() {
        super.setUp()
        // 예: 테스트용 데이터베이스 초기화
    }

    // 모든 테스트 후에 한 번만 실행 — JUnit의 @AfterClass, Jest의 afterAll
    override class func tearDown() {
        // 예: 테스트용 데이터베이스 정리
        super.tearDown()
    }

    func testAddItem_increasesCount() {
        // Given
        let item = CartItem(id: "1", name: "테스트 상품", price: 1000)

        // When
        sut.addItem(item)

        // Then
        XCTAssertEqual(sut.itemCount, 1)
    }
}
```

**SUT(System Under Test) 패턴**: 테스트 대상 객체를 `sut`라는 이름으로 선언하는 것은 iOS 테스트 커뮤니티의 관용적 컨벤션입니다. `var sut: CartViewModel!`처럼 암묵적 옵셔널(`!`)을 쓰는 것은 `setUp`에서 반드시 초기화됨이 보장되기 때문입니다.

### Given-When-Then 패턴

모든 테스트 함수 내부를 **Given-When-Then** 섹션으로 구조화하는 것이 실무 표준입니다.

```swift
func testCheckout_withEmptyCart_throwsError() {
    // Given: 빈 장바구니 상태
    XCTAssertTrue(sut.items.isEmpty)

    // When & Then: checkout 호출 시 에러 throw 여부 확인
    XCTAssertThrowsError(try sut.checkout()) { error in
        XCTAssertEqual(error as? CartError, CartError.emptyCart)
    }
}
```

Android의 Arrange-Act-Assert(AAA), Jest의 describe/it 중첩 구조와 동일한 목적입니다. 팀 내에서 스타일을 통일하는 것이 중요합니다.

---

## 3. XCTAssert 종류와 활용

### Assertion 전체 목록 비교

COMPARE_BLOCK:testing_xctest_assertions

### 커스텀 실패 메시지

모든 XCTAssert 함수는 마지막 파라미터로 실패 메시지를 받습니다.

```swift
XCTAssertEqual(
    sut.totalPrice,
    expectedPrice,
    "장바구니 아이템 3개의 합산 금액이 일치해야 합니다. " +
    "실제: \(sut.totalPrice), 기대: \(expectedPrice)"
)
```

메시지를 구체적으로 작성할수록 CI에서 실패 로그만 봐도 원인을 파악할 수 있습니다.

### XCTUnwrap — 옵셔널 안전 언래핑

```swift
func testFirstItem_existsAfterAdd() throws {
    // given
    sut.addItem(CartItem(id: "1", name: "상품", price: 500))

    // when
    // XCTUnwrap: nil이면 테스트 실패 (크래시 없음) — Swift 5.1+
    let firstItem = try XCTUnwrap(sut.items.first)

    // then
    XCTAssertEqual(firstItem.id, "1")
}
```

`XCTUnwrap`은 옵셔널 값이 `nil`이면 테스트를 실패시키고 즉시 종료합니다. `!`로 강제 언래핑하면 테스트 크래시가 나지만, `XCTUnwrap`은 테스트 실패로 깔끔하게 처리합니다.

### XCTExpectFailure — 알려진 실패 처리

```swift
func testKnownBug_willFixInNextSprint() {
    XCTExpectFailure("JIRA-1234: 할인 계산 오류, 다음 스프린트에 수정 예정")
    XCTAssertEqual(sut.discountedPrice(for: 0.1), 900)
}
```

알려진 버그가 있지만 다른 팀원의 CI를 막고 싶지 않을 때 사용합니다. 실패가 예상되는 테스트를 삭제하지 않고 코드로 문서화하는 방법입니다.

---

## 4. Protocol 기반 Mock 만들기

### Mock vs Stub vs Fake — 용어 정리

| 종류 | 설명 | 사용 상황 |
|------|------|---------|
| **Mock** | 호출 여부, 횟수, 인자를 검증하는 객체 | "이 메서드가 정확히 1번 호출되었는가?" |
| **Stub** | 미리 정해진 값을 반환하는 객체 | "네트워크 없이 특정 응답을 시뮬레이션" |
| **Fake** | 실제 동작하는 경량 대체 구현 | "인메모리 데이터베이스로 Repository 대체" |
| **Spy** | 실제 객체를 감싸서 호출 정보를 기록 | "실제 동작하면서 사이드 이펙트 추적" |

### Protocol 기반 Dependency Injection

COMPARE_BLOCK:testing_mock_protocol

### 검증 패턴 심화

```swift
// 호출 횟수 검증
final class MockAnalyticsService: AnalyticsServiceProtocol {
    var trackedEvents: [(name: String, params: [String: Any])] = []

    func track(event name: String, params: [String: Any]) {
        trackedEvents.append((name: name, params: params))
    }

    // 편의 속성들
    var trackCallCount: Int { trackedEvents.count }

    func lastEvent(named eventName: String) -> [String: Any]? {
        trackedEvents.last(where: { $0.name == eventName })?.params
    }
}

// 테스트에서 검증
func testAddItem_tracksAddToCartEvent() {
    // given
    let analytics = MockAnalyticsService()
    let sut = CartViewModel(analytics: analytics)

    // when
    sut.addItem(CartItem(id: "1", name: "테스트 상품", price: 1000))

    // then
    XCTAssertEqual(analytics.trackCallCount, 1)
    XCTAssertEqual(analytics.trackedEvents[0].name, "add_to_cart")

    let params = try XCTUnwrap(analytics.lastEvent(named: "add_to_cart"))
    XCTAssertEqual(params["item_id"] as? String, "1")
    XCTAssertEqual(params["price"] as? Int, 1000)
}
```

### 서드파티 Mock 라이브러리

Swift에는 공식 Mockito가 없지만, 다음 라이브러리들이 실무에서 사용됩니다.

| 라이브러리 | 특징 | 비고 |
|-----------|------|------|
| **Mockingbird** | 컴파일 타임 mock 자동 생성 | Xcode Build Phase 통합 |
| **Cuckoo** | Ruby mock 라이브러리 영감, 코드 생성 | Kotlin Mockito와 유사한 API |
| **SwiftyMocky** | Sourcery 기반 코드 생성 | 대규모 프로젝트에 적합 |

팀 규모가 작다면 Protocol + 수동 Mock이 의존성 없이 가장 안정적입니다. 규모가 커지면 코드 생성 도구를 도입하는 것이 유지보수 비용을 줄입니다.

---

## 5. async/await 테스팅

### 비동기 테스트의 진화

iOS 비동기 테스트는 세 단계의 역사적 진화를 거쳤습니다.

**1세대: expectation 기반 (iOS 6+)**
```swift
func testFetchUser_legacy() {
    let expectation = expectation(description: "사용자 데이터 로드 완료")
    var fetchedUser: User?

    sut.fetchUser(id: "123") { result in
        if case .success(let user) = result {
            fetchedUser = user
        }
        expectation.fulfill()
    }

    waitForExpectations(timeout: 5.0)
    XCTAssertNotNil(fetchedUser)
    XCTAssertEqual(fetchedUser?.id, "123")
}
```

**2세대: async throws 함수 (Swift 5.5 / iOS 15+)**
```swift
func testFetchUser_modern() async throws {
    let user = try await sut.fetchUser(id: "123")
    XCTAssertEqual(user.id, "123")
}
```

**3세대: Swift 6 Concurrency 엄격 모드**
```swift
@MainActor
final class UserViewModelTests: XCTestCase {
    func testFetchUser_updatesState() async throws {
        // MainActor 격리된 ViewModel 테스트
        await sut.fetchUser(id: "123")
        XCTAssertFalse(sut.isLoading)
        XCTAssertNotNil(sut.currentUser)
    }
}
```

### async 테스팅 비교

COMPARE_BLOCK:testing_async_testing

### Task 취소 테스트

```swift
func testFetchUser_cancellation() async throws {
    let task = Task {
        try await sut.fetchUser(id: "123")
    }

    // 즉시 취소
    task.cancel()

    do {
        _ = try await task.value
        XCTFail("취소된 Task는 에러를 던져야 합니다")
    } catch is CancellationError {
        // 예상된 경로 — 성공
    } catch {
        XCTFail("CancellationError를 기대했지만 \(error)가 발생했습니다")
    }
}
```

### @MainActor 테스트 격리

```swift
// ViewModel이 @MainActor로 격리된 경우
@MainActor
final class HomeViewModelTests: XCTestCase {

    var sut: HomeViewModel!

    @MainActor
    override func setUp() async throws {
        try await super.setUp()
        sut = HomeViewModel(service: MockHomeService())
    }

    func testLoadFeed_updatesItems() async throws {
        await sut.loadFeed()
        XCTAssertFalse(sut.items.isEmpty)
    }
}
```

`setUp`도 `async throws`를 지원합니다(Swift 5.5+). `@MainActor`가 붙은 테스트 클래스는 모든 메서드가 메인 스레드에서 실행되므로 `DispatchQueue.main.async` 래핑이 필요 없습니다.

### Combine 테스트

Combine Publisher를 사용하는 코드를 테스트할 때는 expectation과 sink를 조합합니다.

```swift
import Combine

func testViewModel_publishesItems() {
    var cancellables = Set<AnyCancellable>()
    let itemsExpectation = expectation(description: "items 발행")

    sut.$items
        .dropFirst()          // 초기값 무시
        .sink { items in
            XCTAssertFalse(items.isEmpty)
            itemsExpectation.fulfill()
        }
        .store(in: &cancellables)

    sut.loadItems()

    waitForExpectations(timeout: 3.0)
}
```

---

## 6. TDD — Red-Green-Refactor

### TDD 3단계 사이클

| 단계 | 설명 | 목표 |
|------|------|------|
| 🔴 **Red** | 실패하는 테스트를 먼저 작성 | "무엇을 만들어야 하는가" 명세화 |
| 🟢 **Green** | 테스트를 통과하는 최소한의 코드 작성 | 빠르게 동작하게 만들기 |
| 🔵 **Refactor** | 중복 제거, 구조 개선 | 테스트는 유지하면서 설계 개선 |

### TDD 실전 예시

COMPARE_BLOCK:testing_tdd_example

### TDD가 어울리는 상황

TDD는 모든 상황에서 최적은 아닙니다. 실무에서 TDD가 특히 빛나는 경우:

- **비즈니스 로직**: 할인 계산, 유효성 검사, 상태 전이 등 입출력이 명확한 로직
- **버그 수정**: 버그를 재현하는 테스트를 먼저 작성하고, 그 다음에 수정
- **알고리즘 구현**: 정렬, 검색, 파싱 등 케이스 기반 검증이 필요한 경우
- **공개 API 설계**: 구현 전에 API를 사용하는 입장에서 설계할 수 있음

반면 TDD가 어색한 경우:
- SwiftUI View 레이아웃: 시각적 결과물은 눈으로 확인하는 것이 효율적
- 탐색적 코딩 (Spike): 아직 무엇을 만들지 명확하지 않은 단계
- 서드파티 SDK 통합: 외부 동작에 의존하는 코드

---

## 7. XCUITest — UI 자동화 테스트

### XCUITest 아키텍처

XCUITest는 **별도 프로세스**에서 앱을 제어합니다. 테스트 코드가 직접 앱 코드를 호출하는 단위 테스트와 달리, XCUITest는 Accessibility API를 통해 외부에서 앱을 조작합니다.

```
[XCUITest Process] → Accessibility API → [App Process]
                   ← 상태/값 읽기      ←
```

이 분리 덕분에:
- 앱을 실제 사용자처럼 제어할 수 있음
- 앱 코드를 수정하지 않아도 테스트 가능
- 시뮬레이터와 실제 기기 모두에서 동일하게 동작

하지만 단점도 있습니다:
- 단위 테스트보다 **10~100배 느림**
- 앱 내부 상태에 직접 접근 불가
- Flaky(불안정)한 테스트가 발생하기 쉬움

### XCUITest vs Espresso vs Playwright

COMPARE_BLOCK:testing_xcuitest_basic

### UI 요소 조작

COMPARE_BLOCK:testing_xcuitest_interactions

### Accessibility Identifier 전략

XCUITest에서 UI 요소를 식별하는 가장 안정적인 방법은 `accessibilityIdentifier`를 설정하는 것입니다.

```swift
// SwiftUI
Button("로그인") {
    viewModel.login()
}
.accessibilityIdentifier("loginButton")

TextField("이메일", text: $email)
    .accessibilityIdentifier("emailTextField")

// UIKit
loginButton.accessibilityIdentifier = "loginButton"
emailTextField.accessibilityIdentifier = "emailTextField"
```

> 💡 **Android 개발자라면**: Android의 `android:tag`나 `contentDescription`과 유사합니다. Espresso에서 `withContentDescription()` 또는 `withTagValue()`로 뷰를 찾는 것처럼, XCUITest에서는 `app.buttons["loginButton"]`으로 찾습니다.

> 💡 **웹 개발자라면**: HTML의 `data-testid` 속성과 완전히 동일한 개념입니다. Playwright에서 `page.getByTestId("loginButton")`을 쓰는 것처럼, XCUITest에서는 `app.buttons.matching(identifier: "loginButton")`을 씁니다.

### Page Object Pattern

UI 테스트의 유지보수성을 높이는 핵심 패턴입니다.

```swift
// Page Object: 화면별 접근자 캡슐화
struct LoginPage {
    private let app: XCUIApplication

    init(app: XCUIApplication) {
        self.app = app
    }

    // UI 요소 접근자
    var emailField: XCUIElement { app.textFields["emailTextField"] }
    var passwordField: XCUIElement { app.secureTextFields["passwordTextField"] }
    var loginButton: XCUIElement { app.buttons["loginButton"] }
    var errorLabel: XCUIElement { app.staticTexts["errorLabel"] }

    // 고수준 액션
    @discardableResult
    func login(email: String, password: String) -> Self {
        emailField.tap()
        emailField.typeText(email)
        passwordField.tap()
        passwordField.typeText(password)
        loginButton.tap()
        return self
    }

    func assertErrorVisible() {
        XCTAssertTrue(errorLabel.waitForExistence(timeout: 3))
    }
}

// 테스트에서 사용
func testInvalidLogin_showsError() {
    let loginPage = LoginPage(app: app)

    loginPage
        .login(email: "wrong@test.com", password: "badpassword")
        .assertErrorVisible()
}
```

### waitForExistence — 타이밍 처리

비동기 UI 업데이트를 기다리는 올바른 방법:

```swift
// 나쁜 예: sleep으로 기다리기
sleep(2)
XCTAssertTrue(app.staticTexts["successMessage"].exists)

// 좋은 예: waitForExistence 사용
let successMessage = app.staticTexts["successMessage"]
XCTAssertTrue(successMessage.waitForExistence(timeout: 5.0))
```

`waitForExistence(timeout:)`은 지정한 시간 동안 요소가 존재할 때까지 폴링합니다. 나타나는 즉시 `true`를 반환하므로 최대한 빠르게 실행됩니다.

---

## 8. 스냅샷 테스팅

### 스냅샷 테스팅이란?

스냅샷 테스트는 UI를 **이미지나 텍스트로 직렬화**해서 이전 버전과 비교하는 방식입니다. 처음 실행 시 기준 이미지(reference snapshot)를 저장하고, 이후 실행 시 현재 화면과 비교합니다.

### swift-snapshot-testing

iOS에서는 Point-Free의 `swift-snapshot-testing` 라이브러리가 사실상 표준입니다.

**패키지 추가** (Package.swift):
```swift
.package(
    url: "https://github.com/pointfreeco/swift-snapshot-testing",
    from: "1.15.0"
)
```

**테스트 타겟에 추가**:
```swift
.testTarget(
    name: "MyAppTests",
    dependencies: [
        "MyApp",
        .product(name: "SnapshotTesting", package: "swift-snapshot-testing")
    ]
)
```

### 스냅샷 테스팅 비교

COMPARE_BLOCK:testing_snapshot

### SwiftUI Preview와 스냅샷 통합

```swift
import SnapshotTesting
import SwiftUI
import XCTest
@testable import MyApp

final class ProductCardSnapshotTests: XCTestCase {

    // 여러 기기 크기에서 테스트
    let devices: [(name: String, config: ViewImageConfig)] = [
        ("iPhone SE", .iPhoneSe),
        ("iPhone 16", .iPhone13),
        ("iPad Pro", .iPadPro12_9),
    ]

    func testProductCard_allDevices() {
        let product = Product(
            id: "1",
            name: "테스트 상품",
            price: 29_900,
            imageURL: nil
        )
        let view = ProductCardView(product: product)

        for device in devices {
            assertSnapshot(
                of: view,
                as: .image(layout: .device(config: device.config)),
                named: device.name,
                testName: "ProductCard"
            )
        }
    }

    // 다크모드 테스트
    func testProductCard_darkMode() {
        let view = ProductCardView(product: .preview)
            .preferredColorScheme(.dark)

        assertSnapshot(
            of: view,
            as: .image(layout: .sizeThatFits),
            named: "darkMode"
        )
    }

    // 다국어 테스트 (RTL 레이아웃 확인)
    func testProductCard_arabicLocale() {
        let view = ProductCardView(product: .preview)
            .environment(\.locale, Locale(identifier: "ar"))
            .environment(\.layoutDirection, .rightToLeft)

        assertSnapshot(
            of: view,
            as: .image(layout: .sizeThatFits),
            named: "arabic"
        )
    }
}
```

### 스냅샷 갱신 방법

레퍼런스 이미지를 의도적으로 업데이트해야 할 때:

```swift
// 방법 1: isRecording 플래그
func testProductCard() {
    // isRecording = true 로 설정하면 현재 화면을 새 기준으로 저장
    // 주의: 커밋 전에 false로 되돌려야 함
    isRecording = false
    assertSnapshot(of: ProductCardView(product: .preview), as: .image)
}
```

```bash
# 방법 2: 환경변수로 일괄 갱신
RECORD_SNAPSHOTS=true xcodebuild test -scheme MyApp -destination 'platform=iOS Simulator,name=iPhone 16'
```

CI에서는 `isRecording = false`가 기본값이고, 레퍼런스 이미지를 Git에 커밋해서 팀 전체가 공유합니다.

---

## 9. 코드 커버리지

### 커버리지 측정 방법 비교

COMPARE_BLOCK:testing_code_coverage

### Xcode에서 커버리지 활성화

**Scheme 편집**:
1. `Product → Scheme → Edit Scheme` (또는 `Cmd+<`)
2. `Test` 탭 선택
3. `Code Coverage` 체크박스 활성화
4. `Gather coverage for` → `All targets` 또는 특정 타겟 선택

**커버리지 보고서 확인**:
- 테스트 실행 후 `Report Navigator`(Cmd+9) → 최근 테스트 결과 → `Coverage` 탭
- 파일별, 함수별 커버리지를 시각적으로 확인 가능
- Gutter에서 커버된 줄(초록)과 미커버 줄(빨강)을 직접 확인

### xcodebuild + slather로 CI 커버리지

```bash
# 커버리지 활성화하여 테스트 실행
xcodebuild test \
  -scheme MyApp \
  -destination 'platform=iOS Simulator,name=iPhone 16' \
  -enableCodeCoverage YES \
  -resultBundlePath TestResults.xcresult

# slather로 HTML/Cobertura 리포트 생성
gem install slather
slather coverage \
  --html \
  --output-directory coverage-report \
  --scheme MyApp \
  MyApp.xcodeproj
```

### 커버리지 목표 설정

```swift
// XCTest 자체에는 커버리지 threshold 기능이 없음
// CI 스크립트에서 xcresulttool로 추출 후 검증
```

```bash
# xcresulttool로 커버리지 수치 추출
xcrun xcresulttool get \
  --format json \
  --path TestResults.xcresult \
  | python3 -c "
import sys, json
data = json.load(sys.stdin)
coverage = data['metrics']['testsCoverage']['_value']
print(f'Coverage: {coverage}%')
if float(coverage) < 80:
    sys.exit(1)
"
```

### 의미 있는 커버리지 작성

숫자만 높이는 커버리지는 의미가 없습니다. 실무에서 권장하는 접근법:

```swift
// ❌ 커버리지만 채우는 무의미한 테스트
func testInit() {
    let sut = UserViewModel()
    XCTAssertNotNil(sut)  // 아무것도 검증하지 않음
}

// ✅ 실제 동작을 검증하는 테스트
func testInit_setsDefaultState() {
    let sut = UserViewModel()

    XCTAssertNil(sut.currentUser)
    XCTAssertFalse(sut.isLoading)
    XCTAssertNil(sut.error)
}
```

커버리지가 **낮은 영역**에 집중하되, **분기 커버리지(Branch Coverage)**를 우선시하세요. 함수가 실행되는 것보다 모든 조건 분기가 테스트되는 것이 버그 발견에 훨씬 효과적입니다.

---

## 10. 테스트 성능과 실행 속도

### 테스트 병렬화

```swift
// XCTestCase에서 병렬 실행 설정
// Xcode의 Test Plan 또는 Scheme에서 설정 가능

// 테스트 간 상태 공유를 피해야 병렬화 가능
// 나쁜 예: 공유 상태 사용
class UserServiceTests: XCTestCase {
    static var sharedDB: Database!  // 병렬 실행 시 레이스 컨디션 발생

    override class func setUp() {
        sharedDB = Database.shared  // 위험!
    }
}

// 좋은 예: 테스트마다 독립적인 인스턴스
class UserServiceTests: XCTestCase {
    var db: Database!  // 각 테스트마다 새 인스턴스

    override func setUp() {
        db = Database(inMemory: true)  // 안전
    }
}
```

### XCTMetric — 성능 테스트

```swift
func testSearchAlgorithm_performance() {
    let dataset = (0..<10_000).map { "item_\($0)" }

    measure(metrics: [XCTClockMetric(), XCTCPUMetric(), XCTMemoryMetric()]) {
        _ = dataset.filter { $0.contains("999") }
    }
}
```

`measure {}` 블록은 기본 10회 실행하여 평균과 표준 편차를 측정합니다. 처음 실행 시 기준값(baseline)을 저장하고, 이후에 10% 이상 성능이 저하되면 테스트가 실패합니다.

> 💡 **Android 개발자라면**: Android Benchmark 라이브러리(`BenchmarkRule`)와 동일한 개념입니다. `measureRepeated {}` 대신 `measure {}`를 사용합니다.

---

## 11. CI/CD와 테스트 자동화

### GitHub Actions 통합 예시

```yaml
# .github/workflows/ios-test.yml
name: iOS Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: macos-15

    steps:
      - uses: actions/checkout@v4

      - name: Select Xcode
        run: sudo xcode-select -s /Applications/Xcode_16.2.app

      - name: Cache SPM packages
        uses: actions/cache@v4
        with:
          path: .build
          key: ${{ runner.os }}-spm-${{ hashFiles('**/Package.resolved') }}

      - name: Run Unit Tests
        run: |
          xcodebuild test \
            -scheme MyApp \
            -destination 'platform=iOS Simulator,name=iPhone 16,OS=18.2' \
            -enableCodeCoverage YES \
            -resultBundlePath TestResults.xcresult \
            | xcpretty

      - name: Upload Test Results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-results
          path: TestResults.xcresult
```

### Test Plan 활용

Xcode의 **Test Plan** (`.xctestplan`)은 여러 테스트 구성을 관리하는 JSON 파일입니다.

```json
{
  "configurations": [
    {
      "id": "unit-tests",
      "name": "Unit Tests",
      "options": {
        "codeCoverageEnabled": true,
        "testRepetitionMode": "retryOnFailure",
        "maximumTestRepetitions": 3
      }
    },
    {
      "id": "ui-tests",
      "name": "UI Tests",
      "options": {
        "codeCoverageEnabled": false,
        "uiTestingScreenshotsEnabled": true
      }
    }
  ]
}
```

`retryOnFailure`로 Flaky 테스트를 자동 재시도하고, `maximumTestRepetitions`로 재시도 횟수를 제한합니다.

---

## 12. 테스팅 안티패턴과 모범 사례

### 피해야 할 안티패턴

**1. 테스트 간 의존성**
```swift
// ❌ 테스트 실행 순서에 의존
func testA_setupData() { /* 데이터 삽입 */ }
func testB_useData() { /* testA가 먼저 실행되어야 함 */ }

// ✅ 각 테스트가 독립적으로 데이터 준비
func testB_useData() {
    // Given: 이 테스트에서 직접 데이터 준비
    let data = setupTestData()
    // ...
}
```

**2. 구현 세부사항 테스트**
```swift
// ❌ 내부 구현 테스트 (리팩토링 시 깨짐)
func testViewModel_callsFetchUserOnInit() {
    XCTAssertTrue(mockService.fetchUserCalled)  // 어떻게 구현했는지 테스트
}

// ✅ 공개 동작(Observable Behavior) 테스트
func testViewModel_loadsUserDataOnInit() async throws {
    await sut.initialize()
    XCTAssertNotNil(sut.user)  // 결과를 테스트
}
```

**3. 과도한 Mocking**
```swift
// ❌ 모든 것을 Mock으로 대체
// → 테스트가 실제 동작을 검증하지 못함

// ✅ 외부 의존성(네트워크, DB)만 Mock
// 비즈니스 로직 내부는 실제 객체 사용
```

### 테스트 가독성 원칙

```swift
// ❌ 이름만으로 의도 파악 불가
func test1() { }
func testViewModel() { }

// ✅ 테스트 이름 = 명세서
// 형식: test[대상]_[조건]_[기대결과]
func testCheckout_withExpiredCard_throwsPaymentError() { }
func testSearch_withEmptyQuery_returnsAllItems() { }
func testLogin_withCorrectCredentials_navigatesToHome() { }
```

---

## 정리

iOS 테스팅은 XCTest라는 단일 프레임워크 안에서 단위·통합·UI·성능 테스트가 통합된 구조입니다. Android와 웹의 분산된 생태계(JUnit + Mockito + Espresso / Jest + Testing Library + Playwright)와 달리, iOS는 Xcode 하나로 대부분을 해결합니다.

핵심 차이를 한 줄로 정리하면:

| 관점 | iOS | Android | Web |
|------|-----|---------|-----|
| Mock 방식 | Protocol + 수동 구현 | Mockito 자동 생성 | jest.fn() / jest.mock() |
| 비동기 테스트 | async throws / expectation | runTest / advanceUntilIdle | async/await / jest.useFakeTimers |
| UI 테스트 | Accessibility API 기반 | Espresso (in-process) | DOM 조작 (Playwright/Cypress) |
| 스냅샷 | swift-snapshot-testing | Paparazzi | jest.toMatchSnapshot() |
| 커버리지 | Xcode built-in + slather | JaCoCo | Istanbul / c8 |

테스트는 작성하는 순간보다 **6개월 후에 누군가 유지보수할 때** 진짜 가치가 드러납니다. 명확한 이름, 독립적인 설정, 실제 동작을 검증하는 단언문 — 이 세 가지 원칙을 지키면 언제 봐도 이해할 수 있는 테스트 스위트를 만들 수 있습니다.
