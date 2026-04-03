# Chapter 14. 접근성 (Accessibility)

접근성은 "장애인을 위한 부가 기능"이 아닙니다. 일시적인 부상, 밝은 햇빛 아래서의 화면 시인성 저하, 노이즈가 많은 환경에서의 음성 입력 — 누구든 어떤 순간에 접근성의 도움을 받습니다. Apple은 VoiceOver를 iOS 3.0부터 탑재했고, 이는 경쟁 플랫폼보다 몇 년 앞선 결정이었습니다. 이 챕터에서는 iOS 접근성 API의 핵심을 Android TalkBack·웹 ARIA와 비교하며 실무 수준으로 다룹니다.

---

## 1. 접근성 아키텍처 개요

### 플랫폼별 접근성 스택 비교

| 항목 | iOS | Android | Web |
|------|-----|---------|-----|
| 스크린 리더 | VoiceOver | TalkBack | NVDA / JAWS / VoiceOver(macOS) |
| 스위치 제어 | Switch Control | Switch Access | 키보드 탐색 |
| 음성 제어 | Voice Control (iOS 13+) | Voice Access | Web Speech API |
| 확대 | Zoom | Magnification | 브라우저 줌 |
| 텍스트 크기 | Dynamic Type | sp 단위 | rem/em |
| 고대비 | Increase Contrast | High Contrast Text | prefers-contrast |
| 모션 감소 | Reduce Motion | Animator Scale | prefers-reduced-motion |
| 접근성 API | UIAccessibility | AccessibilityManager | WAI-ARIA |

### iOS 접근성 시스템의 구조

```
앱 (UIKit / SwiftUI)
        │
        ▼
UIAccessibility 프레임워크
        │
        ▼
접근성 트리 (Accessibility Tree)
        │
  ┌─────┴─────┐
  │           │
VoiceOver  Switch Control / Voice Control / Zoom
```

iOS는 **접근성 트리**라는 논리적 계층 구조를 통해 VoiceOver 등 보조 기술과 통신합니다. UIView와 SwiftUI View는 기본적으로 이 트리에 자동 포함되며, `isAccessibilityElement`, `accessibilityElementsHidden`, `shouldGroupAccessibilityChildren` 등의 속성으로 구조를 세밀하게 제어할 수 있습니다.

### Android·웹과의 철학적 차이

**iOS (UIKit/SwiftUI)**: 뷰 계층과 접근성 트리가 직접 연결됩니다. 개발자가 접근성 속성을 수동으로 설정하거나, `shouldGroupAccessibilityChildren`·`accessibilityElements`로 구조를 재정의합니다.

**Android (TalkBack)**: `contentDescription` 속성 하나로 대부분 처리합니다. Compose의 `semantics` API가 iOS와 더 유사한 방식으로 발전하고 있습니다.

**Web (ARIA)**: HTML의 의미론적 구조(시맨틱 HTML)가 기반입니다. `role`, `aria-label`, `aria-describedby` 등의 속성으로 보강합니다. 스크린 리더마다 해석이 다소 다릅니다.

---

## 2. accessibilityLabel / Hint / Value / Trait

### VoiceOver가 읽는 정보의 구성

VoiceOver는 요소를 포커스할 때 다음 순서로 정보를 읽습니다:

```
[accessibilityLabel] [accessibilityValue] [accessibilityTraits] [accessibilityHint]
         ↑                    ↑                    ↑                      ↑
     "좋아요"             "선택됨"              "버튼"         "두 번 탭하면 좋아요 추가"
```

- **Label**: 요소가 무엇인지 설명 (명사형 권장, 마침표 없음)
- **Value**: 현재 상태나 값 (슬라이더 50%, 토글 켜짐 등)
- **Trait**: 요소의 역할과 상태 (`.button`, `.header`, `.selected`, `.notEnabled` 등)
- **Hint**: 사용 방법 힌트 (동사형, "~하려면 두 번 탭하세요" 형식)

> 💡 Hint는 VoiceOver 설정에서 끌 수 있습니다. Label과 Value만으로도 의미가 충분히 전달되어야 합니다.

COMPARE_BLOCK:a11y_voiceover_label

### accessibilityTraits 주요 값

```swift
// 단일 트레이트
button.accessibilityTraits = .button          // 탭 가능
label.accessibilityTraits = .staticText       // 편집 불가 텍스트
header.accessibilityTraits = .header          // 섹션 헤더 (로터 탐색)
image.accessibilityTraits = .image            // 이미지
link.accessibilityTraits = .link              // 링크 (로터 탐색)
slider.accessibilityTraits = .adjustable      // 증감 가능 (스와이프 업/다운)

// 상태 트레이트 (다른 트레이트와 조합)
selectedButton.accessibilityTraits = [.button, .selected]
disabledButton.accessibilityTraits = [.button, .notEnabled]
playingButton.accessibilityTraits  = [.button, .startsMediaSession]

// 자주 실수하는 케이스
// ❌ UISwitch를 직접 구현할 때 .button만 지정 → 스위치 상태 안 읽힘
// ✅ .button + accessibilityValue = "켜짐" / "꺼짐"
```

