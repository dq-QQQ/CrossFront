# Chapter 11. 알림 — Local & Push

사용자가 앱을 열지 않아도 중요한 정보를 전달할 수 있는 알림은 모바일 앱의 핵심 리텐션 도구입니다. 동시에 권한 요청 타이밍 실패, 과도한 알림, 잘못된 백그라운드 처리로 인한 배터리 소모는 사용자 이탈의 주요 원인이기도 합니다. 이 챕터에서는 iOS의 알림 시스템 전체를 Android·웹과 비교하며 실무 수준으로 파악합니다.

---

## 1. iOS 알림 시스템 아키텍처

### 알림 경로 전체 흐름

iOS의 알림 인프라는 크게 두 가지 경로로 나뉩니다.

```
로컬 알림 경로
앱 코드 → UNUserNotificationCenter → iOS 스케줄러 → 사용자 디바이스

Push 알림 경로
서버 → APNs(Apple Push Notification service) → iOS → 앱
```

**Android와의 구조적 차이**:

| 항목 | iOS | Android |
|------|-----|---------|
| Push 인프라 | APNs (Apple 운영) | FCM (Google 운영) |
| 로컬 알림 API | `UNUserNotificationCenter` | `AlarmManager` + `NotificationCompat` |
| 권한 모델 | 최초 실행 시 명시적 요청 필수 | Android 13 이전 자동 허용, 13+부터 요청 필요 |
| 알림 채널 | 카테고리(Category) 기반 | NotificationChannel 필수 (Android 8+) |
| Extension 처리 | Notification Service Extension (별도 프로세스) | onMessageReceived 내에서 처리 |
| 커스텀 UI | Notification Content Extension | RemoteViews (레이아웃 XML) |

**웹과의 구조적 차이**:

| 항목 | iOS | Web |
|------|-----|-----|
| Push 인프라 | APNs | VAPID + Web Push Protocol |
| 로컬 알림 | OS 레벨 스케줄러 | 없음 (Notification Triggers API: 실험적) |
| 백그라운드 처리 | BGTaskScheduler, Silent Push | Service Worker, Background Sync |
| 커스텀 UI | Content Extension (풀 Swift/ObjC UI) | 브라우저 기본 UI만 (커스텀 불가) |
| PWA Push | Safari 16.4+, 홈화면 추가 필요 | Chrome/Firefox/Edge 지원 |

### UNUserNotificationCenter 중심 설계

iOS 10부터 도입된 `UNUserNotificationCenter`는 로컬 알림과 Push 알림을 단일 API로 통합합니다.

```
UNUserNotificationCenter
├── 권한 관리: requestAuthorization(), getNotificationSettings()
├── 로컬 알림: add(UNNotificationRequest), pending/delivered 조회
├── 카테고리: setNotificationCategories()
└── 델리게이트: UNUserNotificationCenterDelegate
    ├── willPresent(_:) — 포그라운드 수신 처리
    └── didReceive(_:) — 탭/액션 처리
```

---

## 2. 알림 권한 요청

### 권한 요청은 타이밍이 전부다

iOS에서 알림 권한 다이얼로그는 **딱 한 번** 표시됩니다. 사용자가 거부하면 앱이 직접 다시 요청할 방법이 없고, 설정 앱으로 안내하는 것이 유일한 대안입니다. 따라서 **언제 요청하느냐**가 허용률에 결정적 영향을 미칩니다.

**Pre-permission UX 패턴** (실무 표준):

```
앱 내 커스텀 설명 화면 → 사용자 "허용하기" 버튼 탭 → 시스템 다이얼로그 표시
```

앱 첫 실행 시 바로 시스템 다이얼로그를 보여주는 것은 최악의 패턴입니다. 사용자가 맥락 없이 거부할 가능성이 높습니다. 반면 사용자가 알림 관련 기능을 사용하려는 시점(예: 주문 완료 화면, 채팅 진입)에 "알림을 받으면 더 편리합니다" 설명과 함께 요청하면 허용률이 크게 높아집니다.

