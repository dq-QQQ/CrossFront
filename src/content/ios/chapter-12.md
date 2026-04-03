# Chapter 12. 보안

보안은 나중에 붙이는 기능이 아닙니다. 아키텍처 설계 단계부터 함께 가야 하는 원칙입니다. 이 챕터에서는 iOS 보안의 핵심 레이어를 실무 관점에서 다룹니다. Android의 Keystore·Network Security Config·BiometricPrompt와, 웹의 Web Crypto·SubtleCrypto·WebAuthn과 직접 비교하면서 각 플랫폼의 철학과 구체적인 구현 방법을 배웁니다.

---

## 1. App Transport Security (ATS)

### iOS의 네트워크 보안 기본 정책

iOS 9부터 **App Transport Security(ATS)**가 기본 활성화됩니다. ATS는 앱의 모든 네트워크 트래픽에 HTTPS(TLS 1.2 이상)를 강제하는 시스템 레벨 정책입니다. 별도 코드 없이 운영체제가 URLSession의 모든 요청에 자동 적용합니다.

| 항목 | iOS (ATS) | Android (NSC) | Web (HSTS/CSP) |
|------|-----------|---------------|----------------|
| 적용 방식 | Info.plist 선언 | res/xml/network_security_config.xml | HTTP 응답 헤더 |
| 기본 동작 | HTTPS 강제 | cleartext 허용 (API 28 이전) | 서버 설정 의존 |
| 예외 처리 | NSExceptionDomains | domain-config | 없음 (인증서 핀닝 불가) |
| 인증서 핀닝 | URLSessionDelegate | pin-set 또는 OkHttp | 브라우저 불지원 |
| 위반 시 결과 | 런타임 에러 | 런타임 에러 | 브라우저 경고/차단 |

### ATS 요구 사항

ATS가 강제하는 최소 조건은 다음과 같습니다:

- **TLS 1.2 이상** — TLS 1.0, 1.1 기본 차단
- **Forward Secrecy** — ECDHE 기반 키 교환 필수
- **강력한 암호화 스위트** — AES-128/256-GCM, ChaCha20-Poly1305
- **인증서 유효성** — 신뢰할 수 있는 CA 서명, 만료 미경과, 도메인 일치

COMPARE_BLOCK:security_ats

### ATS 예외 설정 실무

App Store 심사에서 `NSAllowsArbitraryLoads = true`는 **반드시 사유를 제출**해야 합니다. 합당한 이유가 없으면 반려됩니다. 실무에서 허용되는 예외 패턴:

1. **개발 환경 로컬 서버**: `localhost`, `10.0.2.2` 등에 HTTP 허용
2. **사내 CA 사용**: 퍼블릭 CA가 아닌 내부 CA를 trust anchor에 추가
3. **미디어 스트리밍**: `NSAllowsArbitraryLoadsForMedia = true` — 동영상 스트리밍 특화
4. **웹뷰 콘텐츠**: `NSAllowsArbitraryLoadsInWebContent = true` — WKWebView만 해당

> 💡 **Android 개발자라면**: Android의 `android:usesCleartextTraffic`은 기본 `true`였다가 API 28부터 `false`로 바뀌었습니다. iOS는 반대로 처음부터 강력한 기본값에서 출발해 예외를 열어주는 방식입니다.

> 💡 **웹 개발자라면**: CSP와 HSTS는 서버가 헤더로 선언하지만, ATS는 클라이언트(앱)가 시스템에 위임합니다. 앱 코드가 아닌 Info.plist 구성만으로 전체 네트워크 정책이 적용됩니다.

---

## 2. SSL Pinning

### Certificate Pinning이란

SSL/TLS는 CA(Certificate Authority) 신뢰 체계에 의존합니다. CA가 해킹당하거나, 기업 내부 프록시(Burp Suite 등)가 트래픽을 가로막을 때 MITM(중간자 공격)이 가능합니다. SSL Pinning은 **특정 인증서(또는 공개키)만 신뢰**하도록 목록을 앱에 고정해 이를 방지합니다.

### Certificate Pinning vs Public Key Pinning

