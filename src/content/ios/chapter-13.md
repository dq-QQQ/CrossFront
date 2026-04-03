# Chapter 13. 성능 & 디버깅

앱이 출시된 이후 진짜 전쟁이 시작됩니다. 기능이 아무리 훌륭해도 느리고, 배터리를 잡아먹고, 메모리를 누수하면 사용자는 삭제합니다. 이 챕터에서는 iOS 성능 도구를 실무 수준에서 다룹니다. Instruments의 주요 도구, MetricKit 실서비스 지표 수집, Memory Graph Debugger, os_log/Logger 구조화 로깅, XCTest 성능 측정, Core Animation 프로파일링, 에너지 영향 분석까지 — Android/웹 환경과 대응하는 도구를 나란히 비교하면서 배웁니다.

---

## 1. 로깅: os_log / Logger

### iOS 로깅 시스템의 철학

Android에서 `Log.d(TAG, message)`를 쓰고, 웹에서 `console.log()`를 쓰듯 iOS도 로그 API가 있습니다. 하지만 철학이 다릅니다. iOS 로깅 시스템(Unified Logging System)은 두 가지 문제를 동시에 해결합니다:

1. **성능**: 릴리즈 빌드에서 디버그 로그는 문자열을 아예 구성하지 않습니다. 로그 레벨 판단은 컴파일러 수준에서 처리됩니다.
2. **개인정보 보호**: 기본적으로 동적 문자열은 릴리즈 빌드에서 `<private>`로 마스킹됩니다. 의도적으로 `.public`을 선언해야만 외부에서 읽을 수 있습니다.

| 항목 | iOS (Logger) | Android (Timber) | Web (winston/pino) |
|------|-------------|------------------|--------------------|
| API | `Logger(subsystem:category:)` | `Timber.plant()` | `winston.createLogger()` |
| 레벨 | debug/info/notice/error/fault | v/d/i/w/e | debug/info/warn/error |
| 개인정보 | `.public` / `.private` 명시 | 수동 처리 | 수동 마스킹 |
| 성능 | 릴리즈 debug 로그 거의 0 오버헤드 | ProGuard로 제거 | 레벨 필터링 |
| 시각화 | Console.app | Logcat | Kibana/Grafana |
| 구조화 | subsystem + category | TAG | JSON 필드 |

### Logger vs OSLog

iOS 14부터 `Logger` 타입이 추가되어 `os_log` 함수 대비 훨씬 편하게 사용할 수 있습니다.

```swift
import OSLog

// iOS 14+ 권장: Logger
private let logger = Logger(subsystem: "com.example.MyApp", category: "Network")
logger.debug("요청 시작: \(url, privacy: .public)")

// iOS 10+ 호환: OSLog + os_log 함수
let log = OSLog(subsystem: "com.example.MyApp", category: "Network")
os_log("요청 시작: %{public}@", log: log, type: .debug, url.absoluteString)
```

`Logger`는 Swift String Interpolation을 활용하므로 타입 안전성이 높고, 자동완성도 잘 됩니다. 하위 호환이 필요 없다면 `Logger`를 사용하세요.

### Privacy 수준

```swift
logger.debug("userID=\(userID, privacy: .private)")    // 릴리즈: "<private>"
logger.info("statusCode=\(code, privacy: .public)")    // 항상 노출
logger.error("error=\(error.localizedDescription, privacy: .public)")
// .sensitive — iOS 15+, .private보다 강화
// .auto — 스칼라 타입은 .public, 기타는 .private
```

실수로 민감 정보를 로그에 남기는 일을 시스템이 기본값으로 막아줍니다. Android나 웹에서는 개발자가 직접 `userId = "[REDACTED]"` 같은 처리를 해야 했던 것과 대조됩니다.

### Console.app 활용

macOS의 Console.app을 실행하면 연결된 기기에서 실시간으로 로그를 스트리밍할 수 있습니다.

- **필터 예시**: `subsystem:com.example.MyApp category:Network level:debug`
- `process:MyApp` 필터로 앱 로그만 분리
- 타임스탬프, 프로세스, PID, 스레드 정보가 자동 포함

### OSSignpost — 성능 마커

`os_signpost`는 로그가 아닌 **타임라인 마커**입니다. Instruments의 "Points of Interest" 트랙에 구간으로 표시되어 어느 작업이 얼마나 걸렸는지 시각적으로 확인할 수 있습니다.

```swift
import os.signpost

let spLog = OSLog(subsystem: "com.example.MyApp", category: .pointsOfInterest)
let sid = OSSignpostID(log: spLog)

os_signpost(.begin, log: spLog, name: "ImageDecode", signpostID: sid)
decodeImage(data)
os_signpost(.end, log: spLog, name: "ImageDecode", signpostID: sid)
```

