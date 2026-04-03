# Chapter 7. UIKit — 레거시 UI의 현실

SwiftUI가 Apple의 미래라는 건 맞습니다. 하지만 현업으로 들어가면 다른 현실과 마주칩니다. iOS 13 미지원 기기를 아직 대응해야 하는 서비스, 5년치 UIKit 코드가 쌓인 레거시 프로젝트, SwiftUI로 아직 안정적으로 구현하기 어려운 복잡한 커스텀 UI. 이 챕터는 그 현실을 직시합니다.

UIKit을 배워야 하는 이유는 단순히 레거시 유지보수 때문만이 아닙니다. UIKit을 이해해야 SwiftUI 내부에서 무슨 일이 벌어지는지 알 수 있고, `UIViewRepresentable`로 두 세계를 연결할 수 있으며, 애니메이션·제스처·커스텀 렌더링처럼 SwiftUI가 아직 충분히 표현하지 못하는 영역을 자신 있게 다룰 수 있습니다.

---

## 1. UIViewController 생명주기

### "Activity가 곧 ViewController는 아니다"

Android 개발자라면 Activity 생명주기를 먼저 익혔을 것입니다. iOS의 UIViewController는 비슷해 보이지만 중요한 차이가 있습니다. Activity는 "화면 단위"의 개념이지만 UIViewController는 화면 일부만 담당할 수도 있고, 다른 ViewController를 자식으로 포함(Container VC)할 수도 있습니다. 또한 Fragment와 달리 UIViewController는 뷰와 항상 1:1로 연결되어 있습니다.

웹 개발자 관점에서는 React의 `useEffect`와 비교할 수 있습니다. `viewDidLoad`는 빈 의존성 배열의 `useEffect`(마운트 시 1회), `viewWillAppear`/`viewDidAppear`는 탭을 오가며 화면이 보일 때마다 불리는 `useEffect`(특정 값 변경 시)와 유사합니다.

COMPARE_BLOCK:uikit_viewcontroller_lifecycle

### 생명주기 메서드 선택 기준

각 생명주기 메서드는 목적이 다릅니다. 잘못된 위치에 코드를 넣으면 성능 문제나 예상치 못한 버그가 발생합니다.

| 메서드 | 호출 횟수 | 주요 사용처 |
|--------|----------|------------|
| `viewDidLoad` | 1회 | addSubview, 제약 설정, 데이터 바인딩 |
| `viewWillAppear` | 매번 | 네비게이션 바 설정, 데이터 갱신, 탭 상태 복원 |
| `viewDidAppear` | 매번 | 애니메이션 시작, 분석 이벤트, 키보드 표시 |
| `viewDidLayoutSubviews` | 레이아웃 변경마다 | frame 의존 작업(그라데이션, 원형 레이어) |
| `viewWillDisappear` | 매번 | 저장, 키보드 해제, 첫 번째 리스폰더 해제 |
| `deinit` | 소멸 시 | 타이머 해제, 약한 참조 외 구독 해제 |

### 흔한 실수: retain cycle로 인한 deinit 미호출

`deinit`이 호출되지 않는다면 메모리 누수를 의심해야 합니다. 가장 흔한 원인은 클로저 안에서 `[weak self]`를 빠뜨리는 것입니다.

```swift
// ❌ 잘못된 예 — ViewController가 절대 해제되지 않음
Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { timer in
    self.updateUI() // self를 강하게 참조 → Timer ← VC → Timer 사이클
}

// ✅ 올바른 예
Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { [weak self] timer in
    guard let self else { timer.invalidate(); return }
    self.updateUI()
}
```

또한 NotificationCenter 구독은 iOS 9+에서 자동 해제되지만, `Timer`는 반드시 `invalidate()`를 호출해야 합니다. `deinit`에서 타이머를 해제하려 해도 `deinit`이 호출되지 않는 상황이라면, `viewWillDisappear`에서 해제하는 것이 안전합니다.