COMPARE_BLOCK:notification_permission

### 권한 상태별 분기 처리

```swift
let settings = await UNUserNotificationCenter.current().notificationSettings()

switch settings.authorizationStatus {
case .notDetermined:  // 아직 요청 안 함
case .denied:         // 거부됨 → 설정 앱 안내
case .authorized:     // 완전 허용
case .provisional:    // 임시 허용 (iOS 12+) — 알림센터에만, 배너 없음
case .ephemeral:      // App Clip 전용
}
```

**Provisional Authorization (임시 허가)** — iOS 12+ 독자 기능:
- `options: [.provisional]`로 요청하면 사용자 동의 없이 즉시 임시 허가 상태가 됩니다.
- 임시 허가 상태에서는 알림이 배너/소리 없이 알림센터에만 조용히 추가됩니다.
- 알림센터에서 사용자가 "계속 허용" 또는 "끄기"를 선택하면 상태가 확정됩니다.
- 온보딩 없이 알림을 보여주고 사용자가 직접 판단하게 하는 방식으로, 허용률을 높이는 전략입니다.

```swift
// Provisional 요청 예시
let granted = try await center.requestAuthorization(options: [.provisional, .alert, .sound])
// granted가 true이지만 실제로는 임시 허가 상태
```

> **Android 개발자라면**: Android 12 이하에서는 알림 권한이 자동으로 허용되었습니다. Android 13부터 iOS와 유사한 런타임 권한 모델로 바뀌었지만, iOS는 10년 전부터 이 방식을 유지해왔습니다. `shouldShowRequestPermissionRationale()`에 해당하는 것이 iOS의 Pre-permission UX 패턴입니다.

> **웹 개발자라면**: `Notification.requestPermission()`은 반드시 사용자 제스처 컨텍스트에서 호출해야 한다는 제약이 iOS와 비슷합니다. 다만 웹은 한번 거부하면 `permission: 'denied'`가 되어 브라우저 주소창에서만 변경 가능합니다 — iOS와 동일한 제약입니다.

---

## 3. 로컬 알림 스케줄링

### 세 가지 트리거 유형

iOS 로컬 알림은 발송 조건을 "트리거"로 추상화합니다. `UNNotificationRequest`는 콘텐츠(`UNNotificationContent`)와 트리거의 조합입니다.

| 트리거 | 클래스 | 용도 |
|--------|--------|------|
| 시간 간격 | `UNTimeIntervalNotificationTrigger` | N초 후, 반복 가능 |
| 날짜/시간 | `UNCalendarNotificationTrigger` | 특정 날짜·요일·시간, 반복 가능 |
| 위치 | `UNLocationNotificationTrigger` | 지오펜스 진입/퇴장 |

COMPARE_BLOCK:notification_local_schedule

### 알림 콘텐츠 고급 설정

```swift
let content = UNMutableNotificationContent()
content.title = "주문 완료"
content.subtitle = "스타벅스 강남점"          // 제목 아래 작은 부제목
content.body = "아메리카노 1잔이 준비됐습니다."
content.sound = UNNotificationSound.default

// 커스텀 소리 (앱 번들에 포함된 파일, 30초 이하)
content.sound = UNNotificationSound(named: UNNotificationSoundName("order_ready.caf"))

// 뱃지 숫자 설정
content.badge = 1

// 딥링크 및 커스텀 데이터
content.userInfo = [
    "deepLink": "myapp://orders/456",
    "orderId": "456",
]

// 스레딩 — 같은 threadIdentifier끼리 그룹화됨
content.threadIdentifier = "orders"

// 요약 텍스트 (그룹 알림 접힐 때 표시)
content.summaryArgument = "스타벅스 강남점"
```

### 알림 관리 실무 패턴

