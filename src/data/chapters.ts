import type { Chapter } from '../types';

export const IOS_CHAPTERS: Chapter[] = [
  {
    id: 0,
    slug: 'chapter-0',
    title: '시작 전 준비',
    subtitle: 'Xcode 설치, Apple Developer 계정, 시뮬레이터 세팅',
    platform: 'ios',
    topics: ['Xcode', 'Simulator', 'Apple Developer Account', 'Swift Package Manager'],
    estimatedMinutes: 20,
    status: 'available',
    externalLinks: [
      {
        title: 'Xcode 다운로드 — Mac App Store',
        url: 'https://apps.apple.com/kr/app/xcode/id497799835',
        type: 'docs',
      },
      {
        title: 'Apple Developer 등록',
        url: 'https://developer.apple.com/kr/',
        type: 'docs',
      },
    ],
  },
  {
    id: 1,
    slug: 'chapter-1',
    title: '언어 전환 — Swift 핵심',
    subtitle: 'Kotlin/JS/TS 개발자가 알아야 할 Swift 차이점',
    platform: 'ios',
    topics: ['변수/상수', '옵셔널', '클로저', '프로토콜', '제네릭', '열거형'],
    estimatedMinutes: 60,
    status: 'available',
    externalLinks: [
      {
        title: 'Swift 공식 문서 — The Basics',
        url: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/thebasics/',
        type: 'docs',
      },
      {
        title: '100 Days of SwiftUI — Hacking with Swift',
        url: 'https://www.hackingwithswift.com/100/swiftui',
        type: 'video',
      },
    ],
  },
  {
    id: 2,
    slug: 'chapter-2',
    title: 'UI 만들기 — SwiftUI',
    subtitle: 'XML Layout / JSX / HTML+CSS → SwiftUI 비교',
    platform: 'ios',
    topics: ['선언형 UI', 'View', 'State', 'Binding', 'VStack/HStack', 'Modifier'],
    estimatedMinutes: 90,
    status: 'available',
    externalLinks: [
      {
        title: 'SwiftUI 공식 튜토리얼',
        url: 'https://developer.apple.com/tutorials/swiftui',
        type: 'docs',
      },
    ],
  },
  {
    id: 3,
    slug: 'chapter-3',
    title: '화면 이동 — 네비게이션',
    subtitle: 'Fragment / React Router → NavigationStack 비교',
    platform: 'ios',
    topics: ['NavigationStack', 'NavigationLink', 'Sheet', 'TabView', 'Deep Link'],
    estimatedMinutes: 45,
    status: 'available',
  },
  {
    id: 4,
    slug: 'chapter-4',
    title: '데이터와 네트워크',
    subtitle: 'Retrofit / Fetch / Axios → URLSession 비교',
    platform: 'ios',
    topics: ['URLSession', 'async/await', 'Combine', 'Codable', 'JSON 파싱'],
    estimatedMinutes: 75,
    status: 'available',
  },
  {
    id: 5,
    slug: 'chapter-5',
    title: '앱 구조 — 아키텍처',
    subtitle: 'MVVM / MVI / React Hooks → iOS 아키텍처 패턴 비교',
    platform: 'ios',
    topics: ['MVVM', 'ObservableObject', '@StateObject', 'Dependency Injection', 'Clean Architecture'],
    estimatedMinutes: 90,
    status: 'available',
  },
  {
    id: 6,
    slug: 'chapter-6',
    title: '배포 — App Store',
    subtitle: 'Play Store / 웹 배포와 다른 App Store 심사 프로세스',
    platform: 'ios',
    topics: ['Signing', 'Provisioning Profile', 'TestFlight', 'App Store Connect', '심사 가이드라인'],
    estimatedMinutes: 60,
    status: 'available',
  },
];

export const CHAPTERS_BY_PLATFORM: Record<string, Chapter[]> = {
  ios: IOS_CHAPTERS,
};
