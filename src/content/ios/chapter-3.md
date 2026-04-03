# Chapter 3. 화면 이동 — 네비게이션

앱은 단순히 하나의 화면이 아니라 수많은 화면이 유기적으로 연결된 공간입니다. 사용자가 목록에서 항목을 탭하면 상세 화면으로 이동하고, 편집 버튼을 누르면 시트가 올라오고, 오류가 발생하면 알림이 뜨는 이 모든 흐름이 **네비게이션**입니다. 네비게이션을 얼마나 자연스럽게 설계하느냐가 앱의 완성도를 좌우합니다.

iOS의 네비게이션 시스템은 다른 플랫폼과 비교해 독특한 부분이 있습니다. Android처럼 Back Stack 개념을 사용하지만, 관리 방식이 다르고 SwiftUI는 UIKit보다 훨씬 선언적입니다. 웹처럼 URL로 경로를 표현하지 않지만, iOS 16부터 도입된 NavigationStack은 URL 기반 딥링크와도 연결됩니다. 이 챕터에서는 실제 앱을 만들 때 꼭 필요한 모든 네비게이션 패턴을 다룹니다.

---

## 1. iOS 네비게이션 개요

### Push vs Modal — 두 가지 패러다임

iOS의 모든 화면 전환은 크게 두 가지 철학으로 나뉩니다.

**Push 네비게이션**은 화면이 오른쪽에서 밀려 들어오는 방식입니다. 화면들이 스택처럼 쌓이고, 뒤로가기 버튼(또는 좌→우 스와이프)으로 이전 화면으로 돌아갑니다. 이 방식은 계층적인 정보 탐색에 적합합니다. 예를 들어 "앱 목록 → 앱 상세 → 리뷰 목록 → 리뷰 작성자 프로필"처럼 깊이 들어갈수록 세부 정보를 보여주는 구조입니다.

**Sheet(Modal) 네비게이션**은 화면이 아래에서 올라오는 방식입니다. 현재 작업 흐름에서 독립적인 작업을 수행할 때 사용합니다. 예를 들어 "메일 목록 보다가 새 메일 작성" 또는 "상품 목록 보다가 필터 설정"처럼, 잠깐 다른 일을 하고 돌아올 때 쓰입니다.

| 방식 | 진입 방향 | 종료 방법 | 적합한 상황 |
|------|----------|----------|-----------|
| **Push (Stack)** | 오른쪽 → 왼쪽 | 뒤로가기 버튼 / 엣지 스와이프 | 계층 구조 탐색, 드릴-다운 |
| **Sheet** | 아래 → 위 | 아래로 드래그 / 닫기 버튼 | 독립적인 작업, 폼, 설정 |
| **FullScreenCover** | 아래 → 위 (전체) | 코드로만 닫기 | 온보딩, 카메라, 전체화면 미디어 |

> 💡 **Android 개발자라면**: Push는 `FragmentManager`의 `addToBackStack()`과 동일한 개념입니다. Sheet는 `BottomSheetDialogFragment`와 비슷하지만 iOS에서는 기본적으로 전체 화면을 덮습니다 (presentationDetents로 조절 가능).

> 💡 **웹 개발자라면**: Push는 React Router의 `navigate('/detail')` 또는 Next.js의 `router.push()`와 유사합니다. Sheet는 `<dialog>` 태그나 모달 컴포넌트에 해당합니다. 가장 큰 차이는 웹은 URL이 바뀌지만 iOS는 URL 개념이 없다는 점입니다.

---

### UIKit vs SwiftUI — 역사적 맥락

2019년 SwiftUI가 등장하기 전까지 iOS 네비게이션은 UIKit의 `UINavigationController`로 구현했습니다. UINavigationController는 View Controller의 스택을 직접 관리하는 명령형 방식이었습니다.

```swift
// UIKit 방식 (구 방식, 지금도 유효)
let detailVC = DetailViewController()
detailVC.item = selectedItem
navigationController?.pushViewController(detailVC, animated: true)
```

SwiftUI가 처음 나왔을 때 (`NavigationView`)는 기능이 제한적이었습니다. iOS 16에서 `NavigationStack`이 도입되면서 프로그래밍적 네비게이션, 딥링크, URL 기반 이동 등이 모두 가능해졌습니다. **신규 프로젝트라면 반드시 `NavigationStack`을 사용하세요.**

