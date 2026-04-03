# Chapter 6. 배포 — App Store 출시

앱을 완성했다고 끝이 아닙니다. iOS 앱을 실제 사용자에게 전달하려면 Apple의 심사 프로세스를 통과해야 하고, 코드 서명부터 App Store Connect 메타데이터 작성까지 다양한 준비가 필요합니다. 이 챕터에서는 App Store 배포의 전체 흐름을 처음부터 끝까지 살펴봅니다.

---

## 1. App Store vs Play Store vs 웹 배포 — 철학 차이

### Apple의 심사(Review) 문화

Apple은 App Store를 "세계에서 가장 안전하고 신뢰할 수 있는 앱 마켓플레이스"로 포지셔닝합니다. 이를 위해 모든 앱은 출시 전에 Apple 직원이 직접 검토하는 **사전 심사(pre-review)** 를 거칩니다. 심사 기간은 평균 1~3일이지만, 주요 명절이나 WWDC 시즌에는 더 길어질 수 있습니다. 2023년 기준으로 제출된 앱의 약 17%가 첫 심사에서 거절됩니다.

이 문화는 "통제를 통한 품질 보장"이라는 철학에서 비롯됩니다. Apple은 악성 코드, 사기성 앱, 개인정보 침해 앱이 사용자 기기에 설치되는 것을 막기 위해 이 장벽을 유지합니다. 개발자 입장에서는 불편하지만, 사용자 입장에서는 신뢰도를 높이는 요소입니다.

> 💡 **Android 개발자라면**: Google Play Store도 심사가 있지만 **사후 조치** 중심입니다. 앱을 제출하면 대부분 몇 시간 내에 배포되고, 문제가 발견되면 그 이후에 제거됩니다. iOS는 반대로 문제가 없다는 것을 먼저 확인한 후에 배포합니다. 이 때문에 iOS 배포는 일정 계획에 여유를 두어야 합니다.

> 💡 **웹 개발자라면**: 웹은 `git push` → CI 빌드 → 서버 배포로 몇 분 안에 전세계 사용자에게 변경사항이 반영됩니다. iOS는 심사 기간 때문에 이런 즉각 배포가 불가능합니다. 긴급 버그픽스도 최소 하루는 기다려야 하므로, 출시 전 품질 관리가 훨씬 더 중요합니다.

### 플랫폼별 배포 철학 비교

| 항목 | iOS App Store | Android Play Store | 웹 (Vercel/AWS 등) |
|------|-------------|-------------------|-------------------|
| 심사 방식 | 사전 심사 (Pre-review) | 사전 심사 + 사후 조치 | 없음 |
| 배포 소요 시간 | 평균 1~3일 | 수 시간 ~ 1일 | 수 초 ~ 수 분 |
| 거절 가능 여부 | 있음 (약 17%) | 있음 (낮은 비율) | 없음 |
| 긴급 패치 | 재심사 필요 | 재심사 필요 (더 빠름) | 즉시 가능 |
| 사이드로딩 | EU 제한적 허용 | 기본 허용 | 해당 없음 |
| 수수료 | 30% (소규모 15%) | 30% (소규모 15%) | 없음 |

### 긴급 버그픽스 전략

iOS에서 치명적인 버그가 발견되면 일반적인 업데이트 흐름으로는 최소 하루가 필요합니다. 이에 대응하는 전략들이 있습니다.

**1. 서버 사이드 피처 플래그 (Feature Flag)**: 문제가 있는 기능을 서버에서 끄고 켤 수 있도록 미리 설계합니다. 앱 코드를 바꾸지 않고도 동작을 변경할 수 있어 가장 강력한 방법입니다.

**2. 콘텐츠/설정값 서버 관리**: UI 텍스트, 가격, URL 등을 앱에 하드코딩하지 않고 API로 받아오면, 앱 업데이트 없이도 수정할 수 있습니다.

**3. Expedited Review 요청**: Apple은 심각한 버그(보안 취약점, 크래시 등)의 경우 빠른 심사를 요청할 수 있는 창구를 제공합니다. 보장은 없지만 24시간 내 처리되기도 합니다.

---

## 2. 코드 서명 (Code Signing) 이해

코드 서명은 iOS 개발자가 가장 많이 막히는 부분 중 하나입니다. 왜 이렇게 복잡한지 이해하면 오류를 해결하기 훨씬 쉬워집니다.

### 보안 모델이란?

iPhone은 "이 앱이 신뢰할 수 있는 개발자가 만든, 변조되지 않은 앱인가?"를 검증합니다. 이를 위해 Apple은 암호학적 서명 체계를 사용합니다.