| 방식 | 장점 | 단점 |
|------|------|------|
| 인증서 핀닝 | 구현 간단 | 인증서 갱신마다 앱 업데이트 필요 |
| 공개키 핀닝 | 인증서 갱신해도 공개키 유지 가능 | 공개키 유출 시 대응 어려움 |
| CA 핀닝 | 관리 편함 | 해당 CA 전체를 신뢰 → 보호 약화 |

**실무 권장**: 공개키 핀닝(SHA-256 해시) + 백업 핀 2개 이상 유지

### 핀 값 추출 방법

```bash
# 서버 인증서에서 공개키 해시 추출
openssl s_client -connect api.example.com:443 2>/dev/null | \
  openssl x509 -pubkey -noout | \
  openssl pkey -pubin -outform der | \
  openssl dgst -sha256 -binary | \
  base64
```

COMPARE_BLOCK:security_ssl_pinning

### 핀닝 우회 대응

공격자는 Frida, SSL Kill Switch 등으로 핀닝을 우회 시도합니다. 이에 대응하는 추가 조치:

- **Runtime 검증**: `SecTrustGetCertificateCount`로 체인 길이 확인 (MITM 프록시는 체인이 늘어남)
- **Certificate Transparency**: CT 로그에 없는 인증서 거부
- **핀 만료 전 업데이트**: 핀 갱신 주기를 배포 일정에 맞게 계획
- **TrustKit 라이브러리**: 애플리케이션 레이어에서 ATS 수준의 핀닝 제공

> ⚠️ 핀닝 설정 오류는 전체 앱 네트워크 마비로 이어집니다. 반드시 **백업 핀**을 최소 1개 포함하고, 핀 만료 전 신규 인증서의 공개키를 미리 추가하세요.

---

## 3. Keychain — 보안 자격증명 저장소

### Keychain vs 일반 저장소

iOS에서 민감한 정보(토큰, 비밀번호, 개인키)를 저장할 때 선택지별 보안 수준:

| 저장소 | 암호화 | 백업 포함 | 앱 삭제 후 | 기기 제한 | 권장 용도 |
|--------|--------|-----------|------------|-----------|-----------|
| UserDefaults | ❌ 평문 | ✅ | 삭제됨 | ❌ | 비민감 설정값 |
| 파일 시스템 | 조건부 | ✅ | 삭제됨 | ❌ | 일반 데이터 |
| **Keychain** | ✅ AES | 설정 가능 | **유지됨** | 설정 가능 | 인증 정보 |
| Secure Enclave | ✅ HW | ❌ | 삭제됨 | ✅ | 암호화 키 |

### Keychain 접근성 수준 (kSecAttrAccessible)

```swift
// 보안 강도 순서 (가장 제한적 → 가장 허용적)

kSecAttrAccessibleWhenUnlockedThisDeviceOnly    // ★ 실무 권장
// - 기기 잠금 해제 상태에서만 접근
// - 이 기기에서만 유효 (iCloud 백업/복원 불포함)

kSecAttrAccessibleWhenUnlocked
// - 위와 같지만 iCloud Keychain 백업 허용

kSecAttrAccessibleWhenPasscodeSetThisDeviceOnly
// - 기기에 Passcode 설정된 경우에만 생성 가능
// - Passcode 제거 시 아이템 삭제됨

kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly
// - 재부팅 후 최초 잠금 해제 이후 항상 접근 가능
// - 백그라운드 서비스에서 필요할 때 사용

kSecAttrAccessibleAlways                        // ❌ 지양
// - 기기 잠금 여부 무관 (iOS 16부터 deprecated)
```

COMPARE_BLOCK:security_keychain_store

### Keychain App Group 공유

같은 Team ID를 가진 앱끼리 Keychain을 공유할 수 있습니다:

```swift
// Entitlements 파일에 keychain-access-groups 등록 필요
let query: [String: Any] = [
    kSecClass as String:           kSecClassGenericPassword,
    kSecAttrAccessGroup as String: "TEAM_ID.com.example.shared",
    kSecAttrAccount as String:     "shared_token",
    kSecReturnData as String:      true,
]
// 같은 Team ID를 가진 앱1, 앱2, Extension이 동일 토큰 공유
```

