# Chapter 0. 시작 전 준비

Xcode 설치부터 시뮬레이터 세팅까지, iOS 개발을 시작하기 위한 환경을 구성합니다.

## Xcode 설치

Xcode는 iOS/macOS 앱 개발을 위한 Apple의 공식 IDE입니다. Mac App Store에서 무료로 다운로드할 수 있습니다.

> **Android 개발자라면**: Android Studio처럼 무거운 IDE입니다. 처음 설치 시 10GB 이상을 차지하니 디스크 공간을 확인하세요.

> **웹 개발자라면**: VS Code처럼 가볍지 않습니다. macOS 전용이라는 점도 중요합니다 — iOS 개발은 Mac 없이는 불가능합니다.

## Apple Developer 계정

무료 Apple ID로도 시뮬레이터에서 앱을 실행할 수 있습니다. 단, **실기기 테스트**와 **App Store 배포**를 위해서는 유료 개발자 계정(연 $99)이 필요합니다.

| 계정 유형 | 시뮬레이터 | 실기기 | App Store 배포 |
|-----------|-----------|-------|---------------|
| 무료 Apple ID | ✅ | ✅ (제한적) | ❌ |
| 유료 개발자 ($99/년) | ✅ | ✅ | ✅ |

## 첫 프로젝트 만들기

Xcode를 열고 **Create New Project** → **iOS** → **App** 선택 후:

- **Product Name**: 앱 이름
- **Team**: 개발자 계정 선택
- **Organization Identifier**: 보통 `com.yourname`
- **Interface**: SwiftUI
- **Language**: Swift

## 시뮬레이터 실행

상단 툴바에서 시뮬레이터 기기를 선택하고 ▶️ 버튼을 누르면 빌드 후 시뮬레이터가 실행됩니다.

> **단축키**: `⌘ + R` — 빌드 & 실행
