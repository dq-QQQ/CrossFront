import type { CompareCodeBlockProps } from '../types';

export const CODE_BLOCKS: Record<string, CompareCodeBlockProps> = {
  variables: {
    caption: '변수와 상수 선언',
    android: {
      language: 'kotlin',
      code: `val name: String = "CrossFront"  // 불변 (val = value)
var count: Int = 0               // 가변 (var = variable)

// 타입 추론
val inferred = "Hello"           // String으로 추론
var number = 42                  // Int로 추론`,
    },
    web: {
      language: 'typescript',
      code: `const name: string = "CrossFront"  // 불변 (const)
let count: number = 0             // 가변 (let)

// 타입 추론
const inferred = "Hello"          // string으로 추론
let number = 42                   // number로 추론`,
    },
    ios: {
      language: 'swift',
      code: `let name: String = "CrossFront"  // 불변 (let)
var count: Int = 0               // 가변 (var)

// 타입 추론
let inferred = "Hello"           // String으로 추론
var number = 42                  // Int로 추론`,
    },
  },

  types: {
    caption: '기본 타입',
    android: {
      language: 'kotlin',
      code: `val age: Int = 25
val height: Double = 175.5
val isActive: Boolean = true
val initial: Char = 'A'
val message: String = "안녕하세요"`,
    },
    web: {
      language: 'typescript',
      code: `const age: number = 25
const height: number = 175.5
const isActive: boolean = true
// char 타입 없음 — string 사용
const message: string = "안녕하세요"`,
    },
    ios: {
      language: 'swift',
      code: `let age: Int = 25
let height: Double = 175.5
let isActive: Bool = true
let initial: Character = "A"
let message: String = "안녕하세요"`,
    },
  },

  optional: {
    caption: 'null 처리 — 옵셔널',
    android: {
      language: 'kotlin',
      code: `// Kotlin nullable
var name: String? = null

// 안전 호출
val length = name?.length       // null이면 null 반환

// 엘비스 연산자
val len = name?.length ?: 0     // null이면 0

// 강제 언래핑 (NPE 위험)
val forceLen = name!!.length`,
    },
    web: {
      language: 'typescript',
      code: `// TypeScript nullable
let name: string | null = null

// 옵셔널 체이닝
const length = name?.length     // null이면 undefined

// null 병합 연산자
const len = name?.length ?? 0   // null이면 0

// 단언 연산자
const forceLen = name!.length`,
    },
    ios: {
      language: 'swift',
      code: `// Swift Optional
var name: String? = nil

// 옵셔널 체이닝
let length = name?.count        // nil이면 nil 반환

// nil 병합 연산자
let len = name?.count ?? 0      // nil이면 0

// 강제 언래핑 (크래시 위험)
let forceLen = name!.count

// 옵셔널 바인딩 (권장)
if let unwrapped = name {
    print(unwrapped.count)
}`,
    },
  },

  closure: {
    caption: '클로저 / 람다 / 화살표 함수',
    android: {
      language: 'kotlin',
      code: `// Kotlin 람다
val greet: (String) -> String = { name -> "안녕, $name!" }

// 후행 람다
listOf(1, 2, 3).map { it * 2 }

// 고차 함수
fun doSomething(completion: (Int) -> Unit) {
    completion(42)
}`,
    },
    web: {
      language: 'typescript',
      code: `// 화살표 함수
const greet = (name: string): string => \`안녕, \${name}!\`

// 배열 메서드
[1, 2, 3].map(n => n * 2)

// 콜백
function doSomething(completion: (n: number) => void) {
    completion(42)
}`,
    },
    ios: {
      language: 'swift',
      code: `// Swift 클로저
let greet: (String) -> String = { name in "안녕, \\(name)!" }

// 단축 인자
[1, 2, 3].map { $0 * 2 }

// 후행 클로저
func doSomething(completion: (Int) -> Void) {
    completion(42)
}
doSomething { number in
    print(number)
}`,
    },
  },

  protocol: {
    caption: '프로토콜 / 인터페이스',
    android: {
      language: 'kotlin',
      code: `// Kotlin 인터페이스
interface Greetable {
    val name: String
    fun greet(): String
}

class Person(override val name: String) : Greetable {
    override fun greet() = "안녕, $name!"
}`,
    },
    web: {
      language: 'typescript',
      code: `// TypeScript 인터페이스
interface Greetable {
    name: string
    greet(): string
}

class Person implements Greetable {
    constructor(public name: string) {}
    greet() { return \`안녕, \${this.name}!\` }
}`,
    },
    ios: {
      language: 'swift',
      code: `// Swift 프로토콜
protocol Greetable {
    var name: String { get }
    func greet() -> String
}

struct Person: Greetable {
    let name: String
    func greet() -> String { "안녕, \\(name)!" }
}`,
    },
  },
};