- **Certificate (인증서)**: "나는 Apple이 인증한 개발자다"를 증명하는 문서입니다. Apple Developer Program에 등록하면 발급받을 수 있습니다. 개발용(Development)과 배포용(Distribution) 두 종류가 있습니다.
- **Provisioning Profile**: "이 Certificate로 서명한 앱이 어떤 기기에서, 어떤 기능(Push, HealthKit 등)을 사용할 수 있는가"를 기술한 파일입니다. Certificate, App ID(Bundle ID), 허용 기기 목록, 사용 가능한 Capabilities가 모두 담겨 있습니다.
- **Bundle ID**: 앱의 고유 식별자입니다. `com.mycompany.myapp` 형태의 역방향 도메인 표기를 사용합니다. 한 번 정하면 변경이 어렵습니다.

### 왜 이렇게 복잡한가?

Apple의 보안 모델은 다음 세 가지를 동시에 보장하려 합니다.

1. **개발자 신원 확인**: 악의적인 앱을 만든 사람을 추적할 수 있어야 합니다.
2. **앱 무결성 보장**: 앱 스토어에서 다운로드한 앱이 중간에 변조되지 않았음을 보장합니다.
3. **기능 접근 제어**: 모든 앱이 카메라, 위치, 연락처에 마음대로 접근하는 것을 막습니다.

이 세 가지를 위해 Certificate → Provisioning Profile → App 서명이라는 체인이 만들어진 것입니다.

> 💡 **Android 개발자라면**: Android도 코드 서명을 사용하지만 훨씬 단순합니다. `keytool`로 keystore 파일을 만들고 그것으로 APK/AAB에 서명하면 끝입니다. Apple처럼 별도의 Provisioning Profile이 필요하지 않고, Google이 개발자의 키를 중간에 관리하지 않습니다. (Google Play App Signing을 사용하면 Google이 관리하기도 합니다.)

> 💡 **웹 개발자라면**: HTTPS의 TLS 인증서와 개념이 비슷합니다. CA(인증기관, 여기서는 Apple)가 개발자를 인증하고, 그 인증서로 서명된 코드만 신뢰한다는 것입니다.

### Xcode Automatic Signing vs Manual Signing

Xcode는 서명을 자동으로 관리해주는 모드를 제공합니다.

**Automatic Signing** (권장 — 개인/소규모 팀):
- Xcode가 Certificate와 Provisioning Profile을 자동으로 생성하고 갱신합니다.
- Apple Developer 계정이 Xcode에 로그인되어 있어야 합니다.
- `Signing & Capabilities` 탭에서 `Automatically manage signing` 체크박스를 켜면 됩니다.

**Manual Signing** (대규모 팀, CI/CD 환경):
- Certificate와 Provisioning Profile을 Apple Developer Portal에서 직접 만들고 관리합니다.
- 팀원들이 같은 Certificate를 공유하거나, Match(Fastlane) 같은 도구로 동기화합니다.
- CI 서버에서 빌드할 때는 키체인에 Certificate를 수동으로 import해야 합니다.

### 흔한 오류 메시지와 해결법

| 오류 메시지 | 원인 | 해결법 |
|------------|------|--------|
| `No signing certificate found` | Development Certificate가 없거나 만료 | Xcode → Preferences → Accounts → Manage Certificates에서 재생성 |
| `Provisioning profile doesn't include the currently selected device` | 기기가 Provisioning Profile에 등록되지 않음 | Apple Developer Portal에서 기기 추가 후 Profile 재다운로드 |
| `The app ID cannot be registered to your development team` | Bundle ID가 이미 다른 계정에 등록됨 | 다른 Bundle ID 사용 |
| `Code signing is required for product type 'Application'` | Release 빌드에 Distribution Certificate 없음 | App Store Distribution Certificate 생성 필요 |
| `Entitlements file do not match those in your provisioning profile` | Capabilities 설정이 Profile과 불일치 | Developer Portal에서 Capability 추가 후 Profile 재생성 |
| `Certificate has expired` | 인증서 만료 (1년 유효) | 새 Certificate 생성 및 Profile 갱신 |

---

## 3. 빌드 설정

### Debug vs Release 빌드

Xcode는 기본적으로 두 가지 Build Configuration을 제공합니다.

**Debug 빌드**:
- 최적화 없음, 디버그 심볼 포함
- `print()` 출력이 콘솔에 나타남
- 시뮬레이터와 실기기 테스트에 사용
- 더 빠르게 컴파일되지만 실행 속도는 느림

**Release 빌드**:
- 컴파일러 최적화 적용 (`-O` 플래그)
- 디버그 심볼은 별도 `.dSYM` 파일로 분리
- App Store 제출 및 TestFlight에 사용
- `#if DEBUG` 블록 코드가 제외됨

```swift
// 빌드 설정에 따른 조건부 코드
#if DEBUG
let apiBaseURL = "https://dev-api.example.com"
print("Debug mode: 개발 서버 사용 중")
#else
let apiBaseURL = "https://api.example.com"
#endif
```