| | UIKit NavigationController | SwiftUI NavigationView | SwiftUI NavigationStack |
|--|--|--|--|
| 도입 시기 | iOS 2 (2008) | iOS 13 (2019) | iOS 16 (2022) |
| 스타일 | 명령형 | 선언형 (제한적) | 선언형 (완전) |
| 프로그래밍적 이동 | ✅ | ❌ 어려움 | ✅ |
| 딥링크 지원 | 복잡 | ❌ | ✅ |
| 타입 안전 라우팅 | ❌ | ❌ | ✅ |

---

## 2. NavigationStack — Push 네비게이션

### 기본 구조

`NavigationStack`은 화면 스택의 컨테이너입니다. 그 안에 루트 화면을 넣고, `NavigationLink`로 다음 화면으로 이동합니다.

COMPARE_BLOCK:nav_push

`NavigationStack`은 앱의 최상위 또는 각 탭에 하나씩 배치합니다. `NavigationLink`는 버튼처럼 탭하면 다음 화면으로 이동합니다. 중요한 점은 `destination:` 클로저 안의 뷰는 실제로 탭하기 전까지 생성되지 않는다는 것입니다 (lazy evaluation). 이는 성능상 유리합니다.

> 💡 **Android 개발자라면**: Fragment Transaction을 코드로 직접 작성하지 않아도 됩니다. `NavigationLink`가 선언만으로 이동을 처리합니다. Back Stack 관리도 완전 자동입니다.

> 💡 **웹 개발자라면**: React Router의 `<Link to="/detail">Detail</Link>`과 동일한 역할입니다. URL 대신 destination View를 직접 지정한다는 점만 다릅니다.

---

### navigationTitle과 표시 방식

네비게이션 바 타이틀은 `.navigationTitle()` 모디파이어로 설정합니다. NavigationStack 안의 각 뷰에서 개별적으로 설정할 수 있습니다.

```swift
struct ProductListView: View {
    var body: some View {
        List(products) { product in
            NavigationLink(product.name) {
                ProductDetailView(product: product)
            }
        }
        .navigationTitle("상품 목록")
        .navigationBarTitleDisplayMode(.large)  // 스크롤 시 작아지는 큰 타이틀
    }
}

struct ProductDetailView: View {
    let product: Product

    var body: some View {
        ScrollView {
            // 상세 내용
        }
        .navigationTitle(product.name)
        .navigationBarTitleDisplayMode(.inline)  // 항상 작은 타이틀
    }
}
```

**타이틀 표시 모드 옵션:**

| 모드 | 동작 | 권장 사용처 |
|------|------|-----------|
| `.large` | 스크롤 전 크게, 스크롤 시 작아짐 | 탭의 루트 화면 |
| `.inline` | 항상 상단 바에 작게 표시 | 세부 화면, 시트 내부 |
| `.automatic` | 계층에 따라 자동 (기본값) | 대부분의 경우 |

---

### 네비게이션 바 버튼 추가

```swift
.toolbar {
    ToolbarItem(placement: .topBarTrailing) {
        Button("편집") {
            isEditing = true
        }
    }
    ToolbarItem(placement: .topBarLeading) {
        Button {
            showHelp = true
        } label: {
            Image(systemName: "questionmark.circle")
        }
    }
}
```

**주요 배치 위치:**

| placement | 위치 | 용도 |
|-----------|------|------|
| `.topBarLeading` | 좌측 상단 | 보조 액션 |
| `.topBarTrailing` | 우측 상단 | 주요 액션 (편집, 추가 등) |
| `.bottomBar` | 하단 툴바 | 선택 관련 액션 |
| `.navigationBarTitle` | 타이틀 영역 | 커스텀 타이틀 |

---

### 프로그래밍적 이동 (navigationPath)

탭 이벤트가 아닌 코드에서 직접 화면을 이동해야 할 때 (예: 로그인 성공 후 이동, 딥링크 처리) `NavigationPath`를 사용합니다.

```swift
struct ContentView: View {
    @State private var navigationPath = NavigationPath()

    var body: some View {
        NavigationStack(path: $navigationPath) {
            VStack(spacing: 20) {
                Button("상품 목록으로 이동") {
                    navigationPath.append("productList")
                }

                Button("특정 상품으로 바로 이동") {
                    // 여러 단계를 한 번에 push
                    navigationPath.append("productList")
                    navigationPath.append(Product(id: 42, name: "MacBook"))
                }

                Button("루트로 돌아가기") {
                    navigationPath.removeLast(navigationPath.count)
                }
            }
            .navigationTitle("홈")
            .navigationDestination(for: String.self) { route in
                if route == "productList" {
                    ProductListView(path: $navigationPath)
                }
            }
            .navigationDestination(for: Product.self) { product in
                ProductDetailView(product: product)
            }
        }
    }
}
```