### 실무에서 자주 빠뜨리는 케이스

**이미지 버튼**: 아이콘만 있는 버튼에는 반드시 `accessibilityLabel` 설정

```swift
// ❌ 아이콘만 있는 버튼 — VoiceOver가 "버튼" 또는 파일명을 읽음
let searchButton = UIButton()
searchButton.setImage(UIImage(systemName: "magnifyingglass"), for: .normal)

// ✅ 레이블 명시
searchButton.accessibilityLabel = "검색"
```

**자리표시자 텍스트(placeholder)**: UITextField의 placeholder는 자동으로 accessibilityLabel에 반영되지 않는 경우가 있습니다

```swift
let emailField = UITextField()
emailField.placeholder = "이메일 주소"
// VoiceOver: "텍스트 필드" 만 읽는 경우 있음
emailField.accessibilityLabel = "이메일 주소 입력"  // 명시적 레이블 권장
```

**로딩 인디케이터**: `UIActivityIndicatorView`는 기본적으로 접근성 요소가 아님

```swift
let spinner = UIActivityIndicatorView(style: .medium)
spinner.isAccessibilityElement = true
spinner.accessibilityLabel = "로딩 중"
spinner.accessibilityTraits = .updatesFrequently  // 자주 변경되는 요소
```

---

## 3. SwiftUI Accessibility Modifiers

### SwiftUI의 접근성 수식어 체계

SwiftUI의 접근성 지원은 UIKit보다 훨씬 선언적입니다. `.accessibilityLabel`, `.accessibilityHint`, `.accessibilityValue` 수식어가 체인으로 연결되며, 뷰 구조와 접근성 구조를 분리해서 생각할 수 있습니다.

COMPARE_BLOCK:a11y_swiftui_modifiers

### accessibilityElement(children:) 세부 옵션

```swift
// .combine — 자식 요소들의 레이블을 하나로 합침
HStack {
    Image(systemName: "star.fill")
    Text("4.8")
    Text("(1,234)")
}
.accessibilityElement(children: .combine)
// VoiceOver: "별 이미지 4.8 1,234" (순서대로 자동 결합)

// .ignore — 자식 요소를 모두 무시, 직접 레이블 지정
HStack { ... }
.accessibilityElement(children: .ignore)
.accessibilityLabel("평점 4.8점, 리뷰 1,234개")
// VoiceOver: "평점 4.8점, 리뷰 1,234개" (정확한 표현으로 제어)

// .contain — 자식 요소 유지 (기본값)
VStack { ... }
.accessibilityElement(children: .contain)
```

### .accessibilityAdjustableAction — 슬라이더형 컨트롤

```swift
struct VolumeControl: View {
    @State private var volume: Double = 0.5

    var body: some View {
        Circle()
            .fill(Color.blue.opacity(volume))
            .accessibilityLabel("볼륨")
            .accessibilityValue("\(Int(volume * 100))%")
            .accessibilityAdjustableAction { direction in
                switch direction {
                case .increment:
                    volume = min(1.0, volume + 0.1)
                case .decrement:
                    volume = max(0.0, volume - 0.1)
                @unknown default:
                    break
                }
            }
            // .adjustable 트레이트가 자동으로 추가됨
    }
}
```

### iOS 17+ 신규 접근성 API

```swift
// .accessibilityZoomAction — 핀치 줌 대응
Image(systemName: "map")
    .accessibilityZoomAction { action in
        switch action.direction {
        case .zoomIn:  mapZoom += 1
        case .zoomOut: mapZoom -= 1
        @unknown default: break
        }
    }

// .accessibilityDirectTouch — 게임, 그림판 등 직접 터치 패스스루
Canvas { /* ... */ }
    .accessibilityDirectTouch(options: .silencesspeech)
    // VoiceOver 제스처 없이 직접 터치 이벤트 전달

// .accessibilityRepresentation — 완전히 다른 접근성 뷰 제공
CustomChart()
    .accessibilityRepresentation {
        // 차트 대신 테이블 형태로 데이터 노출
        Table(data) { row in
            TableColumn("날짜", value: \.date)
            TableColumn("값", value: \.value)
        }
    }
```

---

## 4. Dynamic Type

### Dynamic Type이란

Dynamic Type은 사용자가 시스템 설정에서 지정한 텍스트 크기 선호도를 앱이 자동으로 반영하는 시스템입니다. `Settings > Display & Brightness > Text Size`에서 7단계(xSmall~xxxLarge), `Settings > Accessibility > Larger Text`에서 5단계 추가(총 12단계)를 제공합니다.

| 텍스트 스타일 | xSmall | Default | AX5 (최대) |
|--------------|--------|---------|-----------|
| .largeTitle  | 31pt   | 34pt    | 56pt      |
| .title1      | 25pt   | 28pt    | 50pt      |
| .body        | 14pt   | 17pt    | 53pt      |
| .caption2    | 11pt   | 11pt    | 20pt      |

### UIKit에서 Dynamic Type 적용