### Bundle Version vs Bundle Short Version String

두 가지 버전 번호를 헷갈리지 않는 것이 중요합니다.

| 키 | Info.plist 키 | 예시 | 용도 |
|----|-------------|------|------|
| **Bundle Short Version** | `CFBundleShortVersionString` | `2.1.0` | 사용자에게 보이는 버전 (앱스토어 표시) |
| **Bundle Version** | `CFBundleVersion` | `47` | 빌드 번호. 동일 버전 내에서 매번 증가해야 함 |

> 💡 **Android 개발자라면**: `versionName`(사용자 표시, "2.1.0")과 `versionCode`(정수 빌드 번호, 47)에 정확히 대응됩니다. Android도 Play Store에 제출할 때 `versionCode`는 이전보다 반드시 커야 합니다.

> 💡 **웹 개발자라면**: `package.json`의 `version` 필드("2.1.0")가 Bundle Short Version에 해당합니다. Bundle Version(빌드 번호)에 해당하는 개념은 웹에서는 보통 CI 빌드 번호나 커밋 SHA를 사용합니다.

COMPARE_BLOCK:deploy_versioning

### Build Schemes와 Configuration

**Scheme**은 "어떤 target을 어떻게 빌드하고 실행할지"에 대한 설정 모음입니다. 기본 Scheme은 Debug로 Run하고 Release로 Archive(배포용 빌드)합니다.

**Configuration**을 추가하면 더 세밀한 제어가 가능합니다. 예를 들어 Debug, Staging, Release 세 가지 Configuration을 만들 수 있습니다.

```
Product → Scheme → Edit Scheme...
  └── Run
       └── Build Configuration: Debug / Staging / Release
```

실제로 많이 쓰는 패턴은 다음과 같습니다.

| Scheme | Configuration | 용도 |
|--------|-------------|------|
| MyApp | Debug | 로컬 개발, 시뮬레이터 |
| MyApp Staging | Staging | QA, TestFlight 스테이징 |
| MyApp | Release | App Store 제출 |

### xcconfig 파일로 환경변수 관리

COMPARE_BLOCK:deploy_env

xcconfig 파일은 Xcode 빌드 설정을 텍스트 파일로 관리할 수 있게 해줍니다. Git에 커밋할 수 있어 팀 단위 개발에서 설정을 공유하기 좋습니다.

**xcconfig 파일 작성 예시:**

```
// Debug.xcconfig
API_BASE_URL = https:/$()/dev-api.example.com
ANALYTICS_ENABLED = NO
LOG_LEVEL = verbose

// Release.xcconfig
API_BASE_URL = https:/$()/api.example.com
ANALYTICS_ENABLED = YES
LOG_LEVEL = error
```

> 주의: URL의 `//`는 xcconfig에서 주석으로 해석됩니다. `https://`를 쓰려면 `https:/$()/`처럼 빈 변수로 회피합니다.

**Info.plist에 xcconfig 값 연결:**

```xml
<key>API_BASE_URL</key>
<string>$(API_BASE_URL)</string>
```

**Swift 코드에서 읽기:**

```swift
enum AppConfig {
    static var apiBaseURL: String {
        guard let url = Bundle.main.object(forInfoDictionaryKey: "API_BASE_URL") as? String else {
            fatalError("API_BASE_URL이 Info.plist에 없습니다")
        }
        return url
    }

    static var isAnalyticsEnabled: Bool {
        let value = Bundle.main.object(forInfoDictionaryKey: "ANALYTICS_ENABLED") as? String
        return value == "YES"
    }
}

// 사용
let url = AppConfig.apiBaseURL  // "https://api.example.com"
```

### Info.plist 주요 키 설명

Info.plist는 앱의 메타데이터와 권한 요청 문구를 담는 XML 파일입니다. Xcode 13 이후에는 별도 파일 대신 프로젝트 설정에서 관리하는 방식으로 바뀌었지만, 직접 편집도 가능합니다.

| 키 | 설명 | 예시 |
|----|------|------|
| `NSCameraUsageDescription` | 카메라 접근 권한 요청 문구 | "프로필 사진 촬영에 사용됩니다" |
| `NSLocationWhenInUseUsageDescription` | 위치 권한 (앱 사용 중) | "주변 카페 검색에 사용됩니다" |
| `NSPhotoLibraryUsageDescription` | 사진 라이브러리 접근 | "이미지 첨부에 사용됩니다" |
| `NSMicrophoneUsageDescription` | 마이크 접근 | "음성 메모 녹음에 사용됩니다" |
| `NSContactsUsageDescription` | 연락처 접근 | "친구 초대 기능에 사용됩니다" |
| `UILaunchScreen` | 런치 스크린 설정 | 스플래시 화면 구성 |
| `UISupportedInterfaceOrientations` | 지원하는 화면 방향 | Portrait, LandscapeLeft 등 |
| `ITSAppUsesNonExemptEncryption` | 암호화 사용 여부 (수출 규정) | `NO` (일반적으로) |