### Container ViewController 패턴

UIViewController는 다른 ViewController를 자식으로 포함할 수 있습니다. `UINavigationController`, `UITabBarController`가 대표적인 예입니다. 커스텀 컨테이너를 만들 때는 반드시 공식 API를 사용해야 생명주기가 올바르게 전달됩니다.

```swift
// 자식 VC 추가 — 생명주기 전달 필수
addChild(childVC)
view.addSubview(childVC.view)
childVC.view.frame = containerView.bounds
childVC.didMove(toParent: self)

// 자식 VC 제거
childVC.willMove(toParent: nil)
childVC.view.removeFromSuperview()
childVC.removeFromParent()
```

`addChild`와 `didMove(toParent:)` 없이 단순히 `addSubview`만 하면 자식 ViewController의 `viewWillAppear` 같은 메서드가 호출되지 않아 심각한 버그가 발생합니다.

---

## 2. Auto Layout — NSLayoutConstraint와 SnapKit

### "왜 이렇게 복잡한가"

Android의 `ConstraintLayout`과 iOS의 Auto Layout은 개념은 유사합니다. 뷰들 사이의 관계를 제약(constraint)으로 표현하고, 이를 연립방정식 풀듯 풀어 최종 frame을 결정합니다. 하지만 API 설계 철학이 다릅니다. ConstraintLayout은 XML 속성으로 선언하는 게 주류인 반면, UIKit에서는 코드로 제약을 추가하는 것이 표준입니다.

CSS Flexbox/Grid 개발자라면 처음에는 매우 장황하게 느껴집니다. `display: flex`로 한 줄에 해결할 것을 `NSLayoutConstraint.activate([...])` 여러 줄로 풀어야 하니까요. 하지만 Auto Layout은 훨씬 더 명시적이고, 어떤 제약이 어떻게 작동하는지 추적하기 쉽습니다.

COMPARE_BLOCK:uikit_auto_layout

### translatesAutoresizingMaskIntoConstraints — 반드시 false

코드로 Auto Layout을 사용할 때 가장 자주 저지르는 실수입니다. 모든 UIView는 기본적으로 `translatesAutoresizingMaskIntoConstraints = true`이며, 이 상태에서 `NSLayoutConstraint`를 추가하면 자동 생성된 제약과 충돌합니다. 코드 UI를 쓸 때는 항상 이 속성을 `false`로 설정해야 합니다.

SnapKit을 사용하면 이 설정이 자동으로 처리되는 것도 장점 중 하나입니다.

### Priority와 충돌 해결

Auto Layout은 모든 제약이 항상 만족될 수 없을 때 우선순위(priority)를 사용합니다. 기본값은 1000(Required)이며, 낮은 우선순위 제약은 공간이 부족할 때 무시됩니다.

```swift
// 제약에 우선순위 지정
let heightConstraint = view.heightAnchor.constraint(equalToConstant: 200)
heightConstraint.priority = .defaultHigh  // 750
heightConstraint.isActive = true

// 최소 높이는 보장하되 늘어날 수 있도록
let minHeight = view.heightAnchor.constraint(greaterThanOrEqualToConstant: 44)
minHeight.priority = .required  // 1000
minHeight.isActive = true

let preferredHeight = view.heightAnchor.constraint(equalToConstant: 120)
preferredHeight.priority = .defaultLow  // 250
preferredHeight.isActive = true
```

### UIStackView — Auto Layout의 고수준 추상화

UIStackView는 UIKit에서 SwiftUI의 `VStack`/`HStack`에 가장 가까운 도구입니다. 내부적으로 제약을 자동으로 생성하고 관리해주기 때문에, 배치가 단순하다면 수동 제약 없이도 대부분의 레이아웃을 구성할 수 있습니다.

COMPARE_BLOCK:uikit_stackview

### 레이아웃 디버깅

