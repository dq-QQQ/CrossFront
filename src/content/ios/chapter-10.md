# Chapter 10. 데이터 영속성

앱이 꺼져도 데이터는 남아야 합니다. iOS 플랫폼은 보안 수준과 복잡도에 따라 여러 레이어의 저장 메커니즘을 제공합니다. 이 챕터에서는 **어떤 상황에 어떤 저장소를 써야 하는지** 판단 기준부터, 각 API의 내부 동작 방식과 실무 패턴까지 깊게 살펴봅니다. Android의 SharedPreferences/Room/Keystore, 웹의 localStorage/IndexedDB/Web Crypto와 하나씩 비교하면서 iOS 데이터 영속성의 전체 지형을 파악합니다.

---

## 1. iOS 데이터 저장소 전체 지형

### 저장소 선택 기준

iOS는 목적에 따라 저장소가 명확히 구분됩니다. 잘못 선택하면 성능 저하, 보안 취약점, App Store 심사 거절로 이어질 수 있습니다.

| 저장소 | 용도 | 암호화 | 앱 삭제 후 | 용량 제한 | iCloud 동기화 |
|--------|------|--------|-----------|----------|--------------|
| UserDefaults | 설정, 사용자 기본값 | 없음 (OS 파일 보호) | 삭제됨 | 수 MB 이하 권장 | @AppStorage 활용 가능 |
| FileManager | 문서, 미디어, JSON 캐시 | Data Protection으로 보호 | 삭제됨 | 기기 저장 용량까지 | iCloud Drive 연동 가능 |
| Keychain | 토큰, 비밀번호, 개인 키 | 하드웨어 암호화 | **유지됨** | 수 KB 단위 | 동일 Team ID 앱 간 공유 |
| Core Data | 복잡한 객체 그래프, 관계형 데이터 | 없음 (파일 보호 상속) | 삭제됨 | 실질적으로 무제한 | NSPersistentCloudKitContainer |
| SwiftData | Core Data의 Swift-native 대안 (iOS 17+) | 없음 (파일 보호 상속) | 삭제됨 | 실질적으로 무제한 | ModelConfiguration으로 설정 |
| CloudKit | 기기 간 동기화 | 전송 중·저장 중 암호화 | 클라우드에 유지 | 무료 쿼터 있음 | 기본 목적 |

### Android/웹과의 개념 대응

| iOS | Android | Web |
|-----|---------|-----|
| UserDefaults | SharedPreferences / DataStore | localStorage / sessionStorage |
| FileManager | File API + Context.filesDir | Node.js fs / File System Access API |
| Keychain | EncryptedSharedPreferences + Keystore | HttpOnly Cookie / Web Crypto API |
| Core Data | Room Database | IndexedDB (idb) / SQLite (wa-sqlite) |
| SwiftData | Room + @Entity (현대적) | Prisma / TypeORM |
| NSPersistentCloudKitContainer | Firebase Firestore | Supabase Realtime |

> 💡 **Android 개발자라면**: Room이 단일 로컬 DB 솔루션인 반면, iOS는 Core Data와 SwiftData 두 가지 선택지가 있습니다. Core Data는 Objective-C 시대부터 이어진 성숙한 솔루션이고, SwiftData는 iOS 17부터 도입된 Swift-native 후속입니다. 새 프로젝트는 iOS 17 최소 버전을 맞출 수 있다면 SwiftData를, 그렇지 않으면 Core Data를 사용하세요.

> 💡 **웹 개발자라면**: 브라우저의 IndexedDB와 달리, iOS는 SQLite 기반의 네이티브 DB를 직접 사용합니다. Core Data/SwiftData는 ORM 레이어로 이해하면 됩니다. 트랜잭션, 인덱스, 관계 모두 지원하지만 SQL을 직접 쓰지 않는다는 점이 다릅니다.

---

## 2. UserDefaults — 간단한 설정값 저장

### 언제 UserDefaults를 쓰는가

UserDefaults는 **작은 설정값**을 저장하는 용도입니다. 실무에서 자주 혼동하는 잘못된 사용과 올바른 사용을 구분해야 합니다.

**올바른 사용**:
- 앱 테마 (다크/라이트 모드)
- 알림 허용 여부
- 언어 설정
- 마지막으로 본 탭 인덱스
- 앱 실행 횟수, 마지막 실행 날짜

