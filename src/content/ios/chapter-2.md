# Chapter 2. UI 만들기 — SwiftUI

SwiftUI는 Apple이 2019년 WWDC에서 발표한 선언형 UI 프레임워크입니다. iOS, macOS, watchOS, tvOS, visionOS 전체를 단일 코드베이스로 커버할 수 있으며, UIKit 대비 코드량이 크게 줄고 실시간 프리뷰(#Preview)를 통해 개발 속도가 비약적으로 향상됩니다. 이 챕터에서는 SwiftUI의 핵심 철학부터 시작해, 실전에서 가장 많이 쓰는 컴포넌트와 패턴을 안드로이드·웹 개발자 관점에서 비교하며 살펴봅니다.

---

## 1. 선언형 UI 패러다임

### 명령형(Imperative) vs 선언형(Declarative)

iOS 개발의 전통 방식인 UIKit은 **명령형(imperative)** 패러다임을 따랐습니다. 개발자가 "버튼 객체를 만들고 → 텍스트를 설정하고 → 색상을 입히고 → 화면에 addSubview로 추가하고 → 오토레이아웃 제약을 코드로 걸어라"처럼 UI를 **어떻게(how)** 만들지 절차를 하나씩 기술해야 했습니다. 상태가 바뀌면 `label.text = "새로운 값"` 처럼 해당 요소를 직접 찾아가서 업데이트해야 했고, 복잡한 화면에서는 상태 불일치 버그가 잦았습니다.

SwiftUI는 **선언형(declarative)** 방식으로 전환합니다. "현재 상태(State)가 이러이러할 때 UI는 이렇게 생겨야 한다"는 **무엇(what)** 만 선언하면, 프레임워크가 변경 사항을 감지해 필요한 부분만 다시 그립니다. 개발자는 상태를 변경하는 것에만 집중하면 됩니다.

```swift
// UIKit (명령형) — 상태 변경마다 직접 업데이트
var count = 0
let label = UILabel()

func increment() {
    count += 1
    label.text = "\(count)"         // 직접 찾아서 업데이트
    label.textColor = count >= 0 ? .blue : .red  // 조건마다 수동 처리
}

// SwiftUI (선언형) — 상태만 바꾸면 UI가 자동으로 따라온다
@State private var count = 0

var body: some View {
    Text("\(count)")
        .foregroundStyle(count >= 0 ? .blue : .red)  // 상태 기반 선언

    Button("+") { count += 1 }  // 상태만 변경
}
```

> 💡 **웹 개발자라면**: React의 철학과 완전히 동일합니다. `useState`로 상태를 선언하고, JSX에서 상태에 따라 UI를 기술하면 React가 DOM을 업데이트하듯, SwiftUI도 `@State`가 바뀌면 `body`를 다시 평가해 화면을 갱신합니다. "상태 → UI" 단방향 데이터 흐름도 같습니다.

> 💡 **Android 개발자라면**: Jetpack Compose와 거의 동일한 패러다임입니다. `@Composable` ↔ `View 프로토콜`, `remember { mutableStateOf() }` ↔ `@State`, `Column/Row/Box` ↔ `VStack/HStack/ZStack` 으로 1:1 매핑됩니다. SwiftUI(2019)가 Compose(2021)보다 2년 먼저 출시됐고, 두 프레임워크는 서로 영향을 주고받았습니다.

### View 프로토콜과 body

SwiftUI에서 모든 화면 요소는 `View` 프로토콜을 채택한 구조체(struct)입니다. 필수 요구사항은 `body` 프로퍼티 하나뿐입니다.

```swift
struct HelloView: View {
    var body: some View {       // some View = 불투명 반환 타입(Opaque Type)
        Text("Hello, SwiftUI!")
    }
}
```

`some View`는 Swift 5.1에서 도입된 불투명 반환 타입입니다. 컴파일러가 실제 반환 타입을 알지만 외부에 숨기는 방식으로, 복잡한 제네릭 타입을 직접 쓰지 않아도 됩니다. `body`는 **단 하나의 최상위 View**만 반환할 수 있으며, 여러 뷰를 반환하려면 `VStack`, `HStack`, `Group` 등으로 묶어야 합니다.

`@ViewBuilder`는 이 제약을 완화해주는 속성 래퍼로, if/else 분기나 여러 뷰를 나란히 나열하는 것을 가능하게 합니다. SwiftUI의 `body`에는 기본적으로 `@ViewBuilder`가 암묵적으로 적용됩니다.

---

## 2. 기본 뷰 컴포넌트

### 2-1. Text — 텍스트 표시

가장 기본적인 뷰인 `Text`부터 시작합니다. SwiftUI에서 스타일은 모두 **modifier 체인**으로 적용합니다. CSS처럼 클래스를 붙이는 것과 비슷하지만, **modifier의 순서가 결과에 영향**을 미친다는 점이 중요합니다.

COMPARE_BLOCK:ui_text

```swift
// modifier 순서 차이 예시
Text("안녕하세요")
    .padding()
    .background(.yellow)   // padding을 포함한 영역에 배경 적용

Text("안녕하세요")
    .background(.yellow)   // 텍스트 영역에만 배경 적용
    .padding()             // 그 다음 padding
```

`Text`는 `String` 외에도 `Date`, `AttributedString`, `LocalizedStringKey` 등 다양한 타입을 받을 수 있습니다. 특히 `LocalizedStringKey` 타입을 이용하면 `Localizable.strings` 파일과 자동으로 연동돼 다국어 지원이 쉬워집니다.

```swift
// 날짜 자동 포맷
Text(Date(), style: .date)      // "2025년 6월 15일"
Text(Date(), style: .relative)  // "3분 전"
Text(Date(), style: .timer)     // "12:34" (카운트업)

// 마크다운 지원 (iOS 15+)
Text("**굵게**, *기울임*, ~~취소선~~, [링크](https://apple.com)")

// 여러 Text 이어 붙이기 (+ 연산자)
Text("이름: ")
    .foregroundStyle(.secondary) +
Text("홍길동")
    .fontWeight(.bold)
```

**Dynamic Type**: SwiftUI의 `.font(.title)` 같은 의미론적(semantic) 폰트 이름을 사용하면 사용자의 기기 접근성 설정(텍스트 크기)에 자동으로 반응합니다. 특별한 이유가 없다면 절댓값 폰트 크기보다 의미론적 폰트를 쓰는 것이 iOS 개발의 모범 사례입니다.

| Semantic Font | 대략적인 크기 | 용도 |
|---|---|---|
| `.largeTitle` | 34pt | 화면 타이틀 |
| `.title` | 28pt | 섹션 헤더 |
| `.title2` | 22pt | 서브 헤더 |
| `.headline` | 17pt Bold | 강조 |
| `.body` | 17pt | 기본 본문 |
| `.subheadline` | 15pt | 보조 설명 |
| `.caption` | 12pt | 캡션, 날짜 등 |

### 2-2. Button — 인터랙션

`Button`은 탭(클릭) 인터랙션을 처리하는 뷰입니다. SwiftUI의 버튼은 `label`에 **어떤 View든** 넣을 수 있어 매우 유연합니다.

COMPARE_BLOCK:ui_button

`ButtonStyle` 프로토콜을 구현하면 프로젝트 전체에서 재사용 가능한 버튼 스타일을 만들 수 있습니다. `configuration.isPressed`를 이용해 눌림 상태의 애니메이션도 직접 제어할 수 있습니다.

> 💡 **웹 개발자라면**: `ButtonStyle`은 styled-components나 CSS 모듈로 재사용 가능한 버튼 컴포넌트를 만드는 것과 같은 패턴입니다. `isPressed`는 CSS의 `:active` 가상 클래스에 해당합니다.

> 💡 **Android 개발자라면**: Compose의 `ButtonColors`, `ButtonElevation` 파라미터와 달리, SwiftUI는 `ButtonStyle` 프로토콜로 스타일 전체를 캡슐화합니다. Compose의 커스텀 `Indication`에 가까운 개념입니다.

### 2-3. Image — 이미지와 SF Symbols

SwiftUI에서 이미지는 세 가지 소스를 지원합니다: SF Symbols, 에셋 카탈로그, 원격 URL(AsyncImage).

```swift
// SF Symbols — Apple 제공 4,000개 이상의 벡터 아이콘
Image(systemName: "star.fill")
    .font(.largeTitle)          // 텍스트 크기에 연동 (자동 스케일링)
    .foregroundStyle(.yellow)
    .symbolEffect(.bounce)      // iOS 17+ 심볼 애니메이션

// SF Symbols multicolor 렌더링
Image(systemName: "wifi.exclamationmark")
    .symbolRenderingMode(.multicolor)
    .font(.title)

// 에셋 카탈로그 이미지
Image("profile_photo")
    .resizable()                // resizable 없으면 원본 크기 그대로
    .scaledToFill()             // 비율 유지, 프레임 꽉 채움 (크롭 발생)
    // .scaledToFit()           // 비율 유지, 프레임 안에 꼭 맞춤 (여백 발생)
    .frame(width: 100, height: 100)
    .clipShape(.circle)
```

> 💡 **웹/Android 개발자라면**: SF Symbols는 Font Awesome이나 Material Icons 같은 아이콘 시스템이지만, 시스템에 내장돼 있어 별도 라이브러리 설치가 필요 없습니다. 굵기·크기가 텍스트와 자동으로 맞춰지고, iOS 17부터는 심볼 애니메이션도 지원합니다. [SF Symbols 앱](https://developer.apple.com/sf-symbols/)에서 전체 목록을 검색할 수 있습니다.

**AsyncImage — 원격 이미지 비동기 로딩**

URL에서 이미지를 비동기로 불러오는 `AsyncImage`는 iOS 15부터 기본 제공됩니다. Glide/Coil(Android)이나 별도 fetch 로직(웹)을 대체합니다.

COMPARE_BLOCK:ui_asyncimage

> **주의사항**: `AsyncImage`는 캐싱 기능이 내장되어 있지 않아 같은 URL을 매번 다시 다운로드할 수 있습니다. 프로덕션 앱에서는 [Kingfisher](https://github.com/onevcat/Kingfisher), [Nuke](https://github.com/kean/Nuke) 등 서드파티 이미지 라이브러리를 사용하는 것이 일반적입니다.

---

## 3. 레이아웃 시스템

SwiftUI의 레이아웃은 `VStack`, `HStack`, `ZStack` 세 가지 기본 컨테이너와 `Spacer`, `Divider`, 그리고 그리드 레이아웃으로 구성됩니다. CSS Flexbox의 `flex-direction`이나 Android의 `LinearLayout`과 개념적으로 대응됩니다.

| SwiftUI | Android (Compose) | CSS / Web |
|---|---|---|
| `VStack` | `Column` | `flex-direction: column` |
| `HStack` | `Row` | `flex-direction: row` |
| `ZStack` | `Box` | `position: relative/absolute` |
| `Spacer()` | `Spacer(Modifier.weight(1f))` | `flex: 1` |
| `LazyVGrid` | `LazyVerticalGrid` | CSS Grid |
| `.frame(maxWidth: .infinity)` | `Modifier.fillMaxWidth()` | `width: 100%` |

COMPARE_BLOCK:ui_stack

### Spacer와 Divider

```swift
// Spacer — 가능한 모든 빈 공간을 채운다
HStack {
    Text("왼쪽")
    Spacer()               // 이 사이의 공간을 최대로 늘림
    Text("오른쪽")
}

// minLength로 최소 크기 보장
Spacer(minLength: 20)

// Divider — 구분선
VStack {
    Text("위 섹션")
    Divider()
    Text("아래 섹션")
}
```

### .frame() modifier

`.frame()`은 뷰의 크기를 지정하거나 제약을 주는 modifier입니다. CSS의 `width`, `height`, `min-width`, `max-width`와 대응됩니다.

```swift
// 고정 크기
Text("고정")
    .frame(width: 200, height: 50)

// 최소/최대 크기 (유연)
Text("유연")
    .frame(minWidth: 100, maxWidth: .infinity,  // .infinity = 가능한 최대
           minHeight: 44)

// 정렬 지정
Text("정렬")
    .frame(maxWidth: .infinity, alignment: .leading)  // 왼쪽 정렬
```

> 💡 **웹 개발자라면**: `.frame(maxWidth: .infinity)`는 `width: 100%`와 유사하지만, 정확히는 "부모가 제공하는 공간을 최대한 사용"하는 것입니다. CSS의 `flex: 1`과 더 가까운 개념입니다.

### LazyVGrid / LazyHGrid — 그리드 레이아웃

```swift
struct PhotoGridView: View {
    let photos: [Photo]

    // 3열 고정 그리드
    let threeColumns = [
        GridItem(.flexible()),
        GridItem(.flexible()),
        GridItem(.flexible()),
    ]

    // 최소 120pt 폭의 자동 적응형 그리드
    let adaptiveColumns = [
        GridItem(.adaptive(minimum: 120), spacing: 8)
    ]

    var body: some View {
        ScrollView {
            LazyVGrid(columns: adaptiveColumns, spacing: 8) {
                ForEach(photos) { photo in
                    AsyncImage(url: photo.url) { img in
                        img.resizable().scaledToFill()
                    } placeholder: {
                        Rectangle().fill(.gray.opacity(0.2))
                    }
                    .frame(height: 120)
                    .clipped()
                    .clipShape(.roundedRectangle(cornerRadius: 8))
                }
            }
            .padding(8)
        }
    }
}
```

`Lazy` prefix는 화면에 보이는 항목만 렌더링하는 지연(lazy) 로딩을 의미합니다. 수백 개의 항목이 있는 그리드에서는 반드시 `LazyVGrid`를 사용해야 성능 문제가 없습니다.

---

## 4. 상태 관리

SwiftUI의 상태 관리는 여러 속성 래퍼(Property Wrapper)로 나뉩니다. 이 챕터에서는 가장 기본인 `@State`와 `@Binding`을 다루고, 참조 타입 상태(`@StateObject`, `@ObservedObject`, `@EnvironmentObject`)는 5장에서 심화합니다.

### 4-1. @State — 로컬 상태

`@State`는 View가 **소유**하는 단순 로컬 상태입니다. 값이 변경될 때마다 해당 View와 하위 View들이 자동으로 다시 계산됩니다.

COMPARE_BLOCK:ui_state

**@State 사용 규칙:**

| 규칙 | 이유 |
|---|---|
| `private` 으로 선언 | 해당 View가 단독 소유 — 외부에서 직접 접근 못 하게 |
| 초깃값 설정 | SwiftUI가 처음 렌더링 시 사용 |
| 값 타입(struct, enum, Int, String 등)에 사용 | 참조 타입은 `@StateObject` 사용 |
| 하위 View에 공유 시 `@Binding` 사용 | 상태 소유권은 부모가 유지 |

> ⚠️ **주의**: `@State` 변수는 직접 할당(`count = 5`)으로 변경합니다. 뷰의 `init`에서 외부 값으로 초기화하려면 `_count = State(initialValue: initialCount)` 형식을 사용해야 합니다.

### 4-2. @Binding — 양방향 바인딩

`@Binding`은 **부모가 소유한 상태를 자식이 읽고 쓸 수 있게** 공유하는 참조입니다. 상태를 복사하지 않고 원본에 대한 참조를 전달하므로, 자식에서 값을 바꾸면 부모의 상태가 직접 변경됩니다.

COMPARE_BLOCK:ui_binding

`$` prefix는 `@State` 또는 `@Binding` 변수에서 `Binding<T>` 타입을 꺼내는 문법입니다. 예를 들어 `@State var text = ""` 에서 `$text`는 `Binding<String>` 타입이 됩니다.

```swift
// Preview에서 @Binding 테스트
#Preview {
    @Previewable @State var value = false
    ToggleRow(isOn: $value, label: "미리보기")
}
```

### 4-3. @StateObject / @ObservedObject — 간략 소개

복잡한 비즈니스 로직이나 비동기 처리(API 호출 등)는 `ObservableObject`를 채택한 클래스(ViewModel)에 분리하고, View에서 `@StateObject` / `@ObservedObject`로 연결합니다. 이 패턴은 **5장 — 네트워크 & 상태 관리**에서 심화합니다.

```swift
// 간략 예시 — 5장에서 자세히 다룹니다
class CounterViewModel: ObservableObject {
    @Published var count = 0    // @Published = 변경 시 View에 알림

    func increment() { count += 1 }
}

struct CounterView: View {
    @StateObject private var vm = CounterViewModel()

    var body: some View {
        VStack {
            Text("\(vm.count)")
            Button("+") { vm.increment() }
        }
    }
}
```

---

## 5. 리스트와 반복

### List와 ForEach

데이터 배열을 UI 목록으로 표시하는 것은 모바일 앱의 핵심 패턴입니다.

COMPARE_BLOCK:ui_list

`ForEach`와 `List`의 차이점을 정리하면 다음과 같습니다:

| | `ForEach` | `List` |
|---|---|---|
| 스크롤 | 자체 스크롤 없음 (ScrollView 필요) | 자체 스크롤 내장 |
| 셀 재사용 | 있음 (Lazy 컨테이너 안에서) | 항상 있음 (UITableView 기반) |
| swipeActions | 불가 | 가능 |
| Section | 불가 | 가능 |
| 용도 | 고정 목록, 수평 스크롤 | 긴 수직 목록 |

**Identifiable 프로토콜**: `ForEach`와 `List`에 배열을 전달할 때 각 항목을 고유하게 식별해야 애니메이션과 업데이트가 효율적으로 작동합니다. `Identifiable`을 채택하면 `id:` 파라미터 없이 바로 사용할 수 있습니다.

```swift
// Identifiable 없는 경우 — id 파라미터 명시 필요
ForEach(["사과", "배", "딸기"], id: \.self) { fruit in
    Text(fruit)
}

// Identifiable 채택한 경우 — id 파라미터 불필요
struct Fruit: Identifiable {
    let id = UUID()
    let name: String
}

ForEach(fruits) { fruit in    // 훨씬 깔끔!
    Text(fruit.name)
}
```

> 💡 **웹 개발자라면**: React의 `key` prop과 동일한 역할입니다. `id: \.self`는 값 자체를 키로 쓰는 것으로, `key={item}` 패턴과 같습니다.

> 💡 **Android 개발자라면**: Compose의 `LazyColumn` `items(key = { it.id })` 파라미터와 동일한 역할입니다.

---

## 6. TextField / SecureField — 텍스트 입력

COMPARE_BLOCK:ui_textfield

`@FocusState`는 iOS 15에서 추가된 포커스 제어 도구입니다. 단순 Boolean이나 enum을 사용해 여러 필드의 포커스 상태를 관리할 수 있습니다.

```swift
// 검색 바 예시
struct SearchBar: View {
    @Binding var searchText: String
    @FocusState private var isFocused: Bool

    var body: some View {
        HStack {
            Image(systemName: "magnifyingglass")
                .foregroundStyle(.secondary)

            TextField("검색", text: $searchText)
                .focused($isFocused)
                .submitLabel(.search)
                .onSubmit { performSearch() }

            if !searchText.isEmpty {
                Button {
                    searchText = ""
                } label: {
                    Image(systemName: "xmark.circle.fill")
                        .foregroundStyle(.secondary)
                }
            }
        }
        .padding(8)
        .background(.gray.opacity(0.1))
        .clipShape(.capsule)
        .onTapGesture { isFocused = true }
    }

    private func performSearch() { /* ... */ }
}
```

**키보드 타입 옵션:**

| `.keyboardType()` | 용도 |
|---|---|
| `.default` | 기본 키보드 |
| `.emailAddress` | 이메일 (`@` 키 강조) |
| `.numberPad` | 숫자만 |
| `.decimalPad` | 숫자 + 소수점 |
| `.phonePad` | 전화번호 |
| `.URL` | URL 입력 |

---

## 7. 조건부 렌더링

### if / else — ViewBuilder

COMPARE_BLOCK:ui_conditional

SwiftUI의 `body`는 `@ViewBuilder`로 마킹돼 있어 if/else, switch 등 제어 흐름 구문을 View 코드 안에서 직접 사용할 수 있습니다. 이것이 JSX와 가장 유사한 부분입니다.

```swift
// switch를 이용한 다중 조건 분기
enum ConnectionState { case connected, loading, error(String) }

struct StatusView: View {
    let state: ConnectionState

    var body: some View {
        switch state {
        case .connected:
            Label("연결됨", systemImage: "wifi")
                .foregroundStyle(.green)
        case .loading:
            ProgressView("연결 중...")
        case .error(let message):
            Label(message, systemImage: "wifi.slash")
                .foregroundStyle(.red)
        }
    }
}
```

> 💡 **웹 개발자라면**: React JSX에서 조건부 렌더링에 `&&`나 삼항 연산자를 많이 쓰는 이유는 JSX가 표현식(expression) 기반이라 if 문을 바로 쓸 수 없기 때문입니다. SwiftUI의 `@ViewBuilder`는 이 제약이 없어 `if`/`else`/`switch`를 직접 사용할 수 있습니다.

> 💡 **Android 개발자라면**: Compose의 `if` 분기와 완전히 동일합니다. Compose도 `@Composable` 블록 안에서 자유롭게 if/when을 사용합니다.

---

## 8. 애니메이션

SwiftUI의 애니메이션은 두 가지 방식으로 적용합니다.

### implicit animation — .animation() modifier

뷰에 `.animation()` modifier를 달면, 해당 modifier가 감지하는 값이 바뀔 때마다 자동으로 애니메이션이 적용됩니다.

```swift
struct AnimatedButton: View {
    @State private var isExpanded = false

    var body: some View {
        Circle()
            .fill(.blue)
            .frame(
                width: isExpanded ? 200 : 80,
                height: isExpanded ? 200 : 80
            )
            .animation(.spring(duration: 0.4, bounce: 0.5), value: isExpanded)
            .onTapGesture { isExpanded.toggle() }
    }
}
```

### explicit animation — withAnimation {}

여러 상태 변경을 동시에 애니메이션 적용하거나, 어떤 조건에서만 애니메이션을 걸고 싶을 때는 `withAnimation {}` 블록을 사용합니다.

```swift
Button("펼치기") {
    withAnimation(.easeInOut(duration: 0.3)) {
        isExpanded.toggle()   // 이 상태 변경이 애니메이션과 함께 적용
        headerOpacity = isExpanded ? 1.0 : 0.5  // 여러 변경 동시에
    }
}
```

**주요 애니메이션 타입:**

| 타입 | 특징 | 용도 |
|---|---|---|
| `.easeIn` | 처음 느리게, 끝에 빠르게 | 사라지는 요소 |
| `.easeOut` | 처음 빠르게, 끝에 느리게 | 나타나는 요소 |
| `.easeInOut` | 처음·끝 느리고 중간 빠름 | 일반적인 움직임 |
| `.spring()` | 탄성 있는 물리 기반 움직임 | 버튼, 카드 |
| `.linear` | 일정한 속도 | 회전, 반복 애니메이션 |

### transition — 뷰 등장/퇴장 애니메이션

`if`로 뷰가 나타나거나 사라질 때 전환 애니메이션을 적용합니다.

```swift
if showBanner {
    BannerView()
        .transition(.move(edge: .top).combined(with: .opacity))
}
```

---

## 9. 실전 예제 — Todo 리스트 앱

지금까지 배운 모든 것을 조합해 간단한 Todo 앱을 만들어봅니다. `@State`로 상태 관리, `List/ForEach`로 목록 표시, `TextField`로 입력 처리, 조건부 렌더링, 애니메이션까지 모두 활용합니다.

```swift
import SwiftUI

// MARK: - 모델
struct TodoItem: Identifiable {
    let id = UUID()
    var title: String
    var isCompleted: Bool = false
    let createdAt = Date()
}

// MARK: - 메인 뷰
struct TodoListView: View {
    @State private var items: [TodoItem] = [
        TodoItem(title: "SwiftUI 기초 학습"),
        TodoItem(title: "Todo 앱 만들기", isCompleted: true),
    ]
    @State private var newItemTitle = ""
    @State private var showCompleted = true
    @FocusState private var isInputFocused: Bool

    // 계산 프로퍼티로 필터링된 목록 제공
    var filteredItems: [TodoItem] {
        showCompleted ? items : items.filter { !$0.isCompleted }
    }

    var completedCount: Int {
        items.filter { $0.isCompleted }.count
    }

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                // 진행률 표시
                ProgressSection(
                    total: items.count,
                    completed: completedCount
                )
                .padding()

                // 할 일 목록
                List {
                    ForEach($items) { $item in
                        // Binding을 ForEach에서 직접 얻기
                        if showCompleted || !item.isCompleted {
                            TodoRowView(item: $item) {
                                deleteItem(item)
                            }
                        }
                    }
                    .onDelete(perform: deleteItems)
                }
                .listStyle(.plain)
                .animation(.default, value: items.map(\.isCompleted))

                // 새 할 일 입력 영역
                AddItemBar(
                    text: $newItemTitle,
                    isFocused: $isInputFocused,
                    onAdd: addItem
                )
            }
            .navigationTitle("할 일 목록")
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    Button {
                        withAnimation { showCompleted.toggle() }
                    } label: {
                        Label(
                            showCompleted ? "완료 숨기기" : "완료 보기",
                            systemImage: showCompleted ? "eye.slash" : "eye"
                        )
                    }
                }
                ToolbarItem(placement: .topBarTrailing) {
                    if !items.filter(\.isCompleted).isEmpty {
                        Button("완료 삭제", role: .destructive) {
                            withAnimation {
                                items.removeAll { $0.isCompleted }
                            }
                        }
                    }
                }
            }
        }
        .onTapGesture { isInputFocused = false }
    }

    private func addItem() {
        let trimmed = newItemTitle.trimmingCharacters(in: .whitespaces)
        guard !trimmed.isEmpty else { return }

        withAnimation(.spring(duration: 0.3)) {
            items.insert(TodoItem(title: trimmed), at: 0)
        }
        newItemTitle = ""
    }

    private func deleteItem(_ item: TodoItem) {
        withAnimation {
            items.removeAll { $0.id == item.id }
        }
    }

    private func deleteItems(at offsets: IndexSet) {
        withAnimation { items.remove(atOffsets: offsets) }
    }
}

// MARK: - 개별 행 뷰
struct TodoRowView: View {
    @Binding var item: TodoItem
    let onDelete: () -> Void

    var body: some View {
        HStack(spacing: 12) {
            // 완료 체크 버튼
            Button {
                withAnimation(.spring(duration: 0.2)) {
                    item.isCompleted.toggle()
                }
            } label: {
                Image(systemName: item.isCompleted
                      ? "checkmark.circle.fill"
                      : "circle")
                    .font(.title2)
                    .foregroundStyle(item.isCompleted ? .green : .gray.opacity(0.5))
                    .symbolEffect(.bounce, value: item.isCompleted)
            }
            .buttonStyle(.plain)

            // 할 일 제목
            Text(item.title)
                .strikethrough(item.isCompleted, color: .secondary)
                .foregroundStyle(item.isCompleted ? .secondary : .primary)
                .animation(.easeOut(duration: 0.2), value: item.isCompleted)

            Spacer()
        }
        .contentShape(.rect)     // 전체 행 탭 영역 확장
        .swipeActions(edge: .trailing, allowsFullSwipe: true) {
            Button(role: .destructive, action: onDelete) {
                Label("삭제", systemImage: "trash")
            }
        }
    }
}

// MARK: - 진행률 섹션
struct ProgressSection: View {
    let total: Int
    let completed: Int

    var progress: Double {
        total == 0 ? 0 : Double(completed) / Double(total)
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Text("\(completed) / \(total) 완료")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                Spacer()
                Text("\(Int(progress * 100))%")
                    .font(.subheadline.bold())
                    .foregroundStyle(.blue)
            }
            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    Capsule()
                        .fill(.gray.opacity(0.15))
                    Capsule()
                        .fill(.blue.gradient)
                        .frame(width: geo.size.width * progress)
                        .animation(.spring(duration: 0.4), value: progress)
                }
            }
            .frame(height: 8)
        }
        .padding()
        .background(.background)
        .clipShape(.roundedRectangle(cornerRadius: 16))
        .shadow(color: .black.opacity(0.06), radius: 6, y: 3)
    }
}

// MARK: - 입력 바
struct AddItemBar: View {
    @Binding var text: String
    var isFocused: FocusState<Bool>.Binding
    let onAdd: () -> Void

    var body: some View {
        HStack(spacing: 12) {
            TextField("새 할 일 입력...", text: $text)
                .padding(12)
                .background(.gray.opacity(0.1))
                .clipShape(.capsule)
                .focused(isFocused)
                .submitLabel(.done)
                .onSubmit(onAdd)

            Button(action: onAdd) {
                Image(systemName: "plus.circle.fill")
                    .font(.system(size: 36))
                    .foregroundStyle(text.isEmpty ? .gray : .blue)
            }
            .disabled(text.trimmingCharacters(in: .whitespaces).isEmpty)
        }
        .padding(.horizontal)
        .padding(.vertical, 12)
        .background(.regularMaterial)  // 블러 배경
    }
}

// MARK: - Preview
#Preview {
    TodoListView()
}
```

이 예제에서 배울 수 있는 핵심 패턴을 정리하면:

1. **`@State`와 계산 프로퍼티**: `items` 배열을 상태로 갖고, `filteredItems`, `completedCount`는 계산 프로퍼티로 파생합니다. 상태를 최소화하고 파생값은 계산으로 처리하는 것이 SwiftUI의 모범 사례입니다.
2. **`ForEach($items)` — Binding 배열**: `$items`로 `ForEach`에 전달하면 각 요소도 `@Binding`으로 받을 수 있어 자식 뷰에서 항목을 직접 수정할 수 있습니다.
3. **`withAnimation`**: 리스트 추가/삭제 같이 여러 뷰에 영향을 주는 상태 변경에 `withAnimation`을 쓰면 부드러운 전환 효과를 줄 수 있습니다.
4. **컴포넌트 분리**: `TodoRowView`, `ProgressSection`, `AddItemBar`를 별도 구조체로 분리해 `body`가 단순하고 재사용 가능한 구조를 유지합니다.
5. **`contentShape(.rect)`**: 기본적으로 탭 영역은 뷰의 실제 콘텐츠 영역만입니다. `.contentShape(.rect)`를 추가하면 투명한 Spacer 부분도 탭 영역에 포함됩니다.

---

## 10. 요약 및 다음 단계

이 챕터에서 배운 SwiftUI 핵심을 정리합니다.

| 개념 | 속성 래퍼/API | 역할 |
|---|---|---|
| 로컬 상태 | `@State` | View 내부에서만 사용하는 단순 값 |
| 양방향 바인딩 | `@Binding` | 부모의 상태를 자식이 읽고 쓰기 |
| 세로 배치 | `VStack` | 자식을 세로로 쌓기 |
| 가로 배치 | `HStack` | 자식을 가로로 나열 |
| 겹치기 | `ZStack` | 자식을 Z축으로 겹치기 |
| 목록 | `List` / `ForEach` | 데이터 배열을 반복 렌더링 |
| 텍스트 입력 | `TextField` / `SecureField` | 사용자 입력 |
| 포커스 제어 | `@FocusState` | 키보드 포커스 프로그래밍 제어 |
| 원격 이미지 | `AsyncImage` | URL에서 이미지 비동기 로딩 |
| 애니메이션 | `.animation()` / `withAnimation` | 상태 변화에 애니메이션 적용 |

**다음 챕터 미리보기**: Chapter 3에서는 여러 화면을 연결하는 **네비게이션**을 다룹니다. `NavigationStack`, `TabView`, `Sheet`, `FullScreenCover` 등 iOS 앱의 화면 전환 패턴 전체를 살펴봅니다.