COMPARE_BLOCK:performance_os_log

> 💡 **Android 개발자라면**: Timber의 `CrashReportingTree`처럼 iOS도 `Logger`를 래핑해 Crashlytics 연동 레이어를 만들 수 있습니다. 단 릴리즈 빌드에서 `.private` 값은 Crashlytics에도 마스킹된 채 전달되므로, 오류 문맥에 필요한 정보는 명시적으로 `.public`으로 선언해야 합니다.

> 💡 **웹 개발자라면**: winston의 `child logger`처럼 Logger 인스턴스를 모듈별로 분리해 사용합니다. `subsystem`은 앱 전체(Bundle ID), `category`는 Network/Database/UI 같은 기능 단위로 구분하면 Console.app 필터링이 편해집니다.

---

## 2. Instruments — 성능 프로파일링 도구

### Instruments란

Instruments는 Xcode에 번들된 **성능 분석 통합 플랫폼**입니다. Android Studio의 Profiler, Chrome DevTools의 Performance 탭이 각각 별도의 UI를 갖듯, Instruments는 여러 **템플릿**을 선택해 사용합니다. 실기기 또는 시뮬레이터 양쪽에서 동작하지만, 정확한 CPU/메모리/배터리 측정은 실기기가 필수입니다.

### 주요 템플릿 목록

| 템플릿 | 주요 용도 | Android 대응 | Web 대응 |
|--------|----------|-------------|---------|
| Time Profiler | CPU 병목 함수 추적 | CPU Profiler (Sampled) | Performance 탭 |
| Allocations | 메모리 할당/해제 패턴 | Memory Profiler | Memory 탭 Allocation |
| Leaks | 메모리 누수 탐지 | LeakCanary | Memory Heap Snapshot |
| Network | URLSession 요청 타임라인 | Network Profiler | Network 탭 |
| Core Animation | 렌더링 FPS, 오프스크린 | GPU Rendering | Rendering 탭 |
| Energy Log | 배터리 소모 원인 | Battery Historian | Lighthouse |
| System Trace | CPU 스케줄링, I/O, 락 | Perfetto/Systrace | N/A |
| Metal System Trace | GPU 성능 (게임/그래픽) | Mali GPU Profiler | WebGL Inspector |

### Instruments 기본 사용법

1. **실행**: `Xcode → Product → Profile` (`⌘I`) — 릴리즈 최적화 빌드로 프로파일링 빌드 생성
2. **템플릿 선택**: 원하는 분석 목적에 맞게 선택
3. **Record**: 빨간 버튼 클릭 → 앱 실행 → 분석하고 싶은 시나리오 재현
4. **Stop**: 데이터 수집 종료 → 타임라인/트리 분석

> ⚠️ Debug 빌드에서 프로파일링하면 최적화가 꺼져 있어 수치가 실제와 크게 다릅니다. 항상 **Release 빌드** 또는 **Profile 빌드**로 측정하세요.

### Time Profiler 심화

Time Profiler는 일정 간격(기본 1ms)으로 스레드의 콜스택을 샘플링합니다. 샘플이 많이 찍힌 함수 = CPU 시간을 많이 쓰는 함수입니다.

**핵심 설정**:
- `Invert Call Tree` 체크: 리프 함수(실제 실행된 함수)가 최상단에 표시됨
- `Hide System Libraries` 체크: UIKit/Foundation 내부 제거 → 앱 코드만 표시
- `Separate by Thread` 체크: 메인/백그라운드 스레드 분리 분석
- `Separate by State` 체크: Running/Idle 상태별 분리

**분석 워크플로우**:
1. 느린 시나리오 재현 (스크롤 버벅임, 전환 애니메이션 딜레이 등)
2. Invert Call Tree + Hide System Libraries 활성화
3. 상위 함수 클릭 → "Open in Xcode" → 소스 코드로 이동
4. 핫스팟 함수 최적화 → 재측정으로 개선 확인

COMPARE_BLOCK:performance_time_profiler

---

## 3. 메모리 관리: ARC vs GC

### ARC의 근본적 차이

iOS의 ARC(Automatic Reference Counting)는 JVM GC, JavaScript GC와 패러다임이 다릅니다. GC는 런타임에 주기적으로 도달 불가 객체를 찾아 수거하지만, ARC는 컴파일러가 **retain/release 호출을 코드에 직접 삽입**합니다. 참조 횟수가 0이 되는 순간 즉시 해제됩니다.

결과적으로:
- **STW(Stop-The-World) 없음**: GC 일시 정지가 없어 애니메이션이 안정적
- **예측 가능한 해제 시점**: `deinit`이 참조 횟수가 0이 되는 즉시 호출
- **순환 참조는 직접 해결**: GC는 순환 참조도 수거하지만, ARC는 못 함 → `weak`/`unowned` 필요