```swift
let center = UNUserNotificationCenter.current()

// 대기 중인 알림 목록 조회
let pending = await center.pendingNotificationRequests()
print("예약된 알림 수: \\(pending.count)")

// 특정 알림 취소
center.removePendingNotificationRequests(withIdentifiers: ["daily_reminder"])

// 전달된 알림 (알림센터에 표시 중인 것) 조회 및 삭제
let delivered = await center.deliveredNotifications()
center.removeDeliveredNotifications(withIdentifiers: ["old_promo"])
center.removeAllDeliveredNotifications()

// 기존 알림 업데이트 — 같은 identifier로 다시 add()하면 교체됨
let updatedContent = UNMutableNotificationContent()
updatedContent.title = "주문 상태 업데이트"
updatedContent.body = "배달 완료!"
let updateRequest = UNNotificationRequest(
    identifier: "order_456",  // 기존 identifier와 동일
    content: updatedContent,
    trigger: nil  // nil이면 즉시 발송
)
try await center.add(updateRequest)
```

---

## 4. APNs 등록 및 토큰 관리

### APNs 아키텍처 이해

```
[앱] --registerForRemoteNotifications()--> [iOS]
[iOS] --인증서/키 검증--> [APNs 서버]
[APNs 서버] --device token--> [iOS]
[iOS] --didRegisterForRemoteNotificationsWithDeviceToken--> [앱]
[앱] --token + userID--> [내 서버]

이후:
[내 서버] --payload--> [APNs] --push--> [iOS] ---> [앱]
```

디바이스 토큰은 APNs가 특정 기기의 특정 앱을 식별하는 **주소**입니다. 앱 재설치, 기기 복원, iOS 업그레이드 등의 상황에서 토큰이 변경될 수 있으므로, **앱 실행마다 토큰을 서버에 재등록**하는 것이 안전합니다.

COMPARE_BLOCK:notification_apns_register

### APNs 인증 방법 두 가지

**방법 1 — APNs 인증서 (.p12)**:
- 앱 ID별로 인증서 발급
- 만료 기간(1년) 있어 갱신 필요
- 개발(Sandbox)/배포(Production) 인증서 분리

**방법 2 — APNs 키 (.p8, 권장)**:
- 개발자 계정당 하나의 키로 모든 앱 공용
- 만료 없음
- HTTP/2 기반 APNs Provider API와 함께 사용

```
# 서버에서 APNs로 Push 전송 (HTTP/2 + JWT 인증)
POST https://api.push.apple.com/3/device/{device-token}
Authorization: bearer <JWT>
apns-topic: com.mycompany.myapp
apns-push-type: alert | background | voip | ...
Content-Type: application/json

{
  "aps": {
    "alert": {
      "title": "새 메시지",
      "body": "안녕하세요!"
    },
    "sound": "default",
    "badge": 3
  }
}
```

### 서버에서 APNs 연동 (Node.js 예시)

```javascript
// node-apn 또는 @parse/node-apple-push-notification-server 라이브러리
const apn = require('@parse/node-apple-push-notification-server');

const provider = new apn.Provider({
  token: {
    key: './AuthKey_XXXXXXXXXX.p8',  // .p8 파일 경로
    keyId: 'XXXXXXXXXX',
    teamId: 'YYYYYYYYYY',
  },
  production: process.env.NODE_ENV === 'production',
});

async function sendPush(deviceToken, title, body, data = {}) {
  const notification = new apn.Notification();
  notification.alert = { title, body };
  notification.sound = 'default';
  notification.payload = data;
  notification.topic = 'com.mycompany.myapp';

  const result = await provider.send(notification, deviceToken);

  if (result.failed.length > 0) {
    const error = result.failed[0].response;
    if (error.reason === 'BadDeviceToken' || error.reason === 'Unregistered') {
      // 토큰 무효 — DB에서 삭제
      await removeDeviceToken(deviceToken);
    }
  }
}
```

---

## 5. Push 알림 수신 및 처리

### 포그라운드 vs 백그라운드 동작 차이

iOS의 Push 처리는 앱 상태에 따라 동작이 완전히 달라집니다.