**잘못된 사용 (피해야 함)**:
- 인증 토큰, 비밀번호 → **Keychain** 사용
- 대용량 JSON 데이터 → **FileManager** 또는 **Core Data** 사용
- 수천 개의 객체 → **Core Data** 사용
- 민감한 개인정보 → **Keychain** 사용

COMPARE_BLOCK:persistence_userdefaults

### UserDefaults 내부 동작

UserDefaults는 디스크의 plist 파일을 메모리에 캐싱합니다. `set(_:forKey:)` 호출은 **즉시 메모리에 반영**되고, 주기적으로 (또는 앱이 백그라운드로 전환될 때) 디스크에 플러시됩니다.

```swift
// 앱 그룹 공유 (앱 확장과 데이터 공유 시)
let sharedDefaults = UserDefaults(suiteName: "group.com.mycompany.myapp")!
sharedDefaults.set("shared value", forKey: "key")

// 값 관찰 (KVO 기반 — 같은 프로세스 내)
NotificationCenter.default.addObserver(
    forName: UserDefaults.didChangeNotification,
    object: nil,
    queue: .main
) { _ in
    print("UserDefaults 변경됨")
}
```

### @AppStorage 심화

`@AppStorage`는 SwiftUI의 `@State`처럼 동작하지만 UserDefaults에 영속됩니다.

```swift
struct AppearanceSettingsView: View {
    // 앱 그룹 기본값 저장소 지정 가능
    @AppStorage("colorScheme", store: UserDefaults(suiteName: "group.com.mycompany.myapp"))
    private var colorScheme: ColorScheme = .light

    // RawRepresentable 준수 열거형 직접 사용
    @AppStorage("language") private var language: AppLanguage = .korean

    var body: some View {
        Picker("색상 테마", selection: $colorScheme) {
            Text("라이트").tag(ColorScheme.light)
            Text("다크").tag(ColorScheme.dark)
        }
    }
}

// RawRepresentable 열거형 → @AppStorage 호환
enum AppLanguage: String {
    case korean = "ko"
    case english = "en"
    case japanese = "ja"
}
```

> 💡 **Android 개발자라면**: `@AppStorage`는 Jetpack DataStore의 `collectAsState()`와 비슷한 패턴입니다. 단, DataStore가 코루틴 기반 비동기인 반면 `@AppStorage`는 동기 읽기/쓰기입니다. 설정값 수준의 단순 데이터에는 `@AppStorage`가 훨씬 간결합니다.

---

## 3. FileManager — 파일 시스템 접근

### iOS 앱 샌드박스 구조

iOS 앱은 다른 앱의 파일에 접근할 수 없는 **샌드박스** 환경에서 실행됩니다. 각 앱의 컨테이너 디렉토리 구조를 이해하는 것이 필수입니다.

```
앱 컨테이너/
├── AppName.app/          ← 앱 번들 (읽기 전용, 앱 리소스)
├── Documents/            ← 사용자 데이터, iTunes/iCloud 백업 대상
│   └── Inbox/            ← 다른 앱이 공유한 파일 (읽기 전용)
├── Library/
│   ├── Application Support/  ← 앱 지원 파일, 백업 대상
│   ├── Caches/               ← 캐시 데이터, 백업 제외, OS가 삭제 가능
│   └── Preferences/          ← UserDefaults plist 파일
└── tmp/                  ← 임시 파일, 앱 재시작 간에도 삭제될 수 있음
```

**디렉토리 선택 기준**:
- `Documents`: 사용자가 직접 생성한 파일, 내보낼 수 있는 데이터
- `Library/Application Support`: 앱 동작에 필요하지만 사용자에게 노출하지 않을 파일
- `Library/Caches`: 재다운로드 가능한 캐시 (이미지 캐시 등)
- `tmp`: 처리 중 임시 파일 (완료 후 즉시 삭제 권장)

COMPARE_BLOCK:persistence_filemanager

### Data Protection 레벨

iOS는 기기 잠금 상태에 따라 파일 접근을 제한하는 **Data Protection** 메커니즘을 제공합니다.

```swift
// 파일 생성 시 보호 레벨 설정
let fileURL = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
    .appendingPathComponent("sensitive.dat")

try data.write(to: fileURL, options: [
    .atomicWrite,
    .completeFileProtection  // 기기 잠금 시 접근 불가 (가장 강력)
])

// 보호 레벨:
// .completeFileProtection          → 기기 잠금 시 읽기/쓰기 불가
// .completeFileProtectionUnlessOpen → 열려 있는 파일은 잠금 후에도 접근 가능
// .completeFileProtectionUntilFirstUserAuthentication → 첫 잠금 해제 후 항상 접근 가능 (기본값)
// .noFileProtection                → 항상 접근 가능 (권장하지 않음)
```