### 값 타입의 중요성

Swift에서 `struct`와 `enum`은 값 타입입니다. 힙이 아닌 **스택**에 저장되거나 포함하는 타입 안에 인라인으로 배치됩니다. ARC 참조 계수가 없으므로 성능 오버헤드가 없습니다.

```swift
// struct: 스택 할당, ARC 없음
struct Coordinate { var lat: Double; var lng: Double }

// class: 힙 할당, ARC 참조 계수
class LocationManager { var current: Coordinate = .init(lat: 0, lng: 0) }
```

실무에서 모델 타입을 `class` 대신 `struct`로 선언하는 이유가 여기 있습니다. 불필요한 힙 할당과 ARC 오버헤드를 없애는 설계입니다.

### Copy-on-Write

Array, Dictionary, String 등 표준 라이브러리의 값 타입은 **Copy-on-Write(CoW)**를 지원합니다. 복사 시점이 아닌 변경 시점에 실제 복사가 일어납니다.

```swift
var arr1 = [1, 2, 3, 4, 5]   // 힙 버퍼 A
var arr2 = arr1               // arr2는 버퍼 A를 공유 (복사 없음)
arr2.append(6)                // 이 순간 버퍼 B 생성 → arr2만 B 사용
// arr1: [1,2,3,4,5] — 버퍼 A, arr2: [1,2,3,4,5,6] — 버퍼 B
```

COMPARE_BLOCK:performance_memory_management

> 💡 **Android 개발자라면**: Kotlin의 `data class`는 JVM의 참조 타입이라 GC 대상입니다. Swift의 `struct`와 달리 힙에 할당됩니다. Kotlin의 `inline class`(값 클래스, `@JvmInline value class`)가 어느 정도 유사하지만 제약이 있습니다.

> 💡 **웹 개발자라면**: JS의 `let a = { x: 1 }; let b = a`는 참조 복사입니다. Swift의 `let b = a` (struct)는 독립적인 복사본입니다. 이 차이를 이해하면 Swift 코드 읽기가 훨씬 자연스러워집니다.

---

## 4. Retain Cycle — 메모리 누수의 주범

### retain cycle이란

ARC에서 객체 A가 B를 strong 참조하고, B가 A를 strong 참조하면 두 객체의 참조 횟수가 절대 0이 되지 않습니다. 서로 붙잡고 있으므로 외부에서 아무도 참조하지 않아도 해제되지 않는 **순환 참조(retain cycle)**가 발생합니다.

```
FeedViewController ──strong──▶ FeedViewModel
        ▲                             │
        └─────strong (클로저 캡처)────┘
        → 서로 붙잡아 둘 다 해제 불가
```

### weak vs unowned

두 가지 약한 참조로 사이클을 끊습니다:

| | `weak` | `unowned` |
|---|--------|-----------|
| 타입 | `Optional` (`T?`) | non-Optional (`T`) |
| 대상 해제 시 | 자동으로 `nil` | 크래시 (해제 후 접근 시) |
| 사용 시점 | 대상이 먼저 해제될 수 있을 때 | 대상이 항상 살아있음을 보장할 때 |
| 오버헤드 | 약간 있음 (nil 처리 로직) | 없음 |

```swift
// weak 예시: ViewController → ViewModel 참조가 더 오래 살 수 있음
viewModel.onDataLoaded = { [weak self] in
    self?.tableView.reloadData()   // self가 nil이면 무시
}

// unowned 예시: 클로저가 반드시 owner보다 짧게 살 때
button.addAction(UIAction { [unowned self] _ in
    self.handleTap()
}, for: .touchUpInside)
```

### Combine에서의 retain cycle

Combine의 `sink`에서도 자주 발생합니다.

```swift
// ❌ retain cycle
viewModel.$items
    .sink { items in self.updateUI(items) }   // self 강한 참조
    .store(in: &cancellables)

// ✅ 올바른 패턴
viewModel.$items
    .sink { [weak self] items in self?.updateUI(items) }
    .store(in: &cancellables)
```

`cancellables` Set이 ViewController 안에 있고, `sink` 클로저가 ViewController를 강하게 참조하면 사이클이 됩니다. `[weak self]`로 항상 끊어줘야 합니다.

### Memory Graph Debugger

Xcode에 내장된 **Memory Graph Debugger**는 retain cycle 탐지의 가장 강력한 도구입니다.

1. 앱 실행 중 Xcode Debug Navigator 하단의 메모리 그래프 버튼 클릭 (`⌥⌘M`)
2. 모든 살아있는 객체가 노드/엣지 그래프로 표시됨
3. retain cycle이 있으면 노드에 보라색 배지 표시
4. 의심 객체 클릭 → 좌측 패널에서 참조 경로 확인
5. "Open in Xcode" → 어디서 참조가 생겼는지 소스 추적