> 💡 **Android 개발자라면**: EncryptedSharedPreferences는 앱 삭제 시 함께 삭제됩니다. 반면 iOS Keychain은 앱 삭제 후에도 남아있습니다 — 재설치 시 이전 자격증명이 복원되어 UX 개선에 활용할 수 있지만, 테스트 시 수동으로 삭제해야 합니다.

---

## 4. CryptoKit — 현대적 암호화

### CryptoKit 개요 (iOS 13+)

CryptoKit은 Apple이 iOS 13에서 공개한 고수준 암호화 프레임워크입니다. 저수준 `Security` 프레임워크나 `CommonCrypto` C API 대신, Swift 네이티브 API로 안전하고 간결한 암호화를 제공합니다.

| 기능 | CryptoKit 타입 | 비고 |
|------|---------------|------|
| SHA 해싱 | `SHA256`, `SHA384`, `SHA512` | 단방향 |
| HMAC | `HMAC<SHA256>` | 메시지 인증 |
| AES-GCM | `AES.GCM` | 대칭 암호화 권장 |
| ChaCha20 | `ChaChaPoly` | 고성능 대칭 |
| ECDSA 서명 | `P256.Signing`, `P384.Signing` | 비대칭 서명 |
| ECDH 키교환 | `P256.KeyAgreement` | 공유 비밀 |
| Curve25519 | `Curve25519.Signing` | 현대적 비대칭 |
| Secure Enclave | `SecureEnclave.P256` | 하드웨어 보호 |

### SHA 해싱

COMPARE_BLOCK:security_cryptokit_hash

### 대칭 암호화 (AES-GCM / ChaCha20-Poly1305)

**AES-GCM**은 암호화와 인증을 동시에 수행하는 **AEAD(Authenticated Encryption with Associated Data)** 모드입니다. 암호문이 변조되면 복호화 시 에러가 발생합니다.

COMPARE_BLOCK:security_cryptokit_encrypt

### 비대칭 서명 (ECDSA P-256)

```swift
import CryptoKit

// 키 쌍 생성
let privateKey = P256.Signing.PrivateKey()
let publicKey = privateKey.publicKey

// 서명
let message = Data("서명할 데이터".utf8)
let signature = try privateKey.signature(for: message)

// 검증
let isValid = publicKey.isValidSignature(signature, for: message)

// 공개키 직렬화 (서버 등록용 — DER 또는 raw X9.63 형식)
let rawPublicKey = publicKey.rawRepresentation   // 65바이트
let pemString = publicKey.pemRepresentation       // PEM 문자열

// 키 복원
let restoredKey = try P256.Signing.PublicKey(rawRepresentation: rawPublicKey)
```

### Curve25519 (현대적 비대칭 암호화)

```swift
// Curve25519: 빠르고 안전한 현대 타원곡선 알고리즘
import CryptoKit

// 서명용 (Ed25519)
let signingKey = Curve25519.Signing.PrivateKey()
let signature = try signingKey.signature(for: message)
signingKey.publicKey.isValidSignature(signature, for: message)

// 키 교환용 (X25519 ECDH)
let aliceKey = Curve25519.KeyAgreement.PrivateKey()
let bobKey   = Curve25519.KeyAgreement.PrivateKey()

let sharedSecret = try aliceKey.sharedSecretFromKeyAgreement(with: bobKey.publicKey)
let symmetricKey = sharedSecret.hkdfDerivedSymmetricKey(
    using: SHA256.self,
    salt: Data("salt".utf8),
    sharedInfo: Data("info".utf8),
    outputByteCount: 32
)
```

> 💡 **Android 개발자라면**: Android의 `MessageDigest`/`Cipher`는 문자열로 알고리즘을 지정하는 방식(`"AES/GCM/NoPadding"`)이라 오타나 잘못된 파라미터 조합이 런타임에 발견됩니다. CryptoKit은 타입 시스템으로 이를 컴파일 타임에 방지합니다.

> 💡 **웹 개발자라면**: SubtleCrypto는 모든 작업이 Promise 기반 비동기입니다. CryptoKit은 동기 API로 코드가 훨씬 간결하고, Swift의 throws 패턴으로 에러 처리가 명시적입니다.

