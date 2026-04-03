// @ts-nocheck — 이 파일은 코드 예제 문자열 데이터 파일이므로 TS 타입 체크 생략
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

  // ── Chapter 2: SwiftUI ──
  ui_text: {
    caption: 'Text / TextView / <p> — 텍스트 표시',
    android: {
      language: 'kotlin',
      code: `// Jetpack Compose
Text(
    text = "안녕하세요, CrossFront!",
    fontSize = 24.sp,
    fontWeight = FontWeight.Bold,
    color = Color.Blue,
    maxLines = 2,
    overflow = TextOverflow.Ellipsis
)

// XML (기존 방식)
// <TextView
//     android:text="안녕하세요"
//     android:textSize="24sp"
//     android:textStyle="bold"
//     android:textColor="@color/blue" />`,
    },
    web: {
      language: 'typescript',
      code: `// React + TypeScript
function Greeting() {
  return (
    <p
      style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: 'blue',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
      }}
    >
      안녕하세요, CrossFront!
    </p>
  )
}

// Tailwind CSS 사용 시
// <p className="text-2xl font-bold text-blue-600 line-clamp-2">
//   안녕하세요, CrossFront!
// </p>`,
    },
    ios: {
      language: 'swift',
      code: `// SwiftUI
Text("안녕하세요, CrossFront!")
    .font(.title)                    // Dynamic Type 지원
    .fontWeight(.bold)
    .foregroundStyle(.blue)
    .lineLimit(2)                    // 최대 2줄
    .truncationMode(.tail)           // 말줄임 위치

// 사용자 정의 폰트
Text("커스텀 폰트")
    .font(.custom("Pretendard-Bold", size: 24))

// 다국어 지원 (Localizable.strings)
Text("greeting_key")                 // NSLocalizedString 자동 연동

// AttributedString — 부분 스타일
var attributed = AttributedString("굵고 파란 텍스트")
attributed.font = .boldSystemFont(ofSize: 18)
attributed.foregroundColor = .blue
Text(attributed)`,
    },
  },

  ui_button: {
    caption: 'Button — 탭/클릭 인터랙션',
    android: {
      language: 'kotlin',
      code: `// Jetpack Compose
Button(
    onClick = { println("탭!") },
    colors = ButtonDefaults.buttonColors(
        containerColor = Color.Blue
    ),
    shape = RoundedCornerShape(50)
) {
    Icon(Icons.Default.Favorite, contentDescription = null)
    Spacer(Modifier.width(8.dp))
    Text("좋아요")
}

// 아이콘 버튼
IconButton(onClick = { /* ... */ }) {
    Icon(Icons.Default.Delete, contentDescription = "삭제")
}`,
    },
    web: {
      language: 'typescript',
      code: `// React + TypeScript
function LikeButton() {
  const handleClick = () => console.log('탭!')

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: 'blue',
        color: 'white',
        borderRadius: '9999px',
        padding: '8px 16px',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <span>♥</span>
      좋아요
    </button>
  )
}`,
    },
    ios: {
      language: 'swift',
      code: `// 기본 버튼 (trailing closure 문법)
Button("저장") {
    saveData()
}

// 커스텀 label — 어떤 View든 가능
Button {
    likePost()
} label: {
    Label("좋아요", systemImage: "heart.fill")
        .font(.headline)
        .padding(.horizontal, 20)
        .padding(.vertical, 12)
        .background(.blue)
        .foregroundStyle(.white)
        .clipShape(.capsule)
}

// ButtonStyle로 재사용 가능한 스타일 정의
struct PrimaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding()
            .background(configuration.isPressed ? .blue.opacity(0.7) : .blue)
            .foregroundStyle(.white)
            .clipShape(.roundedRectangle(cornerRadius: 12))
            .scaleEffect(configuration.isPressed ? 0.96 : 1.0)
            .animation(.easeOut(duration: 0.1), value: configuration.isPressed)
    }
}

Button("확인") { confirm() }
    .buttonStyle(PrimaryButtonStyle())

// 비활성화
Button("제출") { submit() }
    .disabled(inputText.isEmpty)`,
    },
  },

  ui_stack: {
    caption: 'VStack / HStack / ZStack — 레이아웃 컨테이너',
    android: {
      language: 'kotlin',
      code: `// Jetpack Compose
// 수직 배치
Column(
    verticalArrangement = Arrangement.spacedBy(8.dp),
    horizontalAlignment = Alignment.CenterHorizontally,
    modifier = Modifier.padding(16.dp)
) {
    Text("첫 번째")
    Text("두 번째")
}

// 수평 배치
Row(
    horizontalArrangement = Arrangement.SpaceBetween,
    verticalAlignment = Alignment.CenterVertically,
    modifier = Modifier.fillMaxWidth()
) {
    Text("왼쪽")
    Text("오른쪽")
}

// 겹치기
Box(contentAlignment = Alignment.Center) {
    Image(painter = painterResource(R.drawable.bg), contentDescription = null)
    Text("위에 표시", color = Color.White)
}`,
    },
    web: {
      language: 'typescript',
      code: `// React + CSS Flexbox
function Layout() {
  return (
    // 수직 배치 (VStack)
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
      <p>첫 번째</p>
      <p>두 번째</p>
    </div>
  )
}

// 수평 배치 (HStack)
// <div style={{ display: 'flex', flexDirection: 'row',
//               justifyContent: 'space-between', alignItems: 'center' }}>
//   <span>왼쪽</span>
//   <span>오른쪽</span>
// </div>

// 겹치기 (ZStack)
// <div style={{ position: 'relative' }}>
//   <img src="bg.jpg" alt="" />
//   <span style={{ position: 'absolute', top: '50%', left: '50%',
//                  transform: 'translate(-50%, -50%)', color: 'white' }}>
//     위에 표시
//   </span>
// </div>`,
    },
    ios: {
      language: 'swift',
      code: `// VStack — 세로 배치
VStack(alignment: .leading, spacing: 8) {
    Text("제목")
        .font(.headline)
    Text("부제목")
        .font(.subheadline)
        .foregroundStyle(.secondary)
}
.padding()

// HStack — 가로 배치
HStack(alignment: .center, spacing: 12) {
    Image(systemName: "person.circle.fill")
        .font(.largeTitle)
    VStack(alignment: .leading) {
        Text("홍길동")
            .font(.headline)
        Text("iOS 개발자")
            .font(.caption)
            .foregroundStyle(.secondary)
    }
    Spacer()               // 남은 공간 채우기
    Text("팔로우")
        .padding(.horizontal, 16)
        .padding(.vertical, 6)
        .background(.blue)
        .foregroundStyle(.white)
        .clipShape(.capsule)
}

// ZStack — 겹치기 (Z축)
ZStack(alignment: .bottomTrailing) {
    Image("profile_bg")
        .resizable()
        .scaledToFill()
        .frame(height: 200)
        .clipped()
    Text("배경 위 텍스트")
        .padding(8)
        .background(.black.opacity(0.5))
        .foregroundStyle(.white)
        .clipShape(.roundedRectangle(cornerRadius: 8))
        .padding()
}

// LazyVGrid — 그리드 레이아웃
let columns = [GridItem(.adaptive(minimum: 150), spacing: 12)]

LazyVGrid(columns: columns, spacing: 12) {
    ForEach(items) { item in
        CardView(item: item)
    }
}
.padding()`,
    },
  },

  ui_state: {
    caption: '@State / MutableStateFlow / useState — 로컬 상태 관리',
    android: {
      language: 'kotlin',
      code: `// Jetpack Compose — remember + mutableStateOf
@Composable
fun CounterScreen() {
    var count by remember { mutableIntStateOf(0) }

    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(
            text = "$count",
            style = MaterialTheme.typography.displayLarge
        )
        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
            Button(onClick = { count-- }) { Text("-") }
            Button(onClick = { count++ }) { Text("+") }
        }
    }
}

// ViewModel + StateFlow (화면 회전 등에서도 유지)
class CounterViewModel : ViewModel() {
    private val _count = MutableStateFlow(0)
    val count: StateFlow<Int> = _count.asStateFlow()

    fun increment() { _count.update { it + 1 } }
    fun decrement() { _count.update { it - 1 } }
}`,
    },
    web: {
      language: 'typescript',
      code: `// React — useState Hook
import { useState } from 'react'

function CounterScreen() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '4rem', fontWeight: 'bold' }}>{count}</p>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <button onClick={() => setCount(c => c - 1)}>-</button>
        <button onClick={() => setCount(c => c + 1)}>+</button>
      </div>
    </div>
  )
}

// Zustand / Redux 등 전역 상태는 별도 라이브러리 사용`,
    },
    ios: {
      language: 'swift',
      code: `// @State — View가 소유하는 로컬 상태
struct CounterScreen: View {
    @State private var count = 0          // private 권장
    @State private var isAnimating = false

    var body: some View {
        VStack(spacing: 24) {
            Text("\(count)")
                .font(.system(size: 80, weight: .bold, design: .rounded))
                .foregroundStyle(count >= 0 ? .blue : .red)
                .scaleEffect(isAnimating ? 1.2 : 1.0)
                .animation(.spring(duration: 0.2), value: isAnimating)

            HStack(spacing: 20) {
                Button {
                    count -= 1
                    triggerAnimation()
                } label: {
                    Image(systemName: "minus.circle.fill")
                        .font(.system(size: 44))
                        .foregroundStyle(.red)
                }

                Button {
                    count += 1
                    triggerAnimation()
                } label: {
                    Image(systemName: "plus.circle.fill")
                        .font(.system(size: 44))
                        .foregroundStyle(.blue)
                }
            }

            Button("초기화") { count = 0 }
                .foregroundStyle(.secondary)
        }
        .padding()
    }

    private func triggerAnimation() {
        isAnimating = true
        // 0.2초 후 원래 크기로
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.2) {
            isAnimating = false
        }
    }
}

// @State는 값 타입(struct, enum, 기본 타입)에 적합
// 참조 타입(class)에는 @StateObject / @ObservedObject 사용 (5장에서 심화)`,
    },
  },

  ui_binding: {
    caption: '@Binding — 부모↔자식 양방향 상태 공유',
    android: {
      language: 'kotlin',
      code: `// Compose — 상태를 상위로 호이스팅(State Hoisting)
@Composable
fun ParentScreen() {
    var isOn by remember { mutableStateOf(false) }
    ToggleRow(isOn = isOn, onToggle = { isOn = it })
}

@Composable
fun ToggleRow(
    isOn: Boolean,
    onToggle: (Boolean) -> Unit   // 콜백으로 상태 변경 요청
) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Text(if (isOn) "켜짐" else "꺼짐")
        Switch(checked = isOn, onCheckedChange = onToggle)
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// React — props + onChange 콜백 패턴
interface ToggleRowProps {
  isOn: boolean
  onToggle: (newValue: boolean) => void  // 상태 변경 콜백
}

function ToggleRow({ isOn, onToggle }: ToggleRowProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span>{isOn ? '켜짐' : '꺼짐'}</span>
      <input
        type="checkbox"
        checked={isOn}
        onChange={e => onToggle(e.target.checked)}
      />
    </div>
  )
}

function ParentScreen() {
  const [isOn, setIsOn] = useState(false)
  return <ToggleRow isOn={isOn} onToggle={setIsOn} />
}`,
    },
    ios: {
      language: 'swift',
      code: `// 부모 View — @State로 상태 소유
struct ParentScreen: View {
    @State private var isNotificationsOn = true
    @State private var username = ""

    var body: some View {
        Form {
            // $isNotificationsOn → Binding<Bool> 생성 ($ prefix)
            ToggleRow(isOn: $isNotificationsOn, label: "알림 받기")

            // $username → Binding<String>
            UsernameField(username: $username)
        }
    }
}

// 자식 View — @Binding으로 부모 상태를 읽고 쓴다
struct ToggleRow: View {
    @Binding var isOn: Bool      // $ 없이 선언, 사용 시 isOn으로 접근
    let label: String

    var body: some View {
        Toggle(label, isOn: $isOn)  // Toggle에게 다시 Binding 전달
    }
}

struct UsernameField: View {
    @Binding var username: String

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text("사용자 이름")
                .font(.caption)
                .foregroundStyle(.secondary)
            TextField("홍길동", text: $username)
                .textFieldStyle(.roundedBorder)
        }
    }
}

// Preview에서 @Binding 테스트
#Preview {
    ToggleRow(isOn: .constant(true), label: "미리보기용")
}`,
    },
  },

  ui_list: {
    caption: 'List / ForEach — 데이터 목록 렌더링',
    android: {
      language: 'kotlin',
      code: `// Jetpack Compose — LazyColumn (RecyclerView 대체)
data class Contact(val id: Int, val name: String, val email: String)

@Composable
fun ContactList(contacts: List<Contact>) {
    LazyColumn(
        verticalArrangement = Arrangement.spacedBy(4.dp),
        contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp)
    ) {
        items(
            items = contacts,
            key = { it.id }          // React key와 동일
        ) { contact ->
            ContactRow(contact)
        }

        item {                       // 하단 로딩 인디케이터
            CircularProgressIndicator()
        }
    }
}

@Composable
fun ContactRow(contact: Contact) {
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(contact.name, style = MaterialTheme.typography.titleMedium)
            Text(contact.email, style = MaterialTheme.typography.bodySmall)
        }
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// React — Array.map()
interface Contact {
  id: number
  name: string
  email: string
}

function ContactList({ contacts }: { contacts: Contact[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {contacts.map(contact => (
        <li
          key={contact.id}          // key prop 필수
          style={{
            padding: '12px 16px',
            borderBottom: '1px solid #eee',
          }}
        >
          <ContactRow contact={contact} />
        </li>
      ))}
    </ul>
  )
}

function ContactRow({ contact }: { contact: Contact }) {
  return (
    <div>
      <strong>{contact.name}</strong>
      <p style={{ color: '#666', margin: '4px 0 0' }}>{contact.email}</p>
    </div>
  )
}`,
    },
    ios: {
      language: 'swift',
      code: `// Identifiable 프로토콜 채택 — id 파라미터 불필요
struct Contact: Identifiable {
    let id: Int
    let name: String
    let email: String
}

struct ContactListView: View {
    @State private var contacts = [
        Contact(id: 1, name: "김철수", email: "cs@example.com"),
        Contact(id: 2, name: "이영희", email: "yh@example.com"),
        Contact(id: 3, name: "박민준", email: "mj@example.com"),
    ]

    var body: some View {
        List {
            // Section으로 그룹화
            Section("즐겨찾기") {
                ForEach(contacts.prefix(1)) { contact in
                    ContactRow(contact: contact)
                }
            }

            Section("전체") {
                ForEach(contacts) { contact in
                    ContactRow(contact: contact)
                        // 스와이프 액션
                        .swipeActions(edge: .trailing) {
                            Button(role: .destructive) {
                                deleteContact(contact)
                            } label: {
                                Label("삭제", systemImage: "trash")
                            }

                            Button {
                                editContact(contact)
                            } label: {
                                Label("편집", systemImage: "pencil")
                            }
                            .tint(.orange)
                        }
                }
                .onDelete(perform: deleteItems)  // 스와이프-to-delete
                .onMove(perform: moveItems)      // 드래그 순서 변경
            }
        }
        .listStyle(.insetGrouped)
        .navigationTitle("연락처")
        .toolbar {
            EditButton()             // 편집 모드 토글 (onMove 활성화)
        }
    }

    private func deleteContact(_ contact: Contact) {
        contacts.removeAll { $0.id == contact.id }
    }

    private func deleteItems(at offsets: IndexSet) {
        contacts.remove(atOffsets: offsets)
    }

    private func moveItems(from source: IndexSet, to destination: Int) {
        contacts.move(fromOffsets: source, toOffset: destination)
    }

    private func editContact(_ contact: Contact) { /* ... */ }
}

struct ContactRow: View {
    let contact: Contact

    var body: some View {
        HStack(spacing: 12) {
            Circle()
                .fill(.blue.gradient)
                .frame(width: 44, height: 44)
                .overlay {
                    Text(String(contact.name.prefix(1)))
                        .font(.headline)
                        .foregroundStyle(.white)
                }
            VStack(alignment: .leading, spacing: 2) {
                Text(contact.name)
                    .font(.headline)
                Text(contact.email)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }
        }
        .padding(.vertical, 4)
    }
}`,
    },
  },

  ui_textfield: {
    caption: 'TextField / @Binding — 텍스트 입력',
    android: {
      language: 'kotlin',
      code: `// Jetpack Compose
@Composable
fun LoginForm() {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    val focusManager = LocalFocusManager.current

    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        OutlinedTextField(
            value = email,
            onValueChange = { email = it },
            label = { Text("이메일") },
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Email,
                imeAction = ImeAction.Next
            ),
            keyboardActions = KeyboardActions(
                onNext = { focusManager.moveFocus(FocusDirection.Down) }
            ),
            modifier = Modifier.fillMaxWidth()
        )

        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("비밀번호") },
            visualTransformation = PasswordVisualTransformation(),
            keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
            keyboardActions = KeyboardActions(onDone = { focusManager.clearFocus() }),
            modifier = Modifier.fillMaxWidth()
        )
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// React + TypeScript
import { useState, useRef } from 'react'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const passwordRef = useRef<HTMLInputElement>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={e => setEmail(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && passwordRef.current?.focus()}
        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}
      />
      <input
        ref={passwordRef}
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}
      />
    </div>
  )
}`,
    },
    ios: {
      language: 'swift',
      code: `// SwiftUI TextField + SecureField
struct LoginFormView: View {
    @State private var email = ""
    @State private var password = ""
    @State private var isPasswordVisible = false

    // @FocusState — 프로그래밍적 포커스 제어
    @FocusState private var focusedField: Field?

    enum Field {
        case email, password
    }

    var body: some View {
        VStack(spacing: 16) {
            // 일반 텍스트 필드
            TextField("이메일", text: $email)
                .keyboardType(.emailAddress)         // 이메일 키보드
                .autocorrectionDisabled()
                .textInputAutocapitalization(.never)  // 자동 대문자 비활성
                .submitLabel(.next)                  // 키보드 Return 버튼 레이블
                .focused($focusedField, equals: .email)
                .onSubmit {
                    focusedField = .password         // 다음 필드로 포커스 이동
                }
                .textFieldStyle(.roundedBorder)

            // 비밀번호 필드 (입력값 숨김)
            HStack {
                Group {
                    if isPasswordVisible {
                        TextField("비밀번호", text: $password)
                    } else {
                        SecureField("비밀번호", text: $password)
                    }
                }
                .focused($focusedField, equals: .password)
                .submitLabel(.done)
                .onSubmit { focusedField = nil }     // 키보드 닫기

                Button {
                    isPasswordVisible.toggle()
                } label: {
                    Image(systemName: isPasswordVisible ? "eye.slash" : "eye")
                        .foregroundStyle(.secondary)
                }
            }
            .textFieldStyle(.roundedBorder)

            Button("로그인") {
                focusedField = nil   // 키보드 숨기기
                login()
            }
            .buttonStyle(.borderedProminent)
            .disabled(email.isEmpty || password.isEmpty)
        }
        .padding()
        // 뷰 탭 시 키보드 닫기
        .onTapGesture { focusedField = nil }
    }

    private func login() {
        // 로그인 로직
    }
}`,
    },
  },

  ui_conditional: {
    caption: '조건부 렌더링 — if/else vs visibility vs &&/ternary',
    android: {
      language: 'kotlin',
      code: `// Jetpack Compose — if/else (Kotlin 표현식)
@Composable
fun StatusBanner(isLoggedIn: Boolean, username: String?) {
    if (isLoggedIn && username != null) {
        Card(
            colors = CardDefaults.cardColors(containerColor = Color.Green.copy(alpha = 0.1f))
        ) {
            Text("환영합니다, $username!", modifier = Modifier.padding(16.dp))
        }
    } else {
        OutlinedCard {
            Text("로그인이 필요합니다.", modifier = Modifier.padding(16.dp))
        }
    }
}

// AnimatedVisibility — 애니메이션과 함께
AnimatedVisibility(
    visible = showBanner,
    enter = fadeIn() + slideInVertically(),
    exit = fadeOut() + slideOutVertically()
) {
    Text("배너 메시지")
}`,
    },
    web: {
      language: 'typescript',
      code: `// React — JSX 조건부 렌더링
function StatusBanner({ isLoggedIn, username }: {
  isLoggedIn: boolean
  username: string | null
}) {
  // 논리 AND (&&)
  return (
    <div>
      {isLoggedIn && username && (
        <div style={{ background: '#e8f5e9', padding: '16px', borderRadius: '8px' }}>
          환영합니다, {username}!
        </div>
      )}

      {/* 삼항 연산자 */}
      {isLoggedIn
        ? <p style={{ color: 'green' }}>로그인 상태</p>
        : <p style={{ color: 'gray' }}>로그인이 필요합니다.</p>
      }
    </div>
  )
}`,
    },
    ios: {
      language: 'swift',
      code: `// SwiftUI — body 안에서 if/else 사용 가능 (ViewBuilder 덕분)
struct StatusBanner: View {
    let isLoggedIn: Bool
    let username: String?

    var body: some View {
        VStack(spacing: 12) {
            // if let — 옵셔널 바인딩과 조건부 렌더링 동시에
            if isLoggedIn, let name = username {
                HStack {
                    Image(systemName: "checkmark.circle.fill")
                        .foregroundStyle(.green)
                    Text("환영합니다, \(name)!")
                        .font(.headline)
                }
                .padding()
                .background(.green.opacity(0.1))
                .clipShape(.roundedRectangle(cornerRadius: 12))
            } else {
                HStack {
                    Image(systemName: "exclamationmark.triangle.fill")
                        .foregroundStyle(.orange)
                    Text("로그인이 필요합니다.")
                }
                .padding()
                .background(.orange.opacity(0.1))
                .clipShape(.roundedRectangle(cornerRadius: 12))
            }

            // 삼항 연산자 (modifier에서도 사용 가능)
            Text(isLoggedIn ? "로그인 상태" : "비로그인 상태")
                .foregroundStyle(isLoggedIn ? .green : .red)
                .font(.caption)
        }
    }
}

// 조건부 modifier
struct ConditionalModifierExample: View {
    @State private var isHighlighted = false

    var body: some View {
        Text("탭해보세요")
            // if 조건에 따라 다른 modifier 적용
            .padding()
            .background(isHighlighted ? .yellow : .clear)
            .clipShape(.roundedRectangle(cornerRadius: 8))
            .onTapGesture { isHighlighted.toggle() }
    }
}`,
    },
  },

  ui_asyncimage: {
    caption: 'AsyncImage — 원격 이미지 비동기 로딩',
    ios: {
      language: 'swift',
      code: `import SwiftUI

// 기본 AsyncImage
struct BasicAsyncImageView: View {
    let imageURL = URL(string: "https://picsum.photos/400/300")!

    var body: some View {
        AsyncImage(url: imageURL) { image in
            image
                .resizable()
                .scaledToFill()
        } placeholder: {
            ProgressView()                   // 로딩 중 표시
                .frame(width: 200, height: 150)
        }
        .frame(width: 200, height: 150)
        .clipShape(.roundedRectangle(cornerRadius: 12))
    }
}

// 로딩 상태 세밀하게 제어 (phase 기반)
struct AdvancedAsyncImageView: View {
    let url: URL

    var body: some View {
        AsyncImage(url: url) { phase in
            switch phase {
            case .empty:
                // 로딩 전 / 로딩 중
                ZStack {
                    RoundedRectangle(cornerRadius: 12)
                        .fill(.gray.opacity(0.2))
                    ProgressView()
                }

            case .success(let image):
                // 로딩 성공
                image
                    .resizable()
                    .scaledToFill()
                    .clipShape(.roundedRectangle(cornerRadius: 12))
                    .transition(.opacity.animation(.easeIn(duration: 0.3)))

            case .failure(let error):
                // 로딩 실패
                ZStack {
                    RoundedRectangle(cornerRadius: 12)
                        .fill(.red.opacity(0.1))
                    VStack(spacing: 8) {
                        Image(systemName: "photo.badge.exclamationmark")
                            .font(.largeTitle)
                            .foregroundStyle(.red.opacity(0.6))
                        Text("이미지를 불러올 수 없습니다")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                }

            @unknown default:
                EmptyView()
            }
        }
        .frame(width: 300, height: 200)
    }
}

// 실전: 카드 컴포넌트에서 AsyncImage 활용
struct ArticleCard: View {
    let title: String
    let thumbnailURL: URL?

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            AsyncImage(url: thumbnailURL) { phase in
                if let image = phase.image {
                    image.resizable().scaledToFill()
                } else {
                    Rectangle().fill(.gray.opacity(0.15))
                        .overlay {
                            Image(systemName: "newspaper")
                                .foregroundStyle(.gray)
                        }
                }
            }
            .frame(height: 180)
            .clipped()

            Text(title)
                .font(.headline)
                .padding()
        }
        .background(.background)
        .clipShape(.roundedRectangle(cornerRadius: 16))
        .shadow(color: .black.opacity(0.08), radius: 8, y: 4)
    }
}`,
    },
  },

  // ── Chapter 3: 네비게이션 ──
  nav_push: {
    caption: 'Push 네비게이션 — 화면 스택 이동',
    android: {
      language: 'kotlin',
      code: `// Android — Jetpack Navigation (NavController)
// nav_graph.xml에 destination 정의 후 사용

// 1. Fragment에서 이동
findNavController().navigate(R.id.action_list_to_detail)

// 2. 목록 → 상세 (Compose Navigation)
@Composable
fun AppNavigation() {
    val navController = rememberNavController()

    NavHost(navController, startDestination = "list") {
        composable("list") {
            ArticleListScreen(
                onItemClick = { articleId ->
                    navController.navigate("detail/$articleId")
                }
            )
        }
        composable("detail/{articleId}") { backStackEntry ->
            val id = backStackEntry.arguments?.getString("articleId")
            ArticleDetailScreen(articleId = id)
        }
    }
}

// 3. 목록 화면
@Composable
fun ArticleListScreen(onItemClick: (String) -> Unit) {
    LazyColumn {
        items(articles) { article ->
            ListItem(
                headlineContent = { Text(article.title) },
                modifier = Modifier.clickable { onItemClick(article.id) }
            )
        }
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// React — React Router v6
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

// 1. 라우터 설정
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

// 2. 목록 화면 — Link로 이동
function ArticleList() {
  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id}>
          {/* URL 기반 선언적 이동 */}
          <Link to={\`/article/\${article.id}\`}>
            {article.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// 3. 상세 화면 — URL 파라미터로 데이터 수신
function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => a.id === id);

  return (
    <div>
      <h1>{article?.title}</h1>
      <p>{article?.body}</p>
    </div>
  );
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS — SwiftUI NavigationStack (iOS 16+)
import SwiftUI

// 1. 루트: NavigationStack 컨테이너
struct ContentView: View {
    var body: some View {
        NavigationStack {
            ArticleListView()
                .navigationTitle("아티클")
        }
    }
}

// 2. 목록 화면 — NavigationLink로 이동
struct ArticleListView: View {
    let articles = Article.samples

    var body: some View {
        List(articles) { article in
            // 탭하면 ArticleDetailView로 Push
            NavigationLink(article.title) {
                ArticleDetailView(article: article)
            }
        }
    }
}

// 3. 상세 화면 — 뒤로가기 버튼 자동 제공
struct ArticleDetailView: View {
    let article: Article

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 12) {
                Text(article.title)
                    .font(.largeTitle).bold()
                Text(article.body)
            }
            .padding()
        }
        .navigationTitle(article.title)
        .navigationBarTitleDisplayMode(.inline)
    }
}`,
    },
  },

  nav_data_pass: {
    caption: '화면 간 데이터 전달',
    android: {
      language: 'kotlin',
      code: `// Android — Bundle / SafeArgs (Compose Navigation)

// 1. 모델 정의
data class Product(
    val id: Int,
    val name: String,
    val price: Double
)

// 2. 이동 시 id를 URL 파라미터로 전달
@Composable
fun ProductListScreen(navController: NavController) {
    val products = listOf(
        Product(1, "MacBook Pro", 2_499_000.0),
        Product(2, "iPhone 15", 1_250_000.0),
    )

    LazyColumn {
        items(products) { product ->
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable {
                        // URL 파라미터로 id 전달
                        navController.navigate("product/\${product.id}")
                    }
                    .padding(8.dp)
            ) {
                Text(product.name, modifier = Modifier.padding(16.dp))
            }
        }
    }
}

// 3. 수신 화면 — id로 데이터 조회
@Composable
fun ProductDetailScreen(productId: Int) {
    val product = findProductById(productId)

    Column(modifier = Modifier.padding(16.dp)) {
        Text(product.name, style = MaterialTheme.typography.headlineMedium)
        Text("₩\${product.price.toInt():,}")
    }
}

// NavHost 설정
NavHost(navController, startDestination = "products") {
    composable("products") { ProductListScreen(navController) }
    composable(
        "product/{productId}",
        arguments = listOf(navArgument("productId") { type = NavType.IntType })
    ) { backStack ->
        val id = backStack.arguments!!.getInt("productId")
        ProductDetailScreen(productId = id)
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// React — useNavigate + state 또는 URL 파라미터

interface Product {
  id: number;
  name: string;
  price: number;
}

// 방법 1: URL 파라미터 (공유 가능한 URL)
function ProductList() {
  const products: Product[] = [
    { id: 1, name: 'MacBook Pro', price: 2499000 },
    { id: 2, name: 'iPhone 15', price: 1250000 },
  ];

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {/* Link로 URL 파라미터 전달 */}
          <Link to={\`/product/\${product.id}\`}>
            {product.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));
  return <div><h1>{product?.name}</h1></div>;
}

// 방법 2: useNavigate + state (URL에 노출 안 됨)
function ProductListWithState() {
  const navigate = useNavigate();

  const goToDetail = (product: Product) => {
    navigate(\`/product/\${product.id}\`, {
      state: { product },  // state로 전체 객체 전달
    });
  };

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id} onClick={() => goToDetail(p)} style={{ cursor: 'pointer' }}>
          {p.name}
        </li>
      ))}
    </ul>
  );
}

function ProductDetailWithState() {
  const location = useLocation();
  const product = location.state?.product as Product | undefined;
  return <div><h1>{product?.name}</h1></div>;
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS — NavigationLink(value:) + navigationDestination(for:)
import SwiftUI

// 1. Hashable 모델 정의 (필수)
struct Product: Identifiable, Hashable {
    let id: Int
    let name: String
    let price: Double
}

// 2. 목록 화면 — value로 타입 안전하게 전달
struct ProductListView: View {
    let products = [
        Product(id: 1, name: "MacBook Pro", price: 2_499_000),
        Product(id: 2, name: "iPhone 15",  price: 1_250_000),
        Product(id: 3, name: "iPad Pro",   price: 1_729_000),
    ]

    var body: some View {
        List(products) { product in
            // value: 전달할 데이터 (Hashable 필수)
            NavigationLink(value: product) {
                HStack {
                    Text(product.name)
                    Spacer()
                    Text("₩\(Int(product.price).formatted())")
                        .foregroundStyle(.secondary)
                }
            }
        }
        .navigationTitle("상품 목록")
        // Product 타입이 전달되면 이 뷰로 이동
        .navigationDestination(for: Product.self) { product in
            ProductDetailView(product: product)
        }
    }
}

// 3. 상세 화면 — 이니셜라이저로 데이터 수신
struct ProductDetailView: View {
    let product: Product  // 직접 주입, URL 파싱 불필요

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(product.name)
                .font(.largeTitle).bold()
            Text("₩\(Int(product.price).formatted())")
                .font(.title2)
                .foregroundStyle(.blue)
        }
        .padding()
        .navigationTitle(product.name)
        .navigationBarTitleDisplayMode(.inline)
    }
}`,
    },
  },

  nav_sheet: {
    caption: '시트 (모달) — 아래에서 올라오는 화면',
    android: {
      language: 'kotlin',
      code: `// Android — Jetpack Compose ModalBottomSheet
import androidx.compose.material3.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ArticleScreen() {
    var showBottomSheet by remember { mutableStateOf(false) }
    val sheetState = rememberModalBottomSheetState()

    Column(modifier = Modifier.padding(16.dp)) {
        Text("아티클 목록", style = MaterialTheme.typography.headlineMedium)
        Spacer(modifier = Modifier.height(16.dp))

        Button(onClick = { showBottomSheet = true }) {
            Text("새 아티클 작성")
        }
    }

    // 모달 바텀 시트
    if (showBottomSheet) {
        ModalBottomSheet(
            onDismissRequest = { showBottomSheet = false },
            sheetState = sheetState,
        ) {
            // 시트 내용
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp)
            ) {
                Text("새 아티클", style = MaterialTheme.typography.titleLarge)
                Spacer(modifier = Modifier.height(8.dp))
                OutlinedTextField(
                    value = "",
                    onValueChange = {},
                    label = { Text("제목") },
                    modifier = Modifier.fillMaxWidth()
                )
                Spacer(modifier = Modifier.height(16.dp))
                Row(horizontalArrangement = Arrangement.End, modifier = Modifier.fillMaxWidth()) {
                    TextButton(onClick = { showBottomSheet = false }) {
                        Text("취소")
                    }
                    Button(onClick = { showBottomSheet = false }) {
                        Text("저장")
                    }
                }
                // 키보드 높이만큼 패딩 (IME insets)
                Spacer(modifier = Modifier.windowInsetsBottomHeight(WindowInsets.ime))
            }
        }
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// React — useState + 모달 컴포넌트 (Headless UI 스타일)
import { useState } from 'react';

interface NewArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, body: string) => void;
}

function NewArticleModal({ isOpen, onClose, onSave }: NewArticleModalProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  if (!isOpen) return null;

  return (
    // 오버레이
    <div
      style={{
        position: 'fixed', inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'flex-end',  // 하단 정렬
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      {/* 모달 패널 — 아래에서 올라오는 효과 */}
      <div
        style={{
          width: '100%', backgroundColor: 'white',
          borderRadius: '16px 16px 0 0', padding: '24px',
          maxHeight: '80vh', overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>새 아티클</h2>
        <input
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', marginBottom: '12px' }}
        />
        <textarea
          placeholder="내용"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{ width: '100%', minHeight: '120px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
          <button onClick={onClose}>취소</button>
          <button onClick={() => { onSave(title, body); onClose(); }}>저장</button>
        </div>
      </div>
    </div>
  );
}

// 사용
function ArticleScreen() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h1>아티클 목록</h1>
      <button onClick={() => setShowModal(true)}>새 아티클 작성</button>
      <NewArticleModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={(title, body) => console.log(title, body)}
      />
    </div>
  );
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS — .sheet(isPresented:) + .sheet(item:)
import SwiftUI

// 방법 1: Boolean으로 열고 닫기
struct ArticleListView: View {
    @State private var showingNewArticle = false

    var body: some View {
        List { /* ... */ }
        .navigationTitle("아티클")
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button("작성") {
                    showingNewArticle = true  // true → 시트 열림
                }
            }
        }
        // isPresented가 true면 시트 열림
        .sheet(isPresented: $showingNewArticle) {
            NewArticleSheet()
        }
    }
}

// 방법 2: item 기반 (데이터 전달)
struct ArticleManagerView: View {
    @State private var articleToEdit: Article? = nil  // nil = 닫힘

    var body: some View {
        List(articles) { article in
            HStack {
                Text(article.title)
                Spacer()
                Button("편집") {
                    articleToEdit = article  // 값 설정 → 시트 열림
                }
            }
        }
        // item이 non-nil이면 시트 열림, 해당 item이 클로저로 전달
        .sheet(item: $articleToEdit) { article in
            ArticleEditSheet(article: article) {
                articleToEdit = nil  // 닫기
            }
        }
    }
}

// 시트 내부 뷰
struct NewArticleSheet: View {
    @Environment(\.dismiss) private var dismiss  // 닫기 환경값
    @State private var title = ""

    var body: some View {
        NavigationStack {
            Form {
                TextField("제목", text: $title)
            }
            .navigationTitle("새 아티클")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    Button("취소") { dismiss() }  // 시트 닫기
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button("저장") {
                        saveArticle()
                        dismiss()
                    }
                    .disabled(title.isEmpty)
                }
            }
        }
        // 하프 시트 (iOS 16+)
        .presentationDetents([.medium, .large])
        .presentationDragIndicator(.visible)
    }

    func saveArticle() { /* 저장 로직 */ }
}`,
    },
  },

  nav_tab: {
    caption: '탭 바 네비게이션',
    android: {
      language: 'kotlin',
      code: `// Android — Jetpack Compose NavigationBar (Material 3)
import androidx.compose.material3.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*

data class TabItem(
    val title: String,
    val icon: ImageVector,
    val route: String
)

val tabs = listOf(
    TabItem("홈",   Icons.Default.Home,   "home"),
    TabItem("검색", Icons.Default.Search, "search"),
    TabItem("보관함", Icons.Default.Favorite, "library"),
    TabItem("프로필", Icons.Default.Person, "profile"),
)

@Composable
fun MainScreen() {
    val navController = rememberNavController()
    val currentBackStack by navController.currentBackStackEntryAsState()
    val currentRoute = currentBackStack?.destination?.route

    Scaffold(
        bottomBar = {
            NavigationBar {
                tabs.forEach { tab ->
                    NavigationBarItem(
                        icon = { Icon(tab.icon, contentDescription = tab.title) },
                        label = { Text(tab.title) },
                        selected = currentRoute == tab.route,
                        onClick = {
                            navController.navigate(tab.route) {
                                // 탭 전환 시 백스택 정리
                                popUpTo(navController.graph.startDestinationId) {
                                    saveState = true
                                }
                                launchSingleTop = true
                                restoreState = true
                            }
                        }
                    )
                }
            }
        }
    ) { innerPadding ->
        NavHost(
            navController,
            startDestination = "home",
            modifier = Modifier.padding(innerPadding)
        ) {
            composable("home")    { HomeScreen() }
            composable("search")  { SearchScreen() }
            composable("library") { LibraryScreen() }
            composable("profile") { ProfileScreen() }
        }
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// React — 탭 네비게이션 컴포넌트
import { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

interface TabConfig {
  label: string;
  icon: string;  // emoji 또는 아이콘 컴포넌트
  path: string;
  badge?: number;
}

const tabs: TabConfig[] = [
  { label: '홈',    icon: '🏠', path: '/' },
  { label: '검색',  icon: '🔍', path: '/search' },
  { label: '보관함', icon: '📚', path: '/library' },
  { label: '프로필', icon: '👤', path: '/profile', badge: 3 },
];

// 탭 바 레이아웃
function TabLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* 탭 콘텐츠 */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <Outlet />
      </main>

      {/* 하단 탭 바 */}
      <nav
        style={{
          display: 'flex',
          borderTop: '1px solid #e0e0e0',
          backgroundColor: 'white',
        }}
      >
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              style={{
                flex: 1, padding: '8px 0',
                border: 'none', background: 'none',
                cursor: 'pointer',
                color: isActive ? '#007AFF' : '#8E8E93',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: '2px', fontSize: '10px', position: 'relative',
              }}
            >
              <span style={{ fontSize: '22px' }}>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.badge && (
                <span style={{
                  position: 'absolute', top: 4, right: '20%',
                  background: 'red', color: 'white',
                  borderRadius: '10px', padding: '1px 5px', fontSize: '10px',
                }}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default TabLayout;`,
    },
    ios: {
      language: 'swift',
      code: `// iOS — TabView (SwiftUI)
import SwiftUI

struct MainTabView: View {
    // 프로그래밍적 탭 전환을 위한 상태
    @State private var selectedTab: Tab = .home
    @State private var unreadCount = 3

    enum Tab {
        case home, search, library, profile
    }

    var body: some View {
        TabView(selection: $selectedTab) {
            // 탭 1: 홈 — 자체 NavigationStack
            NavigationStack {
                HomeView()
                    .navigationTitle("홈")
            }
            .tabItem {
                Label("홈", systemImage: "house.fill")
            }
            .tag(Tab.home)

            // 탭 2: 검색
            NavigationStack {
                SearchView()
                    .navigationTitle("검색")
            }
            .tabItem {
                Label("검색", systemImage: "magnifyingglass")
            }
            .tag(Tab.search)

            // 탭 3: 보관함
            NavigationStack {
                LibraryView()
                    .navigationTitle("보관함")
            }
            .tabItem {
                Label("보관함", systemImage: "books.vertical.fill")
            }
            .tag(Tab.library)

            // 탭 4: 프로필 (배지 포함)
            NavigationStack {
                ProfileView()
                    .navigationTitle("프로필")
            }
            .tabItem {
                Label("프로필", systemImage: "person.circle.fill")
            }
            .badge(unreadCount)    // 숫자 배지
            .tag(Tab.profile)
        }
    }
}

// 다른 화면에서 탭 전환
// @EnvironmentObject 또는 @Observable로 selectedTab 공유 후:
// selectedTab = .profile`,
    },
  },

  nav_alert: {
    caption: '알림 다이얼로그 (Alert)',
    android: {
      language: 'kotlin',
      code: `// Android — Jetpack Compose AlertDialog (Material 3)
import androidx.compose.material3.*

@Composable
fun DeleteConfirmScreen() {
    var showDialog by remember { mutableStateOf(false) }
    var itemToDelete by remember { mutableStateOf<String?>(null) }

    Column(modifier = Modifier.padding(16.dp)) {
        // 단순 알림
        Button(onClick = { showDialog = true }) {
            Text("알림 보기")
        }

        // 삭제 확인
        Button(
            onClick = { itemToDelete = "중요 파일" },
            colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.error)
        ) {
            Text("삭제")
        }
    }

    // 단순 알림 다이얼로그
    if (showDialog) {
        AlertDialog(
            onDismissRequest = { showDialog = false },
            title = { Text("알림") },
            text = { Text("작업이 완료되었습니다.") },
            confirmButton = {
                TextButton(onClick = { showDialog = false }) {
                    Text("확인")
                }
            }
        )
    }

    // 확인/취소 다이얼로그
    itemToDelete?.let { name ->
        AlertDialog(
            onDismissRequest = { itemToDelete = null },
            title = { Text("삭제 확인") },
            text = { Text("'$name'을(를) 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.") },
            confirmButton = {
                TextButton(
                    onClick = {
                        performDelete(name)
                        itemToDelete = null
                    },
                    colors = ButtonDefaults.textButtonColors(
                        contentColor = MaterialTheme.colorScheme.error
                    )
                ) {
                    Text("삭제")
                }
            },
            dismissButton = {
                TextButton(onClick = { itemToDelete = null }) {
                    Text("취소")
                }
            }
        )
    }
}

fun performDelete(name: String) { /* 삭제 로직 */ }`,
    },
    web: {
      language: 'typescript',
      code: `// React — 커스텀 Alert 모달 + window.confirm 대체
import { useState } from 'react';

interface AlertDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function AlertDialog({
  isOpen, title, message,
  confirmLabel = '확인', cancelLabel = '취소',
  isDestructive = false,
  onConfirm, onCancel,
}: AlertDialogProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'white', borderRadius: '14px',
          padding: '20px', maxWidth: '270px', width: '90%',
          textAlign: 'center',
        }}
      >
        <h3 style={{ margin: '0 0 8px', fontSize: '17px', fontWeight: 600 }}>{title}</h3>
        <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#555' }}>{message}</p>
        <div style={{ borderTop: '1px solid #e0e0e0', display: 'flex' }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1, padding: '12px', border: 'none', background: 'none',
              cursor: 'pointer', color: '#007AFF', fontSize: '17px',
              borderRight: '1px solid #e0e0e0',
            }}
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1, padding: '12px', border: 'none', background: 'none',
              cursor: 'pointer', fontSize: '17px', fontWeight: 600,
              color: isDestructive ? '#FF3B30' : '#007AFF',
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// 사용 예시
function FileManager() {
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  return (
    <div>
      <button onClick={() => setDeleteTarget('중요 파일.pdf')}>
        파일 삭제
      </button>

      <AlertDialog
        isOpen={deleteTarget !== null}
        title="파일 삭제"
        message={\`'\${deleteTarget}'을(를) 삭제하시겠습니까? 복구할 수 없습니다.\`}
        confirmLabel="삭제"
        isDestructive={true}
        onConfirm={() => { console.log('삭제:', deleteTarget); setDeleteTarget(null); }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS — .alert() 모디파이어 (SwiftUI)
import SwiftUI

struct FileManagerView: View {
    // 단순 알림
    @State private var showSuccessAlert = false

    // 확인/취소 (삭제 등)
    @State private var fileToDelete: String? = nil
    @State private var showDeleteAlert = false

    var body: some View {
        VStack(spacing: 16) {
            // 단순 성공 알림
            Button("작업 완료 알림") {
                showSuccessAlert = true
            }

            // 삭제 확인
            Button("파일 삭제", role: .destructive) {
                fileToDelete = "중요 파일.pdf"
                showDeleteAlert = true
            }
        }
        .padding()

        // 단순 알림 (버튼 1개)
        .alert("완료", isPresented: $showSuccessAlert) {
            Button("확인", role: .cancel) {}
        } message: {
            Text("파일이 성공적으로 저장되었습니다.")
        }

        // 확인/취소 (버튼 2개 + destructive)
        .alert("'\(fileToDelete ?? "")' 삭제", isPresented: $showDeleteAlert) {
            Button("삭제", role: .destructive) {
                if let file = fileToDelete {
                    deleteFile(named: file)
                }
                fileToDelete = nil
            }
            Button("취소", role: .cancel) {
                fileToDelete = nil
            }
        } message: {
            Text("이 파일을 삭제하면 복구할 수 없습니다.")
        }
    }

    func deleteFile(named name: String) {
        print("\\(name) 삭제됨")
    }
}`,
    },
  },

  nav_dismiss: {
    caption: '화면 닫기 / 뒤로가기',
    android: {
      language: 'kotlin',
      code: `// Android — 다양한 뒤로가기/닫기 패턴

// 1. Compose Navigation — popBackStack
@Composable
fun DetailScreen(navController: NavController) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("상세 화면")

        // 이전 화면으로 돌아가기
        Button(onClick = { navController.popBackStack() }) {
            Text("뒤로가기")
        }

        // 특정 화면까지 돌아가기
        Button(onClick = {
            navController.popBackStack("home", inclusive = false)
        }) {
            Text("홈으로")
        }
    }
}

// 2. BottomSheet 닫기
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun EditSheet(
    sheetState: SheetState,
    onDismiss: () -> Unit
) {
    val scope = rememberCoroutineScope()

    Column(modifier = Modifier.padding(16.dp)) {
        Text("편집")

        Button(onClick = {
            scope.launch {
                sheetState.hide()  // 애니메이션으로 닫기
                onDismiss()
            }
        }) {
            Text("닫기")
        }
    }
}

// 3. Activity onBackPressed 커스텀 처리
@Composable
fun FormScreen(navController: NavController) {
    var hasUnsavedChanges by remember { mutableStateOf(false) }
    var showExitDialog by remember { mutableStateOf(false) }

    // 뒤로가기 인터셉트
    BackHandler(enabled = hasUnsavedChanges) {
        showExitDialog = true  // 직접 닫지 않고 다이얼로그 표시
    }

    if (showExitDialog) {
        AlertDialog(
            onDismissRequest = { showExitDialog = false },
            title = { Text("변경사항 취소") },
            text = { Text("저장하지 않은 변경사항이 있습니다. 나가시겠습니까?") },
            confirmButton = {
                TextButton(onClick = {
                    showExitDialog = false
                    navController.popBackStack()
                }) { Text("나가기") }
            },
            dismissButton = {
                TextButton(onClick = { showExitDialog = false }) {
                    Text("계속 편집")
                }
            }
        )
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// React — useNavigate(-1) 및 모달 닫기 패턴
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// 1. 이전 페이지로 뒤로가기
function DetailPage() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)}>← 뒤로가기</button>
      {/* 또는 특정 경로로 이동 */}
      <button onClick={() => navigate('/')}>홈으로</button>
    </div>
  );
}

// 2. 모달 닫기 (부모 콜백)
interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string }) => void;
}

function EditModal({ isOpen, onClose, onSave }: EditModalProps) {
  const [title, setTitle] = useState('');

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100 }}
      onClick={onClose}  // 배경 클릭 시 닫기
    >
      <div
        style={{ background: 'white', margin: '10% auto', padding: '24px', maxWidth: '400px', borderRadius: '12px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>편집</h2>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목" />
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
          <button onClick={onClose}>취소</button>      {/* 닫기 */}
          <button onClick={() => { onSave({ title }); onClose(); }}>저장</button>
        </div>
      </div>
    </div>
  );
}

// 3. 변경사항 있을 때 뒤로가기 차단 (useBlocker - RR v6.9+)
import { useBlocker } from 'react-router-dom';

function FormPage() {
  const [isDirty, setIsDirty] = useState(false);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname
  );

  return (
    <div>
      <input onChange={() => setIsDirty(true)} placeholder="내용 입력" />
      {blocker.state === 'blocked' && (
        <div>
          <p>저장하지 않은 변경사항이 있습니다.</p>
          <button onClick={() => blocker.proceed()}>나가기</button>
          <button onClick={() => blocker.reset()}>취소</button>
        </div>
      )}
    </div>
  );
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS — @Environment(\\.dismiss) 다양한 활용
import SwiftUI

// 1. 시트/풀스크린 닫기
struct EditSheetView: View {
    @Environment(\.dismiss) private var dismiss  // 현재 화면을 닫는 액션

    var body: some View {
        NavigationStack {
            Form { /* 편집 폼 */ }
            .navigationTitle("편집")
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    // 취소 버튼 — dismiss()로 닫기
                    Button("취소") {
                        dismiss()
                    }
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button("저장") {
                        save()
                        dismiss()  // 저장 후 닫기
                    }
                }
            }
        }
    }

    func save() { /* 저장 로직 */ }
}

// 2. NavigationStack에서 Push된 화면 pop
struct DetailView: View {
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        VStack {
            Text("상세 화면")

            Button("뒤로가기") {
                dismiss()  // NavigationStack에서는 pop 동작
            }
        }
    }
}

// 3. 변경사항 있을 때 닫기 전 확인
struct FormView: View {
    @Environment(\.dismiss) private var dismiss
    @State private var title = ""
    @State private var showDiscardAlert = false

    private var hasChanges: Bool { !title.isEmpty }

    var body: some View {
        NavigationStack {
            Form {
                TextField("제목", text: $title)
            }
            .navigationTitle("새 항목")
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    Button("취소") {
                        if hasChanges {
                            showDiscardAlert = true  // 변경사항 있으면 확인
                        } else {
                            dismiss()
                        }
                    }
                }
            }
            .alert("변경사항 취소", isPresented: $showDiscardAlert) {
                Button("나가기", role: .destructive) { dismiss() }
                Button("계속 편집", role: .cancel) {}
            } message: {
                Text("저장하지 않은 변경사항이 있습니다.")
            }
        }
        // iOS 15+: 아래로 드래그 닫기 방지
        .interactiveDismissDisabled(hasChanges)
    }
}`,
    },
  },

  // ── Chapter 4: 데이터/네트워크 ──
  net_get: {
    caption: '기본 GET 요청',
    android: {
      language: 'kotlin',
      code: `// Retrofit 인터페이스 정의
interface GitHubApi {
    @GET("users/{username}")
    suspend fun getUser(
        @Path("username") username: String
    ): GitHubUser
}

// Retrofit 인스턴스 생성
val retrofit = Retrofit.Builder()
    .baseUrl("https://api.github.com/")
    .addConverterFactory(GsonConverterFactory.create())
    .build()

val api = retrofit.create(GitHubApi::class.java)

// 호출 (Coroutine 컨텍스트 내)
viewModelScope.launch {
    try {
        val user = api.getUser("octocat")
        println(user.name)
    } catch (e: Exception) {
        println("Error: \${e.message}")
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// fetch 사용 (기본 내장)
const response = await fetch(
    'https://api.github.com/users/octocat'
);

if (!response.ok) {
    throw new Error(\`HTTP error: \${response.status}\`);
}

const user: GitHubUser = await response.json();
console.log(user.name);

// axios 사용 (라이브러리)
import axios from 'axios';

const { data: user } = await axios.get<GitHubUser>(
    'https://api.github.com/users/octocat'
);
console.log(user.name);`,
    },
    ios: {
      language: 'swift',
      code: `// URLSession.shared 사용 — async/await
let url = URL(string: "https://api.github.com/users/octocat")!

let (data, response) = try await URLSession.shared.data(from: url)

// HTTP 상태코드 확인
guard let httpResponse = response as? HTTPURLResponse,
      httpResponse.statusCode == 200 else {
    throw NetworkError.invalidResponse
}

// JSON 디코딩
let user = try JSONDecoder().decode(GitHubUser.self, from: data)
print(user.name)`,
    },
  },

  net_codable: {
    caption: 'JSON 모델 정의 — Codable vs data class vs interface',
    android: {
      language: 'kotlin',
      code: `// Gson 사용 시
data class GitHubUser(
    val id: Int,
    val login: String,
    val name: String?,           // nullable
    @SerializedName("avatar_url")
    val avatarUrl: String,
    @SerializedName("public_repos")
    val publicRepos: Int,
    val followers: Int,
    val bio: String?
)

// Moshi 사용 시 (@Json 어노테이션)
@JsonClass(generateAdapter = true)
data class GitHubUser(
    val id: Int,
    val login: String,
    @Json(name = "avatar_url") val avatarUrl: String,
    @Json(name = "public_repos") val publicRepos: Int
)`,
    },
    web: {
      language: 'typescript',
      code: `// TypeScript interface (런타임 검증 없음)
interface GitHubUser {
    id: number;
    login: string;
    name: string | null;          // nullable
    avatar_url: string;           // snake_case 그대로
    public_repos: number;
    followers: number;
    bio: string | null;
}

// 사용 — JSON.parse는 any 반환
const user = JSON.parse(jsonString) as GitHubUser;

// Zod로 런타임 검증 (권장)
import { z } from 'zod';
const GitHubUserSchema = z.object({
    id: z.number(),
    login: z.string(),
    avatar_url: z.string(),
});
const user = GitHubUserSchema.parse(data);`,
    },
    ios: {
      language: 'swift',
      code: `// Codable = Encodable + Decodable
struct GitHubUser: Codable {
    let id: Int
    let login: String
    let name: String?            // Optional — null 허용
    let avatarUrl: String        // camelCase로 매핑
    let publicRepos: Int
    let followers: Int
    let bio: String?

    // snake_case → camelCase 자동 변환
    enum CodingKeys: String, CodingKey {
        case id, login, name, followers, bio
        case avatarUrl   = "avatar_url"
        case publicRepos = "public_repos"
    }
}

// 디코더에 keyDecodingStrategy 적용하면 CodingKeys 생략 가능
let decoder = JSONDecoder()
decoder.keyDecodingStrategy = .convertFromSnakeCase
let user = try decoder.decode(GitHubUser.self, from: data)`,
    },
  },

  net_async: {
    caption: 'async/await 비동기 패턴',
    android: {
      language: 'kotlin',
      code: `// suspend 함수 — Kotlin Coroutine
class UserRepository(private val api: GitHubApi) {

    suspend fun fetchUser(username: String): Result<GitHubUser> {
        return try {
            val user = api.getUser(username)  // suspend 자동 처리
            Result.success(user)
        } catch (e: IOException) {
            Result.failure(e)
        }
    }
}

// ViewModel에서 호출
class UserViewModel(private val repo: UserRepository) : ViewModel() {
    fun loadUser(username: String) {
        viewModelScope.launch {                // Coroutine 시작
            val result = repo.fetchUser(username)
            result.onSuccess { user ->
                _uiState.update { it.copy(user = user) }
            }
        }
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// async/await — JavaScript/TypeScript
async function fetchUser(username: string): Promise<GitHubUser> {
    const response = await fetch(
        \`https://api.github.com/users/\${username}\`
    );

    if (!response.ok) {
        throw new Error(\`HTTP \${response.status}\`);
    }

    return response.json() as Promise<GitHubUser>;
}

// React 커스텀 훅에서 호출
function useUser(username: string) {
    const [user, setUser] = useState<GitHubUser | null>(null);

    useEffect(() => {
        fetchUser(username)
            .then(setUser)
            .catch(console.error);
    }, [username]);

    return user;
}`,
    },
    ios: {
      language: 'swift',
      code: `// async/await — Swift 5.5+
func fetchUser(username: String) async throws -> GitHubUser {
    let url = URL(string: "https://api.github.com/users/\(username)")!

    let (data, response) = try await URLSession.shared.data(from: url)

    guard let http = response as? HTTPURLResponse,
          (200..<300).contains(http.statusCode) else {
        throw NetworkError.invalidResponse
    }

    let decoder = JSONDecoder()
    decoder.keyDecodingStrategy = .convertFromSnakeCase
    return try decoder.decode(GitHubUser.self, from: data)
}

// ViewModel에서 호출 — Task로 비동기 컨텍스트 시작
class UserViewModel: ObservableObject {
    func loadUser(username: String) {
        Task {                              // 비동기 컨텍스트 진입
            do {
                let user = try await fetchUser(username: username)
                await MainActor.run {      // UI는 메인 스레드에서
                    self.user = user
                }
            } catch {
                print("Error: \(error)")
            }
        }
    }
}`,
    },
  },

  net_error: {
    caption: '에러 처리 패턴',
    android: {
      language: 'kotlin',
      code: `// 커스텀 예외 클래스
sealed class NetworkException(message: String) : Exception(message) {
    class HttpError(val code: Int, message: String) : NetworkException(message)
    class NoInternet : NetworkException("인터넷 연결 없음")
    class ParseError : NetworkException("응답 파싱 실패")
}

// Result 래핑 패턴
suspend fun safeApiCall(username: String): Result<GitHubUser> {
    return try {
        val user = api.getUser(username)
        Result.success(user)
    } catch (e: HttpException) {
        Result.failure(
            NetworkException.HttpError(e.code(), e.message())
        )
    } catch (e: IOException) {
        Result.failure(NetworkException.NoInternet())
    }
}

// when으로 처리
val result = safeApiCall("octocat")
when {
    result.isSuccess -> showUser(result.getOrThrow())
    result.isFailure -> showError(result.exceptionOrNull()?.message)
}`,
    },
    web: {
      language: 'typescript',
      code: `// 커스텀 에러 클래스
class NetworkError extends Error {
    constructor(
        public statusCode: number,
        message: string
    ) {
        super(message);
        this.name = 'NetworkError';
    }
}

// try-catch 패턴
async function fetchUserSafe(username: string) {
    try {
        const response = await fetch(
            \`https://api.github.com/users/\${username}\`
        );
        if (!response.ok) {
            throw new NetworkError(
                response.status,
                \`HTTP Error: \${response.statusText}\`
            );
        }
        return await response.json() as GitHubUser;
    } catch (e) {
        if (e instanceof NetworkError) {
            console.error(\`Status \${e.statusCode}: \${e.message}\`);
        }
        throw e;  // 재던지기
    }
}

// axios interceptor로 전역 에러 처리
axios.interceptors.response.use(
    res => res,
    err => Promise.reject(
        new NetworkError(err.response?.status, err.message)
    )
);`,
    },
    ios: {
      language: 'swift',
      code: `// 커스텀 Error enum
enum NetworkError: Error, LocalizedError {
    case invalidURL
    case invalidResponse
    case httpError(statusCode: Int)
    case decodingFailed(Error)
    case noInternet

    var errorDescription: String? {
        switch self {
        case .invalidURL:        return "잘못된 URL입니다"
        case .invalidResponse:   return "서버 응답이 올바르지 않습니다"
        case .httpError(let code): return "HTTP 오류: \(code)"
        case .decodingFailed:    return "데이터 파싱에 실패했습니다"
        case .noInternet:        return "인터넷 연결을 확인해주세요"
        }
    }
}

// throws + do-catch 패턴
func fetchUser(username: String) async throws -> GitHubUser {
    guard let url = URL(string: "https://api.github.com/users/\(username)") else {
        throw NetworkError.invalidURL
    }

    let (data, response) = try await URLSession.shared.data(from: url)

    guard let http = response as? HTTPURLResponse else {
        throw NetworkError.invalidResponse
    }

    guard (200..<300).contains(http.statusCode) else {
        throw NetworkError.httpError(statusCode: http.statusCode)
    }

    do {
        return try JSONDecoder().decode(GitHubUser.self, from: data)
    } catch {
        throw NetworkError.decodingFailed(error)
    }
}

// 호출부
do {
    let user = try await fetchUser(username: "octocat")
    print(user.name ?? "이름 없음")
} catch let error as NetworkError {
    print(error.errorDescription ?? "알 수 없는 오류")
} catch {
    print("예기치 않은 오류: \(error)")
}`,
    },
  },

  net_post: {
    caption: 'POST 요청 — JSON 바디 전송',
    android: {
      language: 'kotlin',
      code: `// Retrofit 인터페이스
interface IssueApi {
    @POST("repos/{owner}/{repo}/issues")
    suspend fun createIssue(
        @Path("owner") owner: String,
        @Path("repo") repo: String,
        @Body body: CreateIssueRequest
    ): Issue
}

data class CreateIssueRequest(
    val title: String,
    val body: String,
    val labels: List<String> = emptyList()
)

// 호출
viewModelScope.launch {
    val request = CreateIssueRequest(
        title = "버그 리포트",
        body = "앱이 크래시됩니다"
    )
    val issue = api.createIssue("owner", "repo", request)
    println("Created: \${issue.number}")
}`,
    },
    web: {
      language: 'typescript',
      code: `interface CreateIssueRequest {
    title: string;
    body: string;
    labels?: string[];
}

// fetch POST
async function createIssue(
    owner: string,
    repo: string,
    request: CreateIssueRequest
): Promise<Issue> {
    const response = await fetch(
        \`https://api.github.com/repos/\${owner}/\${repo}/issues\`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': \`token \${TOKEN}\`,
            },
            body: JSON.stringify(request),
        }
    );

    if (!response.ok) {
        throw new Error(\`HTTP \${response.status}\`);
    }

    return response.json();
}`,
    },
    ios: {
      language: 'swift',
      code: `struct CreateIssueRequest: Encodable {
    let title: String
    let body: String
    let labels: [String]
}

func createIssue(
    owner: String,
    repo: String,
    request: CreateIssueRequest
) async throws -> Issue {
    let url = URL(
        string: "https://api.github.com/repos/\(owner)/\(repo)/issues"
    )!

    var urlRequest = URLRequest(url: url)
    urlRequest.httpMethod = "POST"
    urlRequest.setValue("application/json", forHTTPHeaderField: "Content-Type")
    urlRequest.setValue("token \(TOKEN)", forHTTPHeaderField: "Authorization")

    // JSONEncoder로 직렬화
    urlRequest.httpBody = try JSONEncoder().encode(request)

    let (data, response) = try await URLSession.shared.data(for: urlRequest)

    guard let http = response as? HTTPURLResponse,
          (200..<300).contains(http.statusCode) else {
        throw NetworkError.invalidResponse
    }

    return try JSONDecoder().decode(Issue.self, from: data)
}`,
    },
  },

  net_userdefaults: {
    caption: '로컬 키-값 저장소',
    android: {
      language: 'kotlin',
      code: `// SharedPreferences (레거시)
val prefs = context.getSharedPreferences("app_settings", Context.MODE_PRIVATE)

// 저장
prefs.edit()
    .putString("auth_token", "abc123")
    .putBoolean("dark_mode", true)
    .putInt("font_size", 16)
    .apply()   // 비동기 저장 (commit()은 동기)

// 읽기
val token = prefs.getString("auth_token", null)
val darkMode = prefs.getBoolean("dark_mode", false)

// DataStore (권장 — 코루틴 기반)
val Context.dataStore by preferencesDataStore(name = "settings")

val DARK_MODE = booleanPreferencesKey("dark_mode")

// 저장
context.dataStore.edit { settings ->
    settings[DARK_MODE] = true
}

// 읽기 (Flow)
val darkModeFlow: Flow<Boolean> = context.dataStore.data
    .map { settings -> settings[DARK_MODE] ?: false }`,
    },
    web: {
      language: 'typescript',
      code: `// localStorage — 동기, 문자열만 저장
localStorage.setItem('auth_token', 'abc123');
localStorage.setItem('dark_mode', JSON.stringify(true));
localStorage.setItem('font_size', JSON.stringify(16));

// 읽기
const token = localStorage.getItem('auth_token');   // string | null
const darkMode = JSON.parse(
    localStorage.getItem('dark_mode') ?? 'false'
) as boolean;

// 삭제
localStorage.removeItem('auth_token');
localStorage.clear();  // 전체 삭제

// sessionStorage — 탭 닫으면 삭제
sessionStorage.setItem('temp_data', 'value');

// 타입 안전 래퍼 패턴
function getItem<T>(key: string, defaultValue: T): T {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
}`,
    },
    ios: {
      language: 'swift',
      code: `// UserDefaults — 간단한 설정값 저장
let defaults = UserDefaults.standard

// 저장
defaults.set("abc123", forKey: "authToken")
defaults.set(true, forKey: "darkMode")
defaults.set(16, forKey: "fontSize")
defaults.set(Date(), forKey: "lastLogin")

// 읽기
let token = defaults.string(forKey: "authToken")        // String?
let darkMode = defaults.bool(forKey: "darkMode")        // Bool (기본 false)
let fontSize = defaults.integer(forKey: "fontSize")     // Int (기본 0)

// 삭제
defaults.removeObject(forKey: "authToken")

// @AppStorage — SwiftUI Property Wrapper (권장)
struct SettingsView: View {
    @AppStorage("darkMode") private var darkMode = false
    @AppStorage("fontSize") private var fontSize = 16

    var body: some View {
        Toggle("다크 모드", isOn: $darkMode)
        // darkMode 변경 시 자동으로 UserDefaults에 저장됨
    }
}

// Codable 객체 저장 (직접 지원 안 함 → JSON 인코딩)
struct UserProfile: Codable {
    let name: String
    let email: String
}

let profile = UserProfile(name: "홍길동", email: "hong@example.com")
if let encoded = try? JSONEncoder().encode(profile) {
    defaults.set(encoded, forKey: "userProfile")
}

if let data = defaults.data(forKey: "userProfile"),
   let profile = try? JSONDecoder().decode(UserProfile.self, from: data) {
    print(profile.name)
}`,
    },
  },

  net_combined: {
    caption: 'ViewModel + 네트워크 레이어 완전한 패턴',
    android: {
      language: 'kotlin',
      code: `// 1. 모델
data class GitHubUser(
    val id: Int,
    val login: String,
    val name: String?,
    @SerializedName("avatar_url") val avatarUrl: String,
    val followers: Int,
    val bio: String?
)

// 2. Retrofit API 인터페이스
interface GitHubApi {
    @GET("users/{username}")
    suspend fun getUser(@Path("username") username: String): GitHubUser

    @GET("search/users")
    suspend fun searchUsers(
        @Query("q") query: String
    ): SearchResult<GitHubUser>
}

// 3. Repository
class UserRepository(private val api: GitHubApi) {
    suspend fun searchUsers(query: String): Result<List<GitHubUser>> =
        runCatching { api.searchUsers(query).items }
}

// 4. UI 상태
sealed interface SearchUiState {
    data object Idle : SearchUiState
    data object Loading : SearchUiState
    data class Success(val users: List<GitHubUser>) : SearchUiState
    data class Error(val message: String) : SearchUiState
}

// 5. ViewModel
class SearchViewModel(private val repo: UserRepository) : ViewModel() {
    private val _uiState = MutableStateFlow<SearchUiState>(SearchUiState.Idle)
    val uiState: StateFlow<SearchUiState> = _uiState.asStateFlow()

    fun search(query: String) {
        if (query.isBlank()) return
        viewModelScope.launch {
            _uiState.value = SearchUiState.Loading
            repo.searchUsers(query)
                .onSuccess { _uiState.value = SearchUiState.Success(it) }
                .onFailure { _uiState.value = SearchUiState.Error(it.message ?: "오류") }
        }
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// 1. 타입 정의
interface GitHubUser {
    id: number;
    login: string;
    name: string | null;
    avatar_url: string;
    followers: number;
    bio: string | null;
}

interface SearchResult {
    items: GitHubUser[];
    total_count: number;
}

// 2. API 레이어
const BASE_URL = 'https://api.github.com';

async function searchUsers(query: string): Promise<GitHubUser[]> {
    const res = await fetch(
        \`\${BASE_URL}/search/users?q=\${encodeURIComponent(query)}\`
    );
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    const data: SearchResult = await res.json();
    return data.items;
}

// 3. 커스텀 훅 (React)
type SearchState =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; users: GitHubUser[] }
    | { status: 'error'; message: string };

function useUserSearch() {
    const [state, setState] = useState<SearchState>({ status: 'idle' });

    const search = useCallback(async (query: string) => {
        if (!query.trim()) return;
        setState({ status: 'loading' });
        try {
            const users = await searchUsers(query);
            setState({ status: 'success', users });
        } catch (e) {
            setState({ status: 'error', message: (e as Error).message });
        }
    }, []);

    return { state, search };
}

// 4. 컴포넌트
function SearchPage() {
    const { state, search } = useUserSearch();
    const [query, setQuery] = useState('');

    return (
        <div>
            <input value={query} onChange={e => setQuery(e.target.value)} />
            <button onClick={() => search(query)}>검색</button>
            {state.status === 'loading' && <p>로딩 중...</p>}
            {state.status === 'success' && state.users.map(u => (
                <div key={u.id}>{u.login}</div>
            ))}
        </div>
    );
}`,
    },
    ios: {
      language: 'swift',
      code: `// 1. 모델
struct GitHubUser: Codable, Identifiable {
    let id: Int
    let login: String
    let name: String?
    let avatarUrl: String
    let followers: Int
    let bio: String?
}

struct SearchResult: Codable {
    let items: [GitHubUser]
    let totalCount: Int
}

// 2. 네트워크 레이어
actor NetworkService {
    static let shared = NetworkService()
    private let decoder: JSONDecoder = {
        let d = JSONDecoder()
        d.keyDecodingStrategy = .convertFromSnakeCase
        return d
    }()

    func request<T: Decodable>(_ url: URL) async throws -> T {
        let (data, response) = try await URLSession.shared.data(from: url)
        guard let http = response as? HTTPURLResponse,
              (200..<300).contains(http.statusCode) else {
            throw NetworkError.invalidResponse
        }
        return try decoder.decode(T.self, from: data)
    }
}

// 3. Repository
struct UserRepository {
    func searchUsers(query: String) async throws -> [GitHubUser] {
        var components = URLComponents(
            string: "https://api.github.com/search/users"
        )!
        components.queryItems = [URLQueryItem(name: "q", value: query)]

        let result: SearchResult = try await NetworkService.shared
            .request(components.url!)
        return result.items
    }
}

// 4. UI 상태
enum SearchState {
    case idle
    case loading
    case success([GitHubUser])
    case failure(String)
}

// 5. ViewModel
@MainActor
class SearchViewModel: ObservableObject {
    @Published var state: SearchState = .idle
    @Published var query = ""

    private let repo = UserRepository()

    func search() {
        guard !query.trimmingCharacters(in: .whitespaces).isEmpty else { return }
        state = .loading

        Task {
            do {
                let users = try await repo.searchUsers(query: query)
                state = .success(users)
            } catch {
                state = .failure(error.localizedDescription)
            }
        }
    }
}

// 6. SwiftUI View
struct SearchView: View {
    @StateObject private var vm = SearchViewModel()

    var body: some View {
        NavigationStack {
            List {
                switch vm.state {
                case .idle:
                    Text("사용자를 검색하세요")
                        .foregroundStyle(.secondary)
                case .loading:
                    ProgressView()
                case .success(let users):
                    ForEach(users) { user in
                        UserRowView(user: user)
                    }
                case .failure(let message):
                    Text("오류: \(message)")
                        .foregroundStyle(.red)
                }
            }
            .searchable(text: $vm.query)
            .onSubmit(of: .search) {
                vm.search()
            }
            .navigationTitle("GitHub 검색")
        }
    }
}`,
    },
  },

  // ── Chapter 5: 아키텍처 ──
  arch_viewmodel: {
    caption: 'ViewModel 정의 — ObservableObject vs Android ViewModel vs React Custom Hook',
    android: {
      language: 'kotlin',
      code: `// Android: ViewModel + StateFlow (Jetpack)
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import androidx.lifecycle.viewModelScope

class NewsViewModel(
    private val repository: NewsRepository
) : ViewModel() {

    // UI가 구독할 불변 StateFlow
    private val _uiState = MutableStateFlow<NewsUiState>(NewsUiState.Loading)
    val uiState: StateFlow<NewsUiState> = _uiState.asStateFlow()

    init {
        loadNews()
    }

    fun loadNews() {
        viewModelScope.launch {
            _uiState.value = NewsUiState.Loading
            try {
                val articles = repository.fetchArticles()
                _uiState.value = NewsUiState.Success(articles)
            } catch (e: Exception) {
                _uiState.value = NewsUiState.Error(e.message ?: "Unknown error")
            }
        }
    }
}

sealed class NewsUiState {
    object Loading : NewsUiState()
    data class Success(val articles: List<Article>) : NewsUiState()
    data class Error(val message: String) : NewsUiState()
}

// Composable에서 사용
@Composable
fun NewsListScreen(viewModel: NewsViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    // ...
}`,
    },
    web: {
      language: 'typescript',
      code: `// Web (React): Custom Hook으로 ViewModel 역할 구현
import { useState, useEffect, useCallback } from 'react'

type NewsUiState =
  | { status: 'loading' }
  | { status: 'success'; articles: Article[] }
  | { status: 'error'; message: string }

function useNewsViewModel(repository: NewsRepository) {
  const [uiState, setUiState] = useState<NewsUiState>({ status: 'loading' })

  const loadNews = useCallback(async () => {
    setUiState({ status: 'loading' })
    try {
      const articles = await repository.fetchArticles()
      setUiState({ status: 'success', articles })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      setUiState({ status: 'error', message })
    }
  }, [repository])

  useEffect(() => {
    loadNews()
  }, [loadNews])

  return { uiState, reload: loadNews }
}

// 컴포넌트에서 사용
function NewsListScreen() {
  const repository = useNewsRepository() // Context에서 주입
  const { uiState, reload } = useNewsViewModel(repository)

  if (uiState.status === 'loading') return <Spinner />
  if (uiState.status === 'error') return <Error message={uiState.message} />
  return <NewsList articles={uiState.articles} onRefresh={reload} />
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS (SwiftUI): ObservableObject로 ViewModel 구현
import Foundation
import Combine

// ViewModel은 클래스! (참조 타입)
@MainActor
final class NewsViewModel: ObservableObject {

    // @Published: 값이 바뀌면 View가 자동으로 재렌더링
    @Published var articles: [Article] = []
    @Published var isLoading = false
    @Published var errorMessage: String?

    private let repository: NewsRepositoryProtocol

    // 의존성을 생성자로 주입 (테스트 용이)
    init(repository: NewsRepositoryProtocol = NewsRepository()) {
        self.repository = repository
    }

    func loadNews() async {
        isLoading = true
        errorMessage = nil
        do {
            articles = try await repository.fetchArticles()
        } catch {
            errorMessage = error.localizedDescription
        }
        isLoading = false
    }
}

// View에서 사용 (@StateObject로 소유)
struct NewsListView: View {
    @StateObject private var viewModel = NewsViewModel()

    var body: some View {
        Group {
            if viewModel.isLoading {
                ProgressView()
            } else if let error = viewModel.errorMessage {
                Text(error).foregroundColor(.red)
            } else {
                List(viewModel.articles) { article in
                    Text(article.title)
                }
            }
        }
        .task { await viewModel.loadNews() }
    }
}`,
    },
  },

  arch_stateobject: {
    caption: '@StateObject / @ObservedObject vs remember/hoist vs useState/useRef',
    android: {
      language: 'kotlin',
      code: `// Android Jetpack Compose: remember vs hiltViewModel

// ① 화면 수준 ViewModel — Hilt가 생명주기 관리
@Composable
fun NewsScreen(
    // hiltViewModel()은 Composable이 살아있는 동안 동일 인스턴스 유지
    viewModel: NewsViewModel = hiltViewModel()
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    NewsContent(uiState = uiState, onRefresh = viewModel::loadNews)
}

// ② 로컬 상태 — remember로 Composable 수명과 일치
@Composable
fun ExpandableCard(title: String) {
    // remember: 재구성(recomposition)에도 값 유지
    var expanded by remember { mutableStateOf(false) }

    Card(onClick = { expanded = !expanded }) {
        Text(title)
        if (expanded) Text("세부 내용...")
    }
}

// ③ 상태 호이스팅 — 부모가 소유, 자식은 콜백만 받음
@Composable
fun ParentScreen() {
    var query by remember { mutableStateOf("") }
    SearchBar(
        query = query,
        onQueryChange = { query = it }  // 상태는 부모가 소유
    )
}

@Composable
fun SearchBar(
    query: String,            // 상태를 props로 받음
    onQueryChange: (String) -> Unit
) {
    TextField(value = query, onValueChange = onQueryChange)
}`,
    },
    web: {
      language: 'typescript',
      code: `// React: useState (로컬) vs useRef (렌더 무관) vs 상태 끌어올리기

// ① 컴포넌트 로컬 상태
function ExpandableCard({ title }: { title: string }) {
  // useState: 바뀌면 리렌더링 발생
  const [expanded, setExpanded] = useState(false)

  return (
    <div onClick={() => setExpanded(!expanded)}>
      <h3>{title}</h3>
      {expanded && <p>세부 내용...</p>}
    </div>
  )
}

// ② useRef: 렌더링을 트리거하지 않는 값 보관
function Timer() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [count, setCount] = useState(0)

  const start = () => {
    intervalRef.current = setInterval(() => setCount(c => c + 1), 1000)
  }
  const stop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }
  return <div>{count} <button onClick={start}>시작</button></div>
}

// ③ 상태 끌어올리기 (Lifting State Up) — SwiftUI의 @ObservedObject와 유사
function ParentScreen() {
  const [query, setQuery] = useState('')  // 부모가 상태 소유

  return <SearchBar query={query} onQueryChange={setQuery} />
}

function SearchBar({
  query,
  onQueryChange,
}: {
  query: string
  onQueryChange: (q: string) => void
}) {
  return <input value={query} onChange={e => onQueryChange(e.target.value)} />
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS SwiftUI: @StateObject vs @ObservedObject — 소유권이 핵심!

// ① @StateObject: 해당 View가 ViewModel을 "소유"
//    → View가 재생성되어도 ViewModel 인스턴스는 유지됨
struct NewsListView: View {
    // ✅ 이 View가 생명주기를 책임짐
    @StateObject private var viewModel = NewsViewModel()

    var body: some View {
        List(viewModel.articles) { article in
            NavigationLink(value: article) {
                Text(article.title)
            }
        }
        .task { await viewModel.loadNews() }
    }
}

// ② @ObservedObject: 부모에게서 "전달받은" ViewModel
//    → View가 재생성되면 외부에서 다시 주입됨 (소유 X)
struct NewsDetailView: View {
    // ⚠️ 이 View는 소유자가 아님 — 부모가 만든 걸 받아서 씀
    @ObservedObject var viewModel: NewsDetailViewModel

    var body: some View {
        VStack {
            Text(viewModel.article.title)
            Text(viewModel.article.body)
        }
    }
}

// ③ 부모 → 자식 전달 패턴
struct ParentView: View {
    @StateObject private var detailVM = NewsDetailViewModel()

    var body: some View {
        // @StateObject로 만든 것을 @ObservedObject 자식에게 전달
        NewsDetailView(viewModel: detailVM)
    }
}

// ❌ 흔한 실수: 자식에서 @StateObject로 만들면 매 렌더마다 새 인스턴스
// struct ChildView: View {
//     @StateObject var vm = NewsDetailViewModel()  // 부모가 전달해야 할 걸 여기서 만들면 안 됨
// }`,
    },
  },

  arch_published: {
    caption: '@Published 프로퍼티 vs MutableStateFlow vs useState setter',
    android: {
      language: 'kotlin',
      code: `// Android: MutableStateFlow로 상태 노출
class ProfileViewModel : ViewModel() {

    // 내부: 쓰기 가능한 MutableStateFlow
    private val _name = MutableStateFlow("")
    private val _age  = MutableStateFlow(0)
    private val _isValid = MutableStateFlow(false)

    // 외부: 읽기 전용 StateFlow만 노출
    val name: StateFlow<String> = _name.asStateFlow()
    val age:  StateFlow<Int>    = _age.asStateFlow()
    val isValid: StateFlow<Boolean> = _isValid.asStateFlow()

    fun onNameChange(newName: String) {
        _name.value = newName
        validate()
    }

    fun onAgeChange(newAge: Int) {
        _age.value = newAge
        validate()
    }

    private fun validate() {
        _isValid.value = _name.value.isNotBlank() && _age.value > 0
    }
}

// Composable에서 구독
@Composable
fun ProfileForm(viewModel: ProfileViewModel = hiltViewModel()) {
    val name by viewModel.name.collectAsStateWithLifecycle()
    val isValid by viewModel.isValid.collectAsStateWithLifecycle()

    TextField(value = name, onValueChange = viewModel::onNameChange)
    Button(enabled = isValid, onClick = { /* 저장 */ }) { Text("저장") }
}`,
    },
    web: {
      language: 'typescript',
      code: `// React: useState setter로 상태 변경 알림

// ① 개별 state — 간단한 경우
function ProfileForm() {
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)

  const isValid = name.trim().length > 0 && age > 0  // 파생 상태는 계산

  return (
    <>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input type="number" value={age} onChange={e => setAge(+e.target.value)} />
      <button disabled={!isValid}>저장</button>
    </>
  )
}

// ② useReducer — 복잡한 상태 변경 로직
type Action =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_AGE'; payload: number }

function profileReducer(state: ProfileState, action: Action): ProfileState {
  switch (action.type) {
    case 'SET_NAME': return { ...state, name: action.payload }
    case 'SET_AGE':  return { ...state, age: action.payload }
  }
}

function ProfileFormAdvanced() {
  const [state, dispatch] = useReducer(profileReducer, { name: '', age: 0 })
  const isValid = state.name.trim().length > 0 && state.age > 0

  return (
    <>
      <input
        value={state.name}
        onChange={e => dispatch({ type: 'SET_NAME', payload: e.target.value })}
      />
      <button disabled={!isValid}>저장</button>
    </>
  )
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS: @Published — 값이 바뀌면 View에 자동으로 알림

import Combine
import Foundation

@MainActor
final class ProfileViewModel: ObservableObject {

    // @Published: willSet 직전에 objectWillChange를 자동 emit
    @Published var name: String = ""
    @Published var age: Int = 0

    // 파생 상태 — @Published 없이도 name/age 변경 시 함께 업데이트
    var isValid: Bool { !name.trimmingCharacters(in: .whitespaces).isEmpty && age > 0 }

    // 수동으로 알림 보내기 (고급 — 직접 제어가 필요할 때)
    func forceRefresh() {
        objectWillChange.send()
    }
}

// @Published + Combine 조합 — 사이드 이펙트 처리
final class SearchViewModel: ObservableObject {
    @Published var query: String = ""
    @Published var results: [String] = []

    private var cancellables = Set<AnyCancellable>()

    init() {
        // query가 바뀔 때마다 0.3초 디바운스 후 검색
        $query
            .debounce(for: .milliseconds(300), scheduler: RunLoop.main)
            .removeDuplicates()
            .sink { [weak self] newQuery in
                Task { await self?.search(query: newQuery) }
            }
            .store(in: &cancellables)
    }

    private func search(query: String) async {
        guard !query.isEmpty else { results = []; return }
        // 실제 검색 로직...
        results = ["결과1", "결과2"]
    }
}

struct ProfileForm: View {
    @StateObject private var vm = ProfileViewModel()

    var body: some View {
        Form {
            TextField("이름", text: $vm.name)   // $ 로 바인딩 — 양방향
            Stepper("나이: \(vm.age)", value: $vm.age, in: 0...120)
            Button("저장") { }
                .disabled(!vm.isValid)
        }
    }
}`,
    },
  },

  arch_envobject: {
    caption: '@EnvironmentObject vs CompositionLocalProvider vs React Context',
    android: {
      language: 'kotlin',
      code: `// Android Jetpack Compose: CompositionLocal로 전역 상태 공유

// ① CompositionLocal 정의
val LocalUserSession = compositionLocalOf<UserSession?> { null }
val LocalTheme = staticCompositionLocalOf { AppTheme.Light }

// ② 앱 최상단에서 값 제공
@Composable
fun App() {
    val userSession by userSessionViewModel.session.collectAsStateWithLifecycle()

    CompositionLocalProvider(
        LocalUserSession provides userSession,
        LocalTheme provides AppTheme.Dark,
    ) {
        AppNavigation()
    }
}

// ③ 깊은 자식에서 바로 꺼내 씀
@Composable
fun ProfileScreen() {
    val session = LocalUserSession.current
        ?: return  // null 처리

    Text("안녕하세요, \${session.userName}!")
}

// 실무 패턴: 화면 수준 ViewModel은 hiltViewModel()
// 전역 세션/테마 같은 것은 CompositionLocal 활용
@Composable
fun SettingsScreen(
    viewModel: SettingsViewModel = hiltViewModel()  // 화면 ViewModel
) {
    val theme = LocalTheme.current  // 전역 테마
    // ...
}`,
    },
    web: {
      language: 'typescript',
      code: `// React: Context + Provider로 전역 상태 공유

// ① Context 정의
interface UserSession {
  userId: string
  userName: string
  token: string
}

const UserSessionContext = createContext<UserSession | null>(null)

// 편의 hook
function useUserSession(): UserSession {
  const session = useContext(UserSessionContext)
  if (!session) throw new Error('UserSessionProvider 밖에서 사용됨')
  return session
}

// ② Provider — 앱 최상단
function App() {
  const [session, setSession] = useState<UserSession | null>(null)

  return (
    <UserSessionContext.Provider value={session}>
      <Router>
        <AppRoutes />
      </Router>
    </UserSessionContext.Provider>
  )
}

// ③ 깊은 자식에서 바로 사용
function ProfileScreen() {
  const session = useUserSession()  // props drilling 없이 바로 접근

  return <h1>안녕하세요, {session.userName}!</h1>
}

// ④ 여러 Provider 중첩
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS SwiftUI: @EnvironmentObject — 뷰 계층 전체에 전역 주입

import SwiftUI

// ① ObservableObject를 채택한 전역 상태 클래스
@MainActor
final class UserSession: ObservableObject {
    @Published var isLoggedIn = false
    @Published var userName: String = ""
    @Published var token: String?

    func login(name: String, token: String) {
        userName = name
        self.token = token
        isLoggedIn = true
    }

    func logout() {
        userName = ""
        token = nil
        isLoggedIn = false
    }
}

// ② 앱 최상단(또는 WindowGroup)에서 .environmentObject()로 주입
@main
struct NewsApp: App {
    @StateObject private var session = UserSession()  // 앱 생명주기 = 소유자

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(session)  // 하위 모든 View에서 접근 가능
        }
    }
}

// ③ 깊은 자식 View에서 @EnvironmentObject로 꺼내 씀
struct ProfileView: View {
    @EnvironmentObject var session: UserSession  // 주입 필수! 없으면 런타임 크래시

    var body: some View {
        VStack {
            Text("안녕하세요, \\(session.userName)!")
            Button("로그아웃") { session.logout() }
        }
    }
}

// ④ Preview에서는 수동으로 주입
#Preview {
    ProfileView()
        .environmentObject({
            let s = UserSession()
            s.userName = "홍길동"
            return s
        }())
}`,
    },
  },

  arch_di: {
    caption: '프로토콜 기반 DI vs Hilt @Inject vs React Context Provider',
    android: {
      language: 'kotlin',
      code: `// Android: Hilt로 의존성 주입

// ① 인터페이스 정의
interface NewsRepository {
    suspend fun fetchArticles(): List<Article>
}

// ② 실제 구현체
class NewsRepositoryImpl @Inject constructor(
    private val api: NewsApi,           // Hilt가 주입
    private val db: ArticleDao          // Hilt가 주입
) : NewsRepository {
    override suspend fun fetchArticles(): List<Article> {
        return api.getArticles()
    }
}

// ③ Hilt 모듈 — 인터페이스 ↔ 구현체 바인딩
@Module
@InstallIn(SingletonComponent::class)
abstract class RepositoryModule {

    @Binds
    @Singleton
    abstract fun bindNewsRepository(
        impl: NewsRepositoryImpl
    ): NewsRepository
}

// ④ ViewModel에 자동 주입
@HiltViewModel
class NewsViewModel @Inject constructor(
    private val repository: NewsRepository  // 인터페이스로 받음
) : ViewModel() {
    // ...
}

// ⑤ 테스트: FakeRepository로 교체
class FakeNewsRepository : NewsRepository {
    override suspend fun fetchArticles() = listOf(
        Article(id = "1", title = "테스트 기사")
    )
}`,
    },
    web: {
      language: 'typescript',
      code: `// React: Context + custom hook으로 DI 구현

// ① 인터페이스(타입) 정의
interface NewsRepository {
  fetchArticles(): Promise<Article[]>
}

// ② 실제 구현체
class NewsRepositoryImpl implements NewsRepository {
  async fetchArticles(): Promise<Article[]> {
    const res = await fetch('/api/articles')
    return res.json()
  }
}

// ③ Mock 구현체 (테스트/개발용)
class MockNewsRepository implements NewsRepository {
  async fetchArticles(): Promise<Article[]> {
    return [
      { id: '1', title: '테스트 기사', body: '내용' },
    ]
  }
}

// ④ Context로 주입
const NewsRepositoryContext = createContext<NewsRepository>(
  new NewsRepositoryImpl()
)

export function NewsRepositoryProvider({
  repository = new NewsRepositoryImpl(),
  children,
}: {
  repository?: NewsRepository
  children: React.ReactNode
}) {
  return (
    <NewsRepositoryContext.Provider value={repository}>
      {children}
    </NewsRepositoryContext.Provider>
  )
}

export const useNewsRepository = () => useContext(NewsRepositoryContext)

// ⑤ 테스트에서 Mock으로 교체
function renderWithMock(ui: React.ReactElement) {
  return render(
    <NewsRepositoryProvider repository={new MockNewsRepository()}>
      {ui}
    </NewsRepositoryProvider>
  )
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS Swift: 프로토콜로 DI — 인터페이스 역할

// ① 프로토콜 정의 (인터페이스)
protocol NewsRepositoryProtocol {
    func fetchArticles() async throws -> [Article]
}

// ② 실제 구현체
final class NewsRepository: NewsRepositoryProtocol {
    private let session: URLSession

    init(session: URLSession = .shared) {
        self.session = session
    }

    func fetchArticles() async throws -> [Article] {
        let url = URL(string: "https://api.example.com/articles")!
        let (data, _) = try await session.data(from: url)
        return try JSONDecoder().decode([Article].self, from: data)
    }
}

// ③ Mock 구현체 — 테스트 & Preview에서 사용
final class MockNewsRepository: NewsRepositoryProtocol {
    var stubbedArticles: [Article] = Article.samples
    var shouldThrow = false

    func fetchArticles() async throws -> [Article] {
        if shouldThrow { throw URLError(.notConnectedToInternet) }
        return stubbedArticles
    }
}

// ④ ViewModel — 프로토콜 타입으로 받음 (구체 타입 모름)
@MainActor
final class NewsViewModel: ObservableObject {
    @Published var articles: [Article] = []

    private let repository: NewsRepositoryProtocol  // 프로토콜 타입!

    init(repository: NewsRepositoryProtocol = NewsRepository()) {
        self.repository = repository
    }

    func loadNews() async {
        articles = (try? await repository.fetchArticles()) ?? []
    }
}

// ⑤ Preview에서 Mock 주입
#Preview {
    NewsListView(viewModel: NewsViewModel(repository: MockNewsRepository()))
}`,
    },
  },

  arch_repository: {
    caption: 'Repository 패턴 전체 구조 비교',
    android: {
      language: 'kotlin',
      code: `// Android: Repository + UseCase + ViewModel (Clean Architecture)

// ① 데이터 모델
data class Article(
    val id: String,
    val title: String,
    val body: String,
    val publishedAt: String
)

// ② Repository 인터페이스
interface NewsRepository {
    suspend fun getArticles(): List<Article>
    suspend fun getArticle(id: String): Article?
    suspend fun refreshArticles()
}

// ③ 구현체 (네트워크 + 캐시)
class NewsRepositoryImpl @Inject constructor(
    private val api: NewsApi,
    private val dao: ArticleDao
) : NewsRepository {

    override suspend fun getArticles(): List<Article> {
        return dao.getAll().ifEmpty {
            refreshArticles()
            dao.getAll()
        }
    }

    override suspend fun getArticle(id: String): Article? =
        dao.findById(id)

    override suspend fun refreshArticles() {
        val remote = api.fetchArticles()
        dao.insertAll(remote)
    }
}

// ④ UseCase (비즈니스 로직 단위)
class GetTopArticlesUseCase @Inject constructor(
    private val repository: NewsRepository
) {
    suspend operator fun invoke(limit: Int = 10): List<Article> {
        return repository.getArticles().take(limit)
    }
}

// ⑤ ViewModel에서 UseCase 호출
@HiltViewModel
class NewsViewModel @Inject constructor(
    private val getTopArticles: GetTopArticlesUseCase
) : ViewModel() {

    private val _articles = MutableStateFlow<List<Article>>(emptyList())
    val articles = _articles.asStateFlow()

    fun load() {
        viewModelScope.launch {
            _articles.value = getTopArticles(limit = 20)
        }
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// React: custom hook + service 레이어로 Repository 패턴 구현

// ① 데이터 모델
interface Article {
  id: string
  title: string
  body: string
  publishedAt: string
}

// ② Service (Repository 역할) 인터페이스
interface NewsService {
  getArticles(): Promise<Article[]>
  getArticle(id: string): Promise<Article | null>
  refreshArticles(): Promise<void>
}

// ③ 실제 구현체
class NewsServiceImpl implements NewsService {
  private cache: Article[] | null = null

  async getArticles(): Promise<Article[]> {
    if (this.cache) return this.cache
    await this.refreshArticles()
    return this.cache!
  }

  async getArticle(id: string): Promise<Article | null> {
    const articles = await this.getArticles()
    return articles.find(a => a.id === id) ?? null
  }

  async refreshArticles(): Promise<void> {
    const res = await fetch('/api/articles')
    this.cache = await res.json()
  }
}

// ④ UseCase hook (비즈니스 로직)
function useTopArticles(limit = 10) {
  const service = useNewsService()  // Context에서 주입
  return useQuery({
    queryKey: ['articles', 'top', limit],
    queryFn: async () => {
      const all = await service.getArticles()
      return all.slice(0, limit)
    },
  })
}

// ⑤ 컴포넌트에서 사용
function NewsListScreen() {
  const { data: articles = [], isLoading, error } = useTopArticles(20)

  if (isLoading) return <Spinner />
  return <NewsList articles={articles} />
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS: Repository 프로토콜 + 실제 구현 + UseCase + ViewModel

// ① 데이터 모델
struct Article: Identifiable, Codable {
    let id: String
    let title: String
    let body: String
    let publishedAt: Date
}

// ② Repository 프로토콜 (추상화 경계)
protocol NewsRepositoryProtocol {
    func getArticles() async throws -> [Article]
    func getArticle(id: String) async throws -> Article?
    func refreshArticles() async throws
}

// ③ 실제 구현체
final class NewsRepository: NewsRepositoryProtocol {
    private let networkService: NetworkServiceProtocol
    private var cache: [Article] = []

    init(networkService: NetworkServiceProtocol = NetworkService()) {
        self.networkService = networkService
    }

    func getArticles() async throws -> [Article] {
        if !cache.isEmpty { return cache }
        try await refreshArticles()
        return cache
    }

    func getArticle(id: String) async throws -> Article? {
        let articles = try await getArticles()
        return articles.first { $0.id == id }
    }

    func refreshArticles() async throws {
        cache = try await networkService.fetch(
            endpoint: "/articles",
            as: [Article].self
        )
    }
}

// ④ UseCase — 단일 비즈니스 로직 단위
struct GetTopArticlesUseCase {
    private let repository: NewsRepositoryProtocol

    init(repository: NewsRepositoryProtocol = NewsRepository()) {
        self.repository = repository
    }

    func execute(limit: Int = 10) async throws -> [Article] {
        let all = try await repository.getArticles()
        return Array(all.prefix(limit))
    }
}

// ⑤ ViewModel에서 UseCase 호출
@MainActor
final class NewsViewModel: ObservableObject {
    @Published var articles: [Article] = []
    @Published var isLoading = false
    @Published var errorMessage: String?

    private let getTopArticles: GetTopArticlesUseCase

    init(repository: NewsRepositoryProtocol = NewsRepository()) {
        self.getTopArticles = GetTopArticlesUseCase(repository: repository)
    }

    func loadNews() async {
        isLoading = true
        defer { isLoading = false }
        do {
            articles = try await getTopArticles.execute(limit: 20)
        } catch {
            errorMessage = error.localizedDescription
        }
    }
}

// ⑥ Mock으로 테스트
final class MockNewsRepository: NewsRepositoryProtocol {
    func getArticles() async throws -> [Article] { Article.samples }
    func getArticle(id: String) async throws -> Article? { Article.samples.first }
    func refreshArticles() async throws { }
}`,
    },
  },

  // ── Chapter 6: 배포 ──
  /**
   * deploy_versioning
   * iOS Bundle Version vs Android versionCode vs npm version 개념 비교
   */
  deploy_versioning: {
    caption: '버전 번호 관리 — iOS / Android / 웹 비교',
    ios: {
      language: 'swift',
      code: `// Info.plist (또는 프로젝트 설정)에서 관리
// CFBundleShortVersionString = "2.1.0"  (사용자에게 보이는 버전)
// CFBundleVersion            = "47"     (빌드 번호, 항상 증가)

// 코드에서 읽기
let appVersion = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String
// → "2.1.0"

let buildNumber = Bundle.main.infoDictionary?["CFBundleVersion"] as? String
// → "47"

// 표시용 포맷
let versionString = "v\\(appVersion ?? "?") (\\(buildNumber ?? "?"))"
// → "v2.1.0 (47)"

// 규칙:
// - App Store 심사 제출 시 buildNumber는 반드시 이전 제출보다 커야 함
// - 동일 Short Version 내에서도 buildNumber는 계속 올라감
// - TestFlight 업로드 시에도 동일 규칙 적용`,
    },
    android: {
      language: 'kotlin',
      code: `// build.gradle.kts (앱 모듈)
android {
    defaultConfig {
        versionCode = 47        // 정수, 항상 증가 (iOS buildNumber에 대응)
        versionName = "2.1.0"   // 사용자에게 보이는 버전 (iOS Short Version에 대응)
    }
}

// 코드에서 읽기
val appVersion = BuildConfig.VERSION_NAME   // "2.1.0"
val buildCode  = BuildConfig.VERSION_CODE   // 47

// 규칙:
// - Play Store 제출 시 versionCode는 반드시 이전보다 커야 함
// - versionName은 어떤 형식이든 자유 (관례상 SemVer)`,
    },
    web: {
      language: 'typescript',
      code: `// package.json
// {
//   "version": "2.1.0"   // SemVer (Major.Minor.Patch)
// }

// Vite/webpack에서 환경변수로 주입
// vite.config.ts
import { defineConfig } from 'vite'
import { readFileSync } from 'fs'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
})

// 컴포넌트에서 사용
declare const __APP_VERSION__: string
console.log(__APP_VERSION__)  // "2.1.0"

// 웹은 "빌드 번호" 개념 없음
// 대신 CI 빌드 번호나 커밋 SHA를 사용하는 경우가 많음
// VITE_COMMIT_SHA = git rev-parse --short HEAD`,
    },
  },

  /**
   * deploy_env
   * xcconfig 환경변수 vs BuildConfig(Android) vs .env(Web)
   */
  deploy_env: {
    caption: '환경별 설정 관리 — xcconfig / BuildConfig / .env',
    ios: {
      language: 'swift',
      code: `// 1. xcconfig 파일 생성 (예: Configs/Debug.xcconfig)
// API_BASE_URL = https:/$()/dev-api.example.com
// FEATURE_FLAG_CHAT = YES
// LOG_LEVEL = verbose

// 2. Info.plist에 연결
// <key>API_BASE_URL</key>
// <string>$(API_BASE_URL)</string>
// <key>FEATURE_FLAG_CHAT</key>
// <string>$(FEATURE_FLAG_CHAT)</string>

// 3. Swift 코드에서 읽기
enum AppConfig {
    static var apiBaseURL: String {
        Bundle.main.object(forInfoDictionaryKey: "API_BASE_URL") as? String
            ?? "https://api.example.com"
    }

    static var isChatEnabled: Bool {
        let value = Bundle.main.object(forInfoDictionaryKey: "FEATURE_FLAG_CHAT") as? String
        return value == "YES"
    }

    static var logLevel: String {
        Bundle.main.object(forInfoDictionaryKey: "LOG_LEVEL") as? String
            ?? "error"
    }
}

// 사용
URLSession.shared.dataTask(with: URL(string: AppConfig.apiBaseURL)!)

// 주의: xcconfig에서 // 는 주석으로 해석됨
// https:// 쓰려면 → https:/$()/  로 우회`,
    },
    android: {
      language: 'kotlin',
      code: `// build.gradle.kts — productFlavors로 환경 분리
android {
    buildTypes {
        debug {
            buildConfigField("String", "API_BASE_URL", "\\"https://dev-api.example.com\\"")
            buildConfigField("Boolean", "FEATURE_FLAG_CHAT", "true")
            buildConfigField("String", "LOG_LEVEL", "\\"verbose\\"")
        }
        release {
            buildConfigField("String", "API_BASE_URL", "\\"https://api.example.com\\"")
            buildConfigField("Boolean", "FEATURE_FLAG_CHAT", "false")
            buildConfigField("String", "LOG_LEVEL", "\\"error\\"")
            minifyEnabled = true
        }
    }
}

// 코드에서 읽기 (자동 생성된 BuildConfig 클래스)
val url = BuildConfig.API_BASE_URL         // "https://api.example.com"
val chatEnabled = BuildConfig.FEATURE_FLAG_CHAT  // false
val logLevel = BuildConfig.LOG_LEVEL       // "error"

// 사용
RetrofitClient.create(BuildConfig.API_BASE_URL)`,
    },
    web: {
      language: 'typescript',
      code: `// .env.development
// VITE_API_BASE_URL=https://dev-api.example.com
// VITE_FEATURE_FLAG_CHAT=true
// VITE_LOG_LEVEL=verbose

// .env.production
// VITE_API_BASE_URL=https://api.example.com
// VITE_FEATURE_FLAG_CHAT=false
// VITE_LOG_LEVEL=error

// TypeScript 타입 선언 (vite-env.d.ts)
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_FEATURE_FLAG_CHAT: string
  readonly VITE_LOG_LEVEL: string
}

// 코드에서 읽기
const apiBaseURL = import.meta.env.VITE_API_BASE_URL
const chatEnabled = import.meta.env.VITE_FEATURE_FLAG_CHAT === 'true'
const logLevel = import.meta.env.VITE_LOG_LEVEL

// 주의: VITE_ 접두어 없는 변수는 클라이언트에 노출되지 않음
// 민감한 정보(API 시크릿 키 등)는 절대 .env에 넣지 말 것`,
    },
  },

  /**
   * deploy_force_update
   * 앱 강제 업데이트 구현 — iOS 위주 (서버 기반 + iTunes Lookup API)
   */
  deploy_force_update: {
    caption: '강제 업데이트 구현 — 서버 버전 체크 & App Store 유도',
    ios: {
      language: 'swift',
      code: `import SwiftUI

// MARK: - 서버 응답 모델
struct VersionCheckResponse: Codable {
    let minimumRequiredVersion: String   // "2.0.0" — 이 버전 미만은 강제 업데이트
    let latestVersion: String            // "2.1.0" — 이 버전 미만은 권장 업데이트
    let forceUpdateMessage: String?      // 강제 업데이트 안내 문구 (서버 제어)
}

// MARK: - 버전 비교 유틸
func isVersion(_ version: String, lessThan other: String) -> Bool {
    let v1 = version.split(separator: ".").compactMap { Int($0) }
    let v2 = other.split(separator: ".").compactMap { Int($0) }
    for (a, b) in zip(v1, v2) {
        if a < b { return true }
        if a > b { return false }
    }
    return v1.count < v2.count
}

// MARK: - 강제 업데이트 뷰모델
@MainActor
class AppUpdateViewModel: ObservableObject {
    @Published var shouldForceUpdate = false
    @Published var shouldSuggestUpdate = false
    @Published var forceUpdateMessage = "이 버전은 더 이상 지원되지 않습니다.\\n최신 버전으로 업데이트해 주세요."

    func checkForUpdate() async {
        guard let currentVersion = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String
        else { return }

        do {
            let url = URL(string: "https://api.example.com/app/version-check")!
            let (data, _) = try await URLSession.shared.data(from: url)
            let response = try JSONDecoder().decode(VersionCheckResponse.self, from: data)

            if isVersion(currentVersion, lessThan: response.minimumRequiredVersion) {
                forceUpdateMessage = response.forceUpdateMessage ?? forceUpdateMessage
                shouldForceUpdate = true
            } else if isVersion(currentVersion, lessThan: response.latestVersion) {
                shouldSuggestUpdate = true
            }
        } catch {
            // 네트워크 오류 시 업데이트 강제하지 않음 (UX 배려)
            print("버전 체크 실패: \\(error)")
        }
    }

    func openAppStore() {
        // App Store 앱 직접 열기
        let appStoreURL = URL(string: "https://apps.apple.com/app/id1234567890")!
        UIApplication.shared.open(appStoreURL)
    }
}

// MARK: - 강제 업데이트 화면
struct ForceUpdateView: View {
    let message: String
    let onUpdate: () -> Void

    var body: some View {
        VStack(spacing: 24) {
            Image(systemName: "arrow.down.app.fill")
                .font(.system(size: 64))
                .foregroundStyle(.blue)

            Text("업데이트 필요")
                .font(.title2.bold())

            Text(message)
                .multilineTextAlignment(.center)
                .foregroundStyle(.secondary)

            Button {
                onUpdate()
            } label: {
                Text("App Store에서 업데이트")
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(.blue)
                    .foregroundStyle(.white)
                    .clipShape(.capsule)
            }
        }
        .padding(32)
        .interactiveDismissDisabled(true)   // 드래그로 닫기 불가
    }
}

// MARK: - 루트 뷰에서 적용
struct RootView: View {
    @StateObject private var updateVM = AppUpdateViewModel()

    var body: some View {
        ContentView()
            .task {
                await updateVM.checkForUpdate()
            }
            .fullScreenCover(isPresented: $updateVM.shouldForceUpdate) {
                ForceUpdateView(
                    message: updateVM.forceUpdateMessage,
                    onUpdate: updateVM.openAppStore
                )
            }
            .alert("업데이트 권장", isPresented: $updateVM.shouldSuggestUpdate) {
                Button("업데이트") { updateVM.openAppStore() }
                Button("나중에", role: .cancel) { }
            } message: {
                Text("새 버전이 출시됐습니다. 업데이트하면 더 나은 경험을 즐길 수 있습니다.")
            }
    }
}`,
    },
    android: {
      language: 'kotlin',
      code: `// Google Play In-App Updates API 사용 (권장)
// implementation("com.google.android.play:app-update-ktx:2.1.0")

class MainActivity : AppCompatActivity() {
    private val appUpdateManager by lazy { AppUpdateManagerFactory.create(this) }
    private val updateResultLauncher =
        registerForActivityResult(ActivityResultContracts.StartIntentSenderForResult()) { result ->
            if (result.resultCode != RESULT_OK) {
                // 사용자가 업데이트 거부 또는 실패
            }
        }

    override fun onResume() {
        super.onResume()
        checkForUpdate()
    }

    private fun checkForUpdate() {
        appUpdateManager.appUpdateInfo.addOnSuccessListener { info ->
            val isUpdateAvailable = info.updateAvailability() == UpdateAvailability.UPDATE_AVAILABLE
            val isImmediateAllowed = info.isUpdateTypeAllowed(AppUpdateType.IMMEDIATE)

            // 즉시 업데이트 (강제) — 설치 완료까지 앱 사용 불가
            if (isUpdateAvailable && isImmediateAllowed) {
                appUpdateManager.startUpdateFlowForResult(
                    info,
                    updateResultLauncher,
                    AppUpdateOptions.newBuilder(AppUpdateType.IMMEDIATE).build()
                )
            }
        }
    }
}`,
    },
  },

  /**
   * deploy_crash
   * Firebase Crashlytics 초기화 코드 비교 — iOS / Android / Web
   */
  deploy_crash: {
    caption: 'Firebase Crashlytics 초기화 및 기본 사용',
    ios: {
      language: 'swift',
      code: `// 1. Package.swift 또는 SPM으로 FirebaseCrashlytics 추가
// 또는 CocoaPods: pod 'Firebase/Crashlytics'

// 2. AppDelegate 또는 @main App에서 초기화
import Firebase
import FirebaseCrashlytics

@main
struct MyApp: App {
    init() {
        FirebaseApp.configure()  // GoogleService-Info.plist 필요
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

// 3. 사용자 식별 (크래시 분석 시 도움)
Crashlytics.crashlytics().setUserID("user_\(userId)")
Crashlytics.crashlytics().setValue(userPlan, forKey: "subscription_plan")

// 4. 비치명적 오류 기록 (앱이 죽지 않아도 리포팅)
do {
    try riskyOperation()
} catch {
    Crashlytics.crashlytics().record(error: error)
}

// 5. 커스텀 키/값 추가 (크래시 발생 시 컨텍스트 제공)
Crashlytics.crashlytics().setValue("checkout", forKey: "current_screen")
Crashlytics.crashlytics().setValue(cartItemCount, forKey: "cart_item_count")

// 6. 크래시 테스트 (개발 중에만 사용!)
// Crashlytics.crashlytics().forceCrash()

// 주의:
// - Release 빌드 + dSYM 업로드 설정 필요 (Build Phases에 Run Script 추가)
// - Info.plist에 firebase_crashlytics_collection_enabled = false 로
//   사용자 opt-out 구현 가능`,
    },
    android: {
      language: 'kotlin',
      code: `// build.gradle.kts (앱 모듈)
// plugins { id("com.google.firebase.crashlytics") }
// implementation("com.google.firebase:firebase-crashlytics-ktx")

// Application 클래스에서 초기화
class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        FirebaseApp.initializeApp(this)  // google-services.json 필요
        // Crashlytics는 자동으로 활성화됨
    }
}

// 사용자 식별
Firebase.crashlytics.setUserId("user_$userId")
Firebase.crashlytics.setCustomKey("subscription_plan", userPlan)

// 비치명적 오류 기록
try {
    riskyOperation()
} catch (e: Exception) {
    Firebase.crashlytics.recordException(e)
}

// 커스텀 로그 (크래시 발생 직전 로그 추적)
Firebase.crashlytics.log("결제 화면 진입")
Firebase.crashlytics.log("장바구니 아이템: $cartCount개")

// 수집 비활성화 (GDPR 등 사용자 opt-out 지원)
Firebase.crashlytics.setCrashlyticsCollectionEnabled(userConsented)`,
    },
    web: {
      language: 'typescript',
      code: `// npm install firebase
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

// 웹은 별도 "Crashlytics" SDK가 없음
// 대신 Firebase Performance + Analytics 또는 Sentry 사용

// --- 방법 1: Sentry (웹 크래시 리포팅 표준) ---
// npm install @sentry/react
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: 'https://your-dsn@sentry.io/project-id',
  environment: import.meta.env.MODE,  // 'development' | 'production'
  release: __APP_VERSION__,
  tracesSampleRate: 0.1,  // 성능 트레이스 10% 샘플링
})

// 사용자 식별
Sentry.setUser({ id: userId, email: userEmail })

// 비치명적 오류 기록
try {
  await riskyAsyncOperation()
} catch (error) {
  Sentry.captureException(error)
}

// 커스텀 컨텍스트
Sentry.setContext('cart', {
  itemCount: cartItems.length,
  totalPrice: cartTotal,
})

// --- 방법 2: Firebase Performance (성능 모니터링) ---
import { getPerformance, trace } from 'firebase/performance'

const perf = getPerformance()
const t = trace(perf, 'checkout_flow')
t.start()
await processCheckout()
t.stop()`,
    },
  },
};