| 앱 상태 | 처리 경로 | 표시 방식 |
|---------|-----------|----------|
| 포그라운드 | `willPresent(_:)` | `completionHandler`로 결정 |
| 백그라운드 / 서스펜드 | 시스템이 자동 표시 | `aps.alert` 기반으로 배너 표시 |
| 종료(killed) | 시스템이 자동 표시 | 동일 |
| Silent Push | `didReceiveRemoteNotification` | 없음 (앱 코드만 실행) |

COMPARE_BLOCK:notification_push_handling

### 앱 시작 원인 판별

알림을 탭해서 앱이 실행된 경우, `launchOptions`에서 알림 페이로드를 꺼낼 수 있습니다.

```swift
func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
) -> Bool {

    // 알림 탭으로 앱이 시작된 경우
    if let notificationPayload = launchOptions?[.remoteNotification] as? [String: Any] {
        // cold start에서의 딥링크 처리
        handleInitialDeepLink(from: notificationPayload)
    }

    return true
}
```

SceneDelegate 기반 앱에서는:

```swift
func scene(_ scene: UIScene, willConnectTo session: UISceneSession,
           options connectionOptions: UIScene.ConnectionOptions) {

    if let notificationResponse = connectionOptions.notificationResponse {
        // 알림에서 앱 실행 — 딥링크 처리
        DeepLinkHandler.shared.handle(response: notificationResponse)
    }
}
```

---

## 6. Silent Push와 백그라운드 업데이트

### Silent Push의 역할

Silent Push는 사용자에게 보이는 알림 없이 앱을 백그라운드에서 깨워 데이터를 갱신하는 메커니즘입니다. 채팅 앱에서 메시지 목록을 미리 갱신하거나, 뉴스 앱이 최신 기사를 캐시하는 데 활용됩니다.

**APNs 페이로드 구조**:
```json
{
  "aps": {
    "content-available": 1
  },
  "type": "SYNC",
  "version": 42
}
```

`content-available: 1`만 있고 `alert`, `sound`, `badge`가 없으면 Silent Push입니다.

COMPARE_BLOCK:notification_silent_push

### Silent Push 제약과 실무 대응

iOS는 Silent Push를 **rate limiting** 합니다. 너무 자주 보내거나, 앱이 `completionHandler`를 `.failed`로 호출하거나, 배터리 최적화를 무시한다고 판단하면 이후 Silent Push를 무시합니다.

**실무 체크리스트**:
1. `completionHandler`를 반드시 호출하고, 결과를 정확히 보고하세요 (`.newData` / `.noData` / `.failed`).
2. 30초 이내에 작업을 완료하세요. 장시간 작업은 `BGTaskScheduler`로 위임하세요.
3. Doze 모드에 대응하는 Android WorkManager와 달리, iOS는 `BGAppRefreshTask`가 보조 수단입니다.
4. 시뮬레이터에서는 Silent Push를 테스트할 수 없습니다 — 실기기 필수.

### BGAppRefreshTask와의 조합

Silent Push가 throttle될 경우를 대비해 `BGAppRefreshTask`를 함께 사용하는 것이 실무 표준입니다.

```swift
// Info.plist 설정 필요
// Key: BGTaskSchedulerPermittedIdentifiers
// Value: ["com.myapp.refresh", "com.myapp.processing"]

// 앱 시작 시 등록
BGTaskScheduler.shared.register(forTaskWithIdentifier: "com.myapp.refresh", using: nil) { task in
    handleAppRefresh(task: task as! BGAppRefreshTask)
}
```

---

## 7. Rich Notification

### Notification Service Extension (NSE)

NSE는 APNs 페이로드가 기기에 도착한 뒤, 시스템이 사용자에게 표시하기 **직전**에 실행되는 별도 프로세스입니다. 앱이 꺼져 있어도 동작합니다.

```
APNs → iOS → [NSE 실행: 최대 30초, ~24MB] → 수정된 콘텐츠 → 사용자에게 표시
```

**NSE가 필요한 경우**:
- 이미지/동영상/오디오 첨부 다운로드
- 종단간 암호화(E2E) 메시지 복호화
- 배지 카운트 서버 동기화
- 알림 내용 A/B 테스트 (서버 결정 → 클라이언트 적용)