> ⚠️ **주의**: 권한 요청 문구(Usage Description)가 없으면 해당 API를 호출할 때 크래시가 발생하고, App Store 심사에서도 거절됩니다. 반드시 사용 목적을 명확하게 작성하세요. "앱 기능 향상을 위해"처럼 모호한 문구는 거절 사유가 됩니다.

---

## 4. TestFlight — 베타 배포

### TestFlight란?

TestFlight는 Apple이 운영하는 공식 베타 테스팅 플랫폼입니다. App Store에 정식 출시 전에 실제 기기에서 앱을 테스트할 수 있게 해줍니다. App Store Connect와 통합되어 있으며, 테스터는 TestFlight 앱을 설치한 후 초대를 수락하면 베타 앱을 받을 수 있습니다.

> 💡 **Android 개발자라면**: Firebase App Distribution과 매우 유사합니다. 차이점은 TestFlight는 Apple의 공식 서비스라 별도 SDK 연동이 필요 없고, 외부 테스터는 최대 10,000명까지 가능합니다. Firebase App Distribution은 팀 규모에 더 유연하지만 테스터 기기가 등록되어 있지 않아도 됩니다.

> 💡 **웹 개발자라면**: Vercel/Netlify의 Preview Deploy(PR마다 별도 URL 생성)와 유사한 개념입니다. 웹은 URL만 공유하면 되지만, iOS는 TestFlight 앱을 통해 설치해야 하는 차이가 있습니다.

### 내부 테스터 vs 외부 테스터

| 구분 | 내부 테스터 | 외부 테스터 |
|------|-----------|-----------|
| 최대 인원 | 25명 | 10,000명 |
| 자격 | Apple Developer 계정 보유자 (팀 멤버) | 이메일 초대 (계정 불필요) |
| 베타 심사 | 없음 (즉시 배포) | 있음 (최초 1회, 간단한 심사) |
| 빌드 유효 기간 | 90일 | 90일 |
| 사용 시나리오 | 개발팀 내부 QA | 외부 사용자 베타 |

내부 테스터는 빌드를 올리면 즉시 사용할 수 있어 개발팀 내부 테스트에 적합합니다. 외부 테스터는 최초 빌드 제출 시 Apple의 간단한 베타 심사(보통 하루 이내)를 거친 후 배포됩니다.

### 피드백 수집

TestFlight는 테스터가 앱 내에서 직접 스크린샷을 찍고 피드백을 남길 수 있는 기능을 제공합니다.

- 기기를 흔들면 피드백 창이 뜨거나, 스크린샷을 찍을 때 자동으로 피드백 제출 옵션이 표시됩니다.
- 제출된 피드백은 App Store Connect의 TestFlight 섹션에서 확인할 수 있습니다.
- 크래시 리포트도 자동으로 수집되어 Xcode Organizer에서 확인 가능합니다.

### TestFlight 배포 흐름

```
코드 작성 → Archive 빌드 (Product → Archive)
    → App Store Connect에 업로드 (Xcode Organizer)
        → TestFlight 처리 (수 분)
            → 내부 테스터: 즉시 배포
            → 외부 테스터: 베타 심사 (최초 1회) → 배포
```

**Archive 빌드 방법:**
1. Xcode 상단 메뉴 `Product → Archive`
2. Organizer 창에서 해당 Archive 선택
3. `Distribute App` → `App Store Connect` → `Upload` 선택
4. App Store Connect에서 TestFlight 탭 → 빌드 확인

---

## 5. App Store Connect

App Store Connect는 Apple 개발자 포털로, 앱 메타데이터 관리, 가격 설정, 심사 제출, 판매 현황 확인 등을 할 수 있는 웹 대시보드입니다.

### 앱 정보 작성 — ASO (App Store Optimization)

ASO는 검색 엔진 최적화(SEO)의 앱스토어 버전입니다. 앱이 검색에 잘 나타나려면 다음 요소들을 최적화해야 합니다.

**앱 이름 (App Name)**: 최대 30자. 브랜드명과 핵심 기능을 함께 넣는 것이 좋습니다.
예: "Notion – 노트 & 팀 협업"

**부제목 (Subtitle)**: 최대 30자. 앱 이름 바로 아래에 표시되며, 보조 키워드를 넣기 좋습니다.

**키워드 (Keywords)**: 최대 100자. 쉼표로 구분, 공백 없이. 검색에 활용되지만 사용자에게 보이지 않습니다. 앱 이름과 부제목에 이미 있는 단어는 중복 입력 불필요합니다.

**설명 (Description)**: 최대 4,000자. 첫 3줄이 "더 보기" 클릭 없이 노출되므로 핵심 기능을 앞에 배치합니다.