### iCloud Drive 연동

```swift
// iCloud Document 저장소 사용
func iCloudDocumentsURL() -> URL? {
    FileManager.default.url(
        forUbiquityContainerIdentifier: nil
    )?.appendingPathComponent("Documents")
}

// 파일을 iCloud로 업로드 (NSFileCoordinator 필요)
func moveToICloud(localURL: URL) throws {
    guard let iCloudURL = iCloudDocumentsURL() else { return }
    let coordinator = NSFileCoordinator()
    var error: NSError?
    coordinator.coordinate(writingItemAt: iCloudURL, options: .forMoving, error: &error) { url in
        try? FileManager.default.moveItem(at: localURL, to: url)
    }
    if let error { throw error }
}
```

---

## 4. Keychain — 민감한 데이터 보안 저장

### Keychain이 특별한 이유

Keychain은 단순한 파일 저장이 아닙니다. **Secure Enclave** (Apple Silicon/A7 이상)와 연동된 하드웨어 암호화를 사용합니다.

| 특성 | UserDefaults | 파일 | Keychain |
|------|-------------|------|---------|
| 암호화 | X (파일 보호만) | 선택적 | 하드웨어 암호화 |
| 앱 삭제 후 | 삭제 | 삭제 | **유지** |
| 기기 교체 시 | iCloud 백업 복원 | iCloud 백업 복원 | iCloud Keychain 동기화 |
| 접근 제어 | 없음 | 없음 | 생체 인증 연동 가능 |

> ⚠️ **중요**: Keychain 데이터는 앱을 삭제해도 기기에 남습니다. 재설치 후 이전 토큰이 살아있을 수 있으므로, 첫 실행 감지 로직이 필요합니다.

```swift
// 앱 첫 실행 감지 (재설치 구분)
func isFirstLaunchAfterInstall() -> Bool {
    let key = "hasLaunchedBefore"
    let hasLaunched = UserDefaults.standard.bool(forKey: key)
    if !hasLaunched {
        UserDefaults.standard.set(true, forKey: key)
        // 재설치 시 UserDefaults는 삭제되지만 Keychain은 남음
        // → 이때 이전 Keychain 데이터를 정리할 수 있음
        try? KeychainManager.shared.delete(account: "auth_token")
    }
    return !hasLaunched
}
```

COMPARE_BLOCK:persistence_keychain

### Keychain 접근성 옵션 선택

```swift
// 가장 엄격 (금융/의료 앱 권장)
kSecAttrAccessibleWhenPasscodeSetThisDeviceOnly
// → 기기에 암호가 설정된 경우에만 접근 가능
// → iCloud 동기화 안 됨, 기기 이전 시 데이터 없어짐

// 일반 앱 (잠금 해제 후 접근)
kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly
// → 기기 재시작 후 첫 잠금 해제 이후 항상 접근 가능
// → 백그라운드 작업에서도 접근 가능 (토큰 갱신 등)

// iCloud 동기화 허용 (여러 기기 간 공유)
kSecAttrAccessibleAfterFirstUnlock
// → ThisDeviceOnly가 없으면 iCloud Keychain으로 동기화됨
```

---

## 5. Core Data — 복잡한 데이터 관리

### Core Data 스택 아키텍처

Core Data는 단순한 ORM이 아닙니다. 여러 레이어로 구성된 **객체 그래프 관리 프레임워크**입니다.

```
애플리케이션 코드
       ↕
NSManagedObjectContext     ← 작업 공간 (메모리)
       ↕
NSPersistentStoreCoordinator ← 중재자
       ↕
NSManagedObjectModel       ← 스키마 (.xcdatamodeld)
       ↕
NSPersistentStore          ← 실제 저장소 (SQLite/XML/Binary/InMemory)
```

`NSPersistentContainer`는 이 스택 전체를 캡슐화한 편의 클래스입니다 (iOS 10+).

COMPARE_BLOCK:persistence_coredata_setup

### NSManagedObjectContext 다중 컨텍스트 패턴