**NSE 생성**: Xcode → File → New → Target → Notification Service Extension

COMPARE_BLOCK:notification_rich

### Notification Content Extension (NCE)

NCE는 알림을 길게 누르거나 3D Touch(Peek)할 때 표시되는 **완전한 커스텀 UI**입니다. 일반 UIViewController 서브클래스이므로 UIKit/SwiftUI를 자유롭게 사용할 수 있습니다.

```
Info.plist (NCE 타겟):
NSExtension → NSExtensionAttributes → UNNotificationExtensionCategory: "CUSTOM_CATEGORY"
UNNotificationExtensionInitialContentSizeRatio: 0.5  (높이 비율)
UNNotificationExtensionDefaultContentHidden: true    (기본 알림 UI 숨김)
```

**NCE 활용 예시**:
- 지도 앱: 알림에서 배달 기사 위치를 MKMapView로 표시
- 주문 앱: 쿠폰 바코드를 알림에서 직접 표시
- 미디어 앱: 음악 재생/정지 컨트롤 + 앨범아트 표시

---

## 8. 알림 카테고리와 인터랙티브 액션

### 카테고리 시스템 설계

iOS의 알림 액션은 **카테고리**로 묶어서 등록합니다. 카테고리 identifier가 APNs 페이로드의 `"category"` 키와 매핑되어, 서버가 알림 유형을 지정하면 클라이언트에 등록된 액션들이 자동으로 붙습니다.

COMPARE_BLOCK:notification_category_action

### 텍스트 인라인 입력 (Direct Reply)

iOS의 `UNTextInputNotificationAction`은 Android의 `RemoteInput`과 동일한 역할입니다. 사용자가 알림에서 앱을 열지 않고 직접 텍스트를 입력할 수 있습니다.

```swift
let replyAction = UNTextInputNotificationAction(
    identifier: "REPLY_ACTION",
    title: "답장",
    options: [],
    textInputButtonTitle: "전송",       // 키보드 완료 버튼 레이블
    textInputPlaceholder: "메시지..."   // 입력 필드 플레이스홀더
)

// Delegate에서 입력된 텍스트 꺼내기
if let textResponse = response as? UNTextInputNotificationResponse {
    let text = textResponse.userText
}
```

### Siri Suggestions & Communication Notifications (iOS 15+)

`INSendMessageIntent`를 알림에 연결하면 Siri가 해당 연락처를 학습하고, 집중 모드(Focus)에서 특정 연락처의 알림만 허용하는 필터링에 활용됩니다.

```swift
// 메시지 카테고리에 intentIdentifiers 연결
let messageCategory = UNNotificationCategory(
    identifier: "MESSAGE",
    actions: [replyAction, likeAction],
    intentIdentifiers: ["INSendMessageIntent"],  // Communication Notification
    options: []
)

// 실제 알림 전달 시 Intent 첨부 (NSE 또는 로컬 알림)
let intent = INSendMessageIntent(/* ... */)
let interaction = INInteraction(intent: intent, response: nil)
await interaction.donate()

let updatedContent = try content.updating(from: intent)
```

---

## 9. Notification Service Extension 심화

### NSE 아키텍처 상세

COMPARE_BLOCK:notification_extension

### NSE에서 앱과 데이터 공유

NSE는 앱과 별개의 프로세스이므로, 일반 UserDefaults나 파일 시스템을 공유할 수 없습니다. **App Group**을 사용해야 합니다.

```swift
// Xcode > 앱 타겟 > Signing & Capabilities > App Groups: com.mycompany.myapp.shared
// NSE 타겟에도 동일한 App Group 추가

// 앱과 NSE 모두에서 동일한 코드로 공유 데이터 접근
let sharedDefaults = UserDefaults(suiteName: "group.com.mycompany.myapp")!
sharedDefaults.set(42, forKey: "unreadCount")

// 공유 파일 컨테이너
let containerURL = FileManager.default
    .containerURL(forSecurityApplicationGroupIdentifier: "group.com.mycompany.myapp")!
let dbURL = containerURL.appendingPathComponent("shared.sqlite")
```