---

## 5. OAuth 2.0 + ASWebAuthenticationSession

### iOS의 OAuth 권장 방식

iOS에서 OAuth를 구현할 때 세 가지 선택지가 있습니다:

| 방식 | 장단점 | 현재 상태 |
|------|--------|-----------|
| **ASWebAuthenticationSession** | SSO 쿠키 공유, 보안 우수 | ✅ 권장 (iOS 12+) |
| SFSafariViewController | SSO 가능, 더 많은 커스터마이징 | ⚠️ 제한적 사용 |
| UIWebView / WKWebView | 비밀번호 노출 가능 | ❌ 금지 (OAuth 2.0 spec) |
| Custom URL Scheme 리다이렉트 | 앱 하이재킹 위험 | ⚠️ Universal Link 선호 |

**PKCE(Proof Key for Code Exchange)**는 모바일 앱에서 필수입니다. `client_secret`을 앱에 포함할 수 없기 때문에, 일회용 `code_verifier`/`code_challenge` 쌍으로 Authorization Code의 가로채기를 방지합니다.

### PKCE 플로우

```
앱                         인증 서버
 │                              │
 │── code_verifier 생성 ────── │ (로컬 보관)
 │── SHA-256(verifier) ──────→ code_challenge
 │                              │
 │── GET /auth?code_challenge= ─→
 │                              │ (challenge 저장)
 │←── redirect: code ─────────│
 │                              │
 │── POST /token              │
 │     code + code_verifier ──→│
 │                              │── verify(SHA-256(verifier) == challenge)
 │←── access_token ───────────│
```

COMPARE_BLOCK:security_oauth

### Universal Links vs Custom URL Scheme

```swift
// ❌ Custom URL Scheme — 다른 앱이 동일 scheme 등록 가능 (하이재킹 위험)
// myapp://oauth/callback

// ✅ Universal Links — 도메인 소유 증명 필요 (권장)
// https://example.com/oauth/callback

// Info.plist 설정 (Associated Domains)
// Associated Domains Entitlement: applinks:example.com

// AppDelegate에서 처리
func application(_ app: UIApplication,
                 open url: URL,
                 options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
    // URL 처리
    return true
}

// SwiftUI + Scene 방식
.onOpenURL { url in
    // OAuth 콜백 처리
    OAuthManager.shared.handleCallback(url: url)
}
```

---

## 6. 생체인증 (Face ID / Touch ID)

### LocalAuthentication 프레임워크

iOS의 생체인증은 `LocalAuthentication` 프레임워크가 담당합니다. 생체 데이터 자체는 절대 앱에 노출되지 않고 Secure Enclave에서 처리됩니다.

```
앱(LocalAuthentication) → 시스템 다이얼로그 → Secure Enclave
                                                     ↓
                                              생체 데이터 비교
                                                     ↓
                                              성공/실패만 반환
```

### LABiometryType 별 분기

```swift
import LocalAuthentication

let context = LAContext()
var error: NSError?
context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error)

switch context.biometryType {
case .faceID:
    print("Face ID 지원")        // iPhone X 이후
case .touchID:
    print("Touch ID 지원")       // iPhone 8 이하, iPad, MacBook
case .opticID:
    print("Optic ID 지원")       // Apple Vision Pro
case .none:
    print("생체인증 미지원")
@unknown default:
    break
}
```

COMPARE_BLOCK:security_biometrics

### 생체인증 정책 선택

```swift
// 정책 1: 생체인증만 허용 (Passcode 폴백 없음)
context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, ...)
// - 생체 실패 → 에러 반환 (LAError.biometryLockout 시 잠김)

// 정책 2: 생체인증 + Passcode 폴백 (일반적으로 권장)
context.evaluatePolicy(.deviceOwnerAuthentication, ...)
// - 생체 실패 → 자동으로 Passcode 입력창으로 전환

// 폴백 버튼 커스터마이징
context.localizedFallbackTitle = "비밀번호로 로그인"   // 기본: "Enter Password"
context.localizedCancelTitle   = "취소"
```