> 💡 **웹 개발자라면**: React Router의 `useNavigate()` 훅으로 `navigate('/product/42')`를 호출하는 것과 동일합니다. `navigationPath.removeLast(navigationPath.count)`는 `navigate('/', { replace: true })`와 유사합니다.

> 💡 **Android 개발자라면**: Jetpack Navigation의 `navController.navigate(R.id.productDetailFragment)`와 개념적으로 같습니다. `navigationPath.removeLast(count)`는 `navController.popBackStack()`에 해당합니다.

---

### 중첩 Push — 3단계 이상 이동

실제 앱에서는 3단계 이상의 깊은 네비게이션이 필요합니다. SwiftUI는 이를 자연스럽게 지원합니다.

```swift
// 카테고리 → 상품 목록 → 상품 상세 → 리뷰 목록 → 리뷰어 프로필
NavigationStack {
    CategoryListView()       // 루트
        .navigationTitle("카테고리")
        .navigationDestination(for: Category.self) { category in
            ProductListView(category: category)
                .navigationDestination(for: Product.self) { product in
                    ProductDetailView(product: product)
                        .navigationDestination(for: Review.self) { review in
                            ReviewerProfileView(reviewer: review.author)
                        }
                }
        }
}
```

> **주의**: `.navigationDestination(for:)`은 NavigationStack 내부 어디서든 선언할 수 있습니다. 단, 중첩이 깊어질수록 코드가 복잡해지므로, 실제로는 루트에서 모든 destination을 선언하는 패턴을 권장합니다. (이를 "centralized routing" 패턴이라 합니다.)

---

## 3. 화면 간 데이터 전달

### NavigationLink value 기반 전달

iOS 16+에서는 `NavigationLink(value:)`를 사용해 타입 안전하게 데이터를 전달합니다.

COMPARE_BLOCK:nav_data_pass

`Hashable` 프로토콜은 Swift의 `Set`이나 `Dictionary` 키로 사용할 수 있는 타입을 정의합니다. NavigationStack은 내부적으로 경로를 해시로 관리하기 때문에 전달되는 타입이 `Hashable`을 준수해야 합니다.

```swift
// Hashable 채택
struct Product: Hashable {
    let id: Int
    let name: String
    let price: Double
    // Swift가 자동으로 hash(into:) 구현 (모든 프로퍼티가 Hashable이면)
}

// Identifiable + Hashable (리스트에서 자주 쓰는 조합)
struct Post: Identifiable, Hashable {
    let id: UUID
    let title: String
    let content: String
}
```

---

### 여러 타입 라우팅

하나의 NavigationStack에서 여러 종류의 화면으로 이동하려면 타입별로 `.navigationDestination(for:)`을 여러 개 선언합니다.

```swift
NavigationStack {
    HomeView()
        // String 기반 라우팅
        .navigationDestination(for: String.self) { route in
            switch route {
            case "settings": SettingsView()
            case "notifications": NotificationsView()
            default: Text("알 수 없는 경로: \(route)")
            }
        }
        // 모델 기반 라우팅
        .navigationDestination(for: Product.self) { product in
            ProductDetailView(product: product)
        }
        .navigationDestination(for: User.self) { user in
            UserProfileView(user: user)
        }
        .navigationDestination(for: Order.self) { order in
            OrderDetailView(order: order)
        }
}
```

---

### 커스텀 Route Enum (권장 패턴)

중규모 이상의 앱에서는 `enum`으로 라우트를 정의하면 타입 안전성과 가독성이 높아집니다.

```swift
// 앱의 모든 경로를 하나의 enum으로 관리
enum AppRoute: Hashable {
    case productDetail(Product)
    case userProfile(User)
    case orderDetail(orderId: String)
    case settings
    case notifications
}

// 사용
NavigationStack {
    HomeView()
        .navigationDestination(for: AppRoute.self) { route in
            switch route {
            case .productDetail(let product):
                ProductDetailView(product: product)
            case .userProfile(let user):
                UserProfileView(user: user)
            case .orderDetail(let orderId):
                OrderDetailView(orderId: orderId)
            case .settings:
                SettingsView()
            case .notifications:
                NotificationsView()
            }
        }
}

// 이동할 때
NavigationLink(value: AppRoute.productDetail(product)) {
    ProductRow(product: product)
}
```