### E2E 암호화 알림 패턴

Signal, WhatsApp 등이 사용하는 패턴입니다. 서버는 암호화된 데이터만 APNs로 전송하고, NSE가 복호화하여 실제 메시지 내용을 보여줍니다.

```swift
// APNs 페이로드 (서버 → APNs)
// {
//   "aps": { "mutable-content": 1, "alert": { "title": "새 메시지" } },
//   "enc": "BASE64_ENCRYPTED_DATA",
//   "kid": "KEY_ID"
// }

// NSE에서 복호화
override func didReceive(_ request: UNNotificationRequest, ...) {
    guard let encryptedData = request.content.userInfo["enc"] as? String,
          let keyId = request.content.userInfo["kid"] as? String else { return }

    // Keychain에서 복호화 키 읽기 (App Group Keychain 접근)
    let key = KeychainManager.shared.retrieveKey(id: keyId)
    let decrypted = CryptoManager.decrypt(encryptedData, key: key)

    bestAttemptContent?.title = decrypted.senderName
    bestAttemptContent?.body = decrypted.message
    contentHandler?(bestAttemptContent!)
}
```

---

## 10. Background Fetch와 알림의 통합

### Background Fetch 개요

Background Fetch는 iOS가 앱 사용 패턴을 학습하여 **최적의 타이밍**에 앱을 백그라운드에서 깨우는 메커니즘입니다. Silent Push가 서버 주도인 반면, Background Fetch는 시스템 주도입니다.

```swift
// Info.plist: UIBackgroundModes 배열에 "fetch" 추가

// iOS 13+: BGAppRefreshTask 사용 (권장)
// iOS 12 이하: application(_:performFetchWithCompletionHandler:)
```

### BGTaskScheduler 실무 설정

```swift
// AppDelegate.swift
func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
) -> Bool {
    BackgroundTaskManager.registerTasks()
    return true
}

// 앱이 백그라운드로 진입할 때 다음 실행 예약
func applicationDidEnterBackground(_ application: UIApplication) {
    BackgroundTaskManager.scheduleAppRefresh()
}
```

### 백그라운드 업데이트 후 로컬 알림 발송 패턴

백그라운드에서 새 데이터를 가져온 뒤 로컬 알림으로 사용자에게 알리는 패턴입니다.

```swift
func handleAppRefresh(task: BGAppRefreshTask) {
    task.expirationHandler = { task.setTaskCompleted(success: false) }

    Task {
        do {
            let newItems = try await ContentRepository.shared.fetchLatest()

            if !newItems.isEmpty {
                // 새 데이터 있으면 로컬 알림 발송
                let content = UNMutableNotificationContent()
                content.title = "새 콘텐츠 도착"
                content.body = "\\(newItems.count)개의 새로운 항목이 있습니다."
                content.sound = .default

                let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 1, repeats: false)
                let request = UNNotificationRequest(
                    identifier: "bg_update_\\(Date().timeIntervalSince1970)",
                    content: content,
                    trigger: trigger
                )
                try? await UNUserNotificationCenter.current().add(request)
            }

            // 다음 실행 예약
            BackgroundTaskManager.scheduleAppRefresh()
            task.setTaskCompleted(success: true)
        } catch {
            task.setTaskCompleted(success: false)
        }
    }
}
```

---

## 11. 알림 테스트와 디버깅

### 시뮬레이터에서 Push 테스트 (Xcode 11.4+)

Xcode 11.4부터 시뮬레이터에서 Push 알림을 직접 시뮬레이션할 수 있습니다.

```bash
# .apns 파일 드래그&드롭 또는 xcrun 명령어 사용
xcrun simctl push <SIMULATOR_UDID> com.mycompany.myapp payload.apns
```

```json
// payload.apns
{
  "Simulator Target Bundle": "com.mycompany.myapp",
  "aps": {
    "alert": {
      "title": "테스트 알림",
      "body": "시뮬레이터 Push 테스트입니다."
    },
    "badge": 1,
    "sound": "default"
  },
  "customKey": "customValue"
}
```