### LAContext 재사용 주의

```swift
// ❌ 같은 context를 재사용하면 인증 없이 통과됨
let context = LAContext()
await context.evaluatePolicy(...)  // 성공
await context.evaluatePolicy(...)  // 인증 없이 성공! (캐시됨)

// ✅ 매번 새로운 context 생성
func authenticate() async {
    let context = LAContext()       // 매번 새로 생성
    try await context.evaluatePolicy(...)
}
```

---

## 7. Secure Enclave

### Secure Enclave란

Secure Enclave는 메인 프로세서와 분리된 **독립 하드웨어 보안 칩**입니다. iPhone 5s(A7)부터 탑재되어 있으며, Face ID/Touch ID 생체 데이터 처리와 암호화 키 보관을 담당합니다.

**핵심 특징:**
- 키가 SE 밖으로 절대 나가지 않음 (extractable = false)
- 서명, ECDH 연산은 SE 내부에서 수행
- 기기 삭제/복원 시 SE 초기화 → 키 영구 소멸
- iCloud 백업에 포함되지 않음

### Secure Enclave vs Android StrongBox

| 항목 | iOS Secure Enclave | Android StrongBox | Android TEE |
|------|-------------------|-------------------|-------------|
| 물리적 분리 | ✅ 완전 분리 칩 | ✅ 전용 보안 칩 | △ TrustZone 파티션 |
| 기기 가용성 | iPhone 5s+ 전 기기 | Pixel 3+, Galaxy S21+ 일부 | API 18+ 대부분 |
| 지원 알고리즘 | P-256 ECDSA/ECDH | AES, EC, RSA | AES, EC, RSA |
| 생체인증 연동 | 네이티브 | 명시적 설정 필요 | 명시적 설정 필요 |

COMPARE_BLOCK:security_secure_enclave

### Secure Enclave 사용 사례

```swift
// 사례 1: 서버 인증 (비밀번호 없는 로그인)
// 1. 앱 최초 실행 시 SE에서 P-256 키 쌍 생성
// 2. 공개키를 서버에 등록
// 3. 로그인 시: 서버가 challenge 전달 → SE에서 서명 → 서버가 검증

// 사례 2: 암호화된 로컬 데이터베이스 키 보호
// SE에서 ECDH로 공유 비밀 유도 → AES 키로 변환 → DB 암호화

// 사례 3: 생체인증 연동 트랜잭션 서명
// "이체 금액 100,000원에 동의합니다" → 생체인증 → SE 서명 → 서버 검증

// ⚠️ Secure Enclave 지원 알고리즘은 P-256만 (P-384, P-521 미지원)
// ⚠️ 키는 생성된 기기에서만 사용 가능 — 키를 다른 기기로 이전 불가
```

---

## 8. 탈옥 탐지 및 코드 보호

### 탈옥(Jailbreak) 탐지의 현실

탈옥 탐지는 **보안을 보장하는 수단이 아니라 장벽을 높이는 수단**입니다. 충분히 동기화된 공격자는 우회할 수 있습니다. 그럼에도 구현해야 하는 이유:

1. **일반 사용자 보호**: 저숙련 공격자로부터 앱과 데이터 보호
2. **컴플라이언스**: 금융·의료 앱의 규제 요구사항 (PCI DSS 등)
3. **책임 분리**: "앱이 탈옥 기기에서 실행됨" 사실을 감지·기록

COMPARE_BLOCK:security_jailbreak_detection

### 다중 계층 탐지 전략

단일 탐지 방법은 쉽게 우회됩니다. 여러 방법을 조합하고, 탐지 로직을 분산시켜야 합니다:

```swift
struct SecurityChecker {

    static func performCheck() -> SecurityStatus {
        var score = 0

        // 각 지표에 가중치 부여
        if JailbreakDetector.checkJailbreakFiles()    { score += 30 }
        if JailbreakDetector.checkSandboxViolation()  { score += 40 }
        if JailbreakDetector.checkDynamicLibraries()  { score += 25 }
        if FridaDetector.isFridaPresent()              { score += 50 }
        if isDebuggerAttached()                        { score += 30 }
        if isRunningInSimulator()                      { score += 10 }  // CI 등 예외 처리

        return SecurityStatus(score: score, isCompromised: score >= 40)
    }

    // 디버거 연결 탐지
    private static func isDebuggerAttached() -> Bool {
        var info = kinfo_proc()
        var mib: [Int32] = [CTL_KERN, KERN_PROC, KERN_PROC_PID, getpid()]
        var size = MemoryLayout<kinfo_proc>.stride
        sysctl(&mib, 4, &info, &size, nil, 0)
        return (info.kp_proc.p_flag & P_TRACED) != 0
    }

    private static func isRunningInSimulator() -> Bool {
        #if targetEnvironment(simulator)
        return true
        #else
        return false
        #endif
    }
}
```

### 코드 난독화

Swift 코드는 컴파일 후 역공학이 어렵지만, Hopper/IDA Pro 등으로 분석 가능합니다. 추가 보호 수단:

**빌드 레벨 보호:**
```bash
# Strip 심볼 (기본 활성화)
STRIP_INSTALLED_PRODUCT = YES
STRIP_STYLE = all

# Bitcode 비활성화 (역어셈블 어렵게)
ENABLE_BITCODE = NO

# 최적화 수준 (코드 패턴 변형)
SWIFT_OPTIMIZATION_LEVEL = -O   # Release
```

**런타임 보호:**
```swift
// 무결성 검사 — 코드 서명 확인
func verifyCodeSignature() -> Bool {
    // 앱 번들 서명 확인
    guard let bundlePath = Bundle.main.bundleURL.path as NSString? else { return false }
    var staticCode: SecStaticCode?
    let status = SecStaticCodeCreateWithPath(bundlePath as CFURL, [], &staticCode)
    guard status == errSecSuccess, let code = staticCode else { return false }

    var requirement: SecRequirement?
    SecRequirementCreateWithString(
        "anchor apple generic and identifier \"com.example.myapp\"" as CFString,
        [],
        &requirement
    )
    return SecStaticCodeCheckValidity(code, [], requirement) == errSecSuccess
}
```

**상용 솔루션:**
- **iXGuard** (Guardsquare): 코드 난독화 + 런타임 보호
- **Dotfuscator**: .NET 기반 앱용
- **Obfuscator-LLVM**: LLVM 컴파일러 패스 기반

> 💡 **Android 개발자라면**: Android의 ProGuard/R8 같은 공식 난독화 도구가 iOS에는 없습니다. 대신 Swift 컴파일러의 최적화가 코드를 변형시키고, 심볼 스트리핑으로 기본 보호가 됩니다.

---

## 9. 보안 아키텍처 종합 가이드

### 민감도 분류별 저장 전략

```
민감도 분류           저장 위치              접근 제어
─────────────────────────────────────────────────────
최고 기밀            Secure Enclave         생체인증 필수
(암호화 키, 서명키)

기밀                 Keychain               kSecAttrAccessibleWhenUnlockedThisDeviceOnly
(액세스 토큰, 비밀번호)

민감                 Keychain / EncryptedDB 기기 잠금 해제 시
(사용자 설정, 결제 정보)

일반                 UserDefaults / 파일     없음
(앱 테마, 언어 설정)
```

### 보안 체크리스트

#### 네트워크 보안
- [ ] ATS 활성화 (NSAllowsArbitraryLoads = false)
- [ ] TLS 1.2 이상 사용
- [ ] Certificate Pinning 구현 (공개키 핀닝 + 백업 핀)
- [ ] 인증서 갱신 일정 관리 (만료 90일 전 핀 업데이트)

#### 데이터 보안
- [ ] 민감 데이터 Keychain 저장 (UserDefaults 미사용)
- [ ] 적절한 kSecAttrAccessible 레벨 선택
- [ ] 앱 삭제 시 데이터 정책 확인 (Keychain은 유지됨)
- [ ] App Group 공유 Keychain 접근 그룹 최소화