> 💡 **웹 개발자라면**: Next.js의 `pages/` 디렉토리 구조나 React Router의 `routes` 배열처럼 경로를 중앙에서 관리하는 것과 같은 접근입니다.

---

## 4. Sheet — 모달 화면

### .sheet(isPresented:) 기본

시트는 Boolean 상태로 열고 닫습니다.

COMPARE_BLOCK:nav_sheet

시트 내부에서 닫기는 `@Environment(\.dismiss)`를 사용합니다. 이는 시트가 어떻게 열렸든 (`.sheet`, `.fullScreenCover`, NavigationLink 등) 동일하게 동작합니다.

COMPARE_BLOCK:nav_dismiss

---

### .sheet(item:) — 데이터 기반 모달

데이터를 전달하면서 시트를 열어야 할 때는 `item:` 버전을 씁니다. `item`이 `nil`이면 닫힘, 값이 있으면 열림이며 해당 값이 시트로 전달됩니다.

```swift
struct ContentView: View {
    @State private var selectedProduct: Product? = nil

    var body: some View {
        List(products) { product in
            Button(product.name) {
                selectedProduct = product  // 탭하면 시트 열림
            }
        }
        .sheet(item: $selectedProduct) { product in
            // selectedProduct가 nil이 아닐 때 표시
            ProductEditSheet(product: product) {
                selectedProduct = nil  // 완료 시 닫기
            }
        }
    }
}

struct ProductEditSheet: View {
    let product: Product
    let onComplete: () -> Void
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            Form {
                // 편집 폼
            }
            .navigationTitle("편집")
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    Button("취소") { dismiss() }
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button("저장") {
                        // 저장 로직
                        onComplete()
                    }
                }
            }
        }
    }
}
```

> **팁**: `sheet(item:)`에서 전달하는 타입은 `Identifiable`을 준수해야 합니다. `id` 프로퍼티가 있어야 SwiftUI가 어떤 아이템인지 구분할 수 있습니다.

---

### .fullScreenCover()

시트는 아래로 드래그해 닫을 수 있지만, `fullScreenCover`는 코드로만 닫을 수 있습니다. 온보딩, 카메라/갤러리, 로그인 화면처럼 사용자가 임의로 닫으면 안 되는 상황에 씁니다.

```swift
struct AppView: View {
    @State private var showOnboarding = !UserDefaults.standard.bool(forKey: "onboardingDone")

    var body: some View {
        MainTabView()
            .fullScreenCover(isPresented: $showOnboarding) {
                OnboardingView {
                    UserDefaults.standard.set(true, forKey: "onboardingDone")
                    showOnboarding = false
                }
            }
    }
}
```

---

### presentationDetents — 하프 시트

iOS 16부터 시트의 크기를 제어할 수 있습니다. 유튜브 뮤직, 카카오맵처럼 화면의 일부만 덮는 "하프 시트"를 만들 수 있습니다.

```swift
.sheet(isPresented: $showingFilter) {
    FilterView()
        .presentationDetents([
            .fraction(0.3),   // 화면의 30%
            .medium,           // 화면의 50%
            .large             // 기본 (거의 전체)
        ])
        .presentationDragIndicator(.visible)  // 상단 드래그 핸들 표시
}
```

**주요 Detent 옵션:**

| detent | 높이 |
|--------|------|
| `.small` | 약 25% (iOS 18.4+) |
| `.medium` | 약 50% |
| `.large` | 약 95% (기본) |
| `.fraction(0.4)` | 전체의 40% |
| `.height(300)` | 정확히 300pt |

> 💡 **Android 개발자라면**: Jetpack의 `BottomSheetBehavior`에서 `STATE_HALF_EXPANDED`를 설정하는 것과 같습니다. iOS에서는 여러 단계를 동시에 지정하면 사용자가 드래그로 크기를 전환할 수 있습니다.

---

## 5. TabView — 탭 바

### 기본 탭 구조

`TabView`는 앱의 최상위 레벨에서 주요 섹션들을 탭으로 제공합니다. iOS 앱의 가장 일반적인 구조 패턴입니다.

COMPARE_BLOCK:nav_tab

각 탭의 `.tabItem`에는 `Label` (아이콘 + 텍스트) 또는 `Image` + `Text`를 사용합니다. SF Symbols를 `systemImage:`로 지정하면 iOS의 일관된 아이콘 디자인을 사용할 수 있습니다.

---

### 탭 배지 (Badge)