### deinit 테스트

가장 간단하고 확실한 방법:

```swift
class FeedViewController: UIViewController {
    deinit {
        print("✅ FeedViewController deinit")
        // 이 로그가 안 뜨면 → retain cycle 의심
    }
}
```

화면을 닫을 때 `deinit`이 호출되지 않으면 누수입니다. `weak self`를 빠뜨린 클로저부터 확인하세요.

COMPARE_BLOCK:performance_retain_cycle

---

## 5. Instruments Allocations & Leaks

### Allocations — 메모리 할당 패턴 분석

Allocations는 모든 메모리 할당/해제 이벤트를 기록합니다. **용도**:
- 특정 시나리오에서 얼마나 많은 객체가 생성되는지 확인
- 할당이 계속 늘어나는데 해제되지 않는 타입 식별
- "Generation" 비교로 두 시점 사이 살아남은 객체 분석

**Generation 비교 절차**:
1. Allocations 녹화 시작
2. `Mark Generation A` 버튼 클릭 (초기 상태 기록)
3. 화면 이동 → 다시 원래 화면으로 복귀
4. `Mark Generation B` 버튼 클릭
5. B Generation 클릭 → A 이후 새로 생성되어 **살아남은** 객체 목록
6. 정상이면 화면 왕복 후 할당량이 원래대로 돌아와야 함

### Leaks — 실시간 누수 탐지

Leaks는 GC가 없는 iOS에서 **도달 불가 메모리 블록**을 탐지합니다. 타임라인에서 빨간 X 표시가 뜨면 누수입니다.

- `Leaked Objects` 뷰: 누수된 객체 타입, 크기, 할당 콜스택
- `Cycles & Roots` 뷰: retain cycle 시각화 (어떤 객체들이 사이클을 형성하는지)

### 실무 분석 루틴

```
① 앱 실행 → Instruments Allocations 시작
② 시나리오 반복 5회 (동일 화면 진입/이탈)
③ 메모리 그래프 "All Heap & Anonymous VM" → Persistent Bytes 추세 확인
④ 계속 증가하면 → Leaks로 전환해 누수 타입 식별
⑤ Memory Graph Debugger로 참조 경로 추적
⑥ 수정 후 재측정
```

---

## 6. XCTest 성능 측정

### measure{} 기본 사용법

XCTest의 `measure {}` 블록은 코드를 **10회 반복** 실행하고 평균/표준편차를 측정합니다. 첫 실행은 워밍업으로 제외됩니다.

```swift
func testFeedParsePerformance() throws {
    let jsonData = try loadTestJSON("test_feed_100")
    measure {
        _ = FeedParser.parse(jsonData)
    }
}
```

결과: `"testFeedParsePerformance: average: 0.002 sec, relative standard deviation: 3.4%"`

### 성능 베이스라인 설정

Xcode에서 한 번 실행 후 "Set Baseline" 버튼을 누르면 기준값이 저장됩니다. 이후 측정이 베이스라인 ±10% 초과 시 테스트가 자동으로 실패합니다. CI/CD 파이프라인에 포함하면 성능 회귀를 자동으로 감지할 수 있습니다.

### 특정 메트릭 측정 (Xcode 13+)

```swift
// 메모리 할당량 측정
measure(metrics: [XCTMemoryMetric()]) { ... }

// CPU + 메모리 + 저장소 + 클럭 동시 측정
measure(metrics: [
    XCTCPUMetric(),
    XCTMemoryMetric(),
    XCTStorageMetric(),
    XCTClockMetric(),
]) { ... }
```

### 셋업/티어다운 제외

셋업 코드를 측정에서 제외하려면 `measureMetrics` + `startMeasuring()`/`stopMeasuring()` 조합을 사용합니다.

```swift
func testDatabaseQueryPerformance() {
    var db: TestDatabase!
    measureMetrics([.wallClockTime], automaticallyStartMeasuring: false) {
        db = TestDatabase.inMemory()   // 측정 제외
        db.populate()

        startMeasuring()               // 측정 시작
        _ = db.query("SELECT * FROM feed")
        stopMeasuring()               // 측정 종료

        db.close()                    // 측정 제외
    }
}
```

### UI 성능 측정

```swift
func testScrollPerformance() {
    let app = XCUIApplication()
    app.launch()
    measure(metrics: [XCTCPUMetric(), XCTMemoryMetric()]) {
        app.swipeUp()
        app.swipeUp()
        app.swipeUp()
    }
}
```

COMPARE_BLOCK:performance_xctest_measure