**홍보 문구 (Promotional Text)**: 최대 170자. 심사 재제출 없이 언제든 변경 가능합니다. 이벤트 공지 등에 활용합니다.

> ⚠️ **심사 주의사항**: 앱 설명에 다른 플랫폼(Android, Windows)을 언급하거나, "최고", "1등" 같은 검증되지 않은 주장을 쓰면 거절 사유가 됩니다.

### 스크린샷 요구사항

App Store에 표시되는 스크린샷은 기기 크기별로 각각 제출해야 합니다. 스크린샷은 가장 중요한 다운로드 전환율 요소입니다.

| 기기 분류 | 해상도 | 필수 여부 |
|---------|--------|---------|
| iPhone 6.7" (15 Pro Max 등) | 1290 × 2796 px | **필수** |
| iPhone 6.5" (14 Plus 등) | 1242 × 2688 px | 선택 (미제출 시 6.7" 사용) |
| iPhone 5.5" (8 Plus 등) | 1242 × 2208 px | **필수** |
| iPad Pro 12.9" (3세대+) | 2048 × 2732 px | iPad 지원 시 필수 |
| iPad Pro 12.9" (2세대) | 2048 × 2732 px | iPad 지원 시 필수 |

- 각 기기당 최대 10장, 최소 1장 제출
- PNG 또는 JPEG 형식
- 앱 실제 화면이어야 함 (마케팅 합성 이미지 불가)
- 최대 30초 미리보기 동영상도 제출 가능

### 앱 아이콘 규격

| 용도 | 크기 | 비고 |
|------|------|------|
| App Store | 1024 × 1024 px | PNG, 투명도 없음, 둥근 모서리 금지 (Apple이 자동 적용) |
| iOS 앱 아이콘 | 60 × 60 pt (@2x, @3x) | Xcode Assets.xcassets에서 관리 |

> 💡 Xcode 13 이후에는 1024×1024 하나만 제공하면 Xcode가 자동으로 모든 크기를 생성합니다. `AppIcon` Asset에 Single Size 옵션이 생겼기 때문입니다.

### 연령 등급

앱이 포함한 콘텐츠 유형에 따라 연령 등급이 자동으로 결정됩니다. App Store Connect에서 설문 형식으로 답변하면 4+, 9+, 12+, 17+ 중 하나가 결정됩니다.

중요한 연령 등급 항목들:
- 음주/흡연 묘사
- 성적 콘텐츠
- 폭력성
- 공포/공포 요소
- 도박 시뮬레이션
- 성숙한 주제 및 언어

17+ 등급을 받으면 자녀 보호 기능이 켜진 기기에서 다운로드가 차단됩니다.

### 개인정보 처리 방침 (Privacy Policy)

앱이 어떤 개인정보를 수집하든 개인정보 처리 방침 URL이 필수입니다. 또한 앱이 수집하는 모든 데이터 유형을 App Store Connect의 "앱 개인정보 보호" 섹션에 선언해야 합니다.

수집하는 데이터가 없더라도 "데이터를 수집하지 않습니다"를 선언해야 심사가 통과됩니다.

### 가격 정책

- 무료, 또는 0.99 USD부터 시작하는 Apple의 표준 가격 티어 중 선택
- 지역별 가격은 환율 기반으로 자동 설정되거나, 직접 설정 가능
- 인앱결제(In-App Purchase)는 별도로 App Store Connect에서 등록

---

## 6. 심사 가이드라인 핵심 정리

Apple의 [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)는 매우 방대하지만, 실제로 거절되는 사유는 비교적 정해져 있습니다.

### 자주 거절되는 사유 Top 10

| 순위 | 사유 | 설명 |
|------|------|------|
| 1 | **성능 문제** | 크래시, 버그가 있는 앱. "더미 데이터", "미완성 기능" 존재 시 거절 |
| 2 | **부정확한 메타데이터** | 스크린샷이 실제 앱과 다름, 앱 설명이 기능을 과장/허위 기재 |
| 3 | **개인정보 처리 방침 미비** | Privacy Policy URL 없음, 데이터 수집 미선언 |
| 4 | **인앱결제 우회** | 디지털 재화를 외부 결제로 유도 (Epic Games 분쟁의 핵심) |
| 5 | **권한 남용** | 불필요한 권한 요청, 모호한 권한 요청 문구 |
| 6 | **로그인 정보 미제공** | 심사관이 모든 기능을 테스트할 수 없을 때. Demo 계정 필요 |
| 7 | **앱이 단순히 웹사이트 래핑** | 기능이 웹사이트와 동일하고 앱으로서의 가치 없음 |
| 8 | **아이콘/스크린샷 규격 불일치** | 해상도 오류, 다른 플랫폼 UI 노출 (Android 버튼 등) |
| 9 | **미완성 기능** | 작동하지 않는 버튼, "Coming Soon" 섹션 존재 |
| 10 | **안전 지침 위반** | 실제 해로운 정보 제공 (의약품 오남용 등) |