```swift
TabView {
    NotificationsView()
        .tabItem {
            Label("알림", systemImage: "bell")
        }
        .badge(unreadCount)        // 숫자 배지

    MessagesView()
        .tabItem {
            Label("메시지", systemImage: "message")
        }
        .badge("새 메시지")         // 텍스트 배지
}
```

---

### 프로그래밍적 탭 전환

```swift
struct MainTabView: View {
    @State private var selectedTab = 0

    var body: some View {
        TabView(selection: $selectedTab) {
            HomeView()
                .tabItem { Label("홈", systemImage: "house") }
                .tag(0)

            SearchView()
                .tabItem { Label("검색", systemImage: "magnifyingglass") }
                .tag(1)

            ProfileView(onLoginRequired: {
                selectedTab = 0  // 홈으로 강제 이동
            })
            .tabItem { Label("프로필", systemImage: "person") }
            .tag(2)
        }
    }
}
```

---

### TabView + NavigationStack 조합 (실제 앱 패턴)

실제 앱은 **TabView가 바깥**, **NavigationStack이 각 탭 안**에 위치합니다. 이렇게 하면 각 탭이 독립적인 네비게이션 스택을 가지며, 탭을 전환해도 각 탭의 이동 히스토리가 유지됩니다.

```swift
struct RootView: View {
    var body: some View {
        TabView {
            // 탭 1: 홈
            NavigationStack {
                HomeView()
                    .navigationTitle("홈")
            }
            .tabItem {
                Label("홈", systemImage: "house.fill")
            }

            // 탭 2: 검색
            NavigationStack {
                SearchView()
                    .navigationTitle("검색")
            }
            .tabItem {
                Label("검색", systemImage: "magnifyingglass")
            }

            // 탭 3: 보관함
            NavigationStack {
                LibraryView()
                    .navigationTitle("보관함")
            }
            .tabItem {
                Label("보관함", systemImage: "books.vertical.fill")
            }

            // 탭 4: 프로필
            NavigationStack {
                ProfileView()
                    .navigationTitle("프로필")
            }
            .tabItem {
                Label("프로필", systemImage: "person.circle.fill")
            }
        }
    }
}
```

> **주의**: NavigationStack을 TabView 바깥에 두면, 탭 바가 네비게이션 스택 내부에 있게 되어 Push 이동 시 탭 바가 사라지는 문제가 생깁니다. **반드시 TabView가 바깥, NavigationStack이 안쪽**이어야 합니다.

> 💡 **Android 개발자라면**: 각 Fragment가 자체 back stack을 가지는 `BottomNavigationView` + `Navigation Component`의 다중 백스택 패턴과 동일합니다.

> 💡 **웹 개발자라면**: React Router의 중첩 라우팅에서 탭 레이아웃을 최상위에 두고 각 탭 경로 아래에 하위 경로를 정의하는 것과 같습니다.

---

## 6. Alert & ConfirmationDialog

### .alert() — 경고 다이얼로그

`Alert`은 사용자에게 중요한 정보를 알리거나 확인을 요청할 때 사용합니다. iOS의 `Alert`은 화면 중앙에 팝업으로 표시됩니다.

COMPARE_BLOCK:nav_alert

`Alert`의 버튼은 최대 2개를 권장합니다. 3개 이상이 필요하면 `confirmationDialog`를 사용하세요. 버튼에 `.destructive` 역할을 지정하면 자동으로 빨간색으로 표시됩니다.

---

### 메시지가 있는 Alert

```swift
struct DeleteView: View {
    @State private var showDeleteAlert = false
    @State private var itemToDelete: Item? = nil

    var body: some View {
        List(items) { item in
            HStack {
                Text(item.name)
                Spacer()
                Button(role: .destructive) {
                    itemToDelete = item
                    showDeleteAlert = true
                } label: {
                    Image(systemName: "trash")
                }
            }
        }
        .alert("'\(itemToDelete?.name ?? "")' 삭제", isPresented: $showDeleteAlert) {
            Button("삭제", role: .destructive) {
                if let item = itemToDelete {
                    deleteItem(item)
                }
            }
            Button("취소", role: .cancel) {}
        } message: {
            Text("이 항목을 삭제하면 복구할 수 없습니다.")
        }
    }
}
```

---

### .confirmationDialog() — 액션 시트

3개 이상의 선택지를 제공하거나 "이 작업을 어떻게 하시겠습니까?" 형태의 UI에 사용합니다. iPhone에서는 하단에서 올라오는 액션 시트로 표시됩니다.