제약 충돌이 발생하면 Xcode 콘솔에 로그가 출력됩니다. 이 로그를 읽는 방법을 알면 문제를 빠르게 찾을 수 있습니다.

```
[LayoutConstraints] Unable to simultaneously satisfy constraints.
    Probably at least one of the constraints in the following list is one you don't want.
    (
        "<NSLayoutConstraint:0x600001234 UILabel.height == 44>",
        "<NSLayoutConstraint:0x600001235 UILabel.height == 80>"  // 충돌
    )
```

`AMBIGUOUS LAYOUT`은 제약이 부족해서 위치나 크기가 확정되지 않는 경우입니다. Xcode의 View Debugger(`Debug > View Debugging > Capture View Hierarchy`)를 활용하면 시각적으로 확인할 수 있습니다.

---

## 3. UITableView — 여전히 살아있는 공룡

### 왜 UITableView를 배워야 하는가

SwiftUI의 `List`가 많은 것을 해결해줬지만, 커스텀 셀 레이아웃의 복잡도, 스와이프 액션, 셀 높이의 정밀 제어, 성능 최적화 면에서 UITableView는 여전히 선택지입니다. 더 중요한 이유는 현업 iOS 코드베이스의 상당 부분이 UITableView로 작성되어 있다는 점입니다.

RecyclerView를 써봤다면 UITableView의 `dequeueReusableCell`이 ViewHolder 패턴과 동일하다는 걸 바로 알 수 있습니다. 화면 밖으로 나간 셀을 재활용해서 성능을 높이는 메커니즘입니다.

COMPARE_BLOCK:uikit_tableview_basic

### 셀 높이 전략

UITableView에서 가장 자주 마주치는 문제 중 하나가 셀 높이입니다.

**자동 높이 (`automaticDimension`)**: 셀 내부에 위에서 아래까지 연결된 제약이 있으면 Auto Layout이 높이를 계산합니다. `estimatedRowHeight`를 설정하면 초기 스크롤 성능이 향상됩니다.

```swift
tableView.rowHeight = UITableView.automaticDimension
tableView.estimatedRowHeight = 60
```

**고정 높이**: 모든 셀이 같은 높이라면 `rowHeight`를 고정값으로 설정하는 것이 가장 빠릅니다.

**델리게이트 높이**: 행마다 다른 고정 높이가 필요할 때 `heightForRowAt`을 구현합니다. 이 메서드는 `cellForRowAt`보다 먼저 호출되므로, 셀 객체에 접근하지 말고 데이터 모델에서 높이를 계산해야 합니다.

### 섹션 헤더/푸터와 인덱스

UITableView는 섹션 구조를 네이티브로 지원합니다. 연락처 앱의 알파벳 인덱스 같은 UI도 UITableView가 제공하는 기능입니다.

```swift
// 섹션 인덱스 타이틀 (오른쪽 알파벳 인덱스)
func sectionIndexTitles(for tableView: UITableView) -> [String]? {
    return sections.map { $0.title }
}

func tableView(_ tableView: UITableView, sectionForSectionIndexTitle title: String, at index: Int) -> Int {
    return index
}

// 스티키 헤더 (기본 동작)
// 섹션 헤더는 스크롤해도 화면에 고정됨
// .grouped 스타일에서는 float 헤더 없음
```

---

## 4. DiffableDataSource — 현대적인 데이터 관리

### 왜 reloadData()가 나쁜가

`tableView.reloadData()`는 테이블 전체를 처음부터 다시 그립니다. 데이터가 조금만 바뀌어도 모든 셀이 재생성되고, 애니메이션도 없습니다. Android의 `notifyDataSetChanged()`와 같은 문제입니다.

반면 `performBatchUpdates`를 직접 사용하면 정확한 변경 인덱스를 관리해야 하는데, 데이터와 UI가 조금이라도 어긋나면 `NSInternalInconsistencyException`이 발생해 앱이 크래시됩니다. Android의 DiffUtil, React의 key 비교와 동일한 문제를 iOS는 `UITableViewDiffableDataSource`(iOS 13+)로 해결했습니다.