Core Data의 핵심은 **컨텍스트**입니다. 컨텍스트는 변경 사항을 추적하는 작업 공간으로, 멀티쓰레딩 안전성을 위해 각 컨텍스트는 **자신을 생성한 스레드에서만** 사용해야 합니다.

```swift
// 메인 컨텍스트 (UI 업데이트)
let mainContext = container.viewContext  // 메인 스레드 전용

// 백그라운드 컨텍스트 (무거운 작업)
let backgroundContext = container.newBackgroundContext()
// 또는
container.performBackgroundTask { context in
    // 이 블록 안에서만 context 사용
    let article = ArticleEntity(context: context)
    article.title = "백그라운드에서 생성"
    try? context.save()
    // 저장 후 메인 컨텍스트에 자동 병합
    // (automaticallyMergesChangesFromParent = true 설정 필요)
}
```

**컨텍스트 충돌 해결 정책**:

```swift
// NSMergeByPropertyObjectTrumpMergePolicy: 메모리(컨텍스트) 값 우선
// → 사용자가 편집 중인 값을 외부 변경으로 덮어쓰지 않음
context.mergePolicy = NSMergeByPropertyObjectTrumpMergePolicy

// NSMergeByPropertyStoreTrumpMergePolicy: 저장소(디스크) 값 우선
// → 외부 변경(CloudKit 동기화 등)을 항상 반영
context.mergePolicy = NSMergeByPropertyStoreTrumpMergePolicy

// NSOverwriteMergePolicy: 저장 시 항상 덮어씀 (충돌 무시)
context.mergePolicy = NSOverwriteMergePolicy

// NSRollbackMergePolicy: 충돌 시 메모리 변경 취소
context.mergePolicy = NSRollbackMergePolicy
```

### Core Data CRUD 실습

COMPARE_BLOCK:persistence_coredata_crud

### NSFetchRequest 고급 활용

```swift
// 배치 크기 설정 (대량 데이터 페이지네이션)
let request = ProductEntity.fetchRequest()
request.fetchBatchSize = 20      // 한 번에 메모리로 로드할 개수
request.fetchLimit = 100         // 최대 결과 수
request.fetchOffset = 0          // 시작 오프셋

// 특정 프로퍼티만 로드 (전체 객체 대신 경량화)
request.resultType = .dictionaryResultType
request.propertiesToFetch = ["name", "price"]

// 중복 제거
request.returnsDistinctResults = true

// Faulting 비활성화 (작은 데이터를 한 번에 로드할 때 성능 향상)
request.returnsObjectsAsFaults = false

// 관계 미리 로드 (N+1 문제 해결)
request.relationshipKeyPathsForPrefetching = ["category", "tags"]
```

### Core Data Relationship

COMPARE_BLOCK:persistence_coredata_relationship

### Core Data 마이그레이션 전략

스키마가 변경될 때 기존 데이터를 유지하려면 마이그레이션이 필요합니다.

**경량 마이그레이션 (자동)**: 컬럼 추가/삭제/이름 변경처럼 단순한 변경은 자동으로 처리됩니다.

```swift
// NSPersistentStoreDescription에 설정
description.shouldMigrateStoreAutomatically = true
description.shouldInferMappingModelAutomatically = true
// .xcdatamodeld에 버전 추가 후 새 버전을 "Current Version"으로 설정
```

**무거운 마이그레이션 (커스텀 매핑 모델)**: 데이터 변환, 분리/병합 등 복잡한 변경에 사용합니다.

```swift
// NSMigrationManager로 수동 마이그레이션
let sourceModel = NSManagedObjectModel(contentsOf: sourceModelURL)!
let destinationModel = NSManagedObjectModel(contentsOf: destinationModelURL)!
let mappingModel = NSMappingModel(from: [Bundle.main],
                                  forSourceModel: sourceModel,
                                  destinationModel: destinationModel)

let migrationManager = NSMigrationManager(
    sourceModel: sourceModel,
    destinationModel: destinationModel
)
try migrationManager.migrateStore(
    from: sourceURL, sourceType: NSSQLiteStoreType,
    options: nil, with: mappingModel,
    toDestinationURL: destinationURL, destinationType: NSSQLiteStoreType,
    destinationOptions: nil
)
```

---

## 6. SwiftData — Core Data의 현대적 대안

### SwiftData가 Core Data와 다른 점

SwiftData는 iOS 17에서 도입된 Swift-native 데이터 영속성 프레임워크입니다. Core Data 위에 구축되어 있지만 (내부적으로 SQLite 사용) API가 완전히 다릅니다.