```swift
struct ShareView: View {
    @State private var showShareOptions = false

    var body: some View {
        Button("공유") {
            showShareOptions = true
        }
        .confirmationDialog("공유 방법 선택", isPresented: $showShareOptions, titleVisibility: .visible) {
            Button("링크 복사") {
                copyLink()
            }
            Button("메시지로 보내기") {
                shareViaMessage()
            }
            Button("SNS에 올리기") {
                shareToSNS()
            }
            Button("삭제", role: .destructive) {
                deleteItem()
            }
            Button("취소", role: .cancel) {}
        } message: {
            Text("공유 방법을 선택해 주세요")
        }
    }
}
```

> 💡 **Android 개발자라면**: `AlertDialog`는 iOS의 `.alert()`에, `BottomSheetDialogFragment`나 Material의 ModalBottomSheet는 iOS의 `.confirmationDialog()`에 해당합니다.

> 💡 **웹 개발자라면**: `window.confirm()`은 iOS `.alert()`의 확인/취소와 유사하고, `<dialog>`나 커스텀 모달 컴포넌트는 `.sheet()`에 해당합니다. `.confirmationDialog()`는 모바일 전용 패턴으로 웹에는 직접적인 대응물이 없습니다.

---

**Alert vs ConfirmationDialog 선택 기준:**

| 상황 | 권장 |
|------|------|
| 오류/성공 알림 (확인만) | `.alert()` |
| 삭제/위험 작업 확인 | `.alert()` (버튼 2개) |
| 3가지 이상 선택지 | `.confirmationDialog()` |
| 어떤 방법으로 할지 선택 | `.confirmationDialog()` |
| 불가역 작업 최종 확인 | `.alert()` + destructive 버튼 |

---

## 7. 딥링크와 URL Scheme

앱을 외부에서 열거나 특정 화면으로 직접 이동할 수 있는 URL 기반 진입점입니다.

### Custom URL Scheme

앱만의 고유 URL 스킴을 정의합니다. `yourapp://product/42`처럼 정의하면 Safari나 다른 앱에서 이 URL을 탭할 때 앱이 열립니다.

```swift
// Info.plist에 URL Scheme 등록 후
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .onOpenURL { url in
                    // url = yourapp://product/42
                    handleDeepLink(url)
                }
        }
    }

    func handleDeepLink(_ url: URL) {
        guard url.scheme == "yourapp" else { return }

        switch url.host {
        case "product":
            let productId = url.lastPathComponent  // "42"
            navigationPath.append(AppRoute.productDetail(id: productId))
        case "profile":
            navigationPath.append(AppRoute.settings)
        default:
            break
        }
    }
}
```

---

### Universal Links

Custom URL Scheme은 앱이 없으면 동작하지 않지만, Universal Links는 앱이 없으면 웹 URL로 폴백됩니다. `https://yoursite.com/product/42`처럼 일반 HTTPS URL이 앱으로 열립니다.

설정이 복잡하지만 (서버에 `apple-app-site-association` 파일 필요) 앱과 웹 간의 자연스러운 연결이 가능합니다.

```swift
// Universal Links는 .onOpenURL 동일하게 처리
// 단, 앱이 이미 실행 중인 경우와 콜드 스타트 처리가 다름
.onOpenURL { url in
    if url.host == "yoursite.com" {
        handleUniversalLink(url)
    }
}
```

| 방식 | 예시 URL | 앱 없을 때 | 설정 난이도 |
|------|---------|-----------|-----------|
| Custom URL Scheme | `myapp://product/42` | 오류 | 쉬움 |
| Universal Links | `https://mysite.com/product/42` | 웹으로 열림 | 복잡 |

---

## 8. 실전 예제 — 마스터-디테일 앱

목록 → 상세 → 편집 시트로 이어지는 전형적인 iOS 앱 패턴을 구현해봅니다.

### 데이터 모델

```swift
import Foundation

struct Article: Identifiable, Hashable {
    let id: UUID
    var title: String
    var body: String
    var author: String
    var publishedAt: Date
    var isBookmarked: Bool

    init(title: String, body: String, author: String) {
        self.id = UUID()
        self.title = title
        self.body = body
        self.author = author
        self.publishedAt = Date()
        self.isBookmarked = false
    }
}
```

### 앱 상태 관리 (ObservableObject)