COMPARE_BLOCK:uikit_tableview_diffable

### NSDiffableDataSourceSnapshot 동작 원리

Snapshot은 특정 시점의 데이터 상태를 담은 불변 객체입니다. `apply()`를 호출하면 현재 상태와 새 Snapshot을 비교(diff)해서 최소한의 변경만 반영합니다. Hashable 기반으로 아이템의 동일성을 판단하므로, 같은 ID의 아이템이 내용만 바뀌면 셀을 새로 만들지 않고 내용만 업데이트합니다.

iOS 15+의 `reconfigureItems`는 더 나아가 셀 재사용 큐를 거치지 않고 기존 셀 객체를 직접 업데이트합니다. 아이템의 일부 속성만 바뀌었을 때 `reloadItems`보다 훨씬 빠릅니다.

---

## 5. UICollectionView — 그리드와 그 너머

### UICollectionView가 UITableView보다 강력한 이유

UITableView는 수직 스크롤 리스트 하나만 표현합니다. UICollectionView는 레이아웃 객체를 교체하는 것만으로 완전히 다른 UI를 만들 수 있습니다. Instagram 피드(세로 스크롤 그리드), App Store 배너(가로 스크롤 카드), 핀터레스트 폭포수 레이아웃, 심지어 완전히 커스텀한 원형 배치도 가능합니다.

iOS 13에 도입된 `UICollectionViewCompositionalLayout`은 이 모든 것을 선언형으로 표현할 수 있게 해줍니다. 기존의 `UICollectionViewFlowLayout`보다 훨씬 강력하고 유연합니다.

COMPARE_BLOCK:uikit_collectionview

### Compositional Layout 핵심 개념

Compositional Layout은 세 계층으로 구성됩니다.

```
NSCollectionLayoutSection
    └── NSCollectionLayoutGroup (반복되는 패턴)
            └── NSCollectionLayoutItem (개별 셀)
```

각 계층의 크기는 `fractionalWidth`, `fractionalHeight`, `absolute`, `estimated` 중 하나로 지정합니다. `fractionalWidth(1/3)`은 상위 컨테이너의 1/3이라는 의미입니다.

**orthogonalScrollingBehavior**: 섹션을 가로 스크롤로 만드는 핵심 속성입니다. `.continuous`, `.paging`, `.groupPaging`, `.groupPagingCentered` 중 선택합니다. 이것만으로 App Store의 스크롤 UI를 재현할 수 있습니다.

### UICollectionViewFlowLayout — 레거시지만 여전히 사용

Compositional Layout이 더 강력하지만, 단순한 그리드라면 FlowLayout이 더 간결합니다. iOS 13 미만을 지원해야 하는 경우에도 FlowLayout을 사용해야 합니다.

```swift
let flowLayout = UICollectionViewFlowLayout()
flowLayout.itemSize = CGSize(width: (UIScreen.main.bounds.width - 48) / 3, height: 120)
flowLayout.minimumInteritemSpacing = 8
flowLayout.minimumLineSpacing = 8
flowLayout.sectionInset = UIEdgeInsets(top: 16, left: 16, bottom: 16, right: 16)

let collectionView = UICollectionView(frame: .zero, collectionViewLayout: flowLayout)
```

---

## 6. UINavigationController — 화면 전환의 중심

### iOS 네비게이션의 철학

Android의 Fragment 백스택과 iOS의 UINavigationController는 "스택 기반 네비게이션"이라는 공통점이 있습니다. 차이점은 UINavigationController가 훨씬 더 명확하게 단일 스택을 관리한다는 것입니다. Fragment의 `addToBackStack`이나 `popBackStack`처럼 복잡한 조작 없이, `pushViewController`와 `popViewController`로 직관적으로 제어합니다.