COMPARE_BLOCK:a11y_dynamic_type

### 레이아웃이 Dynamic Type에서 깨지는 주요 원인

**고정 높이 제약**: 셀, 카드의 높이를 고정하면 큰 텍스트에서 잘립니다.

```swift
// ❌ 고정 높이
cell.heightAnchor.constraint(equalToConstant: 60).isActive = true

// ✅ 최소 높이 + 자동 확장
cell.heightAnchor.constraint(greaterThanOrEqualToConstant: 60).isActive = true
```

**numberOfLines = 1**: 한 줄로 제한하면 큰 텍스트에서 잘립니다.

```swift
// ❌ 한 줄 고정
label.numberOfLines = 1

// ✅ 줄 수 제한 없음 (Dynamic Type 대응)
label.numberOfLines = 0
label.lineBreakMode = .byWordWrapping
```

**이미지와 텍스트 나란히 배치**: 큰 텍스트에서 아이콘 + 텍스트가 가로로 넘칩니다.

```swift
// ✅ UIStackView: axis를 Dynamic Type 크기에 따라 전환
class AdaptiveStackView: UIStackView {
    override func traitCollectionDidChange(_ previousTraitCollection: UITraitCollection?) {
        super.traitCollectionDidChange(previousTraitCollection)
        updateAxis()
    }

    func updateAxis() {
        let category = traitCollection.preferredContentSizeCategory
        // AX 카테고리(accessibility*)에서는 세로 배치로 전환
        axis = category.isAccessibilityCategory ? .vertical : .horizontal
    }
}
```

### SwiftUI의 Dynamic Type 자동 대응

SwiftUI는 대부분 자동으로 처리합니다. 개발자가 주의해야 할 경우:

```swift
// 가로/세로 전환 패턴
struct AdaptiveLayout<Content: View>: View {
    @Environment(\.dynamicTypeSize) var dynamicTypeSize
    let content: () -> Content

    var body: some View {
        if dynamicTypeSize.isAccessibilitySize {
            // AX 크기(xL3~AX5): 세로 배치
            VStack(alignment: .leading) { content() }
        } else {
            // 일반 크기: 가로 배치
            HStack { content() }
        }
    }
}

// 사용
AdaptiveLayout {
    Image(systemName: "heart")
    Text("좋아요 1,234개")
}

// dynamicTypeSize 범위 제한 (외부 제약 있을 때)
Text("축약 표시")
    .dynamicTypeSize(.small ... .xxxLarge)  // AX 크기 제외
```

---

## 5. accessibilityElements 그룹핑

### 왜 그룹핑이 필요한가

하나의 UI 카드 안에 이미지, 제목, 설명, 가격, 버튼이 있다면, VoiceOver 사용자는 이 요소들을 하나씩 포커스해야 합니다. 그룹핑을 통해 전체 카드를 하나의 접근성 요소로 만들면 탐색 효율이 크게 개선됩니다.

COMPARE_BLOCK:a11y_element_grouping

### 그룹핑 원칙

**언제 그룹핑해야 하는가:**
- 여러 요소가 함께 하나의 의미를 구성할 때 (가격 = 정가 + 할인가 + 할인율)
- 카드/셀 단위로 탐색이 더 효율적일 때
- 자식 요소가 독립적으로 상호작용하지 않을 때

**언제 그룹핑하지 말아야 하는가:**
- 각 요소에 개별적인 커스텀 액션이 있을 때
- 사용자가 개별 요소에 포커스해야 하는 경우 (텍스트 선택, 개별 삭제 등)
- 그룹 레이블이 너무 길어져 읽기 피로감을 줄 때 (5초 이하 권장)

### UITableViewCell에서의 접근성 설계

```swift
class ArticleCell: UITableViewCell {

    // ──────────────────────────────────────────
    // 방법 1: shouldGroupAccessibilityChildren
    // ──────────────────────────────────────────
    override var shouldGroupAccessibilityChildren: Bool { true }

    override var accessibilityLabel: String? {
        get {
            guard let article = article else { return nil }
            // "기사 제목, 작성자, 3분 전" 형태로 조합
            return [article.title, article.author, article.timeAgo]
                .compactMap { $0 }
                .joined(separator: ", ")
        }
        set { super.accessibilityLabel = newValue }
    }

    // ──────────────────────────────────────────
    // 방법 2: accessibilityElements 배열로 커스텀 순서 + 포함/제외
    // ──────────────────────────────────────────
    override var accessibilityElements: [Any]? {
        get {
            // 장식 이미지 제외, 상호작용 가능한 요소 포함
            return [thumbnailImageView, titleLabel, authorLabel, bookmarkButton]
            // decorativeBadgeView는 포함하지 않음
        }
        set { super.accessibilityElements = newValue }
    }
}
```

---

## 6. UIAccessibility Notifications

### 화면 변경을 VoiceOver에 알리기

iOS 앱은 화면이 동적으로 변할 때 VoiceOver에 명시적으로 알려야 합니다. 알림 없이 화면이 바뀌면 VoiceOver 사용자는 무슨 일이 일어났는지 알지 못합니다.