### 인앱결제 강제 정책

디지털 재화(앱 내에서 소비되는 아이템, 구독, 콘텐츠)는 반드시 Apple의 인앱결제 시스템을 통해 결제해야 합니다.

**인앱결제가 필수인 경우:**
- 앱 내 구독 (뉴스, 스트리밍, 프리미엄 기능)
- 게임 아이템, 코인
- 디지털 콘텐츠 (이북, 음악, 영상 — 단, 외부에서 취득한 콘텐츠를 재생하는 경우 예외)

**인앱결제가 불필요한 경우:**
- 실물 상품 판매 (쇼핑몰 앱)
- 실생활 서비스 결제 (우버, 배달 앱)
- 기업간 B2B 서비스
- 외부 구독의 콘텐츠 열람 (넷플릭스처럼 인앱결제 버튼 없이 앱 외부에서 구독)

> ⚠️ **2024년 EU 규정 변경**: EU 디지털 시장법(DMA)에 따라 EU 내에서는 대체 결제 수단과 대체 앱스토어를 허용해야 합니다. 이에 따라 Apple은 EU에서 제한적으로 규정을 완화했습니다. 글로벌 서비스라면 지역별 정책 차이를 확인하세요.

### 개인정보 관련 필수 선언

App Store Connect에서 수집하는 데이터를 선언할 때, 각 데이터 유형에 대해 다음을 명시해야 합니다.

1. **수집 목적**: 앱 기능, 분석, 광고, 개발자 광고 등
2. **사용자 추적 여부**: 타사 광고나 데이터 브로커에 공유하는지

"앱 추적 투명성 (ATT)" 프레임워크: 사용자의 기기 ID를 광고 목적으로 추적하려면 `AppTrackingTransparency` 프레임워크를 사용해 사용자 동의를 받아야 합니다.

```swift
import AppTrackingTransparency

func requestTrackingPermission() {
    ATTrackingManager.requestTrackingAuthorization { status in
        switch status {
        case .authorized:
            print("추적 허용됨 — 맞춤형 광고 활성화")
        case .denied, .restricted, .notDetermined:
            print("추적 거부됨 — 일반 광고 사용")
        @unknown default:
            break
        }
    }
}
```

---

## 7. 배포 후 운영

### 버전 업데이트 프로세스

앱을 출시했다고 끝이 아닙니다. 새 버전을 출시하는 흐름은 다음과 같습니다.

```
1. 코드 변경 및 테스트
2. Bundle Short Version 올리기 (예: 1.0.0 → 1.1.0)
3. Bundle Version(빌드 번호) 올리기 (항상 이전보다 커야 함)
4. Archive 빌드
5. App Store Connect에 업로드
6. TestFlight로 내부 테스트 → 외부 베타
7. 새 버전 심사 제출 (App Store Connect)
8. 심사 통과 → "수동 출시" 또는 "자동 출시" 선택
9. 출시 후 리뷰 모니터링 및 크래시 확인
```

**수동 출시 vs 자동 출시**: 심사 통과 후 즉시 배포되게 할 수도 있고, 개발자가 직접 "출시" 버튼을 누를 때까지 대기하게 할 수도 있습니다. 마케팅 캠페인과 타이밍을 맞춰야 할 때 수동 출시가 유용합니다. **단계적 출시(Phased Release)** 옵션을 사용하면 7일에 걸쳐 전체 사용자의 1% → 2% → 5% → 10% → 20% → 50% → 100% 순으로 점진적으로 배포할 수도 있습니다.

### 긴급 핫픽스 전략

치명적인 버그가 발견됐을 때 취할 수 있는 전략들:

**1. Expedited Review 요청**
```
App Store Connect → 해당 버전 → "요청 촉진 검토"
사용 가능한 경우: 연 1~2회 정도로 남용하지 말 것
보안 취약점이나 전체 앱 크래시에 사용 권장
```

**2. 서버 사이드 설정 변경**: 버그가 있는 기능을 서버에서 끄거나, 수정된 데이터/로직을 API에서 제공합니다.

**3. 단계적 출시 일시 중지**: 문제가 발견되면 단계적 출시를 중단하고 수정 버전을 준비합니다.

**4. 이전 버전으로 롤백**: App Store Connect에서 이전 심사 통과 버전을 다시 "라이브"로 지정할 수 있습니다. (단, 현재 라이브 버전을 제거하고 이전 버전을 재활성화하는 식으로, 즉각적이지 않음)

### 앱 강제 업데이트 구현

보안 패치나 API 하위 호환성 제거 등의 이유로 오래된 버전 사용을 막아야 할 때가 있습니다.

COMPARE_BLOCK:deploy_force_update