React Router와 비교하면, iOS는 URL 기반이 아닌 객체 스택 기반입니다. `navigate('/users/123')`처럼 경로 문자열을 쓰지 않고, `UIViewController` 인스턴스를 직접 스택에 넣습니다. 이는 더 타입 안전하지만, 딥링크 처리 같은 URL 기반 네비게이션을 구현할 때는 추가 설계가 필요합니다.

COMPARE_BLOCK:uikit_navigation_controller

### Modal vs Push — 언제 무엇을 사용하는가

iOS HIG(Human Interface Guidelines)는 두 방식의 사용 기준을 제시합니다.

**Push (네비게이션 스택)**: 정보를 더 깊이 탐색할 때. "선택 → 상세" 패턴. 사용자가 같은 정보 계층에 있다는 느낌.

**Modal (시트)**: 현재 작업과 독립적인 흐름. 새 항목 생성, 설정, 경고 확인. 작업이 완료되거나 취소되면 원래 화면으로 돌아온다는 느낌.

iOS 13+에서 기본 modal 스타일이 `.pageSheet`(부분 화면 시트)로 변경되었습니다. 이전의 전체 화면 modal을 원하면 `modalPresentationStyle = .fullScreen`을 명시해야 합니다.

### 커스텀 전환 애니메이션

`UIViewControllerTransitioningDelegate`와 `UIViewControllerAnimatedTransitioning`을 구현하면 완전히 커스텀한 화면 전환을 만들 수 있습니다. 이 API는 복잡하지만 Hero, Transition 같은 라이브러리들이 위에 더 쉬운 인터페이스를 제공합니다.

```swift
// 기본 페이드 전환 예시
class FadeTransition: NSObject, UIViewControllerAnimatedTransitioning {
    func transitionDuration(using ctx: UIViewControllerContextTransitioning?) -> TimeInterval {
        return 0.3
    }

    func animateTransition(using ctx: UIViewControllerContextTransitioning) {
        guard let toVC = ctx.viewController(forKey: .to) else { return }
        let container = ctx.containerView

        toVC.view.alpha = 0
        container.addSubview(toVC.view)
        toVC.view.frame = ctx.finalFrame(for: toVC)

        UIView.animate(withDuration: transitionDuration(using: ctx)) {
            toVC.view.alpha = 1
        } completion: { _ in
            ctx.completeTransition(!ctx.transitionWasCancelled)
        }
    }
}
```

---

## 7. Delegate 패턴 — iOS의 핵심 설계 원칙

### 왜 Delegate인가

UIKit의 거의 모든 컴포넌트는 Delegate 패턴을 사용합니다. `UITableViewDelegate`, `UITextFieldDelegate`, `UIScrollViewDelegate`... 처음 접하면 왜 이렇게 복잡하게 콜백을 처리하나 싶지만, 이 패턴의 강점은 **관심사 분리**입니다.

UITableView는 "아이템이 선택됐을 때 무슨 일을 해야 하는지" 모릅니다. 그건 비즈니스 로직이고, TableView의 관심사가 아닙니다. Delegate에게 물어봄으로써 TableView는 화면 출력에만 집중하고, 비즈니스 로직은 delegate를 구현하는 쪽에서 담당합니다.

Android의 인터페이스 콜백, JavaScript의 이벤트 리스너, React의 prop 콜백 모두 동일한 아이디어의 변형입니다.

COMPARE_BLOCK:uikit_delegate_pattern

### weak var delegate 패턴

Delegate 프로퍼티는 항상 `weak var`로 선언합니다. 이유는 순환 참조 방지입니다.

```
ParentVC (강하게 소유) → ChildVC
ChildVC.delegate = ParentVC (강하게 참조한다면?)
  → ParentVC와 ChildVC가 서로를 강하게 참조 → 둘 다 해제 불가 → 메모리 누수
```