| 항목 | Core Data | SwiftData |
|------|-----------|-----------|
| 스키마 정의 | .xcdatamodeld (GUI) | `@Model` 매크로 (코드) |
| 코드 생성 | NSManagedObject 서브클래스 | 불필요 |
| 조건 쿼리 | NSPredicate (문자열) | `#Predicate` (타입 안전) |
| SwiftUI 통합 | `@FetchRequest` | `@Query` |
| 최소 버전 | iOS 3+ | iOS 17+ |
| Concurrency | performBackgroundTask | Actor 기반 |

### @Model 매크로 심화

COMPARE_BLOCK:persistence_swiftdata_model

### @Query와 실시간 업데이트

COMPARE_BLOCK:persistence_swiftdata_query

### SwiftData 마이그레이션

SwiftData는 경량 마이그레이션을 `VersionedSchema`와 `SchemaMigrationPlan`으로 처리합니다.

```swift
// 스키마 버전 관리
enum ArticleSchemaV1: VersionedSchema {
    static var versionIdentifier = Schema.Version(1, 0, 0)
    static var models: [any PersistentModel.Type] = [Article.self]

    @Model final class Article {
        var title: String
        var content: String
        init(title: String, content: String) {
            self.title = title
            self.content = content
        }
    }
}

enum ArticleSchemaV2: VersionedSchema {
    static var versionIdentifier = Schema.Version(2, 0, 0)
    static var models: [any PersistentModel.Type] = [Article.self]

    @Model final class Article {
        var title: String
        var content: String
        var tags: [String]   // 새 프로퍼티 추가
        init(title: String, content: String, tags: [String] = []) {
            self.title = title
            self.content = content
            self.tags = tags
        }
    }
}

// 마이그레이션 플랜
enum ArticleMigrationPlan: SchemaMigrationPlan {
    static var schemas: [any VersionedSchema.Type] = [
        ArticleSchemaV1.self,
        ArticleSchemaV2.self,
    ]

    static var stages: [MigrationStage] = [
        // V1 → V2: 경량 마이그레이션 (자동)
        MigrationStage.lightweight(
            fromVersion: ArticleSchemaV1.self,
            toVersion: ArticleSchemaV2.self
        ),
    ]
}

// 컨테이너 생성 시 마이그레이션 플랜 지정
let container = try ModelContainer(
    for: Article.self,
    migrationPlan: ArticleMigrationPlan.self
)
```

### SwiftData + Concurrency (Actor 기반)

```swift
// ModelActor: 백그라운드 처리 전용 actor
@ModelActor
actor ArticleDataActor {
    // modelContext는 자동으로 제공됨 (백그라운드 컨텍스트)

    func importArticles(_ rawData: [ArticleDTO]) throws {
        for dto in rawData {
            let article = Article(
                slug: dto.slug,
                title: dto.title,
                content: dto.content,
                tags: dto.tags
            )
            modelContext.insert(article)
        }
        try modelContext.save()
    }

    func fetchTopArticles(limit: Int) throws -> [Article] {
        var descriptor = FetchDescriptor<Article>(
            predicate: #Predicate { !$0.isDraft },
            sortBy: [SortDescriptor(\.viewCount, order: .reverse)]
        )
        descriptor.fetchLimit = limit
        return try modelContext.fetch(descriptor)
    }
}

// 뷰모델에서 사용
@MainActor
class ArticleSyncViewModel: ObservableObject {
    private let dataActor: ArticleDataActor

    init(container: ModelContainer) {
        self.dataActor = ArticleDataActor(modelContainer: container)
    }

    func importFromServer() async throws {
        let rawData = try await APIService.fetchArticles()
        // 백그라운드 actor로 전환 (메인 스레드 블로킹 없음)
        try await dataActor.importArticles(rawData)
    }
}
```

---

## 7. CloudKit — iCloud 동기화

### CloudKit 아키텍처 이해

CloudKit은 세 가지 데이터베이스 컨테이너를 제공합니다.

| 데이터베이스 | 접근 | 용도 |
|------------|------|------|
| Private Database | 로그인한 사용자만 | 개인 데이터 (다이어리, 설정) |
| Public Database | 모든 사용자 | 공개 콘텐츠 (게시판, 리더보드) |
| Shared Database | 초대된 사용자 | 협업 문서, 공유 데이터 |

COMPARE_BLOCK:persistence_cloudkit