#### 암호화
- [ ] CryptoKit 사용 (CommonCrypto 직접 사용 지양)
- [ ] AES-256-GCM 또는 ChaCha20-Poly1305 사용
- [ ] 키는 Keychain 또는 Secure Enclave에 보관
- [ ] 비밀번호 해싱은 서버에서 bcrypt/Argon2로 처리

#### 인증
- [ ] OAuth 2.0 + PKCE 구현
- [ ] ASWebAuthenticationSession 사용 (WKWebView 금지)
- [ ] Universal Links로 리다이렉트 URI 보호
- [ ] 토큰 만료 및 갱신 로직 구현

#### 런타임 보호
- [ ] 생체인증 구현 (LocalAuthentication)
- [ ] Secure Enclave 키 사용 (지원 기기)
- [ ] 탈옥 탐지 구현 (다중 지표)
- [ ] 디버거 연결 탐지
- [ ] 코드 서명 무결성 검증

### 실무 보안 안티패턴

```swift
// ❌ 하지 말아야 할 것들

// 1. UserDefaults에 토큰 저장
UserDefaults.standard.set(accessToken, forKey: "token")  // ❌

// 2. 하드코딩된 비밀키
let secretKey = "my-super-secret-key-12345"  // ❌ (바이너리 분석으로 노출)

// 3. HTTP 통신 허용 (ATS 비활성화)
// NSAllowsArbitraryLoads = true  // ❌

// 4. 민감 정보 로깅
print("사용자 토큰: \(accessToken)")  // ❌ (Xcode 로그 → 시스템 로그에 노출)

// 5. WKWebView로 OAuth
// WKWebView는 쿠키/세션 격리 문제 + 피싱 위험  // ❌

// ✅ 올바른 방법
try KeychainManager.save(key: "access_token", value: accessToken)
let key = SecureEnclaveKeyManager.generateKey()  // 런타임 키 생성
// ATS 기본값 유지
os_log(.debug, "인증 완료 (토큰 로깅 생략)")  // 민감 정보 제외
let session = ASWebAuthenticationSession(...)  // OAuth 전용 컴포넌트
```

---

## 10. 플랫폼별 보안 비교 요약

| 보안 영역 | iOS | Android | Web |
|-----------|-----|---------|-----|
| **네트워크 강제** | ATS (기본 활성화) | NSC (앱이 선택) | HSTS (서버 선택) |
| **SSL 핀닝** | URLSessionDelegate | OkHttp CertificatePinner | 브라우저 미지원 |
| **보안 저장소** | Keychain + SE | Keystore + EncryptedPrefs | Web Crypto (SW) |
| **암호화 API** | CryptoKit (고수준) | JCA/JCE (저수준) | SubtleCrypto (비동기) |
| **OAuth** | ASWebAuthenticationSession | Chrome Custom Tabs | window.location / fetch |
| **생체인증** | LocalAuthentication | BiometricPrompt | WebAuthn (FIDO2) |
| **HW 보안 칩** | Secure Enclave (전 기기) | StrongBox (일부 기기) | 없음 |
| **탈옥/루팅 탐지** | 파일/프로세스 검사 | Play Integrity API | 불가 (구조적 한계) |
| **코드 보호** | 컴파일 최적화 + 심볼 스트립 | ProGuard/R8 + DexGuard | 번들 최소화 (우회 쉬움) |

### iOS 보안의 강점과 약점

**강점:**
- Secure Enclave가 모든 기기에 탑재 (Android는 일부만 StrongBox)
- ATS가 기본 활성화 — 개발자 실수를 시스템이 방지
- CryptoKit의 타입 안전 API — 알고리즘 오설정 컴파일 에러로 방지
- 앱 샌드박스 + 코드 서명 의무화

**약점:**
- 탈옥 시 모든 보호 무력화 가능 (SE 제외)
- 오래된 기기의 Secure Enclave 기능 제한
- 앱 내 비밀키 하드코딩은 여전히 개발자 책임

> 💡 **최종 조언**: 보안은 단일 기술로 완성되지 않습니다. ATS + Keychain + CryptoKit + 생체인증 + 탈옥 탐지를 **레이어드 방어(Defence in Depth)**로 조합하되, 각 레이어의 한계를 명확히 인지하고 서버사이드 검증과 병행하세요.