`weak`로 선언하면 ChildVC가 ParentVC를 약하게 참조하므로, ParentVC의 참조 카운트에 영향을 주지 않습니다. 따라서 protocol에 `: AnyObject`(또는 `: class`) 제약이 필요합니다. struct는 weak 참조가 불가능하기 때문입니다.

### Delegate vs Notification vs Combine

iOS에는 이벤트를 전달하는 방법이 여러 가지입니다.

| 방식 | 사용 시기 | 특징 |
|------|----------|------|
| **Delegate** | 1:1 관계, 응답이 필요한 경우 | 타입 안전, 명확한 계약 |
| **NotificationCenter** | 1:N 브로드캐스트 | 느슨한 결합, 문자열 키 사용 |
| **Combine/async** | 비동기 스트림 | 복잡한 데이터 흐름, 취소 가능 |
| **Closure** | 단순 일회성 콜백 | 간결, 캡처 컨텍스트 편리 |
| **KVO** | 시스템 객체 관찰 | Obj-C 기반, 타입 불안전 |

---

## 8. 코드로 UI 작성 (Programmatic UI)

### 스토리보드 vs XIB vs 코드 — 선택 기준

현업 iOS 팀은 크게 두 진영으로 나뉩니다. 스토리보드/XIB 지지자와 코드 UI 지지자. 각각의 주장이 있고, 프로젝트 성격에 따라 다른 선택이 맞습니다.

**스토리보드 장점**: 화면 흐름을 시각적으로 파악하기 쉽다. 디자이너와 협업이 쉽다. 작은 팀, 간단한 앱에 빠르다.

**코드 UI 장점**: Git 충돌 해결이 쉽다(XML 병합은 악몽). 재사용 가능한 UI 컴포넌트 만들기 쉽다. 조건부 레이아웃, 동적 UI 구성이 자유롭다. 코드 리뷰로 UI 변경 추적 가능.

실무에서는 코드 UI + SnapKit 조합이 중대형 팀에서 압도적으로 많이 쓰입니다.

COMPARE_BLOCK:uikit_programmatic_ui

### 재사용 가능한 UI 컴포넌트 설계

UIKit에서 재사용 컴포넌트를 만들 때는 두 가지 패턴이 있습니다.

**UIView 서브클래스**: 독립적인 뷰 컴포넌트. 버튼 그룹, 커스텀 인풋, 카드 컴포넌트 등.

**UIViewController 서브클래스**: 자체 생명주기가 필요한 컴포넌트. 로딩 상태, 에러 상태, 비어있는 상태 등을 관리하는 컨테이너.

```swift
// 재사용 가능한 EmptyStateView
class EmptyStateView: UIView {
    private let imageView = UIImageView()
    private let titleLabel = UILabel()
    private let subtitleLabel = UILabel()
    private let actionButton = UIButton(type: .system)

    var onActionTapped: (() -> Void)?

    // 편의 팩토리 메서드
    static func noResults(action: (() -> Void)? = nil) -> EmptyStateView {
        let view = EmptyStateView()
        view.imageView.image = UIImage(systemName: "magnifyingglass")
        view.titleLabel.text = "결과 없음"
        view.subtitleLabel.text = "다른 검색어를 시도해보세요"
        view.actionButton.isHidden = action == nil
        view.onActionTapped = action
        return view
    }
}
```

### 뷰 초기화 시 흔한 패턴들

```swift
// 1. 팩토리 클로저 — 가장 표준적인 방법
private let titleLabel: UILabel = {
    let label = UILabel()
    label.font = .systemFont(ofSize: 20, weight: .bold)
    return label
}()

// 2. lazy var — self 참조가 필요할 때
private lazy var submitButton: UIButton = {
    let button = UIButton(type: .system)
    button.addTarget(self, action: #selector(submitTapped), for: .touchUpInside)
    return button
}()

// 3. 설정 메서드 분리 — viewDidLoad에서 호출
private func setupTitleLabel() {
    titleLabel.font = .systemFont(ofSize: 20, weight: .bold)
    titleLabel.textColor = .label
}

// iOS 15+ UIButton.Configuration
var config = UIButton.Configuration.filled()
config.title = "제출"
config.image = UIImage(systemName: "paperplane")
config.imagePlacement = .trailing
config.imagePadding = 8
config.cornerStyle = .medium
let button = UIButton(configuration: config)
```