> 💡 **Android 개발자라면**: Jetpack Benchmark의 `benchmarkRule.measureRepeated`와 동일한 개념입니다. 단, Jetpack은 JIT 워밍업까지 포함한 실환경을 더 잘 시뮬레이션합니다. iOS의 `measure`도 실기기 Profile 빌드에서 실행해야 JIT 없는 AOT 환경을 반영합니다.

> 💡 **웹 개발자라면**: Vitest의 `bench()`와 유사합니다. 반복 횟수와 통계를 자동으로 처리해 줍니다. XCTest의 차이는 "베이스라인 설정 후 회귀 감지"가 IDE에 내장되어 있다는 점입니다.

---

## 7. MetricKit — 실서비스 성능 수집

### MetricKit란

개발 환경에서 측정한 수치는 실제 사용자의 기기와 다릅니다. iOS 13에 도입된 **MetricKit**는 앱이 실서비스에서 실행되는 동안 시스템이 수집한 **집계된 성능 지표를 앱에 배달**합니다. 별도 서버 인프라 없이 실사용자 기준 데이터를 받을 수 있습니다.

**배달 주기**: 24시간에 1회, 앱이 포그라운드로 전환될 때

**수집 항목**:
- 앱 실행 시간 (Cold Launch / Resume)
- CPU 시간
- 메모리 피크 및 평균
- 네트워크 (Cellular/Wi-Fi 전송량)
- Hang (메인 스레드 블로킹) 횟수 및 지속시간
- Disk I/O
- 앱 강제 종료 원인 (메모리 압박, 감시자 타임아웃 등)

### MXDiagnosticPayload (iOS 14+)

MetricKit의 진단 페이로드는 크래시/Hang 직후 콜스택과 함께 배달됩니다. Crashlytics 같은 서드파티 없이도 기본 크래시 리포트를 직접 수집할 수 있습니다.

```swift
func didReceive(_ payloads: [MXDiagnosticPayload]) {
    for payload in payloads {
        payload.crashDiagnostics?.forEach { crash in
            let stack = crash.callStackTree.jsonRepresentation()
            // 자체 백엔드로 전송
            CrashReporter.send(crashStack: stack)
        }
        payload.hangDiagnostics?.forEach { hang in
            let duration = hang.hangDuration.converted(to: .seconds).value
            Analytics.track("hang", duration: duration)
        }
    }
}
```

COMPARE_BLOCK:performance_metrickit

### Xcode Organizer

MetricKit로 직접 수집하지 않아도, Xcode Organizer(`Window → Organizer → Metrics`)에서 App Store 제출 앱의 집계 데이터를 볼 수 있습니다:

| 지표 | 의미 | 이상 기준 |
|------|------|---------|
| Hang Rate | 메인 스레드 블로킹 비율 | > 0.5% 주의 |
| Launch Time (P50) | 중간값 실행 시간 | > 400ms 주의 |
| Memory (Average) | 평균 메모리 | 기기별 다름 |
| Scrolling Hitches | 드롭 프레임 | > 5% 주의 |
| Terminations (Memory) | 메모리 부족 강제 종료 | 0이 목표 |

기기 모델, iOS 버전, 국가별 필터링이 가능해 특정 구형 기기에서만 발생하는 문제를 식별할 수 있습니다.

---

## 8. Core Animation 프로파일링

### 60fps/120fps의 의미

iOS는 기본 60fps, ProMotion 지원 기기(iPhone 13 Pro 이상)에서는 최대 120fps로 화면을 렌더링합니다. 각 프레임 예산:
- 60fps: 16.67ms
- 120fps: 8.33ms

메인 스레드가 이 시간 안에 레이아웃 계산, 드로잉, 사용자 이벤트 처리를 모두 마치지 못하면 **프레임 드롭**이 발생합니다. 사용자에게는 "버벅임"으로 느껴집니다.

### Core Animation 템플릿

Instruments의 Core Animation 템플릿은 다음을 측정합니다:

- **FPS 타임라인**: 프레임 드롭 발생 시점
- **Commit 시간**: UIKit이 렌더 트리를 렌더 서버에 커밋하는 시간
- **Tiling 시간**: 오프스크린 렌더링 비용

### Debug > Slow Animations

시뮬레이터에서 `Debug → Slow Animations` (`⌘T`)를 활성화하면 애니메이션 속도가 1/3로 느려집니다. 짧은 애니메이션의 불완전한 키프레임이나 레이아웃 점프를 육안으로 확인하기 좋습니다.

### Rendering 성능 최적화 포인트

**오프스크린 렌더링 피하기**:
```swift
// ❌ 오프스크린 렌더링 발생 (GPU 추가 패스 필요)
layer.cornerRadius = 8
layer.masksToBounds = true   // 모든 자식 뷰까지 클리핑

// ✅ iOS 13+: 배경이 불투명하면 오프스크린 없음
layer.cornerRadius = 8
layer.maskedCorners = [.layerMinXMinYCorner, .layerMaxXMinYCorner]
// 또는 layer.cornerCurve = .continuous (iOS 13+)
```