COMPARE_BLOCK:a11y_notifications

### 알림 타입별 사용 가이드

| 알림 타입 | 언제 사용 | argument 타입 |
|-----------|----------|--------------|
| `.screenChanged` | 새 화면/뷰 컨트롤러 표시 | UIView (포커스 이동 목적지) |
| `.layoutChanged` | 현재 화면 일부 변경 | UIView 또는 nil |
| `.announcement` | 텍스트 메시지 공지 | String 또는 NSAttributedString |
| `.pageScrolled` | 스크롤 위치 알림 | String ("3/5 페이지") |

### 실무 패턴: 모달/시트 표시 시 포커스 이동

```swift
class SearchViewController: UIViewController {

    func showSearchResults() {
        resultsView.isHidden = false

        // 결과 뷰가 나타났음을 알리고 포커스를 첫 번째 결과로 이동
        UIAccessibility.post(
            notification: .screenChanged,
            argument: resultsView.firstResultLabel  // 이 요소로 VoiceOver 포커스 이동
        )
    }

    func showError(_ message: String) {
        // 에러는 공지 형태로 읽어주되, 포커스는 이동하지 않음
        UIAccessibility.post(
            notification: .announcement,
            argument: "오류: \(message)"
        )
    }
}
```

### 실무 패턴: 모달 닫힘 후 포커스 복원

```swift
class ModalViewController: UIViewController {
    weak var triggerElement: UIView?  // 모달을 열었던 버튼

    func dismiss() {
        dismiss(animated: true) {
            // 모달이 닫히면 원래 버튼으로 포커스 복원
            if let trigger = self.triggerElement {
                UIAccessibility.post(
                    notification: .screenChanged,
                    argument: trigger
                )
            }
        }
    }
}
```

---

## 7. Accessibility Inspector 활용

### Accessibility Inspector란

Xcode에 내장된 접근성 검증 도구입니다. 시뮬레이터 또는 실제 기기에서 앱의 접근성 트리를 시각적으로 확인하고, 문제를 자동으로 감지합니다.

**실행 방법**: `Xcode > Open Developer Tool > Accessibility Inspector`

### 주요 기능

**Inspection 모드**:
- 요소의 accessibilityLabel, Value, Hint, Traits 확인
- 접근성 트리 구조 탐색
- 포커스 순서 시각화

**Audit 모드**:
- 자동 접근성 감사 실행
- 경고 항목 목록화 (레이블 누락, 대비율 부족, 히트 타깃 크기 등)

**Settings 패널**:
- 실시간 접근성 설정 시뮬레이션
  - Increase Contrast 켜기/끄기
  - Reduce Motion 켜기/끄기
  - Dynamic Type 크기 조절
  - 색맹 필터 적용

### Accessibility Inspector 사용 워크플로

```
1. 시뮬레이터에서 앱 실행
2. Accessibility Inspector 열기 (⌃F7 단축키)
3. Audit 탭 → "Run Audit" 클릭
4. 경고 항목 확인 및 수정
5. Inspection 탭에서 각 요소 수동 확인
6. Settings에서 Reduce Motion, Increase Contrast 등 토글 후 UI 확인
```

### 자주 발견되는 Audit 경고 항목

| 경고 | 원인 | 해결책 |
|------|------|--------|
| Missing label | accessibilityLabel 없음 | 레이블 추가 |
| Hit target too small | 터치 영역 < 44×44pt | 최소 44pt 보장 |
| Contrast ratio insufficient | 전경/배경 대비 < 4.5:1 | 색상 조정 |
| Element not accessible | isAccessibilityElement = false | 필요한 경우 true로 설정 |
| Clipped text | numberOfLines 제한 + 큰 텍스트 | numberOfLines = 0 |

### 실기기에서의 VoiceOver 테스트

Accessibility Inspector만으로는 부족합니다. 실제 기기에서 VoiceOver를 켜고 직접 테스트해야 합니다.

```
VoiceOver 빠른 켜기/끄기:
  - 홈 버튼 3번 클릭 (구형)
  - 사이드 버튼 3번 클릭 (FaceID 기기)
  - Settings > Accessibility > Accessibility Shortcut에서 VoiceOver 등록

기본 제스처:
  - 한 손가락 스와이프 →/← : 다음/이전 요소
  - 한 손가락 더블 탭       : 활성화 (탭)
  - 두 손가락 회전          : 로터 선택
  - 두 손가락 스와이프 위   : 처음부터 읽기
  - 세 손가락 스와이프 →    : 다음 페이지
  - 두 손가락 탭            : 일시정지/재생
```

---

## 8. 색상 대비와 시각적 접근성

### WCAG 대비율 기준

WCAG(Web Content Accessibility Guidelines) 2.1 기준은 iOS 앱에서도 사실상 표준으로 쓰입니다.