강제 업데이트는 두 가지 방식으로 구현할 수 있습니다.

**방식 1 — 서버 설정 기반 (권장)**:
서버 API에서 `minimumRequiredVersion`을 응답하고, 앱이 실행될 때마다 비교합니다. 서버에서 버전을 조정하면 앱 업데이트 없이도 강제 업데이트 시점을 바꿀 수 있습니다.

**방식 2 — App Store 버전 확인**:
iTunes Lookup API로 현재 App Store에 올라간 최신 버전을 확인하고 비교합니다. 서버 없이도 구현 가능하지만, 캐시 문제로 응답이 느릴 수 있습니다.

### 크래시 리포팅

앱이 출시된 후 사용자 기기에서 발생하는 크래시를 파악하는 것이 중요합니다.

**Xcode Organizer (기본 제공)**:
- Xcode → Window → Organizer → Crashes
- 자동으로 집계되며, 코드 라인 수준까지 스택 트레이스를 보여줌
- dSYM 파일이 있어야 심볼화(symbolication)됨

**Firebase Crashlytics (권장)**:
- 실시간 알림, 사용자 영향도 분석, 비크래시 오류(non-fatal error) 추적 가능
- iOS/Android/웹 모두 지원해 멀티플랫폼 팀에서 통합 대시보드로 사용하기 좋음

COMPARE_BLOCK:deploy_crash

```swift
// 비치명적 오류 기록 (앱이 죽지 않아도 Crashlytics에 기록)
do {
    let data = try fetchUserData()
} catch {
    Crashlytics.crashlytics().record(error: error)
    // 앱은 계속 실행됨
}

// 사용자 식별 정보 추가 (크래시 분석 시 도움)
Crashlytics.crashlytics().setUserID("user_123")
Crashlytics.crashlytics().setValue("premium", forKey: "subscription_tier")
```

> 💡 **중요**: 크래시 데이터를 수집한다면 개인정보 처리 방침에 명시하고, App Store Connect의 개인정보 보호 섹션에 "크래시 데이터"를 선언해야 합니다.

### 앱 스토어 리뷰 응답

사용자 리뷰에 응답하는 것은 앱의 평점을 유지하고 사용자와 소통하는 중요한 방법입니다.

- App Store Connect 또는 Xcode Organizer에서 리뷰 확인 및 응답 가능
- 응답은 공개되며 다른 사용자도 볼 수 있음
- 부정적인 리뷰에는 문제 해결 의지를 보여주는 것이 전환율에 도움
- 앱 내에서 `SKStoreReviewController`로 리뷰 요청 팝업을 띄울 수 있음 (연 3회 제한)

```swift
import StoreKit

// 자연스러운 시점에 리뷰 요청 (예: 작업 완료 후)
func requestReviewIfAppropriate() {
    // iOS 16+
    if let scene = UIApplication.shared.connectedScenes
        .first(where: { $0.activationState == .foregroundActive }) as? UIWindowScene {
        SKStoreReviewController.requestReview(in: scene)
    }
}
```

> ⚠️ **주의**: 리뷰 요청은 사용자가 앱에 긍정적 경험을 가진 자연스러운 시점에 해야 합니다. "5점 주면 프리미엄 기능 제공" 같은 보상 제공은 심사 거절 사유입니다.

---

## 8. CI/CD — 자동화 배포

수동 Archive → 업로드 프로세스는 실수가 생기기 쉽고 반복적입니다. CI/CD를 도입하면 코드 커밋만으로 빌드, 테스트, TestFlight 배포까지 자동화할 수 있습니다.

### Xcode Cloud

Apple이 2022년에 출시한 공식 CI/CD 서비스입니다. Xcode 및 App Store Connect에 완전히 통합되어 있습니다.

**장점:**
- Apple Silicon 기반 빌드 환경 (빠른 빌드)
- 설정이 간단 (코드 없이 UI로 워크플로우 구성)
- App Store Connect, TestFlight와 직접 통합
- 연간 일정 시간 무료 제공

**워크플로우 예시:**
```
트리거: main 브랜치 푸시
  → 빌드: xcodebuild
  → 테스트: Unit Tests + UI Tests
  → 배포: TestFlight 내부 테스터 배포
```

### Fastlane

오픈소스 자동화 도구로, iOS/Android 배포 자동화의 사실상 표준입니다.

```ruby
# Fastfile 예시
default_platform(:ios)

platform :ios do
  desc "TestFlight 베타 배포"
  lane :beta do
    increment_build_number                    # 빌드 번호 자동 증가
    build_app(scheme: "MyApp")                # Archive 빌드
    upload_to_testflight(skip_waiting_for_build_processing: true)
    slack(message: "새 베타 빌드가 TestFlight에 업로드됐습니다!")
  end

  desc "App Store 제출"
  lane :release do
    capture_screenshots                        # 스크린샷 자동 생성
    upload_to_app_store(
      submit_for_review: true,
      automatic_release: false
    )
  end
end
```