**레이어 불투명도**:
```swift
// 불투명 레이어는 블렌딩 불필요 → 빠름
view.isOpaque = true               // 권장
view.backgroundColor = .white      // 투명하지 않은 배경

// ❌ 알파 0.99는 opaque 처리 안 됨 → 블렌딩 발생
view.alpha = 0.99
```

**Debug > Color Blended Layers** (시뮬레이터):
- 빨간색: 블렌딩 발생 레이어 (성능 저하)
- 초록색: 불투명 레이어 (최적)
- 빨간 영역 최소화가 목표

**shouldRasterize**:
```swift
// 자주 변하지 않는 복잡한 레이어 계층을 비트맵으로 캐시
layer.shouldRasterize = true
layer.rasterizationScale = UIScreen.main.scale

// ⚠️ 자주 변하는 레이어에 쓰면 오히려 느려짐 — 신중히 사용
```

### UITableView/UICollectionView 최적화

```swift
// 셀 재사용 — 기본이지만 반드시 지켜야 함
override func tableView(_ tableView: UITableView,
    cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(
        withIdentifier: "FeedCell", for: indexPath
    ) as! FeedCell
    cell.configure(with: items[indexPath.row])
    return cell
}

// 셀 높이 미리 계산 (예상 높이 반환으로 초기 레이아웃 최적화)
override func tableView(_ tableView: UITableView,
    estimatedHeightForRowAt indexPath: IndexPath) -> CGFloat {
    return 80   // 대략적인 예상값
}

// UICollectionView Prefetching (iOS 10+)
collectionView.prefetchDataSource = self
// prefetchItemsAt: 에서 이미지/데이터 미리 로드
```

---

## 9. 지연 로딩 (Lazy Loading)

### lazy var의 실용적 활용

`lazy var`는 첫 접근 시 단 한 번 초기화됩니다. ViewController의 뷰 계층, 무거운 파서, 캐시 객체에 활용하면 앱 시작 속도를 높이고 불필요한 초기화를 방지합니다.

```swift
class ProfileViewController: UIViewController {
    // viewDidLoad 전에 접근하면 auto-size로 초기화되어 문제 발생 가능
    // lazy로 선언하면 첫 접근 시(=뷰 계층 구성 후) 초기화됨
    lazy var headerView: ProfileHeaderView = {
        let view = ProfileHeaderView()
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()
}
```

**주의점**: `lazy var`는 `let`이 아니므로 스레드 안전하지 않습니다. 멀티스레드 환경에서 동시에 첫 접근이 이뤄지면 두 번 초기화될 수 있습니다. 단일 스레드(메인 스레드) 접근이 보장된 곳에서 사용하세요.

COMPARE_BLOCK:performance_lazy_loading

---

## 10. 이미지 최적화

### 이미지가 메모리에 미치는 영향

이미지의 메모리 사용량은 파일 크기가 아닌 **픽셀 수 × 채널 수**로 결정됩니다.

```
4000 × 3000 픽셀 JPEG (파일: 3MB)
→ 메모리: 4000 × 3000 × 4바이트(ARGB) = 48MB
```

3MB 파일을 `UIImage(named:)`로 로드하면 메모리에 48MB를 차지합니다. 고해상도 이미지를 작은 썸네일로 표시할 때도 동일한 48MB가 올라갑니다.

### 다운샘플링 — 핵심 최적화

해결책은 **표시 크기에 맞게 디코딩**하는 것입니다. ImageIO의 `CGImageSourceCreateThumbnailAtIndex`를 사용하면 파일 전체를 디코딩하지 않고 원하는 크기로 바로 디코딩합니다.

```swift
// 80×80pt 이미지에 표시할 때 — @3x 기준 240×240px로 디코딩
let thumbnail = downsample(imageAt: url,
    to: CGSize(width: 80, height: 80),
    scale: UIScreen.main.scale)
// 메모리: 240×240×4 = 230KB → 48MB의 0.5%
```

Kingfisher의 `DownsamplingImageProcessor`가 이 작업을 자동으로 처리합니다.

### 이미지 캐시 전략

```
메모리 캐시 (NSCache): 빠름, 앱 종료/메모리 압박 시 해제
디스크 캐시: 느림, 앱 재실행 후에도 유지
```

Kingfisher 기본 설정:
- 메모리 캐시: 기기 RAM의 25% 또는 150MB 중 작은 값
- 디스크 캐시: 300MB, 7일 만료

실무에서는 메모리 캐시 상한을 앱 특성에 맞게 조정하고, 사용자가 로그아웃할 때 `ImageCache.default.clearCache()`를 호출해 다른 계정 데이터가 보이지 않도록 합니다.