| 레벨 | 일반 텍스트 | 큰 텍스트(18pt+ 또는 14pt Bold+) | UI 컴포넌트/그래픽 |
|------|------------|----------------------------------|-------------------|
| AA   | 4.5:1      | 3:1                              | 3:1               |
| AAA  | 7:1        | 4.5:1                            | 해당 없음          |

### iOS 색상 설계 실무

COMPARE_BLOCK:a11y_color_contrast

### 색맹 사용자 고려

**색상만으로 정보를 전달하지 말 것.** 성공/실패를 초록/빨강으로만 구분하면 색맹 사용자는 구분 불가합니다.

```swift
// ❌ 색상만으로 상태 구분
statusView.backgroundColor = isSuccess ? .systemGreen : .systemRed

// ✅ 색상 + 아이콘 + 텍스트 병행
statusView.backgroundColor = isSuccess ? .systemGreen : .systemRed
statusIconView.image = UIImage(systemName: isSuccess ? "checkmark.circle" : "xmark.circle")
statusLabel.text = isSuccess ? "완료" : "실패"

// SwiftUI: differentiateWithoutColor 환경값 확인
struct StatusIndicator: View {
    let isSuccess: Bool
    @Environment(\.accessibilityDifferentiateWithoutColor) var differentiate

    var body: some View {
        HStack {
            if differentiate || true {  // 항상 아이콘 표시 (색상과 병행)
                Image(systemName: isSuccess ? "checkmark.circle.fill" : "xmark.circle.fill")
            }
            Circle()
                .fill(isSuccess ? Color.green : Color.red)
                .frame(width: 12, height: 12)
        }
    }
}
```

### 시스템 색상 사용의 이점

`UIColor.label`, `UIColor.secondaryLabel`, `UIColor.systemBackground` 등 시스템 시맨틱 색상을 사용하면 다크 모드와 Increase Contrast 설정에 자동으로 대응합니다.

```swift
// ❌ 하드코딩된 색상
label.textColor = UIColor(red: 0.2, green: 0.2, blue: 0.2, alpha: 1)

// ✅ 시스템 시맨틱 색상 — 다크 모드 + Increase Contrast 자동 대응
label.textColor = .label               // 기본 텍스트
subtitle.textColor = .secondaryLabel  // 보조 텍스트
view.backgroundColor = .systemBackground
separator.backgroundColor = .separator
```

---

## 9. Reduce Motion

### 모션 감소가 중요한 이유

전정 장애(Vestibular disorders), 편두통, ADHD 등을 가진 사용자는 큰 모션 애니메이션에서 어지러움이나 불편함을 느낄 수 있습니다. iOS의 Reduce Motion 설정을 존중하는 것은 이들을 위한 필수 배려입니다.

COMPARE_BLOCK:a11y_reduce_motion

### 애니메이션 분류별 Reduce Motion 대응 전략

| 애니메이션 유형 | Reduce Motion OFF | Reduce Motion ON |
|----------------|-------------------|------------------|
| 화면 전환 | 슬라이드/큐브 | 페이드 |
| 요소 등장 | 슬라이드 인/스케일 업 | 페이드 인 (짧게) |
| 스크롤 | 관성 스크롤 | 동일 (스크롤은 사용자 제어이므로 유지) |
| 배경 패럴랙스 | 이동 효과 | 고정 |
| 로딩 인디케이터 | 회전 스피너 | 정적 아이콘 또는 텍스트 |
| 성공/에러 피드백 | 바운스 애니메이션 | 즉각적 상태 변경 |

### Reduce Motion을 고려한 UIKit 커스텀 전환

```swift
class AccessibleTransitionAnimator: NSObject, UIViewControllerAnimatedTransitioning {
    let duration: TimeInterval = UIAccessibility.isReduceMotionEnabled ? 0.15 : 0.35

    func transitionDuration(using context: UIViewControllerContextTransitioning?) -> TimeInterval {
        duration
    }

    func animateTransition(using context: UIViewControllerContextTransitioning) {
        guard let toVC = context.viewController(forKey: .to) else { return }

        context.containerView.addSubview(toVC.view)

        if UIAccessibility.isReduceMotionEnabled {
            // Reduce Motion: 페이드만
            toVC.view.alpha = 0
            UIView.animate(withDuration: duration) {
                toVC.view.alpha = 1
            } completion: { _ in
                context.completeTransition(true)
            }
        } else {
            // 일반: 슬라이드 인
            toVC.view.transform = CGAffineTransform(translationX: toVC.view.bounds.width, y: 0)
            UIView.animate(
                withDuration: duration,
                delay: 0,
                usingSpringWithDamping: 0.9,
                initialSpringVelocity: 0.3
            ) {
                toVC.view.transform = .identity
            } completion: { _ in
                context.completeTransition(true)
            }
        }
    }
}
```

---

## 10. accessibilityCustomActions

### 커스텀 액션의 역할

VoiceOver에서 스와이프 제스처(삭제, 공유 등)는 일반 사용자에게는 직관적이지만, VoiceOver 사용자에게는 발견하기 어렵습니다. `UIAccessibilityCustomAction`을 통해 VoiceOver 로터에 액션을 등록하면, 사용자가 로터에서 "액션"을 선택한 뒤 스와이프 업/다운으로 접근할 수 있습니다.