### CloudKit 오프라인 처리 전략

CloudKit은 인터넷 연결 없이도 **로컬 캐시**로 동작하며, 연결 복구 시 자동 동기화됩니다. 그러나 충돌 처리는 직접 구현해야 합니다.

```swift
// CKRecord의 changeTag로 충돌 감지
func handleConflict(clientRecord: CKRecord, serverRecord: CKRecord) -> CKRecord {
    // 서버 기록이 더 최신인 경우 서버 데이터 우선
    let clientDate = clientRecord.modificationDate ?? .distantPast
    let serverDate = serverRecord.modificationDate ?? .distantPast

    if serverDate > clientDate {
        return serverRecord  // 서버 버전 채택
    } else {
        // 클라이언트 변경을 서버 레코드에 병합
        var merged = serverRecord
        merged["title"] = clientRecord["title"]
        merged["content"] = clientRecord["content"]
        return merged
    }
}

// NSPersistentCloudKitContainer 사용 시 충돌은 자동 처리됨
// mergePolicy 설정으로 전략 결정
```

### CloudKit 쿼리와 인덱스 설정

CloudKit의 쿼리는 **인덱스를 명시적으로 CloudKit Dashboard에서 설정**해야 합니다. 인덱스가 없는 필드로 쿼리하면 런타임 에러가 발생합니다.

```swift
// 인덱스 설정 후 쿼리
let predicate = NSPredicate(format: "isDraft == 0 AND viewCount > %d", 100)
let query = CKQuery(recordType: "Article", predicate: predicate)
query.sortDescriptors = [NSSortDescriptor(key: "publishedAt", ascending: false)]

// 커서 기반 페이지네이션
var allResults: [CKRecord] = []
var cursor: CKQueryOperation.Cursor? = nil

func fetchNextPage() async throws {
    let operation = cursor.map { CKQueryOperation(cursor: $0) }
        ?? CKQueryOperation(query: query)
    operation.resultsLimit = 20

    let (results, newCursor) = try await database.records(
        matching: query,
        resultsLimit: 20
    )
    allResults.append(contentsOf: results.compactMap { try? $0.1.get() })
    cursor = newCursor
}
```

---

## 8. 실무 패턴 — 저장소 조합 설계

### 계층별 캐싱 전략

실무 앱은 단일 저장소만 사용하지 않습니다. 네트워크-로컬DB-메모리 캐시를 조합하는 패턴이 일반적입니다.

```swift
// 계층형 데이터 저장 전략 (Single Source of Truth)
final class ArticleRepository {
    // 1. 메모리 캐시 (가장 빠름, 앱 종료 시 소멸)
    private var memoryCache: [UUID: Article] = [:]

    // 2. Core Data / SwiftData (빠름, 영속)
    private let localStore: ArticleLocalStore

    // 3. CloudKit / 서버 API (느림, 최신 데이터)
    private let remoteService: ArticleRemoteService

    func fetchArticle(id: UUID) async throws -> Article {
        // 1단계: 메모리 캐시 확인
        if let cached = memoryCache[id] { return cached }

        // 2단계: 로컬 DB 확인
        if let local = try localStore.findById(id) {
            memoryCache[id] = local
            return local
        }

        // 3단계: 서버에서 가져오기
        let remote = try await remoteService.fetchArticle(id: id)
        // 로컬 DB에 캐시
        try localStore.upsert(remote)
        memoryCache[id] = remote
        return remote
    }

    // Write-through: 쓰기 시 모든 레이어 동시 업데이트
    func updateArticle(_ article: Article) async throws {
        // 메모리 즉시 업데이트 (낙관적)
        memoryCache[article.id] = article

        // 로컬 DB와 서버 동시 업데이트
        async let localSave: Void = localStore.update(article)
        async let remoteSave: Void = remoteService.updateArticle(article)
        let (_, _) = try await (localSave, remoteSave)
    }
}
```

### Repository 패턴과 DI