### 실기기 APNs 테스트

```bash
# APNs 직접 호출 테스트 (curl + HTTP/2)
# .p8 키로 JWT 생성 후:

curl -v \
  --http2 \
  -H "apns-topic: com.mycompany.myapp" \
  -H "apns-push-type: alert" \
  -H "authorization: bearer $JWT_TOKEN" \
  -d '{"aps":{"alert":{"title":"Test","body":"Hello"},"sound":"default"}}' \
  https://api.sandbox.push.apple.com/3/device/$DEVICE_TOKEN
```

### 알림 관련 주요 디버깅 포인트

| 증상 | 원인 | 해결 |
|------|------|------|
| APNs 토큰 획득 안 됨 | 시뮬레이터 사용 | 실기기로 테스트 |
| APNs 토큰 획득 안 됨 | Push Notifications capability 없음 | Xcode > Signing & Capabilities 확인 |
| Silent Push 동작 안 함 | Background Modes > Remote notifications 없음 | Info.plist / Capabilities 확인 |
| 포그라운드 알림 안 보임 | `willPresent` completionHandler에 `.banner` 없음 | completionHandler 옵션 확인 |
| 액션 버튼 안 보임 | 카테고리 등록 안 됨 | `setNotificationCategories` 호출 확인 |
| NSE 실행 안 됨 | `mutable-content: 1` 페이로드 없음 | 서버 페이로드 확인 |

---

## 12. 알림 설계 실무 가이드

### 알림 설계 원칙

1. **적시성(Timely)**: 사용자가 필요한 정확한 순간에만 발송하세요. 마케팅 알림을 너무 자주 보내면 알림을 완전히 끄는 원인이 됩니다.

2. **관련성(Relevant)**: 수신자와 관련된 정보만 포함하세요. 모든 사용자에게 동일한 알림을 보내는 브로드캐스트는 지양합니다.

3. **실행 가능성(Actionable)**: 알림을 탭했을 때 정확히 관련된 화면으로 이동해야 합니다. 앱 홈 화면으로 이동하는 알림은 사용자 경험을 해칩니다.

### iOS 알림 심사 주의사항

- `criticalAlert` 옵션(방해금지 모드 무시): 의료/안전 앱에만 특별 승인 후 사용 가능
- 과도한 알림으로 사용자가 앱을 신고하면 App Store 심사에서 불이익 가능
- APNS-Priority: 10(즉시)과 5(절전 우선)을 적절히 구분하여 사용

### 주요 API 요약표

| 기능 | iOS API | Android 대응 | 웹 대응 |
|------|---------|-------------|--------|
| 권한 요청 | `requestAuthorization()` | `registerForActivityResult` | `Notification.requestPermission()` |
| 로컬 알림 예약 | `UNCalendarNotificationTrigger` | `AlarmManager.setExactAndAllowWhileIdle` | `TimestampTrigger` (실험적) |
| Push 토큰 | `didRegisterForRemoteNotificationsWithDeviceToken` | `FirebaseMessaging.token` | `PushManager.subscribe()` |
| 포그라운드 처리 | `willPresent(_:withCompletionHandler:)` | `onMessageReceived()` | `push` 이벤트 (SW) |
| 백그라운드 처리 | `didReceiveRemoteNotification(_:fetchCompletionHandler:)` | `onMessageReceived()` | `push` 이벤트 (SW) |
| 페이로드 변환 | Notification Service Extension | `onMessageReceived()` | `push` 이벤트 (SW) |
| 커스텀 UI | Notification Content Extension | `RemoteViews` | 브라우저 기본 UI만 |
| 인터랙티브 액션 | `UNNotificationAction` | `NotificationCompat.Action` | `actions` 옵션 |
| 인라인 답장 | `UNTextInputNotificationAction` | `RemoteInput` | 미지원 |
| 백그라운드 갱신 | `BGAppRefreshTask` | `WorkManager` | `Background Sync` |