COMPARE_BLOCK:a11y_custom_action

### 커스텀 액션 설계 원칙

**액션 이름**: 명확한 동사형으로 (예: "답장", "삭제", "즐겨찾기에 추가")

**액션 순서**: 가장 자주 쓰는 액션을 앞에

```swift
override var accessibilityCustomActions: [UIAccessibilityCustomAction]? {
    get {
        return [
            // 주요 액션 먼저
            UIAccessibilityCustomAction(name: "답장", ...),
            UIAccessibilityCustomAction(name: "전달", ...),
            // 파괴적 액션은 마지막
            UIAccessibilityCustomAction(name: "삭제", ...),
        ]
    }
    set { super.accessibilityCustomActions = newValue }
}
```

**피드백 제공**: 액션 실행 후 결과를 VoiceOver로 알림

```swift
UIAccessibilityCustomAction(name: "즐겨찾기에 추가") { [weak self] _ in
    self?.item.toggleFavorite()
    let message = self?.item.isFavorite == true
        ? "즐겨찾기에 추가되었습니다"
        : "즐겨찾기에서 제거되었습니다"
    UIAccessibility.post(notification: .announcement, argument: message)
    return true
}
```

---

## 11. 포커스 관리 심화

### 키보드/스위치 제어에서의 포커스 순서

VoiceOver는 기본적으로 시각적 배치 순서(왼쪽→오른쪽, 위→아래)로 포커스를 이동합니다. 복잡한 레이아웃에서는 이 순서가 논리적 순서와 다를 수 있습니다.

```swift
// UIKit: accessibilityElements로 순서 명시
class DashboardViewController: UIViewController {

    override var accessibilityElements: [Any]? {
        get {
            // 시각적 배치와 무관하게 논리적 순서 정의
            return [
                headerView,
                searchBar,
                filterSegmentedControl,
                tableView,
                floatingActionButton,  // 화면 우하단이지만 마지막에 탐색
            ]
        }
        set { super.accessibilityElements = newValue }
    }
}

// SwiftUI: .accessibilitySortPriority
// 높은 숫자가 먼저 포커스됨
struct Dashboard: View {
    var body: some View {
        ZStack {
            ContentView()
                .accessibilitySortPriority(0)    // 나중에

            FloatingButton()
                .accessibilitySortPriority(-1)   // 가장 나중에 (낮은 우선순위)

            SearchBar()
                .accessibilitySortPriority(1)    // 먼저
        }
    }
}
```

### @AccessibilityFocusState — SwiftUI 포커스 프로그래밍

```swift
struct FormView: View {
    @AccessibilityFocusState private var isErrorFocused: Bool
    @State private var errorMessage = ""

    var body: some View {
        VStack {
            TextField("이름", text: $name)
            TextField("이메일", text: $email)

            if !errorMessage.isEmpty {
                Text(errorMessage)
                    .foregroundStyle(.red)
                    .accessibilityFocused($isErrorFocused)  // 이 요소로 포커스 이동 가능
            }

            Button("저장") {
                if !validate() {
                    errorMessage = "이메일 형식이 올바르지 않습니다"
                    isErrorFocused = true  // 에러 메시지로 VoiceOver 포커스 이동
                }
            }
        }
    }
}
```

### 모달 표시 시 포커스 트랩

```swift
// 모달이 열리면 모달 내부로 포커스를 가두어야 합니다
// 기본 UIKit Modal은 자동으로 처리
// 커스텀 오버레이의 경우:

class CustomModalView: UIView {

    override func accessibilityPerformEscape() -> Bool {
        // 두 손가락 Z 제스처(escape) 처리 — 모달 닫기
        dismiss()
        return true
    }

    // 모달 외부 영역을 접근성 트리에서 숨기기
    func show() {
        // 배경 컨텐츠를 VoiceOver에서 숨김
        parentViewController?.view.accessibilityElementsHidden = true
        // 이 모달 뷰만 접근성 활성화
        isAccessibilityElement = false
        accessibilityElementsHidden = false

        UIAccessibility.post(notification: .screenChanged, argument: self)
    }

    func dismiss() {
        parentViewController?.view.accessibilityElementsHidden = false
        UIAccessibility.post(notification: .screenChanged, argument: triggerButton)
    }
}
```

---

## 12. 접근성 자동화 테스트

### XCTest에서 접근성 요소 검증