COMPARE_BLOCK:performance_image_optimization

---

## 11. 백그라운드 작업: BGTaskScheduler

### iOS 백그라운드 실행 제약

iOS는 배터리와 개인정보 보호를 위해 백그라운드 실행을 엄격히 제한합니다. 앱이 백그라운드로 내려가면 곧 일시 정지(suspended) 상태가 됩니다.

| 방식 | 최대 시간 | 조건 | 용도 |
|------|---------|------|------|
| Background Fetch | 30초 | 시스템 재량 | 짧은 데이터 갱신 |
| BGProcessingTask | 수분 (1~30분) | 충전/유휴 조건 설정 가능 | DB 정리, 동기화 |
| Background URLSession | 무제한 | URLSession 완료 시 알림 | 대용량 다운로드/업로드 |
| Push Notification | 30초 | 서버 트리거 | Silent Push로 컨텐츠 갱신 |
| Location | 무제한 | 위치 권한 필요 | 위치 기반 서비스 |

**중요**: BGTaskScheduler는 **언제 실행될지 보장하지 않습니다.** 시스템이 배터리, 네트워크, 사용자 패턴을 고려해 실행 시점을 결정합니다. 시간이 중요한 작업에는 부적합합니다.

### Info.plist 등록 필수

```xml
<key>BGTaskSchedulerPermittedIdentifiers</key>
<array>
    <string>com.example.MyApp.sync</string>
    <string>com.example.MyApp.refresh</string>
</array>
```

등록하지 않은 identifier로 `BGTaskScheduler.shared.submit()`을 호출하면 런타임 예외가 발생합니다.

### Background URLSession

파일 다운로드/업로드는 BGTaskScheduler 대신 **Background URLSession**을 사용해야 합니다. 앱이 종료되어도 시스템이 다운로드를 이어받아 완료 후 앱을 깨웁니다.

```swift
let config = URLSessionConfiguration.background(withIdentifier: "com.example.MyApp.download")
config.isDiscretionary = true         // 시스템 재량 실행 허용 (배터리 최적화)
config.sessionSendsLaunchEvents = true // 완료 시 앱 재실행

let session = URLSession(configuration: config, delegate: self, delegateQueue: nil)
let task = session.downloadTask(with: url)
task.resume()
```

COMPARE_BLOCK:performance_background_task

> 💡 **Android 개발자라면**: WorkManager의 `Constraints`, `PeriodicWorkRequest`와 BGTaskScheduler의 `BGProcessingTaskRequest`가 대응됩니다. WorkManager는 최소 15분 주기를 보장하는 반면, BGTaskScheduler는 최소 주기를 보장하지 않고 시스템이 최적 시점을 결정합니다.

> 💡 **웹 개발자라면**: Service Worker의 `periodicsync` 이벤트와 개념적으로 유사합니다. 둘 다 "가능할 때 실행"이라는 재량적 스케줄링입니다. 차이는 BGTaskScheduler가 완전히 다른 프로세스에서 실행되는 것이 아닌 동일 앱 프로세스를 깨워 실행한다는 점입니다.

---

## 12. Energy Impact 분석

### 배터리 소모의 실제 원인

App Store에서 "배터리를 많이 먹는다"는 1성짜리 리뷰는 앱 삭제로 이어집니다. iOS에서 배터리 소모의 주요 원인:

1. **CPU 과다 사용**: 주기적 작업, 무한 루프, 효율 없는 알고리즘
2. **Network 과다 사용**: 불필요한 폴링, 작은 요청 다수 발송 (TCP 핸드셰이크 비용)
3. **Location**: GPS는 배터리 소모 1위. 필요 정확도보다 높은 레벨 요청 금지
4. **Accelerometer/Gyroscope**: 높은 샘플링 레이트를 앱이 백그라운드에서도 유지
5. **Display**: 밝기, 프레임 레이트

### Instruments Energy Log

Instruments의 Energy Log 템플릿은 다음을 타임라인으로 표시합니다:
- CPU 활성/유휴 상태
- 네트워크 라디오 활성 상태
- GPS 활성 상태
- 에너지 지출 등급 (High/Medium/Low)

**분석 포인트**:
- 사용자 인터랙션이 없는데 CPU가 계속 활성 상태 → 백그라운드 타이머/폴링 의심
- 네트워크 라디오가 짧은 간격으로 계속 켜짐 → 소규모 요청 배칭 필요

### Energy 최적화 실무 패턴