```swift
// 프로토콜로 저장소 추상화
protocol ArticleRepository {
    func fetchAll() async throws -> [Article]
    func fetchById(_ id: UUID) async throws -> Article?
    func save(_ article: Article) async throws
    func delete(_ id: UUID) async throws
}

// 구현체 — 실제 Core Data
final class CoreDataArticleRepository: ArticleRepository {
    private let context: NSManagedObjectContext
    init(context: NSManagedObjectContext) { self.context = context }
    // 실제 구현...
}

// 구현체 — 테스트용 인메모리
final class InMemoryArticleRepository: ArticleRepository {
    private var articles: [Article] = []
    func fetchAll() async throws -> [Article] { articles }
    func fetchById(_ id: UUID) async throws -> Article? {
        articles.first { $0.id == id }
    }
    func save(_ article: Article) async throws {
        if let idx = articles.firstIndex(where: { $0.id == article.id }) {
            articles[idx] = article
        } else {
            articles.append(article)
        }
    }
    func delete(_ id: UUID) async throws {
        articles.removeAll { $0.id == id }
    }
}

// ViewModel에서 프로토콜 타입 사용 (DI)
@MainActor
final class ArticleListViewModel: ObservableObject {
    @Published private(set) var articles: [Article] = []
    private let repository: any ArticleRepository

    init(repository: any ArticleRepository) {
        self.repository = repository
    }

    func loadArticles() async {
        do {
            articles = try await repository.fetchAll()
        } catch {
            print("로드 실패:", error)
        }
    }
}
```

### 에러 처리 전략

```swift
// 데이터 레이어 전용 에러 타입
enum PersistenceError: LocalizedError {
    case notFound(id: String)
    case saveFailed(underlying: Error)
    case migrationFailed(fromVersion: Int, toVersion: Int)
    case cloudSyncConflict(localDate: Date, serverDate: Date)
    case keychainAccessDenied
    case storageQuotaExceeded

    var errorDescription: String? {
        switch self {
        case .notFound(let id):
            return "데이터를 찾을 수 없음: \(id)"
        case .saveFailed(let error):
            return "저장 실패: \(error.localizedDescription)"
        case .migrationFailed(let from, let to):
            return "마이그레이션 실패 v\(from) → v\(to)"
        case .cloudSyncConflict(let local, let server):
            return "동기화 충돌 — 로컬: \(local), 서버: \(server)"
        case .keychainAccessDenied:
            return "Keychain 접근 거부 (생체 인증 필요)"
        case .storageQuotaExceeded:
            return "저장 공간 초과"
        }
    }

    var recoverySuggestion: String? {
        switch self {
        case .cloudSyncConflict:
            return "충돌을 수동으로 해결하거나 서버 버전을 사용하세요."
        case .storageQuotaExceeded:
            return "불필요한 캐시를 삭제하거나 기기 저장 공간을 확보하세요."
        default:
            return nil
        }
    }
}
```

---

## 9. 성능 최적화

### Core Data 성능 팁

1. **Faulting 이해하기**: Core Data는 관계 객체를 기본적으로 lazy로 로드합니다. 관계 데이터를 반드시 사용한다면 `relationshipKeyPathsForPrefetching`으로 미리 로드하세요.

2. **NSBatchInsertRequest**: 대량 삽입에는 개별 `insert` 대신 배치 삽입을 사용하세요.

```swift
// NSBatchInsertRequest — 수천 개의 레코드를 빠르게 삽입
func batchInsert(products: [ProductDTO], context: NSManagedObjectContext) throws {
    var index = 0
    let request = NSBatchInsertRequest(
        entity: ProductEntity.entity(),
        managedObjectHandler: { object in
            guard index < products.count else { return true }  // true = 완료
            let dto = products[index]
            let product = object as! ProductEntity
            product.id = UUID()
            product.name = dto.name
            product.price = dto.price
            product.createdAt = Date()
            index += 1
            return false  // false = 계속
        }
    )
    request.resultType = .objectIDs
    let result = try context.execute(request) as! NSBatchInsertResult
    let ids = result.result as! [NSManagedObjectID]
    // context 갱신 필요
    NSManagedObjectContext.mergeChanges(
        fromRemoteContextSave: [NSInsertedObjectsKey: ids],
        into: [context]
    )
}
```

3. **인덱스 활용**: 자주 검색하는 프로퍼티에 인덱스를 설정하세요 (.xcdatamodeld에서 `Indexed` 체크).

4. **NSFetchedResultsController**: 테이블/컬렉션 뷰와 Core Data를 연결할 때 `NSFetchedResultsController`를 사용하면 변경 사항을 효율적으로 추적합니다. (SwiftUI의 `@FetchRequest`는 내부적으로 이를 사용)

### SwiftData 성능 팁