```swift
import XCTest

class AccessibilityTests: XCTestCase {

    var app: XCUIApplication!

    override func setUp() {
        app = XCUIApplication()
        app.launch()
    }

    // 접근성 레이블로 요소 찾기
    func testLoginButton() {
        let loginButton = app.buttons["로그인"]
        XCTAssertTrue(loginButton.exists, "로그인 버튼이 접근성 트리에 없습니다")
        XCTAssertTrue(loginButton.isEnabled, "로그인 버튼이 비활성화되어 있습니다")

        // 히트 타깃 크기 검증 (최소 44×44pt)
        let frame = loginButton.frame
        XCTAssertGreaterThanOrEqual(frame.width, 44, "버튼 너비가 44pt 미만입니다")
        XCTAssertGreaterThanOrEqual(frame.height, 44, "버튼 높이가 44pt 미만입니다")
    }

    // VoiceOver 시뮬레이션: 포커스 순서 검증
    func testFocusOrder() {
        // 접근성 요소 순서가 논리적인지 확인
        let elements = app.descendants(matching: .any)
            .allElementsBoundByAccessibilityElement

        // 첫 번째 요소가 헤더인지 확인
        XCTAssertEqual(elements.first?.label, "프로필 화면")
    }

    // 동적 텍스트 크기 변경 후 UI 확인
    func testDynamicTypeSupport() {
        // 가장 큰 AX 텍스트 크기 시뮬레이션
        app.launchArguments = ["-UIPreferredContentSizeCategoryName",
                               "UICTContentSizeCategoryAccessibilityXXXL"]
        app.launch()

        // 텍스트가 잘리지 않았는지 확인
        let titleLabel = app.staticTexts["기사 제목"]
        XCTAssertTrue(titleLabel.exists)
        // frame이 화면 경계 안에 있는지 확인
        XCTAssertTrue(app.windows.firstMatch.frame.contains(titleLabel.frame))
    }
}
```

### 접근성 감사 자동화 (iOS 17+)

```swift
// XCTest Accessibility Audits (iOS 17+)
func testAccessibilityAudit() throws {
    // 접근성 감사 실행 — 레이블 누락, 대비 부족, 히트 타깃 크기 등 자동 검사
    try app.performAccessibilityAudit()
}

// 특정 감사 항목만 실행
func testContrastAudit() throws {
    try app.performAccessibilityAudit(for: .contrast)
}

// 일부 경고 허용 (알려진 이슈)
func testAuditWithExclusions() throws {
    try app.performAccessibilityAudit { issue in
        // 특정 요소의 경고는 무시
        if issue.element?.label == "장식용 이미지" {
            return true  // true = 이 경고 무시
        }
        return false     // false = 이 경고로 테스트 실패
    }
}
```

---

## 13. 플랫폼별 접근성 비교 요약

| 항목 | iOS | Android | Web |
|------|-----|---------|-----|
| **스크린 리더** | VoiceOver | TalkBack | NVDA/JAWS/VoiceOver |
| **레이블 설정** | accessibilityLabel | contentDescription | aria-label / alt |
| **힌트** | accessibilityHint | tooltipText (API 28+) | aria-describedby |
| **상태값** | accessibilityValue | stateDescription | aria-valuenow |
| **역할/트레이트** | accessibilityTraits | AccessibilityRoleDescription | role |
| **그룹핑** | shouldGroupAccessibilityChildren / accessibilityElements | importantForAccessibility / mergeDescendants | role="group" / aria-labelledby |
| **화면 변경 알림** | UIAccessibility.post(.screenChanged) | announceForAccessibility | aria-live="assertive" |
| **공지 알림** | UIAccessibility.post(.announcement) | announceForAccessibility | aria-live="polite" |
| **커스텀 액션** | accessibilityCustomActions | customActions (semantics) | aria-haspopup / role="menu" |
| **텍스트 크기** | Dynamic Type (UIFont.preferredFont) | sp 단위 | rem/em |
| **고대비** | Increase Contrast | High Contrast Text | prefers-contrast |
| **모션 감소** | Reduce Motion | Animator Duration Scale | prefers-reduced-motion |
| **색맹 지원** | differentiateWithoutColor | 색상 반전 설정 | forced-colors |
| **개발 도구** | Accessibility Inspector | Layout Inspector / TalkBack 개발자 설정 | Chrome DevTools / axe |

### iOS 접근성 구현 체크리스트

#### VoiceOver 기본 대응
- [ ] 모든 상호작용 가능한 요소에 accessibilityLabel 설정
- [ ] 아이콘 전용 버튼에 명확한 레이블 설정
- [ ] accessibilityHint 추가 (선택사항이지만 권장)
- [ ] 올바른 accessibilityTraits 설정
- [ ] 장식용 이미지/뷰 숨김 (isAccessibilityElement = false)

#### 그룹핑 및 구조
- [ ] 관련 요소 그룹핑 (shouldGroupAccessibilityChildren 또는 accessibilityElements)
- [ ] 논리적 포커스 순서 보장
- [ ] 모달/팝업 포커스 트랩 구현
- [ ] 모달 닫힘 후 포커스 복원

#### Dynamic Type
- [ ] UIFont.preferredFont 사용 (고정 폰트 크기 지양)
- [ ] adjustsFontForContentSizeCategory = true
- [ ] numberOfLines = 0 (또는 필요에 따라 적절한 값)
- [ ] 고정 높이 제약 제거 (greaterThanOrEqualTo 사용)