```swift
// 1. Timer 배칭 — 여러 타이머를 하나로 통합
// ❌ 5초마다 타이머 → CPU/라디오 자주 깨움
Timer.scheduledTimer(withTimeInterval: 5, repeats: true) { _ in
    self.syncSmallData()
}

// ✅ 30초마다 배칭 처리
Timer.scheduledTimer(withTimeInterval: 30, repeats: true) { _ in
    self.syncAllPendingData()   // 여러 작업을 한 번에
}

// 2. 네트워크 요청 배칭
// ❌ 좋아요마다 즉시 API 호출
func didTapLike(item: FeedItem) {
    api.postLike(itemId: item.id)
}

// ✅ 큐에 쌓고 30초마다 일괄 전송
class LikeQueue {
    private var pending: [String] = []
    private var flushTimer: Timer?

    func add(itemId: String) {
        pending.append(itemId)
        scheduleFlush()
    }

    private func scheduleFlush() {
        flushTimer?.invalidate()
        flushTimer = Timer.scheduledTimer(withTimeInterval: 30, repeats: false) { _ in
            self.flush()
        }
    }

    private func flush() {
        guard !pending.isEmpty else { return }
        api.postLikes(itemIds: pending)
        pending.removeAll()
    }
}

// 3. Location 정확도 단계적 요청
locationManager.desiredAccuracy = kCLLocationAccuracyHundredMeters
// 필요한 정밀도만 요청 — GPS 대신 Wi-Fi/셀룰러 기반 위치 사용 가능

// 4. Background task 에서 작업 완료 즉시 종료
func handleAppRefresh(task: BGAppRefreshTask) {
    Task {
        await syncData()
        task.setTaskCompleted(success: true)
        // 바로 완료 선언 → 시스템이 프로세스 재우도록 허용
    }
}
```

---

## 13. 실무 성능 최적화 체크리스트

앱을 출시 전 또는 성능 리그레션 조사 시 사용하는 점검 항목입니다.

### 시작 시간 (Launch Time)

- [ ] `didFinishLaunching`에서 무거운 초기화를 메인 스레드에서 수행하는지 확인
- [ ] 사용하지 않는 시점의 프레임워크 초기화 지연 (`lazy var` 활용)
- [ ] `Main.storyboard` 복잡도 — 첫 화면에 불필요한 뷰 계층 포함 여부
- [ ] Instruments Time Profiler로 launch 시 핫스팟 함수 확인
- [ ] MetricKit / Xcode Organizer에서 실사용자 기준 launch time p50/p95 확인

### 스크롤 성능

- [ ] `dequeueReusableCell` 올바르게 사용
- [ ] `cellForRowAt`에서 이미지 동기 로드 없음
- [ ] `estimatedHeightForRowAt` 구현으로 레이아웃 계산 분산
- [ ] 셀에 오프스크린 렌더링 유발 요소 없음 (Debug > Color Offscreen-Rendered)
- [ ] Core Animation 템플릿으로 FPS 60 이하 구간 없음

### 메모리

- [ ] Memory Graph Debugger로 retain cycle 없음 확인
- [ ] Allocations Generation 비교로 화면 왕복 후 메모리 반환 확인
- [ ] 대형 이미지 다운샘플링 적용
- [ ] `NSCache`에 `totalCostLimit` 설정
- [ ] Xcode Organizer Terminations(Memory) 지표 확인

### 네트워크 & 배터리

- [ ] 불필요한 폴링 없음 (WebSocket 또는 Push로 대체)
- [ ] 소규모 요청 배칭 처리
- [ ] URLSession 설정에 `timeoutIntervalForRequest` 명시
- [ ] 이미지 캐시 적용 (반복 다운로드 방지)
- [ ] Background 작업에서 `setTaskCompleted` 즉시 호출

---

## 정리

이 챕터에서 다룬 도구와 개념을 플랫폼별로 정리합니다:

| 목적 | iOS | Android | Web |
|------|-----|---------|-----|
| 구조화 로깅 | Logger + Console.app | Timber + Logcat | winston/pino + ELK |
| CPU 프로파일링 | Instruments Time Profiler | CPU Profiler + Systrace | Chrome Performance |
| 메모리 누수 | Memory Graph + Leaks | LeakCanary | DevTools Heap Snapshot |
| 실서비스 지표 | MetricKit + Organizer | Android Vitals + Firebase Perf | Core Web Vitals |
| 성능 테스트 | XCTest measure{} | Jetpack Benchmark | Vitest bench |
| 렌더링 분석 | Core Animation Instruments | GPU Rendering Profiler | DevTools Rendering |
| 배터리 | Energy Log | Battery Historian + Vitals | Lighthouse |
| 백그라운드 작업 | BGTaskScheduler | WorkManager | Service Worker |

성능 작업의 철칙은 **측정 먼저, 최적화 나중**입니다. 근거 없는 최적화는 코드를 복잡하게 만들고 버그를 낳습니다. Instruments로 데이터를 확보한 뒤 실제 병목에 집중하세요.