```swift
// 백그라운드 배치 처리
@ModelActor
actor BulkImportActor {
    func importLargeDataset(_ items: [ItemDTO]) throws {
        // 자동 저장 비활성화 (자동 저장은 각 insert마다 저장을 트리거할 수 있음)
        for batch in items.chunked(into: 100) {
            for dto in batch {
                modelContext.insert(Item(from: dto))
            }
            // 100개마다 저장 (메모리 압박 감소)
            try modelContext.save()
        }
    }
}
```

---

## 10. 테스팅 — 데이터 레이어 단위 테스트

### Core Data 인메모리 스토어 테스트

```swift
import XCTest
import CoreData
@testable import MyApp

final class ProductRepositoryTests: XCTestCase {
    var sut: ProductRepository!
    var context: NSManagedObjectContext!

    override func setUpWithError() throws {
        // 인메모리 스토어로 매 테스트마다 깨끗한 상태
        let controller = PersistenceController(inMemory: true)
        context = controller.container.viewContext
        sut = ProductRepository(context: context)
    }

    override func tearDownWithError() throws {
        sut = nil
        context = nil
    }

    func testCreateProduct_savesToContext() throws {
        // Given
        let name = "테스트 상품"
        let price = 9900.0

        // When
        let product = try sut.create(name: name, price: price, category: "테스트")

        // Then
        XCTAssertEqual(product.name, name)
        XCTAssertEqual(product.price, price)
        XCTAssertFalse(product.objectID.isTemporaryID, "저장 후에는 영구 ID여야 함")
    }

    func testDeleteProduct_removesFromContext() throws {
        // Given
        let product = try sut.create(name: "삭제 테스트", price: 0, category: "테스트")
        let id = product.id

        // When
        try sut.delete(product)

        // Then
        XCTAssertNil(try sut.findById(id))
    }

    func testFetchByCategory_returnsMatchingProducts() throws {
        // Given
        try sut.create(name: "A", price: 1000, category: "전자기기")
        try sut.create(name: "B", price: 2000, category: "전자기기")
        try sut.create(name: "C", price: 3000, category: "의류")

        // When
        let electronics = try sut.findByCategory("전자기기",
                                                  minPrice: 0, maxPrice: .infinity)

        // Then
        XCTAssertEqual(electronics.count, 2)
        XCTAssertTrue(electronics.allSatisfy { $0.category == "전자기기" })
    }
}
```

### SwiftData 인메모리 테스트

```swift
import XCTest
import SwiftData
@testable import MyApp

final class ArticleViewModelTests: XCTestCase {
    var container: ModelContainer!
    var sut: ArticleViewModel!

    override func setUpWithError() throws {
        let config = ModelConfiguration(isStoredInMemoryOnly: true)
        container = try ModelContainer(for: Article.self, configurations: config)
        sut = ArticleViewModel(context: container.mainContext)
    }

    @MainActor
    func testCreateArticle() throws {
        // When
        sut.create(title: "테스트", content: "내용", tags: ["swift"])

        // Then
        let fetched = try container.mainContext.fetch(
            FetchDescriptor<Article>()
        )
        XCTAssertEqual(fetched.count, 1)
        XCTAssertEqual(fetched[0].title, "테스트")
        XCTAssertEqual(fetched[0].tags, ["swift"])
    }
}
```

---

## 정리

iOS의 데이터 영속성 생태계는 목적에 따라 명확히 구분됩니다.

- **UserDefaults / @AppStorage**: 설정값, 사용자 기본값 — 단순하고 빠름
- **FileManager**: 파일, 문서, 대용량 JSON — 직접 파일 제어가 필요할 때
- **Keychain**: 인증 토큰, 비밀번호 — 보안이 필요한 민감 데이터
- **Core Data**: 복잡한 객체 그래프, 관계형 데이터 — 성숙하고 강력하나 학습 곡선 존재
- **SwiftData**: iOS 17+ 신규 프로젝트 — Swift-native, 간결한 API
- **CloudKit / NSPersistentCloudKitContainer**: iCloud 동기화 — Apple 생태계 전용

Android/웹 개발자로서 가장 익숙해져야 할 핵심은 **NSManagedObjectContext의 멀티컨텍스트 패턴**과 **SwiftData의 @Model/@Query 매크로**입니다. Core Data는 처음엔 복잡하게 보이지만, `NSPersistentContainer` 이후 설정이 크게 단순화되었고, SwiftData는 Room의 @Entity/@Dao 수준의 편의성을 제공합니다.