#### 색상 및 시각
- [ ] WCAG AA 대비율 (4.5:1) 확보
- [ ] 색상만으로 정보 전달 금지 (아이콘/텍스트 병행)
- [ ] 시스템 시맨틱 색상 사용 (다크 모드 + Increase Contrast 자동 대응)
- [ ] differentiateWithoutColor 환경 고려

#### 모션
- [ ] UIAccessibility.isReduceMotionEnabled 확인
- [ ] 큰 모션 애니메이션 → 페이드로 대체
- [ ] SwiftUI: @Environment(\.accessibilityReduceMotion) 활용

#### 알림 및 공지
- [ ] 화면 전환 시 UIAccessibility.post(.screenChanged) 호출
- [ ] 중요 상태 변경 시 .announcement 호출
- [ ] 공지 우선순위 적절히 설정 (일반: .announcement / 긴급: AttributedString + .high)

#### 커스텀 액션
- [ ] 스와이프 제스처에 accessibilityCustomActions 등록
- [ ] 액션 실행 후 결과 공지
- [ ] 파괴적 액션(삭제)은 마지막에 배치

#### 테스트
- [ ] Accessibility Inspector Audit 실행 및 경고 수정
- [ ] 실기기에서 VoiceOver 직접 테스트
- [ ] Dynamic Type XL/AX 크기에서 레이아웃 확인
- [ ] Increase Contrast, Reduce Motion 설정 시 UI 확인
- [ ] XCTest 접근성 자동화 테스트 작성

---

## 14. 실무 안티패턴

### 자주 발생하는 접근성 실수

```swift
// ❌ 1. label에 트레이트 중복 포함
button.accessibilityLabel = "제출 버튼"  // "버튼"은 VoiceOver가 트레이트에서 자동으로 읽음
// ✅ 수정
button.accessibilityLabel = "제출"  // 트레이트 없이 간결하게

// ❌ 2. 긴 레이블 (5초 이상 읽히는 레이블)
cell.accessibilityLabel = """
    2024년 3월 15일 오후 2시 30분에 홍길동님이 작성한 댓글입니다.
    내용은 다음과 같습니다: 안녕하세요 좋은 글 감사합니다...
"""
// ✅ 핵심 정보만
cell.accessibilityLabel = "홍길동 댓글, 2시간 전"

// ❌ 3. 화면 변경 알림 누락
func showResults() {
    resultsView.isHidden = false
    // VoiceOver 사용자는 결과가 나타났는지 모름!
}
// ✅ 알림 추가
func showResults() {
    resultsView.isHidden = false
    UIAccessibility.post(notification: .screenChanged, argument: resultsView)
}

// ❌ 4. 커스텀 컨트롤에 트레이트 미설정
class StarRatingView: UIView {
    // VoiceOver: "별점 뷰" — 슬라이더인지 버튼인지 알 수 없음
}
// ✅ 트레이트와 액션 설정
class StarRatingView: UIView {
    override init(frame: CGRect) {
        super.init(frame: frame)
        isAccessibilityElement = true
        accessibilityTraits = .adjustable  // 스와이프 업/다운으로 조절
        accessibilityLabel = "평점"
    }
    override func accessibilityIncrement() {
        rating = min(5, rating + 1)
        accessibilityValue = "\(rating)점"
    }
    override func accessibilityDecrement() {
        rating = max(1, rating - 1)
        accessibilityValue = "\(rating)점"
    }
}

// ❌ 5. 에러 메시지를 VoiceOver에 알리지 않음
func showError(_ text: String) {
    errorLabel.text = text
    errorLabel.isHidden = false
    // VoiceOver 사용자는 에러가 나타났는지 모름!
}
// ✅ 에러 공지
func showError(_ text: String) {
    errorLabel.text = text
    errorLabel.isHidden = false
    UIAccessibility.post(notification: .layoutChanged, argument: errorLabel)
    // 또는 announcement 사용
    // UIAccessibility.post(notification: .announcement, argument: "오류: \(text)")
}
```

> 💡 **Android 개발자라면**: iOS의 `accessibilityLabel`과 Android의 `contentDescription`은 개념적으로 동일합니다. 다만 iOS는 `accessibilityTraits`로 역할을 별도 관리하는 반면, Android는 `AccessibilityNodeInfo.roleDescription`이나 `contentDescription`에 역할을 포함하는 경우가 많습니다.

> 💡 **웹 개발자라면**: ARIA의 `aria-live="polite"`는 iOS의 `UIAccessibility.post(notification: .announcement, argument:)`에 대응합니다. 웹에서 DOM 변경을 live region이 자동 감지하는 것과 달리, iOS에서는 개발자가 명시적으로 `post`를 호출해야 합니다.

> 💡 **최종 조언**: 접근성 구현의 가장 큰 장벽은 기술이 아니라 인식입니다. 팀 내 접근성 검토를 개발 프로세스에 포함하고(정의 완료 조건에 접근성 체크리스트 추가), VoiceOver 사용자와 함께 사용성 테스트를 진행하세요. Apple의 Human Interface Guidelines - Accessibility 섹션과 WWDC 접근성 세션은 매년 업데이트되므로 정기적으로 확인하는 것을 권장합니다.