### GitHub Actions + Match

**Match**는 Fastlane의 코드 서명 관리 도구입니다. Certificate와 Provisioning Profile을 암호화해 Git 저장소에 저장하고, 팀원이나 CI 서버가 자동으로 동기화하도록 합니다.

```yaml
# .github/workflows/testflight.yml
name: TestFlight 배포

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4

      - name: Ruby 및 Fastlane 설치
        run: bundle install

      - name: Match로 인증서 동기화
        env:
          MATCH_PASSWORD: ${{ secrets.MATCH_PASSWORD }}
          FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD: ${{ secrets.APP_SPECIFIC_PASSWORD }}
        run: bundle exec fastlane match appstore --readonly

      - name: TestFlight 배포
        env:
          APP_STORE_CONNECT_API_KEY_ID: ${{ secrets.ASC_KEY_ID }}
          APP_STORE_CONNECT_API_ISSUER_ID: ${{ secrets.ASC_ISSUER_ID }}
          APP_STORE_CONNECT_API_KEY_CONTENT: ${{ secrets.ASC_KEY_CONTENT }}
        run: bundle exec fastlane beta
```

> 💡 **Android 개발자라면**: Android의 경우 `google-services.json`과 keystore 파일만 CI에 제공하면 되는 것에 비해 iOS는 Match 설정이 추가로 필요합니다. 그러나 한 번 설정하면 팀 전체가 서명 문제 없이 빌드할 수 있어 장기적으로 훨씬 편합니다.

---

## 배포 전 최종 체크리스트

### 코드 & 빌드

- [ ] Release 빌드로 실기기 테스트 완료
- [ ] `#if DEBUG` 코드에만 개발 전용 로직이 있는지 확인
- [ ] Bundle Short Version (사용자 버전) 업데이트
- [ ] Bundle Version (빌드 번호) 이전 제출보다 증가 확인
- [ ] Archive 빌드 성공 확인

### 코드 서명

- [ ] Distribution Certificate 유효 (만료일 확인)
- [ ] App Store 배포용 Provisioning Profile 최신화
- [ ] 필요한 Capabilities가 모두 Provisioning Profile에 포함됐는지 확인

### Info.plist & 권한

- [ ] 사용하는 권한의 Usage Description 모두 작성 (한국어/영어)
- [ ] `ITSAppUsesNonExemptEncryption` 설정 (대부분 NO)
- [ ] 런치 스크린 설정 확인

### App Store Connect

- [ ] 앱 이름, 부제목, 설명 최신화
- [ ] 스크린샷 6.7인치, 5.5인치 (최소) 준비
- [ ] 앱 아이콘 1024×1024 PNG (투명도 없음)
- [ ] 개인정보 처리 방침 URL 유효한지 확인
- [ ] 데이터 수집 항목 선언 완료
- [ ] 연령 등급 설문 완료
- [ ] 심사관을 위한 메모 작성 (계정 정보 필요 시 첨부)
- [ ] 가격 설정 확인

### TestFlight 베타 (선택)

- [ ] 내부 테스터 피드백 반영 완료
- [ ] 베타 기간 크래시 없음 확인

### 제출 후

- [ ] 심사 상태 주기적 확인 (App Store Connect 앱 또는 이메일 알림)
- [ ] 심사 통과 후 단계적 출시 vs 즉시 출시 결정
- [ ] 출시 후 첫 24시간 크래시 모니터링

---

## 심사 거절 시 대응 방법

심사에서 거절됐다고 당황하지 마세요. 17%의 앱이 첫 제출에서 거절됩니다. 차분히 대응하면 됩니다.

**1단계: 거절 사유 파악**
App Store Connect에 거절 사유와 함께 어떤 가이드라인을 위반했는지 명시됩니다. Resolution Center에서 심사관과 직접 메시지를 주고받을 수도 있습니다.

**2단계: 설명 또는 수정**
- 오해에 의한 거절이라면: Resolution Center에서 해당 기능의 의도와 사용 방식을 설명합니다. 영문으로 명확하게 작성하세요.
- 실제 규정 위반이라면: 해당 부분을 수정하고 재제출합니다.

**3단계: 항소 (Appeal)**
심사 결과에 동의하지 않는다면 App Store Review Board에 항소할 수 있습니다. 가이드라인을 명확히 인용해 논리적으로 작성해야 합니다.

> 💡 **팁**: 심사관에게 앱의 주요 기능을 직접 보여줄 수 있도록 `심사 메모`에 테스트 계정과 기능 시연 순서를 상세히 작성하세요. "데모 계정: test@example.com / 비밀번호: Test1234!" 같은 정보가 있으면 심사관이 앱을 더 원활하게 검토할 수 있습니다.