---

## 9. Responder Chain — 이벤트 전파의 원리

### "터치는 어떻게 처리되는가"

손가락이 화면을 터치하면 iOS는 Hit Testing을 통해 어느 뷰가 그 터치를 받아야 하는지 결정합니다. 이 과정은 뷰 계층을 위에서 아래로(루트에서 리프로) 탐색하며 터치 좌표를 포함하는 가장 깊은 뷰를 찾습니다.

Android의 터치 이벤트 전파(`onInterceptTouchEvent` → `onTouchEvent`)와 유사하지만, iOS의 Responder Chain은 단순히 터치에만 국한되지 않습니다. 키보드 입력, 원격 제어, 커스텀 이벤트까지 모두 체인을 통해 전파됩니다.

웹의 이벤트 버블링과도 개념이 닮았습니다. 이벤트를 처리하지 못한 객체는 다음 리스폰더에게 전달합니다. 차이점은 웹은 DOM 트리를 따라 버블링하지만, iOS는 뷰 계층과 ViewController 계층을 함께 거칩니다.

COMPARE_BLOCK:uikit_responder_chain

### First Responder와 키보드

`becomeFirstResponder()`와 `resignFirstResponder()`는 단순히 키보드를 올리고 내리는 것이 아닙니다. 입력 포커스를 시스템에 알리는 것입니다. 키보드가 올라오면 `UIKeyboardWillShowNotification`이 전달되고, 이를 관찰해서 레이아웃을 조정하는 것이 일반적인 패턴입니다.

```swift
private func setupKeyboardObservers() {
    NotificationCenter.default.addObserver(
        self,
        selector: #selector(keyboardWillShow),
        name: UIResponder.keyboardWillShowNotification,
        object: nil
    )
    NotificationCenter.default.addObserver(
        self,
        selector: #selector(keyboardWillHide),
        name: UIResponder.keyboardWillHideNotification,
        object: nil
    )
}

@objc private func keyboardWillShow(_ notification: Notification) {
    guard let keyboardFrame = notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? CGRect,
          let duration = notification.userInfo?[UIResponder.keyboardAnimationDurationUserInfoKey] as? Double
    else { return }

    let keyboardHeight = keyboardFrame.height
    UIView.animate(withDuration: duration) {
        self.bottomConstraint.constant = -keyboardHeight
        self.view.layoutIfNeeded()
    }
}
```

iOS 15+에서는 `UITrackingLayoutGuide`나 `keyboardLayoutGuide`를 사용하면 키보드 처리가 훨씬 간편합니다.

```swift
// iOS 15+ — 키보드와 연동되는 제약 (자동 애니메이션 포함)
submitButton.bottomAnchor.constraint(
    equalTo: view.keyboardLayoutGuide.topAnchor, constant: -16
).isActive = true
```

### UIGestureRecognizer — 손쉬운 제스처 처리

Responder Chain과 별개로, UIGestureRecognizer는 더 높은 수준의 제스처 인식 API를 제공합니다. 탭, 핀치, 스와이프, 회전, 롱프레스 등 일반적인 제스처는 내장 인식기를 사용합니다.