```swift
import SwiftUI

@Observable
class ArticleStore {
    var articles: [Article] = [
        Article(title: "SwiftUI 네비게이션 완전 정복", body: "NavigationStack을 활용한...", author: "홍길동"),
        Article(title: "iOS 딥링크 구현하기", body: "Universal Links와 URL Scheme...", author: "김철수"),
        Article(title: "TabView 고급 활용법", body: "탭 배지와 프로그래밍적 전환...", author: "이영희"),
    ]

    func add(_ article: Article) {
        articles.insert(article, at: 0)
    }

    func update(_ article: Article) {
        if let index = articles.firstIndex(where: { $0.id == article.id }) {
            articles[index] = article
        }
    }

    func delete(at offsets: IndexSet) {
        articles.remove(atOffsets: offsets)
    }

    func toggleBookmark(_ article: Article) {
        if let index = articles.firstIndex(where: { $0.id == article.id }) {
            articles[index].isBookmarked.toggle()
        }
    }
}
```

### 루트 뷰

```swift
@main
struct ArticleApp: App {
    @State private var store = ArticleStore()

    var body: some Scene {
        WindowGroup {
            RootView()
                .environment(store)
        }
    }
}

struct RootView: View {
    var body: some View {
        TabView {
            NavigationStack {
                ArticleListView()
                    .navigationTitle("아티클")
            }
            .tabItem { Label("아티클", systemImage: "doc.text") }

            NavigationStack {
                BookmarkListView()
                    .navigationTitle("북마크")
            }
            .tabItem { Label("북마크", systemImage: "bookmark") }
        }
    }
}
```

### 목록 화면

```swift
struct ArticleListView: View {
    @Environment(ArticleStore.self) private var store
    @State private var showingNewArticle = false
    @State private var articleToDelete: Article? = nil
    @State private var showDeleteAlert = false

    var body: some View {
        List {
            ForEach(store.articles) { article in
                // 타입 기반 NavigationLink
                NavigationLink(value: article) {
                    ArticleRowView(article: article)
                }
                .swipeActions(edge: .trailing) {
                    Button(role: .destructive) {
                        articleToDelete = article
                        showDeleteAlert = true
                    } label: {
                        Label("삭제", systemImage: "trash")
                    }
                }
                .swipeActions(edge: .leading) {
                    Button {
                        store.toggleBookmark(article)
                    } label: {
                        Label(
                            article.isBookmarked ? "북마크 해제" : "북마크",
                            systemImage: article.isBookmarked ? "bookmark.slash" : "bookmark"
                        )
                    }
                    .tint(.yellow)
                }
            }
        }
        .navigationDestination(for: Article.self) { article in
            ArticleDetailView(article: article)
        }
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button {
                    showingNewArticle = true
                } label: {
                    Image(systemName: "plus")
                }
            }
        }
        .sheet(isPresented: $showingNewArticle) {
            ArticleEditSheet(article: nil)
        }
        .alert("아티클 삭제", isPresented: $showDeleteAlert) {
            Button("삭제", role: .destructive) {
                if let article = articleToDelete,
                   let index = store.articles.firstIndex(of: article) {
                    store.delete(at: IndexSet([index]))
                }
            }
            Button("취소", role: .cancel) {}
        } message: {
            Text("'\(articleToDelete?.title ?? "")' 을(를) 삭제하시겠습니까?")
        }
    }
}

struct ArticleRowView: View {
    let article: Article

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack {
                Text(article.title)
                    .font(.headline)
                    .lineLimit(1)
                if article.isBookmarked {
                    Image(systemName: "bookmark.fill")
                        .foregroundStyle(.yellow)
                        .font(.caption)
                }
            }
            Text(article.author)
                .font(.caption)
                .foregroundStyle(.secondary)
        }
        .padding(.vertical, 4)
    }
}
```

### 상세 화면

```swift
struct ArticleDetailView: View {
    @Environment(ArticleStore.self) private var store
    let article: Article
    @State private var showingEdit = false
    @State private var showShareOptions = false

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                Text(article.title)
                    .font(.largeTitle)
                    .bold()

                HStack {
                    Text(article.author)
                        .foregroundStyle(.secondary)
                    Spacer()
                    Text(article.publishedAt.formatted(date: .abbreviated, time: .omitted))
                        .foregroundStyle(.secondary)
                        .font(.caption)
                }

                Divider()

                Text(article.body)
                    .font(.body)
                    .lineSpacing(6)
            }
            .padding()
        }
        .navigationTitle(article.title)
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                HStack {
                    Button {
                        store.toggleBookmark(article)
                    } label: {
                        Image(systemName: article.isBookmarked ? "bookmark.fill" : "bookmark")
                    }

                    Button {
                        showShareOptions = true
                    } label: {
                        Image(systemName: "square.and.arrow.up")
                    }

                    Button("편집") {
                        showingEdit = true
                    }
                }
            }
        }
        // 데이터 기반 시트
        .sheet(isPresented: $showingEdit) {
            ArticleEditSheet(article: article)
        }
        // 액션 시트
        .confirmationDialog("공유", isPresented: $showShareOptions) {
            Button("링크 복사") { /* 복사 */ }
            Button("메시지로 보내기") { /* 공유 */ }
            Button("취소", role: .cancel) {}
        }
    }
}
```

