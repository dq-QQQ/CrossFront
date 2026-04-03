# Chapter 1. 언어 전환 — Swift 핵심

이미 다른 언어를 알고 있다면 Swift는 생각보다 빠르게 익힐 수 있습니다. 핵심 차이점을 비교 코드로 살펴봐요.

## 변수와 상수

Swift는 불변(`let`)과 가변(`var`)을 엄격하게 구분합니다. 가능하면 `let`을 사용하는 것이 권장됩니다.

COMPARE_BLOCK:variables

## 타입 추론

Swift는 타입을 명시하지 않아도 컴파일러가 추론합니다. 그러나 정적 타입 언어이므로 타입이 결정되면 바꿀 수 없습니다.

COMPARE_BLOCK:types

## 옵셔널 (Optional)

Swift의 가장 독특한 특징 중 하나입니다. `null`을 허용하는 타입과 허용하지 않는 타입을 명확히 구분합니다.

COMPARE_BLOCK:optional

> 💡 **Android 개발자라면**: Kotlin의 `String?`와 완전히 같은 개념입니다. `?.`와 `!!` 연산자도 동일합니다.

> 💡 **웹 개발자라면**: TypeScript의 `string | null`과 비슷하지만 훨씬 더 엄격합니다. `undefined`를 따로 걱정할 필요가 없습니다.

## 클로저 (Closure)

클로저는 Swift에서 함수를 값으로 다루는 방법입니다.

COMPARE_BLOCK:closure

## 프로토콜 (Protocol)

Java/Kotlin의 인터페이스, TypeScript의 인터페이스와 유사한 개념입니다.

COMPARE_BLOCK:protocol