```swift
// 탭 제스처
let tapGesture = UITapGestureRecognizer(target: self, action: #selector(handleTap))
tapGesture.numberOfTapsRequired = 2  // 더블 탭
view.addGestureRecognizer(tapGesture)

// 핀치 (확대/축소)
let pinchGesture = UIPinchGestureRecognizer(target: self, action: #selector(handlePinch))
imageView.addGestureRecognizer(pinchGesture)
imageView.isUserInteractionEnabled = true

@objc private func handlePinch(_ gesture: UIPinchGestureRecognizer) {
    guard let view = gesture.view else { return }
    view.transform = view.transform.scaledBy(x: gesture.scale, y: gesture.scale)
    gesture.scale = 1  // 리셋
}

// 팬 (드래그)
let panGesture = UIPanGestureRecognizer(target: self, action: #selector(handlePan))

@objc private func handlePan(_ gesture: UIPanGestureRecognizer) {
    let translation = gesture.translation(in: view)
    guard let dragView = gesture.view else { return }

    dragView.center = CGPoint(
        x: dragView.center.x + translation.x,
        y: dragView.center.y + translation.y
    )
    gesture.setTranslation(.zero, in: view)  // 리셋

    if gesture.state == .ended {
        snapToNearestCorner(dragView)
    }
}
```

---

## 10. UIKit과 SwiftUI의 공존

### UIViewRepresentable — 브릿지 패턴

SwiftUI 앱에서 UIKit 컴포넌트가 필요할 때, 또는 UIKit 앱에 SwiftUI 뷰를 삽입할 때 브릿지가 필요합니다.

```swift
// UIKit → SwiftUI 래핑
struct ActivityIndicatorView: UIViewRepresentable {
    let isAnimating: Bool

    func makeUIView(context: Context) -> UIActivityIndicatorView {
        UIActivityIndicatorView(style: .large)
    }

    func updateUIView(_ uiView: UIActivityIndicatorView, context: Context) {
        if isAnimating {
            uiView.startAnimating()
        } else {
            uiView.stopAnimating()
        }
    }
}

// SwiftUI → UIKit 삽입
let swiftUIView = ProfileCardView(user: user)
let hostingController = UIHostingController(rootView: swiftUIView)
addChild(hostingController)
view.addSubview(hostingController.view)
hostingController.view.snp.makeConstraints { $0.edges.equalTo(containerView) }
hostingController.didMove(toParent: self)
```

### 언제 UIKit, 언제 SwiftUI를 선택하는가

실무에서 사용하는 판단 기준입니다.

| 상황 | 선택 |
|------|------|
| 신규 앱, iOS 16+ 타겟 | SwiftUI 우선 |
| 복잡한 커스텀 애니메이션 | UIKit 또는 `UIViewRepresentable` |
| 커스텀 컬렉션 레이아웃 | UICollectionView + Compositional Layout |
| 기존 UIKit 코드베이스에 신규 화면 추가 | SwiftUI + UIHostingController |
| UIPageViewController, UIVideoPlayer 등 | UIViewControllerRepresentable |
| 성능 중요한 리스트 (10만 개 이상) | UITableView / UICollectionView |

---

## 정리 — UIKit은 기초다

SwiftUI가 선언형이고 더 직관적이라는 건 사실입니다. 하지만 UIKit을 깊이 이해하고 있으면 두 가지 이점이 생깁니다.

첫째, SwiftUI의 동작을 예측할 수 있습니다. `List`가 내부적으로 UITableView를 쓴다는 걸 알면, 왜 특정 커스터마이징이 안 되는지 이해합니다. `NavigationStack`이 UINavigationController를 래핑한다는 걸 알면, `UIViewControllerRepresentable`로 뭔가를 조작할 수 있다는 것도 압니다.

둘째, 복잡한 UI 요구사항을 만났을 때 도망치지 않아도 됩니다. UIKit은 저수준이지만 그만큼 강력합니다. 어떤 UI든 구현할 수 있다는 확신이 생기면, 프레임워크에 종속되지 않는 iOS 엔지니어로 성장합니다.

다음 챕터에서는 Combine과 async/await를 사용한 비동기 프로그래밍을 다룹니다. UIKit의 콜백 지옥을 어떻게 우아하게 해결하는지, RxJava/RxKotlin을 써봤다면 무엇이 다른지 살펴봅니다.