### 편집 시트

```swift
struct ArticleEditSheet: View {
    @Environment(ArticleStore.self) private var store
    @Environment(\.dismiss) private var dismiss

    let article: Article?  // nil이면 새 아티클 작성

    @State private var title: String = ""
    @State private var body: String = ""
    @State private var author: String = ""

    var isEditing: Bool { article != nil }

    init(article: Article?) {
        self.article = article
        _title = State(initialValue: article?.title ?? "")
        _body = State(initialValue: article?.body ?? "")
        _author = State(initialValue: article?.author ?? "")
    }

    var body: some View {
        NavigationStack {
            Form {
                Section("제목") {
                    TextField("아티클 제목", text: $title)
                }
                Section("저자") {
                    TextField("저자 이름", text: $author)
                }
                Section("내용") {
                    TextEditor(text: $body)
                        .frame(minHeight: 200)
                }
            }
            .navigationTitle(isEditing ? "편집" : "새 아티클")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    Button("취소") {
                        dismiss()
                    }
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button(isEditing ? "저장" : "추가") {
                        saveArticle()
                    }
                    .disabled(title.isEmpty || author.isEmpty)
                    .fontWeight(.semibold)
                }
            }
        }
    }

    private func saveArticle() {
        if let existing = article {
            var updated = existing
            updated.title = title
            updated.body = body
            updated.author = author
            store.update(updated)
        } else {
            let newArticle = Article(title: title, body: body, author: author)
            store.add(newArticle)
        }
        dismiss()
    }
}
```

---

## 9. 네비게이션 패턴 빠른 비교

| 시나리오 | iOS SwiftUI | Android (Compose) | 웹 (React) |
|---------|------------|------------------|-----------|
| 목록 → 상세 | `NavigationLink(value:)` | `navController.navigate("detail/{id}")` | `<Link to="/detail/42">` |
| 코드로 이동 | `navigationPath.append(route)` | `navController.navigate(route)` | `navigate('/detail/42')` |
| 뒤로가기 | `dismiss()` / 자동 스와이프 | `navController.popBackStack()` | `navigate(-1)` |
| 루트로 이동 | `navigationPath.removeLast(count)` | `navController.popBackStack(startId, true)` | `navigate('/')` |
| 하단 모달 | `.sheet()` | `ModalBottomSheet` | `<dialog>` / 모달 컴포넌트 |
| 전체화면 모달 | `.fullScreenCover()` | `Dialog(fullscreen=true)` | `position: fixed` 오버레이 |
| 탭 구조 | `TabView` | `BottomNavigationView` | 탭 컴포넌트 |
| 알림 팝업 | `.alert()` | `AlertDialog` | `window.alert()` / 모달 |
| 선택 다이얼로그 | `.confirmationDialog()` | `BottomSheetDialog` | 커스텀 모달 |

---

## 정리

iOS 네비게이션의 핵심은 **Push(스택)**과 **Sheet(모달)**의 올바른 선택에 있습니다. 계층적 탐색은 Push, 독립적인 작업은 Sheet로 구분하면 Apple의 HIG(Human Interface Guidelines)에 맞는 자연스러운 UX가 됩니다.

SwiftUI `NavigationStack`은 선언형 방식으로 타입 안전하게 라우팅을 관리합니다. 복잡한 앱이라면 `AppRoute` enum을 정의해 모든 경로를 중앙 관리하는 패턴을 추천합니다.

**실무에서 자주 하는 실수:**
- `NavigationView` 사용 (iOS 16 이전 방식, deprecated)
- `NavigationStack`을 `TabView` 안이 아닌 바깥에 두기
- 시트 안에서 또 다른 `.sheet()`를 중첩하기 (iOS 16.4 이전에는 동작 불안정)
- `Alert`에 버튼 3개 이상 넣기 (대신 `confirmationDialog` 사용)
