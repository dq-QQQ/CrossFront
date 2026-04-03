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

  // === src/data/codeBlocks-ch7.ts ===
uikit_viewcontroller_lifecycle: {
    caption: 'ViewController 생명주기',
    android: {
      language: 'kotlin',
      code: `// Android Activity 생명주기
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // View 바인딩 설정, 초기화 로직
        setContentView(R.layout.activity_main)
    }

    override fun onStart() {
        super.onStart()
        // Activity가 사용자에게 보이기 시작
    }

    override fun onResume() {
        super.onResume()
        // 사용자와 상호작용 시작 — 포그라운드
        // 카메라, 센서 등 리소스 획득
    }

    override fun onPause() {
        super.onPause()
        // 다른 Activity가 포그라운드로
        // 애니메이션 정지, 진행중 작업 일시정지
    }

    override fun onStop() {
        super.onStop()
        // Activity가 완전히 가려짐
        // 무거운 리소스 해제
    }

    override fun onDestroyView() {
        super.onDestroyView()
        // Fragment의 View 계층 제거 (Fragment 전용)
    }

    override fun onDestroy() {
        super.onDestroy()
        // Activity 완전 종료 — 모든 리소스 해제
    }
}

// Fragment 생명주기는 더 복잡
class MyFragment : Fragment() {
    override fun onAttach(context: Context) { super.onAttach(context) }
    override fun onCreate(savedInstanceState: Bundle?) { super.onCreate(savedInstanceState) }
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_my, container, false)
    }
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) { super.onViewCreated(view, savedInstanceState) }
    override fun onStart() { super.onStart() }
    override fun onResume() { super.onResume() }
    override fun onPause() { super.onPause() }
    override fun onStop() { super.onStop() }
    override fun onDestroyView() { super.onDestroyView() }
    override fun onDetach() { super.onDetach() }
}`,
    },
    web: {
      language: 'typescript',
      code: `// React 컴포넌트 생명주기 (함수형)
import { useEffect, useRef, useLayoutEffect } from 'react';

function MyComponent({ id }: { id: string }) {
    const prevIdRef = useRef<string>();

    // componentDidMount: 빈 의존성 배열
    useEffect(() => {
        console.log('mounted');
        // 구독, 타이머, 외부 API 초기화

        // componentWillUnmount: cleanup 함수
        return () => {
            console.log('unmounted');
            // 구독 해제, 타이머 정리
        };
    }, []);

    // componentDidUpdate: 특정 값 변경 시
    useEffect(() => {
        if (prevIdRef.current !== undefined) {
            console.log(\`id changed: \${prevIdRef.current} → \${id}\`);
        }
        prevIdRef.current = id;
    }, [id]);

    // DOM 변경 직후 동기 실행 (paint 전)
    // viewWillLayoutSubviews와 유사
    useLayoutEffect(() => {
        // DOM 측정 및 동기 업데이트
    }, []);

    return <div>{id}</div>;
}

// 클래스형 (레거시 — 참고용)
class ClassComponent extends React.Component {
    componentDidMount() { /* 초기화 */ }
    componentDidUpdate(prevProps, prevState) { /* 변경 감지 */ }
    componentWillUnmount() { /* 정리 */ }
    render() { return <div /> }
}`,
    },
    ios: {
      language: 'swift',
      code: `// UIViewController 생명주기 전체
class MyViewController: UIViewController {

    // ─── 초기화 단계 ───────────────────────────────
    override func loadView() {
        // 뷰 자체를 직접 생성할 때 오버라이드
        // 기본 구현은 XIB/스토리보드에서 로드
        // 코드 UI를 쓸 때: self.view = MyCustomView()
        super.loadView()
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        // 뷰 계층이 메모리에 로드된 직후 — 딱 1번만 호출
        // 가장 많이 쓰이는 초기화 지점
        // UI 설정, 데이터 바인딩, 레이아웃 제약 추가
        setupUI()
        setupConstraints()
        bindViewModel()
    }

    // ─── 레이아웃 단계 ─────────────────────────────
    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        // 자식 뷰의 레이아웃이 결정되기 직전
        // bounds가 아직 최종값이 아닐 수 있음
    }

    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        // 자식 뷰 레이아웃 완료 — frame/bounds 값 신뢰 가능
        // 이 시점에서 원 그리기, 그라데이션 레이어 추가 등
        setupGradientLayer() // frame에 의존하는 레이어 작업
    }

    // ─── 화면 표시 단계 ────────────────────────────
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        // 화면에 나타나기 직전 (매번 호출)
        // 네비게이션 바 커스터마이징, 데이터 새로고침
        navigationController?.setNavigationBarHidden(false, animated: animated)
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        // 화면에 완전히 나타난 후 (매번 호출)
        // 애니메이션 시작, 분석 이벤트 로깅
        startAnimation()
        Analytics.logScreenView("MyScreen")
    }

    // ─── 화면 숨김 단계 ────────────────────────────
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        // 화면에서 사라지기 직전
        // 편집 중인 내용 저장, 첫 번째 리스폰더 해제
        view.endEditing(true)
    }

    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        // 화면에서 완전히 사라진 후
        // 애니메이션 정지, 타이머 일시정지
        stopAnimation()
    }

    // ─── 메모리 경고 ───────────────────────────────
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // 시스템 메모리 부족 시 호출
        // 캐시, 재생성 가능한 리소스 해제
        imageCache.removeAllObjects()
    }

    // ─── 소멸 ──────────────────────────────────────
    deinit {
        // 참조 카운트가 0이 되면 호출
        // NotificationCenter 구독 해제 (iOS 9 이하)
        // Timer invalidate (strong reference 사이클 방지)
        NotificationCenter.default.removeObserver(self)
        print("\\(type(of: self)) deinit")
    }
}

// ── 실전 패턴: 생명주기별 책임 분리 ──────────────────
// viewDidLoad  → 1회성 설정 (addSubview, constraint, binding)
// viewWillAppear → 매번 갱신 (데이터 reload, 네비게이션 바)
// viewDidAppear → 사이드이펙트 (애니메이션, 분석, 키보드)
// viewWillDisappear → 정리 시작 (저장, endEditing)
// deinit → 최종 메모리 정리`,
    },
  },

  uikit_auto_layout: {
    caption: 'Auto Layout — NSLayoutConstraint vs ConstraintLayout vs CSS Flexbox',
    android: {
      language: 'kotlin',
      code: `// XML 레이아웃 (ConstraintLayout)
// activity_main.xml
/*
<androidx.constraintlayout.widget.ConstraintLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:id="@+id/btnSubmit"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="제출"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintBottom_toBottomOf="parent"
        android:layout_marginBottom="32dp"
        android:layout_marginHorizontal="24dp" />
</androidx.constraintlayout.widget.ConstraintLayout>
*/

// 코드로 제약 추가 (ConstraintSet)
val constraintSet = ConstraintSet()
constraintSet.clone(binding.root)
constraintSet.connect(
    R.id.btnSubmit, ConstraintSet.START,
    ConstraintSet.PARENT_ID, ConstraintSet.START, 24.dpToPx()
)
constraintSet.connect(
    R.id.btnSubmit, ConstraintSet.END,
    ConstraintSet.PARENT_ID, ConstraintSet.END, 24.dpToPx()
)
constraintSet.connect(
    R.id.btnSubmit, ConstraintSet.BOTTOM,
    ConstraintSet.PARENT_ID, ConstraintSet.BOTTOM, 32.dpToPx()
)
constraintSet.applyTo(binding.root)`,
    },
    web: {
      language: 'typescript',
      code: `/* CSS Flexbox */
.container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-end;
    padding: 0 24px 32px;
    height: 100vh;
}

.submit-button {
    width: 100%;
    height: 48px;
    /* 아래 고정 */
    margin-top: auto;
}

/* CSS Grid */
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto 1fr auto;
    gap: 16px;
    height: 100vh;
}

/* React Native — StyleSheet */
import { StyleSheet, View, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingBottom: 32,
        justifyContent: 'flex-end',
    },
    button: {
        width: '100%',
        height: 48,
        backgroundColor: '#007AFF',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
});`,
    },
    ios: {
      language: 'swift',
      code: `// ── 방법 1: NSLayoutConstraint 직접 사용 ────────────
class ViewController: UIViewController {
    let submitButton = UIButton(type: .system)

    override func viewDidLoad() {
        super.viewDidLoad()
        setupSubmitButton()
    }

    private func setupSubmitButton() {
        submitButton.setTitle("제출", for: .normal)
        submitButton.backgroundColor = .systemBlue
        submitButton.layer.cornerRadius = 12
        view.addSubview(submitButton)

        // translatesAutoresizingMaskIntoConstraints = false 필수!
        // 이걸 빠뜨리면 제약이 충돌하거나 무시됨
        submitButton.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            submitButton.leadingAnchor.constraint(
                equalTo: view.leadingAnchor, constant: 24
            ),
            submitButton.trailingAnchor.constraint(
                equalTo: view.trailingAnchor, constant: -24
            ),
            submitButton.bottomAnchor.constraint(
                equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -32
            ),
            submitButton.heightAnchor.constraint(equalToConstant: 48),
        ])
    }
}

// ── 방법 2: SnapKit (서드파티 — 가장 널리 쓰임) ────────
// pod 'SnapKit' 또는 SPM: https://github.com/SnapKit/SnapKit
import SnapKit

submitButton.snp.makeConstraints { make in
    make.leading.trailing.equalToSuperview().inset(24)
    make.bottom.equalTo(view.safeAreaLayoutGuide.snp.bottom).offset(-32)
    make.height.equalTo(48)
}

// 제약 업데이트 (애니메이션 포함)
UIView.animate(withDuration: 0.3) {
    self.submitButton.snp.updateConstraints { make in
        make.bottom.equalTo(self.view.safeAreaLayoutGuide.snp.bottom).offset(-100)
    }
    self.view.layoutIfNeeded() // 즉시 레이아웃 재계산
}

// ── 방법 3: UIStackView (가장 SwiftUI스러운 UIKit) ───
let stackView = UIStackView(arrangedSubviews: [
    titleLabel,
    subtitleLabel,
    submitButton,
])
stackView.axis = .vertical
stackView.spacing = 16
stackView.alignment = .fill   // .leading / .center / .trailing
stackView.distribution = .fill // .fillEqually / .equalSpacing

view.addSubview(stackView)
stackView.snp.makeConstraints { make in
    make.leading.trailing.equalToSuperview().inset(24)
    make.bottom.equalTo(view.safeAreaLayoutGuide).offset(-32)
}

// ── 핵심 개념: Intrinsic Content Size ────────────────
// UILabel, UIButton 등은 자체 크기(intrinsicContentSize)를 가짐
// width/height 제약 없이도 콘텐츠 크기에 맞게 표시됨
// Content Hugging Priority: 늘어나지 않으려는 저항 (기본 250)
// Content Compression Resistance: 줄어들지 않으려는 저항 (기본 750)
titleLabel.setContentHuggingPriority(.defaultHigh, for: .vertical)
titleLabel.setContentCompressionResistancePriority(.required, for: .vertical)

// ── SafeArea — notch, Dynamic Island, home indicator ─
// view.safeAreaLayoutGuide: 시스템 UI와 겹치지 않는 영역
// view.safeAreaInsets: 각 방향의 inset 값
// additionalSafeAreaInsets: VC가 추가 inset 지정 가능`,
    },
  },

  uikit_tableview_basic: {
    caption: 'UITableView 기본 구현 vs RecyclerView vs FlatList',
    android: {
      language: 'kotlin',
      code: `// RecyclerView 기본 구현
// 1. 어댑터 작성
class UserAdapter(
    private val users: List<User>,
    private val onItemClick: (User) -> Unit
) : RecyclerView.Adapter<UserAdapter.ViewHolder>() {

    inner class ViewHolder(private val binding: ItemUserBinding)
        : RecyclerView.ViewHolder(binding.root) {

        fun bind(user: User) {
            binding.tvName.text = user.name
            binding.tvEmail.text = user.email
            binding.root.setOnClickListener { onItemClick(user) }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding = ItemUserBinding.inflate(
            LayoutInflater.from(parent.context), parent, false
        )
        return ViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(users[position])
    }

    override fun getItemCount() = users.size
}

// 2. Activity에서 설정
binding.recyclerView.apply {
    layoutManager = LinearLayoutManager(this@MainActivity)
    adapter = UserAdapter(userList) { user ->
        // 아이템 클릭 처리
        navigateToDetail(user.id)
    }
    // 구분선
    addItemDecoration(
        DividerItemDecoration(context, DividerItemDecoration.VERTICAL)
    )
}`,
    },
    web: {
      language: 'typescript',
      code: `// React Native FlatList
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface User {
    id: string;
    name: string;
    email: string;
}

function UserList({ users }: { users: User[] }) {
    const renderItem = ({ item }: { item: User }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => handlePress(item)}
        >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            // 성능 최적화
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            windowSize={21}
            // 당겨서 새로고침
            onRefresh={handleRefresh}
            refreshing={isRefreshing}
            // 끝 도달 페이지네이션
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
        />
    );
}`,
    },
    ios: {
      language: 'swift',
      code: `// UITableView — 셀 재사용 방식 (dequeue)
// RecyclerView의 ViewHolder와 동일한 개념

// ── 1. 셀 클래스 정의 ──────────────────────────────
class UserCell: UITableViewCell {
    static let reuseIdentifier = "UserCell"

    // 코드로 UI 구성
    private let nameLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 16, weight: .medium)
        return label
    }()

    private let emailLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 14)
        label.textColor = .secondaryLabel
        return label
    }()

    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        setupUI()
    }

    required init?(coder: NSCoder) { fatalError() }

    private func setupUI() {
        let stack = UIStackView(arrangedSubviews: [nameLabel, emailLabel])
        stack.axis = .vertical
        stack.spacing = 4
        contentView.addSubview(stack)
        stack.snp.makeConstraints { make in
            make.edges.equalToSuperview().inset(UIEdgeInsets(top: 12, left: 16, bottom: 12, right: 16))
        }
    }

    // 셀 데이터 구성 메서드
    func configure(with user: User) {
        nameLabel.text = user.name
        emailLabel.text = user.email
    }

    // !! 재사용 전 초기화 — 매우 중요
    override func prepareForReuse() {
        super.prepareForReuse()
        nameLabel.text = nil
        emailLabel.text = nil
        // 이미지 로딩 작업 취소
        // imageView?.image = nil
    }
}

// ── 2. ViewController에서 TableView 설정 ─────────────
class UserListViewController: UIViewController {
    private var users: [User] = []

    private lazy var tableView: UITableView = {
        let tv = UITableView(frame: .zero, style: .plain)
        tv.register(UserCell.self, forCellReuseIdentifier: UserCell.reuseIdentifier)
        tv.dataSource = self
        tv.delegate = self
        tv.rowHeight = UITableView.automaticDimension // 동적 높이
        tv.estimatedRowHeight = 60
        tv.separatorInset = UIEdgeInsets(top: 0, left: 16, bottom: 0, right: 0)
        return tv
    }()

    override func viewDidLoad() {
        super.viewDidLoad()
        view.addSubview(tableView)
        tableView.snp.makeConstraints { $0.edges.equalToSuperview() }
    }
}

// ── 3. DataSource 구현 ────────────────────────────────
extension UserListViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return users.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        // dequeueReusableCell — 화면 밖으로 나간 셀을 재사용
        // RecyclerView.onBindViewHolder와 동일한 역할
        guard let cell = tableView.dequeueReusableCell(
            withIdentifier: UserCell.reuseIdentifier,
            for: indexPath
        ) as? UserCell else {
            return UITableViewCell()
        }
        cell.configure(with: users[indexPath.row])
        return cell
    }

    // 섹션 지원
    func numberOfSections(in tableView: UITableView) -> Int { return 1 }
    func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? { return nil }
}

// ── 4. Delegate 구현 ─────────────────────────────────
extension UserListViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        let user = users[indexPath.row]
        navigateToDetail(user: user)
    }

    // 스와이프 액션 (iOS 11+)
    func tableView(_ tableView: UITableView,
                   trailingSwipeActionsConfigurationForRowAt indexPath: IndexPath
    ) -> UISwipeActionsConfiguration? {
        let deleteAction = UIContextualAction(style: .destructive, title: "삭제") { _, _, completion in
            self.deleteUser(at: indexPath)
            completion(true)
        }
        deleteAction.image = UIImage(systemName: "trash")
        return UISwipeActionsConfiguration(actions: [deleteAction])
    }
}

// ── 5. 데이터 업데이트 ────────────────────────────────
// 전체 리로드 (비효율적)
tableView.reloadData()

// 부분 업데이트 (애니메이션 포함)
tableView.performBatchUpdates({
    tableView.insertRows(at: [IndexPath(row: 0, section: 0)], with: .automatic)
    tableView.deleteRows(at: [IndexPath(row: 3, section: 0)], with: .fade)
    tableView.reloadRows(at: [IndexPath(row: 1, section: 0)], with: .none)
}, completion: nil)`,
    },
  },

  uikit_tableview_diffable: {
    caption: 'DiffableDataSource vs ListAdapter vs key prop',
    android: {
      language: 'kotlin',
      code: `// ListAdapter + DiffUtil (RecyclerView)
// 자동 diff 계산으로 최소한의 업데이트만 수행

class UserDiffCallback : DiffUtil.ItemCallback<User>() {
    // 같은 항목인가? (보통 ID로 비교)
    override fun areItemsTheSame(oldItem: User, newItem: User): Boolean {
        return oldItem.id == newItem.id
    }

    // 항목의 내용이 같은가? (변경 여부 판단)
    override fun areContentsTheSame(oldItem: User, newItem: User): Boolean {
        return oldItem == newItem // data class의 equals 활용
    }

    // 부분 업데이트 페이로드 (선택적)
    override fun getChangePayload(oldItem: User, newItem: User): Any? {
        return if (oldItem.name != newItem.name) "name_changed" else null
    }
}

class UserListAdapter : ListAdapter<User, UserViewHolder>(UserDiffCallback()) {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): UserViewHolder { ... }
    override fun onBindViewHolder(holder: UserViewHolder, position: Int) {
        holder.bind(getItem(position))
    }
}

// 사용 — submitList()가 백그라운드에서 diff 계산
val adapter = UserListAdapter()
recyclerView.adapter = adapter

// 새 데이터로 업데이트 (diff 자동 계산)
viewModel.users.observe(this) { users ->
    adapter.submitList(users)
}`,
    },
    web: {
      language: 'typescript',
      code: `// React — key prop으로 재조정(Reconciliation)
// key가 같으면 업데이트, 다르면 언마운트 후 새 마운트

function UserList({ users }: { users: User[] }) {
    return (
        <ul>
            {users.map(user => (
                // key는 형제 간 고유해야 함 — index 사용 금지!
                // key가 바뀌면 해당 컴포넌트를 완전히 재마운트
                <UserItem key={user.id} user={user} />
            ))}
        </ul>
    );
}

// useMemo로 불필요한 재렌더링 방지
const MemoizedUserItem = React.memo(UserItem, (prev, next) => {
    return prev.user.id === next.user.id &&
           prev.user.name === next.user.name;
});

// React Query — 서버 상태와 자동 동기화
import { useQuery } from '@tanstack/react-query';

function UserListContainer() {
    const { data: users, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        staleTime: 5 * 60 * 1000, // 5분간 신선
    });

    if (isLoading) return <Skeleton />;
    return <UserList users={users ?? []} />;
}`,
    },
    ios: {
      language: 'swift',
      code: `// UITableViewDiffableDataSource (iOS 13+)
// ListAdapter와 동일한 개념 — diff 기반 자동 애니메이션 업데이트

// ── 1. Section과 Item 타입 정의 ──────────────────────
// Hashable이어야 함 — snapshot이 변경 감지에 사용
enum Section: Hashable {
    case main
    case featured
}

struct User: Hashable {
    let id: UUID
    var name: String
    var email: String

    // id만으로 동일성 판단 (Identifiable 패턴)
    func hash(into hasher: inout Hasher) {
        hasher.combine(id)
    }
    static func == (lhs: User, rhs: User) -> Bool {
        lhs.id == rhs.id
    }
}

// ── 2. DiffableDataSource 설정 ───────────────────────
class UserListViewController: UIViewController {
    typealias DataSource = UITableViewDiffableDataSource<Section, User>
    typealias Snapshot = NSDiffableDataSourceSnapshot<Section, User>

    private var dataSource: DataSource!
    private let tableView = UITableView()

    private func setupDataSource() {
        tableView.register(UserCell.self, forCellReuseIdentifier: UserCell.reuseIdentifier)

        dataSource = DataSource(tableView: tableView) { tableView, indexPath, user in
            let cell = tableView.dequeueReusableCell(
                withIdentifier: UserCell.reuseIdentifier,
                for: indexPath
            ) as? UserCell
            cell?.configure(with: user)
            return cell
        }
    }

    // ── 3. 스냅샷으로 데이터 업데이트 ─────────────────
    private func applySnapshot(users: [User], animatingDifferences: Bool = true) {
        var snapshot = Snapshot()
        snapshot.appendSections([.main])
        snapshot.appendItems(users, toSection: .main)

        // diff 자동 계산 후 최소한의 애니메이션만 실행
        dataSource.apply(snapshot, animatingDifferences: animatingDifferences)
    }

    // 특정 아이템만 리로드
    private func reloadUser(_ user: User) {
        var snapshot = dataSource.snapshot()
        snapshot.reloadItems([user])
        dataSource.apply(snapshot, animatingDifferences: false)
    }

    // 섹션 재정렬
    private func moveFeaturedToTop(featured: [User], others: [User]) {
        var snapshot = Snapshot()
        snapshot.appendSections([.featured, .main])
        snapshot.appendItems(featured, toSection: .featured)
        snapshot.appendItems(others, toSection: .main)
        dataSource.apply(snapshot)
    }
}

// ── 4. 실전 팁 ────────────────────────────────────────
// • apply()는 메인 스레드에서 호출해야 함 (iOS 15부터 백그라운드 가능)
// • animatingDifferences: false — 초기 로드 시 성능 향상
// • reconfigureItems(_:) (iOS 15+) — 셀 재사용 없이 내용만 업데이트
//   → reloadItems보다 훨씬 빠름 (셀 재생성 없음)
var snapshot = dataSource.snapshot()
snapshot.reconfigureItems([updatedUser]) // iOS 15+
dataSource.apply(snapshot)`,
    },
  },

  uikit_collectionview: {
    caption: 'UICollectionView Compositional Layout vs GridLayoutManager vs CSS Grid',
    android: {
      language: 'kotlin',
      code: `// RecyclerView GridLayoutManager
binding.recyclerView.layoutManager = GridLayoutManager(this, 3) // 3열 그리드

// StaggeredGridLayoutManager — 핀터레스트 스타일
binding.recyclerView.layoutManager = StaggeredGridLayoutManager(
    2, // spanCount
    StaggeredGridLayoutManager.VERTICAL
)

// GridLayoutManager에서 일부 아이템을 전체 너비로
val gridLayoutManager = GridLayoutManager(this, 3)
gridLayoutManager.spanSizeLookup = object : GridLayoutManager.SpanSizeLookup() {
    override fun getSpanSize(position: Int): Int {
        return when (adapter.getItemViewType(position)) {
            TYPE_HEADER -> 3 // 전체 너비
            TYPE_ITEM   -> 1 // 1/3 너비
            else -> 1
        }
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `/* CSS Grid */
.photo-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
}

/* 특정 아이템 확장 */
.photo-grid .featured {
    grid-column: span 2;
    grid-row: span 2;
}

/* 반응형 그리드 */
.adaptive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
}

/* React Native — FlatList로 그리드 */
<FlatList
    data={photos}
    numColumns={3}
    keyExtractor={(item) => item.id}
    columnWrapperStyle={styles.row}
    renderItem={({ item, index }) => (
        <PhotoCell
            item={item}
            isLarge={index === 0} // 첫 번째 아이템 확장
        />
    )}
/>`,
    },
    ios: {
      language: 'swift',
      code: `// UICollectionView Compositional Layout (iOS 13+)
// 복잡한 레이아웃을 선언형으로 구성

// ── 기본 그리드 레이아웃 ──────────────────────────────
func makeGridLayout() -> UICollectionViewLayout {
    // Item: 한 셀의 크기
    let itemSize = NSCollectionLayoutSize(
        widthDimension: .fractionalWidth(1/3),   // 그룹 너비의 1/3
        heightDimension: .fractionalWidth(1/3)   // 정사각형
    )
    let item = NSCollectionLayoutItem(layoutSize: itemSize)
    item.contentInsets = NSDirectionalEdgeInsets(top: 2, leading: 2, bottom: 2, trailing: 2)

    // Group: 아이템들의 묶음 (한 행)
    let groupSize = NSCollectionLayoutSize(
        widthDimension: .fractionalWidth(1.0),
        heightDimension: .fractionalWidth(1/3)
    )
    let group = NSCollectionLayoutGroup.horizontal(
        layoutSize: groupSize,
        subitems: [item]   // iOS 16+: count: 3
    )

    // Section: 그룹들의 묶음
    let section = NSCollectionLayoutSection(group: group)
    return UICollectionViewCompositionalLayout(section: section)
}

// ── 복합 레이아웃: 섹션별로 다른 레이아웃 ──────────────
func makeCompositionalLayout() -> UICollectionViewLayout {
    UICollectionViewCompositionalLayout { sectionIndex, environment in
        switch sectionIndex {
        case 0:
            return self.makeBannerSection()      // 가로 스크롤 배너
        case 1:
            return self.makeGridSection()         // 3열 그리드
        default:
            return self.makeListSection()         // 리스트
        }
    }
}

private func makeBannerSection() -> NSCollectionLayoutSection {
    let itemSize = NSCollectionLayoutSize(
        widthDimension: .fractionalWidth(1.0),
        heightDimension: .fractionalHeight(1.0)
    )
    let item = NSCollectionLayoutItem(layoutSize: itemSize)

    let groupSize = NSCollectionLayoutSize(
        widthDimension: .fractionalWidth(0.85),  // 화면의 85%
        heightDimension: .absolute(200)
    )
    let group = NSCollectionLayoutGroup.horizontal(
        layoutSize: groupSize,
        subitems: [item]
    )

    let section = NSCollectionLayoutSection(group: group)
    section.orthogonalScrollingBehavior = .groupPagingCentered // 가로 스크롤
    section.interGroupSpacing = 12
    section.contentInsets = NSDirectionalEdgeInsets(top: 0, leading: 16, bottom: 24, trailing: 16)

    // 섹션 헤더
    let headerSize = NSCollectionLayoutSize(
        widthDimension: .fractionalWidth(1.0),
        heightDimension: .absolute(44)
    )
    let header = NSCollectionLayoutBoundarySupplementaryItem(
        layoutSize: headerSize,
        elementKind: UICollectionView.elementKindSectionHeader,
        alignment: .top
    )
    section.boundarySupplementaryItems = [header]
    return section
}

// ── DiffableDataSource와 결합 ─────────────────────────
typealias PhotoDataSource = UICollectionViewDiffableDataSource<Section, PhotoItem>

private func setupCollectionView() {
    let layout = makeCompositionalLayout()
    collectionView = UICollectionView(frame: .zero, collectionViewLayout: layout)

    dataSource = PhotoDataSource(collectionView: collectionView) { cv, indexPath, item in
        let cell = cv.dequeueReusableCell(
            withReuseIdentifier: PhotoCell.reuseIdentifier,
            for: indexPath
        ) as? PhotoCell
        cell?.configure(with: item)
        return cell
    }

    // 헤더 등록
    dataSource.supplementaryViewProvider = { cv, kind, indexPath in
        let header = cv.dequeueReusableSupplementaryView(
            ofKind: kind,
            withReuseIdentifier: SectionHeader.reuseIdentifier,
            for: indexPath
        ) as? SectionHeader
        header?.configure(title: "섹션 \(indexPath.section)")
        return header
    }
}`,
    },
  },

  uikit_navigation_controller: {
    caption: 'UINavigationController push/pop vs Fragment 백스택 vs React Router',
    android: {
      language: 'kotlin',
      code: `// Jetpack Navigation Component (권장)
// nav_graph.xml에서 화면 흐름 정의
// navController.navigate(R.id.action_list_to_detail)

// Fragment 백스택 직접 제어
supportFragmentManager.commit {
    replace(R.id.container, DetailFragment.newInstance(userId))
    addToBackStack("detail") // 백스택에 이름 부여
}

// 백스택 제어
supportFragmentManager.popBackStack()
supportFragmentManager.popBackStack("detail", FragmentManager.POP_BACK_STACK_INCLUSIVE)

// 결과 전달 (Fragment Result API)
// 보내는 쪽
parentFragmentManager.setFragmentResult(
    "requestKey",
    bundleOf("selectedUser" to userId)
)

// 받는 쪽
parentFragmentManager.setFragmentResultListener("requestKey", viewLifecycleOwner) { _, bundle ->
    val userId = bundle.getString("selectedUser")
    handleResult(userId)
}`,
    },
    web: {
      language: 'typescript',
      code: `// React Router v6
import { useNavigate, useParams, Outlet } from 'react-router-dom';

// 라우터 설정
const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <UserList /> },
            {
                path: 'users/:id',
                element: <UserDetail />,
                loader: ({ params }) => fetchUser(params.id!),
            },
        ],
    },
]);

// 네비게이션
function UserList() {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(\`/users/\${userId}\`)}>
            상세 보기
        </button>
    );
}

// 뒤로 가기
navigate(-1);
navigate('/users', { replace: true }); // 히스토리 대체

// 데이터 전달
navigate('/users/new', { state: { fromList: true } });
const location = useLocation();
const { fromList } = location.state ?? {};`,
    },
    ios: {
      language: 'swift',
      code: `// UINavigationController — iOS의 화면 전환 핵심

// ── 기본 push/pop ──────────────────────────────────
class UserListViewController: UIViewController {
    func navigateToDetail(user: User) {
        let detailVC = UserDetailViewController(user: user)
        // Push — 스택에 추가, 뒤로가기 버튼 자동 생성
        navigationController?.pushViewController(detailVC, animated: true)
    }
}

class UserDetailViewController: UIViewController {
    init(user: User) {
        self.user = user
        super.init(nibName: nil, bundle: nil)
    }

    func goBack() {
        // Pop — 스택에서 제거
        navigationController?.popViewController(animated: true)
    }

    func goToRoot() {
        // 루트까지 한 번에 Pop
        navigationController?.popToRootViewController(animated: true)
    }

    func popToSpecific() {
        // 특정 VC까지 Pop
        if let listVC = navigationController?.viewControllers
            .first(where: { \$0 is UserListViewController }) {
            navigationController?.popToViewController(listVC, animated: true)
        }
    }
}

// ── Modal 표시 ─────────────────────────────────────
func presentModal() {
    let modalVC = EditUserViewController()

    // 시트 표시 스타일 커스터마이징 (iOS 15+)
    if let sheet = modalVC.sheetPresentationController {
        sheet.detents = [.medium(), .large()]        // 절반 / 전체
        sheet.prefersGrabberVisible = true           // 핸들 표시
        sheet.selectedDetentIdentifier = .medium     // 초기 높이
        sheet.prefersScrollingExpandsWhenScrolledToEdge = false
    }

    present(modalVC, animated: true)
}

// ── 결과 전달 — Delegate 패턴 (가장 전통적) ────────
protocol EditUserDelegate: AnyObject {
    func editUserViewController(_ vc: EditUserViewController, didSave user: User)
    func editUserViewControllerDidCancel(_ vc: EditUserViewController)
}

class EditUserViewController: UIViewController {
    weak var delegate: EditUserDelegate?

    func saveButtonTapped() {
        let updatedUser = buildUser()
        delegate?.editUserViewController(self, didSave: updatedUser)
        dismiss(animated: true)
    }
}

// 부모 VC에서 delegate 설정
let editVC = EditUserViewController()
editVC.delegate = self
present(editVC, animated: true)

// ── 결과 전달 — Closure (모던 패턴) ────────────────
class EditUserViewController: UIViewController {
    var onSave: ((User) -> Void)?

    func saveButtonTapped() {
        onSave?(buildUser())
        dismiss(animated: true)
    }
}

let editVC = EditUserViewController()
editVC.onSave = { [weak self] user in
    self?.updateUser(user)
}
present(editVC, animated: true)

// ── 네비게이션 바 커스터마이징 ──────────────────────
override func viewDidLoad() {
    super.viewDidLoad()
    title = "사용자 목록"

    // 오른쪽 버튼
    let addButton = UIBarButtonItem(
        systemItem: .add,
        primaryAction: UIAction { [weak self] _ in
            self?.presentAddUserModal()
        }
    )
    navigationItem.rightBarButtonItem = addButton

    // Large Title (iOS 11+)
    navigationItem.largeTitleDisplayMode = .always
    navigationController?.navigationBar.prefersLargeTitles = true

    // 검색 통합
    let searchController = UISearchController(searchResultsController: nil)
    searchController.searchResultsUpdater = self
    searchController.obscuresBackgroundDuringPresentation = false
    navigationItem.searchController = searchController
    navigationItem.hidesSearchBarWhenScrolling = false
}

// ── UINavigationControllerDelegate ─────────────────
// 커스텀 전환 애니메이션
extension AppNavigationController: UINavigationControllerDelegate {
    func navigationController(
        _ navigationController: UINavigationController,
        animationControllerFor operation: UINavigationController.Operation,
        from fromVC: UIViewController,
        to toVC: UIViewController
    ) -> UIViewControllerAnimatedTransitioning? {
        switch operation {
        case .push: return SlideInTransition()
        case .pop:  return SlideOutTransition()
        default:    return nil
        }
    }
}`,
    },
  },

  uikit_delegate_pattern: {
    caption: 'Delegate 패턴 vs Interface callback vs prop callback',
    android: {
      language: 'kotlin',
      code: `// Android — Interface를 이용한 콜백
// Kotlin의 인터페이스 = Swift의 protocol

// 1. 인터페이스 정의
interface OnItemClickListener {
    fun onItemClick(item: Item)
    fun onItemLongClick(item: Item): Boolean
}

// 2. 어댑터가 콜백 보유
class ItemAdapter(
    private val listener: OnItemClickListener
) : RecyclerView.Adapter<ItemViewHolder>() {

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        val item = items[position]
        holder.itemView.setOnClickListener {
            listener.onItemClick(item)
        }
        holder.itemView.setOnLongClickListener {
            listener.onItemLongClick(item)
        }
    }
}

// 3. Activity에서 구현
class MainActivity : AppCompatActivity(), OnItemClickListener {
    override fun onItemClick(item: Item) {
        navigateToDetail(item.id)
    }

    override fun onItemLongClick(item: Item): Boolean {
        showContextMenu(item)
        return true
    }
}

// 람다로 단순화 (SAM 인터페이스)
adapter.setOnItemClickListener { item ->
    navigateToDetail(item.id)
}`,
    },
    web: {
      language: 'typescript',
      code: `// React — props로 콜백 전달
// "props drilling" 또는 상태 끌어올리기

// 자식 컴포넌트
interface ItemListProps {
    items: Item[];
    onItemClick: (item: Item) => void;
    onItemDelete?: (id: string) => void; // 선택적
}

function ItemList({ items, onItemClick, onItemDelete }: ItemListProps) {
    return (
        <ul>
            {items.map(item => (
                <li key={item.id}>
                    <button onClick={() => onItemClick(item)}>
                        {item.name}
                    </button>
                    {onItemDelete && (
                        <button onClick={() => onItemDelete(item.id)}>
                            삭제
                        </button>
                    )}
                </li>
            ))}
        </ul>
    );
}

// 부모 컴포넌트 — 콜백 제공
function App() {
    const handleItemClick = useCallback((item: Item) => {
        navigate(\`/items/\${item.id}\`);
    }, [navigate]);

    return (
        <ItemList
            items={items}
            onItemClick={handleItemClick}
            onItemDelete={(id) => deleteItem(id)}
        />
    );
}`,
    },
    ios: {
      language: 'swift',
      code: `// ── Delegate 패턴 — UIKit의 핵심 설계 원칙 ──────────
// "위임(Delegation)": 특정 작업을 다른 객체에게 위임
// Android의 Listener 인터페이스와 동일한 개념

// ── 1. Protocol 정의 ────────────────────────────────
// weak 참조를 위해 AnyObject 채택 필수
protocol ItemListViewControllerDelegate: AnyObject {
    func itemListViewController(
        _ viewController: ItemListViewController,
        didSelectItem item: Item
    )
    // 선택적 메서드 (default 구현으로 optional 효과)
    func itemListViewControllerDidRequestRefresh(
        _ viewController: ItemListViewController
    )
}

// default 구현으로 선택적으로 만들기 (Obj-C @optional 대체)
extension ItemListViewControllerDelegate {
    func itemListViewControllerDidRequestRefresh(
        _ viewController: ItemListViewController
    ) {
        // 기본 구현 없음 — 아무것도 안 해도 됨
    }
}

// ── 2. Delegate를 보유하는 클래스 ────────────────────
class ItemListViewController: UIViewController {
    // !! weak 필수 — 순환 참조 방지
    // 부모(delegate) → 자식(ItemListVC) → 부모 순환이 생기면 메모리 누수
    weak var delegate: ItemListViewControllerDelegate?

    private func handleItemTap(_ item: Item) {
        // delegate에게 이벤트 위임
        delegate?.itemListViewController(self, didSelectItem: item)
    }
}

// ── 3. Delegate 구현 ────────────────────────────────
class ParentViewController: UIViewController, ItemListViewControllerDelegate {
    func setupChildVC() {
        let listVC = ItemListViewController()
        listVC.delegate = self          // self를 delegate로 등록
        addChild(listVC)
        view.addSubview(listVC.view)
        listVC.didMove(toParent: self)
    }

    // Delegate 메서드 구현
    func itemListViewController(
        _ viewController: ItemListViewController,
        didSelectItem item: Item
    ) {
        let detailVC = ItemDetailViewController(item: item)
        navigationController?.pushViewController(detailVC, animated: true)
    }
}

// ── 실제 UIKit 사용 예시: UITextFieldDelegate ────────
class LoginViewController: UIViewController, UITextFieldDelegate {
    let emailField = UITextField()
    let passwordField = UITextField()

    override func viewDidLoad() {
        super.viewDidLoad()
        emailField.delegate = self
        passwordField.delegate = self
    }

    // Return 키 동작 제어
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        if textField == emailField {
            passwordField.becomeFirstResponder() // 다음 필드로 이동
        } else {
            textField.resignFirstResponder()
            submitForm()
        }
        return true
    }

    // 입력 변경 시
    func textField(
        _ textField: UITextField,
        shouldChangeCharactersIn range: NSRange,
        replacementString string: String
    ) -> Bool {
        // 이메일 필드 최대 길이 제한
        if textField == emailField {
            let currentText = textField.text ?? ""
            guard let range = Range(range, in: currentText) else { return false }
            let updatedText = currentText.replacingCharacters(in: range, with: string)
            return updatedText.count <= 100
        }
        return true
    }
}

// ── Delegate vs Closure 선택 기준 ────────────────────
// Delegate 사용: 여러 이벤트를 하나의 객체가 처리, 상태 유지 필요
// Closure 사용: 단순 일회성 콜백, 캡처 컨텍스트 필요

// Closure 방식 (모던)
class ItemListViewController: UIViewController {
    var onItemSelected: ((Item) -> Void)?

    private func handleItemTap(_ item: Item) {
        onItemSelected?(item)
    }
}

// 사용
let listVC = ItemListViewController()
listVC.onItemSelected = { [weak self] item in
    self?.navigateToDetail(item)
}`,
    },
  },

  uikit_programmatic_ui: {
    caption: '코드로 UI 작성 (Programmatic UI) vs XML/JSX',
    android: {
      language: 'kotlin',
      code: `// Android — XML 레이아웃 (표준)
// res/layout/activity_main.xml

// 코드로 뷰 생성 (비표준, 가끔 필요)
val button = Button(context).apply {
    text = "클릭"
    setBackgroundColor(Color.BLUE)
    setTextColor(Color.WHITE)
    layoutParams = ViewGroup.LayoutParams(
        ViewGroup.LayoutParams.WRAP_CONTENT,
        ViewGroup.LayoutParams.WRAP_CONTENT
    )
}
container.addView(button)

// View Binding (XML과 코드 연결 — 권장)
private lateinit var binding: ActivityMainBinding

override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    binding = ActivityMainBinding.inflate(layoutInflater)
    setContentView(binding.root)

    binding.btnSubmit.setOnClickListener {
        handleSubmit()
    }
    binding.tvTitle.text = "안녕하세요"
}`,
    },
    web: {
      language: 'typescript',
      code: `// React — JSX (선언형 UI)
// UI = 상태의 함수 (UI = f(state))

function ProfileCard({ user }: { user: User }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="card" style={{ padding: '16px' }}>
            <img
                src={user.avatarUrl}
                alt={user.name}
                className="avatar"
            />
            <h2>{user.name}</h2>
            <p style={{ color: user.isActive ? 'green' : 'gray' }}>
                {user.isActive ? '온라인' : '오프라인'}
            </p>
            {isExpanded && (
                <p className="bio">{user.bio}</p>
            )}
            <button onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? '접기' : '더 보기'}
            </button>
        </div>
    );
}

// Tailwind CSS — 유틸리티 클래스
function ModernCard({ title }: { title: string }) {
    return (
        <div className="rounded-xl shadow-md p-6 bg-white hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
    );
}`,
    },
    ios: {
      language: 'swift',
      code: `// UIKit 코드 UI (Programmatic UI)
// SwiftUI 이전 시대의 표준, 현업에서 여전히 주류

// ── 기본 패턴: 팩토리 클로저로 뷰 초기화 ─────────────
class ProfileViewController: UIViewController {

    // 선언과 동시에 초기화 — lazy var는 self 참조 가능
    private let avatarImageView: UIImageView = {
        let iv = UIImageView()
        iv.contentMode = .scaleAspectFill
        iv.clipsToBounds = true
        iv.layer.cornerRadius = 32
        iv.backgroundColor = .systemGray5
        return iv
    }()

    private let nameLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 20, weight: .bold)
        label.textColor = .label
        label.numberOfLines = 0
        return label
    }()

    private let bioLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 14)
        label.textColor = .secondaryLabel
        label.numberOfLines = 0
        return label
    }()

    private lazy var expandButton: UIButton = {
        var config = UIButton.Configuration.plain()
        config.title = "더 보기"
        config.baseForegroundColor = .systemBlue
        let button = UIButton(configuration: config)
        button.addAction(UIAction { [weak self] _ in
            self?.toggleExpanded()
        }, for: .touchUpInside)
        return button
    }()

    // ── addSubview + 제약 설정 ──────────────────────
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .systemBackground
        setupHierarchy()
        setupConstraints()
    }

    private func setupHierarchy() {
        // 뷰 계층 구성 — 순서가 z-order
        [avatarImageView, nameLabel, bioLabel, expandButton]
            .forEach { view.addSubview(\$0) }

        // translatesAutoresizingMaskIntoConstraints 일괄 해제
        [avatarImageView, nameLabel, bioLabel, expandButton]
            .forEach { \$0.translatesAutoresizingMaskIntoConstraints = false }
    }

    private func setupConstraints() {
        NSLayoutConstraint.activate([
            // Avatar
            avatarImageView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 24),
            avatarImageView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            avatarImageView.widthAnchor.constraint(equalToConstant: 64),
            avatarImageView.heightAnchor.constraint(equalToConstant: 64),

            // Name
            nameLabel.topAnchor.constraint(equalTo: avatarImageView.bottomAnchor, constant: 16),
            nameLabel.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 24),
            nameLabel.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -24),

            // Bio
            bioLabel.topAnchor.constraint(equalTo: nameLabel.bottomAnchor, constant: 8),
            bioLabel.leadingAnchor.constraint(equalTo: nameLabel.leadingAnchor),
            bioLabel.trailingAnchor.constraint(equalTo: nameLabel.trailingAnchor),

            // Button
            expandButton.topAnchor.constraint(equalTo: bioLabel.bottomAnchor, constant: 8),
            expandButton.leadingAnchor.constraint(equalTo: nameLabel.leadingAnchor),
        ])
    }

    // ── 데이터 바인딩 ───────────────────────────────
    func configure(with user: User) {
        nameLabel.text = user.name
        bioLabel.text = user.bio
        // Kingfisher / SDWebImage로 이미지 로드
        avatarImageView.kf.setImage(with: URL(string: user.avatarUrl))
    }

    private var isExpanded = false

    private func toggleExpanded() {
        isExpanded.toggle()

        // 애니메이션으로 레이아웃 변경
        UIView.animate(withDuration: 0.3) {
            self.bioLabel.numberOfLines = self.isExpanded ? 0 : 2
            var config = self.expandButton.configuration
            config?.title = self.isExpanded ? "접기" : "더 보기"
            self.expandButton.configuration = config
            self.view.layoutIfNeeded()
        }
    }
}

// ── 재사용 가능한 커스텀 뷰 ────────────────────────────
// 스토리보드 없는 UIView 서브클래스
class TagView: UIView {
    private let label: UILabel = {
        let l = UILabel()
        l.font = .systemFont(ofSize: 12, weight: .medium)
        return l
    }()

    var text: String? {
        didSet { label.text = text }
    }

    var color: UIColor = .systemBlue {
        didSet {
            backgroundColor = color.withAlphaComponent(0.15)
            label.textColor = color
        }
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        setup()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setup()
    }

    private func setup() {
        layer.cornerRadius = 4
        addSubview(label)
        label.snp.makeConstraints { make in
            make.edges.equalToSuperview().inset(UIEdgeInsets(top: 4, left: 8, bottom: 4, right: 8))
        }
    }

    // intrinsicContentSize — Auto Layout이 크기를 자동으로 계산
    override var intrinsicContentSize: CGSize {
        let labelSize = label.intrinsicContentSize
        return CGSize(
            width: labelSize.width + 16,
            height: labelSize.height + 8
        )
    }
}`,
    },
  },

  uikit_responder_chain: {
    caption: 'Responder Chain vs 이벤트 버블링',
    android: {
      language: 'kotlin',
      code: `// Android 이벤트 전파
// View → ViewGroup → ... → Activity 순으로 전달

// 터치 이벤트 가로채기
class CustomViewGroup : FrameLayout {
    override fun onInterceptTouchEvent(ev: MotionEvent): Boolean {
        // true 반환 시 자식 뷰의 이벤트를 가로챔
        return when (ev.action) {
            MotionEvent.ACTION_DOWN -> false  // 자식에게 전달
            MotionEvent.ACTION_MOVE -> {
                val dx = abs(ev.x - lastX)
                val dy = abs(ev.y - lastY)
                dx > dy  // 가로 스크롤이면 가로채기
            }
            else -> false
        }
    }

    override fun onTouchEvent(ev: MotionEvent): Boolean {
        // 직접 처리
        return gestureDetector.onTouchEvent(ev)
    }
}

// 키 이벤트 — Activity에서 처리
override fun onKeyDown(keyCode: Int, event: KeyEvent): Boolean {
    if (keyCode == KeyEvent.KEYCODE_BACK) {
        handleBackPress()
        return true // 소비됨 — 더 이상 전파 안 함
    }
    return super.onKeyDown(keyCode, event) // 전파 계속
}`,
    },
    web: {
      language: 'typescript',
      code: `// DOM 이벤트 버블링
// 대상 → 부모 → ... → document → window 순으로 버블링

// 이벤트 버블링
document.querySelector('.parent')?.addEventListener('click', (e) => {
    console.log('부모가 받음:', e.target); // 실제 클릭된 요소
    console.log('현재 요소:', e.currentTarget); // .parent

    // 버블링 중단
    e.stopPropagation();
});

// 이벤트 위임 패턴 (Delegation)
// 개별 자식마다 리스너 추가하는 대신 부모에 하나만
document.querySelector('.list')?.addEventListener('click', (e) => {
    const item = (e.target as Element).closest('.item');
    if (item) {
        const id = item.getAttribute('data-id');
        handleItemClick(id!);
    }
});

// 캡처링 단계 (버블링 반대 방향)
element.addEventListener('click', handler, { capture: true });

// React의 합성 이벤트
function Parent() {
    return (
        <div onClick={(e) => console.log('부모')}>
            <button
                onClick={(e) => {
                    e.stopPropagation(); // React 합성 이벤트 버블링 중단
                    console.log('자식');
                }}
            >
                클릭
            </button>
        </div>
    );
}`,
    },
    ios: {
      language: 'swift',
      code: `// UIKit Responder Chain
// 이벤트를 처리할 수 없으면 체인을 따라 상위로 전달
// UIView → UIViewController → UIWindow → UIApplication → AppDelegate

// ── Responder Chain 구조 ─────────────────────────────
// [터치 발생]
//     ↓ Hit Testing (어느 뷰가 터치를 받을지 결정)
// [First Responder = 터치된 가장 상위 뷰]
//     ↓ 처리 못하면
// [superview]
//     ↓ 처리 못하면
// [UIViewController.view]
//     ↓ 처리 못하면
// [UIViewController]
//     ↓ 처리 못하면
// [UIWindow]
//     ↓ 처리 못하면
// [UIApplication]
//     ↓ 처리 못하면
// [AppDelegate/SceneDelegate]

// ── Hit Testing ──────────────────────────────────────
class CustomView: UIView {
    // hitTest: 주어진 좌표에서 이벤트를 받을 뷰를 결정
    override func hitTest(_ point: CGPoint, with event: UIEvent?) -> UIView? {
        // 터치 영역 확장 (작은 버튼 UX 개선)
        let expandedBounds = bounds.insetBy(dx: -10, dy: -10)
        if expandedBounds.contains(point) {
            return self
        }
        return nil
    }

    // point(inside:): 해당 좌표가 뷰 내부인지
    override func point(inside point: CGPoint, with event: UIEvent?) -> Bool {
        // 자식 뷰가 bounds 밖으로 나갈 때 터치 허용
        let result = super.point(inside: point, with: event)
        if result { return true }

        // 자식 뷰들도 확인
        return subviews.contains { subview in
            !subview.isHidden &&
            subview.point(inside: convert(point, to: subview), with: event)
        }
    }
}

// ── First Responder ──────────────────────────────────
// 키보드 입력을 받는 뷰
textField.becomeFirstResponder()  // 키보드 올리기
textField.resignFirstResponder()  // 키보드 내리기
view.endEditing(true)             // 현재 first responder 해제

// ── Responder Chain으로 커스텀 이벤트 전달 ───────────
// UIControl의 sendAction 메커니즘 활용
// 어느 객체가 처리할지 모를 때 체인을 따라 전파

// 커스텀 액션 정의
class RefreshAction: UIAction {
    // action identifier
}

// 체인 위로 이벤트 보내기 (target = nil → 체인 전파)
UIApplication.shared.sendAction(#selector(handleRefresh), to: nil, from: self, for: nil)

// 체인에서 처리
class RootViewController: UIViewController {
    @objc func handleRefresh() {
        // 어느 VC에서 발생했든 루트에서 처리
        refreshAllData()
    }
}

// ── 실전 예시: 키보드 dismiss ───────────────────────
// 빈 영역 탭으로 키보드 내리기
override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
    super.touchesBegan(touches, with: event)
    view.endEditing(true)
}

// 또는 탭 제스처 추가
let tapGesture = UITapGestureRecognizer(target: self, action: #selector(dismissKeyboard))
tapGesture.cancelsTouchesInView = false  // 하위 뷰 터치도 허용
view.addGestureRecognizer(tapGesture)

@objc private func dismissKeyboard() {
    view.endEditing(true)
}

// ── UIGestureRecognizer와 Responder Chain ────────────
// 제스처 인식기가 터치를 먼저 가로챔
// requiresExclusiveTouchType, cancelsTouchesInView로 동작 제어
let pan = UIPanGestureRecognizer(target: self, action: #selector(handlePan))
pan.cancelsTouchesInView = false // 스크롤뷰 내부에서 공존
scrollView.addGestureRecognizer(pan)`,
    },
  },

  uikit_stackview: {
    caption: 'UIStackView vs LinearLayout vs Flexbox',
    android: {
      language: 'kotlin',
      code: `// LinearLayout (XML)
/*
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical"
    android:gravity="center"
    android:padding="16dp">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_weight="1"
        android:text="제목" />

    <View
        android:layout_width="match_parent"
        android:layout_height="1dp"
        android:background="@color/divider" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="end"
        android:text="확인" />
</LinearLayout>
*/

// 코드로 동적 추가
val linearLayout = LinearLayout(context).apply {
    orientation = LinearLayout.VERTICAL
    layoutParams = LinearLayout.LayoutParams(
        LinearLayout.LayoutParams.MATCH_PARENT,
        LinearLayout.LayoutParams.WRAP_CONTENT
    )
}

val textView = TextView(context).apply {
    layoutParams = LinearLayout.LayoutParams(0, WRAP_CONTENT, 1f) // weight=1
    text = "동적으로 추가된 텍스트"
}
linearLayout.addView(textView)`,
    },
    web: {
      language: 'typescript',
      code: `/* CSS Flexbox */
.vertical-stack {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
}

.horizontal-stack {
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
}

/* 동적 추가 */
function DynamicStack() {
    const [items, setItems] = useState<string[]>([]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {items.map((item, index) => (
                <div key={index} className="stack-item">
                    {item}
                </div>
            ))}
            <button onClick={() => setItems(prev => [...prev, \`항목 \${prev.length + 1}\`])}>
                추가
            </button>
        </div>
    );
}`,
    },
    ios: {
      language: 'swift',
      code: `// UIStackView — Auto Layout의 고수준 추상화
// axis, alignment, distribution, spacing 4가지 속성으로 제어

// ── 기본 수직 스택 ────────────────────────────────────
let verticalStack = UIStackView()
verticalStack.axis = .vertical           // .horizontal
verticalStack.alignment = .fill          // .leading .center .trailing .firstBaseline
verticalStack.distribution = .fill       // .fillEqually .fillProportionally .equalSpacing .equalCentering
verticalStack.spacing = 16

verticalStack.addArrangedSubview(titleLabel)    // addSubview가 아닌 addArrangedSubview!
verticalStack.addArrangedSubview(subtitleLabel)
verticalStack.addArrangedSubview(actionButton)

// ── 커스텀 간격 (iOS 11+) ─────────────────────────────
// 특정 뷰 뒤의 간격만 다르게
verticalStack.setCustomSpacing(32, after: titleLabel)  // titleLabel 뒤만 32
verticalStack.setCustomSpacing(8, after: subtitleLabel)

// ── 동적 추가/제거 (애니메이션 포함) ──────────────────
// 핵심: isHidden을 사용하면 스택이 자동으로 공간 조정
UIView.animate(withDuration: 0.3) {
    self.errorLabel.isHidden = true    // 공간 사라짐
    self.helpLabel.isHidden = false    // 공간 나타남
}

// 완전 제거 (더 이상 필요 없을 때)
verticalStack.removeArrangedSubview(oldView)
oldView.removeFromSuperview() // arrangedSubview 제거는 자동으로 안 됨!

// 삽입
verticalStack.insertArrangedSubview(newView, at: 1)

// ── 중첩 스택 (Nested Stack) ─────────────────────────
// 복잡한 레이아웃도 스택 중첩으로 해결
let headerStack = UIStackView(arrangedSubviews: [avatarView, nameStack])
headerStack.axis = .horizontal
headerStack.alignment = .center
headerStack.spacing = 12

let nameStack = UIStackView(arrangedSubviews: [nameLabel, roleLabel])
nameStack.axis = .vertical
nameStack.spacing = 2

let mainStack = UIStackView(arrangedSubviews: [headerStack, bioLabel, actionStack])
mainStack.axis = .vertical
mainStack.spacing = 16

// ── 배경색/테두리 있는 스택 (iOS 14+) ─────────────────
let cardStack = UIStackView()
cardStack.backgroundColor = .secondarySystemBackground
cardStack.layer.cornerRadius = 12
cardStack.isLayoutMarginsRelativeArrangement = true
cardStack.layoutMargins = UIEdgeInsets(top: 16, left: 16, bottom: 16, right: 16)

// iOS 13 이하: 배경 뷰를 별도로 추가해야 함
let backgroundView = UIView()
backgroundView.backgroundColor = .secondarySystemBackground
backgroundView.layer.cornerRadius = 12
stackView.insertSubview(backgroundView, at: 0)
backgroundView.snp.makeConstraints { \$0.edges.equalToSuperview() }

// ── distribution 비교 ─────────────────────────────────
// .fill (기본): 남은 공간을 content hugging priority에 따라 배분
// .fillEqually: 모든 뷰를 동일한 크기로 (버튼 그룹에 유용)
// .fillProportionally: intrinsicContentSize 비율에 맞게
// .equalSpacing: 뷰 크기는 최소화, 간격을 동일하게
// .equalCentering: 뷰 중심 간격을 동일하게`,
    },
  },

  // === src/data/codeBlocks-ch8.ts ===
concurrency_actor_basics: {
    caption: 'Actor — 공유 상태 보호',
    android: {
      language: 'kotlin',
      code: `// Kotlin: synchronized 블록 + Mutex
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock

class BankAccount {
    private val mutex = Mutex()
    private var balance: Double = 0.0

    suspend fun deposit(amount: Double) {
        mutex.withLock {
            balance += amount
            println("입금: \${amount}, 잔액: \${balance}")
        }
    }

    suspend fun withdraw(amount: Double): Boolean {
        return mutex.withLock {
            if (balance >= amount) {
                balance -= amount
                true
            } else {
                false
            }
        }
    }

    suspend fun getBalance(): Double = mutex.withLock { balance }
}

// 사용
val account = BankAccount()
// 여러 코루틴에서 동시 접근해도 안전
launch { account.deposit(100.0) }
launch { account.deposit(50.0) }
launch { account.withdraw(30.0) }`,
    },
    web: {
      language: 'typescript',
      code: `// Web: SharedArrayBuffer + Atomics (저수준)
// 또는 Web Worker 메시지 패싱으로 직렬화

// 방법 1: 단일 스레드의 이벤트 루프 활용 (JS 기본)
class BankAccount {
    private balance: number = 0

    // JS는 단일 스레드 — 이것만으로 이미 thread-safe
    deposit(amount: number): void {
        this.balance += amount
        console.log(\`입금: \${amount}, 잔액: \${this.balance}\`)
    }

    withdraw(amount: number): boolean {
        if (this.balance >= amount) {
            this.balance -= amount
            return true
        }
        return false
    }

    getBalance(): number { return this.balance }
}

// 방법 2: Web Worker 간 메시지 패싱
// worker.ts
self.onmessage = (e) => {
    const { type, amount } = e.data
    // Worker 내부 상태 — 외부와 격리됨
    if (type === 'deposit') { /* ... */ }
    self.postMessage({ balance: currentBalance })
}`,
    },
    ios: {
      language: 'swift',
      code: `// Swift: Actor — 컴파일러가 보장하는 동시성 안전
actor BankAccount {
    private var balance: Double = 0.0

    // actor 메서드는 자동으로 직렬화됨
    func deposit(amount: Double) {
        balance += amount
        print("입금: \\(amount), 잔액: \\(balance)")
    }

    func withdraw(amount: Double) -> Bool {
        guard balance >= amount else { return false }
        balance -= amount
        return true
    }

    // actor의 저장 프로퍼티는 외부에서 직접 접근 불가
    var currentBalance: Double { balance }
}

// 사용
let account = BankAccount()

// actor 메서드는 반드시 await으로 호출
Task { await account.deposit(amount: 100.0) }
Task { await account.deposit(amount: 50.0) }
Task {
    let success = await account.withdraw(amount: 30.0)
    let bal = await account.currentBalance
    print("출금 \\(success ? "성공" : "실패"), 잔액: \\(bal)")
}

// 컴파일 오류 예시 — 컴파일러가 방지
// account.balance = 999  // ❌ actor-isolated 프로퍼티 직접 접근 불가
// account.deposit(amount: 50)  // ❌ await 없이 호출 불가`,
    },
  },

  concurrency_main_actor: {
    caption: '@MainActor — 메인 스레드 보장',
    android: {
      language: 'kotlin',
      code: `// Kotlin: withContext(Dispatchers.Main) 또는 lifecycleScope
import kotlinx.coroutines.*

class ProfileViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(UiState.Loading)
    val uiState = _uiState.asStateFlow()

    fun loadProfile(userId: String) {
        viewModelScope.launch {
            // IO 스레드에서 네트워크 요청
            val profile = withContext(Dispatchers.IO) {
                api.fetchProfile(userId)
            }
            // 메인 스레드로 전환해서 UI 업데이트
            withContext(Dispatchers.Main) {
                _uiState.value = UiState.Success(profile)
            }
        }
    }
}

// Activity/Fragment에서
lifecycleScope.launch(Dispatchers.Main) {
    // 이 블록은 항상 메인 스레드에서 실행
    textView.text = "업데이트됨"
}

// 메인 스레드 강제 실행 (레거시)
runOnUiThread {
    textView.text = "레거시 방식"
}`,
    },
    web: {
      language: 'typescript',
      code: `// Web: 이미 단일 스레드지만 React의 상태 업데이트 규칙 존재
import { useState, useEffect, useCallback } from 'react'

// React: 상태 업데이트는 항상 렌더 사이클에 맞춰야 함
function ProfileView({ userId }: { userId: string }) {
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // 비동기 작업 후 상태 업데이트
        fetchProfile(userId)
            .then(data => {
                setProfile(data)   // React가 배치 처리
                setLoading(false)  // 동기적으로 묶임
            })
    }, [userId])

    return loading ? <Spinner /> : <ProfileCard profile={profile} />
}

// Web Worker 결과를 메인 스레드로 전달
worker.onmessage = (event) => {
    // 메인 스레드에서 실행 — DOM 업데이트 가능
    document.getElementById('result').textContent = event.data
}`,
    },
    ios: {
      language: 'swift',
      code: `// Swift: @MainActor — 메인 스레드 실행을 컴파일 타임에 보장
import SwiftUI

// ViewModel 전체를 @MainActor로 선언
@MainActor
class ProfileViewModel: ObservableObject {
    @Published var profile: UserProfile?
    @Published var isLoading = false
    @Published var errorMessage: String?

    func loadProfile(userId: String) async {
        isLoading = true
        defer { isLoading = false }

        do {
            // nonisolated(unsafe) 컨텍스트에서 네트워크 요청
            // Swift Concurrency가 자동으로 스레드 관리
            profile = try await ProfileService.fetch(userId: userId)
        } catch {
            errorMessage = error.localizedDescription
        }
    }
}

// 특정 메서드만 @MainActor로 지정
class DataProcessor {
    // 백그라운드에서 처리
    func processData(_ data: [Int]) async -> [Int] {
        return data.map { \$0 * 2 }  // 어느 스레드든 무관
    }

    // 결과를 UI에 반영할 때만 메인 스레드 강제
    @MainActor
    func updateUI(with result: [Int]) {
        // 이 메서드는 항상 메인 스레드에서 실행
        // @MainActor가 아닌 곳에서 호출 시 컴파일 오류
        print("UI 업데이트: \\(result.count)개 항목")
    }
}

// SwiftUI View는 기본적으로 @MainActor
struct ProfileView: View {
    @StateObject private var viewModel = ProfileViewModel()

    var body: some View {
        // body는 메인 스레드 — @Published 변경을 안전하게 관찰
        Group {
            if viewModel.isLoading { ProgressView() }
            else if let profile = viewModel.profile { ProfileCard(profile: profile) }
        }
        .task { await viewModel.loadProfile(userId: "user_123") }
    }
}`,
    },
  },

  concurrency_sendable: {
    caption: 'Sendable — 스레드 간 안전한 값 전달',
    android: {
      language: 'kotlin',
      code: `// Kotlin: @Immutable / data class / ThreadSafe 어노테이션
// (컴파일러 강제는 없고 주석/관례 수준)

// 불변 data class — 스레드 간 안전하게 공유 가능
data class UserProfile(
    val id: String,
    val name: String,
    val avatarUrl: String
)

// @Stable — Compose에서 재구성 최적화
@Stable
data class UiState(
    val items: List<Item>,
    val isLoading: Boolean
)

// 가변 상태 — 스레드 간 공유 위험 (Mutex 필요)
class MutableCache {
    private val mutex = Mutex()
    private val cache = mutableMapOf<String, Any>()

    suspend fun put(key: String, value: Any) {
        mutex.withLock { cache[key] = value }
    }
}

// Kotlin은 컴파일러 수준의 Sendable 체크 없음
// 개발자가 직접 thread-safety 보장해야 함`,
    },
    web: {
      language: 'typescript',
      code: `// TypeScript: readonly + immutability로 안전성 확보
// (런타임 스레드 격리는 structuredClone으로)

// readonly로 불변 타입 정의
type UserProfile = Readonly<{
    id: string
    name: string
    avatarUrl: string
}>

// Deep readonly
type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object
        ? DeepReadonly<T[K]>
        : T[K]
}

// Web Worker로 전달 가능한 타입 = structuredClone 가능한 타입
// 함수, Symbol, DOM 요소는 Worker로 전달 불가
function sendToWorker<T extends object>(worker: Worker, data: T) {
    // structuredClone으로 복사 후 전달
    worker.postMessage(structuredClone(data))
}

// Transferable 인터페이스 — 복사 없이 소유권 이전
const buffer = new ArrayBuffer(1024)
worker.postMessage(buffer, [buffer]) // buffer 소유권이 worker로 이전
// buffer는 이제 neutered 상태 — 더 이상 사용 불가`,
    },
    ios: {
      language: 'swift',
      code: `// Swift: Sendable — 컴파일러가 동시성 안전을 검증
import Foundation

// 값 타입(struct/enum)은 자동으로 Sendable (조건부)
struct UserProfile: Sendable {
    let id: String
    let name: String
    let avatarUrl: String
    // 모든 저장 프로퍼티가 Sendable이어야 자동 적합
}

// @Sendable 클로저 — 동시성 컨텍스트에서 캡처 안전성 검증
func processAsync(_ items: [Int], completion: @Sendable @escaping () -> Void) {
    Task {
        // @Sendable 클로저는 가변 값을 캡처할 수 없음
        completion()
    }
}

// 클래스는 명시적 Sendable 선언 필요
final class ImmutableConfig: Sendable {
    let apiBaseURL: String
    let timeout: TimeInterval

    init(apiBaseURL: String, timeout: TimeInterval) {
        self.apiBaseURL = apiBaseURL
        self.timeout = timeout
    }
}

// @unchecked Sendable — 직접 thread-safety 보장 시 사용
// (Mutex/Lock으로 내부적으로 보호할 때)
final class ThreadSafeCache: @unchecked Sendable {
    private var cache: [String: Any] = [:]
    private let lock = NSLock()

    func set(_ value: Any, for key: String) {
        lock.withLock { cache[key] = value }
    }

    func get(_ key: String) -> Any? {
        lock.withLock { cache[key] }
    }
}

// 컴파일 오류 예시
class NonSendableClass {
    var mutableState = 0  // 가변 클래스
}

// Task { } 안에서 NonSendableClass 인스턴스 사용 시 경고/오류
// let obj = NonSendableClass()
// Task { obj.mutableState += 1 }  // ⚠️ Sendable 위반`,
    },
  },

  concurrency_async_stream: {
    caption: 'AsyncStream — 비동기 스트림 생성',
    android: {
      language: 'kotlin',
      code: `// Kotlin: Channel / Flow.callbackFlow
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.*

// callbackFlow — 콜백 기반 API를 Flow로 래핑
fun locationUpdates(): Flow<Location> = callbackFlow {
    val listener = LocationListener { location ->
        trySend(location)  // 버퍼가 차면 drop
    }
    locationManager.addListener(listener)

    // 구독 해제 시 정리
    awaitClose {
        locationManager.removeListener(listener)
    }
}

// Channel 직접 사용
fun timerFlow(intervalMs: Long): Flow<Int> = flow {
    var count = 0
    while (true) {
        delay(intervalMs)
        emit(count++)
    }
}

// SharedFlow — 여러 구독자에게 브로드캐스트
val sharedFlow = MutableSharedFlow<Event>(
    replay = 0,
    extraBufferCapacity = 64
)

// 사용
locationUpdates()
    .onEach { location -> updateMap(location) }
    .launchIn(viewModelScope)`,
    },
    web: {
      language: 'typescript',
      code: `// Web: ReadableStream / AsyncGenerator
// ReadableStream
function createTimerStream(intervalMs: number): ReadableStream<number> {
    let count = 0
    let timerId: ReturnType<typeof setInterval>

    return new ReadableStream({
        start(controller) {
            timerId = setInterval(() => {
                controller.enqueue(count++)
            }, intervalMs)
        },
        cancel() {
            clearInterval(timerId)
        }
    })
}

// AsyncGenerator — 더 직관적
async function* locationUpdates(): AsyncGenerator<GeolocationCoordinates> {
    while (true) {
        const position = await new Promise<GeolocationPosition>(
            (resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject)
        )
        yield position.coords
        await sleep(1000)
    }
}

// EventSource를 AsyncGenerator로 래핑
async function* sseStream(url: string): AsyncGenerator<string> {
    const es = new EventSource(url)
    const queue: string[] = []
    es.onmessage = (e) => queue.push(e.data)

    try {
        while (true) {
            if (queue.length > 0) yield queue.shift()!
            else await sleep(16)
        }
    } finally {
        es.close()
    }
}`,
    },
    ios: {
      language: 'swift',
      code: `// Swift: AsyncStream — 비동기 시퀀스 생성
import CoreLocation

// 기본 AsyncStream 생성
func makeTimerStream(interval: TimeInterval) -> AsyncStream<Int> {
    AsyncStream { continuation in
        var count = 0
        let timer = Timer.scheduledTimer(withTimeInterval: interval, repeats: true) { _ in
            continuation.yield(count)
            count += 1
        }

        // 스트림 종료 처리 (취소 또는 명시적 finish)
        continuation.onTermination = { _ in
            timer.invalidate()
        }
    }
}

// 콜백 기반 API를 AsyncStream으로 래핑
class LocationStream: NSObject, CLLocationManagerDelegate {
    private let manager = CLLocationManager()
    private var continuation: AsyncStream<CLLocation>.Continuation?

    lazy var stream: AsyncStream<CLLocation> = {
        AsyncStream { [weak self] continuation in
            self?.continuation = continuation
            self?.manager.delegate = self
            self?.manager.startUpdatingLocation()

            continuation.onTermination = { [weak self] _ in
                self?.manager.stopUpdatingLocation()
            }
        }
    }()

    func locationManager(_ manager: CLLocationManager,
                         didUpdateLocations locations: [CLLocation]) {
        locations.forEach { continuation?.yield(\$0) }
    }
}

// AsyncThrowingStream — 에러를 던질 수 있는 스트림
func fetchPaginatedItems() -> AsyncThrowingStream<[Item], Error> {
    AsyncThrowingStream { continuation in
        Task {
            var page = 1
            do {
                while true {
                    let items = try await api.fetchItems(page: page)
                    if items.isEmpty {
                        continuation.finish()
                        break
                    }
                    continuation.yield(items)
                    page += 1
                }
            } catch {
                continuation.finish(throwing: error)
            }
        }
    }
}

// 사용
let timerStream = makeTimerStream(interval: 1.0)
Task {
    for await count in timerStream {
        print("타이머: \\(count)")
        if count >= 10 { break }
    }
}`,
    },
  },

  concurrency_async_sequence: {
    caption: 'AsyncSequence 소비 — 비동기 시퀀스 순회',
    android: {
      language: 'kotlin',
      code: `// Kotlin: Flow collect — 비동기 스트림 소비
import kotlinx.coroutines.flow.*

// 기본 collect
viewModelScope.launch {
    repository.newsFlow()
        .collect { news ->
            _uiState.update { it.copy(news = news) }
        }
}

// 연산자 체이닝
repository.priceFlow()
    .filter { it.change > 0 }
    .map { Price(it.symbol, it.value * 1.1) }
    .debounce(300)
    .distinctUntilChanged()
    .collect { price ->
        updateChart(price)
    }

// flatMapLatest — 최신 값만 처리 (스위칭)
searchQuery
    .debounce(300)
    .flatMapLatest { query ->
        repository.search(query)
    }
    .collect { results ->
        _searchResults.value = results
    }

// combine — 여러 Flow 합치기
combine(
    userFlow,
    settingsFlow
) { user, settings ->
    UiState(user = user, theme = settings.theme)
}.collect { state ->
    _uiState.value = state
}`,
    },
    web: {
      language: 'typescript',
      code: `// Web: for await...of — AsyncIterable 소비
async function consumeStream() {
    const stream = makeAsyncStream()

    // 기본 순회
    for await (const item of stream) {
        console.log(item)
    }
}

// ReadableStream 소비
async function readStream(readable: ReadableStream<Uint8Array>) {
    const reader = readable.getReader()
    const decoder = new TextDecoder()

    try {
        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            console.log(decoder.decode(value))
        }
    } finally {
        reader.releaseLock()
    }
}

// AsyncGenerator 파이프라인
async function* filterAndMap<T, U>(
    source: AsyncIterable<T>,
    predicate: (v: T) => boolean,
    transform: (v: T) => U
): AsyncGenerator<U> {
    for await (const item of source) {
        if (predicate(item)) yield transform(item)
    }
}

// fetch SSE 스트림 소비
async function consumeSSE(url: string) {
    const response = await fetch(url)
    const reader = response.body!.getReader()

    for await (const chunk of asyncChunks(reader)) {
        const text = new TextDecoder().decode(chunk)
        console.log('SSE:', text)
    }
}`,
    },
    ios: {
      language: 'swift',
      code: `// Swift: for await in — AsyncSequence 소비
import Foundation

// 기본 AsyncSequence 순회
func consumeTimerStream() async {
    let stream = makeTimerStream(interval: 1.0)

    for await count in stream {
        print("카운트: \\(count)")
        if count >= 5 { break }  // break로 취소됨
    }
}

// URLSession.bytes — 스트리밍 HTTP 응답
func streamHTTPResponse(url: URL) async throws {
    let (bytes, response) = try await URLSession.shared.bytes(from: url)
    guard (response as? HTTPURLResponse)?.statusCode == 200 else { return }

    for try await byte in bytes {
        // 바이트 단위로 처리
        process(byte)
    }
}

// 라인 단위 스트리밍 — 서버 전송 이벤트(SSE)
func readLines(from url: URL) async throws {
    let (bytes, _) = try await URLSession.shared.bytes(from: url)

    for try await line in bytes.lines {
        if line.hasPrefix("data: ") {
            let payload = String(line.dropFirst(6))
            handleSSEPayload(payload)
        }
    }
}

// 커스텀 AsyncSequence 구현
struct Fibonacci: AsyncSequence {
    typealias Element = Int
    let limit: Int

    struct AsyncIterator: AsyncIteratorProtocol {
        var limit: Int
        var a = 0, b = 1

        mutating func next() async -> Int? {
            guard a <= limit else { return nil }
            let current = a
            (a, b) = (b, a + b)
            // 비동기 작업도 여기서 가능
            try? await Task.sleep(nanoseconds: 100_000_000)
            return current
        }
    }

    func makeAsyncIterator() -> AsyncIterator {
        AsyncIterator(limit: limit)
    }
}

// 사용
Task {
    for await fib in Fibonacci(limit: 100) {
        print(fib)
    }
}

// map, filter — AsyncSequence 변환 (Swift 5.9+)
let doubled = Fibonacci(limit: 50)
    .map { \$0 * 2 }

Task {
    for await value in doubled {
        print(value)
    }
}`,
    },
  },

  concurrency_task_group: {
    caption: 'TaskGroup — 동적 병렬 작업',
    android: {
      language: 'kotlin',
      code: `// Kotlin: async/await + awaitAll
import kotlinx.coroutines.*

// 고정된 수의 병렬 작업
suspend fun fetchMultipleProfiles(userIds: List<String>): List<Profile> {
    return coroutineScope {
        userIds.map { id ->
            async { api.fetchProfile(id) }  // 모두 동시에 시작
        }.awaitAll()  // 모두 완료될 때까지 대기
    }
}

// 동적 작업 — 결과를 순서 없이 처리
suspend fun processImages(urls: List<String>): List<ProcessedImage> {
    return coroutineScope {
        val deferred = urls.map { url ->
            async(Dispatchers.IO) {
                downloadAndProcess(url)
            }
        }
        deferred.awaitAll()
    }
}

// 취소 처리 포함
suspend fun fetchWithTimeout(userIds: List<String>): List<Profile?> {
    return withTimeout(5000L) {
        coroutineScope {
            userIds.map { id ->
                async {
                    try { api.fetchProfile(id) }
                    catch (e: Exception) { null }
                }
            }.awaitAll()
        }
    }
}

// Channel을 통한 스트리밍 결과
suspend fun processSequentially(items: List<Item>) {
    supervisorScope {
        items.forEach { item ->
            launch { process(item) }
        }
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// Web: Promise.all / Promise.allSettled / Promise.race
// 고정된 병렬 작업
async function fetchMultipleProfiles(userIds: string[]): Promise<Profile[]> {
    return Promise.all(
        userIds.map(id => fetchProfile(id))  // 모두 동시에 시작
    )
}

// 실패해도 나머지 계속 — Promise.allSettled
async function fetchWithFallback(urls: string[]): Promise<(Data | null)[]> {
    const results = await Promise.allSettled(
        urls.map(url => fetch(url).then(r => r.json()))
    )
    return results.map(result =>
        result.status === 'fulfilled' ? result.value : null
    )
}

// 동적 배치 처리
async function processBatched<T, U>(
    items: T[],
    batchSize: number,
    processor: (item: T) => Promise<U>
): Promise<U[]> {
    const results: U[] = []
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize)
        const batchResults = await Promise.all(batch.map(processor))
        results.push(...batchResults)
    }
    return results
}

// AbortController로 그룹 취소
const controller = new AbortController()
const tasks = urls.map(url =>
    fetch(url, { signal: controller.signal })
)
setTimeout(() => controller.abort(), 5000)`,
    },
    ios: {
      language: 'swift',
      code: `// Swift: withTaskGroup — 타입 안전한 동적 병렬 작업
import Foundation

// 기본 TaskGroup — 결과 수집
func fetchMultipleProfiles(userIds: [String]) async throws -> [Profile] {
    try await withThrowingTaskGroup(of: Profile.self) { group in
        for userId in userIds {
            group.addTask {
                try await ProfileService.fetch(userId: userId)
            }
        }

        // 완료되는 순서로 결과 수집
        var profiles: [Profile] = []
        for try await profile in group {
            profiles.append(profile)
        }
        return profiles
    }
}

// 순서 보장이 필요한 경우 — (id, result) 쌍으로
func fetchOrderedProfiles(userIds: [String]) async throws -> [Profile] {
    let indexedResults = try await withThrowingTaskGroup(
        of: (Int, Profile).self
    ) { group in
        for (index, userId) in userIds.enumerated() {
            group.addTask {
                let profile = try await ProfileService.fetch(userId: userId)
                return (index, profile)
            }
        }

        var pairs: [(Int, Profile)] = []
        for try await pair in group {
            pairs.append(pair)
        }
        return pairs
    }

    return indexedResults
        .sorted { \$0.0 < \$1.0 }
        .map { \$0.1 }
}

// 에러 무시하고 성공만 수집 — withTaskGroup (non-throwing)
func fetchProfilesIgnoringErrors(userIds: [String]) async -> [Profile] {
    await withTaskGroup(of: Profile?.self) { group in
        for userId in userIds {
            group.addTask {
                try? await ProfileService.fetch(userId: userId)
            }
        }

        var profiles: [Profile] = []
        for await profile in group {
            if let profile { profiles.append(profile) }
        }
        return profiles
    }
}

// 동시 실행 수 제한 (세마포어 패턴)
func fetchWithConcurrencyLimit(
    urls: [URL],
    maxConcurrent: Int = 4
) async throws -> [Data] {
    try await withThrowingTaskGroup(of: (Int, Data).self) { group in
        var results = [(Int, Data)]()
        var pendingIndex = 0

        // 처음에 maxConcurrent 개 시작
        while pendingIndex < min(maxConcurrent, urls.count) {
            let idx = pendingIndex
            group.addTask { (idx, try await URLSession.shared.data(from: urls[idx]).0) }
            pendingIndex += 1
        }

        // 완료되면 다음 작업 추가
        for try await (idx, data) in group {
            results.append((idx, data))
            if pendingIndex < urls.count {
                let nextIdx = pendingIndex
                group.addTask { (nextIdx, try await URLSession.shared.data(from: urls[nextIdx]).0) }
                pendingIndex += 1
            }
        }

        return results.sorted { \$0.0 < \$1.0 }.map { \$0.1 }
    }
}`,
    },
  },

  concurrency_async_let: {
    caption: 'async let — 선언적 병렬 실행',
    android: {
      language: 'kotlin',
      code: `// Kotlin: async { } + .await() — 명시적 병렬 시작
import kotlinx.coroutines.*

// coroutineScope 안에서 async로 병렬 시작
suspend fun loadDashboard(userId: String): Dashboard {
    return coroutineScope {
        // 세 작업을 동시에 시작
        val profileDeferred = async { api.fetchProfile(userId) }
        val feedDeferred = async { api.fetchFeed(userId) }
        val notificationsDeferred = async { api.fetchNotifications(userId) }

        // 모두 완료될 때까지 대기
        val profile = profileDeferred.await()
        val feed = feedDeferred.await()
        val notifications = notificationsDeferred.await()

        Dashboard(profile, feed, notifications)
    }
}

// 더 간결한 방식 — 즉시 await
suspend fun loadUserData(id: String): UserData {
    return coroutineScope {
        val user = async { db.getUser(id) }
        val orders = async { db.getOrders(id) }

        UserData(
            user = user.await(),
            orders = orders.await()
        )
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// Web: Promise 변수 선언 = 즉시 시작, await = 결과 대기
// 잘못된 방식 — 순차 실행
async function slowLoad(userId: string): Promise<Dashboard> {
    const profile = await fetchProfile(userId)   // 완료 후
    const feed = await fetchFeed(userId)          // 그 다음 시작
    const notifications = await fetchNotifications(userId)
    return { profile, feed, notifications }
}

// 올바른 방식 — 병렬 실행
async function fastLoad(userId: string): Promise<Dashboard> {
    // Promise 생성 시점에 즉시 시작 (await 전)
    const profilePromise = fetchProfile(userId)
    const feedPromise = fetchFeed(userId)
    const notificationsPromise = fetchNotifications(userId)

    // 이제 각각 await — 이미 진행 중이므로 병렬 효과
    const profile = await profilePromise
    const feed = await feedPromise
    const notifications = await notificationsPromise

    return { profile, feed, notifications }
}

// 또는 Promise.all로 더 명확하게
async function loadWithAll(userId: string): Promise<Dashboard> {
    const [profile, feed, notifications] = await Promise.all([
        fetchProfile(userId),
        fetchFeed(userId),
        fetchNotifications(userId),
    ])
    return { profile, feed, notifications }
}`,
    },
    ios: {
      language: 'swift',
      code: `// Swift: async let — 선언과 동시에 병렬 시작
import Foundation

// async let — 가장 간결한 병렬 패턴
func loadDashboard(userId: String) async throws -> Dashboard {
    // 세 작업이 선언과 동시에 모두 병렬로 시작
    async let profile = ProfileService.fetch(userId: userId)
    async let feed = FeedService.fetch(userId: userId)
    async let notifications = NotificationService.fetch(userId: userId)

    // await 시점에 결과를 기다림 (이미 진행 중)
    return try await Dashboard(
        profile: profile,
        feed: feed,
        notifications: notifications
    )
}

// 순차 실행과의 차이 비교
func sequentialLoad(userId: String) async throws -> Dashboard {
    // ❌ 순차 실행 — 각 단계가 끝나야 다음 시작
    let profile = try await ProfileService.fetch(userId: userId)        // ~200ms
    let feed = try await FeedService.fetch(userId: userId)              // ~150ms
    let notifications = try await NotificationService.fetch(userId: userId)  // ~100ms
    // 총 ~450ms
    return Dashboard(profile: profile, feed: feed, notifications: notifications)
}

func parallelLoad(userId: String) async throws -> Dashboard {
    // ✅ 병렬 실행 — 동시에 시작
    async let profile = ProfileService.fetch(userId: userId)        // 동시 시작
    async let feed = FeedService.fetch(userId: userId)              // 동시 시작
    async let notifications = NotificationService.fetch(userId: userId)  // 동시 시작
    // 총 ~200ms (가장 긴 것 기준)
    return try await Dashboard(profile: profile, feed: feed, notifications: notifications)
}

// async let과 조건부 사용
func loadProfileWithExtras(userId: String, loadExtras: Bool) async throws -> ProfileData {
    async let profile = ProfileService.fetch(userId: userId)

    if loadExtras {
        async let followers = FollowerService.fetch(userId: userId)
        async let following = FollowingService.fetch(userId: userId)
        return try await ProfileData(
            profile: profile,
            followers: followers,
            following: following
        )
    } else {
        return try await ProfileData(profile: profile)
    }
}

// 에러 처리 — 하나가 실패하면 나머지도 취소
func loadWithErrorHandling(userId: String) async -> Dashboard? {
    do {
        async let profile = ProfileService.fetch(userId: userId)
        async let feed = FeedService.fetch(userId: userId)
        return try await Dashboard(profile: profile, feed: feed)
    } catch {
        // profile이나 feed 중 하나라도 실패하면 여기로
        print("로드 실패: \\(error)")
        return nil
    }
}`,
    },
  },

  concurrency_cancellation: {
    caption: 'Task 취소 — 협력적 취소 모델',
    android: {
      language: 'kotlin',
      code: `// Kotlin: Job.cancel() — 구조화된 취소
import kotlinx.coroutines.*

// Job 취소
val job = viewModelScope.launch {
    try {
        val data = withContext(Dispatchers.IO) {
            api.fetchLargeData()
        }
        updateUI(data)
    } catch (e: CancellationException) {
        // 취소는 정상 흐름 — 재던지기 필수
        throw e
    } catch (e: Exception) {
        handleError(e)
    } finally {
        // 리소스 정리는 finally에서
        cleanup()
    }
}

// 취소
job.cancel()

// isActive 체크 — 루프에서 취소 지점
suspend fun processItems(items: List<Item>) {
    for (item in items) {
        ensureActive()  // 취소됐으면 CancellationException
        processItem(item)
    }
}

// withTimeout — 자동 취소
suspend fun fetchWithTimeout(): Data {
    return withTimeout(5000L) {  // 5초 타임아웃
        api.fetchData()
    }
}

// withTimeoutOrNull — 타임아웃 시 null 반환
val result = withTimeoutOrNull(3000L) {
    api.fetchData()
} ?: defaultData`,
    },
    web: {
      language: 'typescript',
      code: `// Web: AbortController — fetch 취소
const controller = new AbortController()
const { signal } = controller

// fetch 취소
fetch('/api/data', { signal })
    .then(response => response.json())
    .then(data => updateUI(data))
    .catch(error => {
        if (error.name === 'AbortError') {
            console.log('요청이 취소됨')
        } else {
            handleError(error)
        }
    })

// 취소
controller.abort()

// React: useEffect cleanup으로 취소
useEffect(() => {
    const controller = new AbortController()

    async function loadData() {
        try {
            const response = await fetch('/api/data', {
                signal: controller.signal
            })
            const data = await response.json()
            setData(data)
        } catch (error) {
            if (error.name !== 'AbortError') setError(error)
        }
    }
    loadData()

    return () => controller.abort()  // 컴포넌트 언마운트 시 취소
}, [])

// 타임아웃 구현
async function fetchWithTimeout(url: string, ms: number) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), ms)

    try {
        return await fetch(url, { signal: controller.signal })
    } finally {
        clearTimeout(timeoutId)
    }
}`,
    },
    ios: {
      language: 'swift',
      code: `// Swift: Task.cancel() — 협력적 취소
import Foundation

// Task 취소
let task = Task {
    do {
        let data = try await fetchLargeData()
        await updateUI(data)
    } catch is CancellationError {
        print("작업이 취소됨")
        // 취소는 조용히 처리
    } catch {
        handleError(error)
    }
}

// 외부에서 취소
task.cancel()

// try Task.checkCancellation() — 취소 지점 삽입
func processItems(_ items: [Item]) async throws {
    for item in items {
        try Task.checkCancellation()  // 취소됐으면 CancellationError throw
        try await processItem(item)
    }
}

// Task.isCancelled — 취소 상태 확인
func processWithCheck(_ items: [Item]) async {
    for item in items {
        guard !Task.isCancelled else {
            print("취소됨, 중단")
            return
        }
        await processItem(item)
    }
}

// withTaskCancellationHandler — 취소 즉시 정리
func fetchWithCancellationHandler(url: URL) async throws -> Data {
    try await withTaskCancellationHandler {
        // 메인 작업
        try await URLSession.shared.data(from: url).0
    } onCancel: {
        // 취소 시 즉시 실행 (동기, 어느 스레드든)
        URLSession.shared.getAllTasks { tasks in
            tasks.forEach { \$0.cancel() }
        }
    }
}

// Task.sleep — 취소 인식 대기
func retryWithDelay() async throws -> Data {
    for attempt in 1...3 {
        do {
            return try await fetchData()
        } catch {
            if attempt < 3 {
                // sleep도 취소 인식 — CancellationError throw 가능
                try await Task.sleep(for: .seconds(2))
            }
        }
    }
    throw FetchError.maxRetriesExceeded
}

// withTimeout 패턴 (내장 없음, Task로 구현)
func withTimeout<T: Sendable>(
    seconds: TimeInterval,
    operation: @escaping @Sendable () async throws -> T
) async throws -> T {
    try await withThrowingTaskGroup(of: T.self) { group in
        group.addTask { try await operation() }
        group.addTask {
            try await Task.sleep(for: .seconds(seconds))
            throw TimeoutError()
        }
        let result = try await group.next()!
        group.cancelAll()
        return result
    }
}`,
    },
  },

  concurrency_continuation: {
    caption: 'Continuation — 콜백을 async/await으로 변환',
    android: {
      language: 'kotlin',
      code: `// Kotlin: suspendCoroutine / suspendCancellableCoroutine
import kotlinx.coroutines.*
import kotlin.coroutines.*

// suspendCoroutine — 콜백 기반 API 래핑
suspend fun fetchUserLegacy(userId: String): User {
    return suspendCoroutine { continuation ->
        LegacyApiClient.getUser(userId, object : Callback<User> {
            override fun onSuccess(user: User) {
                continuation.resume(user)
            }
            override fun onFailure(error: Throwable) {
                continuation.resumeWithException(error)
            }
        })
    }
}

// suspendCancellableCoroutine — 취소 지원 (권장)
suspend fun fetchWithCancellation(userId: String): User {
    return suspendCancellableCoroutine { continuation ->
        val call = LegacyApiClient.getUser(userId, object : Callback<User> {
            override fun onSuccess(user: User) {
                if (continuation.isActive) {
                    continuation.resume(user)
                }
            }
            override fun onFailure(error: Throwable) {
                continuation.resumeWithException(error)
            }
        })

        // 취소 시 처리
        continuation.invokeOnCancellation {
            call.cancel()
        }
    }
}

// 위치 요청 래핑
suspend fun getCurrentLocation(): Location {
    return suspendCancellableCoroutine { continuation ->
        val listener = LocationListener { location ->
            continuation.resume(location)
        }
        locationManager.requestSingleUpdate(listener)
        continuation.invokeOnCancellation {
            locationManager.removeUpdates(listener)
        }
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// Web: new Promise() — 콜백을 Promise로 변환 (Promisify)
// 기본 패턴 — 노드 스타일 콜백
function readFileAsync(path: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

// util.promisify — 자동 변환
import { promisify } from 'util'
const readFileAsync = promisify(fs.readFile)

// 이벤트 이미터 → Promise
function waitForEvent<T>(
    emitter: EventEmitter,
    eventName: string
): Promise<T> {
    return new Promise((resolve, reject) => {
        emitter.once(eventName, resolve)
        emitter.once('error', reject)
    })
}

// Geolocation API 래핑
function getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 5000,
            maximumAge: 60000
        })
    })
}

// 사용
const position = await getCurrentPosition()
console.log(position.coords.latitude)

// AbortSignal 지원 추가
function fetchWithAbort(url: string, signal: AbortSignal): Promise<Response> {
    return new Promise((resolve, reject) => {
        fetch(url, { signal }).then(resolve).catch(reject)
        signal.addEventListener('abort', () =>
            reject(new DOMException('Aborted', 'AbortError'))
        )
    })
}`,
    },
    ios: {
      language: 'swift',
      code: `// Swift: withCheckedContinuation / withCheckedThrowingContinuation
import Foundation
import CoreLocation

// withCheckedThrowingContinuation — 에러 있는 콜백 래핑
func fetchUserLegacy(userId: String) async throws -> User {
    try await withCheckedThrowingContinuation { continuation in
        LegacyAPIClient.getUser(userId) { result, error in
            if let error {
                continuation.resume(throwing: error)
            } else if let result {
                continuation.resume(returning: result)
            } else {
                continuation.resume(throwing: APIError.unexpectedNilResult)
            }
        }
    }
}

// withCheckedContinuation — 에러 없는 콜백
func requestPermission() async -> Bool {
    await withCheckedContinuation { continuation in
        CLLocationManager().requestWhenInUseAuthorization()
        // delegate를 통한 응답 처리
        PermissionHandler.shared.onResult = { granted in
            continuation.resume(returning: granted)
        }
    }
}

// 취소 지원 — withTaskCancellationHandler 조합
func fetchImageCancellable(url: URL) async throws -> UIImage {
    let downloadTask = URLSession.shared.downloadTask(with: url)

    return try await withTaskCancellationHandler {
        try await withCheckedThrowingContinuation { continuation in
            downloadTask.resume()

            URLSession.shared.dataTask(with: url) { data, _, error in
                if let error {
                    continuation.resume(throwing: error)
                } else if let data, let image = UIImage(data: data) {
                    continuation.resume(returning: image)
                } else {
                    continuation.resume(throwing: ImageError.invalidData)
                }
            }.resume()
        }
    } onCancel: {
        downloadTask.cancel()
    }
}

// 중요: continuation은 반드시 한 번만 resume
// 두 번 resume하면 크래시 (Checked 버전은 경고/크래시)
// Unsafe 버전은 정말 확실할 때만 사용
func fetchUnsafe(userId: String) async -> User? {
    await withUnsafeContinuation { continuation in
        // Unsafe: 두 번 resume해도 경고 없음 → UB
        LegacyAPIClient.getUser(userId) { user, _ in
            continuation.resume(returning: user)
        }
    }
}

// 실전 패턴 — Delegate 기반 API 래핑
class LocationFetcher: NSObject, CLLocationManagerDelegate {
    private let manager = CLLocationManager()
    private var continuation: CheckedContinuation<CLLocation, Error>?

    func getCurrentLocation() async throws -> CLLocation {
        try await withCheckedThrowingContinuation { continuation in
            self.continuation = continuation
            manager.delegate = self
            manager.requestLocation()
        }
    }

    func locationManager(_ manager: CLLocationManager,
                         didUpdateLocations locations: [CLLocation]) {
        continuation?.resume(returning: locations[0])
        continuation = nil
    }

    func locationManager(_ manager: CLLocationManager,
                         didFailWithError error: Error) {
        continuation?.resume(throwing: error)
        continuation = nil
    }
}`,
    },
  },

  // === src/data/codeBlocks-ch9.ts ===
testing_xctest_basic: {
    caption: 'XCTest 기본 구조 vs JUnit vs Jest',
    android: {
      language: 'kotlin',
      code: `// JUnit 5 단위 테스트
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.*

class CartViewModelTest {

    private lateinit var sut: CartViewModel
    private lateinit var mockRepository: MockCartRepository

    @BeforeEach
    fun setUp() {
        mockRepository = MockCartRepository()
        sut = CartViewModel(mockRepository)
    }

    @AfterEach
    fun tearDown() {
        // 정리 작업
    }

    @Test
    fun \`addItem increases count\`() {
        // Given
        val item = CartItem(id = "1", name = "테스트 상품", price = 1000)

        // When
        sut.addItem(item)

        // Then
        assertEquals(1, sut.itemCount)
    }

    @Test
    fun \`checkout with empty cart throws exception\`() {
        // Given: 빈 장바구니

        // When & Then
        assertThrows<EmptyCartException> {
            sut.checkout()
        }
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// Jest + TypeScript 단위 테스트
import { CartViewModel } from './CartViewModel'
import { MockCartRepository } from './__mocks__/MockCartRepository'

describe('CartViewModel', () => {
    let sut: CartViewModel
    let mockRepository: MockCartRepository

    beforeEach(() => {
        mockRepository = new MockCartRepository()
        sut = new CartViewModel(mockRepository)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('addItem', () => {
        it('장바구니에 아이템 추가 시 count가 증가한다', () => {
            // given
            const item = { id: '1', name: '테스트 상품', price: 1000 }

            // when
            sut.addItem(item)

            // then
            expect(sut.itemCount).toBe(1)
        })
    })

    describe('checkout', () => {
        it('빈 장바구니에서 결제 시 에러를 던진다', () => {
            // when & then
            expect(() => sut.checkout()).toThrow(EmptyCartError)
        })
    })
})`,
    },
    ios: {
      language: 'swift',
      code: `// XCTest 단위 테스트
import XCTest
@testable import MyApp

final class CartViewModelTests: XCTestCase {

    // SUT = System Under Test
    var sut: CartViewModel!
    var mockRepository: MockCartRepository!

    // 각 테스트 전 실행 — JUnit @BeforeEach, Jest beforeEach
    override func setUp() {
        super.setUp()
        mockRepository = MockCartRepository()
        sut = CartViewModel(repository: mockRepository)
    }

    // 각 테스트 후 실행 — JUnit @AfterEach, Jest afterEach
    override func tearDown() {
        sut = nil
        mockRepository = nil
        super.tearDown()
    }

    // 테스트 함수는 반드시 'test'로 시작
    func testAddItem_increasesCount() {
        // Given
        let item = CartItem(id: "1", name: "테스트 상품", price: 1000)

        // When
        sut.addItem(item)

        // Then
        XCTAssertEqual(sut.itemCount, 1)
    }

    func testCheckout_withEmptyCart_throwsError() {
        // Given: 빈 장바구니 상태 (setUp에서 보장)

        // When & Then
        XCTAssertThrowsError(try sut.checkout()) { error in
            XCTAssertEqual(error as? CartError, CartError.emptyCart)
        }
    }
}`,
    },
  },

  testing_xctest_assertions: {
    caption: 'XCTAssert 종류 vs JUnit Assertions vs Jest Matchers',
    android: {
      language: 'kotlin',
      code: `// JUnit 5 Assertions
import org.junit.jupiter.api.Assertions.*

// 동등성
assertEquals(expected, actual)
assertNotEquals(unexpected, actual)

// null 체크
assertNull(value)
assertNotNull(value)

// 불리언
assertTrue(condition)
assertFalse(condition)

// 예외
assertThrows<IllegalArgumentException> { riskyOperation() }
assertDoesNotThrow { safeOperation() }

// 컬렉션
assertTrue(list.isEmpty())
assertEquals(3, list.size)

// 범위 / 타입
assertInstanceOf(String::class.java, obj)

// 여러 조건 동시 검증
assertAll(
    { assertEquals(1, result.id) },
    { assertEquals("홍길동", result.name) },
    { assertTrue(result.isActive) }
)

// 실패 메시지
assertEquals(expected, actual, "사용자 이름이 일치해야 합니다")`,
    },
    web: {
      language: 'typescript',
      code: `// Jest Matchers
import { expect } from '@jest/globals'

// 동등성 (얕은 비교)
expect(actual).toBe(expected)          // Object.is 비교
expect(actual).not.toBe(unexpected)

// 깊은 동등성
expect(obj).toEqual({ id: 1, name: '홍길동' })
expect(obj).toStrictEqual(expected)    // undefined 속성도 검사

// null / undefined
expect(value).toBeNull()
expect(value).toBeUndefined()
expect(value).toBeDefined()

// 불리언
expect(condition).toBeTruthy()
expect(condition).toBeFalsy()

// 숫자
expect(n).toBeGreaterThan(0)
expect(n).toBeCloseTo(3.14, 2)         // 소수점 2자리까지

// 문자열
expect(str).toContain('hello')
expect(str).toMatch(/^hello/)

// 배열
expect(arr).toHaveLength(3)
expect(arr).toContain('item')
expect(arr).toContainEqual({ id: 1 })

// 예외
expect(() => fn()).toThrow(CustomError)
expect(() => fn()).toThrow('에러 메시지')`,
    },
    ios: {
      language: 'swift',
      code: `// XCTest Assertions

// 동등성
XCTAssertEqual(actual, expected)
XCTAssertNotEqual(actual, unexpected)

// nil 체크
XCTAssertNil(value)
XCTAssertNotNil(value)

// 불리언
XCTAssertTrue(condition)
XCTAssertFalse(condition)

// 숫자 비교
XCTAssertGreaterThan(a, b)            // a > b
XCTAssertGreaterThanOrEqual(a, b)     // a >= b
XCTAssertLessThan(a, b)               // a < b
XCTAssertLessThanOrEqual(a, b)        // a <= b

// 부동소수점 (정밀도 지정)
XCTAssertEqual(result, 3.14, accuracy: 0.001)

// 예외
XCTAssertThrowsError(try riskyOperation()) { error in
    XCTAssertEqual(error as? AppError, AppError.invalidInput)
}
XCTAssertNoThrow(try safeOperation())

// Optional 안전 언래핑 (nil이면 테스트 실패 후 종료)
let value = try XCTUnwrap(optionalValue)

// 무조건 실패
XCTFail("이 코드에 도달하면 안 됩니다")

// 모든 assertion에 메시지 추가 가능
XCTAssertEqual(sut.count, 3, "아이템 3개 추가 후 count는 3이어야 합니다")`,
    },
  },

  testing_mock_protocol: {
    caption: 'Protocol 기반 Mock vs Mockito vs Jest mock',
    android: {
      language: 'kotlin',
      code: `// Mockito를 사용한 Mock
import org.mockito.kotlin.*

interface UserRepository {
    suspend fun fetchUser(id: String): User
    suspend fun saveUser(user: User)
}

class UserViewModelTest {

    // Mockito: 인터페이스로부터 자동으로 Mock 생성
    private val mockRepository: UserRepository = mock()
    private lateinit var sut: UserViewModel

    @BeforeEach
    fun setUp() {
        sut = UserViewModel(mockRepository)
    }

    @Test
    fun \`fetchUser 성공 시 상태 업데이트\`() = runTest {
        // Given: Mock 동작 정의
        val expectedUser = User(id = "1", name = "홍길동")
        whenever(mockRepository.fetchUser("1")).thenReturn(expectedUser)

        // When
        sut.loadUser("1")

        // Then: 결과 검증
        assertEquals(expectedUser, sut.user.value)

        // 호출 검증
        verify(mockRepository).fetchUser("1")
        verify(mockRepository, never()).saveUser(any())
    }

    @Test
    fun \`fetchUser 실패 시 에러 상태\`() = runTest {
        // Given: 예외 설정
        whenever(mockRepository.fetchUser(any()))
            .thenThrow(NetworkException("연결 실패"))

        // When
        sut.loadUser("1")

        // Then
        assertNotNull(sut.error.value)
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// Jest mock을 사용한 Mock
interface UserRepository {
    fetchUser(id: string): Promise<User>
    saveUser(user: User): Promise<void>
}

// 방법 1: jest.fn()으로 수동 Mock 객체 생성
const mockRepository: jest.Mocked<UserRepository> = {
    fetchUser: jest.fn(),
    saveUser: jest.fn(),
}

// 방법 2: jest.mock()으로 모듈 자동 Mock
jest.mock('./UserRepository')
import { UserRepository } from './UserRepository'
const MockUserRepository = UserRepository as jest.MockedClass<typeof UserRepository>

describe('UserViewModel', () => {
    let sut: UserViewModel

    beforeEach(() => {
        jest.clearAllMocks()
        sut = new UserViewModel(mockRepository)
    })

    it('fetchUser 성공 시 상태를 업데이트한다', async () => {
        // given
        const expectedUser = { id: '1', name: '홍길동' }
        mockRepository.fetchUser.mockResolvedValue(expectedUser)

        // when
        await sut.loadUser('1')

        // then
        expect(sut.user).toEqual(expectedUser)
        expect(mockRepository.fetchUser).toHaveBeenCalledWith('1')
        expect(mockRepository.fetchUser).toHaveBeenCalledTimes(1)
        expect(mockRepository.saveUser).not.toHaveBeenCalled()
    })

    it('fetchUser 실패 시 에러 상태를 설정한다', async () => {
        // given
        mockRepository.fetchUser.mockRejectedValue(new NetworkError('연결 실패'))

        // when
        await sut.loadUser('1')

        // then
        expect(sut.error).toBeInstanceOf(NetworkError)
    })
})`,
    },
    ios: {
      language: 'swift',
      code: `// Protocol 기반 수동 Mock
// iOS에는 Mockito가 없음 — Protocol + 수동 구현이 관용적 방식

protocol UserRepositoryProtocol {
    func fetchUser(id: String) async throws -> User
    func saveUser(_ user: User) async throws
}

// Mock 클래스: 테스트 파일에 정의
final class MockUserRepository: UserRepositoryProtocol {
    // 반환값 제어
    var fetchUserResult: Result<User, Error> = .success(User(id: "1", name: "홍길동"))

    // 호출 추적
    var fetchUserCallCount = 0
    var lastFetchedID: String?
    var saveUserCallCount = 0
    var lastSavedUser: User?

    func fetchUser(id: String) async throws -> User {
        fetchUserCallCount += 1
        lastFetchedID = id
        return try fetchUserResult.get()
    }

    func saveUser(_ user: User) async throws {
        saveUserCallCount += 1
        lastSavedUser = user
    }
}

// 테스트
final class UserViewModelTests: XCTestCase {

    var sut: UserViewModel!
    var mockRepository: MockUserRepository!

    override func setUp() {
        super.setUp()
        mockRepository = MockUserRepository()
        sut = UserViewModel(repository: mockRepository)
    }

    func testLoadUser_success_updatesState() async throws {
        // Given
        let expectedUser = User(id: "1", name: "홍길동")
        mockRepository.fetchUserResult = .success(expectedUser)

        // When
        await sut.loadUser(id: "1")

        // Then: 결과 검증
        XCTAssertEqual(sut.user, expectedUser)
        XCTAssertNil(sut.error)

        // 호출 검증
        XCTAssertEqual(mockRepository.fetchUserCallCount, 1)
        XCTAssertEqual(mockRepository.lastFetchedID, "1")
        XCTAssertEqual(mockRepository.saveUserCallCount, 0)
    }

    func testLoadUser_failure_setsError() async {
        // Given
        mockRepository.fetchUserResult = .failure(NetworkError.connectionFailed)

        // When
        await sut.loadUser(id: "1")

        // Then
        XCTAssertNil(sut.user)
        XCTAssertNotNil(sut.error)
    }
}`,
    },
  },

  testing_async_testing: {
    caption: 'async/await 테스팅 vs coroutine test vs jest async',
    android: {
      language: 'kotlin',
      code: `// Kotlin coroutine 테스트
import kotlinx.coroutines.test.*
import org.junit.jupiter.api.extension.ExtendWith

// 방법 1: runTest (권장 — TestCoroutineScheduler 내장)
@Test
fun \`fetchUser 성공 케이스\`() = runTest {
    // Given
    val mockRepository = MockUserRepository()
    val sut = UserViewModel(mockRepository, testDispatcher = testScheduler)

    // When
    sut.loadUser("123")
    advanceUntilIdle()    // 모든 코루틴이 완료될 때까지 대기

    // Then
    assertEquals(UserState.Success(expectedUser), sut.uiState.value)
}

// 방법 2: StandardTestDispatcher로 시간 제어
@Test
fun \`로딩 상태 전환 순서 검증\`() = runTest {
    val states = mutableListOf<UserState>()

    val job = launch {
        sut.uiState.collect { states.add(it) }
    }

    sut.loadUser("123")
    advanceTimeBy(100)    // 100ms 앞으로
    runCurrent()          // 현재 대기 중인 코루틴 실행

    job.cancel()

    assertEquals(UserState.Loading, states[1])
    assertEquals(UserState.Success(expectedUser), states[2])
}

// Flow 테스트
@Test
fun \`Flow 이벤트 순서 검증\`() = runTest {
    val results = sut.itemsFlow.take(3).toList()
    assertEquals(3, results.size)
}`,
    },
    web: {
      language: 'typescript',
      code: `// Jest async 테스트

// 방법 1: async/await (권장)
it('fetchUser 성공 케이스', async () => {
    // given
    mockRepository.fetchUser.mockResolvedValue({ id: '123', name: '홍길동' })

    // when
    await sut.loadUser('123')

    // then
    expect(sut.user).toEqual({ id: '123', name: '홍길동' })
    expect(sut.isLoading).toBe(false)
})

// 방법 2: Promise 반환
it('fetchUser 에러 처리', () => {
    mockRepository.fetchUser.mockRejectedValue(new Error('Network Error'))

    return expect(sut.loadUser('123')).rejects.toThrow('Network Error')
})

// 방법 3: 가짜 타이머로 시간 제어
it('로딩 인디케이터가 500ms 후 사라진다', async () => {
    jest.useFakeTimers()

    sut.loadUser('123')
    expect(sut.isLoading).toBe(true)

    jest.advanceTimersByTime(500)
    await Promise.resolve()    // microtask 큐 비우기

    expect(sut.isLoading).toBe(false)

    jest.useRealTimers()
})

// Observable/RxJS 테스트
it('items$ 스트림이 데이터를 발행한다', (done) => {
    sut.items$.pipe(skip(1)).subscribe(items => {
        expect(items).toHaveLength(3)
        done()
    })
    sut.loadItems()
})`,
    },
    ios: {
      language: 'swift',
      code: `// Swift async/await 테스트

// 방법 1: async throws 함수 (Swift 5.5+ / iOS 15+)
// XCTestCase가 async throws를 네이티브 지원
func testFetchUser_success() async throws {
    // Given
    let expectedUser = User(id: "123", name: "홍길동")
    mockRepository.fetchUserResult = .success(expectedUser)

    // When
    try await sut.loadUser(id: "123")

    // Then
    XCTAssertEqual(sut.user, expectedUser)
    XCTAssertFalse(sut.isLoading)
    XCTAssertNil(sut.error)
}

// 방법 2: expectation (iOS 14 이하 / 콜백 기반 API)
func testFetchUser_legacy() {
    let expectation = expectation(description: "사용자 로드 완료")
    var loadedUser: User?

    sut.loadUser(id: "123") { result in
        if case .success(let user) = result {
            loadedUser = user
        }
        expectation.fulfill()
    }

    waitForExpectations(timeout: 5.0) { error in
        XCTAssertNil(error, "타임아웃 발생: \\(error!)")
    }
    XCTAssertEqual(loadedUser?.id, "123")
}

// 방법 3: @MainActor 격리된 ViewModel 테스트
@MainActor
final class HomeViewModelTests: XCTestCase {

    var sut: HomeViewModel!

    override func setUp() async throws {
        try await super.setUp()
        sut = HomeViewModel(service: MockHomeService())
    }

    func testLoadFeed_updatesItems() async throws {
        // When
        await sut.loadFeed()

        // Then: MainActor 위에서 안전하게 상태 접근
        XCTAssertFalse(sut.items.isEmpty)
        XCTAssertFalse(sut.isLoading)
    }
}

// 방법 4: Task 취소 테스트
func testLoadUser_cancellation_throwsCancellationError() async {
    let task = Task {
        try await sut.loadUser(id: "123")
    }
    task.cancel()

    do {
        _ = try await task.value
        XCTFail("취소된 Task는 에러를 던져야 합니다")
    } catch is CancellationError {
        // 성공 — 예상된 경로
    } catch {
        XCTFail("CancellationError를 기대했지만 \\(error) 발생")
    }
}`,
    },
  },

  testing_xcuitest_basic: {
    caption: 'XCUITest 기본 구조 vs Espresso vs Playwright',
    android: {
      language: 'kotlin',
      code: `// Espresso UI 테스트
import androidx.test.ext.junit.rules.ActivityScenarioRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.matcher.ViewMatchers.*
import androidx.test.espresso.assertion.ViewAssertions.*
import androidx.test.espresso.action.ViewActions.*

@RunWith(AndroidJUnit4::class)
class LoginActivityTest {

    // Activity 실행 규칙 — XCUIApplication().launch() 와 대응
    @get:Rule
    val activityRule = ActivityScenarioRule(LoginActivity::class.java)

    @Test
    fun 로그인_성공_홈화면으로_이동() {
        // 이메일 입력
        onView(withId(R.id.emailEditText))
            .perform(typeText("user@example.com"), closeSoftKeyboard())

        // 비밀번호 입력
        onView(withId(R.id.passwordEditText))
            .perform(typeText("password123"), closeSoftKeyboard())

        // 로그인 버튼 클릭
        onView(withId(R.id.loginButton)).perform(click())

        // 홈 화면의 요소가 표시되는지 확인
        onView(withId(R.id.homeWelcomeText))
            .check(matches(isDisplayed()))
            .check(matches(withText(containsString("환영합니다"))))
    }

    @Test
    fun 잘못된_로그인_에러메시지_표시() {
        onView(withId(R.id.emailEditText))
            .perform(typeText("wrong@example.com"))

        onView(withId(R.id.loginButton)).perform(click())

        onView(withId(R.id.errorTextView))
            .check(matches(isDisplayed()))
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// Playwright E2E 테스트
import { test, expect } from '@playwright/test'

test.describe('로그인 페이지', () => {

    // beforeEach — XCUITest의 setUp()과 대응
    test.beforeEach(async ({ page }) => {
        await page.goto('/login')
    })

    test('로그인 성공 시 홈 화면으로 이동한다', async ({ page }) => {
        // 이메일 입력
        await page.getByTestId('emailInput').fill('user@example.com')

        // 비밀번호 입력
        await page.getByTestId('passwordInput').fill('password123')

        // 로그인 버튼 클릭
        await page.getByTestId('loginButton').click()

        // 홈 화면 확인
        await expect(page).toHaveURL('/home')
        await expect(page.getByTestId('welcomeMessage'))
            .toContainText('환영합니다')
    })

    test('잘못된 인증정보로 에러 메시지를 표시한다', async ({ page }) => {
        await page.getByTestId('emailInput').fill('wrong@example.com')
        await page.getByTestId('passwordInput').fill('wrongpassword')
        await page.getByTestId('loginButton').click()

        await expect(page.getByTestId('errorMessage')).toBeVisible()
        await expect(page.getByTestId('errorMessage'))
            .toContainText('이메일 또는 비밀번호가 올바르지 않습니다')
    })
})`,
    },
    ios: {
      language: 'swift',
      code: `// XCUITest — 별도 프로세스에서 Accessibility API로 앱 제어
import XCTest

final class LoginUITests: XCTestCase {

    var app: XCUIApplication!

    // setUp: 각 테스트 전 앱 실행
    override func setUp() {
        super.setUp()
        continueAfterFailure = false  // 첫 실패 시 즉시 중단

        app = XCUIApplication()

        // 테스트용 launch arguments로 앱 상태 초기화
        app.launchArguments = ["--uitesting", "--reset-state"]
        app.launchEnvironment = ["TEST_BASE_URL": "http://localhost:8080"]

        app.launch()  // 앱 실행 — Playwright의 page.goto()와 유사
    }

    override func tearDown() {
        app.terminate()
        super.tearDown()
    }

    func testLogin_withValidCredentials_navigatesToHome() {
        // Given: 앱이 로그인 화면에 있는 상태

        // When: 이메일과 비밀번호 입력 후 로그인
        let emailField = app.textFields["emailTextField"]
        XCTAssertTrue(emailField.waitForExistence(timeout: 3))
        emailField.tap()
        emailField.typeText("user@example.com")

        let passwordField = app.secureTextFields["passwordTextField"]
        passwordField.tap()
        passwordField.typeText("password123")

        app.buttons["loginButton"].tap()

        // Then: 홈 화면 요소 확인
        let welcomeMessage = app.staticTexts["welcomeMessage"]
        XCTAssertTrue(welcomeMessage.waitForExistence(timeout: 5))
        XCTAssertTrue(welcomeMessage.label.contains("환영합니다"))
    }

    func testLogin_withWrongCredentials_showsError() {
        app.textFields["emailTextField"].tap()
        app.textFields["emailTextField"].typeText("wrong@example.com")

        app.secureTextFields["passwordTextField"].tap()
        app.secureTextFields["passwordTextField"].typeText("wrongpassword")

        app.buttons["loginButton"].tap()

        let errorLabel = app.staticTexts["errorLabel"]
        XCTAssertTrue(errorLabel.waitForExistence(timeout: 3))
        XCTAssertFalse(errorLabel.label.isEmpty)
    }
}`,
    },
  },

  testing_xcuitest_interactions: {
    caption: 'XCUITest UI 요소 조작 vs Espresso vs Playwright',
    android: {
      language: 'kotlin',
      code: `// Espresso 인터랙션
import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.action.ViewActions.*
import androidx.test.espresso.matcher.ViewMatchers.*
import androidx.test.espresso.assertion.ViewAssertions.*
import androidx.test.espresso.contrib.RecyclerViewActions

// 탭(클릭)
onView(withId(R.id.button)).perform(click())
onView(withText("확인")).perform(click())
onView(withContentDescription("닫기")).perform(click())

// 텍스트 입력
onView(withId(R.id.editText))
    .perform(clearText(), typeText("새 텍스트"), closeSoftKeyboard())

// 스크롤
onView(withId(R.id.scrollView)).perform(scrollTo())

// RecyclerView 스크롤 및 클릭
onView(withId(R.id.recyclerView))
    .perform(RecyclerViewActions.scrollToPosition<RecyclerView.ViewHolder>(10))
onView(withId(R.id.recyclerView))
    .perform(RecyclerViewActions.actionOnItemAtPosition<RecyclerView.ViewHolder>(0, click()))

// 스와이프
onView(withId(R.id.view)).perform(swipeLeft())
onView(withId(R.id.view)).perform(swipeUp())

// 상태 확인
onView(withId(R.id.textView)).check(matches(isDisplayed()))
onView(withId(R.id.button)).check(matches(isEnabled()))
onView(withId(R.id.checkBox)).check(matches(isChecked()))

// 텍스트 확인
onView(withId(R.id.label))
    .check(matches(withText("기대하는 텍스트")))`,
    },
    web: {
      language: 'typescript',
      code: `// Playwright 인터랙션
import { Page, expect } from '@playwright/test'

// 클릭
await page.getByRole('button', { name: '확인' }).click()
await page.getByTestId('closeButton').click()
await page.locator('#submit').click()

// 텍스트 입력
await page.getByTestId('searchInput').fill('검색어')
await page.getByTestId('searchInput').clear()
await page.keyboard.type('느리게 타이핑', { delay: 50 })

// 스크롤
await page.evaluate(() => window.scrollTo(0, 500))
await page.getByTestId('loadMoreButton').scrollIntoViewIfNeeded()

// 선택 (select element)
await page.getByTestId('categorySelect').selectOption('electronics')

// 체크박스 / 라디오
await page.getByTestId('agreeCheckbox').check()
await page.getByTestId('agreeCheckbox').uncheck()

// 드래그
await page.getByTestId('slider').dragTo(page.getByTestId('dropZone'))

// 호버
await page.getByTestId('menuItem').hover()

// 키보드
await page.keyboard.press('Enter')
await page.keyboard.press('Escape')

// 상태 확인
await expect(page.getByTestId('modal')).toBeVisible()
await expect(page.getByTestId('button')).toBeEnabled()
await expect(page.getByTestId('input')).toHaveValue('기대값')
await expect(page.getByTestId('list')).toHaveCount(5)`,
    },
    ios: {
      language: 'swift',
      code: `// XCUITest 인터랙션

let app = XCUIApplication()

// === 요소 찾기 ===
// accessibilityIdentifier로 찾기 (권장)
let button = app.buttons["submitButton"]
let textField = app.textFields["emailTextField"]
let label = app.staticTexts["titleLabel"]
let cell = app.cells["productCell_0"]
let image = app.images["productImage"]
let toggle = app.switches["notificationToggle"]

// 레이블 텍스트로 찾기
let confirmButton = app.buttons["확인"]

// 여러 요소 중 인덱스로 찾기
let firstCell = app.cells.element(boundBy: 0)
let allButtons = app.buttons  // XCUIElementQuery

// === 인터랙션 ===
// 탭
button.tap()
app.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.5)).tap()

// 더블 탭
image.doubleTap()

// 텍스트 입력
textField.tap()
textField.clearAndEnterText("새 텍스트")  // 확장 메서드 정의 필요
textField.typeText("추가 텍스트")

// 기존 텍스트 지우기
textField.tap()
textField.press(forDuration: 1.0)         // 길게 눌러서 선택 메뉴 표시
app.menuItems["전체 선택"].tap()
textField.typeText("새 텍스트")

// 스크롤
app.scrollViews.element.swipeUp()
app.tables.element.swipeDown()

// 특정 셀까지 스크롤
while !cell.isHittable {
    app.swipeUp()
}

// 스와이프
cell.swipeLeft()   // 삭제 액션 표시 등
cell.swipeRight()  // 즐겨찾기 등

// 핀치 (줌)
app.maps.element.pinch(withScale: 2.0, velocity: 1.0)   // 확대
app.maps.element.pinch(withScale: 0.5, velocity: -1.0)  // 축소

// 스위치 토글
toggle.tap()

// === 상태 확인 ===
XCTAssertTrue(button.exists)
XCTAssertTrue(button.isEnabled)
XCTAssertTrue(button.isHittable)   // 화면에 보이고 탭 가능

// 텍스트 확인
XCTAssertEqual(label.label, "기대하는 텍스트")
XCTAssertTrue(label.label.contains("부분 문자열"))

// 비동기 대기 (권장: sleep 대신 사용)
XCTAssertTrue(label.waitForExistence(timeout: 5.0))`,
    },
  },

  testing_tdd_example: {
    caption: 'TDD Red-Green-Refactor 예시 (할인 계산기)',
    android: {
      language: 'kotlin',
      code: `// === Red: 실패하는 테스트 먼저 작성 ===
class DiscountCalculatorTest {

    @Test
    fun \`10% 할인 쿠폰 적용\`() {
        val sut = DiscountCalculator()  // 아직 존재하지 않음 — 컴파일 에러
        val result = sut.apply(price = 10_000, discountRate = 0.1)
        assertEquals(9_000, result)
    }

    @Test
    fun \`최대 할인 한도 5000원 초과 시 5000원만 할인\`() {
        val sut = DiscountCalculator()
        val result = sut.apply(price = 100_000, discountRate = 0.2)
        assertEquals(95_000, result)  // 20% = 20,000이지만 한도 5,000
    }

    @Test
    fun \`음수 할인율 입력 시 예외 발생\`() {
        val sut = DiscountCalculator()
        assertThrows<IllegalArgumentException> {
            sut.apply(price = 10_000, discountRate = -0.1)
        }
    }
}

// === Green: 최소한의 구현 ===
class DiscountCalculator {
    fun apply(price: Int, discountRate: Double): Int {
        require(discountRate >= 0) { "할인율은 0 이상이어야 합니다" }
        val maxDiscount = 5_000
        val discount = minOf((price * discountRate).toInt(), maxDiscount)
        return price - discount
    }
}

// === Refactor: 구조 개선 (테스트는 여전히 통과) ===
data class DiscountPolicy(
    val rate: Double,
    val maxAmount: Int = 5_000
) {
    init {
        require(rate in 0.0..1.0) { "할인율은 0~1 사이어야 합니다" }
    }
}

class DiscountCalculator {
    fun apply(price: Int, policy: DiscountPolicy): Int {
        val discount = minOf((price * policy.rate).toInt(), policy.maxAmount)
        return price - discount
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// === Red: 실패하는 테스트 먼저 작성 ===
// DiscountCalculator.test.ts

import { DiscountCalculator } from './DiscountCalculator'  // 아직 없음

describe('DiscountCalculator', () => {

    describe('apply', () => {
        it('10% 할인 쿠폰을 적용한다', () => {
            const sut = new DiscountCalculator()
            expect(sut.apply(10_000, 0.1)).toBe(9_000)
        })

        it('최대 할인 한도 5000원을 초과하지 않는다', () => {
            const sut = new DiscountCalculator()
            expect(sut.apply(100_000, 0.2)).toBe(95_000)
        })

        it('음수 할인율에 에러를 던진다', () => {
            const sut = new DiscountCalculator()
            expect(() => sut.apply(10_000, -0.1))
                .toThrow('할인율은 0 이상이어야 합니다')
        })
    })
})

// === Green: 최소한의 구현 ===
// DiscountCalculator.ts
export class DiscountCalculator {
    private readonly MAX_DISCOUNT = 5_000

    apply(price: number, discountRate: number): number {
        if (discountRate < 0) {
            throw new Error('할인율은 0 이상이어야 합니다')
        }
        const discount = Math.min(price * discountRate, this.MAX_DISCOUNT)
        return price - discount
    }
}

// === Refactor: 타입 강화 및 구조 개선 ===
interface DiscountPolicy {
    readonly rate: number      // 0.0 ~ 1.0
    readonly maxAmount: number
}

export class DiscountCalculator {
    apply(price: number, policy: DiscountPolicy): number {
        if (policy.rate < 0 || policy.rate > 1) {
            throw new RangeError(\`유효하지 않은 할인율: \${policy.rate}\`)
        }
        const discount = Math.min(price * policy.rate, policy.maxAmount)
        return Math.floor(price - discount)
    }
}`,
    },
    ios: {
      language: 'swift',
      code: `// === Red: 실패하는 테스트 먼저 작성 ===
// DiscountCalculatorTests.swift

import XCTest
@testable import MyApp

final class DiscountCalculatorTests: XCTestCase {

    // 아직 DiscountCalculator가 없으므로 컴파일 에러 → Red 단계
    var sut: DiscountCalculator!

    override func setUp() {
        super.setUp()
        sut = DiscountCalculator()
    }

    func testApply_tenPercentDiscount_returnsCorrectPrice() {
        // Given & When
        let result = sut.apply(price: 10_000, discountRate: 0.1)

        // Then
        XCTAssertEqual(result, 9_000)
    }

    func testApply_discountExceedsMaxAmount_capsAt5000() {
        // Given: 20% 할인 시 20,000원이지만 한도는 5,000원
        // When
        let result = sut.apply(price: 100_000, discountRate: 0.2)

        // Then
        XCTAssertEqual(result, 95_000)
    }

    func testApply_negativeDiscountRate_throwsError() {
        // Given & When & Then
        XCTAssertThrowsError(
            try sut.applyOrThrow(price: 10_000, discountRate: -0.1)
        ) { error in
            XCTAssertEqual(error as? DiscountError, .invalidRate)
        }
    }
}

// === Green: 최소한의 구현으로 테스트 통과 ===
// DiscountCalculator.swift

enum DiscountError: Error, Equatable {
    case invalidRate
}

struct DiscountCalculator {
    private let maxDiscountAmount: Int = 5_000

    func apply(price: Int, discountRate: Double) -> Int {
        let discount = min(Int(Double(price) * discountRate), maxDiscountAmount)
        return price - discount
    }

    func applyOrThrow(price: Int, discountRate: Double) throws -> Int {
        guard discountRate >= 0 else { throw DiscountError.invalidRate }
        return apply(price: price, discountRate: discountRate)
    }
}

// === Refactor: 더 명확한 도메인 모델로 개선 ===
// 테스트는 수정 없이 통과를 유지하면서 내부 구조 개선

struct DiscountPolicy {
    let rate: Double        // 0.0 ~ 1.0
    let maxAmount: Int

    static let standard = DiscountPolicy(rate: 0.1, maxAmount: 5_000)
    static let vip      = DiscountPolicy(rate: 0.2, maxAmount: 10_000)

    // 팩토리 메서드로 유효성 검사 캡슐화
    static func make(rate: Double, maxAmount: Int) throws -> DiscountPolicy {
        guard (0.0...1.0).contains(rate) else { throw DiscountError.invalidRate }
        return DiscountPolicy(rate: rate, maxAmount: maxAmount)
    }
}

struct DiscountCalculator {
    func apply(price: Int, policy: DiscountPolicy) -> Int {
        let discountAmount = min(Int(Double(price) * policy.rate), policy.maxAmount)
        return price - discountAmount
    }
}`,
    },
  },

  testing_snapshot: {
    caption: '스냅샷 테스트 vs Jest snapshot vs Android Paparazzi',
    android: {
      language: 'kotlin',
      code: `// Paparazzi 스냅샷 테스트 (Square)
// build.gradle.kts
// plugins { id("app.cash.paparazzi") version "1.3.4" }

import app.cash.paparazzi.Paparazzi
import com.android.resources.NightMode
import com.android.resources.ScreenOrientation
import org.junit.Rule
import org.junit.Test

class ProductCardSnapshotTest {

    @get:Rule
    val paparazzi = Paparazzi(
        deviceConfig = DeviceConfig.PIXEL_6,
        theme = "Theme.MyApp"
    )

    @Test
    fun productCard_lightMode() {
        paparazzi.snapshot {
            ProductCardComposable(
                product = Product(
                    id = "1",
                    name = "테스트 상품",
                    price = 29_900
                )
            )
        }
    }

    @Test
    fun productCard_darkMode() {
        paparazzi.snapshot(name = "dark") {
            MaterialTheme(colorScheme = darkColorScheme()) {
                ProductCardComposable(product = Product.preview)
            }
        }
    }

    // 여러 기기 크기 테스트
    @Test
    fun productCard_allDevices() {
        listOf(
            DeviceConfig.NEXUS_5,
            DeviceConfig.PIXEL_6,
            DeviceConfig.PIXEL_TABLET
        ).forEach { device ->
            paparazzi.unsafeUpdateConfig(deviceConfig = device)
            paparazzi.snapshot(name = device.screenWidth.toString()) {
                ProductCardComposable(product = Product.preview)
            }
        }
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// Jest 스냅샷 테스트 (React Testing Library)
import { render } from '@testing-library/react'
import { ProductCard } from './ProductCard'

describe('ProductCard', () => {

    // 방법 1: DOM 트리 스냅샷 (텍스트 기반)
    it('기본 상태를 올바르게 렌더링한다', () => {
        const product = { id: '1', name: '테스트 상품', price: 29_900 }
        const { container } = render(<ProductCard product={product} />)

        // 처음 실행 시 __snapshots__/ProductCard.test.tsx.snap 생성
        expect(container).toMatchSnapshot()
    })

    // 방법 2: 인라인 스냅샷 (파일 내에 저장)
    it('가격 형식을 올바르게 표시한다', () => {
        const { getByTestId } = render(
            <ProductCard product={{ id: '1', name: '상품', price: 29_900 }} />
        )

        expect(getByTestId('priceText').textContent).toMatchInlineSnapshot(
            \`"29,900원"\`
        )
    })
})

// 방법 3: Storybook + Chromatic (비주얼 회귀 테스트)
// storybook.config.ts
export default {
    parameters: {
        chromatic: { viewports: [375, 768, 1440] },
    },
}

// ProductCard.stories.tsx
export const Default: Story = {
    args: { product: mockProduct },
}
export const DarkMode: Story = {
    args: { product: mockProduct },
    parameters: { backgrounds: { default: 'dark' } },
}

// 스냅샷 갱신
// npx jest --updateSnapshot
// npx jest -u`,
    },
    ios: {
      language: 'swift',
      code: `// swift-snapshot-testing (Point-Free)
// Package.swift에 추가:
// .package(url: "https://github.com/pointfreeco/swift-snapshot-testing", from: "1.15.0")

import SnapshotTesting
import SwiftUI
import XCTest
@testable import MyApp

final class ProductCardSnapshotTests: XCTestCase {

    // 처음 실행 시 레퍼런스 이미지 저장
    // 이후 실행 시 저장된 이미지와 비교하여 차이 발생 시 실패

    func testProductCard_default() {
        let product = Product(id: "1", name: "테스트 상품", price: 29_900)
        let view = ProductCardView(product: product)

        // .image: PNG로 스냅샷
        // .sizeThatFits: 뷰 고유 크기로 렌더링
        assertSnapshot(of: view, as: .image(layout: .sizeThatFits))
    }

    func testProductCard_multipleDevices() {
        let view = ProductCardView(product: .preview)

        // iPhone SE (소형)
        assertSnapshot(
            of: view,
            as: .image(layout: .device(config: .iPhoneSe)),
            named: "iPhoneSE"
        )

        // iPhone 16 Pro (기본)
        assertSnapshot(
            of: view,
            as: .image(layout: .device(config: .iPhone13Pro)),
            named: "iPhone16Pro"
        )

        // iPad Pro 12.9인치
        assertSnapshot(
            of: view,
            as: .image(layout: .device(config: .iPadPro12_9)),
            named: "iPadPro"
        )
    }

    func testProductCard_darkMode() {
        let view = ProductCardView(product: .preview)
            .preferredColorScheme(.dark)
            .background(Color.black)

        assertSnapshot(
            of: view,
            as: .image(layout: .sizeThatFits),
            named: "darkMode"
        )
    }

    // UIKit 컴포넌트 스냅샷
    func testProductCell_uikit() {
        let cell = ProductTableViewCell()
        cell.configure(with: .preview)
        cell.frame = CGRect(x: 0, y: 0, width: 375, height: 80)

        assertSnapshot(of: cell, as: .image)
    }

    // 접근성 텍스트 크기 테스트
    func testProductCard_accessibilityExtraLarge() {
        let view = ProductCardView(product: .preview)
            .environment(\\.sizeCategory, .accessibilityExtraLarge)

        assertSnapshot(
            of: view,
            as: .image(layout: .sizeThatFits),
            named: "a11y_extraLarge"
        )
    }
}

// 레퍼런스 이미지 갱신 방법:
// 1. isRecording = true 설정 후 테스트 실행
// 2. RECORD_SNAPSHOTS=true 환경변수 사용
// 3. 커밋 전 반드시 false로 되돌릴 것`,
    },
  },

  testing_code_coverage: {
    caption: '코드 커버리지 측정 vs JaCoCo vs Istanbul/c8',
    android: {
      language: 'kotlin',
      code: `// JaCoCo 코드 커버리지 설정
// build.gradle.kts

plugins {
    jacoco
}

android {
    buildTypes {
        debug {
            enableUnitTestCoverage = true
            enableAndroidTestCoverage = true
        }
    }
}

jacoco {
    toolVersion = "0.8.11"
}

// 커버리지 리포트 Task 정의
tasks.register<JacocoReport>("jacocoTestReport") {
    dependsOn("testDebugUnitTest")

    reports {
        xml.required = true   // CI 도구 연동용
        html.required = true  // 로컬 확인용
    }

    // 제외 파일 (생성 코드, DI 등)
    classDirectories.setFrom(
        fileTree(layout.buildDirectory.dir("tmp/kotlin-classes/debug")) {
            exclude(
                "**/R.class",
                "**/R\$*.class",
                "**/BuildConfig.*",
                "**/*_Factory*",      // Hilt 생성 코드
                "**/*Module_*",       // Dagger 생성 코드
                "**/*_Impl*"          // Room 생성 코드
            )
        }
    )
}

// 커버리지 최소값 강제 (threshold)
tasks.withType<JacocoCoverageVerification> {
    violationRules {
        rule {
            limit {
                minimum = "0.80".toBigDecimal()  // 80% 이상 필수
            }
        }
    }
}

// 실행 명령
// ./gradlew jacocoTestReport
// 리포트 위치: build/reports/jacoco/jacocoTestReport/html/index.html`,
    },
    web: {
      language: 'typescript',
      code: `// Jest + Istanbul/c8 커버리지 설정
// jest.config.ts

import type { Config } from 'jest'

const config: Config = {
    // 커버리지 활성화
    collectCoverage: true,

    // 커버리지 대상 파일 지정
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/**/*.stories.{ts,tsx}',
        '!src/**/index.ts',           // re-export 파일 제외
        '!src/mocks/**',              // Mock 파일 제외
    ],

    // 리포트 형식
    coverageReporters: [
        'text',           // 터미널 출력
        'text-summary',   // 요약 출력
        'html',           // HTML 리포트
        'lcov',           // SonarQube 등 연동
    ],

    // 커버리지 임계값 — 미달 시 테스트 실패
    coverageThreshold: {
        global: {
            branches: 80,     // 분기 커버리지
            functions: 80,    // 함수 커버리지
            lines: 80,        // 라인 커버리지
            statements: 80,   // 구문 커버리지
        },
        // 특정 파일에 더 높은 기준 적용
        './src/utils/discountCalculator.ts': {
            branches: 100,
            functions: 100,
        },
    },
}

export default config

// package.json scripts
// "test:coverage": "jest --coverage",
// "test:ci": "jest --coverage --ci --forceExit"

// Vitest 사용 시 (vite.config.ts)
// test: {
//     coverage: {
//         provider: 'v8',  // 또는 'istanbul'
//         reporter: ['text', 'html', 'lcov'],
//         thresholds: { lines: 80 }
//     }
// }`,
    },
    ios: {
      language: 'swift',
      code: `// Xcode 내장 코드 커버리지

// 1. Xcode에서 활성화
// Product → Scheme → Edit Scheme → Test 탭
// ☑ Gather coverage for: All targets

// 2. xcodebuild 명령으로 CI에서 실행
// xcodebuild test \\
//   -scheme MyApp \\
//   -destination 'platform=iOS Simulator,name=iPhone 16' \\
//   -enableCodeCoverage YES \\
//   -resultBundlePath TestResults.xcresult

// 3. xcresulttool로 커버리지 데이터 추출
// xcrun xcresulttool get --format json --path TestResults.xcresult

// 4. slather로 HTML/Cobertura 리포트 생성
// gem install slather
// slather coverage --html --output-directory coverage-report MyApp.xcodeproj

// .slather.yml 설정 파일
// scheme: MyApp
// output_directory: coverage-report
// html: true
// cobertura_xml: true      # Jenkins/SonarQube 연동
// ignore:
//   - "Pods/*"
//   - "*Tests*"
//   - "*/Generated/*"     # Sourcery 등 생성 코드 제외

// 5. 커버리지 임계값 검사 스크립트 (CI에서 사용)
// scripts/check_coverage.sh

/*
#!/bin/bash

RESULT_PATH="TestResults.xcresult"
THRESHOLD=80

COVERAGE=$(xcrun xcresulttool get \\
    --format json \\
    --path "\${RESULT_PATH}" \\
    | python3 -c "
import sys, json
data = json.load(sys.stdin)
targets = data.get('metrics', {})
    .get('testsCount', {})
pct = data.get('metrics', {})
    .get('testsCoverage', {})
    .get('_value', 0)
print(pct)
")

echo "Coverage: \${COVERAGE}%"

if (( \$(echo "\${COVERAGE} < \${THRESHOLD}" | bc -l) )); then
    echo "❌ Coverage \${COVERAGE}% is below threshold \${THRESHOLD}%"
    exit 1
else
    echo "✅ Coverage check passed"
fi
*/

// 6. GitHub Actions 통합 예시
// - name: Check Coverage
//   run: |
//     xcrun xccov view \\
//       --report --json TestResults.xcresult \\
//       > coverage.json
//     python3 scripts/check_coverage.py coverage.json 80

// 7. Swift Package 테스트 커버리지
// swift test --enable-code-coverage
// 리포트 위치: .build/debug/codecov/
// llvm-cov report \\
//   .build/debug/MyAppPackageTests.xctest \\
//   -instr-profile .build/debug/codecov/default.profdata`,
    },
  },

  // === src/data/codeBlocks-ch10.ts ===
persistence_userdefaults: {
    caption: 'UserDefaults vs SharedPreferences vs AsyncStorage/localStorage',
    android: {
      language: 'kotlin',
      code: `// Android — SharedPreferences (전통적 방식)
import android.content.Context
import android.content.SharedPreferences

class PreferencesManager(context: Context) {
    private val prefs: SharedPreferences =
        context.getSharedPreferences("app_prefs", Context.MODE_PRIVATE)

    // 쓰기: apply()는 비동기, commit()은 동기
    fun saveUserName(name: String) {
        prefs.edit().putString("user_name", name).apply()
    }

    fun saveLoginState(isLoggedIn: Boolean) {
        prefs.edit().putBoolean("is_logged_in", isLoggedIn).apply()
    }

    fun saveScore(score: Int) {
        prefs.edit().putInt("high_score", score).apply()
    }

    // 읽기: 기본값 필수
    fun getUserName(): String = prefs.getString("user_name", "") ?: ""
    fun isLoggedIn(): Boolean = prefs.getBoolean("is_logged_in", false)
    fun getScore(): Int = prefs.getInt("high_score", 0)

    // 삭제
    fun clearAll() {
        prefs.edit().clear().apply()
    }
}

// DataStore (Jetpack — 현대적 방식, Flow 기반)
import androidx.datastore.preferences.core.*
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

class DataStoreManager(private val dataStore: DataStore<Preferences>) {
    companion object {
        val USER_NAME = stringPreferencesKey("user_name")
        val HIGH_SCORE = intPreferencesKey("high_score")
    }

    // 읽기: Flow<T> 반환
    val userName: Flow<String> = dataStore.data
        .map { prefs -> prefs[USER_NAME] ?: "" }

    // 쓰기: suspend 함수
    suspend fun saveUserName(name: String) {
        dataStore.edit { prefs ->
            prefs[USER_NAME] = name
        }
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// Web — localStorage (동기, 문자열만 저장)
class LocalStorageService {
    private readonly PREFIX = 'myapp_'

    set<T>(key: string, value: T): void {
        try {
            localStorage.setItem(this.PREFIX + key, JSON.stringify(value))
        } catch (e) {
            console.error('localStorage 쓰기 실패:', e)
        }
    }

    get<T>(key: string, defaultValue: T): T {
        try {
            const item = localStorage.getItem(this.PREFIX + key)
            return item ? JSON.parse(item) : defaultValue
        } catch {
            return defaultValue
        }
    }

    remove(key: string): void {
        localStorage.removeItem(this.PREFIX + key)
    }

    clear(): void {
        Object.keys(localStorage)
            .filter(k => k.startsWith(this.PREFIX))
            .forEach(k => localStorage.removeItem(k))
    }
}

// React Native — AsyncStorage (비동기)
import AsyncStorage from '@react-native-async-storage/async-storage'

async function saveUserName(name: string): Promise<void> {
    await AsyncStorage.setItem('user_name', name)
}

async function getUserName(): Promise<string> {
    const name = await AsyncStorage.getItem('user_name')
    return name ?? ''
}

// 여러 값 동시 저장/읽기
async function saveMultiple(): Promise<void> {
    await AsyncStorage.multiSet([
        ['user_name', 'Alice'],
        ['theme', 'dark'],
        ['locale', 'ko'],
    ])
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS — UserDefaults
import Foundation

// 방법 1: 직접 사용 (소규모)
UserDefaults.standard.set("Alice", forKey: "userName")
UserDefaults.standard.set(true, forKey: "isLoggedIn")
UserDefaults.standard.set(42, forKey: "highScore")

let name = UserDefaults.standard.string(forKey: "userName") ?? ""
let isLoggedIn = UserDefaults.standard.bool(forKey: "isLoggedIn")
let score = UserDefaults.standard.integer(forKey: "highScore")

// 방법 2: 래퍼 클래스 (중규모 — 키 분산 방지)
final class AppPreferences {
    static let shared = AppPreferences()
    private let defaults = UserDefaults.standard

    private enum Key: String {
        case userName, isLoggedIn, highScore, themeMode, locale
    }

    var userName: String {
        get { defaults.string(forKey: Key.userName.rawValue) ?? "" }
        set { defaults.set(newValue, forKey: Key.userName.rawValue) }
    }

    var isLoggedIn: Bool {
        get { defaults.bool(forKey: Key.isLoggedIn.rawValue) }
        set { defaults.set(newValue, forKey: Key.isLoggedIn.rawValue) }
    }

    var highScore: Int {
        get { defaults.integer(forKey: Key.highScore.rawValue) }
        set { defaults.set(newValue, forKey: Key.highScore.rawValue) }
    }

    func reset() {
        Key.allCases.forEach { defaults.removeObject(forKey: \$0.rawValue) }
    }
}

// 방법 3: @AppStorage (SwiftUI — 가장 간결)
import SwiftUI

struct SettingsView: View {
    @AppStorage("userName") private var userName = ""
    @AppStorage("isDarkMode") private var isDarkMode = false
    @AppStorage("highScore") private var highScore = 0

    var body: some View {
        VStack {
            TextField("이름", text: \$userName)
            Toggle("다크 모드", isOn: \$isDarkMode)
            Text("최고 점수: \\(highScore)")
        }
        // 값 변경 시 자동으로 UserDefaults에 저장되고 UI 갱신
    }
}

// 방법 4: @propertyWrapper (재사용 가능한 커스텀 래퍼)
@propertyWrapper
struct UserDefault<T> {
    let key: String
    let defaultValue: T

    var wrappedValue: T {
        get { UserDefaults.standard.object(forKey: key) as? T ?? defaultValue }
        set { UserDefaults.standard.set(newValue, forKey: key) }
    }
}

class Settings {
    @UserDefault(key: "locale", defaultValue: "ko")
    var locale: String

    @UserDefault(key: "fontSize", defaultValue: 16.0)
    var fontSize: Double
}`,
    },
  },

  persistence_filemanager: {
    caption: 'FileManager vs Java File API vs Node.js fs',
    android: {
      language: 'kotlin',
      code: `// Android — File API + Context 디렉토리
import android.content.Context
import java.io.File
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class FileStorageManager(private val context: Context) {

    // 앱 내부 저장소 (다른 앱 접근 불가)
    private val internalDir: File = context.filesDir
    // 캐시 디렉토리 (시스템이 용량 부족 시 삭제 가능)
    private val cacheDir: File = context.cacheDir

    // 텍스트 파일 쓰기
    suspend fun writeText(filename: String, content: String) =
        withContext(Dispatchers.IO) {
            File(internalDir, filename).writeText(content, Charsets.UTF_8)
        }

    // 텍스트 파일 읽기
    suspend fun readText(filename: String): String =
        withContext(Dispatchers.IO) {
            val file = File(internalDir, filename)
            if (file.exists()) file.readText(Charsets.UTF_8) else ""
        }

    // JSON 객체 저장
    suspend fun saveJson(filename: String, data: Any) =
        withContext(Dispatchers.IO) {
            val json = Gson().toJson(data)
            File(internalDir, filename).writeText(json)
        }

    // 디렉토리 생성 및 파일 목록
    fun listFiles(subDir: String = ""): List<String> {
        val dir = if (subDir.isEmpty()) internalDir else File(internalDir, subDir)
        return dir.listFiles()?.map { it.name } ?: emptyList()
    }

    // 파일 삭제
    suspend fun deleteFile(filename: String): Boolean =
        withContext(Dispatchers.IO) {
            File(internalDir, filename).delete()
        }
}`,
    },
    web: {
      language: 'typescript',
      code: `// Node.js — fs/promises (서버사이드)
import { promises as fs } from 'fs'
import path from 'path'

class FileStorageService {
    private readonly basePath: string

    constructor(basePath: string) {
        this.basePath = basePath
    }

    async writeText(filename: string, content: string): Promise<void> {
        const filePath = path.join(this.basePath, filename)
        await fs.mkdir(path.dirname(filePath), { recursive: true })
        await fs.writeFile(filePath, content, 'utf-8')
    }

    async readText(filename: string): Promise<string> {
        const filePath = path.join(this.basePath, filename)
        try {
            return await fs.readFile(filePath, 'utf-8')
        } catch {
            return ''
        }
    }

    async saveJson<T>(filename: string, data: T): Promise<void> {
        await this.writeText(filename, JSON.stringify(data, null, 2))
    }

    async listFiles(subDir = ''): Promise<string[]> {
        const dirPath = path.join(this.basePath, subDir)
        try {
            return await fs.readdir(dirPath)
        } catch {
            return []
        }
    }

    async deleteFile(filename: string): Promise<boolean> {
        try {
            await fs.unlink(path.join(this.basePath, filename))
            return true
        } catch {
            return false
        }
    }
}

// 브라우저 — File System Access API (최신)
async function saveFileToDevice(content: string): Promise<void> {
    const handle = await window.showSaveFilePicker({
        suggestedName: 'export.json',
        types: [{ description: 'JSON', accept: { 'application/json': ['.json'] } }],
    })
    const writable = await handle.createWritable()
    await writable.write(content)
    await writable.close()
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS — FileManager
import Foundation

final class FileStorageManager {
    static let shared = FileStorageManager()

    // 앱 샌드박스의 주요 디렉토리
    // Documents: 사용자 데이터, iTunes/iCloud 백업 대상
    // Library/Caches: 재생성 가능한 캐시, 백업 제외, OS가 필요 시 삭제
    // tmp: 임시 파일, 앱 재시작 시 삭제 가능

    var documentsURL: URL {
        FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
    }

    var cachesURL: URL {
        FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask)[0]
    }

    // 텍스트 파일 쓰기
    func writeText(_ content: String, to filename: String) throws {
        let url = documentsURL.appendingPathComponent(filename)
        try content.write(to: url, atomically: true, encoding: .utf8)
        // atomically: true → 임시 파일에 먼저 쓴 후 교체 (데이터 손상 방지)
    }

    // 텍스트 파일 읽기
    func readText(from filename: String) throws -> String {
        let url = documentsURL.appendingPathComponent(filename)
        return try String(contentsOf: url, encoding: .utf8)
    }

    // Codable 객체 JSON으로 저장
    func saveJSON<T: Encodable>(_ value: T, to filename: String) throws {
        let data = try JSONEncoder().encode(value)
        let url = documentsURL.appendingPathComponent(filename)
        try data.write(to: url, options: .atomicWrite)
    }

    // Codable 객체 JSON에서 로드
    func loadJSON<T: Decodable>(_ type: T.Type, from filename: String) throws -> T {
        let url = documentsURL.appendingPathComponent(filename)
        let data = try Data(contentsOf: url)
        return try JSONDecoder().decode(type, from: data)
    }

    // 서브디렉토리 생성
    func createDirectory(named name: String) throws {
        let url = documentsURL.appendingPathComponent(name, isDirectory: true)
        try FileManager.default.createDirectory(
            at: url,
            withIntermediateDirectories: true,
            attributes: nil
        )
    }

    // 파일 목록
    func listFiles(in subDir: String = "") throws -> [String] {
        let url = subDir.isEmpty
            ? documentsURL
            : documentsURL.appendingPathComponent(subDir)
        return try FileManager.default.contentsOfDirectory(atPath: url.path)
    }

    // 파일 존재 확인
    func fileExists(_ filename: String) -> Bool {
        let url = documentsURL.appendingPathComponent(filename)
        return FileManager.default.fileExists(atPath: url.path)
    }

    // 파일 삭제
    func deleteFile(_ filename: String) throws {
        let url = documentsURL.appendingPathComponent(filename)
        try FileManager.default.removeItem(at: url)
    }

    // 파일 크기 조회 (메타데이터)
    func fileSize(_ filename: String) -> Int64? {
        let url = documentsURL.appendingPathComponent(filename)
        let attrs = try? FileManager.default.attributesOfItem(atPath: url.path)
        return attrs?[.size] as? Int64
    }
}

// 비동기 파일 I/O (Swift Concurrency)
extension FileStorageManager {
    func writeTextAsync(_ content: String, to filename: String) async throws {
        try await Task.detached(priority: .utility) {
            try self.writeText(content, to: filename)
        }.value
    }
}`,
    },
  },

  persistence_keychain: {
    caption: 'Keychain vs Android Keystore vs Web Crypto API',
    android: {
      language: 'kotlin',
      code: `// Android — EncryptedSharedPreferences + Keystore
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey
import android.content.Context

class SecureStorageManager(context: Context) {
    // MasterKey는 Android Keystore에 저장된 AES-256-GCM 키
    private val masterKey = MasterKey.Builder(context)
        .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
        .build()

    private val securePrefs = EncryptedSharedPreferences.create(
        context,
        "secure_prefs",          // 파일명 (암호화됨)
        masterKey,
        EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
        EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
    )

    fun saveToken(token: String) {
        securePrefs.edit().putString("auth_token", token).apply()
    }

    fun getToken(): String? = securePrefs.getString("auth_token", null)

    fun saveCredentials(username: String, password: String) {
        securePrefs.edit()
            .putString("username", username)
            .putString("password", password)
            .apply()
    }

    fun clearAll() {
        securePrefs.edit().clear().apply()
    }
}

// Biometric + Keystore (생체 인증 연동)
import androidx.biometric.BiometricPrompt
import javax.crypto.Cipher

class BiometricKeyManager {
    fun encryptWithBiometric(
        data: ByteArray,
        fragment: Fragment,
        onSuccess: (ByteArray) -> Unit
    ) {
        val keyPair = generateKeyPair() // Keystore에서 키 생성
        val cipher = Cipher.getInstance("RSA/ECB/OAEPPadding")
        cipher.init(Cipher.ENCRYPT_MODE, keyPair.public)

        val prompt = BiometricPrompt(fragment, executor,
            object : BiometricPrompt.AuthenticationCallback() {
                override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                    val encrypted = result.cryptoObject?.cipher?.doFinal(data)
                    encrypted?.let { onSuccess(it) }
                }
            })

        prompt.authenticate(
            BiometricPrompt.PromptInfo.Builder()
                .setTitle("생체 인증")
                .setNegativeButtonText("취소")
                .build(),
            BiometricPrompt.CryptoObject(cipher)
        )
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// Web — Web Crypto API + 쿠키 (HttpOnly)
// 브라우저에서 완전한 시크릿 저장은 불가능 — HttpOnly 쿠키가 최선

// 서버 측: HttpOnly 쿠키로 토큰 설정
// Set-Cookie: auth_token=xxx; HttpOnly; Secure; SameSite=Strict; Path=/

// 클라이언트에서 토큰 직접 접근 불가 (XSS 방어)
// document.cookie → auth_token 값 없음

// Web Crypto API — 클라이언트 측 암호화 (e2ee 시나리오)
class WebCryptoService {
    private key: CryptoKey | null = null

    async generateKey(): Promise<void> {
        this.key = await crypto.subtle.generateKey(
            { name: 'AES-GCM', length: 256 },
            false,              // extractable: false = 키 추출 불가
            ['encrypt', 'decrypt']
        )
    }

    async encrypt(plaintext: string): Promise<{ iv: string; data: string }> {
        if (!this.key) throw new Error('키 없음')
        const iv = crypto.getRandomValues(new Uint8Array(12))
        const encoded = new TextEncoder().encode(plaintext)
        const encrypted = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            this.key,
            encoded
        )
        return {
            iv: btoa(String.fromCharCode(...iv)),
            data: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
        }
    }

    async decrypt(iv: string, data: string): Promise<string> {
        if (!this.key) throw new Error('키 없음')
        const ivBytes = Uint8Array.from(atob(iv), c => c.charCodeAt(0))
        const dataBytes = Uint8Array.from(atob(data), c => c.charCodeAt(0))
        const decrypted = await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv: ivBytes },
            this.key,
            dataBytes
        )
        return new TextDecoder().decode(decrypted)
    }
}

// IndexedDB를 이용한 credential 저장 (암호화 후)
async function saveEncryptedCredential(key: string, value: string): Promise<void> {
    const service = new WebCryptoService()
    await service.generateKey()
    const encrypted = await service.encrypt(value)
    // IndexedDB에 { iv, data } 저장
    await idb.put('credentials', encrypted, key)
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS — Keychain Services
import Foundation
import Security

// Keychain은 암호화된 시스템 데이터베이스
// 앱 삭제 후에도 데이터 유지 (SharedPreferences와의 결정적 차이)
// 동일 팀 ID의 앱 간 공유 가능 (Keychain Sharing Entitlement)

enum KeychainError: LocalizedError {
    case unhandledError(status: OSStatus)
    case itemNotFound
    case unexpectedData

    var errorDescription: String? {
        switch self {
        case .unhandledError(let status): return "Keychain 오류: \\(status)"
        case .itemNotFound: return "항목을 찾을 수 없음"
        case .unexpectedData: return "예상치 못한 데이터 형식"
        }
    }
}

final class KeychainManager {
    static let shared = KeychainManager()
    private let service = Bundle.main.bundleIdentifier ?? "com.myapp"

    // 저장 (없으면 추가, 있으면 업데이트)
    func save(_ value: String, for account: String) throws {
        guard let data = value.data(using: .utf8) else { return }

        // 기존 항목 삭제 후 재삽입 (update보다 안정적)
        try? delete(account: account)

        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: account,
            kSecValueData as String: data,
            // 기기 잠금 시에만 접근 가능 (가장 엄격)
            kSecAttrAccessible as String: kSecAttrAccessibleWhenUnlockedThisDeviceOnly,
        ]

        let status = SecItemAdd(query as CFDictionary, nil)
        guard status == errSecSuccess else {
            throw KeychainError.unhandledError(status: status)
        }
    }

    // 읽기
    func retrieve(account: String) throws -> String {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: account,
            kSecReturnData as String: true,
            kSecMatchLimit as String: kSecMatchLimitOne,
        ]

        var item: CFTypeRef?
        let status = SecItemCopyMatching(query as CFDictionary, &item)

        guard status != errSecItemNotFound else { throw KeychainError.itemNotFound }
        guard status == errSecSuccess else { throw KeychainError.unhandledError(status: status) }
        guard let data = item as? Data,
              let value = String(data: data, encoding: .utf8) else {
            throw KeychainError.unexpectedData
        }
        return value
    }

    // 삭제
    func delete(account: String) throws {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: account,
        ]
        let status = SecItemDelete(query as CFDictionary)
        guard status == errSecSuccess || status == errSecItemNotFound else {
            throw KeychainError.unhandledError(status: status)
        }
    }
}

// 사용 예
func saveAuthToken(_ token: String) {
    do {
        try KeychainManager.shared.save(token, for: "auth_token")
    } catch {
        print("Keychain 저장 실패:", error.localizedDescription)
    }
}

func getAuthToken() -> String? {
    try? KeychainManager.shared.retrieve(account: "auth_token")
}

// 생체 인증 연동 (LocalAuthentication + Keychain)
import LocalAuthentication

func saveWithBiometricProtection(_ secret: String, account: String) throws {
    guard let data = secret.data(using: .utf8) else { return }

    let context = LAContext()
    let access = SecAccessControlCreateWithFlags(
        nil,
        kSecAttrAccessibleWhenPasscodeSetThisDeviceOnly,
        .biometryCurrentSet,    // 현재 등록된 생체 정보만 허용
        nil
    )!

    let query: [String: Any] = [
        kSecClass as String: kSecClassGenericPassword,
        kSecAttrService as String: service,
        kSecAttrAccount as String: account,
        kSecValueData as String: data,
        kSecAttrAccessControl as String: access,
        kSecUseAuthenticationContext as String: context,
    ]

    SecItemDelete(query as CFDictionary) // 기존 삭제
    let status = SecItemAdd(query as CFDictionary, nil)
    guard status == errSecSuccess else {
        throw KeychainError.unhandledError(status: status)
    }
}`,
    },
  },

  persistence_coredata_setup: {
    caption: 'Core Data 스택 설정 vs Room Database vs IndexedDB',
    android: {
      language: 'kotlin',
      code: `// Android — Room Database 설정
import androidx.room.*
import android.content.Context

// 1. Entity 정의
@Entity(tableName = "users")
data class UserEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    @ColumnInfo(name = "full_name") val fullName: String,
    val email: String,
    @ColumnInfo(name = "created_at") val createdAt: Long = System.currentTimeMillis()
)

// 2. DAO 정의
@Dao
interface UserDao {
    @Query("SELECT * FROM users ORDER BY created_at DESC")
    fun getAllUsers(): Flow<List<UserEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertUser(user: UserEntity): Long

    @Update
    suspend fun updateUser(user: UserEntity)

    @Delete
    suspend fun deleteUser(user: UserEntity)
}

// 3. Database 클래스
@Database(
    entities = [UserEntity::class],
    version = 1,
    exportSchema = true             // 스키마 변경 추적
)
abstract class AppDatabase : RoomDatabase() {
    abstract fun userDao(): UserDao

    companion object {
        @Volatile private var INSTANCE: AppDatabase? = null

        fun getInstance(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "app_database"
                )
                .addMigrations(MIGRATION_1_2)   // 스키마 마이그레이션
                .build()
                .also { INSTANCE = it }
            }
        }
    }
}

// Hilt DI 연동
@Module
@InstallIn(SingletonComponent::class)
object DatabaseModule {
    @Provides
    @Singleton
    fun provideDatabase(@ApplicationContext context: Context): AppDatabase =
        AppDatabase.getInstance(context)

    @Provides
    fun provideUserDao(db: AppDatabase): UserDao = db.userDao()
}`,
    },
    web: {
      language: 'typescript',
      code: `// Web — IndexedDB (idb 라이브러리 사용)
import { openDB, DBSchema, IDBPDatabase } from 'idb'

// 스키마 타입 정의
interface AppDB extends DBSchema {
    users: {
        key: number
        value: {
            id?: number
            fullName: string
            email: string
            createdAt: number
        }
        indexes: { 'by-email': string }
    }
    posts: {
        key: number
        value: {
            id?: number
            userId: number
            title: string
            content: string
        }
        indexes: { 'by-userId': number }
    }
}

// DB 초기화 (싱글톤)
let dbInstance: IDBPDatabase<AppDB> | null = null

async function getDB(): Promise<IDBPDatabase<AppDB>> {
    if (dbInstance) return dbInstance

    dbInstance = await openDB<AppDB>('app-database', 2, {
        upgrade(db, oldVersion, newVersion) {
            // 버전별 마이그레이션
            if (oldVersion < 1) {
                const userStore = db.createObjectStore('users', {
                    keyPath: 'id',
                    autoIncrement: true,
                })
                userStore.createIndex('by-email', 'email', { unique: true })
            }
            if (oldVersion < 2) {
                const postStore = db.createObjectStore('posts', {
                    keyPath: 'id',
                    autoIncrement: true,
                })
                postStore.createIndex('by-userId', 'userId')
            }
        },
        blocked() { console.warn('DB 업그레이드 차단됨') },
        blocking() { dbInstance?.close() },
    })

    return dbInstance
}

// Repository 패턴
class UserRepository {
    async findAll() {
        const db = await getDB()
        return db.getAll('users')
    }

    async findByEmail(email: string) {
        const db = await getDB()
        return db.getFromIndex('users', 'by-email', email)
    }

    async create(user: Omit<AppDB['users']['value'], 'id'>) {
        const db = await getDB()
        return db.add('users', user)
    }
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS — Core Data 스택 설정
import CoreData

// NSPersistentContainer: Core Data 스택을 감싸는 컨테이너 (iOS 10+)
// Core Data 스택 = NSManagedObjectModel + NSPersistentStoreCoordinator + NSManagedObjectContext

final class PersistenceController {
    static let shared = PersistenceController()

    // 미리보기/테스트용 인메모리 스택
    static var preview: PersistenceController = {
        let controller = PersistenceController(inMemory: true)
        // 테스트 데이터 삽입
        let context = controller.container.viewContext
        for i in 0..<5 {
            let user = UserEntity(context: context)
            user.id = UUID()
            user.fullName = "테스트 유저 \\(i)"
            user.email = "user\\(i)@example.com"
            user.createdAt = Date()
        }
        try? context.save()
        return controller
    }()

    let container: NSPersistentContainer

    init(inMemory: Bool = false) {
        // "AppModel"은 .xcdatamodeld 파일명과 일치해야 함
        container = NSPersistentContainer(name: "AppModel")

        if inMemory {
            // 메모리 내 저장소 (테스트/프리뷰용)
            container.persistentStoreDescriptions.first?.url =
                URL(fileURLWithPath: "/dev/null")
        }

        // 자동 마이그레이션 설정 (경량 마이그레이션)
        let description = container.persistentStoreDescriptions.first
        description?.shouldMigrateStoreAutomatically = true
        description?.shouldInferMappingModelAutomatically = true

        container.loadPersistentStores { description, error in
            if let error {
                // 실제 앱에서는 복구 로직 필요
                fatalError("Core Data 로드 실패: \\(error.localizedDescription)")
            }
        }

        // 외부 변경 사항 자동 병합 (iCloud 동기화 시 필수)
        container.viewContext.automaticallyMergesChangesFromParent = true
        // 충돌 시 메모리 우선 vs 저장소 우선 정책
        container.viewContext.mergePolicy = NSMergeByPropertyObjectTrumpMergePolicy
    }

    // 백그라운드 컨텍스트 (무거운 작업용)
    func newBackgroundContext() -> NSManagedObjectContext {
        container.newBackgroundContext()
    }

    // 저장 헬퍼
    func save(context: NSManagedObjectContext? = nil) {
        let ctx = context ?? container.viewContext
        guard ctx.hasChanges else { return }
        do {
            try ctx.save()
        } catch {
            print("Core Data 저장 오류:", error.localizedDescription)
            ctx.rollback()
        }
    }

    // 백그라운드 작업 (대량 삽입 등)
    func performBackgroundTask(_ block: @escaping (NSManagedObjectContext) -> Void) {
        container.performBackgroundTask(block)
    }
}

// SwiftUI 앱 진입점에서 environment로 주입
@main
struct MyApp: App {
    let persistence = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\\.managedObjectContext,
                             persistence.container.viewContext)
        }
    }
}`,
    },
  },

  persistence_coredata_crud: {
    caption: 'Core Data CRUD vs Room DAO vs IndexedDB 트랜잭션',
    android: {
      language: 'kotlin',
      code: `// Android — Room DAO CRUD
@Dao
interface ProductDao {
    // Create
    @Insert(onConflict = OnConflictStrategy.ABORT)
    suspend fun insert(product: ProductEntity): Long

    // Read — 단건
    @Query("SELECT * FROM products WHERE id = :id")
    suspend fun findById(id: Long): ProductEntity?

    // Read — 전체 (Flow로 실시간 관찰)
    @Query("SELECT * FROM products ORDER BY name ASC")
    fun observeAll(): Flow<List<ProductEntity>>

    // Read — 조건 검색
    @Query("""
        SELECT * FROM products
        WHERE category = :category AND price BETWEEN :minPrice AND :maxPrice
        ORDER BY price ASC
        LIMIT :limit OFFSET :offset
    """)
    suspend fun findByCategory(
        category: String,
        minPrice: Double,
        maxPrice: Double,
        limit: Int = 20,
        offset: Int = 0
    ): List<ProductEntity>

    // Update
    @Update
    suspend fun update(product: ProductEntity): Int

    // 부분 업데이트 (특정 필드만)
    @Query("UPDATE products SET price = :price WHERE id = :id")
    suspend fun updatePrice(id: Long, price: Double)

    // Delete
    @Delete
    suspend fun delete(product: ProductEntity)

    @Query("DELETE FROM products WHERE category = :category")
    suspend fun deleteByCategory(category: String): Int

    // 집계
    @Query("SELECT COUNT(*) FROM products WHERE category = :category")
    fun countByCategory(category: String): Flow<Int>

    @Query("SELECT AVG(price) FROM products")
    suspend fun averagePrice(): Double?
}

// Repository에서 사용
class ProductRepository(private val dao: ProductDao) {
    suspend fun createProduct(name: String, price: Double, category: String): Long {
        val entity = ProductEntity(
            name = name,
            price = price,
            category = category,
            createdAt = System.currentTimeMillis()
        )
        return dao.insert(entity)
    }

    fun observeProducts() = dao.observeAll()
}`,
    },
    web: {
      language: 'typescript',
      code: `// Web — IndexedDB CRUD (idb 라이브러리)
class ProductRepository {
    async create(product: Omit<Product, 'id' | 'createdAt'>): Promise<number> {
        const db = await getDB()
        return db.add('products', {
            ...product,
            createdAt: Date.now(),
        })
    }

    async findById(id: number): Promise<Product | undefined> {
        const db = await getDB()
        return db.get('products', id)
    }

    async findAll(): Promise<Product[]> {
        const db = await getDB()
        return db.getAll('products')
    }

    async findByCategory(category: string): Promise<Product[]> {
        const db = await getDB()
        return db.getAllFromIndex('products', 'by-category', category)
    }

    async update(id: number, changes: Partial<Product>): Promise<void> {
        const db = await getDB()
        const tx = db.transaction('products', 'readwrite')
        const existing = await tx.store.get(id)
        if (!existing) throw new Error(\`상품 \${id} 없음\`)
        await tx.store.put({ ...existing, ...changes, id })
        await tx.done
    }

    async delete(id: number): Promise<void> {
        const db = await getDB()
        await db.delete('products', id)
    }

    // 트랜잭션으로 여러 작업 묶기
    async batchCreate(products: Omit<Product, 'id' | 'createdAt'>[]): Promise<void> {
        const db = await getDB()
        const tx = db.transaction('products', 'readwrite')
        await Promise.all([
            ...products.map(p => tx.store.add({ ...p, createdAt: Date.now() })),
            tx.done,
        ])
    }

    // 커서로 대량 데이터 처리
    async processAll(handler: (product: Product) => void): Promise<void> {
        const db = await getDB()
        let cursor = await db.transaction('products').store.openCursor()
        while (cursor) {
            handler(cursor.value)
            cursor = await cursor.continue()
        }
    }
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS — Core Data CRUD
import CoreData

// NSManagedObject 서브클래스 (Xcode에서 자동 생성 또는 수동 작성)
// .xcdatamodeld에서 Codegen을 "Category/Extension"으로 설정하면
// 아래처럼 커스텀 로직을 추가할 수 있음

@objc(ProductEntity)
public class ProductEntity: NSManagedObject {
    @NSManaged public var id: UUID
    @NSManaged public var name: String
    @NSManaged public var price: Double
    @NSManaged public var category: String
    @NSManaged public var createdAt: Date

    // 팩토리 메서드 패턴 (NSManagedObjectContext 주입)
    @discardableResult
    static func create(
        name: String,
        price: Double,
        category: String,
        in context: NSManagedObjectContext
    ) -> ProductEntity {
        let product = ProductEntity(context: context)
        product.id = UUID()
        product.name = name
        product.price = price
        product.category = category
        product.createdAt = Date()
        return product
    }
}

// Repository
final class ProductRepository {
    private let context: NSManagedObjectContext

    init(context: NSManagedObjectContext) {
        self.context = context
    }

    // Create
    func create(name: String, price: Double, category: String) throws -> ProductEntity {
        let product = ProductEntity.create(
            name: name, price: price, category: category, in: context
        )
        try context.save()
        return product
    }

    // Read — 단건 (NSFetchRequest)
    func findById(_ id: UUID) throws -> ProductEntity? {
        let request = ProductEntity.fetchRequest()
        request.predicate = NSPredicate(format: "id == %@", id as CVarArg)
        request.fetchLimit = 1
        return try context.fetch(request).first
    }

    // Read — 조건 검색 + 정렬 + 페이지네이션
    func findByCategory(
        _ category: String,
        minPrice: Double = 0,
        maxPrice: Double = .infinity,
        sortBy: String = "name",
        ascending: Bool = true,
        limit: Int = 20,
        offset: Int = 0
    ) throws -> [ProductEntity] {
        let request = ProductEntity.fetchRequest()
        request.predicate = NSCompoundPredicate(andPredicateWithSubpredicates: [
            NSPredicate(format: "category == %@", category),
            NSPredicate(format: "price >= %f AND price <= %f", minPrice, maxPrice),
        ])
        request.sortDescriptors = [NSSortDescriptor(key: sortBy, ascending: ascending)]
        request.fetchLimit = limit
        request.fetchOffset = offset
        return try context.fetch(request) as! [ProductEntity]
    }

    // Update — 가져온 후 수정 (변경 감지는 Core Data가 자동 처리)
    func updatePrice(for id: UUID, newPrice: Double) throws {
        guard let product = try findById(id) else { return }
        product.price = newPrice  // NSManagedObject는 변경 자동 감지
        try context.save()
    }

    // Delete
    func delete(_ product: ProductEntity) throws {
        context.delete(product)
        try context.save()
    }

    // 대량 삭제 (NSBatchDeleteRequest — context 우회, 매우 빠름)
    func deleteAll(in category: String) throws {
        let request = NSFetchRequest<NSFetchRequestResult>(entityName: "ProductEntity")
        request.predicate = NSPredicate(format: "category == %@", category)
        let batchDelete = NSBatchDeleteRequest(fetchRequest: request)
        batchDelete.resultType = .resultTypeObjectIDs

        let result = try context.execute(batchDelete) as? NSBatchDeleteResult
        let ids = result?.result as? [NSManagedObjectID] ?? []
        // context 갱신 (batch 작업은 context를 직접 업데이트하지 않으므로)
        NSManagedObjectContext.mergeChanges(
            fromRemoteContextSave: [NSDeletedObjectsKey: ids],
            into: [context]
        )
    }

    // 집계 (NSExpression)
    func averagePrice() throws -> Double {
        let request = NSFetchRequest<NSDictionary>(entityName: "ProductEntity")
        request.resultType = .dictionaryResultType
        let expression = NSExpression(forFunction: "average:",
                                      arguments: [NSExpression(forKeyPath: "price")])
        let expressionDescription = NSExpressionDescription()
        expressionDescription.name = "averagePrice"
        expressionDescription.expression = expression
        expressionDescription.expressionResultType = .doubleAttributeType
        request.propertiesToFetch = [expressionDescription]
        let results = try context.fetch(request)
        return results.first?["averagePrice"] as? Double ?? 0
    }
}`,
    },
  },

  persistence_coredata_relationship: {
    caption: 'Core Data Relationship vs Room @Relation vs IndexedDB 조인',
    android: {
      language: 'kotlin',
      code: `// Android — Room @Relation
@Entity(tableName = "categories")
data class CategoryEntity(
    @PrimaryKey val id: Long,
    val name: String
)

@Entity(
    tableName = "products",
    foreignKeys = [ForeignKey(
        entity = CategoryEntity::class,
        parentColumns = ["id"],
        childColumns = ["category_id"],
        onDelete = ForeignKey.CASCADE  // 부모 삭제 시 자식도 삭제
    )],
    indices = [Index("category_id")]
)
data class ProductEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val name: String,
    val price: Double,
    @ColumnInfo(name = "category_id") val categoryId: Long
)

// 연관 데이터를 가져오는 POJO
data class CategoryWithProducts(
    @Embedded val category: CategoryEntity,
    @Relation(
        parentColumn = "id",
        entityColumn = "category_id"
    )
    val products: List<ProductEntity>
)

// 다대다 관계 중간 테이블
@Entity(
    tableName = "product_tag_cross_ref",
    primaryKeys = ["product_id", "tag_id"]
)
data class ProductTagCrossRef(
    @ColumnInfo(name = "product_id") val productId: Long,
    @ColumnInfo(name = "tag_id") val tagId: Long
)

@Dao
interface CategoryDao {
    @Transaction
    @Query("SELECT * FROM categories WHERE id = :categoryId")
    fun getCategoryWithProducts(categoryId: Long): Flow<CategoryWithProducts?>
}`,
    },
    web: {
      language: 'typescript',
      code: `// Web — IndexedDB 수동 조인 (외래 키 없음, 애플리케이션 레벨 조인)
interface Category {
    id: number
    name: string
}

interface Product {
    id: number
    name: string
    price: number
    categoryId: number    // 외래 키 (IndexedDB는 강제하지 않음)
}

interface CategoryWithProducts extends Category {
    products: Product[]
}

class RelationRepository {
    // 1:N 조인 (수동)
    async getCategoryWithProducts(categoryId: number): Promise<CategoryWithProducts | null> {
        const db = await getDB()
        const [category, products] = await Promise.all([
            db.get('categories', categoryId),
            db.getAllFromIndex('products', 'by-categoryId', categoryId),
        ])
        if (!category) return null
        return { ...category, products }
    }

    // 모든 카테고리와 상품 수
    async getCategoriesWithCount(): Promise<Array<Category & { count: number }>> {
        const db = await getDB()
        const categories = await db.getAll('categories')
        const counts = await Promise.all(
            categories.map(async cat => {
                const products = await db.getAllFromIndex(
                    'products', 'by-categoryId', cat.id
                )
                return { ...cat, count: products.length }
            })
        )
        return counts
    }

    // N:M 관계 — 중간 테이블 수동 관리
    async getProductTags(productId: number): Promise<Tag[]> {
        const db = await getDB()
        const refs = await db.getAllFromIndex(
            'product_tags', 'by-productId', productId
        )
        return Promise.all(refs.map(ref => db.get('tags', ref.tagId)))
            .then(tags => tags.filter((t): t is Tag => t !== undefined))
    }
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS — Core Data Relationship
// .xcdatamodeld 에서 관계 설정:
//   Category ──(1:N)── Product
//   Product ──(N:M)── Tag (중간 엔티티 자동 관리)

// NSManagedObject 서브클래스
@objc(CategoryEntity)
public class CategoryEntity: NSManagedObject {
    @NSManaged public var id: UUID
    @NSManaged public var name: String
    // Core Data가 자동으로 NSSet으로 관리
    @NSManaged public var products: NSSet

    // 타입 안전한 접근자 (extension에 추가)
    var productArray: [ProductEntity] {
        (products.allObjects as? [ProductEntity] ?? [])
            .sorted { \$0.name < \$1.name }
    }
}

@objc(ProductEntity)
public class ProductEntity: NSManagedObject {
    @NSManaged public var id: UUID
    @NSManaged public var name: String
    @NSManaged public var price: Double
    // 역방향 관계 (inverse relationship — 반드시 설정)
    @NSManaged public var category: CategoryEntity?
    @NSManaged public var tags: NSSet

    var tagArray: [TagEntity] {
        tags.allObjects as? [TagEntity] ?? []
    }
}

// 관계 설정 예
final class RelationshipDemo {
    let context: NSManagedObjectContext

    init(context: NSManagedObjectContext) {
        self.context = context
    }

    func createCategoryWithProducts() throws {
        let category = CategoryEntity(context: context)
        category.id = UUID()
        category.name = "전자기기"

        let product1 = ProductEntity(context: context)
        product1.id = UUID()
        product1.name = "맥북 프로"
        product1.price = 2_490_000
        product1.category = category    // 관계 설정 (역방향 자동 처리)

        let product2 = ProductEntity(context: context)
        product2.id = UUID()
        product2.name = "아이폰"
        product2.price = 1_250_000
        product2.category = category

        try context.save()
        // category.products는 자동으로 {product1, product2} 포함
    }

    // 관계를 활용한 FetchRequest
    func fetchElectronicsExpensiveThan(_ price: Double) throws -> [ProductEntity] {
        let request = ProductEntity.fetchRequest()
        // 관계를 통한 조건 (keyPath 점 표기법)
        request.predicate = NSPredicate(
            format: "category.name == %@ AND price > %f",
            "전자기기", price
        )
        request.sortDescriptors = [NSSortDescriptor(key: "price", ascending: false)]
        return try context.fetch(request) as! [ProductEntity]
    }

    // N:M 관계 — tags 추가/제거
    func addTag(_ tag: TagEntity, to product: ProductEntity) throws {
        product.addToTags(tag)  // Core Data 자동 생성 메서드
        try context.save()
    }

    func removeTag(_ tag: TagEntity, from product: ProductEntity) throws {
        product.removeFromTags(tag)
        try context.save()
    }

    // 서브쿼리 (특정 태그가 붙은 상품)
    func fetchProducts(withTagName tagName: String) throws -> [ProductEntity] {
        let request = ProductEntity.fetchRequest()
        request.predicate = NSPredicate(
            format: "ANY tags.name == %@", tagName
        )
        return try context.fetch(request) as! [ProductEntity]
    }
}

// SwiftUI에서 @FetchRequest로 관계 탐색
struct ProductListView: View {
    let category: CategoryEntity

    // 특정 카테고리의 상품만 실시간 구독
    @FetchRequest private var products: FetchedResults<ProductEntity>

    init(category: CategoryEntity) {
        self.category = category
        _products = FetchRequest(
            sortDescriptors: [SortDescriptor(\\.name)],
            predicate: NSPredicate(format: "category == %@", category)
        )
    }

    var body: some View {
        List(products) { product in
            Text("\\(product.name) — ₩\\(Int(product.price))")
        }
    }
}`,
    },
  },

  persistence_swiftdata_model: {
    caption: 'SwiftData @Model vs Room @Entity vs TypeScript 클래스',
    android: {
      language: 'kotlin',
      code: `// Android — Room @Entity + @TypeConverters
import androidx.room.*
import java.util.Date

// TypeConverter: Room이 지원하지 않는 타입 변환
class Converters {
    @TypeConverter
    fun fromDate(date: Date?): Long? = date?.time

    @TypeConverter
    fun toDate(timestamp: Long?): Date? = timestamp?.let { Date(it) }

    @TypeConverter
    fun fromStringList(list: List<String>?): String? =
        list?.joinToString(",")

    @TypeConverter
    fun toStringList(value: String?): List<String>? =
        value?.split(",")?.filter { it.isNotEmpty() }
}

@Entity(
    tableName = "articles",
    indices = [
        Index("author_id"),
        Index(value = ["slug"], unique = true)
    ]
)
@TypeConverters(Converters::class)
data class ArticleEntity(
    @PrimaryKey val id: String = UUID.randomUUID().toString(),

    @ColumnInfo(name = "author_id")
    val authorId: String,

    val title: String,
    val slug: String,
    val content: String,

    val tags: List<String> = emptyList(),  // TypeConverter 사용

    @ColumnInfo(name = "published_at")
    val publishedAt: Date? = null,

    @ColumnInfo(name = "view_count")
    val viewCount: Int = 0,

    @ColumnInfo(name = "is_draft")
    val isDraft: Boolean = true,

    @ColumnInfo(name = "created_at")
    val createdAt: Date = Date(),
)

// 임베디드 객체 (별도 테이블 없이 컬럼으로 펼침)
@Embedded
data class Address(
    val street: String,
    val city: String,
    val country: String
)

@Entity(tableName = "users")
data class UserWithAddress(
    @PrimaryKey val id: String,
    val name: String,
    @Embedded val address: Address
)`,
    },
    web: {
      language: 'typescript',
      code: `// TypeScript — 도메인 모델 클래스 (ORM 예: Prisma, TypeORM)

// Prisma 스키마 (prisma/schema.prisma)
/*
model Article {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  content     String   @db.Text
  tags        String[] // PostgreSQL array
  publishedAt DateTime?
  viewCount   Int      @default(0)
  isDraft     Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  authorId    String
  author      User     @relation(fields: [authorId], references: [id])
}
*/

// TypeORM 엔티티
import {
    Entity, PrimaryGeneratedColumn, Column,
    ManyToOne, CreateDateColumn, UpdateDateColumn, Index
} from 'typeorm'

@Entity('articles')
export class Article {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    slug: string

    @Column()
    title: string

    @Column({ type: 'text' })
    content: string

    @Column({ type: 'simple-array', default: '' })
    tags: string[]

    @Column({ nullable: true })
    publishedAt?: Date

    @Column({ default: 0 })
    viewCount: number

    @Column({ default: true })
    isDraft: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Index()
    @Column()
    authorId: string

    @ManyToOne(() => User, user => user.articles)
    author: User
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS — SwiftData @Model (iOS 17+)
import SwiftData
import Foundation

// @Model 매크로가 NSObject 상속, @Observable, PersistentModel 프로토콜 채택을 모두 자동 처리
// Core Data의 .xcdatamodeld 파일, NSManagedObject 서브클래스 모두 불필요
@Model
final class Article {
    // @Attribute(.unique): 유일성 제약 (Room의 @Index unique = true)
    @Attribute(.unique) var slug: String

    var title: String
    var content: String

    // 배열/딕셔너리 타입 직접 지원 (Core Data에서는 transformable 필요)
    var tags: [String]

    var publishedAt: Date?
    var viewCount: Int
    var isDraft: Bool
    var createdAt: Date

    // 관계: @Relationship으로 명시적 선언 (선택 사항, 기본값도 있음)
    // deleteRule: .cascade → 부모 삭제 시 자식도 삭제
    @Relationship(deleteRule: .cascade, inverse: \\Author.articles)
    var author: Author?

    // .externalStorage: 큰 데이터를 별도 파일로 저장 (Core Data의 Allows External Storage)
    @Attribute(.externalStorage) var thumbnail: Data?

    // .ephemeral: 저장하지 않음 (계산 속성 유사)
    @Transient var formattedDate: String {
        publishedAt.map { DateFormatter.localizedString(from: \$0, dateStyle: .medium, timeStyle: .none) } ?? "미발행"
    }

    init(
        slug: String,
        title: String,
        content: String,
        tags: [String] = [],
        isDraft: Bool = true
    ) {
        self.slug = slug
        self.title = title
        self.content = content
        self.tags = tags
        self.publishedAt = nil
        self.viewCount = 0
        self.isDraft = isDraft
        self.createdAt = Date()
    }
}

@Model
final class Author {
    @Attribute(.unique) var email: String
    var name: String
    var bio: String

    // 역방향 관계 (inverse 설정으로 양방향 자동 관리)
    var articles: [Article]

    init(name: String, email: String, bio: String = "") {
        self.name = name
        self.email = email
        self.bio = bio
        self.articles = []
    }
}

// ModelContainer 설정 (PersistenceController에 해당)
let schema = Schema([Article.self, Author.self])
let config = ModelConfiguration(
    schema: schema,
    isStoredInMemoryOnly: false,    // true = 인메모리 (테스트용)
    cloudKitDatabase: .automatic   // CloudKit 자동 동기화
)
let container = try ModelContainer(for: schema, configurations: config)

// SwiftUI 앱 진입점
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(for: [Article.self, Author.self])
        // 간편 설정: 스키마 추론 + 기본 설정
    }
}`,
    },
  },

  persistence_swiftdata_query: {
    caption: 'SwiftData @Query vs Room LiveData/Flow vs React Query',
    android: {
      language: 'kotlin',
      code: `// Android — Room + Flow + ViewModel
@Dao
interface ArticleDao {
    // Flow<List<T>>: 데이터 변경 시 자동으로 새 값 방출
    @Query("""
        SELECT * FROM articles
        WHERE is_draft = 0
        ORDER BY published_at DESC
        LIMIT :limit
    """)
    fun observePublished(limit: Int = 50): Flow<List<ArticleEntity>>

    @Query("""
        SELECT * FROM articles
        WHERE title LIKE '%' || :query || '%'
        OR content LIKE '%' || :query || '%'
        ORDER BY view_count DESC
    """)
    fun search(query: String): Flow<List<ArticleEntity>>
}

@HiltViewModel
class ArticleListViewModel @Inject constructor(
    private val dao: ArticleDao
) : ViewModel() {
    // StateFlow로 변환 (UI 레이어에서 collect)
    val articles: StateFlow<List<ArticleEntity>> = dao
        .observePublished()
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5_000),
            initialValue = emptyList()
        )

    private val _searchQuery = MutableStateFlow("")
    val searchQuery: StateFlow<String> = _searchQuery.asStateFlow()

    val searchResults: StateFlow<List<ArticleEntity>> = _searchQuery
        .debounce(300)
        .flatMapLatest { query ->
            if (query.isEmpty()) dao.observePublished()
            else dao.search(query)
        }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())

    fun updateQuery(query: String) {
        _searchQuery.value = query
    }
}

// Compose UI에서 사용
@Composable
fun ArticleListScreen(viewModel: ArticleListViewModel = hiltViewModel()) {
    val articles by viewModel.articles.collectAsStateWithLifecycle()
    LazyColumn {
        items(articles, key = { it.id }) { article ->
            ArticleRow(article)
        }
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// Web — TanStack Query (React Query) v5
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query'
import { useState } from 'react'

// 쿼리 키 팩토리 (타입 안전, 캐시 무효화 편의성)
const articleKeys = {
    all: ['articles'] as const,
    lists: () => [...articleKeys.all, 'list'] as const,
    list: (filters: ArticleFilters) => [...articleKeys.lists(), filters] as const,
    detail: (id: string) => [...articleKeys.all, 'detail', id] as const,
}

// 커스텀 훅 — 목록 조회
function useArticles(filters: ArticleFilters = {}) {
    return useQuery({
        queryKey: articleKeys.list(filters),
        queryFn: () => articleApi.getArticles(filters),
        staleTime: 5 * 60 * 1000,  // 5분간 fresh
        placeholderData: keepPreviousData, // 필터 변경 시 이전 데이터 유지
    })
}

// 커스텀 훅 — 검색 (디바운스 포함)
function useArticleSearch(query: string) {
    const debouncedQuery = useDebounce(query, 300)
    return useQuery({
        queryKey: [...articleKeys.lists(), 'search', debouncedQuery],
        queryFn: () => articleApi.search(debouncedQuery),
        enabled: debouncedQuery.length >= 2,  // 2자 이상일 때만 실행
    })
}

// 커스텀 훅 — 낙관적 업데이트 뮤테이션
function useUpdateArticle() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Article> }) =>
            articleApi.update(id, data),
        onMutate: async ({ id, data }) => {
            await queryClient.cancelQueries({ queryKey: articleKeys.lists() })
            const previous = queryClient.getQueryData(articleKeys.list({}))
            // 낙관적으로 UI 먼저 업데이트
            queryClient.setQueryData(articleKeys.list({}), (old: Article[] = []) =>
                old.map(a => a.id === id ? { ...a, ...data } : a)
            )
            return { previous }
        },
        onError: (_, __, context) => {
            // 실패 시 롤백
            queryClient.setQueryData(articleKeys.list({}), context?.previous)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: articleKeys.lists() })
        },
    })
}

// 컴포넌트
function ArticleList() {
    const [search, setSearch] = useState('')
    const { data, isLoading, isFetching } = useArticles()

    if (isLoading) return <Spinner />
    return (
        <div>
            {isFetching && <Banner>업데이트 중...</Banner>}
            {data?.map(article => <ArticleCard key={article.id} article={article} />)}
        </div>
    )
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS — SwiftData @Query (iOS 17+)
import SwiftData
import SwiftUI

// @Query: Core Data의 @FetchRequest에 해당
// 데이터 변경 시 자동으로 뷰 갱신 (SwiftUI와 완전 통합)

struct ArticleListView: View {
    // 기본 @Query — 정렬만 지정
    @Query(sort: \\Article.createdAt, order: .reverse)
    private var allArticles: [Article]

    // 조건 있는 @Query — 발행된 아티클만
    @Query(
        filter: #Predicate<Article> { \$0.isDraft == false },
        sort: \\Article.publishedAt,
        order: .reverse
    )
    private var publishedArticles: [Article]

    var body: some View {
        List(publishedArticles) { article in
            ArticleRowView(article: article)
        }
    }
}

// 동적 조건 @Query — 부모 뷰에서 조건 주입
struct FilteredArticleView: View {
    // @Query를 동적으로 바꾸려면 init에서 설정
    @Query private var articles: [Article]

    init(authorName: String, showDrafts: Bool) {
        // #Predicate는 컴파일 타임에 검증되는 타입 안전 조건절
        let predicate = #Predicate<Article> { article in
            article.author?.name == authorName &&
            (showDrafts || article.isDraft == false)
        }
        _articles = Query(
            filter: predicate,
            sort: [SortDescriptor(\\Article.createdAt, order: .reverse)]
        )
    }

    var body: some View {
        List(articles) { article in
            Text(article.title)
        }
    }
}

// 검색 — @Query + 필터링 조합
struct SearchableArticleView: View {
    @Query(sort: \\Article.viewCount, order: .reverse)
    private var allArticles: [Article]

    @State private var searchText = ""

    // SwiftData의 @Query는 서버사이드 필터링
    // 검색은 클라이언트 필터링과 조합하는 것이 일반적
    private var filteredArticles: [Article] {
        guard !searchText.isEmpty else { return allArticles }
        return allArticles.filter {
            \$0.title.localizedCaseInsensitiveContains(searchText) ||
            \$0.tags.contains { \$0.localizedCaseInsensitiveContains(searchText) }
        }
    }

    var body: some View {
        List(filteredArticles) { article in
            VStack(alignment: .leading) {
                Text(article.title).font(.headline)
                HStack {
                    ForEach(article.tags, id: \\.self) { tag in
                        Text(tag)
                            .font(.caption)
                            .padding(.horizontal, 6)
                            .background(Color.blue.opacity(0.1))
                            .clipShape(Capsule())
                    }
                }
            }
        }
        .searchable(text: \$searchText)
    }
}

// ModelContext를 이용한 CRUD (ViewModel/Repository에서)
@MainActor
class ArticleViewModel: ObservableObject {
    private let context: ModelContext

    init(context: ModelContext) {
        self.context = context
    }

    func create(title: String, content: String, tags: [String]) {
        let slug = title.lowercased()
            .replacingOccurrences(of: " ", with: "-")
        let article = Article(
            slug: slug,
            title: title,
            content: content,
            tags: tags
        )
        context.insert(article)  // save() 자동 호출 또는 명시적으로 try context.save()
    }

    func publish(_ article: Article) throws {
        article.isDraft = false
        article.publishedAt = Date()
        try context.save()
    }

    func delete(_ article: Article) {
        context.delete(article)
    }

    // 명시적 fetch (뷰 외부에서 필요 시)
    func fetchTopArticles(limit: Int = 10) throws -> [Article] {
        var descriptor = FetchDescriptor<Article>(
            predicate: #Predicate { \$0.isDraft == false },
            sortBy: [SortDescriptor(\\Article.viewCount, order: .reverse)]
        )
        descriptor.fetchLimit = limit
        return try context.fetch(descriptor)
    }
}`,
    },
  },

  persistence_cloudkit: {
    caption: 'CloudKit vs Firebase Firestore vs Supabase',
    android: {
      language: 'kotlin',
      code: `// Android — Firebase Firestore
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import kotlinx.coroutines.tasks.await
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.callbackFlow

data class Article(
    val id: String = "",
    val title: String = "",
    val content: String = "",
    val authorId: String = "",
    val tags: List<String> = emptyList(),
    val viewCount: Int = 0,
    val isDraft: Boolean = true,
    val publishedAt: com.google.firebase.Timestamp? = null
)

class FirestoreArticleRepository {
    private val db = Firebase.firestore
    private val collection = db.collection("articles")

    // 생성
    suspend fun create(article: Article): String {
        val docRef = collection.add(article).await()
        return docRef.id
    }

    // 읽기 (단건)
    suspend fun findById(id: String): Article? {
        val snapshot = collection.document(id).get().await()
        return snapshot.toObject(Article::class.java)?.copy(id = snapshot.id)
    }

    // 실시간 관찰 (Flow)
    fun observePublished(): kotlinx.coroutines.flow.Flow<List<Article>> = callbackFlow {
        val listener = collection
            .whereEqualTo("isDraft", false)
            .orderBy("publishedAt", com.google.firebase.firestore.Query.Direction.DESCENDING)
            .limit(50)
            .addSnapshotListener { snapshot, error ->
                if (error != null) { close(error); return@addSnapshotListener }
                val articles = snapshot?.documents?.mapNotNull { doc ->
                    doc.toObject(Article::class.java)?.copy(id = doc.id)
                } ?: emptyList()
                trySend(articles)
            }
        awaitClose { listener.remove() }
    }

    // 업데이트 (부분)
    suspend fun incrementViewCount(id: String) {
        collection.document(id)
            .update("viewCount",
                    com.google.firebase.firestore.FieldValue.increment(1))
            .await()
    }

    // 삭제
    suspend fun delete(id: String) {
        collection.document(id).delete().await()
    }

    // 복합 쿼리 (인덱스 필요)
    suspend fun findByTagAndAuthor(tag: String, authorId: String): List<Article> {
        return collection
            .whereArrayContains("tags", tag)
            .whereEqualTo("authorId", authorId)
            .get().await()
            .toObjects(Article::class.java)
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// Web — Supabase (PostgreSQL 기반, REST + Realtime)
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Article {
    id: string
    title: string
    content: string
    author_id: string
    tags: string[]
    view_count: number
    is_draft: boolean
    published_at: string | null
    created_at: string
}

class SupabaseArticleRepository {
    // 생성
    async create(data: Omit<Article, 'id' | 'created_at' | 'view_count'>): Promise<Article> {
        const { data: article, error } = await supabase
            .from('articles')
            .insert({ ...data, view_count: 0 })
            .select()
            .single()
        if (error) throw error
        return article
    }

    // 읽기 — 조인 포함
    async findPublished(limit = 20, offset = 0): Promise<Article[]> {
        const { data, error } = await supabase
            .from('articles')
            .select(\`
                *,
                author:users(id, name, avatar_url)
            \`)
            .eq('is_draft', false)
            .order('published_at', { ascending: false })
            .range(offset, offset + limit - 1)
        if (error) throw error
        return data
    }

    // 실시간 구독 (Realtime)
    subscribeToArticles(callback: (articles: Article[]) => void) {
        return supabase
            .channel('articles-changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'articles' },
                async () => {
                    const articles = await this.findPublished()
                    callback(articles)
                }
            )
            .subscribe()
    }

    // RPC (PostgreSQL 함수 호출)
    async incrementViewCount(id: string): Promise<void> {
        const { error } = await supabase.rpc('increment_view_count', { article_id: id })
        if (error) throw error
    }

    // 전문 검색 (PostgreSQL FTS)
    async search(query: string): Promise<Article[]> {
        const { data, error } = await supabase
            .from('articles')
            .select()
            .textSearch('title || content', query, { config: 'korean' })
        if (error) throw error
        return data
    }
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS — CloudKit (Apple 클라우드 동기화)
import CloudKit
import Combine

// CloudKit은 Apple 생태계 전용이지만 iCloud 계정만 있으면 무료 쿼터 제공
// Firebase/Supabase와 달리 별도 서버 없이 Apple 인프라 사용

// 방법 1: NSPersistentCloudKitContainer (Core Data + CloudKit 자동 동기화)
// 설정만 하면 Core Data 변경이 iCloud에 자동 반영

final class CloudKitPersistenceController {
    static let shared = CloudKitPersistenceController()

    // NSPersistentContainer 대신 NSPersistentCloudKitContainer 사용
    let container: NSPersistentCloudKitContainer

    init(inMemory: Bool = false) {
        container = NSPersistentCloudKitContainer(name: "AppModel")

        guard let description = container.persistentStoreDescriptions.first else { return }

        if inMemory {
            description.url = URL(fileURLWithPath: "/dev/null")
        }

        // CloudKit 동기화 활성화
        description.cloudKitContainerOptions =
            NSPersistentCloudKitContainerOptions(
                containerIdentifier: "iCloud.com.mycompany.myapp"
            )

        // 히스토리 추적 활성화 (CloudKit 동기화 필수)
        description.setOption(true as NSNumber,
                              forKey: NSPersistentHistoryTrackingKey)
        description.setOption(true as NSNumber,
                              forKey: NSPersistentStoreRemoteChangeNotificationPostOptionKey)

        container.loadPersistentStores { _, error in
            if let error { fatalError("CloudKit 스토어 로드 실패: \\(error)") }
        }

        container.viewContext.automaticallyMergesChangesFromParent = true
        container.viewContext.mergePolicy = NSMergeByPropertyObjectTrumpMergePolicy
    }
}

// 방법 2: CloudKit 직접 API (세밀한 제어 필요 시)
final class CloudKitArticleRepository {
    private let container = CKContainer(identifier: "iCloud.com.mycompany.myapp")
    private var database: CKDatabase { container.privateCloudDatabase }

    // 저장
    func save(article: ArticleEntity) async throws {
        let record = CKRecord(recordType: "Article")
        record["title"] = article.title as CKRecordValue
        record["content"] = article.content as CKRecordValue
        record["isDraft"] = article.isDraft as CKRecordValue
        record["tags"] = article.tags as CKRecordValue

        try await database.save(record)
    }

    // 조회 (NSPredicate 사용)
    func fetchPublished() async throws -> [CKRecord] {
        let predicate = NSPredicate(format: "isDraft == 0")
        let query = CKQuery(recordType: "Article", predicate: predicate)
        query.sortDescriptors = [NSSortDescriptor(key: "publishedAt", ascending: false)]

        let result = try await database.records(matching: query, resultsLimit: 50)
        return result.matchResults.compactMap { try? \$0.1.get() }
    }

    // 실시간 변경 구독 (CKQuerySubscription)
    func subscribeToChanges() async throws {
        let predicate = NSPredicate(value: true)
        let subscription = CKQuerySubscription(
            recordType: "Article",
            predicate: predicate,
            options: [.firesOnRecordCreation, .firesOnRecordUpdate, .firesOnRecordDeletion]
        )

        let notificationInfo = CKSubscription.NotificationInfo()
        notificationInfo.shouldSendContentAvailable = true  // silent push
        subscription.notificationInfo = notificationInfo

        try await database.save(subscription)
    }
}

// 방법 3: SwiftData + CloudKit (가장 현대적, iOS 17+)
// @Model 클래스에 CloudKit 동기화를 ModelConfiguration으로 활성화
let config = ModelConfiguration(
    schema: Schema([Article.self, Author.self]),
    isStoredInMemoryOnly: false,
    cloudKitDatabase: .automatic  // 이 한 줄로 CloudKit 동기화 완성
)
let container = try ModelContainer(
    for: Article.self, Author.self,
    configurations: config
)

// CloudKit 동기화 상태 모니터링
import SwiftUI

struct SyncStatusView: View {
    @Environment(\\.modelContext) private var context

    var body: some View {
        // NSPersistentCloudKitContainer.eventChangedNotification 관찰
        Text("iCloud 동기화 활성")
            .onReceive(
                NotificationCenter.default.publisher(
                    for: NSPersistentCloudKitContainer.eventChangedNotification
                )
            ) { notification in
                guard let event = notification.userInfo?[
                    NSPersistentCloudKitContainer.eventNotificationUserInfoKey
                ] as? NSPersistentCloudKitContainer.Event else { return }

                if event.endDate != nil {
                    print("CloudKit 동기화 완료: \\(event.type)")
                }
            }
    }
}`,
    },
  },

  // === src/data/codeBlocks-ch11.ts ===
notification_permission: {
    caption: '알림 권한 요청 — UNUserNotificationCenter vs Android vs Web',
    android: {
      language: 'kotlin',
      code: `// Android 13+ (API 33) — POST_NOTIFICATIONS 런타임 권한
// AndroidManifest.xml
// <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

import android.Manifest
import android.content.pm.PackageManager
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.content.ContextCompat

class MainActivity : AppCompatActivity() {

    // Activity Result API로 권한 요청 (권장 방식)
    private val requestPermissionLauncher =
        registerForActivityResult(ActivityResultContracts.RequestPermission()) { isGranted ->
            if (isGranted) {
                // 권한 허용 — 알림 발송 가능
                setupNotifications()
            } else {
                // 거부됨 — 알림 기능 비활성화 또는 설명 UI 표시
                showPermissionRationale()
            }
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        checkAndRequestNotificationPermission()
    }

    private fun checkAndRequestNotificationPermission() {
        when {
            // 이미 권한 있음
            ContextCompat.checkSelfPermission(
                this, Manifest.permission.POST_NOTIFICATIONS
            ) == PackageManager.PERMISSION_GRANTED -> {
                setupNotifications()
            }
            // 이전에 거부한 경우 — 이유 설명 후 재요청
            shouldShowRequestPermissionRationale(Manifest.permission.POST_NOTIFICATIONS) -> {
                showRationaleDialog {
                    requestPermissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)
                }
            }
            // 최초 요청
            else -> {
                requestPermissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)
            }
        }
    }
}

// Android 12 이하: 권한 선언 없이 알림 발송 가능 (자동 허용)
// NotificationManagerCompat.from(context).areNotificationsEnabled() 로 사용자 설정 확인`,
    },
    web: {
      language: 'typescript',
      code: `// Web Notification API — 권한 요청
// 브라우저에서 실행되며, HTTPS 환경에서만 동작

async function requestNotificationPermission(): Promise<boolean> {
    // 현재 권한 상태 확인
    // 'default' | 'granted' | 'denied'
    const current = Notification.permission;

    if (current === 'granted') {
        return true;
    }

    if (current === 'denied') {
        // 한번 거부하면 브라우저 설정에서만 변경 가능
        console.warn('알림이 차단되었습니다. 브라우저 설정에서 변경해주세요.');
        return false;
    }

    // 'default' 상태 — 사용자에게 요청
    // ⚠️ 반드시 사용자 제스처(버튼 클릭 등) 컨텍스트에서 호출해야 함
    const permission = await Notification.requestPermission();
    return permission === 'granted';
}

// 버튼 클릭 핸들러에서 호출
document.getElementById('enableNotifications')?.addEventListener('click', async () => {
    const granted = await requestNotificationPermission();

    if (granted) {
        // 권한 획득 후 서비스 워커 등록 및 Push 구독
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        });
        await sendSubscriptionToServer(subscription);
    }
});

// 권한 상태 변화 감지 (Permission API)
const status = await navigator.permissions.query({ name: 'notifications' });
status.addEventListener('change', () => {
    console.log('알림 권한 변경:', status.state);
});`,
    },
    ios: {
      language: 'swift',
      code: `// iOS — UNUserNotificationCenter 권한 요청
// iOS 10+ 필수. Info.plist에 별도 선언 불필요
import UserNotifications
import UIKit

class NotificationManager {

    static let shared = NotificationManager()

    // 권한 요청 — 반드시 사용자 상호작용 이후 적절한 타이밍에 호출
    func requestAuthorization() async {
        let center = UNUserNotificationCenter.current()

        // 현재 권한 상태 먼저 확인
        let settings = await center.notificationSettings()

        switch settings.authorizationStatus {
        case .authorized:
            // 이미 허용됨
            await registerForRemoteNotifications()

        case .denied:
            // 거부됨 — 설정 앱으로 안내
            await showSettingsAlert()

        case .notDetermined:
            // 미결정 — 요청 다이얼로그 표시
            do {
                // options: 요청할 권한 종류
                // .alert  — 잠금화면/알림센터 배너
                // .badge  — 앱 아이콘 뱃지
                // .sound  — 알림음
                // .provisional — 조용한 알림 (iOS 12+, 허가 없이 알림센터에만)
                // .criticalAlert — 방해금지 모드 무시 (특별 승인 필요)
                let granted = try await center.requestAuthorization(
                    options: [.alert, .badge, .sound]
                )

                if granted {
                    await registerForRemoteNotifications()
                } else {
                    // 사용자가 거부 — 앱 내 알림 관련 기능 비활성화
                    handlePermissionDenied()
                }
            } catch {
                print("권한 요청 실패: \\(error)")
            }

        case .provisional:
            // 임시 허가 상태 — 알림센터에만 조용히 표시됨
            await registerForRemoteNotifications()

        case .ephemeral:
            // App Clip 전용 임시 권한
            break

        @unknown default:
            break
        }
    }

    // APNs 등록 — 반드시 메인 스레드에서 호출
    @MainActor
    private func registerForRemoteNotifications() {
        UIApplication.shared.registerForRemoteNotifications()
    }
}

// AppDelegate에서 권한 요청 적절한 타이밍 결정
// 앱 첫 실행 시 바로 요청하는 것보다 사용자가 알림 기능을 사용하려 할 때 요청 권장
// (Pre-permission UX: 커스텀 설명 화면 → 시스템 다이얼로그 순서)`,
    },
  },

  notification_local_schedule: {
    caption: '로컬 알림 스케줄링 — UNNotificationRequest vs AlarmManager vs Web Push API',
    android: {
      language: 'kotlin',
      code: `// Android 로컬 알림 — AlarmManager + NotificationCompat
import android.app.AlarmManager
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.core.app.NotificationCompat
import java.util.Calendar

class LocalNotificationScheduler(private val context: Context) {

    companion object {
        const val CHANNEL_ID = "reminders"
        const val CHANNEL_NAME = "리마인더"
    }

    init {
        createNotificationChannel()
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                CHANNEL_NAME,
                NotificationManager.IMPORTANCE_HIGH
            ).apply {
                description = "사용자 리마인더 알림"
                enableVibration(true)
            }
            val manager = context.getSystemService(NotificationManager::class.java)
            manager.createNotificationChannel(channel)
        }
    }

    // 특정 시간에 알림 예약 (AlarmManager)
    fun scheduleAtTime(notificationId: Int, title: String, body: String, triggerAt: Long) {
        val intent = Intent(context, NotificationReceiver::class.java).apply {
            putExtra("notification_id", notificationId)
            putExtra("title", title)
            putExtra("body", body)
        }

        val pendingIntent = PendingIntent.getBroadcast(
            context,
            notificationId,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        val alarmManager = context.getSystemService(AlarmManager::class.java)

        // Android 12+: SCHEDULE_EXACT_ALARM 권한 필요
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            if (alarmManager.canScheduleExactAlarms()) {
                alarmManager.setExactAndAllowWhileIdle(
                    AlarmManager.RTC_WAKEUP, triggerAt, pendingIntent
                )
            }
        } else {
            alarmManager.setExactAndAllowWhileIdle(
                AlarmManager.RTC_WAKEUP, triggerAt, pendingIntent
            )
        }
    }

    // BroadcastReceiver에서 실제 알림 표시
    // class NotificationReceiver : BroadcastReceiver()
    fun showNotification(notificationId: Int, title: String, body: String) {
        val notification = NotificationCompat.Builder(context, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(title)
            .setContentText(body)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setAutoCancel(true)
            .build()

        val manager = context.getSystemService(NotificationManager::class.java)
        manager.notify(notificationId, notification)
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// Web — 로컬 알림은 Notification API (단발성) + Service Worker (지속성)
// 주의: Web에는 "로컬 스케줄링" 개념이 없음 — 서버나 SW 타이머로 처리

// 즉시 알림 (탭이 열려 있을 때)
function showImmediateNotification(title: string, options: NotificationOptions) {
    if (Notification.permission !== 'granted') return;

    const notification = new Notification(title, {
        body: options.body,
        icon: '/icon-192.png',
        badge: '/badge-72.png',
        tag: options.tag,          // 같은 tag면 기존 알림 교체
        renotify: true,            // tag 중복 시에도 소리/진동 재생
        requireInteraction: false, // 사용자가 닫을 때까지 유지 여부
        data: { url: '/deep-link' },
    });

    notification.onclick = () => {
        window.focus();
        notification.close();
    };
}

// Service Worker에서 스케줄링 (백그라운드 유사)
// ⚠️ Web에는 iOS/Android처럼 OS 레벨 로컬 알림 스케줄러 없음
// Notification Triggers API (실험적, Chrome 80+)
async function scheduleWithTrigger(title: string, triggerAt: Date) {
    const registration = await navigator.serviceWorker.ready;

    // @ts-ignore — 실험적 API
    await registration.showNotification(title, {
        body: '예약된 알림입니다.',
        // @ts-ignore
        showTrigger: new TimestampTrigger(triggerAt.getTime()),
    });
}

// 실무에서는 서버 측 Push로 대체
// 서버에서 스케줄된 시간에 Web Push 발송하는 방식이 표준`,
    },
    ios: {
      language: 'swift',
      code: `// iOS 로컬 알림 스케줄링 — UNUserNotificationCenter
import UserNotifications

class LocalNotificationScheduler {

    private let center = UNUserNotificationCenter.current()

    // ─── 트리거 1: 특정 날짜/시간 ───────────────────────────────────────
    func scheduleAtDate(
        id: String,
        title: String,
        body: String,
        date: DateComponents,
        repeats: Bool = false
    ) async throws {
        let content = UNMutableNotificationContent()
        content.title = title
        content.body = body
        content.sound = .default
        content.badge = 1

        // UNCalendarNotificationTrigger: 특정 날짜·시간 (반복 가능)
        let trigger = UNCalendarNotificationTrigger(dateMatching: date, repeats: repeats)
        let request = UNNotificationRequest(identifier: id, content: content, trigger: trigger)

        try await center.add(request)
    }

    // ─── 트리거 2: N초 후 ─────────────────────────────────────────────
    func scheduleAfterDelay(id: String, title: String, body: String, delay: TimeInterval) async throws {
        let content = UNMutableNotificationContent()
        content.title = title
        content.body = body
        content.sound = .default
        // userInfo로 딥링크 페이로드 첨부
        content.userInfo = ["deepLink": "myapp://orders/123"]

        // UNTimeIntervalNotificationTrigger: 지연 시간
        let trigger = UNTimeIntervalNotificationTrigger(timeInterval: delay, repeats: false)
        let request = UNNotificationRequest(identifier: id, content: content, trigger: trigger)

        try await center.add(request)
    }

    // ─── 트리거 3: 위치 기반 ──────────────────────────────────────────
    func scheduleAtLocation(id: String, title: String, region: CLCircularRegion) async throws {
        let content = UNMutableNotificationContent()
        content.title = title
        content.body = "해당 위치에 도착했습니다."

        // UNLocationNotificationTrigger: 지오펜스 진입/퇴장
        let trigger = UNLocationNotificationTrigger(region: region, repeats: false)
        let request = UNNotificationRequest(identifier: id, content: content, trigger: trigger)

        try await center.add(request)
    }

    // ─── 스케줄된 알림 관리 ───────────────────────────────────────────
    func cancelNotification(id: String) {
        center.removePendingNotificationRequests(withIdentifiers: [id])
    }

    func cancelAll() {
        center.removeAllPendingNotificationRequests()
    }

    func pendingNotifications() async -> [UNNotificationRequest] {
        return await center.pendingNotificationRequests()
    }

    // ─── 실무 예시: 매일 오전 9시 리마인더 ───────────────────────────
    func scheduleDaily9AMReminder() async throws {
        var dateComponents = DateComponents()
        dateComponents.hour = 9
        dateComponents.minute = 0

        try await scheduleAtDate(
            id: "daily_reminder",
            title: "오늘의 할 일",
            body: "오늘 해야 할 일을 확인해보세요.",
            date: dateComponents,
            repeats: true  // 매일 반복
        )
    }
}`,
    },
  },

  notification_apns_register: {
    caption: 'APNs 등록 및 디바이스 토큰 획득 vs FCM 토큰 vs Web Push Subscription',
    android: {
      language: 'kotlin',
      code: `// Android — FCM 토큰 획득
// build.gradle: implementation 'com.google.firebase:firebase-messaging-ktx'

import com.google.firebase.messaging.FirebaseMessaging

class PushTokenManager {

    // FCM 토큰 가져오기 (비동기)
    fun getFCMToken(onSuccess: (String) -> Unit, onFailure: (Exception) -> Unit) {
        FirebaseMessaging.getInstance().token
            .addOnSuccessListener { token ->
                // 서버에 토큰 등록
                onSuccess(token)
            }
            .addOnFailureListener { exception ->
                onFailure(exception)
            }
    }

    // Kotlin Coroutines 방식
    suspend fun getFCMTokenSuspend(): String {
        return com.google.android.gms.tasks.Tasks.await(
            FirebaseMessaging.getInstance().token
        )
    }
}

// 토큰 갱신 감지 — FirebaseMessagingService 상속
class MyFirebaseMessagingService : FirebaseMessagingService() {

    override fun onNewToken(token: String) {
        super.onNewToken(token)
        // 토큰이 갱신될 때마다 서버에 업데이트 필요
        // (앱 재설치, 데이터 초기화, 기기 복원 시 변경됨)
        sendTokenToServer(token)
    }

    private fun sendTokenToServer(token: String) {
        // 사용자 ID + 디바이스 토큰 + 플랫폼 정보를 서버에 전송
        val userId = UserManager.currentUserId
        ApiService.registerPushToken(
            userId = userId,
            token = token,
            platform = "android"
        )
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// Web Push — VAPID 기반 Push Subscription
// PushManager.subscribe()가 APNs 토큰과 동일한 역할

const VAPID_PUBLIC_KEY = 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U';

async function subscribeToPush(): Promise<PushSubscription | null> {
    const registration = await navigator.serviceWorker.ready;

    // 기존 구독 확인
    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
        // 새 구독 생성 — 서버의 VAPID public key 사용
        subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,  // 반드시 true (사용자에게 보이는 알림만 허용)
            applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        });
    }

    // subscription 객체를 서버에 저장
    // { endpoint: string, keys: { p256dh: string, auth: string } }
    await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            endpoint: subscription.endpoint,
            keys: {
                p256dh: btoa(String.fromCharCode(...new Uint8Array(
                    subscription.getKey('p256dh')!
                ))),
                auth: btoa(String.fromCharCode(...new Uint8Array(
                    subscription.getKey('auth')!
                ))),
            },
        }),
    });

    return subscription;
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    return new Uint8Array([...rawData].map(c => c.charCodeAt(0)));
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS — APNs 등록 및 디바이스 토큰 획득
// Xcode > Signing & Capabilities > Push Notifications 추가 필수

import UIKit

// ─── AppDelegate에서 처리 ──────────────────────────────────────────────
@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        // 알림 권한 요청 후 APNs 등록
        Task {
            await NotificationManager.shared.requestAuthorization()
            // requestAuthorization 성공 시 내부에서 registerForRemoteNotifications() 호출
        }
        return true
    }

    // ─── APNs 등록 성공 ─────────────────────────────────────────────
    func application(
        _ application: UIApplication,
        didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data
    ) {
        // Data → 16진수 문자열로 변환
        let tokenString = deviceToken.map { String(format: "%02.2hhx", $0) }.joined()
        print("APNs 디바이스 토큰: \\(tokenString)")

        // 서버에 토큰 등록
        PushTokenService.shared.register(token: tokenString, platform: "ios")
    }

    // ─── APNs 등록 실패 ─────────────────────────────────────────────
    func application(
        _ application: UIApplication,
        didFailToRegisterForRemoteNotificationsWithError error: Error
    ) {
        // 시뮬레이터에서는 APNs 등록 불가 — 실기기에서만 동작
        print("APNs 등록 실패: \\(error.localizedDescription)")
    }
}

// ─── FCM 연동 시 (Firebase SDK 사용) ────────────────────────────────────
// APNs 토큰과 FCM 토큰은 별개임에 주의
// Firebase가 내부적으로 APNs 토큰 → FCM 토큰으로 변환

import FirebaseMessaging

class PushTokenService: NSObject, MessagingDelegate {

    static let shared = PushTokenService()

    func configure() {
        Messaging.messaging().delegate = self
    }

    // FCM 토큰 갱신 콜백
    func messaging(_ messaging: Messaging, didReceiveRegistrationToken fcmToken: String?) {
        guard let token = fcmToken else { return }
        print("FCM 토큰: \\(token)")
        // 서버에 업데이트
        updateServerToken(token)
    }

    func getToken() async throws -> String {
        return try await Messaging.messaging().token()
    }
}`,
    },
  },

  notification_push_handling: {
    caption: 'Push 알림 수신 및 처리 — UNUserNotificationCenterDelegate vs FCM vs Service Worker',
    android: {
      language: 'kotlin',
      code: `// Android — FCM 메시지 수신 처리
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import androidx.core.app.NotificationCompat
import android.app.NotificationManager

class MyFirebaseMessagingService : FirebaseMessagingService() {

    // 앱이 포그라운드일 때도, 백그라운드일 때도 호출됨
    // notification 페이로드: 백그라운드 시 FCM SDK가 자동 처리 (시스템 트레이)
    // data 페이로드: 항상 onMessageReceived 호출됨 (직접 처리)
    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)

        val title = remoteMessage.notification?.title ?: remoteMessage.data["title"] ?: return
        val body = remoteMessage.notification?.body ?: remoteMessage.data["body"] ?: return
        val deepLink = remoteMessage.data["deepLink"]

        when {
            // 앱이 포그라운드: 직접 알림 표시
            isAppInForeground() -> {
                showForegroundNotification(title, body, deepLink)
            }
            // 백그라운드 + notification 페이로드: FCM이 자동 처리
            // 백그라운드 + data only: 수동 처리 필요
            else -> {
                showBackgroundNotification(title, body, deepLink)
            }
        }
    }

    private fun showForegroundNotification(title: String, body: String, deepLink: String?) {
        val intent = Intent(this, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
            deepLink?.let { putExtra("deep_link", it) }
        }
        val pendingIntent = PendingIntent.getActivity(
            this, 0, intent,
            PendingIntent.FLAG_ONE_SHOT or PendingIntent.FLAG_IMMUTABLE
        )

        val notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(title)
            .setContentText(body)
            .setAutoCancel(true)
            .setContentIntent(pendingIntent)
            .build()

        val manager = getSystemService(NotificationManager::class.java)
        manager.notify(System.currentTimeMillis().toInt(), notification)
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// Service Worker — Push 이벤트 처리
// public/sw.js (또는 빌드 결과물)

// 백그라운드 push 수신
self.addEventListener('push', (event: PushEvent) => {
    const data = event.data?.json() ?? {};

    const title = data.title ?? '새 알림';
    const options: NotificationOptions = {
        body: data.body,
        icon: '/icon-192.png',
        badge: '/badge-72.png',
        tag: data.tag ?? 'default',
        data: { url: data.url ?? '/' },
        // 액션 버튼
        actions: [
            { action: 'open', title: '열기' },
            { action: 'dismiss', title: '닫기' },
        ],
    };

    // waitUntil: 비동기 작업이 완료될 때까지 SW 종료 방지
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// 알림 클릭 처리
self.addEventListener('notificationclick', (event: NotificationEvent) => {
    event.notification.close();

    const url = event.notification.data?.url ?? '/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then(clientList => {
                // 이미 열린 탭이 있으면 포커스
                const existingClient = clientList.find(c => c.url === url);
                if (existingClient) return existingClient.focus();
                // 없으면 새 탭 열기
                return clients.openWindow(url);
            })
    );
});

// 포그라운드 push 수신 (앱 코드에서)
// navigator.serviceWorker.addEventListener('message', handler)
// 또는 BroadcastChannel 활용`,
    },
    ios: {
      language: 'swift',
      code: `// iOS — UNUserNotificationCenterDelegate로 Push 처리
import UserNotifications
import UIKit

class NotificationDelegate: NSObject, UNUserNotificationCenterDelegate {

    // ─── 포그라운드에서 알림 수신 시 ─────────────────────────────────
    // iOS 기본: 앱이 포그라운드면 알림 배너가 표시되지 않음
    // 이 메서드에서 completionHandler로 표시 방식 결정
    func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        willPresent notification: UNNotification,
        withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void
    ) {
        let userInfo = notification.request.content.userInfo
        print("포그라운드 알림 수신: \\(userInfo)")

        // .banner: 상단 배너 표시
        // .sound: 소리 재생
        // .badge: 뱃지 업데이트
        // .list: 알림센터에 추가
        completionHandler([.banner, .sound, .list])
    }

    // ─── 알림 탭/액션 처리 ────────────────────────────────────────────
    func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        didReceive response: UNNotificationResponse,
        withCompletionHandler completionHandler: @escaping () -> Void
    ) {
        let userInfo = response.notification.request.content.userInfo
        let actionIdentifier = response.actionIdentifier

        switch actionIdentifier {
        case UNNotificationDefaultActionIdentifier:
            // 기본 탭 — 알림 바디 터치
            handleDefaultTap(userInfo: userInfo)

        case UNNotificationDismissActionIdentifier:
            // 알림 스와이프로 삭제
            print("알림 무시됨")

        case "REPLY_ACTION":
            // 텍스트 입력 액션 (UNTextInputNotificationAction)
            if let textResponse = response as? UNTextInputNotificationResponse {
                handleReply(text: textResponse.userText, userInfo: userInfo)
            }

        default:
            handleCustomAction(identifier: actionIdentifier, userInfo: userInfo)
        }

        completionHandler()
    }

    private func handleDefaultTap(userInfo: [AnyHashable: Any]) {
        guard let deepLink = userInfo["deepLink"] as? String,
              let url = URL(string: deepLink) else { return }
        // 딥링크 처리 — SceneDelegate 또는 NavigationCoordinator에 위임
        DeepLinkHandler.shared.handle(url: url)
    }
}

// ─── AppDelegate에서 Delegate 등록 ───────────────────────────────────
// application(_:didFinishLaunchingWithOptions:) 내에서:
// let delegate = NotificationDelegate()
// UNUserNotificationCenter.current().delegate = delegate`,
    },
  },

  notification_silent_push: {
    caption: 'Silent Push (백그라운드 업데이트) — content-available vs FCM data message vs Background Sync',
    android: {
      language: 'kotlin',
      code: `// Android — FCM Data-only Message (Silent Push 유사)
// notification 키 없이 data 키만 있으면 항상 onMessageReceived 호출
// + WorkManager로 안정적인 백그라운드 처리 권장

// FCM 서버 페이로드 (data only)
// {
//   "to": "<FCM_TOKEN>",
//   "data": {
//     "type": "SYNC",
//     "version": "42"
//   }
// }

class MyFirebaseMessagingService : FirebaseMessagingService() {

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        if (remoteMessage.notification != null) return  // 일반 알림은 무시

        val type = remoteMessage.data["type"] ?: return

        when (type) {
            "SYNC" -> {
                // 즉시 처리 가능한 가벼운 작업
                val version = remoteMessage.data["version"]?.toLongOrNull() ?: 0L
                DataSyncManager.triggerIncrementalSync(version)
            }
            "INVALIDATE_CACHE" -> {
                // WorkManager로 위임 — 시스템 리소스 존중, Doze 모드 대응
                val workRequest = OneTimeWorkRequestBuilder<CacheInvalidationWorker>()
                    .setInputData(workDataOf("keys" to remoteMessage.data["keys"]))
                    .setConstraints(
                        Constraints.Builder()
                            .setRequiredNetworkType(NetworkType.CONNECTED)
                            .build()
                    )
                    .build()

                WorkManager.getInstance(applicationContext).enqueue(workRequest)
            }
        }
    }
}

// WorkManager Worker
class CacheInvalidationWorker(
    context: Context,
    params: WorkerParameters
) : CoroutineWorker(context, params) {

    override suspend fun doWork(): Result {
        val keys = inputData.getString("keys") ?: return Result.failure()
        CacheRepository.invalidate(keys.split(","))
        return Result.success()
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// Web — Background Sync API (Service Worker)
// Push + Background Sync 조합으로 Silent Push 패턴 구현

// ─── Service Worker에서 push 수신 후 Background Sync 등록 ──────────
self.addEventListener('push', (event: PushEvent) => {
    const data = event.data?.json() ?? {};

    // silent push: 알림 표시 없이 데이터만 처리
    if (data.type === 'SILENT_SYNC') {
        event.waitUntil(
            // Background Sync 태그 등록 — 네트워크 연결되면 sync 이벤트 발생
            self.registration.sync.register(\`data-sync-\${data.version}\`)
        );
        return;  // showNotification 호출 안 함
    }

    // 일반 push는 알림 표시
    event.waitUntil(
        self.registration.showNotification(data.title, { body: data.body })
    );
});

// Background Sync 처리
self.addEventListener('sync', (event: SyncEvent) => {
    if (event.tag.startsWith('data-sync-')) {
        event.waitUntil(performDataSync());
    }
});

async function performDataSync(): Promise<void> {
    const response = await fetch('/api/sync', { method: 'POST' });
    const { data } = await response.json();

    // IndexedDB에 캐시 업데이트
    const db = await openDatabase();
    const tx = db.transaction('cache', 'readwrite');
    for (const item of data) {
        await tx.objectStore('cache').put(item);
    }

    // 열린 탭들에 업데이트 알림
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
        client.postMessage({ type: 'DATA_UPDATED' });
    });
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS — Silent Push (content-available: 1)
// APNs 페이로드에 "content-available": 1 설정, alert/sound/badge 없음
// Xcode > Background Modes > Remote notifications 체크 필수

// APNs 페이로드 예시 (서버에서 전송)
// {
//   "aps": {
//     "content-available": 1   ← 이것만 있으면 Silent Push
//   },
//   "type": "SYNC",
//   "version": 42
// }

import UIKit
import BackgroundTasks

class AppDelegate: UIResponder, UIApplicationDelegate {

    // ─── Silent Push 수신 핸들러 ──────────────────────────────────────
    // 앱이 백그라운드/서스펜드 상태에서 최대 30초의 실행 시간 부여
    // ⚠️ iOS는 Silent Push 빈도를 자동 조절함 (너무 자주 보내면 throttle)
    func application(
        _ application: UIApplication,
        didReceiveRemoteNotification userInfo: [AnyHashable: Any],
        fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void
    ) {
        guard let type = userInfo["type"] as? String else {
            completionHandler(.noData)
            return
        }

        Task {
            do {
                switch type {
                case "SYNC":
                    let version = userInfo["version"] as? Int ?? 0
                    let hasNewData = try await DataSyncService.shared.sync(since: version)
                    // 반드시 completionHandler 호출 — 시스템이 다음 Silent Push 허용량 결정에 사용
                    completionHandler(hasNewData ? .newData : .noData)

                case "INVALIDATE_CACHE":
                    let keys = userInfo["keys"] as? [String] ?? []
                    await CacheManager.shared.invalidate(keys: keys)
                    completionHandler(.newData)

                default:
                    completionHandler(.noData)
                }
            } catch {
                completionHandler(.failed)
            }
        }
    }
}

// ─── BGAppRefreshTask (BGTaskScheduler) — 더 안정적인 대안 ──────────
// Silent Push가 throttle될 때를 대비한 보조 수단
// Info.plist: BGTaskSchedulerPermittedIdentifiers 배열에 identifier 추가

class BackgroundTaskManager {

    static func registerTasks() {
        BGTaskScheduler.shared.register(
            forTaskWithIdentifier: "com.myapp.refresh",
            using: nil
        ) { task in
            handleAppRefresh(task: task as! BGAppRefreshTask)
        }
    }

    static func scheduleAppRefresh() {
        let request = BGAppRefreshTaskRequest(identifier: "com.myapp.refresh")
        request.earliestBeginDate = Date(timeIntervalSinceNow: 15 * 60) // 15분 후

        try? BGTaskScheduler.shared.submit(request)
    }

    private static func handleAppRefresh(task: BGAppRefreshTask) {
        scheduleAppRefresh() // 다음 실행 예약

        let syncTask = Task {
            try await DataSyncService.shared.sync(since: 0)
        }

        task.expirationHandler = { syncTask.cancel() }

        Task {
            do {
                try await syncTask.value
                task.setTaskCompleted(success: true)
            } catch {
                task.setTaskCompleted(success: false)
            }
        }
    }
}`,
    },
  },

  notification_rich: {
    caption: 'Rich Notification (이미지/비디오/커스텀 UI) vs FCM BigPictureStyle vs Web Notification',
    android: {
      language: 'kotlin',
      code: `// Android — Rich Notification (BigPictureStyle, Custom Layout)
import android.graphics.BitmapFactory
import androidx.core.app.NotificationCompat
import java.net.URL

class RichNotificationBuilder(private val context: Context) {

    // BigPictureStyle — 이미지 첨부 알림
    suspend fun buildBigPictureNotification(
        title: String,
        body: String,
        imageUrl: String
    ): android.app.Notification {
        // 이미지 다운로드 (IO 스레드에서)
        val bitmap = withContext(Dispatchers.IO) {
            BitmapFactory.decodeStream(URL(imageUrl).openStream())
        }

        return NotificationCompat.Builder(context, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(title)
            .setContentText(body)
            .setLargeIcon(bitmap)
            .setStyle(
                NotificationCompat.BigPictureStyle()
                    .bigPicture(bitmap)
                    .bigLargeIcon(null as android.graphics.Bitmap?)  // 확장 시 largeIcon 숨김
                    .setSummaryText(body)
            )
            .build()
    }

    // BigTextStyle — 긴 텍스트 알림
    fun buildBigTextNotification(title: String, longBody: String): android.app.Notification {
        return NotificationCompat.Builder(context, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(title)
            .setContentText(longBody.take(50) + "...")
            .setStyle(
                NotificationCompat.BigTextStyle()
                    .bigText(longBody)
                    .setBigContentTitle(title)
            )
            .build()
    }

    // MessagingStyle — 채팅 알림
    fun buildMessagingNotification(
        messages: List<ChatMessage>
    ): android.app.Notification {
        val style = NotificationCompat.MessagingStyle("나")
        messages.forEach { msg ->
            style.addMessage(
                NotificationCompat.MessagingStyle.Message(
                    msg.text,
                    msg.timestamp,
                    androidx.core.app.Person.Builder().setName(msg.sender).build()
                )
            )
        }

        return NotificationCompat.Builder(context, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_chat)
            .setStyle(style)
            .build()
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// Web — Rich Notification (이미지, 뱃지, 액션)
// ⚠️ Web Notification은 커스텀 UI 없음 — 브라우저 기본 UI만 사용

// Service Worker에서 Rich Notification 표시
self.addEventListener('push', (event: PushEvent) => {
    const data = event.data?.json() ?? {};

    const options: NotificationOptions = {
        body: data.body,

        // 알림 아이콘 (권장 크기: 192x192)
        icon: data.iconUrl ?? '/icon-192.png',

        // 상태바 아이콘 (모바일, 권장 크기: 72x72, 단색 PNG)
        badge: '/badge-72.png',

        // 알림에 표시되는 이미지 (Chrome 56+, 권장 크기: 1350x900)
        // ⚠️ Safari는 image 미지원
        image: data.imageUrl,

        // 알림 진동 패턴 [진동ms, 휴지ms, ...]
        vibrate: [200, 100, 200],

        // 같은 tag는 기존 알림 교체 (스택 방지)
        tag: data.tag ?? 'default',
        renotify: true,

        // 사용자가 닫을 때까지 유지
        requireInteraction: data.requireInteraction ?? false,

        // 추가 데이터 (notificationclick에서 활용)
        data: { url: data.url, payload: data.payload },

        // 액션 버튼 (최대 2개)
        actions: [
            { action: 'accept', title: '수락', icon: '/icons/check.png' },
            { action: 'decline', title: '거절', icon: '/icons/x.png' },
        ],
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// 노트: iOS Safari(16.4+)는 PWA 설치 후 Web Push 지원
// 단, image, actions 등 일부 옵션은 플랫폼별로 지원 여부 다름`,
    },
    ios: {
      language: 'swift',
      code: `// iOS — Rich Notification
// 1) Notification Service Extension: 페이로드 수정 (이미지 다운로드)
// 2) Notification Content Extension: 완전한 커스텀 UI

// ─── 1. Notification Service Extension ──────────────────────────────
// File > New > Target > Notification Service Extension
// APNs 페이로드에 "mutable-content": 1 필요

import UserNotifications

class NotificationService: UNNotificationServiceExtension {

    var contentHandler: ((UNNotificationContent) -> Void)?
    var bestAttemptContent: UNMutableNotificationContent?

    override func didReceive(
        _ request: UNNotificationRequest,
        withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void
    ) {
        self.contentHandler = contentHandler
        bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)

        guard let bestAttemptContent,
              let imageURLString = request.content.userInfo["image"] as? String,
              let imageURL = URL(string: imageURLString) else {
            contentHandler(request.content)
            return
        }

        // 이미지 다운로드 후 첨부
        // 처리 시간 제한: 약 30초 (serviceExtensionTimeWillExpire 전에 완료해야 함)
        downloadAndAttach(url: imageURL, to: bestAttemptContent) { content in
            contentHandler(content)
        }
    }

    private func downloadAndAttach(
        url: URL,
        to content: UNMutableNotificationContent,
        completion: @escaping (UNMutableNotificationContent) -> Void
    ) {
        URLSession.shared.downloadTask(with: url) { localURL, _, error in
            defer { completion(content) }
            guard let localURL else { return }

            // 임시 파일로 복사 (확장자 유지 — MIME 타입 판별에 사용)
            let tmpURL = URL(fileURLWithPath: NSTemporaryDirectory())
                .appendingPathComponent(url.lastPathComponent)

            try? FileManager.default.moveItem(at: localURL, to: tmpURL)

            if let attachment = try? UNNotificationAttachment(
                identifier: "image",
                url: tmpURL,
                options: [UNNotificationAttachmentOptionsThumbnailClippingRectKey: CGRect.zero]
            ) {
                content.attachments = [attachment]
            }
        }.resume()
    }

    // 시간 초과 시 호출 — 가능한 최선의 콘텐츠로 전달
    override func serviceExtensionTimeWillExpire() {
        if let contentHandler, let bestAttemptContent {
            contentHandler(bestAttemptContent)
        }
    }
}

// ─── 2. Notification Content Extension ──────────────────────────────
// File > New > Target > Notification Content Extension
// Info.plist: UNNotificationExtensionCategory = "CUSTOM_CATEGORY"

// NotificationViewController.swift (Extension 타겟 내)
import UIKit
import UserNotifications
import UserNotificationsUI

class NotificationViewController: UIViewController, UNNotificationContentExtension {

    @IBOutlet var imageView: UIImageView!
    @IBOutlet var titleLabel: UILabel!
    @IBOutlet var bodyLabel: UILabel!

    func didReceive(_ notification: UNNotification) {
        titleLabel.text = notification.request.content.title
        bodyLabel.text = notification.request.content.body

        if let attachment = notification.request.content.attachments.first,
           attachment.url.startAccessingSecurityScopedResource() {
            imageView.image = UIImage(contentsOfFile: attachment.url.path)
            attachment.url.stopAccessingSecurityScopedResource()
        }
    }

    // 액션 버튼 탭 처리
    func didReceive(
        _ response: UNNotificationResponse,
        completionHandler completion: @escaping (UNNotificationContentExtensionResponseOption) -> Void
    ) {
        if response.actionIdentifier == "LIKE_ACTION" {
            likeButton.isSelected = true
            completion(.doNotDismiss)  // Extension UI 유지
        } else {
            completion(.dismissAndForwardAction)  // 앱으로 전달
        }
    }
}`,
    },
  },

  notification_category_action: {
    caption: '알림 카테고리와 인터랙티브 액션 vs Android 알림 액션 vs Web Notification actions',
    android: {
      language: 'kotlin',
      code: `// Android — 알림 액션 버튼
import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Intent
import androidx.core.app.NotificationCompat
import androidx.core.app.RemoteInput

class ActionNotificationBuilder(private val context: Context) {

    companion object {
        const val ACTION_ACCEPT = "com.myapp.ACTION_ACCEPT"
        const val ACTION_DECLINE = "com.myapp.ACTION_DECLINE"
        const val ACTION_REPLY = "com.myapp.ACTION_REPLY"
        const val KEY_REPLY_TEXT = "reply_text"
    }

    fun buildWithActions(title: String, body: String, requestId: String): android.app.Notification {
        // 수락 액션
        val acceptIntent = Intent(context, NotificationActionReceiver::class.java).apply {
            action = ACTION_ACCEPT
            putExtra("request_id", requestId)
        }
        val acceptPI = PendingIntent.getBroadcast(
            context, 1, acceptIntent, PendingIntent.FLAG_IMMUTABLE
        )

        // 거절 액션
        val declineIntent = Intent(context, NotificationActionReceiver::class.java).apply {
            action = ACTION_DECLINE
            putExtra("request_id", requestId)
        }
        val declinePI = PendingIntent.getBroadcast(
            context, 2, declineIntent, PendingIntent.FLAG_IMMUTABLE
        )

        // 텍스트 인라인 입력 (Direct Reply)
        val remoteInput = RemoteInput.Builder(KEY_REPLY_TEXT)
            .setLabel("답장 입력...")
            .build()

        val replyIntent = Intent(context, NotificationActionReceiver::class.java).apply {
            action = ACTION_REPLY
            putExtra("request_id", requestId)
        }
        val replyPI = PendingIntent.getBroadcast(
            context, 3, replyIntent, PendingIntent.FLAG_MUTABLE
        )
        val replyAction = NotificationCompat.Action.Builder(
            R.drawable.ic_reply, "답장", replyPI
        ).addRemoteInput(remoteInput).build()

        return NotificationCompat.Builder(context, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(title)
            .setContentText(body)
            .addAction(R.drawable.ic_check, "수락", acceptPI)
            .addAction(R.drawable.ic_close, "거절", declinePI)
            .addAction(replyAction)
            .build()
    }
}

// BroadcastReceiver에서 액션 처리
class NotificationActionReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val requestId = intent.getStringExtra("request_id") ?: return

        when (intent.action) {
            ACTION_REPLY -> {
                val replyText = RemoteInput.getResultsFromIntent(intent)
                    ?.getCharSequence(KEY_REPLY_TEXT)?.toString()
                // 알림 업데이트 (답장 완료 표시)
                ApiService.sendReply(requestId, replyText ?: "")
            }
            ACTION_ACCEPT -> ApiService.acceptRequest(requestId)
            ACTION_DECLINE -> ApiService.declineRequest(requestId)
        }
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// Web — Notification Actions (Service Worker)
// ⚠️ actions는 Service Worker 알림에서만 동작 (new Notification()은 미지원)
// ⚠️ 텍스트 입력(inline reply) 미지원 — 클릭 시 앱으로 이동하는 방식만 가능

// 액션 포함 알림 표시
self.addEventListener('push', (event: PushEvent) => {
    const data = event.data?.json() ?? {};

    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: '/icon-192.png',
            tag: \`request-\${data.requestId}\`,
            data: { requestId: data.requestId },
            // actions: 최대 2개 (OS 및 브라우저 제한)
            actions: [
                {
                    action: 'accept',
                    title: '수락',
                    icon: '/icons/check-green.png',
                },
                {
                    action: 'decline',
                    title: '거절',
                    icon: '/icons/x-red.png',
                },
            ],
            requireInteraction: true,  // 액션 버튼 알림은 유지되어야 유용
        })
    );
});

// 액션 클릭 처리
self.addEventListener('notificationclick', (event: NotificationEvent) => {
    event.notification.close();

    const { requestId } = event.notification.data;
    const action = event.action;  // 'accept' | 'decline' | '' (기본 탭)

    event.waitUntil((async () => {
        if (action === 'accept') {
            // 백그라운드에서 API 호출
            await fetch(\`/api/requests/\${requestId}/accept\`, { method: 'POST' });
            // 처리 완료 알림 (선택)
            await self.registration.showNotification('수락 완료', {
                body: '요청을 수락했습니다.',
                tag: \`request-\${requestId}-result\`,
            });
        } else if (action === 'decline') {
            await fetch(\`/api/requests/\${requestId}/decline\`, { method: 'POST' });
        } else {
            // 기본 탭 — 앱의 해당 화면으로 이동
            const clientList = await clients.matchAll({ type: 'window' });
            const target = clientList[0];
            if (target) {
                target.navigate(\`/requests/\${requestId}\`);
                target.focus();
            } else {
                clients.openWindow(\`/requests/\${requestId}\`);
            }
        }
    })());
});`,
    },
    ios: {
      language: 'swift',
      code: `// iOS — 알림 카테고리와 인터랙티브 액션
// UNNotificationCategory + UNNotificationAction으로 구성
// APNs 페이로드의 "category" 키와 매핑

import UserNotifications

class NotificationCategoryRegistrar {

    static func registerCategories() {
        let center = UNUserNotificationCenter.current()

        // ─── 카테고리 1: 친구 요청 ────────────────────────────────────
        let acceptAction = UNNotificationAction(
            identifier: "ACCEPT_ACTION",
            title: "수락",
            options: [.foreground]  // .foreground: 앱을 포그라운드로 가져옴
        )
        let declineAction = UNNotificationAction(
            identifier: "DECLINE_ACTION",
            title: "거절",
            options: [.destructive]  // .destructive: 빨간색 표시
        )
        let friendRequestCategory = UNNotificationCategory(
            identifier: "FRIEND_REQUEST",
            actions: [acceptAction, declineAction],
            intentIdentifiers: [],
            options: [.customDismissAction]  // 스와이프 삭제도 didReceive로 알림
        )

        // ─── 카테고리 2: 메시지 (텍스트 인라인 답장) ─────────────────
        let replyAction = UNTextInputNotificationAction(
            identifier: "REPLY_ACTION",
            title: "답장",
            options: [],
            textInputButtonTitle: "전송",
            textInputPlaceholder: "메시지를 입력하세요..."
        )
        let likeAction = UNNotificationAction(
            identifier: "LIKE_ACTION",
            title: "좋아요 ❤️",
            options: []  // 백그라운드에서 처리 (앱 포그라운드 불필요)
        )
        let messageCategory = UNNotificationCategory(
            identifier: "MESSAGE",
            actions: [replyAction, likeAction],
            intentIdentifiers: [
                "INSendMessageIntent"  // Siri Suggestions, Focus 필터링 통합
            ],
            options: []
        )

        // ─── 카테고리 3: 커스텀 Content Extension UI ─────────────────
        let customUICategory = UNNotificationCategory(
            identifier: "CUSTOM_CATEGORY",
            actions: [],
            intentIdentifiers: [],
            options: [.allowInCarPlay]
        )

        center.setNotificationCategories([
            friendRequestCategory,
            messageCategory,
            customUICategory,
        ])
    }
}

// ─── APNs 서버 페이로드에서 category 지정 ────────────────────────────
// {
//   "aps": {
//     "alert": { "title": "친구 요청", "body": "홍길동님이 친구를 요청했습니다." },
//     "category": "FRIEND_REQUEST",   ← 위에서 등록한 카테고리 identifier
//     "mutable-content": 1
//   },
//   "senderId": "user_123"
// }

// ─── Delegate에서 액션 처리 ────────────────────────────────────────
extension NotificationDelegate {

    func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        didReceive response: UNNotificationResponse,
        withCompletionHandler completionHandler: @escaping () -> Void
    ) {
        let userInfo = response.notification.request.content.userInfo

        switch response.actionIdentifier {

        case "ACCEPT_ACTION":
            let senderId = userInfo["senderId"] as? String ?? ""
            FriendService.shared.acceptRequest(from: senderId)

        case "DECLINE_ACTION":
            let senderId = userInfo["senderId"] as? String ?? ""
            FriendService.shared.declineRequest(from: senderId)

        case "REPLY_ACTION":
            guard let textResponse = response as? UNTextInputNotificationResponse else { break }
            let text = textResponse.userText
            let conversationId = userInfo["conversationId"] as? String ?? ""
            MessageService.shared.send(text: text, to: conversationId)

        case "LIKE_ACTION":
            let messageId = userInfo["messageId"] as? String ?? ""
            MessageService.shared.like(messageId: messageId)

        default:
            break
        }

        completionHandler()
    }
}`,
    },
  },

  notification_extension: {
    caption: 'Notification Service Extension vs FCM 서버 측 처리 vs Service Worker',
    android: {
      language: 'kotlin',
      code: `// Android — FCM + 서버 측 페이로드 변환 (Extension 개념 없음)
// Android에는 iOS Notification Service Extension에 해당하는 클라이언트 측 interceptor 없음
// 대신 FCM 수신 후 onMessageReceived에서 처리

// 1) 서버에서 FCM 전송 시 이미지 URL만 포함
// 2) 클라이언트에서 수신 후 이미지 다운로드 → 알림 표시

class MyFirebaseMessagingService : FirebaseMessagingService() {

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        val title = remoteMessage.notification?.title
            ?: remoteMessage.data["title"] ?: return
        val body = remoteMessage.notification?.body
            ?: remoteMessage.data["body"] ?: ""
        val imageUrl = remoteMessage.data["imageUrl"]
            ?: remoteMessage.notification?.imageUrl?.toString()

        if (imageUrl != null) {
            // 이미지 있으면 비동기 다운로드 후 BigPicture 알림
            CoroutineScope(Dispatchers.IO).launch {
                try {
                    val bitmap = Glide.with(applicationContext)
                        .asBitmap()
                        .load(imageUrl)
                        .submit()
                        .get()

                    val notification = NotificationCompat.Builder(applicationContext, CHANNEL_ID)
                        .setSmallIcon(R.drawable.ic_notification)
                        .setContentTitle(title)
                        .setContentText(body)
                        .setStyle(
                            NotificationCompat.BigPictureStyle()
                                .bigPicture(bitmap)
                                .bigLargeIcon(null as android.graphics.Bitmap?)
                        )
                        .build()

                    val manager = getSystemService(NotificationManager::class.java)
                    manager.notify(System.currentTimeMillis().toInt(), notification)
                } catch (e: Exception) {
                    // 이미지 다운로드 실패 시 기본 알림으로 폴백
                    showSimpleNotification(title, body)
                }
            }
        } else {
            showSimpleNotification(title, body)
        }
    }

    // FCM 콘솔에서 캠페인 발송 시: notification + data 혼합 페이로드 권장
    // notification: 앱 미실행 시 자동 처리 (시스템 트레이)
    // data: 앱 실행 중일 때 onMessageReceived에서 처리
}`,
    },
    web: {
      language: 'typescript',
      code: `// Web — Service Worker가 iOS NSE와 유사한 역할 수행
// push 이벤트 수신 → 콘텐츠 가공 → 알림 표시

// ─── sw.js ────────────────────────────────────────────────────────
self.addEventListener('push', (event: PushEvent) => {
    event.waitUntil(processPushAndShow(event));
});

async function processPushAndShow(event: PushEvent): Promise<void> {
    const rawData = event.data?.json() ?? {};

    // iOS NSE처럼 서버 페이로드를 가공
    const enrichedData = await enrichNotificationData(rawData);

    const options: NotificationOptions = {
        body: enrichedData.body,
        icon: enrichedData.iconUrl ?? '/icon-192.png',
        image: enrichedData.imageUrl,   // 다운로드된 이미지 URL
        badge: '/badge-72.png',
        tag: enrichedData.tag,
        data: enrichedData,
        actions: enrichedData.actions ?? [],
    };

    await self.registration.showNotification(enrichedData.title, options);
}

// 서버에서 추가 데이터 가져오기 (NSE의 네트워크 요청과 동일)
async function enrichNotificationData(raw: Record<string, unknown>): Promise<NotificationPayload> {
    // 1) 암호화된 페이로드 복호화
    if (raw.encrypted) {
        raw = await decryptPayload(raw.encrypted as string);
    }

    // 2) 추가 데이터 fetch (예: 발신자 프로필 이미지)
    if (raw.senderId) {
        try {
            const profile = await fetch(\`/api/users/\${raw.senderId}/profile\`).then(r => r.json());
            raw.iconUrl = profile.avatarUrl;
            raw.senderName = profile.name;
        } catch {
            // 실패해도 기본 알림은 표시
        }
    }

    return raw as NotificationPayload;
}

// ─── 알림 집계 (Notification Grouping) ──────────────────────────
async function groupNotifications(tag: string, newTitle: string): Promise<void> {
    const existing = await self.registration.getNotifications({ tag });

    if (existing.length > 0) {
        existing.forEach(n => n.close());
        await self.registration.showNotification(\`\${existing.length + 1}개의 새 메시지\`, {
            body: \`마지막: \${newTitle}\`,
            tag,
            renotify: true,
        });
    }
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS — Notification Service Extension (NSE) 심화
// NSE는 별도 프로세스 + 별도 번들로 실행 (앱과 독립)
// APNs 페이로드 도달 → NSE 실행 → 콘텐츠 변환 → 시스템 표시

// ─── 주요 사용 사례 ──────────────────────────────────────────────────
// 1. 종단 간 암호화 메시지 복호화
// 2. 이미지/동영상/오디오 첨부 다운로드
// 3. 알림 집계 (그룹핑)
// 4. 배지 카운트 서버 동기화

import UserNotifications
import CryptoKit

class NotificationService: UNNotificationServiceExtension {

    var contentHandler: ((UNNotificationContent) -> Void)?
    var bestAttemptContent: UNMutableNotificationContent?

    override func didReceive(
        _ request: UNNotificationRequest,
        withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void
    ) {
        self.contentHandler = contentHandler
        guard let mutableContent = request.content.mutableCopy() as? UNMutableNotificationContent else {
            contentHandler(request.content)
            return
        }
        self.bestAttemptContent = mutableContent

        Task {
            // 1) 페이로드 복호화 (E2E 암호화 메시지)
            if let encryptedBody = request.content.userInfo["enc"] as? String {
                do {
                    let decrypted = try await decryptMessage(encryptedBody)
                    mutableContent.title = decrypted.senderName
                    mutableContent.body = decrypted.text
                } catch {
                    mutableContent.body = "[암호화된 메시지]"
                }
            }

            // 2) 미디어 첨부 다운로드
            if let mediaURL = request.content.userInfo["mediaUrl"] as? String,
               let url = URL(string: mediaURL) {
                if let attachment = try? await downloadAttachment(from: url) {
                    mutableContent.attachments = [attachment]
                }
            }

            // 3) 앱 그룹 UserDefaults를 통해 앱과 데이터 공유
            // NSE와 앱 본체는 별개 프로세스 — 파일/UserDefaults 직접 공유 불가
            // App Group 사용: com.mycompany.myapp.shared
            let sharedDefaults = UserDefaults(suiteName: "group.com.mycompany.myapp")
            let unreadCount = (sharedDefaults?.integer(forKey: "unread_count") ?? 0) + 1
            sharedDefaults?.set(unreadCount, forKey: "unread_count")
            mutableContent.badge = NSNumber(value: unreadCount)

            contentHandler(mutableContent)
        }
    }

    private func downloadAttachment(from url: URL) async throws -> UNNotificationAttachment {
        let (localURL, _) = try await URLSession.shared.download(from: url)

        // 확장자로 타입 추론 (UNNotificationAttachment이 MIME 대신 확장자 사용)
        let fileExtension = url.pathExtension.isEmpty ? "jpg" : url.pathExtension
        let destinationURL = URL(fileURLWithPath: NSTemporaryDirectory())
            .appendingPathComponent(UUID().uuidString)
            .appendingPathExtension(fileExtension)

        try FileManager.default.moveItem(at: localURL, to: destinationURL)

        return try UNNotificationAttachment(
            identifier: UUID().uuidString,
            url: destinationURL,
            options: nil
        )
    }

    override func serviceExtensionTimeWillExpire() {
        // 시간 초과 직전 — 최선의 콘텐츠로 전달 (첨부 없이라도)
        if let contentHandler, let bestAttemptContent {
            contentHandler(bestAttemptContent)
        }
    }
}

// ─── 메모리/시간 제한 ────────────────────────────────────────────────
// NSE 메모리 제한: ~24MB
// 실행 시간 제한: ~30초
// 네트워크 사용: 가능 (단, 대용량 다운로드는 주의)
// 데이터베이스/코어데이터: 앱 그룹 컨테이너 경로 사용 시 접근 가능`,
    },
  },

  // === src/data/codeBlocks-ch12.ts ===
security_ats: {
    caption: 'App Transport Security vs Android Network Security Config vs CSP/HSTS',
    android: {
      language: 'xml',
      code: `<!-- res/xml/network_security_config.xml -->
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <!-- 모든 트래픽 기본 설정 -->
    <base-config cleartextTrafficPermitted="false">
        <trust-anchors>
            <!-- 시스템 CA만 신뢰 (기본값) -->
            <certificates src="system" />
        </trust-anchors>
    </base-config>

    <!-- 특정 도메인 예외 설정 -->
    <domain-config cleartextTrafficPermitted="false">
        <domain includeSubdomains="true">api.example.com</domain>
        <trust-anchors>
            <certificates src="system" />
            <!-- 사내 CA 추가 신뢰 -->
            <certificates src="@raw/my_ca_cert" />
        </trust-anchors>
        <!-- Certificate Pinning -->
        <pin-set expiration="2026-01-01">
            <pin digest="SHA-256">AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=</pin>
            <pin digest="SHA-256">BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=</pin>
        </pin-set>
    </domain-config>

    <!-- 개발용 로컬 서버 예외 -->
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">10.0.2.2</domain>
    </domain-config>
</network-security-config>

<!-- AndroidManifest.xml 에 연결 -->
<!-- android:networkSecurityConfig="@xml/network_security_config" -->`,
    },
    web: {
      language: 'typescript',
      code: `// 웹: HTTP 응답 헤더로 HSTS + CSP 설정
// Next.js next.config.js 예시
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // HTTPS 강제: 1년간 유지, 서브도메인 포함
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // 콘텐츠 보안 정책
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'nonce-{nonce}'",
              "connect-src 'self' https://api.example.com",
              "img-src 'self' data: https:",
              "upgrade-insecure-requests",
            ].join('; '),
          },
          // 클릭재킹 방지
          { key: 'X-Frame-Options', value: 'DENY' },
          // MIME 스니핑 방지
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Referrer 정책
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

// Express.js + helmet 미들웨어 방식
import helmet from 'helmet';
app.use(helmet({
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "https://api.example.com"],
    },
  },
}));`,
    },
    ios: {
      language: 'swift',
      code: `// iOS: Info.plist에 ATS 설정
// 기본적으로 모든 HTTP 통신 차단 — HTTPS만 허용
// 수동으로 예외를 추가할 때만 Info.plist 수정 필요

/*
Info.plist (XML 형식)

<key>NSAppTransportSecurity</key>
<dict>
    <!-- 기본: 모든 연결에 HTTPS 강제 (기본값이므로 생략 가능) -->
    <key>NSAllowsArbitraryLoads</key>
    <false/>

    <!-- 특정 도메인 예외: 개발 환경 로컬 서버 -->
    <key>NSExceptionDomains</key>
    <dict>
        <key>localhost</key>
        <dict>
            <key>NSExceptionAllowsInsecureHTTPLoads</key>
            <true/>
            <key>NSIncludesSubdomains</key>
            <true/>
        </dict>

        <!-- 사내 테스트 서버 — TLS 1.2 미만도 허용 -->
        <key>internal.corp.example.com</key>
        <dict>
            <key>NSExceptionAllowsInsecureHTTPLoads</key>
            <false/>
            <key>NSExceptionMinimumTLSVersion</key>
            <string>TLSv1.0</string>
            <key>NSExceptionRequiresForwardSecrecy</key>
            <false/>
        </dict>
    </dict>
</dict>
*/

// ⚠️ NSAllowsArbitraryLoads = true 는 App Store 심사에서
//    사유 제출 필요. 프로덕션에서는 절대 사용하지 말 것.

// ATS 준수 여부 런타임 확인
import Foundation

func checkATSCompliance(for url: URL) {
    // URLSession은 ATS 규칙을 자동으로 적용
    // HTTP URL 요청 시 런타임 에러 발생:
    // "App Transport Security has blocked a cleartext HTTP"
    let task = URLSession.shared.dataTask(with: url) { data, response, error in
        if let error = error {
            print("ATS 차단됨: \\(error.localizedDescription)")
        }
    }
    task.resume()
}`,
    },
  },

  security_ssl_pinning: {
    caption: 'SSL Certificate Pinning vs OkHttp CertificatePinner vs Fetch + cert check',
    android: {
      language: 'kotlin',
      code: `// OkHttp CertificatePinner — 공개키 핀닝 (권장)
import okhttp3.CertificatePinner
import okhttp3.OkHttpClient
import java.util.concurrent.TimeUnit

// 1. 핀 값 추출 (sha256/)
// $ openssl s_client -connect api.example.com:443 | \\
//   openssl x509 -pubkey -noout | \\
//   openssl pkey -pubin -outform der | \\
//   openssl dgst -sha256 -binary | base64

val certificatePinner = CertificatePinner.Builder()
    // 리프 인증서 핀 (주 서버)
    .add("api.example.com", "sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=")
    // 백업 핀 (갱신 전 준비)
    .add("api.example.com", "sha256/BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=")
    // 서브도메인 포함
    .add("*.example.com", "sha256/CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC=")
    .build()

val client = OkHttpClient.Builder()
    .certificatePinner(certificatePinner)
    .connectTimeout(30, TimeUnit.SECONDS)
    .build()

// 커스텀 핀닝 실패 처리
class PinningFailureInterceptor : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        return try {
            chain.proceed(chain.request())
        } catch (e: SSLPeerUnverifiedException) {
            // 핀닝 실패 → 보안 이벤트 로깅
            SecurityLogger.logPinningFailure(chain.request().url.host)
            throw e
        }
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// 웹: 브라우저는 인증서 핀닝 직접 지원 안 함
// Node.js 서버사이드 또는 Electron에서만 가능

// Node.js: https 모듈로 핀닝
import https from 'https';
import crypto from 'crypto';
import tls from 'tls';

function createPinnedRequest(hostname: string, expectedPin: string) {
    return new Promise((resolve, reject) => {
        const req = https.request(
            { hostname, port: 443, path: '/', method: 'GET' },
            (res) => {
                // 소켓에서 인증서 추출
                const socket = res.socket as tls.TLSSocket;
                const cert = socket.getPeerCertificate();

                // DER 인코딩된 공개키를 SHA-256으로 해싱
                const pubKeyDer = cert.pubkey;
                const pin = crypto
                    .createHash('sha256')
                    .update(pubKeyDer)
                    .digest('base64');

                if (pin !== expectedPin) {
                    req.destroy(new Error(\`핀닝 실패: \${pin} !== \${expectedPin}\`));
                    return;
                }
                resolve(res);
            }
        );
        req.on('error', reject);
        req.end();
    });
}

// Service Worker에서 fetch 가로채기 (제한적)
// self.addEventListener('fetch', (event) => {
//   // SW는 인증서 정보에 직접 접근 불가
//   // 대신 Certificate Transparency 로그 검증 가능
// });`,
    },
    ios: {
      language: 'swift',
      code: `// URLSession Delegate로 SSL 핀닝 구현
import Foundation
import CryptoKit
import Security

final class SSLPinningDelegate: NSObject, URLSessionDelegate {

    // 신뢰할 공개키 해시 목록 (SHA-256, Base64)
    private let pinnedPublicKeyHashes: Set<String> = [
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",  // 리프 인증서
        "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=",  // 백업 핀
    ]

    func urlSession(
        _ session: URLSession,
        didReceive challenge: URLAuthenticationChallenge,
        completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Void
    ) {
        guard challenge.protectionSpace.authenticationMethod
                == NSURLAuthenticationMethodServerTrust,
              let serverTrust = challenge.protectionSpace.serverTrust
        else {
            completionHandler(.cancelAuthenticationChallenge, nil)
            return
        }

        // 1. 시스템 인증서 검증 먼저 통과시키기
        var secResult = SecTrustResultType.invalid
        SecTrustEvaluateWithError(serverTrust, nil)

        // 2. 서버 인증서 체인에서 공개키 해시 추출
        let certCount = SecTrustGetCertificateCount(serverTrust)
        for i in 0..<certCount {
            guard let cert = SecTrustGetCertificateAtIndex(serverTrust, i),
                  let publicKey = SecCertificateCopyKey(cert),
                  let publicKeyData = SecKeyCopyExternalRepresentation(publicKey, nil) as Data?
            else { continue }

            // SHA-256 해싱
            let hash = SHA256.hash(data: publicKeyData)
            let base64Hash = Data(hash).base64EncodedString()

            if pinnedPublicKeyHashes.contains(base64Hash) {
                // 핀 일치 → 연결 허용
                completionHandler(.useCredential, URLCredential(trust: serverTrust))
                return
            }
        }

        // 핀 불일치 → 연결 거부
        print("⚠️ SSL Pinning 실패: 알 수 없는 인증서")
        completionHandler(.cancelAuthenticationChallenge, nil)
    }
}

// 사용
let session = URLSession(
    configuration: .default,
    delegate: SSLPinningDelegate(),
    delegateQueue: nil
)

// TrustKit 라이브러리 방식 (더 간편)
/*
TrustKit.initSharedInstance(withConfiguration: [
    kTSKSwizzleNetworkDelegates: true,
    kTSKPinnedDomains: [
        "api.example.com": [
            kTSKPublicKeyHashes: [
                "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
                "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=",
            ],
            kTSKEnforcePinning: true,
            kTSKIncludeSubdomains: true,
        ]
    ]
])
*/`,
    },
  },

  security_keychain_store: {
    caption: 'Keychain 저장/조회 vs EncryptedSharedPreferences vs Web Crypto + IndexedDB',
    android: {
      language: 'kotlin',
      code: `// Android: EncryptedSharedPreferences (Jetpack Security)
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey
import android.content.Context

class SecureStorage(private val context: Context) {

    // MasterKey: Android Keystore에 AES-256-GCM 키 생성
    private val masterKey = MasterKey.Builder(context)
        .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
        .build()

    private val prefs = EncryptedSharedPreferences.create(
        context,
        "secure_prefs",          // 파일명
        masterKey,
        EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
        EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
    )

    fun saveToken(key: String, token: String) {
        prefs.edit().putString(key, token).apply()
    }

    fun getToken(key: String): String? {
        return prefs.getString(key, null)
    }

    fun deleteToken(key: String) {
        prefs.edit().remove(key).apply()
    }
}

// Keystore를 직접 사용하는 방법 (고급)
import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import javax.crypto.KeyGenerator

fun generateAndStoreKey(alias: String) {
    val keyGenerator = KeyGenerator.getInstance(
        KeyProperties.KEY_ALGORITHM_AES,
        "AndroidKeyStore"   // 하드웨어 보안 모듈 저장
    )
    keyGenerator.init(
        KeyGenParameterSpec.Builder(
            alias,
            KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT
        )
        .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
        .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
        .setUserAuthenticationRequired(true)    // 생체인증 필요
        .setInvalidatedByBiometricEnrollment(true)
        .build()
    )
    keyGenerator.generateKey()
}`,
    },
    web: {
      language: 'typescript',
      code: `// 웹: Web Crypto API + IndexedDB 조합
// 비밀번호 기반 키 유도 (PBKDF2) + AES-GCM 암호화
class SecureWebStorage {
    private dbName = 'secure-store';
    private storeName = 'vault';

    // PBKDF2로 마스터 키 유도
    async deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
        const baseKey = await crypto.subtle.importKey(
            'raw',
            new TextEncoder().encode(password),
            'PBKDF2',
            false,
            ['deriveKey']
        );
        return crypto.subtle.deriveKey(
            { name: 'PBKDF2', salt, iterations: 310_000, hash: 'SHA-256' },
            baseKey,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt', 'decrypt']
        );
    }

    async encrypt(key: CryptoKey, data: string): Promise<{ iv: string; ciphertext: string }> {
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const encoded = new TextEncoder().encode(data);
        const ciphertext = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            key,
            encoded
        );
        return {
            iv: btoa(String.fromCharCode(...iv)),
            ciphertext: btoa(String.fromCharCode(...new Uint8Array(ciphertext))),
        };
    }

    async saveSecret(id: string, value: string, key: CryptoKey) {
        const encrypted = await this.encrypt(key, value);
        const db = await this.openDB();
        const tx = db.transaction(this.storeName, 'readwrite');
        tx.objectStore(this.storeName).put(encrypted, id);
    }
}

// ⚠️ localStorage/sessionStorage는 XSS에 취약 — 민감 정보 저장 금지
// HttpOnly 쿠키가 토큰 저장의 가장 안전한 웹 방식`,
    },
    ios: {
      language: 'swift',
      code: `// iOS Keychain — 보안 자격증명 저장소
import Foundation
import Security

enum KeychainError: Error {
    case duplicateEntry
    case itemNotFound
    case unexpectedData
    case unhandledError(status: OSStatus)
}

struct KeychainManager {

    // MARK: - 저장 (Create)
    static func save(
        key: String,
        value: String,
        service: String = Bundle.main.bundleIdentifier ?? "app",
        accessGroup: String? = nil    // App Group 공유용
    ) throws {
        guard let data = value.data(using: .utf8) else { return }

        var query: [String: Any] = [
            kSecClass as String:       kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: key,
            kSecValueData as String:   data,
            // 기기 잠금 해제 시에만 접근 가능 (백업 제외)
            kSecAttrAccessible as String: kSecAttrAccessibleWhenUnlockedThisDeviceOnly,
        ]
        if let group = accessGroup {
            query[kSecAttrAccessGroup as String] = group
        }

        let status = SecItemAdd(query as CFDictionary, nil)
        switch status {
        case errSecSuccess: break
        case errSecDuplicateItem:
            // 이미 존재하면 업데이트
            try update(key: key, value: value, service: service)
        default:
            throw KeychainError.unhandledError(status: status)
        }
    }

    // MARK: - 조회 (Read)
    static func load(key: String, service: String = Bundle.main.bundleIdentifier ?? "app") throws -> String {
        let query: [String: Any] = [
            kSecClass as String:            kSecClassGenericPassword,
            kSecAttrService as String:      service,
            kSecAttrAccount as String:      key,
            kSecReturnData as String:       true,
            kSecMatchLimit as String:       kSecMatchLimitOne,
        ]
        var result: AnyObject?
        let status = SecItemCopyMatching(query as CFDictionary, &result)

        guard status == errSecSuccess else {
            if status == errSecItemNotFound { throw KeychainError.itemNotFound }
            throw KeychainError.unhandledError(status: status)
        }
        guard let data = result as? Data,
              let string = String(data: data, encoding: .utf8)
        else { throw KeychainError.unexpectedData }
        return string
    }

    // MARK: - 삭제 (Delete)
    static func delete(key: String, service: String = Bundle.main.bundleIdentifier ?? "app") throws {
        let query: [String: Any] = [
            kSecClass as String:       kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: key,
        ]
        let status = SecItemDelete(query as CFDictionary)
        guard status == errSecSuccess || status == errSecItemNotFound else {
            throw KeychainError.unhandledError(status: status)
        }
    }

    // MARK: - 업데이트 (Update)
    static func update(key: String, value: String, service: String) throws {
        guard let data = value.data(using: .utf8) else { return }
        let query: [String: Any] = [
            kSecClass as String:       kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: key,
        ]
        let attributes: [String: Any] = [kSecValueData as String: data]
        let status = SecItemUpdate(query as CFDictionary, attributes as CFDictionary)
        guard status == errSecSuccess else {
            throw KeychainError.unhandledError(status: status)
        }
    }
}

// 사용 예시
do {
    try KeychainManager.save(key: "auth_token", value: "eyJhbGci...")
    let token = try KeychainManager.load(key: "auth_token")
    print("토큰 로드: \\(token)")
    try KeychainManager.delete(key: "auth_token")
} catch {
    print("Keychain 오류: \\(error)")
}`,
    },
  },

  security_cryptokit_hash: {
    caption: 'CryptoKit 해싱 vs MessageDigest vs SubtleCrypto',
    android: {
      language: 'kotlin',
      code: `// Android: MessageDigest로 해싱
import java.security.MessageDigest
import android.util.Base64

object HashUtils {

    // SHA-256 해싱
    fun sha256(input: String): String {
        val digest = MessageDigest.getInstance("SHA-256")
        val hashBytes = digest.digest(input.toByteArray(Charsets.UTF_8))
        return hashBytes.joinToString("") { "%02x".format(it) }
    }

    // SHA-256 → Base64 (전송용)
    fun sha256Base64(input: String): String {
        val digest = MessageDigest.getInstance("SHA-256")
        val hashBytes = digest.digest(input.toByteArray(Charsets.UTF_8))
        return Base64.encodeToString(hashBytes, Base64.NO_WRAP)
    }

    // HMAC-SHA256 — 메시지 인증 코드
    fun hmacSha256(message: String, secret: String): String {
        import javax.crypto.Mac
        import javax.crypto.spec.SecretKeySpec
        val mac = Mac.getInstance("HmacSHA256")
        val keySpec = SecretKeySpec(secret.toByteArray(), "HmacSHA256")
        mac.init(keySpec)
        return mac.doFinal(message.toByteArray()).joinToString("") { "%02x".format(it) }
    }

    // 파일 해싱 (스트리밍)
    fun hashFile(inputStream: InputStream): String {
        val digest = MessageDigest.getInstance("SHA-256")
        val buffer = ByteArray(8192)
        var bytesRead: Int
        while (inputStream.read(buffer).also { bytesRead = it } != -1) {
            digest.update(buffer, 0, bytesRead)
        }
        return digest.digest().joinToString("") { "%02x".format(it) }
    }
}

// Guava 사용 시 더 간단
// Hashing.sha256().hashString(input, Charsets.UTF_8).toString()`,
    },
    web: {
      language: 'typescript',
      code: `// 웹: SubtleCrypto API — 비동기 해싱
async function sha256(message: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    // ArrayBuffer → hex string
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// SHA-256 → Base64
async function sha256Base64(message: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const base64 = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
    return base64;
}

// HMAC-SHA256
async function hmacSha256(message: string, secret: string): Promise<string> {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        encoder.encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );
    const signature = await crypto.subtle.sign(
        'HMAC',
        keyMaterial,
        encoder.encode(message)
    );
    return Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// Node.js에서는 crypto 모듈 사용
// import { createHash, createHmac } from 'crypto';
// createHash('sha256').update(message).digest('hex')`,
    },
    ios: {
      language: 'swift',
      code: `// CryptoKit — Apple의 고수준 암호화 프레임워크 (iOS 13+)
import CryptoKit
import Foundation

// MARK: - SHA 해싱 계열
struct HashingExamples {

    // SHA-256 해싱 (가장 일반적)
    static func sha256(input: String) -> String {
        let inputData = Data(input.utf8)
        let hashed = SHA256.hash(data: inputData)
        return hashed.compactMap { String(format: "%02x", $0) }.joined()
    }

    // SHA-384
    static func sha384(input: String) -> String {
        let hashed = SHA384.hash(data: Data(input.utf8))
        return hashed.compactMap { String(format: "%02x", $0) }.joined()
    }

    // SHA-512
    static func sha512(input: String) -> String {
        let hashed = SHA512.hash(data: Data(input.utf8))
        return hashed.compactMap { String(format: "%02x", $0) }.joined()
    }

    // SHA-256 → Data (바이너리 전송용)
    static func sha256Data(input: Data) -> Data {
        Data(SHA256.hash(data: input))
    }

    // MARK: - HMAC — 메시지 인증 코드
    static func hmacSHA256(message: String, key: String) -> String {
        let messageData = Data(message.utf8)
        let keyData = SymmetricKey(data: Data(key.utf8))
        let mac = HMAC<SHA256>.authenticationCode(for: messageData, using: keyData)
        return Data(mac).map { String(format: "%02x", $0) }.joined()
    }

    // HMAC 검증
    static func verifyHMAC(message: String, key: String, expectedMAC: String) -> Bool {
        let computed = hmacSHA256(message: message, key: key)
        return computed == expectedMAC  // 상수 시간 비교는 HMAC.isValidAuthenticationCode 사용
    }

    // MARK: - 파일 해싱
    static func hashFile(url: URL) throws -> String {
        let data = try Data(contentsOf: url)
        let hashed = SHA256.hash(data: data)
        return hashed.compactMap { String(format: "%02x", $0) }.joined()
    }

    // MARK: - 비밀번호 해싱 (단방향, Insecure.MD5 사용 예시)
    // ⚠️ 비밀번호는 반드시 bcrypt/Argon2 같은 KDF 사용
    //    CryptoKit은 SHA 계열만 제공 — 서버에서 처리 권장
}

// 사용 예시
let hash = HashingExamples.sha256(input: "Hello, iOS Security!")
print(hash)  // "a665a45920422f9d...

let mac = HashingExamples.hmacSHA256(
    message: "payment:1000:USD",
    key: "super-secret-key"
)`,
    },
  },

  security_cryptokit_encrypt: {
    caption: 'CryptoKit 대칭 암호화 vs Android AES/GCM vs SubtleCrypto encrypt',
    android: {
      language: 'kotlin',
      code: `// Android: AES-GCM 대칭 암호화
import javax.crypto.Cipher
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey
import javax.crypto.spec.GCMParameterSpec
import android.util.Base64

object AESGCMCipher {

    private const val ALGORITHM = "AES/GCM/NoPadding"
    private const val KEY_SIZE = 256
    private const val GCM_IV_LENGTH = 12   // 96 bits
    private const val GCM_TAG_LENGTH = 128  // bits

    // 키 생성 (메모리 보관 — Keystore 사용 권장)
    fun generateKey(): SecretKey {
        val generator = KeyGenerator.getInstance("AES")
        generator.init(KEY_SIZE)
        return generator.generateKey()
    }

    // 암호화 → IV + 암호문 반환
    fun encrypt(plaintext: String, key: SecretKey): Pair<ByteArray, ByteArray> {
        val cipher = Cipher.getInstance(ALGORITHM)
        cipher.init(Cipher.ENCRYPT_MODE, key)
        val iv = cipher.iv  // 자동 생성된 IV
        val ciphertext = cipher.doFinal(plaintext.toByteArray(Charsets.UTF_8))
        return Pair(iv, ciphertext)
    }

    // 복호화
    fun decrypt(ciphertext: ByteArray, iv: ByteArray, key: SecretKey): String {
        val cipher = Cipher.getInstance(ALGORITHM)
        val spec = GCMParameterSpec(GCM_TAG_LENGTH, iv)
        cipher.init(Cipher.DECRYPT_MODE, key, spec)
        return String(cipher.doFinal(ciphertext), Charsets.UTF_8)
    }

    // Base64로 직렬화 (저장/전송용)
    fun encryptToBase64(plaintext: String, key: SecretKey): String {
        val (iv, ciphertext) = encrypt(plaintext, key)
        // IV + 암호문을 한 문자열로 합치기 (앞 12바이트 = IV)
        val combined = iv + ciphertext
        return Base64.encodeToString(combined, Base64.NO_WRAP)
    }

    fun decryptFromBase64(encoded: String, key: SecretKey): String {
        val combined = Base64.decode(encoded, Base64.NO_WRAP)
        val iv = combined.slice(0 until GCM_IV_LENGTH).toByteArray()
        val ciphertext = combined.slice(GCM_IV_LENGTH until combined.size).toByteArray()
        return decrypt(ciphertext, iv, key)
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// 웹: SubtleCrypto AES-GCM 암호화
class AESGCMCrypto {
    private static readonly KEY_USAGES: KeyUsage[] = ['encrypt', 'decrypt'];

    // 키 생성
    static async generateKey(): Promise<CryptoKey> {
        return crypto.subtle.generateKey(
            { name: 'AES-GCM', length: 256 },
            true,       // extractable — 내보낼 수 있어야 저장 가능
            this.KEY_USAGES
        );
    }

    // 키 내보내기 (IndexedDB 저장용)
    static async exportKey(key: CryptoKey): Promise<string> {
        const raw = await crypto.subtle.exportKey('raw', key);
        return btoa(String.fromCharCode(...new Uint8Array(raw)));
    }

    // 암호화
    static async encrypt(plaintext: string, key: CryptoKey): Promise<string> {
        const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV
        const encoded = new TextEncoder().encode(plaintext);

        const ciphertext = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv, tagLength: 128 },
            key,
            encoded
        );

        // IV(12) + 암호문 결합 → Base64
        const combined = new Uint8Array(12 + ciphertext.byteLength);
        combined.set(iv, 0);
        combined.set(new Uint8Array(ciphertext), 12);
        return btoa(String.fromCharCode(...combined));
    }

    // 복호화
    static async decrypt(encoded: string, key: CryptoKey): Promise<string> {
        const combined = Uint8Array.from(atob(encoded), c => c.charCodeAt(0));
        const iv = combined.slice(0, 12);
        const ciphertext = combined.slice(12);

        const decrypted = await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv, tagLength: 128 },
            key,
            ciphertext
        );
        return new TextDecoder().decode(decrypted);
    }
}`,
    },
    ios: {
      language: 'swift',
      code: `// CryptoKit: AES-GCM 대칭 암호화 (iOS 13+)
import CryptoKit
import Foundation

struct AESGCMCrypto {

    // MARK: - 키 생성
    static func generateKey() -> SymmetricKey {
        // 256비트 AES 키 생성 (SecureRandom 기반)
        return SymmetricKey(size: .bits256)
    }

    // MARK: - 키 직렬화 (Keychain 저장용)
    static func keyToData(_ key: SymmetricKey) -> Data {
        key.withUnsafeBytes { Data($0) }
    }

    static func keyFromData(_ data: Data) -> SymmetricKey {
        SymmetricKey(data: data)
    }

    // MARK: - 암호화
    static func encrypt(plaintext: String, using key: SymmetricKey) throws -> Data {
        let plaintextData = Data(plaintext.utf8)
        // AES.GCM.seal: IV 자동 생성, GCM 인증 태그 포함
        let sealedBox = try AES.GCM.seal(plaintextData, using: key)
        // combined = nonce(12) + ciphertext + tag(16)
        return sealedBox.combined!
    }

    // MARK: - 복호화
    static func decrypt(cipherData: Data, using key: SymmetricKey) throws -> String {
        let sealedBox = try AES.GCM.SealedBox(combined: cipherData)
        let decryptedData = try AES.GCM.open(sealedBox, using: key)
        guard let plaintext = String(data: decryptedData, encoding: .utf8) else {
            throw CryptoError.invalidData
        }
        return plaintext
    }

    // MARK: - ChaCha20-Poly1305 (더 빠름, 특히 하드웨어 AES 없는 기기)
    static func encryptChaCha(plaintext: String, using key: SymmetricKey) throws -> Data {
        let plaintextData = Data(plaintext.utf8)
        let sealedBox = try ChaChaPoly.seal(plaintextData, using: key)
        return sealedBox.combined
    }

    static func decryptChaCha(cipherData: Data, using key: SymmetricKey) throws -> String {
        let sealedBox = try ChaChaPoly.SealedBox(combined: cipherData)
        let decryptedData = try ChaChaPoly.open(sealedBox, using: key)
        return String(data: decryptedData, encoding: .utf8)!
    }
}

enum CryptoError: Error {
    case invalidData
    case encryptionFailed
}

// MARK: - 비대칭 암호화: P-256 키 쌍 + ECDH
struct ECDHKeyExchange {

    // 본인 키 쌍 생성
    static func generateKeyPair() -> P256.KeyAgreement.PrivateKey {
        P256.KeyAgreement.PrivateKey()
    }

    // 공유 비밀 유도 (ECDH)
    static func sharedSecret(
        privateKey: P256.KeyAgreement.PrivateKey,
        peerPublicKey: P256.KeyAgreement.PublicKey
    ) throws -> SymmetricKey {
        let sharedSecret = try privateKey.sharedSecretFromKeyAgreement(with: peerPublicKey)
        // HKDF로 대칭 키 유도
        return sharedSecret.hkdfDerivedSymmetricKey(
            using: SHA256.self,
            salt: Data("iOS-ECDH-Salt".utf8),
            sharedInfo: Data(),
            outputByteCount: 32
        )
    }
}

// 사용 예시
let key = AESGCMCrypto.generateKey()
let encrypted = try AESGCMCrypto.encrypt(plaintext: "민감한 데이터", using: key)
let decrypted = try AESGCMCrypto.decrypt(cipherData: encrypted, using: key)

// Keychain에 키 저장
try KeychainManager.save(
    key: "aes_key",
    value: AESGCMCrypto.keyToData(key).base64EncodedString()
)`,
    },
  },

  security_oauth: {
    caption: 'ASWebAuthenticationSession OAuth vs Chrome Custom Tabs vs window.open OAuth',
    android: {
      language: 'kotlin',
      code: `// Android: Chrome Custom Tabs + AppAuth-Android
import net.openid.appauth.*
import android.content.Intent
import android.net.Uri

class OAuthManager(private val activity: AppCompatActivity) {

    private lateinit var authService: AuthorizationService
    private lateinit var authState: AuthState

    fun initialize() {
        authService = AuthorizationService(activity)
        authState = AuthState(AuthorizationServiceConfiguration(
            Uri.parse("https://accounts.google.com/o/oauth2/v2/auth"),
            Uri.parse("https://oauth2.googleapis.com/token")
        ))
    }

    // Authorization Code + PKCE 플로우
    fun startOAuth(clientId: String, redirectUri: String) {
        val config = AuthorizationServiceConfiguration(
            Uri.parse("https://accounts.google.com/o/oauth2/v2/auth"),
            Uri.parse("https://oauth2.googleapis.com/token")
        )

        // PKCE: code_verifier 자동 생성
        val request = AuthorizationRequest.Builder(
            config,
            clientId,
            ResponseTypeValues.CODE,
            Uri.parse(redirectUri)
        )
        .setScope("openid profile email")
        .build()

        // Chrome Custom Tab으로 열기
        val authIntent = authService.getAuthorizationRequestIntent(request)
        activity.startActivityForResult(authIntent, RC_AUTH)
    }

    // 콜백 처리 (onActivityResult)
    fun handleCallback(data: Intent?) {
        val response = AuthorizationResponse.fromIntent(data ?: return)
        val exception = AuthorizationException.fromIntent(data)

        authState.update(response, exception)

        response?.let { authResponse ->
            // Authorization Code → Access Token 교환
            authService.performTokenRequest(
                authResponse.createTokenExchangeRequest()
            ) { tokenResponse, tokenException ->
                authState.update(tokenResponse, tokenException)
                val accessToken = authState.accessToken
                // 토큰 저장 및 사용
            }
        }
    }

    companion object { const val RC_AUTH = 100 }
}`,
    },
    web: {
      language: 'typescript',
      code: `// 웹: OAuth 2.0 PKCE 플로우 (SPA)
class WebOAuthClient {
    private config = {
        authEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenEndpoint: 'https://oauth2.googleapis.com/token',
        clientId: 'YOUR_CLIENT_ID',
        redirectUri: \`\${window.location.origin}/callback\`,
        scope: 'openid profile email',
    };

    // PKCE: code_verifier 생성
    private async generatePKCE() {
        const verifier = crypto.randomUUID().replace(/-/g, '') + crypto.randomUUID().replace(/-/g, '');
        const encoder = new TextEncoder();
        const data = encoder.encode(verifier);
        const digest = await crypto.subtle.digest('SHA-256', data);
        const challenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
            .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
        return { verifier, challenge };
    }

    async startOAuth() {
        const { verifier, challenge } = await this.generatePKCE();
        const state = crypto.randomUUID();

        // CSRF 방지용 state, verifier 저장
        sessionStorage.setItem('oauth_state', state);
        sessionStorage.setItem('code_verifier', verifier);

        const params = new URLSearchParams({
            client_id: this.config.clientId,
            redirect_uri: this.config.redirectUri,
            response_type: 'code',
            scope: this.config.scope,
            state,
            code_challenge: challenge,
            code_challenge_method: 'S256',
        });

        // 팝업 대신 리다이렉트 방식 (보안상 권장)
        window.location.href = \`\${this.config.authEndpoint}?\${params}\`;
    }

    async handleCallback(code: string, returnedState: string) {
        const savedState = sessionStorage.getItem('oauth_state');
        if (returnedState !== savedState) throw new Error('State mismatch — CSRF 의심');

        const verifier = sessionStorage.getItem('code_verifier')!;

        // 토큰 교환 (서버사이드 권장 — client_secret 노출 방지)
        const response = await fetch(this.config.tokenEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri: this.config.redirectUri,
                client_id: this.config.clientId,
                code_verifier: verifier,
            }),
        });
        return response.json();
    }
}`,
    },
    ios: {
      language: 'swift',
      code: `// ASWebAuthenticationSession — iOS 12+ 공식 OAuth 지원
import AuthenticationServices
import CryptoKit

class OAuthManager: NSObject {

    private var session: ASWebAuthenticationSession?

    // MARK: - PKCE 생성
    private func generatePKCE() -> (verifier: String, challenge: String) {
        // 43~128자 랜덤 문자열
        var buffer = [UInt8](repeating: 0, count: 64)
        _ = SecRandomCopyBytes(kSecRandomDefault, buffer.count, &buffer)
        let verifier = Data(buffer).base64EncodedString()
            .replacingOccurrences(of: "+", with: "-")
            .replacingOccurrences(of: "/", with: "_")
            .replacingOccurrences(of: "=", with: "")

        // SHA-256(verifier) → Base64URL
        let challengeData = Data(SHA256.hash(data: Data(verifier.utf8)))
        let challenge = challengeData.base64EncodedString()
            .replacingOccurrences(of: "+", with: "-")
            .replacingOccurrences(of: "/", with: "_")
            .replacingOccurrences(of: "=", with: "")

        return (verifier, challenge)
    }

    // MARK: - OAuth 시작
    func startOAuth(
        clientID: String,
        redirectScheme: String,
        completion: @escaping (Result<String, Error>) -> Void
    ) {
        let (verifier, challenge) = generatePKCE()
        let state = UUID().uuidString

        // state, verifier 임시 저장
        UserDefaults.standard.set(state, forKey: "oauth_state")
        UserDefaults.standard.set(verifier, forKey: "code_verifier")

        var components = URLComponents(string: "https://accounts.google.com/o/oauth2/v2/auth")!
        components.queryItems = [
            .init(name: "client_id",             value: clientID),
            .init(name: "redirect_uri",          value: "\\(redirectScheme)://oauth/callback"),
            .init(name: "response_type",         value: "code"),
            .init(name: "scope",                 value: "openid profile email"),
            .init(name: "state",                 value: state),
            .init(name: "code_challenge",        value: challenge),
            .init(name: "code_challenge_method", value: "S256"),
        ]

        // ASWebAuthenticationSession: Safari 쿠키/세션 공유 → SSO 가능
        session = ASWebAuthenticationSession(
            url: components.url!,
            callbackURLScheme: redirectScheme
        ) { [weak self] callbackURL, error in
            guard let self else { return }
            if let error { completion(.failure(error)); return }

            guard let url = callbackURL,
                  let components = URLComponents(url: url, resolvingAgainstBaseURL: false),
                  let code  = components.queryItems?.first(where: { $0.name == "code" })?.value,
                  let returnedState = components.queryItems?.first(where: { $0.name == "state" })?.value
            else {
                completion(.failure(OAuthError.invalidCallback))
                return
            }

            // state 검증 (CSRF 방지)
            let savedState = UserDefaults.standard.string(forKey: "oauth_state")
            guard returnedState == savedState else {
                completion(.failure(OAuthError.stateMismatch))
                return
            }

            completion(.success(code))
        }

        session?.prefersEphemeralWebBrowserSession = false  // SSO 쿠키 허용
        session?.presentationContextProvider = self
        session?.start()
    }

    // MARK: - Authorization Code → Access Token 교환
    func exchangeCode(_ code: String, clientID: String) async throws -> OAuthToken {
        guard let verifier = UserDefaults.standard.string(forKey: "code_verifier") else {
            throw OAuthError.missingVerifier
        }

        var request = URLRequest(url: URL(string: "https://oauth2.googleapis.com/token")!)
        request.httpMethod = "POST"
        request.setValue("application/x-www-form-urlencoded", forHTTPHeaderField: "Content-Type")

        let params = [
            "grant_type=authorization_code",
            "code=\\(code)",
            "redirect_uri=myapp://oauth/callback",
            "client_id=\\(clientID)",
            "code_verifier=\\(verifier)",
        ].joined(separator: "&")
        request.httpBody = params.data(using: .utf8)

        let (data, _) = try await URLSession.shared.data(for: request)
        return try JSONDecoder().decode(OAuthToken.self, from: data)
    }
}

extension OAuthManager: ASWebAuthenticationPresentationContextProviding {
    func presentationAnchor(for session: ASWebAuthenticationSession) -> ASPresentationAnchor {
        UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .first?.windows.first ?? UIWindow()
    }
}

enum OAuthError: Error {
    case invalidCallback, stateMismatch, missingVerifier
}

struct OAuthToken: Decodable {
    let accessToken: String
    let tokenType: String
    let expiresIn: Int
    let idToken: String?
    enum CodingKeys: String, CodingKey {
        case accessToken = "access_token"
        case tokenType = "token_type"
        case expiresIn = "expires_in"
        case idToken = "id_token"
    }
}`,
    },
  },

  security_biometrics: {
    caption: 'LocalAuthentication (Face ID/Touch ID) vs BiometricPrompt vs WebAuthn',
    android: {
      language: 'kotlin',
      code: `// Android: BiometricPrompt (API 28+)
import androidx.biometric.BiometricManager
import androidx.biometric.BiometricPrompt
import androidx.core.content.ContextCompat
import androidx.fragment.app.FragmentActivity

class BiometricAuthManager(private val activity: FragmentActivity) {

    // 생체인증 지원 여부 확인
    fun canAuthenticate(): Boolean {
        val manager = BiometricManager.from(activity)
        return when (manager.canAuthenticate(BiometricManager.Authenticators.BIOMETRIC_STRONG)) {
            BiometricManager.BIOMETRIC_SUCCESS -> true
            BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE -> false
            BiometricManager.BIOMETRIC_ERROR_HW_UNAVAILABLE -> false
            BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED -> false
            else -> false
        }
    }

    fun authenticate(
        onSuccess: (BiometricPrompt.AuthenticationResult) -> Unit,
        onError: (Int, CharSequence) -> Unit,
        onFailed: () -> Unit,
    ) {
        val executor = ContextCompat.getMainExecutor(activity)
        val callback = object : BiometricPrompt.AuthenticationCallback() {
            override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                onSuccess(result)
            }
            override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
                onError(errorCode, errString)
            }
            override fun onAuthenticationFailed() {
                onFailed()
            }
        }

        val promptInfo = BiometricPrompt.PromptInfo.Builder()
            .setTitle("생체인증")
            .setSubtitle("앱 잠금 해제")
            .setDescription("지문 또는 얼굴 인식으로 인증하세요")
            .setAllowedAuthenticators(
                BiometricManager.Authenticators.BIOMETRIC_STRONG or
                BiometricManager.Authenticators.DEVICE_CREDENTIAL
            )
            .build()

        val biometricPrompt = BiometricPrompt(activity, executor, callback)
        biometricPrompt.authenticate(promptInfo)
    }

    // Keystore 연동 — 인증 후 키 사용 가능
    fun authenticateWithCrypto(
        cryptoObject: BiometricPrompt.CryptoObject,
        onSuccess: (BiometricPrompt.AuthenticationResult) -> Unit,
    ) {
        val executor = ContextCompat.getMainExecutor(activity)
        val callback = object : BiometricPrompt.AuthenticationCallback() {
            override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                // result.cryptoObject?.cipher 로 암호화/복호화 가능
                onSuccess(result)
            }
            override fun onAuthenticationError(errorCode: Int, errString: CharSequence) { }
            override fun onAuthenticationFailed() { }
        }
        val promptInfo = BiometricPrompt.PromptInfo.Builder()
            .setTitle("생체인증")
            .setAllowedAuthenticators(BiometricManager.Authenticators.BIOMETRIC_STRONG)
            .setNegativeButtonText("취소")
            .build()
        BiometricPrompt(activity, executor, callback).authenticate(promptInfo, cryptoObject)
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// 웹: WebAuthn API (FIDO2 / Passkeys)
class WebAuthnManager {

    // 등록 (생체인증 자격증명 생성)
    async register(userId: string, username: string) {
        // 서버에서 challenge 받기
        const challengeBytes = crypto.getRandomValues(new Uint8Array(32));

        const credential = await navigator.credentials.create({
            publicKey: {
                challenge: challengeBytes,
                rp: { name: 'My App', id: window.location.hostname },
                user: {
                    id: new TextEncoder().encode(userId),
                    name: username,
                    displayName: username,
                },
                pubKeyCredParams: [
                    { alg: -7,   type: 'public-key' }, // ES256 (P-256)
                    { alg: -257, type: 'public-key' }, // RS256
                ],
                authenticatorSelection: {
                    authenticatorAttachment: 'platform', // 기기 내장 인증기
                    userVerification: 'required',         // 생체인증 필수
                    residentKey: 'required',              // Passkey
                },
                timeout: 60000,
            },
        }) as PublicKeyCredential;

        // 서버에 등록 정보 전송
        const response = credential.response as AuthenticatorAttestationResponse;
        await fetch('/api/webauthn/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: credential.id,
                rawId: btoa(String.fromCharCode(...new Uint8Array(credential.rawId))),
                attestationObject: btoa(String.fromCharCode(...new Uint8Array(response.attestationObject))),
                clientDataJSON: btoa(String.fromCharCode(...new Uint8Array(response.clientDataJSON))),
            }),
        });
    }

    // 인증 (로그인)
    async authenticate() {
        const challengeBytes = crypto.getRandomValues(new Uint8Array(32));

        const assertion = await navigator.credentials.get({
            publicKey: {
                challenge: challengeBytes,
                userVerification: 'required',
                timeout: 60000,
            },
        }) as PublicKeyCredential;

        const response = assertion.response as AuthenticatorAssertionResponse;
        // 서버에서 서명 검증
        return fetch('/api/webauthn/authenticate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: assertion.id, /* ... */ }),
        });
    }
}`,
    },
    ios: {
      language: 'swift',
      code: `// LocalAuthentication — Face ID / Touch ID / Passcode
import LocalAuthentication
import SwiftUI

class BiometricAuthManager: ObservableObject {

    @Published var isAuthenticated = false
    @Published var errorMessage: String?

    private let context = LAContext()

    // MARK: - 지원 여부 확인
    var biometricType: LABiometryType {
        var error: NSError?
        guard context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) else {
            return .none
        }
        return context.biometryType
    }

    var biometricDisplayName: String {
        switch biometricType {
        case .faceID:    return "Face ID"
        case .touchID:   return "Touch ID"
        case .opticID:   return "Optic ID"  // Apple Vision Pro
        default:         return "생체인증 불가"
        }
    }

    // MARK: - 생체인증 실행
    @MainActor
    func authenticate(reason: String = "앱 잠금 해제") async {
        let context = LAContext()
        var error: NSError?

        // 생체인증 가능 여부 확인
        guard context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) else {
            errorMessage = error?.localizedDescription ?? "생체인증 미지원"
            return
        }

        do {
            // .deviceOwnerAuthenticationWithBiometrics: 생체인증만
            // .deviceOwnerAuthentication: 생체인증 실패 시 passcode 폴백
            let success = try await context.evaluatePolicy(
                .deviceOwnerAuthentication,
                localizedReason: reason
            )
            isAuthenticated = success
        } catch let laError as LAError {
            handleLAError(laError)
        }
    }

    private func handleLAError(_ error: LAError) {
        switch error.code {
        case .userCancel:
            errorMessage = "인증 취소됨"
        case .userFallback:
            errorMessage = "비밀번호 입력 선택"
        case .biometryNotAvailable:
            errorMessage = "생체인증 비활성화됨"
        case .biometryNotEnrolled:
            errorMessage = "등록된 생체정보 없음"
        case .biometryLockout:
            errorMessage = "너무 많은 실패로 잠김 — 비밀번호 필요"
        default:
            errorMessage = error.localizedDescription
        }
    }
}

// MARK: - SwiftUI View 통합
struct ProtectedView: View {
    @StateObject private var auth = BiometricAuthManager()

    var body: some View {
        Group {
            if auth.isAuthenticated {
                SecretContentView()
            } else {
                VStack(spacing: 20) {
                    Image(systemName: auth.biometricType == .faceID
                        ? "faceid" : "touchid")
                        .font(.system(size: 60))
                        .foregroundStyle(.blue)

                    Text("\\(auth.biometricDisplayName)로 잠금 해제")
                        .font(.headline)

                    if let error = auth.errorMessage {
                        Text(error).foregroundStyle(.red).font(.caption)
                    }

                    Button("인증하기") {
                        Task { await auth.authenticate() }
                    }
                    .buttonStyle(.borderedProminent)
                }
                .onAppear {
                    Task { await auth.authenticate() }
                }
            }
        }
    }
}

// MARK: - Keychain + 생체인증 연동 (고급)
// LAContext를 Keychain 쿼리에 주입하면
// 생체인증 성공 시에만 키에 접근 가능
func loadSecretWithBiometrics() throws -> String {
    let context = LAContext()
    context.localizedReason = "비밀 데이터에 접근합니다"

    let query: [String: Any] = [
        kSecClass as String:            kSecClassGenericPassword,
        kSecAttrAccount as String:      "bio_protected_key",
        kSecReturnData as String:       true,
        kSecMatchLimit as String:       kSecMatchLimitOne,
        kSecUseAuthenticationContext as String: context,
    ]
    var result: AnyObject?
    let status = SecItemCopyMatching(query as CFDictionary, &result)
    guard status == errSecSuccess,
          let data = result as? Data,
          let string = String(data: data, encoding: .utf8)
    else { throw KeychainError.itemNotFound }
    return string
}`,
    },
  },

  security_secure_enclave: {
    caption: 'Secure Enclave 키 생성 vs Android StrongBox vs Web Crypto non-extractable',
    android: {
      language: 'kotlin',
      code: `// Android StrongBox — 전용 보안 칩 (Pixel 3+ 등 일부 기기)
import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import android.security.keystore.StrongBoxUnavailableException
import java.security.KeyPairGenerator
import java.security.KeyStore
import java.security.Signature

object StrongBoxKeyManager {

    private const val KEY_ALIAS = "strongbox_signing_key"
    private const val ANDROID_KEYSTORE = "AndroidKeyStore"

    // StrongBox 지원 여부 확인 후 키 생성
    fun generateSigningKey() {
        val keyPairGenerator = KeyPairGenerator.getInstance(
            KeyProperties.KEY_ALGORITHM_EC, ANDROID_KEYSTORE
        )

        val spec = KeyGenParameterSpec.Builder(
            KEY_ALIAS,
            KeyProperties.PURPOSE_SIGN or KeyProperties.PURPOSE_VERIFY
        )
        .setAlgorithmParameterSpec(java.security.spec.ECGenParameterSpec("secp256r1"))
        .setDigests(KeyProperties.DIGEST_SHA256)
        .setUserAuthenticationRequired(true)
        .setUserAuthenticationParameters(0, KeyProperties.AUTH_BIOMETRIC_STRONG)
        .setIsStrongBoxBacked(true)   // StrongBox 요청
        .build()

        try {
            keyPairGenerator.initialize(spec)
            keyPairGenerator.generateKeyPair()
            println("StrongBox 키 생성 성공")
        } catch (e: StrongBoxUnavailableException) {
            // StrongBox 미지원 기기 → TEE(Trusted Execution Environment) 폴백
            val fallbackSpec = KeyGenParameterSpec.Builder(
                KEY_ALIAS,
                KeyProperties.PURPOSE_SIGN or KeyProperties.PURPOSE_VERIFY
            )
            .setAlgorithmParameterSpec(java.security.spec.ECGenParameterSpec("secp256r1"))
            .setDigests(KeyProperties.DIGEST_SHA256)
            .setUserAuthenticationRequired(true)
            .build()
            keyPairGenerator.initialize(fallbackSpec)
            keyPairGenerator.generateKeyPair()
            println("TEE 폴백으로 키 생성")
        }
    }

    // 서명 (키는 기기 밖으로 절대 나가지 않음)
    fun sign(data: ByteArray): ByteArray {
        val keyStore = KeyStore.getInstance(ANDROID_KEYSTORE).apply { load(null) }
        val privateKey = keyStore.getKey(KEY_ALIAS, null)

        return Signature.getInstance("SHA256withECDSA").run {
            initSign(privateKey as java.security.PrivateKey)
            update(data)
            sign()
        }
    }

    // 공개키 내보내기 (서버 등록용)
    fun getPublicKeyBytes(): ByteArray {
        val keyStore = KeyStore.getInstance(ANDROID_KEYSTORE).apply { load(null) }
        val cert = keyStore.getCertificate(KEY_ALIAS)
        return cert.publicKey.encoded
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// 웹: Web Crypto non-extractable 키 (소프트웨어, 하드웨어 보장 없음)
class WebCryptoKeyManager {

    // Non-extractable 키 생성 — 메모리에서 꺼낼 수 없음
    static async generateNonExtractableKey(): Promise<CryptoKeyPair> {
        return crypto.subtle.generateKey(
            {
                name: 'ECDSA',
                namedCurve: 'P-256',
            },
            false,              // extractable: false → 내보내기 불가
            ['sign', 'verify']
        );
    }

    // 서명
    static async sign(privateKey: CryptoKey, data: ArrayBuffer): Promise<ArrayBuffer> {
        return crypto.subtle.sign(
            { name: 'ECDSA', hash: 'SHA-256' },
            privateKey,
            data
        );
    }

    // 검증
    static async verify(
        publicKey: CryptoKey,
        signature: ArrayBuffer,
        data: ArrayBuffer
    ): Promise<boolean> {
        return crypto.subtle.verify(
            { name: 'ECDSA', hash: 'SHA-256' },
            publicKey,
            signature,
            data
        );
    }

    // 공개키 내보내기 (private key는 불가 — non-extractable)
    static async exportPublicKey(key: CryptoKey): Promise<string> {
        const exported = await crypto.subtle.exportKey('raw', key);
        return btoa(String.fromCharCode(...new Uint8Array(exported)));
    }
}

// ⚠️ 웹의 한계:
// - non-extractable이지만 하드웨어 격리는 보장 안 됨
// - 브라우저 탭 닫으면 키 소멸 (영구 저장 불가)
// - 하드웨어 보안이 필요하면 WebAuthn + Passkeys 사용`,
    },
    ios: {
      language: 'swift',
      code: `// Secure Enclave — Apple 전용 하드웨어 보안 칩 (A7 이후)
// 키가 SE 밖으로 절대 나가지 않음 — 서명/ECDH만 가능
import Security
import CryptoKit
import LocalAuthentication

struct SecureEnclaveKeyManager {

    static let keyTag = "com.example.app.se_key"

    // MARK: - SE 지원 여부 확인
    static var isSupported: Bool {
        SecureEnclave.isAvailable
    }

    // MARK: - CryptoKit 방식 (iOS 14.5+, 더 간단)
    static func generateKey() throws -> SecureEnclave.P256.Signing.PrivateKey {
        // accessControl: 생체인증 성공 시에만 키 사용 허용
        let access = SecAccessControlCreateWithFlags(
            kCFAllocatorDefault,
            kSecAttrAccessibleWhenUnlockedThisDeviceOnly,
            [.privateKeyUsage, .biometryCurrentSet],    // 생체 변경 시 무효화
            nil
        )!

        return try SecureEnclave.P256.Signing.PrivateKey(
            accessControl: access
        )
    }

    // MARK: - 서명
    static func sign(data: Data, key: SecureEnclave.P256.Signing.PrivateKey) throws -> P256.Signing.ECDSASignature {
        try key.signature(for: data)
    }

    // MARK: - 검증 (공개키로, SE 불필요)
    static func verify(
        signature: P256.Signing.ECDSASignature,
        data: Data,
        publicKey: P256.Signing.PublicKey
    ) -> Bool {
        publicKey.isValidSignature(signature, for: data)
    }

    // MARK: - Security 프레임워크 방식 (iOS 9+, 더 세밀한 제어)
    static func generateKeyWithSecurityFramework() throws -> SecKey {
        // LAContext 준비 (생체인증 컨텍스트)
        let context = LAContext()

        let access = SecAccessControlCreateWithFlags(
            kCFAllocatorDefault,
            kSecAttrAccessibleWhenUnlockedThisDeviceOnly,
            [.privateKeyUsage, .biometryAny],
            nil
        )!

        let attributes: [String: Any] = [
            kSecAttrKeyType as String:        kSecAttrKeyTypeECSECPrimeRandom,
            kSecAttrKeySizeInBits as String:  256,
            kSecAttrTokenID as String:        kSecAttrTokenIDSecureEnclave, // ← SE 지정
            kSecPrivateKeyAttrs as String: [
                kSecAttrIsPermanent as String:    true,
                kSecAttrApplicationTag as String: keyTag.data(using: .utf8)!,
                kSecAttrAccessControl as String:  access,
            ],
        ]

        var error: Unmanaged<CFError>?
        guard let privateKey = SecKeyCreateRandomKey(attributes as CFDictionary, &error) else {
            throw error!.takeRetainedValue()
        }
        return privateKey
    }

    // MARK: - 저장된 키 불러오기
    static func loadKey() throws -> SecKey {
        let query: [String: Any] = [
            kSecClass as String:              kSecClassKey,
            kSecAttrKeyType as String:        kSecAttrKeyTypeECSECPrimeRandom,
            kSecAttrApplicationTag as String: keyTag.data(using: .utf8)!,
            kSecAttrTokenID as String:        kSecAttrTokenIDSecureEnclave,
            kSecReturnRef as String:          true,
        ]
        var item: CFTypeRef?
        let status = SecItemCopyMatching(query as CFDictionary, &item)
        guard status == errSecSuccess else {
            throw KeychainError.itemNotFound
        }
        return item as! SecKey
    }

    // MARK: - 공개키 내보내기 (DER 형식)
    static func exportPublicKey(_ privateKey: SecKey) throws -> Data {
        guard let publicKey = SecKeyCopyPublicKey(privateKey) else {
            throw KeychainError.unexpectedData
        }
        var error: Unmanaged<CFError>?
        guard let data = SecKeyCopyExternalRepresentation(publicKey, &error) as Data? else {
            throw error!.takeRetainedValue()
        }
        return data
    }
}

// 실제 사용 예시: ECDSA 기반 서버 인증 (비밀번호 없는 로그인)
async func authenticateWithSecureEnclave(challenge: Data) async throws -> Data {
    let key = try SecureEnclaveKeyManager.loadKey()

    // 생체인증 자동 요청 (액세스 컨트롤에 설정되어 있음)
    var error: Unmanaged<CFError>?
    guard let signature = SecKeyCreateSignature(
        key,
        .ecdsaSignatureMessageX962SHA256,
        challenge as CFData,
        &error
    ) else {
        throw error!.takeRetainedValue()
    }
    return signature as Data
}`,
    },
  },

  security_jailbreak_detection: {
    caption: '탈옥/루팅 탐지 vs Android SafetyNet/Play Integrity vs 없음(웹)',
    android: {
      language: 'kotlin',
      code: `// Android: Play Integrity API (SafetyNet 후속, 2023+)
import com.google.android.play.core.integrity.IntegrityManagerFactory
import com.google.android.play.core.integrity.IntegrityTokenRequest
import android.content.Context

class IntegrityChecker(private val context: Context) {

    // Play Integrity API — 서버에서 검증 권장
    suspend fun checkIntegrity(nonce: String): String {
        val manager = IntegrityManagerFactory.create(context)
        val request = IntegrityTokenRequest.builder()
            .setNonce(nonce)            // 서버에서 받은 1회용 nonce
            .setCloudProjectNumber(123456789L)  // Google Cloud 프로젝트 번호
            .build()

        val response = manager.requestIntegrityToken(request).await()
        // 이 토큰을 서버로 전송 → Google API로 검증
        return response.token()
    }

    // 클라이언트 사이드 루팅 탐지 (보조용, 우회 가능)
    fun detectRooting(): List<String> {
        val indicators = mutableListOf<String>()

        // 1. su 바이너리 존재 확인
        val suPaths = listOf(
            "/system/bin/su", "/system/xbin/su",
            "/sbin/su", "/system/su", "/system/bin/.ext/.su"
        )
        suPaths.filter { java.io.File(it).exists() }.forEach {
            indicators.add("su 발견: \$it")
        }

        // 2. 알려진 루팅 앱 패키지
        val rootApps = listOf(
            "com.topjohnwu.magisk",
            "com.noshufou.android.su",
            "eu.chainfire.supersu",
        )
        rootApps.forEach { pkg ->
            try {
                context.packageManager.getPackageInfo(pkg, 0)
                indicators.add("루팅 앱 발견: \$pkg")
            } catch (_: Exception) {}
        }

        // 3. Build 태그 확인
        if (android.os.Build.TAGS?.contains("test-keys") == true) {
            indicators.add("test-keys 빌드")
        }

        // 4. /data/local/tmp 쓰기 가능 여부
        val testFile = java.io.File("/data/local/tmp/integrity_test_\\${System.currentTimeMillis()}")
        try {
            testFile.createNewFile()
            testFile.delete()
            indicators.add("/data/local/tmp 쓰기 가능")
        } catch (_: Exception) {}

        return indicators
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// 웹: 브라우저 환경에서는 탈옥/루팅 직접 탐지 불가
// 대신 이상 행동 탐지 + 서버사이드 검증으로 대응

class WebSecurityMonitor {

    // 브라우저 환경 이상 징후 탐지
    detectAnomalies(): string[] {
        const flags: string[] = [];

        // 1. 자동화 도구 (Puppeteer, Selenium) 탐지
        if ((navigator as any).webdriver) {
            flags.push('webdriver 감지됨');
        }

        // 2. 프록시/VPN 탐지 (간접적)
        if ((navigator as any).connection?.rtt === 0) {
            flags.push('비정상 네트워크');
        }

        // 3. DevTools 열림 탐지 (불완전)
        const before = performance.now();
        debugger; // DevTools 열린 상태면 여기서 멈춤
        if (performance.now() - before > 100) {
            flags.push('DevTools 의심');
        }

        // 4. Canvas fingerprint 변조 탐지
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        ctx.fillText('security check', 0, 0);
        const fp = canvas.toDataURL();
        if (fp === 'data:,') {
            flags.push('Canvas 차단됨 (프라이버시 브라우저/확장)');
        }

        return flags;
    }

    // 서버사이드: CAPTCHA + Rate Limiting + 행동 분석
    // reCAPTCHA Enterprise, hCaptcha, Cloudflare Turnstile 등 사용
    async verifyWithRecaptcha(token: string): Promise<boolean> {
        const res = await fetch('/api/verify-captcha', {
            method: 'POST',
            body: JSON.stringify({ token }),
            headers: { 'Content-Type': 'application/json' },
        });
        const { success, score } = await res.json();
        // score 0.0~1.0: 1.0에 가까울수록 정상 사용자
        return success && score > 0.5;
    }
}

// 웹 앱은 OS 레벨 무결성 검증이 구조적으로 불가능
// → 중요 로직은 반드시 서버에서 처리
// → Trusted Execution Environment가 필요하다면 네이티브 앱 사용`,
    },
    ios: {
      language: 'swift',
      code: `// iOS 탈옥 탐지 — 다중 계층 검사 (우회 시도를 어렵게)
// ⚠️ 100% 완벽한 탐지는 없음. 장벽을 높이는 것이 목표.
import Foundation
import UIKit

struct JailbreakDetector {

    // MARK: - 종합 탈옥 탐지
    static func isJailbroken() -> Bool {
        // 시뮬레이터는 항상 false 반환 (개발 편의)
        #if targetEnvironment(simulator)
        return false
        #else
        return checkJailbreakFiles()
            || checkSandboxViolation()
            || checkDynamicLibraries()
            || checkCydiaURL()
            || checkSymbolicLinks()
            || checkSuspiciousProcesses()
        #endif
    }

    // MARK: - 1. 탈옥 관련 파일/앱 존재 확인
    private static func checkJailbreakFiles() -> Bool {
        let suspiciousPaths = [
            "/Applications/Cydia.app",
            "/Applications/FakeCarrier.app",
            "/Applications/Icy.app",
            "/Applications/IntelliScreen.app",
            "/Applications/MxTube.app",
            "/Applications/RockApp.app",
            "/Applications/SBSettings.app",
            "/Applications/WinterBoard.app",
            "/Library/MobileSubstrate/MobileSubstrate.dylib",
            "/bin/bash",
            "/usr/sbin/sshd",
            "/etc/apt",
            "/private/var/lib/apt/",
            "/usr/bin/ssh",
            "/private/var/stash",
            "/private/var/tmp/cydia.log",
            "/var/checkra1n.dmg",  // checkra1n
        ]

        for path in suspiciousPaths {
            if FileManager.default.fileExists(atPath: path) {
                return true
            }
            // 직접 읽기 시도 (파일 존재 숨김 우회)
            if (try? Data(contentsOf: URL(fileURLWithPath: path))) != nil {
                return true
            }
        }
        return false
    }

    // MARK: - 2. 샌드박스 탈출 시도
    private static func checkSandboxViolation() -> Bool {
        let testPath = "/private/jailbreak_test_\\(UUID().uuidString).txt"
        do {
            try "test".write(toFile: testPath, atomically: true, encoding: .utf8)
            // 쓰기 성공 = 샌드박스 침해 = 탈옥
            try? FileManager.default.removeItem(atPath: testPath)
            return true
        } catch {
            return false  // 정상: 쓰기 거부됨
        }
    }

    // MARK: - 3. 의심스러운 동적 라이브러리 로드 확인
    private static func checkDynamicLibraries() -> Bool {
        let suspiciousLibs = [
            "SubstrateLoader",
            "MobileSubstrate",
            "TweakInject",
            "cynject",
            "libhooker",
            "substitute",
        ]

        let imageCount = _dyld_image_count()
        for i in 0..<imageCount {
            guard let imageName = _dyld_get_image_name(i) else { continue }
            let name = String(cString: imageName).lowercased()
            if suspiciousLibs.contains(where: { name.contains($0.lowercased()) }) {
                return true
            }
        }
        return false
    }

    // MARK: - 4. Cydia URL Scheme 응답 확인
    private static func checkCydiaURL() -> Bool {
        guard let url = URL(string: "cydia://package/com.example") else { return false }
        return UIApplication.shared.canOpenURL(url)
    }

    // MARK: - 5. 심볼릭 링크 우회 확인
    private static func checkSymbolicLinks() -> Bool {
        let paths = ["/Applications", "/Library/Ringtones", "/Library/Wallpaper", "/usr/arm-apple-darwin9"]
        return paths.contains { path in
            (try? FileManager.default.destinationOfSymbolicLink(atPath: path)) != nil
        }
    }

    // MARK: - 6. 의심 프로세스 실행 중 확인
    private static func checkSuspiciousProcesses() -> Bool {
        // sysctl로 프로세스 목록 조회
        var mib: [Int32] = [CTL_KERN, KERN_PROC, KERN_PROC_ALL, 0]
        var size = 0
        sysctl(&mib, 4, nil, &size, nil, 0)
        var buffer = [kinfo_proc](repeating: kinfo_proc(), count: size / MemoryLayout<kinfo_proc>.stride)
        sysctl(&mib, 4, &buffer, &size, nil, 0)

        let suspiciousNames = ["Cydia", "substrate", "cynject", "frida-server", "ssh"]
        return buffer.contains { proc in
            let name = withUnsafeBytes(of: proc.kp_proc.p_comm) { bytes -> String in
                let str = bytes.bindMemory(to: CChar.self)
                return String(cString: str.baseAddress!)
            }
            return suspiciousNames.contains { name.lowercased().contains($0.lowercased()) }
        }
    }
}

// MARK: - Frida 탐지 (동적 분석 도구)
struct FridaDetector {
    static func isFridaPresent() -> Bool {
        // Frida가 사용하는 포트 27042 리스닝 여부 확인
        let socket = Darwin.socket(AF_INET, SOCK_STREAM, 0)
        defer { Darwin.close(socket) }

        var addr = sockaddr_in()
        addr.sin_family = sa_family_t(AF_INET)
        addr.sin_port = (27042 as UInt16).bigEndian
        addr.sin_addr.s_addr = INADDR_LOOPBACK.bigEndian

        let result = withUnsafePointer(to: &addr) { ptr in
            ptr.withMemoryRebound(to: sockaddr.self, capacity: 1) { sockPtr in
                connect(socket, sockPtr, socklen_t(MemoryLayout<sockaddr_in>.size))
            }
        }

        return result == 0  // 연결 성공 = Frida 서버 실행 중
    }
}`,
    },
  },

  // === src/data/codeBlocks-ch13.ts ===
performance_os_log: {
    caption: 'os_log/Logger vs Android Log/Timber vs console.log/winston',
    android: {
      language: 'kotlin',
      code: `// Android: Log / Timber 로깅

// 1. 기본 android.util.Log — 프로덕션에선 지양
import android.util.Log

class NetworkRepository {
    companion object {
        private const val TAG = "NetworkRepository"
    }

    fun fetchUser(id: String) {
        Log.d(TAG, "fetchUser 시작: id=\${id}")          // DEBUG
        Log.i(TAG, "요청 성공")                            // INFO
        Log.w(TAG, "재시도 중 (attempt=2)")               // WARN
        Log.e(TAG, "네트워크 오류", exception)            // ERROR
        // Log.v — VERBOSE, Log.wtf — 치명적 오류
    }
}

// 2. Timber — 프로덕션 권장 라이브러리
import timber.log.Timber

// Application.onCreate() 에서 초기화
class MyApp : Application() {
    override fun onCreate() {
        super.onCreate()
        if (BuildConfig.DEBUG) {
            Timber.plant(Timber.DebugTree())   // 자동으로 클래스명 TAG 사용
        } else {
            Timber.plant(CrashReportingTree()) // 커스텀 — Crashlytics 연동
        }
    }
}

class CrashReportingTree : Timber.Tree() {
    override fun log(priority: Int, tag: String?, message: String, t: Throwable?) {
        if (priority < Log.WARN) return   // WARN 미만은 프로덕션에서 무시
        FirebaseCrashlytics.getInstance().log("[\${tag}] \${message}")
        t?.let { FirebaseCrashlytics.getInstance().recordException(it) }
    }
}

// 사용 — TAG 자동 추론, 포맷 지원
Timber.d("fetchUser: id=%s", id)
Timber.w("재시도 중: attempt=%d", retryCount)
Timber.e(exception, "네트워크 오류: endpoint=%s", endpoint)

// 3. 구조화 로그 (JSON) — 서버사이드에서 파싱 용이
val event = mapOf(
    "event" to "api_request",
    "user_id" to userId,
    "duration_ms" to duration,
    "status" to statusCode
)
Timber.i(JSONObject(event).toString())`,
    },
    web: {
      language: 'typescript',
      code: `// Web: console.log / winston / pino

// 1. 브라우저 console API
console.debug('fetchUser 시작', { id, timestamp: Date.now() })
console.info('요청 성공', { status: 200 })
console.warn('재시도 중', { attempt: 2 })
console.error('네트워크 오류', error)
console.time('api-call')
// ... 작업
console.timeEnd('api-call')   // "api-call: 123.4ms"

// 2. winston — Node.js 서버사이드 권장
import winston from 'winston'

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()            // 구조화 JSON 출력
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})

// 메타데이터 포함 로깅
logger.info('fetchUser 시작', { userId, requestId: req.id })
logger.warn('재시도 중', { attempt: 2, endpoint: '/api/users' })
logger.error('네트워크 오류', { error: err.message, stack: err.stack })

// child logger — 컨텍스트 고정
const reqLogger = logger.child({ requestId: req.id, userId })
reqLogger.info('처리 시작')   // requestId, userId 자동 포함

// 3. pino — 고성능 JSON 로거 (Next.js/Fastify 권장)
import pino from 'pino'
const log = pino({ level: 'debug' })

log.info({ userId, action: 'fetch' }, 'fetchUser 시작')
log.error({ err }, '처리 실패')   // err 객체 직렬화 자동 처리`,
    },
    ios: {
      language: 'swift',
      code: `// iOS: os_log / Logger (Swift 5.5+)
import OSLog

// ───────────────────────────────────────────
// 1. Logger (Swift 현대적 API — iOS 14+)
// ───────────────────────────────────────────

// subsystem: 앱 Bundle ID, category: 기능 단위
private let logger = Logger(subsystem: "com.example.MyApp", category: "Network")

func fetchUser(id: String) async throws -> User {
    logger.debug("fetchUser 시작: id=\\(id, privacy: .public)")

    let start = ContinuousClock.now
    do {
        let user = try await apiClient.getUser(id: id)
        let elapsed = ContinuousClock.now - start
        logger.info("fetchUser 완료: duration=\\(elapsed)")
        return user
    } catch {
        logger.error("fetchUser 실패: \\(error.localizedDescription, privacy: .public)")
        throw error
    }
}

// privacy 수준 — 개인정보 보호 핵심
// .public   — Console.app에서 평문 표시
// .private  — 기본값. 릴리즈 빌드에서 <private> 로 마스킹
// .sensitive — .private 보다 강화 (iOS 15+)
// .auto     — 스칼라 타입은 public, 기타는 private

logger.debug("userId=\\(userId, privacy: .private)")   // 릴리즈: "<private>"
logger.info("status=\\(statusCode, privacy: .public)")  // 항상 노출

// ───────────────────────────────────────────
// 2. OSLog (하위 호환 — iOS 10+)
// ───────────────────────────────────────────
import os.log

let networkLog = OSLog(subsystem: "com.example.MyApp", category: "Network")
os_log("요청 시작: %{public}@", log: networkLog, type: .debug, endpoint)
os_log("오류 발생: %{public}@", log: networkLog, type: .error, error.localizedDescription)

// ───────────────────────────────────────────
// 3. OSSignpost — 성능 측정 타임라인 마킹
// ───────────────────────────────────────────
import os.signpost

let spLog = OSLog(subsystem: "com.example.MyApp", category: .pointsOfInterest)
let spID = OSSignpostID(log: spLog)

os_signpost(.begin, log: spLog, name: "ImageDecode", signpostID: spID, "width=%d height=%d", width, height)
// ... 이미지 디코딩 작업
os_signpost(.end, log: spLog, name: "ImageDecode", signpostID: spID)
// → Instruments Time Profiler의 "Points of Interest" 트랙에 표시

// ───────────────────────────────────────────
// 4. Console.app에서 필터링
// ───────────────────────────────────────────
// subsystem:com.example.MyApp category:Network level:debug
// → 해당 카테고리 로그만 실시간 확인 가능`,
    },
  },

  performance_time_profiler: {
    caption: 'Instruments Time Profiler vs Android CPU Profiler vs Chrome Performance DevTools',
    android: {
      language: 'kotlin',
      code: `// Android: CPU Profiler + Systrace + Tracing API

// 1. Android Studio CPU Profiler 사용법
// Run → Profile → CPU 탭 → Record 버튼
// 프로파일링 모드 선택:
//   - Sampled (Java/Kotlin): 낮은 오버헤드, 통계적 샘플링
//   - Instrumented (Java/Kotlin): 정확하지만 오버헤드 큼
//   - Sampled (C/C++): 네이티브 코드 프로파일링
//   - System Trace: 시스템 전반 CPU 스케줄링 분석

// 2. TraceCompat — 코드에 커스텀 섹션 추가
import androidx.core.os.TraceCompat

fun loadFeed() {
    TraceCompat.beginSection("FeedLoad")
    try {
        TraceCompat.beginSection("FeedLoad.network")
        val raw = fetchFromNetwork()
        TraceCompat.endSection()

        TraceCompat.beginSection("FeedLoad.parse")
        val items = parseJson(raw)
        TraceCompat.endSection()

        TraceCompat.beginSection("FeedLoad.db")
        database.insertAll(items)
        TraceCompat.endSection()
    } finally {
        TraceCompat.endSection()
    }
}
// → CPU Profiler의 "System Trace" 뷰에서 섹션별 타임라인 확인

// 3. Perfetto — 고급 시스템 트레이싱
// adb shell perfetto -c /data/local/tmp/perfetto.cfg --txt -o /data/misc/perfetto-traces/trace
// → ui.perfetto.dev 에서 분석

// 4. Jetpack Benchmark — 마이크로 벤치마크
// androidTest 에 추가
import androidx.benchmark.junit4.BenchmarkRule
import androidx.benchmark.junit4.measureRepeated

@RunWith(AndroidJUnit4::class)
class FeedParserBenchmark {
    @get:Rule val benchmarkRule = BenchmarkRule()

    @Test
    fun parseJsonBenchmark() {
        val json = readTestJson()
        benchmarkRule.measureRepeated {
            // 벤치마크 대상 코드
            runWithTimingDisabled { /* 셋업 */ }
            FeedParser.parse(json)    // 측정 대상
        }
    }
}
// 결과: "FeedParser.parse: min=1.2ms, median=1.4ms, max=2.1ms"`,
    },
    web: {
      language: 'typescript',
      code: `// Web: Chrome DevTools Performance + User Timing API

// 1. User Timing API — 코드에 마커 삽입
performance.mark('feed-load-start')

const raw = await fetchFromNetwork()
performance.mark('feed-network-end')
performance.measure('feed-network', 'feed-load-start', 'feed-network-end')

const items = parseJson(raw)
performance.mark('feed-parse-end')
performance.measure('feed-parse', 'feed-network-end', 'feed-parse-end')

performance.mark('feed-load-end')
performance.measure('feed-total', 'feed-load-start', 'feed-load-end')

// → Chrome DevTools Performance 탭 → "Timings" 트랙에 표시

// 2. PerformanceObserver — 측정값 수집
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(\`\${entry.name}: \${entry.duration.toFixed(2)}ms\`)
    // 분석 서버로 전송
    analytics.track('perf_measure', {
      name: entry.name,
      duration: entry.duration,
    })
  }
})
observer.observe({ entryTypes: ['measure', 'navigation', 'resource', 'longtask'] })

// 3. Chrome DevTools 활용
// F12 → Performance 탭
// Record → 작업 수행 → Stop
// 분석 포인트:
//   - "Long Tasks" (50ms 초과 — 빨간 삼각형)
//   - "Main" 트랙: JS 실행 / 레이아웃 / 페인트 비율
//   - "Network" 트랙: 리소스 로드 순서
//   - "Frames" 트랙: 드롭 프레임

// 4. Lighthouse CI — 자동화 성능 측정
// npm install -g @lhci/cli
// lhci autorun --collect.url=https://example.com
// → FCP, LCP, TBT, CLS, TTI 점수 측정

// 5. clinic.js — Node.js 서버 프로파일링
// npx clinic doctor -- node server.js
// npx clinic flame -- node server.js   # 플레임 그래프`,
    },
    ios: {
      language: 'swift',
      code: `// iOS: Instruments Time Profiler + os_signpost

// ─────────────────────────────────────────────
// 1. Instruments Time Profiler 사용 절차
// ─────────────────────────────────────────────
// Xcode → Product → Profile (⌘I)
// → Instruments 실행
// → "Time Profiler" 선택
// → Record (빨간 버튼)
// → 재현하고 싶은 작업 수행
// → Stop → 분석

// 핵심 조작법:
// - Call Tree 뷰 → "Invert Call Tree" 체크 → 핫스팟 함수 바로 확인
// - "Hide System Libraries" 체크 → 앱 코드만 표시
// - 특정 스레드 선택 → Main Thread 병목 구분
// - Xcode 소스로 점프: 함수명 더블클릭

// ─────────────────────────────────────────────
// 2. os_signpost — 코드에 구간 마커 삽입
// Time Profiler의 "Points of Interest" 트랙에 표시
// ─────────────────────────────────────────────
import os.signpost

private let perfLog = OSLog(subsystem: "com.example.MyApp", category: .pointsOfInterest)

func loadFeed() async {
    let sid = OSSignpostID(log: perfLog)

    os_signpost(.begin, log: perfLog, name: "FeedLoad", signpostID: sid)

    os_signpost(.begin, log: perfLog, name: "FeedLoad.network", signpostID: sid)
    let raw = try await apiClient.fetchFeed()
    os_signpost(.end, log: perfLog, name: "FeedLoad.network", signpostID: sid)

    os_signpost(.begin, log: perfLog, name: "FeedLoad.parse", signpostID: sid)
    let items = FeedParser.parse(raw)
    os_signpost(.end, log: perfLog, name: "FeedLoad.parse", signpostID: sid)

    os_signpost(.end, log: perfLog, name: "FeedLoad", signpostID: sid)
}

// ─────────────────────────────────────────────
// 3. CFAbsoluteTime — 코드 내 시간 측정
// ─────────────────────────────────────────────
let start = CFAbsoluteTimeGetCurrent()
expensiveOperation()
let elapsed = CFAbsoluteTimeGetCurrent() - start
print("소요시간: \\(elapsed * 1000)ms")

// ─────────────────────────────────────────────
// 4. Clock API (Swift 5.7+) — 현대적 시간 측정
// ─────────────────────────────────────────────
let clock = ContinuousClock()
let duration = await clock.measure {
    await loadFeed()
}
print("FeedLoad: \\(duration)")   // "FeedLoad: 0.342 seconds"

// ─────────────────────────────────────────────
// 5. Instruments 주요 템플릿 용도 요약
// ─────────────────────────────────────────────
// Time Profiler  → CPU 병목 함수 추적
// Allocations    → 메모리 할당/해제 패턴
// Leaks          → 메모리 누수 탐지
// Network        → URLSession 요청/응답 타임라인
// Core Animation → 렌더링 FPS, 오프스크린 렌더링
// Energy Log     → 배터리 소모 원인
// System Trace   → CPU 스케줄링, I/O, 락 경합`,
    },
  },

  performance_memory_management: {
    caption: 'ARC(Swift) vs Android GC(JVM) vs JavaScript GC + WeakRef',
    android: {
      language: 'kotlin',
      code: `// Android: JVM GC 기반 메모리 관리

// 1. GC 동작 방식
// - Mark-and-Sweep: 도달 불가 객체 주기적 수거
// - Generational GC: Young / Old / Permanent 세대 구분
// - ART(Android Runtime): Concurrent GC — STW 최소화
// - GC 로그: adb logcat -s art:D

// 2. WeakReference / SoftReference
import java.lang.ref.WeakReference
import java.lang.ref.SoftReference

class ImageCache {
    // WeakReference: GC가 언제든 수거 가능
    private val cache = HashMap<String, WeakReference<Bitmap>>()

    fun put(key: String, bitmap: Bitmap) {
        cache[key] = WeakReference(bitmap)
    }

    fun get(key: String): Bitmap? {
        return cache[key]?.get()  // null 이면 이미 수거됨
    }
}

// SoftReference: 메모리 부족 시에만 수거
// → 캐시용으로 WeakReference보다 오래 살아남음
val softRef = SoftReference(largeObject)

// 3. Android Profiler에서 메모리 분석
// Run → Profile → Memory 탭
// - Heap Dump: 현재 힙 스냅샷
// - Allocation Tracking: 할당 추적
// - GC 이벤트: 초록 막대 (Minor GC) / 빨간 막대 (Major GC)

// 4. LeakCanary — 메모리 누수 자동 탐지
// build.gradle: debugImplementation 'com.squareup.leakcanary:leakcanary-android:2.x'
// → 자동으로 Activity/Fragment/ViewModel 누수 탐지
// → 누수 경로를 앱 내 알림으로 표시

// 5. 대형 객체 주의
// 16MB 초과 Bitmap → OutOfMemoryError
val options = BitmapFactory.Options().apply {
    inSampleSize = 4       // 1/4 크기로 디코딩
    inPreferredConfig = Bitmap.Config.RGB_565  // ARGB_8888 대비 절반 메모리
}
val bitmap = BitmapFactory.decodeResource(resources, R.drawable.large_image, options)`,
    },
    web: {
      language: 'typescript',
      code: `// JavaScript: GC + WeakRef + FinalizationRegistry

// 1. JS GC 동작 방식
// - Mark-and-Sweep: 루트(전역, 스택)에서 도달 불가 객체 수거
// - V8 Generational GC: Young Space (Minor GC) + Old Space (Major GC)
// - 개발자가 직접 메모리 해제 불가 — GC에 위임

// 2. WeakRef (ES2021) — GC 허용 약한 참조
let cache = new Map<string, WeakRef<LargeObject>>()

function getCached(key: string): LargeObject | undefined {
  const ref = cache.get(key)
  if (!ref) return undefined

  const obj = ref.deref()   // GC됐으면 undefined 반환
  if (!obj) {
    cache.delete(key)       // 수거된 항목 정리
    return undefined
  }
  return obj
}

function setCached(key: string, obj: LargeObject) {
  cache.set(key, new WeakRef(obj))
}

// 3. FinalizationRegistry — 객체 수거 시 콜백
const registry = new FinalizationRegistry((key: string) => {
  console.log(\`\${key} 객체 수거됨, 캐시 정리\`)
  cache.delete(key)
})

function setWithCleanup(key: string, obj: LargeObject) {
  cache.set(key, new WeakRef(obj))
  registry.register(obj, key)   // obj가 수거될 때 key를 인자로 콜백 호출
}

// 4. WeakMap / WeakSet — 키가 GC되면 엔트리 자동 제거
const domMetadata = new WeakMap<Element, { clicks: number }>()

function trackClicks(el: Element) {
  const meta = domMetadata.get(el) ?? { clicks: 0 }
  meta.clicks++
  domMetadata.set(el, meta)
  // el이 DOM에서 제거되면 WeakMap 항목도 자동 정리
}

// 5. Chrome DevTools Memory 탭
// Heap snapshot → 스냅샷 비교로 누수 발견
// Allocation instrumentation → 할당 타임라인
// Allocation sampling → 오버헤드 낮은 샘플링 프로파일링`,
    },
    ios: {
      language: 'swift',
      code: `// iOS: ARC(Automatic Reference Counting) — 컴파일 타임 메모리 관리

// ─────────────────────────────────────────────
// 1. ARC 동작 원리
// ─────────────────────────────────────────────
// - 컴파일러가 retain/release 호출을 자동 삽입
// - 참조 횟수(reference count)가 0 → 즉시 해제
// - GC 없음 → STW(Stop-The-World) 없음 → 예측 가능한 성능

// 참조 타입별 동작
class NetworkManager {
    var delegate: SomeDelegate?   // strong (기본) — RC +1
    weak var parent: ParentVC?    // weak — RC 불변, 해제 시 자동 nil
    unowned var owner: Owner      // unowned — RC 불변, 해제 후 접근 → 크래시
}

// ─────────────────────────────────────────────
// 2. 값 타입 (struct, enum) — ARC 없음
// ─────────────────────────────────────────────
struct Point {
    var x: Double
    var y: Double
}   // 스택 할당 또는 인라인 — 참조 계수 없음

var a = Point(x: 1, y: 2)
var b = a          // 복사 (Copy-on-Write)
b.x = 99          // a.x는 여전히 1 — 독립적 복사본

// Copy-on-Write 최적화: Array, Dictionary, String 모두 적용
var arr1 = [1, 2, 3]
var arr2 = arr1    // 아직 동일 버퍼 공유 (복사 지연)
arr2.append(4)     // 이 시점에 실제 복사 발생

// ─────────────────────────────────────────────
// 3. 메모리 레이아웃 확인
// ─────────────────────────────────────────────
import Swift
print(MemoryLayout<Point>.size)      // 16 bytes
print(MemoryLayout<Point>.alignment) // 8 bytes
print(MemoryLayout<Int>.stride)      // 8 bytes

// ─────────────────────────────────────────────
// 4. Instruments Allocations 사용법
// ─────────────────────────────────────────────
// ⌘I → Allocations 선택 → Record
// - "Statistics" 뷰: 타입별 할당 횟수/크기
// - "Call Tree" 뷰: 할당 발생 코드 위치
// - Generation 비교: 두 시점 사이 살아남은 객체 분석
//   Mark Generation A → 작업 → Mark Generation B
//   → 두 세대 사이 새로 생긴 객체 목록

// ─────────────────────────────────────────────
// 5. Heap vs Stack 선택 가이드
// ─────────────────────────────────────────────
// struct(값 타입) → 스택/인라인, ARC 없음, 빠름
//   ✅ 소형 데이터, 모델 타입, 함수 파라미터
// class(참조 타입) → 힙, ARC 오버헤드 있음
//   ✅ 공유 상태, delegate, 대형 객체, 정체성이 중요한 객체`,
    },
  },

  performance_retain_cycle: {
    caption: 'retain cycle 탐지 및 수정 vs Android 메모리 누수 vs JS 클로저 누수',
    android: {
      language: 'kotlin',
      code: `// Android: 메모리 누수 패턴과 LeakCanary

// 1. 대표 누수 패턴: Activity를 static에 저장
class BadSingleton {
    companion object {
        var activity: Activity? = null  // ❌ Activity 누수!
        // Activity가 소멸돼도 static이 참조를 유지 → GC 불가
    }
}

// 해결: Application Context 사용 또는 WeakReference
class GoodSingleton {
    companion object {
        private var activityRef: WeakReference<Activity>? = null

        fun setActivity(activity: Activity) {
            activityRef = WeakReference(activity)
        }
        fun getActivity() = activityRef?.get()
    }
}

// 2. 익명 클래스 / 람다 캡처 누수
class FeedActivity : AppCompatActivity() {
    // ❌ 익명 Runnable이 FeedActivity 암시적 참조
    handler.postDelayed(object : Runnable {
        override fun run() {
            updateFeed()   // this@FeedActivity 캡처
        }
    }, 5000)

    // ✅ static inner class + WeakReference
    class UpdateRunnable(actRef: WeakReference<FeedActivity>) : Runnable {
        private val ref = actRef
        override fun run() {
            ref.get()?.updateFeed()
        }
    }
    handler.postDelayed(UpdateRunnable(WeakReference(this)), 5000)
}

// 3. ViewModel로 Activity 참조 제거 (권장 패턴)
class FeedViewModel : ViewModel() {
    // Activity 참조 없음 — LiveData/Flow로 UI 통신
    private val _feed = MutableStateFlow<List<Item>>(emptyList())
    val feed = _feed.asStateFlow()

    fun loadFeed() {
        viewModelScope.launch {
            _feed.value = repository.getFeed()
        }
    }
    // onCleared() 자동 호출 → 코루틴 자동 취소
}

// 4. LeakCanary 자동 탐지 결과 예시
// ┬───────────────────────────────────────
// │ GC Root: Thread 'main'
// ├─ Handler.mQueue
// ├─ MessageQueue.mMessages[0].obj
// ├─ UpdateRunnable.this$0
// ╰→ FeedActivity (destroyed)
//    Retaining 4.2 MB`,
    },
    web: {
      language: 'typescript',
      code: `// JavaScript: 클로저 / DOM 이벤트 / 타이머 누수

// 1. 이벤트 리스너 누수
class FeedComponent {
  private data: LargeData[]

  mount() {
    // ❌ 화살표 함수 → this(data 포함)를 클로저로 캡처
    window.addEventListener('resize', () => {
      this.data.forEach(item => this.rerender(item))
    })
    // 컴포넌트 언마운트 후에도 리스너 유지 → 누수
  }

  // ✅ 해결: 참조를 변수에 저장해 removeEventListener 호출
  private handleResize = () => {
    this.data.forEach(item => this.rerender(item))
  }

  mount() { window.addEventListener('resize', this.handleResize) }
  unmount() { window.removeEventListener('resize', this.handleResize) }
}

// 2. 타이머 누수
class PollingService {
  private timerId: ReturnType<typeof setInterval> | null = null
  private data: LargeData[] = []

  start() {
    // ❌ clearInterval 없이 GC되면 data 참조 유지
    setInterval(() => {
      this.fetchLatest()  // data 클로저 캡처
    }, 5000)
  }

  // ✅ 타이머 ID 보관 → 정리
  start() {
    this.timerId = setInterval(() => this.fetchLatest(), 5000)
  }
  stop() {
    if (this.timerId !== null) {
      clearInterval(this.timerId)
      this.timerId = null
    }
  }
}

// 3. React useEffect 정리
function FeedScreen({ userId }: { userId: string }) {
  const [feed, setFeed] = useState<Item[]>([])

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()

    fetchFeed(userId, controller.signal).then(data => {
      if (!cancelled) setFeed(data)   // 언마운트 후 setState 방지
    })

    return () => {
      cancelled = true
      controller.abort()             // 진행 중인 요청 취소
    }
  }, [userId])

  return <FeedList items={feed} />
}

// 4. Chrome DevTools로 누수 확인
// Memory 탭 → "Take heap snapshot" (작업 전)
// 작업 수행 후 다시 스냅샷
// "Comparison" 뷰 → #Delta 열 정렬 → 늘어난 객체 확인`,
    },
    ios: {
      language: 'swift',
      code: `// iOS: retain cycle 탐지 및 수정

// ─────────────────────────────────────────────
// 1. 전형적인 retain cycle 패턴
// ─────────────────────────────────────────────
class FeedViewController: UIViewController {
    var viewModel: FeedViewModel?

    func setup() {
        // ❌ 클로저가 self(VC)를 strong capture → retain cycle
        viewModel?.onDataLoaded = {
            self.tableView.reloadData()  // FeedVC → VM → 클로저 → FeedVC
        }
    }
}

// ─────────────────────────────────────────────
// 2. weak/unowned 캡처로 해결
// ─────────────────────────────────────────────
func setup() {
    // weak: self가 nil이 될 수 있을 때
    viewModel?.onDataLoaded = { [weak self] in
        self?.tableView.reloadData()
    }

    // unowned: self가 항상 살아있음이 보장될 때 (더 빠름)
    viewModel?.onProgress = { [unowned self] progress in
        self.progressView.setProgress(progress, animated: true)
    }

    // 여러 참조 동시 캡처
    viewModel?.onError = { [weak self, weak coordinator] error in
        guard let self else { return }
        coordinator?.showError(error, from: self)
    }
}

// ─────────────────────────────────────────────
// 3. Combine에서의 retain cycle
// ─────────────────────────────────────────────
import Combine

class FeedViewController: UIViewController {
    var cancellables = Set<AnyCancellable>()
    var viewModel: FeedViewModel!

    override func viewDidLoad() {
        super.viewDidLoad()

        // ❌ self strong capture
        viewModel.$items
            .sink { items in
                self.updateUI(items)   // retain cycle!
            }
            .store(in: &cancellables)

        // ✅ [weak self]
        viewModel.$items
            .sink { [weak self] items in
                self?.updateUI(items)
            }
            .store(in: &cancellables)
    }
}

// ─────────────────────────────────────────────
// 4. Memory Graph Debugger 사용법
// ─────────────────────────────────────────────
// Xcode → 앱 실행 → Debug 네비게이터 하단 메모리 그래프 버튼 (⌥⌘M)
// - 화면에 모든 살아있는 객체를 노드/엣지 그래프로 표시
// - 사이클 의심 객체 클릭 → 참조 경로 확인
// - "retain cycle" 배지 자동 표시

// ─────────────────────────────────────────────
// 5. Instruments Leaks
// ─────────────────────────────────────────────
// ⌘I → Leaks 선택 → Record
// - 빨간 X: 누수 감지 시점
// - "Leaked Objects" 목록 → 객체 타입·크기·할당 스택
// - "Cycles & Roots" 뷰 → retain cycle 시각화

// 6. deinit 로 해제 확인
class FeedViewController: UIViewController {
    deinit {
        // 이 로그가 출력되지 않으면 누수!
        print("✅ FeedViewController deinit")
    }
}`,
    },
  },

  performance_xctest_measure: {
    caption: 'XCTest measure{} 성능 테스트 vs Android JMH vs Jest bench',
    android: {
      language: 'kotlin',
      code: `// Android: Jetpack Microbenchmark (JMH 기반)
// build.gradle (:benchmark 모듈)
// plugins { id 'com.android.library'; id 'androidx.benchmark' }

import androidx.benchmark.junit4.BenchmarkRule
import androidx.benchmark.junit4.measureRepeated
import androidx.test.ext.junit.runners.AndroidJUnit4
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class FeedParserBenchmark {

    @get:Rule
    val benchmarkRule = BenchmarkRule()

    // 벤치마크 1: 순수 파싱 속도
    @Test
    fun parseJsonBenchmark() {
        val jsonString = InstrumentationRegistry.getInstrumentation()
            .context.assets.open("test_feed.json")
            .bufferedReader().readText()

        benchmarkRule.measureRepeated {
            // runWithTimingDisabled: 측정에서 제외할 셋업
            val parser = runWithTimingDisabled { FeedParser() }

            // 이 블록만 측정
            parser.parse(jsonString)
        }
    }

    // 벤치마크 2: DB 쿼리 속도
    @Test
    fun databaseQueryBenchmark() {
        val db = runWithTimingDisabled {
            Room.inMemoryDatabaseBuilder(
                InstrumentationRegistry.getInstrumentation().targetContext,
                AppDatabase::class.java
            ).build().also { populateTestData(it) }
        }

        benchmarkRule.measureRepeated {
            db.feedDao().getLatestItems(limit = 20)
        }
    }
}

// 결과 출력 예시:
// FeedParserBenchmark.parseJsonBenchmark
//   min   1,234,567 ns   median 1,345,678 ns   max 1,456,789 ns

// Baseline Profile 생성 (앱 시작 최적화)
// ./gradlew :app:generateBaselineProfile
// → src/main/baseline-prof.txt 생성
// → 앱 설치 후 첫 실행부터 AOT 컴파일 적용`,
    },
    web: {
      language: 'typescript',
      code: `// JavaScript: Vitest bench / tinybench

// 1. Vitest bench (권장 — Vite 프로젝트)
import { bench, describe } from 'vitest'
import { FeedParser } from './feedParser'

const testJson = JSON.stringify(
  Array.from({ length: 100 }, (_, i) => ({ id: i, title: \`Item \${i}\` }))
)

describe('FeedParser 벤치마크', () => {
  bench('parse 100 items', () => {
    FeedParser.parse(testJson)
  })

  bench('parse with validation', () => {
    FeedParser.parseWithValidation(testJson)
  })
})

// vitest bench --reporter=verbose
// 결과:
//  name                    hz      min      max    mean    p75    p99   p995
//  parse 100 items    45,123   0.0211   0.0456  0.0222  0.023  0.04   0.045
//  parse with valid   12,456   0.0778   0.1234  0.0803  0.085  0.12   0.123

// 2. tinybench — 프레임워크 독립
import { Bench } from 'tinybench'

const bench2 = new Bench({ time: 1000 })  // 1초간 실행

bench2
  .add('JSON.parse', () => {
    JSON.parse(testJson)
  })
  .add('custom parser', () => {
    FeedParser.parse(testJson)
  })

await bench2.run()
console.table(bench2.table())

// 3. performance.now() 수동 측정
function benchmark(name: string, fn: () => void, iterations = 10000) {
  // 워밍업
  for (let i = 0; i < 100; i++) fn()

  const start = performance.now()
  for (let i = 0; i < iterations; i++) fn()
  const end = performance.now()

  const avgMs = (end - start) / iterations
  console.log(\`\${name}: avg=\${avgMs.toFixed(4)}ms (\${iterations} iterations)\`)
}

benchmark('FeedParser.parse', () => FeedParser.parse(testJson))`,
    },
    ios: {
      language: 'swift',
      code: `// iOS: XCTest measure{} 성능 테스트

import XCTest
@testable import MyApp

class FeedParserPerformanceTests: XCTestCase {

    // ─────────────────────────────────────────────
    // 1. 기본 measure — 10회 반복 평균 측정
    // ─────────────────────────────────────────────
    func testFeedParsePerformance() throws {
        let jsonData = try loadTestJSON("test_feed_100")

        // 10회 반복 실행, 첫 실행은 워밍업
        measure {
            _ = FeedParser.parse(jsonData)
        }
        // 결과: "Average: 0.002 sec, Relative Standard Deviation: 3.4%"
    }

    // ─────────────────────────────────────────────
    // 2. XCTMeasureOptions — 측정 옵션 세밀 조정
    // ─────────────────────────────────────────────
    func testFeedParsePerformanceOptions() throws {
        let jsonData = try loadTestJSON("test_feed_1000")

        let options = XCTMeasureOptions()
        options.iterationCount = 20   // 기본 10 → 20으로 증가
        // options.invocationOptions = [.manuallyStart] // 수동 시작

        measure(options: options) {
            _ = FeedParser.parse(jsonData)
        }
    }

    // ─────────────────────────────────────────────
    // 3. 특정 메트릭 측정 (Xcode 13+)
    // ─────────────────────────────────────────────
    func testFeedParseMemoryUsage() throws {
        let jsonData = try loadTestJSON("test_feed_1000")

        // 메모리 할당량 측정
        measure(metrics: [XCTMemoryMetric()]) {
            _ = FeedParser.parse(jsonData)
        }
    }

    func testScrollPerformance() throws {
        let app = XCUIApplication()
        app.launch()

        // CPU + 메모리 + FPS 동시 측정
        measure(metrics: [
            XCTCPUMetric(),
            XCTMemoryMetric(),
            XCTStorageMetric(),
            XCTClockMetric(),
        ]) {
            app.swipeUp()
            app.swipeUp()
            app.swipeUp()
        }
    }

    // ─────────────────────────────────────────────
    // 4. 성능 베이스라인(Baseline) 설정
    // ─────────────────────────────────────────────
    // 1회 실행 → 우측 "Set Baseline" 클릭
    // 이후 측정이 베이스라인 ± 10% 초과 시 테스트 실패
    // → CI에서 성능 회귀 자동 감지

    // 5. 셋업/티어다운 분리
    func testDatabaseInsertPerformance() throws {
        var db: TestDatabase!

        measureMetrics([.wallClockTime], automaticallyStartMeasuring: false) {
            db = TestDatabase.inMemory()           // 측정 제외
            db.clear()

            startMeasuring()                       // 측정 시작
            db.insert(testItems)
            stopMeasuring()                        // 측정 종료

            db.close()                             // 측정 제외
        }
    }

    // 6. 헬퍼
    private func loadTestJSON(_ name: String) throws -> Data {
        let url = Bundle(for: type(of: self)).url(forResource: name, withExtension: "json")!
        return try Data(contentsOf: url)
    }
}`,
    },
  },

  performance_metrickit: {
    caption: 'MetricKit 실서비스 성능 수집 vs Android Vitals vs Web Vitals',
    android: {
      language: 'kotlin',
      code: `// Android: Android Vitals + Firebase Performance

// 1. Android Vitals (Play Console 자동 수집)
// 별도 코드 없이 Google Play가 자동 측정:
// - ANR Rate (Application Not Responding)
// - Crash Rate
// - Slow Rendering (16ms / 700ms 초과 프레임)
// - Frozen Frames (700ms 초과 프레임)
// - Startup Time (Cold / Warm / Hot)
// → Play Console → Android Vitals 메뉴에서 확인

// 2. Firebase Performance Monitoring
import com.google.firebase.perf.FirebasePerformance
import com.google.firebase.perf.metrics.Trace

class NetworkRepository {
    private val perf = FirebasePerformance.getInstance()

    suspend fun fetchFeed(): List<Item> {
        // 커스텀 트레이스 생성
        val trace = perf.newTrace("feed_fetch")
        trace.start()

        return try {
            val items = api.getFeed()
            trace.putMetric("items_count", items.size.toLong())
            trace.putAttribute("source", "network")
            items
        } catch (e: Exception) {
            trace.putAttribute("error", e.javaClass.simpleName)
            throw e
        } finally {
            trace.stop()
        }
    }
}

// 3. HTTP 요청 자동 측정 (OkHttp 인터셉터)
// firebase-perf-okhttp 의존성 추가 시 자동 적용
// → 모든 HTTP 요청의 응답 시간, 페이로드 크기 자동 수집

// 4. 커스텀 메트릭 ViewModel에서 수집
@HiltViewModel
class FeedViewModel @Inject constructor(
    private val repo: FeedRepository
) : ViewModel() {
    fun loadFeed() {
        viewModelScope.launch {
            val startTime = SystemClock.elapsedRealtime()
            repo.fetchFeed()
            val duration = SystemClock.elapsedRealtime() - startTime

            // Firebase Analytics 이벤트로 전송
            analytics.logEvent("feed_loaded") {
                param("duration_ms", duration)
                param("item_count", items.size.toLong())
            }
        }
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// Web: Core Web Vitals + web-vitals 라이브러리

// 1. web-vitals 라이브러리 (Google 공식)
// npm install web-vitals
import { onLCP, onFID, onCLS, onFCP, onTTFB, onINP } from 'web-vitals'

function sendToAnalytics({ name, value, id, navigationType }: Metric) {
  // Google Analytics 4
  gtag('event', name, {
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    metric_id: id,
    metric_value: value,
    metric_delta: delta,
    navigation_type: navigationType,
  })
}

// Core Web Vitals 측정
onLCP(sendToAnalytics)    // Largest Contentful Paint: 로딩 성능
onFID(sendToAnalytics)    // First Input Delay: 상호작용성 (deprecated)
onINP(sendToAnalytics)    // Interaction to Next Paint: 상호작용성 (2024 대체)
onCLS(sendToAnalytics)    // Cumulative Layout Shift: 시각적 안정성
onFCP(sendToAnalytics)    // First Contentful Paint
onTTFB(sendToAnalytics)   // Time to First Byte

// 2. 기준값 (2024 기준)
// LCP: ≤ 2.5s (Good), ≤ 4.0s (Needs Improvement), > 4.0s (Poor)
// INP: ≤ 200ms (Good), ≤ 500ms (Needs Improvement), > 500ms (Poor)
// CLS: ≤ 0.1 (Good), ≤ 0.25 (Needs Improvement), > 0.25 (Poor)

// 3. PerformanceObserver — 커스텀 메트릭
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'navigation') {
      const nav = entry as PerformanceNavigationTiming
      console.log('DOM Interactive:', nav.domInteractive)
      console.log('DOM Complete:', nav.domComplete)
      console.log('Load Event:', nav.loadEventEnd)
    }
    if (entry.entryType === 'longtask') {
      console.warn('Long Task detected:', entry.duration, 'ms')
    }
  }
})
observer.observe({ entryTypes: ['navigation', 'longtask', 'resource'] })

// 4. Next.js App Router — reportWebVitals
// app/layout.tsx
export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (metric.label === 'web-vital') {
    sendToAnalytics(metric)
  }
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS: MetricKit — 실기기 성능 지표 수집 (iOS 13+)
import MetricKit

// ─────────────────────────────────────────────
// 1. MXMetricManagerSubscriber 구현
// ─────────────────────────────────────────────
class PerformanceMonitor: NSObject, MXMetricManagerSubscriber {

    static let shared = PerformanceMonitor()

    override init() {
        super.init()
        MXMetricManager.shared.add(self)
    }

    // 24시간마다 1회 호출 (앱 실행 시점)
    func didReceive(_ payloads: [MXMetricPayload]) {
        for payload in payloads {
            processMetrics(payload)
        }
    }

    // 앱 크래시 직후 호출 (iOS 14+)
    func didReceive(_ payloads: [MXDiagnosticPayload]) {
        for payload in payloads {
            processDiagnostics(payload)
        }
    }

    private func processMetrics(_ payload: MXMetricPayload) {
        // ── 앱 실행 시간 ──
        if let launchMetrics = payload.applicationLaunchMetrics {
            let resumeTime = launchMetrics.histogrammedResumeTime
            let firstDrawTime = launchMetrics.histogrammedTimeToFirstDraw
            sendMetric("launch_first_draw_p50",
                value: firstDrawTime.bucketEnumerator.allObjects
                    .compactMap { $0 as? MXHistogramBucket<UnitDuration> }
                    .sorted { $0.bucketStart < $1.bucketStart }
                    .first?.bucketStart.converted(to: .milliseconds).value ?? 0
            )
        }

        // ── CPU 사용량 ──
        if let cpuMetrics = payload.cpuMetrics {
            let cpuTime = cpuMetrics.cumulativeCPUTime
            sendMetric("cpu_time_ms", value: cpuTime.converted(to: .milliseconds).value)
        }

        // ── 메모리 ──
        if let memMetrics = payload.memoryMetrics {
            let peakMem = memMetrics.peakMemoryUsage
            sendMetric("peak_memory_mb", value: peakMem.converted(to: .megabytes).value)
        }

        // ── 네트워크 ──
        if let netMetrics = payload.networkTransferMetrics {
            let down = netMetrics.cumulativeWWANDownload
            let up = netMetrics.cumulativeWWANUpload
            sendMetric("cellular_download_mb", value: down.converted(to: .megabytes).value)
            sendMetric("cellular_upload_mb", value: up.converted(to: .megabytes).value)
        }

        // ── 배터리 ──
        if let batteryMetrics = payload.cellularConditionMetrics {
            sendMetric("cellular_bars", value: Double(batteryMetrics.histogrammedCellularBars.totalBucketCount))
        }
    }

    private func processDiagnostics(_ payload: MXDiagnosticPayload) {
        // 크래시 진단
        payload.crashDiagnostics?.forEach { crash in
            let report: [String: Any] = [
                "exception_type": crash.exceptionType?.rawValue ?? 0,
                "exception_code": crash.exceptionCode?.rawValue ?? 0,
                "signal": crash.signal?.rawValue ?? 0,
                "termination_reason": crash.terminationReason ?? "",
                "call_stack": crash.callStackTree.jsonRepresentation(),
            ]
            CrashReporter.send(report)
        }

        // Hang 진단 (앱 무응답)
        payload.hangDiagnostics?.forEach { hang in
            let duration = hang.hangDuration.converted(to: .seconds).value
            sendMetric("hang_duration_s", value: duration)
        }
    }

    private func sendMetric(_ name: String, value: Double) {
        // 분석 서버로 전송
        Analytics.shared.track(name, value: value)
    }
}

// ─────────────────────────────────────────────
// 2. Xcode Organizer — 앱스토어 집계 데이터 확인
// ─────────────────────────────────────────────
// Xcode → Window → Organizer → Metrics 탭
// - Hang Rate: 메인 스레드 블로킹 비율
// - Launch Time: Cold / Resume 실행 시간 분포
// - Memory: 평균/피크 메모리 사용량
// - Scrolling: 드롭 프레임 비율
// - Terminations: 메모리 부족 강제 종료
// → 실제 사용자 기기 기준 통계 (기기 모델별 필터 가능)`,
    },
  },

  performance_lazy_loading: {
    caption: 'lazy var vs Kotlin lazy {} vs JavaScript lazy loading 비교',
    android: {
      language: 'kotlin',
      code: `// Android/Kotlin: lazy {} 지연 초기화

// 1. lazy {} 대리자 — 첫 접근 시 초기화
class ProfileViewModel : ViewModel() {

    // 프로퍼티 첫 접근 시 딱 1회 초기화 (스레드 안전)
    private val heavyRepository: UserRepository by lazy {
        UserRepository(database, apiClient)
    }

    // 기본값: LazyThreadSafetyMode.SYNCHRONIZED (동기화됨)
    // 성능 최적화: 단일 스레드 보장 시 NONE 사용
    private val formatter: DateFormatter by lazy(LazyThreadSafetyMode.NONE) {
        DateFormatter().apply { pattern = "yyyy-MM-dd" }
    }
}

// 2. lateinit var — null 불허 늦은 초기화 (lazy와 차이)
class FeedFragment : Fragment() {
    private lateinit var adapter: FeedAdapter   // 선언 시 초기화 불가
    private lateinit var binding: FragmentFeedBinding

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        binding = FragmentFeedBinding.inflate(layoutInflater)
        adapter = FeedAdapter(requireContext())
        binding.recyclerView.adapter = adapter
    }
    // lazy: 읽기전용(val), 첫 접근 시 초기화
    // lateinit: 읽기쓰기(var), 수동 초기화, isInitialized 확인 가능
}

// 3. 이미지 지연 로딩 — ViewHolder 패턴
class FeedViewHolder(private val binding: ItemFeedBinding) :
    RecyclerView.ViewHolder(binding.root) {

    fun bind(item: FeedItem) {
        binding.titleText.text = item.title
        // Coil: 뷰포트 진입 시 자동 로딩 (RecyclerView 통합)
        binding.thumbnailImage.load(item.imageUrl) {
            placeholder(R.drawable.placeholder)
            error(R.drawable.error_image)
            crossfade(true)
        }
    }
}

// 4. Fragment 지연 초기화 (Navigation Component)
// NavGraph에서 Fragment를 Destination으로만 등록
// 실제 화면 전환 시 Fragment 인스턴스 생성
navController.navigate(R.id.action_feed_to_detail, bundle)`,
    },
    web: {
      language: 'typescript',
      code: `// JavaScript: Dynamic Import / Intersection Observer / React.lazy

// 1. Dynamic Import — 코드 스플리팅
// 번들러(Vite/webpack)가 별도 청크로 분리
async function loadChartLib() {
  const { Chart } = await import('chart.js')   // 필요 시에만 로드
  return new Chart(canvas, config)
}

// 2. React.lazy + Suspense — 컴포넌트 지연 로딩
import { lazy, Suspense } from 'react'

const FeedChart = lazy(() => import('./FeedChart'))  // 별도 청크
const HeavyEditor = lazy(() =>
  import('./HeavyEditor').then(m => ({ default: m.HeavyEditor }))
)

function FeedScreen() {
  return (
    <Suspense fallback={<Skeleton />}>
      <FeedChart data={chartData} />
    </Suspense>
  )
}

// 3. Intersection Observer — 뷰포트 진입 시 로드
function LazyImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }   // 뷰포트 200px 전 미리 로드
    )
    if (imgRef.current) observer.observe(imgRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <img
      ref={imgRef}
      src={loaded ? src : undefined}
      alt={alt}
      loading="lazy"    // 네이티브 브라우저 lazy loading
    />
  )
}

// 4. Route-based Code Splitting (React Router v6)
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  {
    path: '/feed',
    lazy: async () => {
      const { FeedPage } = await import('./pages/FeedPage')
      return { Component: FeedPage }
    },
  },
])

// 5. next/dynamic — Next.js
import dynamic from 'next/dynamic'
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <Skeleton />,
  ssr: false,   // 서버 렌더링 제외
})`,
    },
    ios: {
      language: 'swift',
      code: `// iOS: lazy var / 지연 초기화 패턴

import UIKit

// ─────────────────────────────────────────────
// 1. lazy var — 첫 접근 시 1회 초기화
// ─────────────────────────────────────────────
class FeedViewController: UIViewController {

    // lazy: 첫 접근 시 초기화, 이후 저장된 값 재사용
    lazy var tableView: UITableView = {
        let tv = UITableView(frame: .zero, style: .plain)
        tv.translatesAutoresizingMaskIntoConstraints = false
        tv.register(FeedCell.self, forCellReuseIdentifier: "FeedCell")
        tv.dataSource = self
        tv.delegate = self
        return tv
    }()

    // 계산 비용이 큰 객체 — 실제 필요 시점까지 초기화 지연
    lazy var parser: HeavyJSONParser = HeavyJSONParser()

    lazy var imageCache: NSCache<NSString, UIImage> = {
        let cache = NSCache<NSString, UIImage>()
        cache.countLimit = 100
        cache.totalCostLimit = 50 * 1024 * 1024  // 50MB
        return cache
    }()

    override func viewDidLoad() {
        super.viewDidLoad()
        view.addSubview(tableView)  // 이 시점에 tableView 초기화
        NSLayoutConstraint.activate([
            tableView.topAnchor.constraint(equalTo: view.topAnchor),
            tableView.bottomAnchor.constraint(equalTo: view.bottomAnchor),
            tableView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            tableView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
        ])
    }
}

// ─────────────────────────────────────────────
// 2. lazy var vs computed property 차이
// ─────────────────────────────────────────────
class Example {
    // lazy var: 초기화 1회, 결과 저장
    lazy var expensiveValue: Int = {
        print("초기화 실행")   // 딱 1번만 출력
        return heavyComputation()
    }()

    // computed property: 매번 실행
    var computedValue: Int {
        return heavyComputation()   // 접근마다 실행
    }
}

// ─────────────────────────────────────────────
// 3. 이미지 지연 로딩 — Kingfisher
// ─────────────────────────────────────────────
import Kingfisher

// UIImageView 확장으로 간단 사용
imageView.kf.setImage(
    with: URL(string: item.imageURL),
    placeholder: UIImage(systemName: "photo"),
    options: [
        .transition(.fade(0.2)),
        .cacheOriginalImage,
        .loadDiskFileSynchronously,
    ]
)

// 사전 로딩 (스크롤 예상 방향)
let prefetcher = ImagePrefetcher(urls: nextPageURLs) {
    skippedResources, failedResources, completedResources in
    print("prefetch 완료: \\(completedResources.count)개")
}
prefetcher.start()

// ─────────────────────────────────────────────
// 4. 모듈/프레임워크 지연 로딩
// ─────────────────────────────────────────────
// Swift Package Manager에서 특정 타겟만 조건부 import
#if canImport(ARKit)
import ARKit
// AR 기능 — 지원 기기에서만 초기화
#endif

// 동적 라이브러리 (dlopen) — 거의 사용 안 함, 참고용
// let handle = dlopen("libHeavy.dylib", RTLD_LAZY)`,
    },
  },

  performance_image_optimization: {
    caption: '이미지 최적화 (Kingfisher/SDWebImage) vs Glide vs Next/Image',
    android: {
      language: 'kotlin',
      code: `// Android: Glide / Coil 이미지 최적화

// 1. Glide — 성숙한 이미지 라이브러리
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy

// 기본 로딩
Glide.with(context)
    .load(imageUrl)
    .placeholder(R.drawable.placeholder)
    .error(R.drawable.error)
    .into(imageView)

// 고급 최적화 옵션
Glide.with(context)
    .load(imageUrl)
    .diskCacheStrategy(DiskCacheStrategy.ALL)  // 원본+변환 모두 캐시
    .override(300, 300)                         // 디코딩 크기 제한 (OOM 방지)
    .centerCrop()
    .transition(DrawableTransitionOptions.withCrossFade())
    .thumbnail(0.1f)                            // 10% 크기 썸네일 먼저 표시
    .into(imageView)

// 2. Coil — Kotlin 코루틴 기반 (현대적 권장)
import coil.load
import coil.size.Size
import coil.transform.RoundedCornersTransformation

imageView.load(imageUrl) {
    size(Size.ORIGINAL)
    transformations(RoundedCornersTransformation(16f))
    memoryCachePolicy(CachePolicy.ENABLED)
    diskCachePolicy(CachePolicy.ENABLED)
    crossfade(true)
}

// 3. Glide RequestManager 재사용 (Fragment/Activity 수명주기 연동)
class FeedAdapter(private val glide: RequestManager) : RecyclerView.Adapter<...>() {
    // Activity/Fragment 수명주기에 맞게 요청 자동 취소
    override fun onBindViewHolder(holder: FeedViewHolder, position: Int) {
        glide.load(items[position].imageUrl)
            .into(holder.imageView)
    }
}

// 4. 이미지 샘플링 (대형 이미지 OOM 방지)
fun decodeSampledBitmap(res: Resources, resId: Int, reqWidth: Int, reqHeight: Int): Bitmap {
    return BitmapFactory.Options().run {
        inJustDecodeBounds = true
        BitmapFactory.decodeResource(res, resId, this)

        inSampleSize = calculateInSampleSize(this, reqWidth, reqHeight)
        inJustDecodeBounds = false
        BitmapFactory.decodeResource(res, resId, this)
    }
}

fun calculateInSampleSize(options: BitmapFactory.Options, reqW: Int, reqH: Int): Int {
    val (height, width) = options.outHeight to options.outWidth
    var inSampleSize = 1
    if (height > reqH || width > reqW) {
        val halfH = height / 2; val halfW = width / 2
        while (halfH / inSampleSize >= reqH && halfW / inSampleSize >= reqW) {
            inSampleSize *= 2
        }
    }
    return inSampleSize
}`,
    },
    web: {
      language: 'typescript',
      code: `// Web: Next/Image + 브라우저 네이티브 최적화

// 1. Next.js <Image> — 자동 최적화
import Image from 'next/image'

// 기본 사용
<Image
  src="/hero.jpg"
  alt="히어로 이미지"
  width={800}
  height={600}
  priority          // LCP 이미지 — preload 추가
/>

// 반응형 이미지
<Image
  src={user.avatarUrl}
  alt={user.name}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
/>

// 외부 이미지 도메인 허용 (next.config.js)
// images: { remotePatterns: [{ hostname: 'cdn.example.com' }] }
// → WebP/AVIF 자동 변환, srcset 자동 생성, lazy loading 자동 적용

// 2. 브라우저 네이티브 최적화
// HTML
// <img src="image.jpg" loading="lazy" decoding="async" fetchpriority="high" />
// <picture>
//   <source srcset="image.avif" type="image/avif" />
//   <source srcset="image.webp" type="image/webp" />
//   <img src="image.jpg" alt="..." />
// </picture>

// 3. 이미지 Intersection Observer 가상 스크롤
function useImageLazyLoad(threshold = 0.1) {
  const ref = useRef<HTMLImageElement>(null)
  const [src, setSrc] = useState<string | undefined>()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSrc(el.dataset.src)
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin: '100px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, src }
}

// 4. 이미지 포맷별 크기 비교 (동일 품질 기준)
// JPEG: 100KB | PNG: 200KB | WebP: 60KB | AVIF: 40KB
// → AVIF 우선, WebP fallback, JPEG 최후 지원
// → Squoosh, Sharp, ImageMagick으로 변환`,
    },
    ios: {
      language: 'swift',
      code: `// iOS: Kingfisher / SDWebImage + 네이티브 최적화

import Kingfisher
import UIKit

// ─────────────────────────────────────────────
// 1. Kingfisher — Swift 네이티브 이미지 라이브러리
// ─────────────────────────────────────────────

// 기본 로딩 (UIImageView 확장)
imageView.kf.setImage(with: URL(string: urlString))

// 상세 옵션
imageView.kf.setImage(
    with: URL(string: item.imageURL),
    placeholder: UIImage(systemName: "photo.fill"),
    options: [
        .transition(.fade(0.25)),                    // 크로스페이드
        .cacheOriginalImage,                          // 원본 캐시
        .scaleFactor(UIScreen.main.scale),            // 레티나 대응
        .processor(
            DownsamplingImageProcessor(size: imageView.bounds.size)
        ),                                           // 다운샘플링
        .backgroundDecode,                           // 백그라운드 디코딩
    ]
)

// 2. 다운샘플링 — 핵심 메모리 최적화
// UIImage(named:)는 전체 해상도로 디코딩 → 메모리 과다 사용
// DownsamplingImageProcessor는 표시 크기에 맞게 디코딩

// 직접 구현 (ImageIO 사용 — Kingfisher 없이)
func downsample(imageAt url: URL, to pointSize: CGSize, scale: CGFloat) -> UIImage? {
    let imageSourceOptions = [kCGImageSourceShouldCache: false] as CFDictionary
    guard let source = CGImageSourceCreateWithURL(url as CFURL, imageSourceOptions) else {
        return nil
    }
    let maxDimensionInPixels = max(pointSize.width, pointSize.height) * scale
    let options: CFDictionary = [
        kCGImageSourceCreateThumbnailFromImageAlways: true,
        kCGImageSourceShouldCacheImmediately: true,      // 백그라운드 스레드에서 디코딩
        kCGImageSourceCreateThumbnailWithTransform: true,
        kCGImageSourceThumbnailMaxPixelSize: maxDimensionInPixels,
    ] as CFDictionary
    guard let cgImage = CGImageSourceCreateThumbnailAtIndex(source, 0, options) else {
        return nil
    }
    return UIImage(cgImage: cgImage)
}

// 3. 이미지 캐시 설정
let cache = ImageCache.default
cache.memoryStorage.config.totalCostLimit = 50 * 1024 * 1024  // 50MB 메모리
cache.diskStorage.config.sizeLimit = 200 * 1024 * 1024        // 200MB 디스크
cache.diskStorage.config.expiration = .days(7)                  // 7일 만료

// 4. 사전 로딩 (다음 페이지 이미지 미리 캐시)
let urls = nextPageItems.compactMap { URL(string: $0.imageURL) }
let prefetcher = ImagePrefetcher(
    urls: urls,
    options: [.downloadPriority(0.3)]   // 낮은 우선순위
) { skipped, failed, completed in
    print("prefetch: \\(completed.count) 완료")
}
prefetcher.start()

// 5. SwiftUI AsyncImage (iOS 15+) — 기본 내장
import SwiftUI

struct FeedItemView: View {
    let item: FeedItem

    var body: some View {
        AsyncImage(url: URL(string: item.imageURL)) { phase in
            switch phase {
            case .empty:    ProgressView()
            case .success(let image):
                image
                    .resizable()
                    .aspectRatio(contentMode: .fill)
            case .failure:  Image(systemName: "photo.fill")
            @unknown default: EmptyView()
            }
        }
        .frame(width: 80, height: 80)
        .clipShape(RoundedRectangle(cornerRadius: 8))
    }
}`,
    },
  },

  performance_background_task: {
    caption: 'BGTaskScheduler vs WorkManager vs Service Worker',
    android: {
      language: 'kotlin',
      code: `// Android: WorkManager — 신뢰성 있는 백그라운드 작업

import androidx.work.*
import java.util.concurrent.TimeUnit

// 1. Worker 구현 — 단순 백그라운드 작업
class SyncWorker(ctx: Context, params: WorkerParameters) : CoroutineWorker(ctx, params) {

    override suspend fun doWork(): Result {
        return try {
            val userId = inputData.getString("user_id") ?: return Result.failure()

            // 최대 실행 시간: 10분 (초과 시 WorkManager가 중단)
            val syncResult = repository.syncData(userId)

            // 결과 데이터 반환
            val output = workDataOf("synced_count" to syncResult.count)
            Result.success(output)
        } catch (e: Exception) {
            if (runAttemptCount < 3) {
                Result.retry()   // 최대 3회 재시도
            } else {
                Result.failure()
            }
        }
    }
}

// 2. WorkRequest 빌더 — 제약 조건 설정
val constraints = Constraints.Builder()
    .setRequiredNetworkType(NetworkType.CONNECTED)
    .setRequiresBatteryNotLow(true)
    .setRequiresStorageNotLow(true)
    .build()

// 한 번 실행
val oneTimeWork = OneTimeWorkRequestBuilder<SyncWorker>()
    .setConstraints(constraints)
    .setInputData(workDataOf("user_id" to userId))
    .setBackoffCriteria(BackoffPolicy.EXPONENTIAL, 30, TimeUnit.SECONDS)
    .build()

// 주기적 실행 (최소 간격 15분)
val periodicWork = PeriodicWorkRequestBuilder<SyncWorker>(
    repeatInterval = 1,
    repeatIntervalTimeUnit = TimeUnit.HOURS,
    flexTimeInterval = 15,
    flexTimeIntervalUnit = TimeUnit.MINUTES  // 마지막 15분 이내 실행 허용
)
    .setConstraints(constraints)
    .build()

// 3. 작업 등록 및 추적
val workManager = WorkManager.getInstance(context)

// 즉시 실행
workManager.enqueue(oneTimeWork)

// 중복 방지 (같은 이름이면 기존 작업 유지/대체)
workManager.enqueueUniquePeriodicWork(
    "hourly_sync",
    ExistingPeriodicWorkPolicy.KEEP,   // 또는 REPLACE
    periodicWork
)

// 결과 관찰
workManager.getWorkInfoByIdLiveData(oneTimeWork.id)
    .observe(this) { workInfo ->
        when (workInfo?.state) {
            WorkInfo.State.SUCCEEDED -> {
                val count = workInfo.outputData.getInt("synced_count", 0)
                showSuccess("동기화 완료: \${count}개")
            }
            WorkInfo.State.FAILED -> showError("동기화 실패")
            WorkInfo.State.RUNNING -> showProgress()
            else -> Unit
        }
    }`,
    },
    web: {
      language: 'typescript',
      code: `// Web: Service Worker + Background Sync API

// service-worker.ts
declare const self: ServiceWorkerGlobalScope

// 1. Service Worker 등록
// main.ts
if ('serviceWorker' in navigator) {
  const registration = await navigator.serviceWorker.register('/sw.js', {
    scope: '/',
    updateViaCache: 'none',
  })
  console.log('SW 등록됨:', registration.scope)
}

// 2. 캐시 전략 (Workbox 활용)
// npm install workbox-strategies workbox-routing
import { registerRoute } from 'workbox-routing'
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

// 이미지: Cache First (1주일 캐시)
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-v1',
    plugins: [new ExpirationPlugin({ maxEntries: 60, maxAgeSeconds: 7 * 24 * 60 * 60 })],
  })
)

// API: Network First (오프라인 시 캐시 사용)
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({ cacheName: 'api-cache', networkTimeoutSeconds: 3 })
)

// 3. Background Sync — 오프라인 중 요청 큐잉
// 브라우저가 온라인 복구 시 자동 재전송
self.addEventListener('sync', (event: SyncEvent) => {
  if (event.tag === 'post-like') {
    event.waitUntil(flushLikeQueue())
  }
})

async function flushLikeQueue() {
  const db = await openDB('like-queue', 1)
  const likes = await db.getAll('queue')
  await Promise.all(likes.map(like =>
    fetch('/api/likes', { method: 'POST', body: JSON.stringify(like) })
      .then(() => db.delete('queue', like.id))
  ))
}

// 4. Periodic Background Sync (Chrome 80+)
// 주기적 백그라운드 데이터 갱신
self.addEventListener('periodicsync', (event: PeriodicSyncEvent) => {
  if (event.tag === 'feed-sync') {
    event.waitUntil(syncFeedData())
  }
})

// 등록 (최소 간격: 브라우저가 결정)
const registration = await navigator.serviceWorker.ready
await (registration as any).periodicSync.register('feed-sync', {
  minInterval: 24 * 60 * 60 * 1000,   // 최소 24시간
})`,
    },
    ios: {
      language: 'swift',
      code: `// iOS: BGTaskScheduler — 백그라운드 작업 스케줄링 (iOS 13+)
import BackgroundTasks
import OSLog

private let logger = Logger(subsystem: "com.example.MyApp", category: "BGTask")

// ─────────────────────────────────────────────
// 1. Info.plist에 허용 identifier 등록 필수
// ─────────────────────────────────────────────
// <key>BGTaskSchedulerPermittedIdentifiers</key>
// <array>
//     <string>com.example.MyApp.sync</string>
//     <string>com.example.MyApp.refresh</string>
// </array>

// ─────────────────────────────────────────────
// 2. 앱 실행 시 핸들러 등록 (AppDelegate / @main)
// ─────────────────────────────────────────────
@main
struct MyApp: App {
    init() {
        registerBackgroundTasks()
    }

    var body: some Scene {
        WindowGroup { ContentView() }
    }
}

func registerBackgroundTasks() {
    // BGAppRefreshTask — 짧은 작업 (30초 이내)
    BGTaskScheduler.shared.register(
        forTaskWithIdentifier: "com.example.MyApp.refresh",
        using: nil
    ) { task in
        handleAppRefresh(task: task as! BGAppRefreshTask)
    }

    // BGProcessingTask — 긴 작업 (수분, 네트워크/전원 조건 설정 가능)
    BGTaskScheduler.shared.register(
        forTaskWithIdentifier: "com.example.MyApp.sync",
        using: nil
    ) { task in
        handleDatabaseSync(task: task as! BGProcessingTask)
    }
}

// ─────────────────────────────────────────────
// 3. 작업 스케줄링 — 앱 백그라운드 전환 시 예약
// ─────────────────────────────────────────────
func scheduleBackgroundRefresh() {
    let request = BGAppRefreshTaskRequest(identifier: "com.example.MyApp.refresh")
    request.earliestBeginDate = Date(timeIntervalSinceNow: 15 * 60)  // 15분 후 최조 실행

    do {
        try BGTaskScheduler.shared.submit(request)
        logger.info("BGAppRefresh 예약됨")
    } catch {
        logger.error("BGTask 예약 실패: \\(error.localizedDescription)")
    }
}

func scheduleDatabaseSync() {
    let request = BGProcessingTaskRequest(identifier: "com.example.MyApp.sync")
    request.requiresNetworkConnectivity = true   // 네트워크 필요
    request.requiresExternalPower = false        // 충전 중 불필요

    do {
        try BGTaskScheduler.shared.submit(request)
    } catch {
        logger.error("BGProcessing 예약 실패: \\(error.localizedDescription)")
    }
}

// ─────────────────────────────────────────────
// 4. 작업 핸들러 구현
// ─────────────────────────────────────────────
func handleAppRefresh(task: BGAppRefreshTask) {
    // 다음 실행 예약 (연속 실행을 위해 핸들러 안에서 다시 예약)
    scheduleBackgroundRefresh()

    let syncTask = Task {
        do {
            try await FeedRepository.shared.fetchLatest()
            task.setTaskCompleted(success: true)
            logger.info("BGRefresh 완료")
        } catch {
            task.setTaskCompleted(success: false)
            logger.error("BGRefresh 실패: \\(error)")
        }
    }

    // 시스템이 시간 초과 시 expirationHandler 호출
    task.expirationHandler = {
        syncTask.cancel()
        logger.warning("BGRefresh 시간 초과 — 강제 중단")
    }
}

func handleDatabaseSync(task: BGProcessingTask) {
    scheduleDatabaseSync()   // 다음 실행 예약

    let syncTask = Task {
        do {
            try await DatabaseSyncManager.shared.fullSync()
            task.setTaskCompleted(success: true)
        } catch {
            task.setTaskCompleted(success: false)
        }
    }
    task.expirationHandler = { syncTask.cancel() }
}

// ─────────────────────────────────────────────
// 5. 디버깅 — Simulator에서 강제 실행
// ─────────────────────────────────────────────
// Xcode → 앱 실행 중 → Debug → Simulate Background Fetch
// 또는 lldb 콘솔:
// e -l objc -- (void)[[BGTaskScheduler sharedScheduler] _simulateLaunchForTaskWithIdentifier:@"com.example.MyApp.refresh"]`,
    },
  },

  // === src/data/codeBlocks-ch14.ts ===
a11y_voiceover_label: {
    caption: 'accessibilityLabel/Hint/Trait vs TalkBack contentDescription vs ARIA label/role',
    ios: {
      language: 'swift',
      code: `import UIKit

// ──────────────────────────────────────────────
// UIKit: accessibilityLabel / accessibilityHint / accessibilityTraits
// ──────────────────────────────────────────────

// 기본 레이블 설정
let likeButton = UIButton(type: .system)
likeButton.setImage(UIImage(systemName: "heart"), for: .normal)

// VoiceOver가 읽을 이름
likeButton.accessibilityLabel = "좋아요"

// 사용자가 잠시 멈출 때 읽어주는 추가 힌트
likeButton.accessibilityHint = "두 번 탭하면 게시물에 좋아요를 추가합니다"

// 현재 상태값 (토글, 슬라이더 등)
likeButton.accessibilityValue = "선택됨"   // 좋아요가 눌린 상태

// 역할/상태를 나타내는 트레이트 (복수 조합 가능)
likeButton.accessibilityTraits = [
    .button,         // 탭 가능한 버튼
    .selected,       // 현재 선택된 상태
    // .link          // 링크처럼 동작
    // .header        // 섹션 헤더
    // .image         // 이미지
    // .adjustable    // 슬라이더처럼 증감 가능
    // .staticText    // 편집 불가 텍스트
    // .notEnabled    // 비활성화
]

// 이미지에 대한 접근성 설명
let profileImage = UIImageView()
profileImage.isAccessibilityElement = true
profileImage.accessibilityLabel = "홍길동 프로필 사진"
profileImage.accessibilityTraits = .image

// 장식용 이미지는 VoiceOver에서 숨김
let decorativeImage = UIImageView()
decorativeImage.isAccessibilityElement = false

// 접근성 요소 숨기기 (요소와 그 하위 전체를 숨김)
let backgroundView = UIView()
backgroundView.accessibilityElementsHidden = true

// ──────────────────────────────────────────────
// 동적 상태 갱신: 좋아요 토글 예시
// ──────────────────────────────────────────────
var isLiked = false {
    didSet {
        likeButton.accessibilityLabel = isLiked ? "좋아요 취소" : "좋아요"
        likeButton.accessibilityValue = isLiked ? "선택됨" : "선택 안 됨"
        if isLiked {
            likeButton.accessibilityTraits.insert(.selected)
        } else {
            likeButton.accessibilityTraits.remove(.selected)
        }
    }
}`,
    },
    android: {
      language: 'kotlin',
      code: `// Android: TalkBack은 contentDescription / importantForAccessibility 사용

// XML 레이아웃
/*
<ImageButton
    android:id="@+id/likeButton"
    android:contentDescription="좋아요"
    android:src="@drawable/ic_heart"
    android:importantForAccessibility="yes" />

<!-- 장식용 이미지 숨기기 -->
<ImageView
    android:contentDescription="@null"
    android:importantForAccessibility="no" />
*/

// Kotlin 코드에서 동적으로 설정
class ArticleViewHolder(itemView: View) {
    val likeButton: ImageButton = itemView.findViewById(R.id.likeButton)

    fun bind(isLiked: Boolean) {
        // contentDescription: TalkBack이 읽는 텍스트
        likeButton.contentDescription = if (isLiked) "좋아요 취소" else "좋아요"

        // 추가 힌트 (Android 8.0+ AccessibilityNodeInfo)
        ViewCompat.setAccessibilityDelegate(likeButton, object : AccessibilityDelegateCompat() {
            override fun onInitializeAccessibilityNodeInfo(
                host: View,
                info: AccessibilityNodeInfoCompat
            ) {
                super.onInitializeAccessibilityNodeInfo(host, info)
                // 역할 힌트: "버튼" 대신 사용자 정의 역할 설명
                info.roleDescription = "좋아요 버튼"
                // 상태 설명
                info.stateDescription = if (isLiked) "선택됨" else "선택 안 됨"
                // 툴팁 힌트 (iOS의 accessibilityHint 유사)
                info.tooltipText = "두 번 탭하면 좋아요를 추가합니다"
            }
        })

        // 비활성화 처리
        likeButton.isEnabled = false
        likeButton.importantForAccessibility = View.IMPORTANT_FOR_ACCESSIBILITY_NO
    }
}

// 접근성 트리에서 완전히 제거
backgroundView.importantForAccessibility = View.IMPORTANT_FOR_ACCESSIBILITY_NO_HIDE_DESCENDANTS`,
    },
    web: {
      language: 'tsx',
      code: `// 웹: ARIA label / role / description

// ──────────────────────────────────────────────
// React: ARIA 속성으로 접근성 제공
// ──────────────────────────────────────────────
interface LikeButtonProps {
  isLiked: boolean;
  onToggle: () => void;
}

function LikeButton({ isLiked, onToggle }: LikeButtonProps) {
  return (
    <button
      onClick={onToggle}
      // aria-label: 스크린 리더가 읽는 텍스트 (button 텍스트 대신)
      aria-label={isLiked ? "좋아요 취소" : "좋아요"}
      // aria-pressed: 토글 버튼의 눌림 상태
      aria-pressed={isLiked}
      // aria-describedby: 추가 설명 요소 연결
      aria-describedby="like-hint"
    >
      <HeartIcon />
    </button>
  );
}

// 이미지 접근성
function ProfileImage({ name }: { name: string }) {
  return (
    <>
      {/* 의미 있는 이미지: alt 텍스트 제공 */}
      <img src="/profile.jpg" alt={\`\${name} 프로필 사진\`} />

      {/* 장식용 이미지: alt="" 로 스크린 리더 무시 */}
      <img src="/decoration.png" alt="" role="presentation" />

      {/* SVG 아이콘: aria-hidden으로 숨기기 */}
      <svg aria-hidden="true" focusable="false">
        <use href="#icon-heart" />
      </svg>
    </>
  );
}

// role 속성으로 의미론적 역할 부여
function CustomButton() {
  return (
    <div
      role="button"           // 스크린 리더에게 버튼임을 알림
      tabIndex={0}            // 키보드 포커스 가능
      aria-label="설정 열기"
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <SettingsIcon />
    </div>
  );
}`,
    },
  },

  a11y_swiftui_modifiers: {
    caption: 'SwiftUI accessibility modifiers vs Compose semantics vs React ARIA',
    ios: {
      language: 'swift',
      code: `import SwiftUI

// ──────────────────────────────────────────────
// SwiftUI: .accessibility* 수식어 체계
// ──────────────────────────────────────────────

struct ProductCard: View {
    let product: Product
    @State private var isFavorite = false

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            // 이미지에 레이블 부여
            Image(product.imageName)
                .resizable()
                .accessibilityLabel("\\(product.name) 상품 이미지")
                .accessibilityAddTraits(.isImage)

            Text(product.name)
                .font(.headline)
                // 섹션 헤더로 마킹 (VoiceOver 로터 탐색에 등장)
                .accessibilityAddTraits(.isHeader)

            Text(product.price, format: .currency(code: "KRW"))
                // 커스텀 접근성 레이블 (숫자 그대로 읽히는 대신)
                .accessibilityLabel("가격 \\(product.formattedPrice)")

            // 장식용 구분선: VoiceOver에서 숨김
            Divider()
                .accessibilityHidden(true)

            // 토글 버튼
            Button(action: { isFavorite.toggle() }) {
                Image(systemName: isFavorite ? "heart.fill" : "heart")
            }
            .accessibilityLabel(isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가")
            .accessibilityHint("두 번 탭하면 즐겨찾기 목록에서 \\(isFavorite ? "제거" : "추가")됩니다")
            // 조건부 트레이트
            .accessibilityAddTraits(isFavorite ? .isSelected : [])
            .accessibilityRemoveTraits(isFavorite ? [] : .isSelected)
        }
        // 카드 전체를 단일 접근성 요소로 그룹핑
        .accessibilityElement(children: .combine)
        .accessibilityLabel("\\(product.name), \\(product.formattedPrice)")
        .accessibilityHint("두 번 탭하면 상품 상세 페이지로 이동합니다")
    }
}

// ──────────────────────────────────────────────
// .accessibilityInputLabels: 음성 제어용 이름 목록
// ──────────────────────────────────────────────
Button("구매하기") { /* ... */ }
    .accessibilityInputLabels(["구매", "구매하기", "결제", "주문"])
// 음성 제어에서 "구매" "결제" 등 다양한 음성 명령 지원

// ──────────────────────────────────────────────
// .accessibilitySortPriority: 포커스 순서 제어
// ──────────────────────────────────────────────
VStack {
    Text("부제목").accessibilitySortPriority(0)   // 나중에 읽힘
    Text("제목").accessibilitySortPriority(1)     // 먼저 읽힘
}

// ──────────────────────────────────────────────
// .accessibilityAction: 커스텀 액션
// ──────────────────────────────────────────────
Text(product.name)
    .accessibilityAction(named: "장바구니에 추가") {
        CartManager.shared.add(product)
    }
    .accessibilityAction(named: "즐겨찾기") {
        FavoriteManager.shared.toggle(product)
    }`,
    },
    android: {
      language: 'kotlin',
      code: `// Jetpack Compose: Semantics API

import androidx.compose.ui.semantics.*
import androidx.compose.foundation.semantics.*

@Composable
fun ProductCard(product: Product) {
    var isFavorite by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            // 카드 전체를 단일 접근성 노드로 병합
            .semantics(mergeDescendants = true) {
                contentDescription = "\${product.name}, \${product.formattedPrice}"
                onClick(label = "상품 상세 보기") { true }
            }
    ) {
        Image(
            painter = painterResource(product.imageRes),
            contentDescription = "\${product.name} 상품 이미지"
        )

        Text(
            text = product.name,
            modifier = Modifier.semantics {
                // 헤더로 지정 (TalkBack 탐색)
                heading()
            }
        )

        Text(
            text = product.formattedPrice,
            modifier = Modifier.semantics {
                contentDescription = "가격 \${product.formattedPrice}"
            }
        )

        // 장식용 요소 숨기기
        HorizontalDivider(
            modifier = Modifier.semantics { invisibleToUser() }
        )

        // 토글 버튼
        IconButton(
            onClick = { isFavorite = !isFavorite },
            modifier = Modifier.semantics {
                contentDescription = if (isFavorite) "즐겨찾기 해제" else "즐겨찾기 추가"
                stateDescription = if (isFavorite) "선택됨" else "선택 안 됨"
                // 커스텀 액션 추가
                customActions = listOf(
                    CustomAccessibilityAction("장바구니에 추가") {
                        CartManager.add(product); true
                    }
                )
            }
        ) {
            Icon(
                imageVector = if (isFavorite) Icons.Filled.Favorite else Icons.Outlined.FavoriteBorder,
                contentDescription = null   // 부모 semantics에서 처리
            )
        }
    }
}`,
    },
    web: {
      language: 'tsx',
      code: `// React: ARIA + React Aria 라이브러리

import { useButton, useToggleButton } from '@react-aria/button';
import { useToggleState } from '@react-stately/toggle';

// ──────────────────────────────────────────────
// React Aria: 접근성 훅 기반 컴포넌트
// ──────────────────────────────────────────────
function FavoriteButton({ product }: { product: Product }) {
  const state = useToggleState({ defaultSelected: false });
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useToggleButton(
    {
      'aria-label': state.isSelected ? '즐겨찾기 해제' : '즐겨찾기 추가',
    },
    state,
    ref
  );

  return (
    <button {...buttonProps} ref={ref}>
      {state.isSelected ? <HeartFillIcon /> : <HeartIcon />}
    </button>
  );
}

// ──────────────────────────────────────────────
// 기본 ARIA 패턴
// ──────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  return (
    <article
      // 카드 전체에 레이블
      aria-label={\`\${product.name}, \${product.formattedPrice}\`}
    >
      <img src={product.imageUrl} alt={\`\${product.name} 상품 이미지\`} />

      {/* 헤더 역할 */}
      <h3>{product.name}</h3>

      <p>
        {/* 스크린 리더용 숨김 텍스트 */}
        <span className="sr-only">가격: </span>
        <span aria-label={\`\${product.formattedPrice}원\`}>
          {product.formattedPrice}
        </span>
      </p>

      {/* 장식용 요소 숨기기 */}
      <hr aria-hidden="true" />

      <FavoriteButton product={product} />
    </article>
  );
}

// sr-only 유틸리티 CSS (시각적으로 숨기지만 스크린 리더는 읽음)
/*
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}
*/`,
    },
  },

  a11y_dynamic_type: {
    caption: 'Dynamic Type (UIFont.preferredFont) vs Android sp units vs rem/em CSS',
    ios: {
      language: 'swift',
      code: `import UIKit
import SwiftUI

// ──────────────────────────────────────────────
// UIKit: Dynamic Type — 시스템 텍스트 크기 설정에 자동 반응
// ──────────────────────────────────────────────

// ✅ Dynamic Type 대응 폰트 (사용자 설정에 따라 자동 조정)
let titleLabel = UILabel()
titleLabel.font = UIFont.preferredFont(forTextStyle: .title1)
titleLabel.adjustsFontForContentSizeCategory = true  // 런타임 변경 반응

// 텍스트 스타일 목록 (iOS 권장 스케일)
// .largeTitle   — 34pt (기본) / Accessibility XL에서 ~56pt
// .title1       — 28pt
// .title2       — 22pt
// .title3       — 20pt
// .headline     — 17pt Bold
// .body         — 17pt          ← 본문 기본값
// .callout      — 16pt
// .subheadline  — 15pt
// .footnote     — 13pt
// .caption1     — 12pt
// .caption2     — 11pt

// ──────────────────────────────────────────────
// 커스텀 폰트 + Dynamic Type 결합
// ──────────────────────────────────────────────
let customFont = UIFont(name: "Pretendard-Regular", size: 17)!
let scaledFont = UIFontMetrics(forTextStyle: .body).scaledFont(for: customFont)
titleLabel.font = scaledFont
titleLabel.adjustsFontForContentSizeCategory = true

// ──────────────────────────────────────────────
// Accessibility 크기 대응: numberOfLines
// ──────────────────────────────────────────────
let bodyLabel = UILabel()
bodyLabel.font = UIFont.preferredFont(forTextStyle: .body)
bodyLabel.adjustsFontForContentSizeCategory = true
bodyLabel.numberOfLines = 0       // ✅ 줄 수 제한 없음 (큰 폰트에서 자동 래핑)
// bodyLabel.numberOfLines = 1    // ❌ Accessibility 크기에서 잘림

// ──────────────────────────────────────────────
// SwiftUI: Dynamic Type 자동 지원
// ──────────────────────────────────────────────
struct ContentView: View {
    var body: some View {
        VStack(alignment: .leading) {
            // SwiftUI Font는 기본적으로 Dynamic Type 자동 반응
            Text("제목")
                .font(.title)            // UIFont.preferredFont(.title1) 에 대응

            Text("본문 내용입니다.")
                .font(.body)

            // 커스텀 폰트 + Dynamic Type
            Text("커스텀 폰트")
                .font(.custom("Pretendard-Regular", size: 17, relativeTo: .body))
        }
        // 최소 폰트 스케일 제한 (0.8 = 기본 크기의 80% 이하로는 줄이지 않음)
        .minimumScaleFactor(0.8)
        .lineLimit(nil)   // 줄 수 제한 없음
    }
}

// ──────────────────────────────────────────────
// UIContentSizeCategory 변경 감지 (UIKit)
// ──────────────────────────────────────────────
class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(handleContentSizeCategoryChange),
            name: UIContentSizeCategory.didChangeNotification,
            object: nil
        )
    }

    @objc func handleContentSizeCategoryChange() {
        // 폰트 크기 변경에 따라 레이아웃 재계산
        view.setNeedsLayout()
        // Auto Layout + adjustsFontForContentSizeCategory 가 있으면 자동 처리됨
    }
}`,
    },
    android: {
      language: 'kotlin',
      code: `// Android: sp 단위로 텍스트 크기 설정 → 시스템 텍스트 크기 설정에 반응

/* res/values/styles.xml */
/*
<style name="AppTheme" parent="Theme.Material3.DayNight">
    <item name="android:fontScale">1.0</item>
</style>
*/

/* XML 레이아웃에서 sp 사용 */
/*
<TextView
    android:textSize="17sp"
    android:textAppearance="?attr/textAppearanceBody1" />

<!-- Material 텍스트 스타일 사용 (권장) -->
<TextView
    android:textAppearance="@style/TextAppearance.Material3.BodyLarge" />
    <!-- BodyLarge = 16sp, BodyMedium = 14sp, BodySmall = 12sp -->
    <!-- TitleLarge = 22sp, TitleMedium = 16sp, TitleSmall = 14sp -->
    <!-- HeadlineLarge = 32sp, HeadlineMedium = 28sp -->
    <!-- DisplayLarge = 57sp, DisplayMedium = 45sp, DisplaySmall = 36sp -->
*/

// Compose에서 sp 사용
@Composable
fun ArticleContent() {
    val configuration = LocalConfiguration.current
    val fontScale = configuration.fontScale  // 시스템 폰트 스케일 (1.0 기본)

    Column {
        Text(
            text = "제목",
            style = MaterialTheme.typography.titleLarge,  // sp 기반 자동 스케일
            maxLines = 2,
            overflow = TextOverflow.Ellipsis
        )

        Text(
            text = "본문 내용",
            style = MaterialTheme.typography.bodyLarge,
            // Accessibility에서 텍스트가 커지면 maxLines 해제
            maxLines = if (fontScale > 1.5f) Int.MAX_VALUE else 3,
        )
    }
}

// 폰트 스케일 변경 감지
class MainActivity : AppCompatActivity() {
    override fun onConfigurationChanged(newConfig: Configuration) {
        super.onConfigurationChanged(newConfig)
        if (newConfig.fontScale != resources.configuration.fontScale) {
            // 텍스트 크기 재조정 필요
            recreate()
        }
    }
}`,
    },
    web: {
      language: 'css',
      code: `/* 웹: rem/em으로 사용자 폰트 설정에 반응 */

/* ──────────────────────────────────────────────
   rem: 루트(html) 폰트 크기 기준 — 사용자 브라우저 설정 반영
   em: 부모 요소 폰트 크기 기준
   px: 고정값 — 사용자 설정 무시 ❌
   ────────────────────────────────────────────── */

/* 기본 설정: 브라우저 기본(보통 16px)을 1rem으로 활용 */
html {
  /* font-size: 16px;  ← ❌ px 고정은 사용자 설정 무시 */
  /* font-size: 62.5%; ← ⚠️ 1rem = 10px 트릭 — 접근성 위반 소지 */
  font-size: 100%;    /* ✅ 브라우저 기본값 유지 */
}

body {
  font-size: 1rem;    /* 16px (사용자 설정 따름) */
  line-height: 1.5;
}

h1 { font-size: 2rem; }       /* 32px 기준 */
h2 { font-size: 1.75rem; }
h3 { font-size: 1.5rem; }
p  { font-size: 1rem; }
small { font-size: 0.875rem; }  /* 14px 기준 */

/* clamp(): 최소~최대 범위 내에서 유동적 크기 */
h1 {
  font-size: clamp(1.5rem, 4vw + 1rem, 3rem);
  /* 최소 1.5rem, 뷰포트 기반 유동, 최대 3rem */
}

/* 텍스트 크기 조정 비활성화 방지 */
body {
  -webkit-text-size-adjust: 100%;  /* Safari: 가로 모드에서 자동 확대 방지 */
  text-size-adjust: 100%;
}

/* CSS Media Query: 사용자 폰트 크기 선호 감지 */
/* 표준 prefers 미디어 쿼리 */
@media (prefers-reduced-motion: reduce) { /* ... */ }
@media (prefers-contrast: more) { /* ... */ }

/* 큰 텍스트 모드에서 레이아웃 조정 (JS로 fontScale 감지 후 클래스 추가) */
.large-text h1 { font-size: 2.5rem; }
.large-text p  { line-height: 1.8; }

/* ──────────────────────────────────────────────
   TypeScript: 사용자 폰트 크기 변경 감지
   ────────────────────────────────────────────── */
/*
// ResizeObserver로 폰트 스케일 변화 감지
const observer = new ResizeObserver(() => {
  const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  document.documentElement.dataset.fontScale =
    fontSize > 18 ? 'large' : fontSize > 14 ? 'medium' : 'small';
});
observer.observe(document.documentElement);
*/`,
    },
  },

  a11y_element_grouping: {
    caption: 'accessibilityElements 그룹핑 vs Compose mergeDescendants vs ARIA group',
    ios: {
      language: 'swift',
      code: `import UIKit
import SwiftUI

// ──────────────────────────────────────────────
// UIKit: 접근성 요소 그룹핑 — 3가지 방법
// ──────────────────────────────────────────────

// 방법 1: accessibilityElements 배열로 순서 및 포함 요소 명시
class ProductCell: UITableViewCell {
    let imageView   = UIImageView()
    let nameLabel   = UILabel()
    let priceLabel  = UILabel()
    let ratingView  = StarRatingView()
    let badgeLabel  = UILabel()   // "NEW" 뱃지 — 장식용

    override var accessibilityElements: [Any]? {
        get {
            // 순서 명시: 이미지 → 이름 → 가격 → 별점
            // badgeLabel은 제외 (시각적 장식)
            return [imageView, nameLabel, priceLabel, ratingView]
        }
        set { super.accessibilityElements = newValue }
    }
}

// 방법 2: shouldGroupAccessibilityChildren — 자식 요소를 단일 요소로 합침
class SummaryCardView: UIView {
    // true: 이 뷰의 자식들이 하나의 접근성 요소로 취급됨
    override var shouldGroupAccessibilityChildren: Bool { true }

    override var accessibilityLabel: String? {
        get {
            // 합쳐진 레이블을 직접 구성
            "상품: \\(nameLabel.text ?? ""), 가격: \\(priceLabel.text ?? "")"
        }
        set { super.accessibilityLabel = newValue }
    }
}

// 방법 3: accessibilityFrame + accessibilityActivationPoint
// 여러 UI 요소를 하나의 히트 영역으로 묶기
class CustomAccessibleView: UIView {
    override var accessibilityFrame: CGRect {
        // 자식 요소들의 union 영역
        return UIAccessibility.convertToScreenCoordinates(bounds, in: self)
    }

    override var accessibilityActivationPoint: CGPoint {
        // VoiceOver 더블탭 시 활성화될 좌표
        return CGPoint(x: frame.midX, y: frame.midY)
    }
}

// ──────────────────────────────────────────────
// SwiftUI: .accessibilityElement(children:)
// ──────────────────────────────────────────────
struct PriceRow: View {
    let original: String
    let discounted: String
    let discountRate: String

    var body: some View {
        HStack {
            Text(original)
                .strikethrough()
                .foregroundStyle(.secondary)

            Text(discounted)
                .fontWeight(.bold)

            Text(discountRate)
                .foregroundStyle(.red)
        }
        // .combine: 자식 레이블을 자동으로 합쳐서 하나의 요소로 읽힘
        // "30,000원 20,000원 33% 할인" 처럼 순서대로 합쳐짐
        .accessibilityElement(children: .combine)

        // 또는 .ignore 로 자식을 모두 무시하고 레이블 직접 지정
        // .accessibilityElement(children: .ignore)
        // .accessibilityLabel("정가 30,000원, 할인가 20,000원 (33% 할인)")
    }
}

// 포함/제외 세밀 제어
struct DetailRow: View {
    var body: some View {
        HStack {
            // contain: 이 그룹 내의 자식들을 별개 요소로 유지하되
            //           이 컨테이너도 접근성 요소로 존재
            // (일반적으로 .contain이 기본값)
            Image(systemName: "star.fill")
                .accessibilityHidden(true)   // 이 요소만 개별 숨김

            Text("4.8점")

            Text("(1,234개 리뷰)")
                .accessibilityLabel("리뷰 1,234개")
        }
    }
}`,
    },
    android: {
      language: 'kotlin',
      code: `// Compose: semantics mergeDescendants / clearAndSetSemantics

@Composable
fun ProductSummaryCard(product: Product) {
    Row(
        modifier = Modifier
            // mergeDescendants = true: 자식의 모든 semantics 정보를 이 노드로 합침
            .semantics(mergeDescendants = true) {}
            .clickable { /* 상품 상세 이동 */ }
    ) {
        AsyncImage(
            model = product.imageUrl,
            contentDescription = null  // 부모에서 병합되므로 개별 설명 불필요
        )

        Column {
            Text(text = product.name)
            Text(text = product.formattedPrice)
            StarRatingRow(rating = product.rating)
        }
    }
    // TalkBack: "상품명 20,000원 별 4.8개" 처럼 합쳐서 읽힘
}

// clearAndSetSemantics: 자식 semantics를 완전히 무시하고 새로 지정
@Composable
fun PriceDisplay(original: Int, discounted: Int, rate: Int) {
    Row(
        modifier = Modifier.clearAndSetSemantics {
            // 자식 텍스트 대신 이 레이블만 읽힘
            contentDescription = "정가 \${original}원, 할인가 \${discounted}원, \${rate}% 할인"
        }
    ) {
        Text(
            text = "\${original}원",
            textDecoration = TextDecoration.LineThrough,
            color = Color.Gray
        )
        Text(text = "\${discounted}원", fontWeight = FontWeight.Bold)
        Text(text = "\${rate}% 할인", color = Color.Red)
    }
}

// UIKit 방식 (XML + ViewCompat)
/*
<LinearLayout
    android:id="@+id/priceGroup"
    android:importantForAccessibility="yes"
    android:focusable="true"
    android:contentDescription="정가 30,000원, 할인가 20,000원, 33% 할인">

    <!-- 개별 자식은 TalkBack에서 숨김 -->
    <TextView
        android:id="@+id/originalPrice"
        android:importantForAccessibility="no" />
    <TextView
        android:id="@+id/discountedPrice"
        android:importantForAccessibility="no" />
    <TextView
        android:id="@+id/discountRate"
        android:importantForAccessibility="no" />
</LinearLayout>
*/`,
    },
    web: {
      language: 'tsx',
      code: `// 웹: ARIA group / region / 숨김 처리로 그룹핑

// ──────────────────────────────────────────────
// 방법 1: role="group" + aria-label
// ──────────────────────────────────────────────
function PriceDisplay({ original, discounted, rate }: PriceProps) {
  return (
    <div
      role="group"
      aria-label={\`정가 \${original}원, 할인가 \${discounted}원, \${rate}% 할인\`}
    >
      {/* 자식 요소들은 시각적으로만 표시, 스크린 리더에서는 그룹 레이블만 읽힘 */}
      <span aria-hidden="true" style={{ textDecoration: 'line-through', color: '#999' }}>
        {original.toLocaleString()}원
      </span>
      <span aria-hidden="true" style={{ fontWeight: 'bold' }}>
        {discounted.toLocaleString()}원
      </span>
      <span aria-hidden="true" style={{ color: 'red' }}>
        {rate}% 할인
      </span>
    </div>
  );
}

// ──────────────────────────────────────────────
// 방법 2: 의미론적 HTML 요소 활용 (role 불필요)
// ──────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  return (
    <article>  {/* article 자체가 독립적 콘텐츠 단위 */}
      <figure>
        <img src={product.imageUrl} alt={\`\${product.name} 상품 이미지\`} />
      </figure>

      <header>
        <h3>{product.name}</h3>
        <p className="brand">{product.brand}</p>
      </header>

      {/* 가격 섹션을 dl로 구조화 */}
      <dl aria-label="가격 정보">
        <dt className="sr-only">정가</dt>
        <dd><s>{product.originalPrice.toLocaleString()}원</s></dd>

        <dt className="sr-only">할인가</dt>
        <dd><strong>{product.discountedPrice.toLocaleString()}원</strong></dd>
      </dl>
    </article>
  );
}

// ──────────────────────────────────────────────
// 방법 3: 시각적 표시 + 스크린 리더 전용 텍스트 병행
// ──────────────────────────────────────────────
function Rating({ score, count }: { score: number; count: number }) {
  return (
    <div aria-label={\`평점 \${score}점, 리뷰 \${count}개\`}>
      {/* 별 아이콘들: 시각적으로만 의미 있음 */}
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} filled={i < Math.floor(score)} aria-hidden="true" />
      ))}
      {/* 숫자 텍스트도 aria-hidden — 그룹 레이블이 대신 읽힘 */}
      <span aria-hidden="true">{score} ({count})</span>
    </div>
  );
}`,
    },
  },

  a11y_notifications: {
    caption: 'UIAccessibility.post(notification:) vs AccessibilityManager announceForAccessibility vs ARIA live region',
    ios: {
      language: 'swift',
      code: `import UIKit

// ──────────────────────────────────────────────
// UIAccessibility 알림: 화면 변경을 VoiceOver에 알림
// ──────────────────────────────────────────────

// 1. screenChanged: 화면 전체가 바뀌었을 때 (새 VC push 등)
UIAccessibility.post(
    notification: .screenChanged,
    argument: myViewController.view   // 포커스를 이동할 뷰 (nil이면 첫 번째 요소)
)

// 2. layoutChanged: 화면 일부가 바뀌었을 때 (섹션 펼침/접힘 등)
UIAccessibility.post(
    notification: .layoutChanged,
    argument: expandedSectionHeader   // 변경된 영역으로 포커스 이동
)

// 3. announcement: 텍스트 메시지를 VoiceOver가 읽어줌 (포커스 이동 없음)
UIAccessibility.post(
    notification: .announcement,
    argument: "파일 업로드가 완료되었습니다"
)

// 4. pageScrolled: 스크롤 위치 변경 알림 (커스텀 스크롤 뷰)
UIAccessibility.post(
    notification: .pageScrolled,
    argument: "3페이지 중 1페이지"
)

// ──────────────────────────────────────────────
// 우선순위 있는 공지 (iOS 17+)
// ──────────────────────────────────────────────
if #available(iOS 17.0, *) {
    let announcement = AttributedString(
        "결제가 완료되었습니다",
        attributes: AttributeContainer()
            // 현재 읽고 있는 내용을 중단하고 이 메시지를 즉시 읽음
            .accessibilitySpeechAnnouncementPriority(.high)
    )
    UIAccessibility.post(notification: .announcement, argument: announcement)
}

// ──────────────────────────────────────────────
// 읽기 완료 콜백 감지
// ──────────────────────────────────────────────
class UploadViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(announcementFinished(_:)),
            name: UIAccessibility.announcementDidFinishNotification,
            object: nil
        )
    }

    @objc func announcementFinished(_ notification: Notification) {
        guard
            let userInfo = notification.userInfo,
            let success = userInfo[UIAccessibility.announcementWasSuccessfulUserInfoKey] as? Bool,
            success
        else { return }

        let text = userInfo[UIAccessibility.announcementStringValueUserInfoKey] as? String
        print("공지 완료: \\(text ?? "")")
    }

    func uploadComplete() {
        UIAccessibility.post(
            notification: .announcement,
            argument: "업로드가 완료되었습니다. 완료 버튼을 탭해 결과를 확인하세요."
        )
    }
}

// ──────────────────────────────────────────────
// SwiftUI: .accessibilityAnnouncement + .accessibilityFocused
// ──────────────────────────────────────────────
struct UploadView: View {
    @State private var uploadStatus = ""
    @AccessibilityFocusState private var isUploadResultFocused: Bool

    var body: some View {
        VStack {
            // ...
            Button("업로드") {
                performUpload {
                    uploadStatus = "업로드 완료"
                    isUploadResultFocused = true   // 포커스 이동
                }
            }

            Text(uploadStatus)
                .accessibilityFocused(\$isUploadResultFocused)
        }
    }
}`,
    },
    android: {
      language: 'kotlin',
      code: `// Android: AccessibilityManager.announceForAccessibility
// Compose: semantics.liveRegion

import android.view.accessibility.AccessibilityManager
import android.view.accessibility.AccessibilityEvent

// ──────────────────────────────────────────────
// View.announceForAccessibility (API 16+)
// ──────────────────────────────────────────────
class UploadFragment : Fragment() {

    fun onUploadComplete() {
        // 가장 간단한 방법: View에서 직접 공지
        binding.root.announceForAccessibility("파일 업로드가 완료되었습니다")
    }

    fun onUploadError(message: String) {
        binding.root.announceForAccessibility("업로드 실패: \$message")
    }
}

// ──────────────────────────────────────────────
// AccessibilityManager: 접근성 활성화 여부 확인 후 공지
// ──────────────────────────────────────────────
class AccessibilityHelper(private val context: Context) {
    private val am = context.getSystemService(AccessibilityManager::class.java)

    fun announce(view: View, message: String) {
        if (am.isEnabled) {
            view.announceForAccessibility(message)
        }
    }

    // AccessibilityEvent 직접 발생
    fun sendEvent(view: View, eventType: Int, text: String) {
        val event = AccessibilityEvent.obtain(eventType).apply {
            className = view.javaClass.name
            packageName = context.packageName
            this.text.add(text)
        }
        am.sendAccessibilityEvent(event)
    }
}

// ──────────────────────────────────────────────
// Compose: LiveRegion — DOM 변경 시 자동 공지
// ──────────────────────────────────────────────
@Composable
fun UploadStatus(status: String) {
    // LiveRegion: 텍스트가 바뀔 때 TalkBack이 자동으로 읽어줌
    Text(
        text = status,
        modifier = Modifier.semantics {
            liveRegion = LiveRegionMode.Polite  // 현재 읽는 내용 이후 읽음
            // LiveRegionMode.Assertive: 현재 읽는 내용 중단하고 즉시 읽음
        }
    )
}

// XML에서 liveRegion 설정
/*
<TextView
    android:id="@+id/statusText"
    android:accessibilityLiveRegion="polite"
    <!-- or "assertive" for urgent messages -->
    android:text="" />
*/`,
    },
    web: {
      language: 'tsx',
      code: `// 웹: ARIA Live Region — DOM 변경을 스크린 리더에 자동 공지

// ──────────────────────────────────────────────
// aria-live 기본 패턴
// ──────────────────────────────────────────────
function StatusAnnouncer({ message }: { message: string }) {
  return (
    <>
      {/* polite: 현재 읽는 내용 이후 읽음 (일반 알림) */}
      <div
        role="status"          // == aria-live="polite" + aria-atomic="true"
        aria-live="polite"
        aria-atomic="true"     // 변경된 부분만이 아닌 전체 텍스트 읽음
        className="sr-only"    // 시각적으로 숨김
      >
        {message}
      </div>

      {/* assertive: 현재 읽는 내용 중단하고 즉시 읽음 (긴급 알림) */}
      <div
        role="alert"           // == aria-live="assertive" + aria-atomic="true"
        aria-live="assertive"
        className="sr-only"
      >
        {/* 오류, 경고 등 즉시 알려야 할 내용 */}
      </div>
    </>
  );
}

// ──────────────────────────────────────────────
// React: useLiveAnnouncer 훅 패턴
// ──────────────────────────────────────────────
function useLiveAnnouncer() {
  const [politeMessage, setPoliteMessage] = useState('');
  const [assertiveMessage, setAssertiveMessage] = useState('');

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    // 같은 메시지를 재공지하려면 빈 문자열 → 메시지 순서로 설정
    if (priority === 'assertive') {
      setAssertiveMessage('');
      setTimeout(() => setAssertiveMessage(message), 100);
    } else {
      setPoliteMessage('');
      setTimeout(() => setPoliteMessage(message), 100);
    }
  }, []);

  const AnnouncerComponent = () => (
    <>
      <div role="status" aria-live="polite" className="sr-only">{politeMessage}</div>
      <div role="alert" aria-live="assertive" className="sr-only">{assertiveMessage}</div>
    </>
  );

  return { announce, AnnouncerComponent };
}

// 사용 예시
function UploadPage() {
  const { announce, AnnouncerComponent } = useLiveAnnouncer();

  const handleUpload = async (file: File) => {
    announce('파일 업로드 중...');
    try {
      await uploadFile(file);
      announce('파일 업로드가 완료되었습니다');
    } catch (e) {
      announce('업로드 실패: 네트워크 오류', 'assertive');
    }
  };

  return (
    <>
      <AnnouncerComponent />
      {/* ... */}
    </>
  );
}`,
    },
  },

  a11y_color_contrast: {
    caption: '색상 대비 + Increase Contrast vs Android 고대비 vs prefers-contrast CSS',
    ios: {
      language: 'swift',
      code: `import UIKit
import SwiftUI

// ──────────────────────────────────────────────
// Increase Contrast 설정 감지
// Settings > Accessibility > Display & Text Size > Increase Contrast
// ──────────────────────────────────────────────

// UIKit: UIAccessibility.isDarkerSystemColorsEnabled
class ThemeManager {

    // 고대비 모드 여부 확인
    var isHighContrast: Bool {
        UIAccessibility.isDarkerSystemColorsEnabled
    }

    // 배경 색상 — 고대비에서 더 어두운 배경 제공
    var backgroundColor: UIColor {
        if isHighContrast {
            return .systemBackground  // 순수 흰색/검정 (시스템이 자동 처리)
        } else {
            return UIColor(red: 0.97, green: 0.97, blue: 0.97, alpha: 1)  // 부드러운 회색
        }
    }

    // 텍스트 색상 — 최소 WCAG AA 4.5:1 대비율 보장
    var primaryTextColor: UIColor {
        isHighContrast ? .label : UIColor(red: 0.2, green: 0.2, blue: 0.2, alpha: 1)
    }

    // 보조 텍스트 — 고대비에서 더 진하게
    var secondaryTextColor: UIColor {
        isHighContrast ? .secondaryLabel : UIColor(red: 0.5, green: 0.5, blue: 0.5, alpha: 1)
    }
}

// 고대비 변경 감지
NotificationCenter.default.addObserver(
    forName: UIAccessibility.darkerSystemColorsStatusDidChangeNotification,
    object: nil,
    queue: .main
) { _ in
    // UI 갱신
    NotificationCenter.default.post(name: .themeDidChange, object: nil)
}

// ──────────────────────────────────────────────
// Asset Catalog: High Contrast 색상 변형 등록
// ──────────────────────────────────────────────
// Xcode > Assets.xcassets > Color Set
// ├── Any Appearance
// │   ├── Default: #323232 (대비율 7.5:1)
// │   └── High Contrast: #000000 (대비율 21:1)
// └── Dark
//     ├── Default: #D0D0D0
//     └── High Contrast: #FFFFFF

let color = UIColor(named: "PrimaryText")
// iOS가 자동으로 Increase Contrast 설정에 따라 적절한 변형 선택

// ──────────────────────────────────────────────
// SwiftUI: colorScheme + accessibilityHighContrast
// ──────────────────────────────────────────────
struct ContentView: View {
    @Environment(\\.colorScheme) var colorScheme
    @Environment(\\.accessibilityReduceTransparency) var reduceTransparency
    @Environment(\\.accessibilityDifferentiateWithoutColor) var differentiateWithoutColor

    var body: some View {
        VStack {
            Text("상태")
                .foregroundStyle(
                    // 색맹 사용자를 위해 색상 외 다른 구분자 제공
                    differentiateWithoutColor ? Color.primary : Color.green
                )
                .background(
                    differentiateWithoutColor
                        ? AnyView(RoundedRectangle(cornerRadius: 4).stroke())  // 테두리 추가
                        : AnyView(EmptyView())
                )

            // 반투명 효과: Reduce Transparency 설정 시 불투명으로 전환
            Rectangle()
                .fill(reduceTransparency
                      ? Color(.systemBackground).opacity(1)    // 완전 불투명
                      : Color(.systemBackground).opacity(0.8)  // 반투명
                )
        }
    }
}

// ──────────────────────────────────────────────
// WCAG 대비율 계산 유틸리티
// ──────────────────────────────────────────────
extension UIColor {
    // 상대 휘도 계산 (WCAG 2.1 기준)
    var relativeLuminance: CGFloat {
        var r: CGFloat = 0, g: CGFloat = 0, b: CGFloat = 0, a: CGFloat = 0
        getRed(&r, green: &g, blue: &b, alpha: &a)

        func linearize(_ c: CGFloat) -> CGFloat {
            c <= 0.04045 ? c / 12.92 : pow((c + 0.055) / 1.055, 2.4)
        }
        return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)
    }

    func contrastRatio(with other: UIColor) -> CGFloat {
        let l1 = max(relativeLuminance, other.relativeLuminance)
        let l2 = min(relativeLuminance, other.relativeLuminance)
        return (l1 + 0.05) / (l2 + 0.05)
    }
    // WCAG AA: 일반 텍스트 4.5:1 이상 / 큰 텍스트(18pt+) 3:1 이상
    // WCAG AAA: 일반 텍스트 7:1 이상 / 큰 텍스트 4.5:1 이상
}`,
    },
    android: {
      language: 'kotlin',
      code: `// Android: 고대비 테마 / Night Mode + 대비율 대응

// ──────────────────────────────────────────────
// 시스템 설정 감지
// ──────────────────────────────────────────────
class ThemeHelper(private val context: Context) {

    // 다크 모드 여부
    val isDarkMode: Boolean
        get() = (context.resources.configuration.uiMode and
                Configuration.UI_MODE_NIGHT_MASK) == Configuration.UI_MODE_NIGHT_YES

    // 고대비 텍스트 설정 (Settings > Accessibility > High contrast text)
    val isHighContrastText: Boolean
        get() = Settings.Secure.getInt(
            context.contentResolver,
            "high_text_contrast_enabled", 0
        ) == 1

    // 색상 반전 (Settings > Accessibility > Color inversion)
    val isColorInverted: Boolean
        get() = Settings.Secure.getInt(
            context.contentResolver,
            "accessibility_display_inversion_enabled", 0
        ) == 1
}

// ──────────────────────────────────────────────
// colors.xml: 대비율을 고려한 색상 정의
// ──────────────────────────────────────────────
/*
<!-- res/values/colors.xml -->
<resources>
    <!-- 기본 텍스트: 흰 배경에 대비율 9.3:1 -->
    <color name="text_primary">#1A1A1A</color>
    <!-- 보조 텍스트: 흰 배경에 대비율 5.1:1 (AA 통과) -->
    <color name="text_secondary">#767676</color>
    <!-- 비활성 텍스트: 대비율 2.3:1 (장식용, 접근성 요소 아님) -->
    <color name="text_disabled">#AAAAAA</color>
</resources>

<!-- res/values-night/colors.xml (다크 모드) -->
<resources>
    <color name="text_primary">#F5F5F5</color>    <!-- 어두운 배경에 대비율 18:1 -->
    <color name="text_secondary">#B0B0B0</color>  <!-- 대비율 7.2:1 -->
</resources>
*/

// Compose: dynamicColor + ContrastLevel
@Composable
fun AppTheme(content: @Composable () -> Unit) {
    val context = LocalContext.current
    val isDark = isSystemInDarkTheme()

    // Material You 동적 색상 (Android 12+)
    val colorScheme = when {
        Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            if (isDark) dynamicDarkColorScheme(context)
            else dynamicLightColorScheme(context)
        }
        isDark -> darkColorScheme(
            primary = Color(0xFFBB86FC),
            onBackground = Color(0xFFE6E1E5)  // 다크 배경에 고대비 텍스트
        )
        else -> lightColorScheme(
            primary = Color(0xFF6200EE),
            onBackground = Color(0xFF1A1A1A)  // 밝은 배경에 고대비 텍스트
        )
    }

    MaterialTheme(colorScheme = colorScheme) {
        content()
    }
}`,
    },
    web: {
      language: 'css',
      code: `/* 웹: prefers-contrast + forced-colors 미디어 쿼리 */

/* ──────────────────────────────────────────────
   기본 색상: WCAG AA (4.5:1) 대비율 확보
   ────────────────────────────────────────────── */
:root {
  --color-text-primary:   #1a1a1a;   /* 흰 배경 대비율 14.7:1 (AAA) */
  --color-text-secondary: #767676;   /* 흰 배경 대비율 4.54:1 (AA) */
  --color-text-disabled:  #aaaaaa;   /* 장식용 — 접근성 요소 아님 */
  --color-bg-primary:     #ffffff;
  --color-interactive:    #0057d8;   /* 링크/버튼: 흰 배경 대비율 5.7:1 (AA) */
}

/* ──────────────────────────────────────────────
   prefers-contrast: more — 사용자가 고대비 요청
   ────────────────────────────────────────────── */
@media (prefers-contrast: more) {
  :root {
    --color-text-primary:   #000000;  /* 순수 검정 */
    --color-text-secondary: #3a3a3a;  /* 더 진한 보조 텍스트 */
    --color-interactive:    #0000cc;  /* 더 진한 파란색 */
    --color-border:         #000000;  /* 굵은 테두리 */
  }

  /* 버튼: 테두리 강화 */
  button, [role="button"] {
    border: 2px solid currentColor !important;
    outline-offset: 2px;
  }

  /* 링크: 밑줄 강제 표시 */
  a { text-decoration: underline !important; }

  /* 포커스 링 강화 */
  :focus-visible {
    outline: 3px solid #000 !important;
    outline-offset: 3px !important;
  }
}

/* prefers-contrast: less — 대비를 줄여달라는 요청 */
@media (prefers-contrast: less) {
  :root {
    --color-text-primary:   #444444;  /* 부드러운 텍스트 */
  }
}

/* ──────────────────────────────────────────────
   forced-colors (Windows 고대비 모드)
   시스템이 색상을 강제로 덮어씀
   ────────────────────────────────────────────── */
@media (forced-colors: active) {
  /* 커스텀 색상 대신 시스템 색상 키워드 사용 */
  :root {
    --color-text-primary:   ButtonText;
    --color-bg-primary:     ButtonFace;
    --color-interactive:    LinkText;
  }

  /* SVG 아이콘: forced-colors에서 채우기 색 유지 */
  svg [fill]:not([fill="none"]) {
    fill: ButtonText;
  }

  /* 테두리가 없는 요소에 강제 테두리 추가 */
  .card {
    border: 1px solid ButtonText;
  }
}

/* ──────────────────────────────────────────────
   TypeScript: 대비율 계산 유틸리티
   ────────────────────────────────────────────── */
/*
function getRelativeLuminance(hex: string): number {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 255;
  const g = (rgb >>  8) & 255;
  const b =  rgb        & 255;

  const linearize = (c: number) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = Math.max(getRelativeLuminance(hex1), getRelativeLuminance(hex2));
  const l2 = Math.min(getRelativeLuminance(hex1), getRelativeLuminance(hex2));
  return (l1 + 0.05) / (l2 + 0.05);
}

// WCAG 레벨 판정
function getWcagLevel(ratio: number, isLargeText = false): string {
  if (isLargeText) {
    if (ratio >= 4.5) return 'AAA';
    if (ratio >= 3.0) return 'AA';
    return 'Fail';
  }
  if (ratio >= 7.0) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  return 'Fail';
}
*/`,
    },
  },

  a11y_reduce_motion: {
    caption: 'Reduce Motion vs Android 애니메이션 배율 vs prefers-reduced-motion CSS',
    ios: {
      language: 'swift',
      code: `import UIKit
import SwiftUI

// ──────────────────────────────────────────────
// Reduce Motion 설정 감지
// Settings > Accessibility > Motion > Reduce Motion
// ──────────────────────────────────────────────

// UIKit: UIAccessibility.isReduceMotionEnabled
class AnimationManager {

    static var isReduceMotionEnabled: Bool {
        UIAccessibility.isReduceMotionEnabled
    }

    // 애니메이션 지속 시간 조정
    static var animationDuration: TimeInterval {
        isReduceMotionEnabled ? 0.01 : 0.3
        // 0으로 하면 순간 전환이 일부 사용자에게 방향 감각 상실을 유발할 수 있음
        // 짧은 페이드(0.01~0.05)가 더 자연스러움
    }

    // 페이드 vs 슬라이드 전환
    static func makeTransition() -> CATransition {
        let transition = CATransition()
        if isReduceMotionEnabled {
            transition.type = .fade      // 모션 최소화: 페이드
            transition.duration = 0.15
        } else {
            transition.type = .push      // 일반: 슬라이드 푸시
            transition.subtype = .fromRight
            transition.duration = 0.35
        }
        return transition
    }
}

// 설정 변경 감지
NotificationCenter.default.addObserver(
    forName: UIAccessibility.reduceMotionStatusDidChangeNotification,
    object: nil,
    queue: .main
) { _ in
    // 현재 진행 중인 애니메이션 중단 및 재설정
    UIView.setAnimationsEnabled(!UIAccessibility.isReduceMotionEnabled)
}

// UIView 애니메이션 적용 예시
func animateButtonPress(button: UIButton) {
    if UIAccessibility.isReduceMotionEnabled {
        // 모션 최소화: 색상 변경만 (크기 변화 없음)
        UIView.animate(withDuration: 0.1) {
            button.backgroundColor = .systemBlue.withAlphaComponent(0.7)
        } completion: { _ in
            UIView.animate(withDuration: 0.1) {
                button.backgroundColor = .systemBlue
            }
        }
    } else {
        // 일반: 스케일 애니메이션
        UIView.animate(withDuration: 0.1, animations: {
            button.transform = CGAffineTransform(scaleX: 0.95, y: 0.95)
        }) { _ in
            UIView.animate(withDuration: 0.1) {
                button.transform = .identity
            }
        }
    }
}

// ──────────────────────────────────────────────
// SwiftUI: @Environment(\\.accessibilityReduceMotion)
// ──────────────────────────────────────────────
struct HeroAnimation: View {
    @Environment(\\.accessibilityReduceMotion) var reduceMotion
    @State private var isExpanded = false

    var body: some View {
        Rectangle()
            .frame(
                width: isExpanded ? 300 : 100,
                height: isExpanded ? 200 : 100
            )
            .onTapGesture {
                if reduceMotion {
                    // 즉시 상태 전환 (애니메이션 없이)
                    isExpanded.toggle()
                } else {
                    withAnimation(.spring(response: 0.5, dampingFraction: 0.7)) {
                        isExpanded.toggle()
                    }
                }
            }
    }
}

// withAnimation 래퍼 유틸리티
func accessibleAnimation<T: Equatable>(
    _ animation: Animation = .default,
    body: () -> T
) -> T {
    if UIAccessibility.isReduceMotionEnabled {
        return body()
    } else {
        return withAnimation(animation, body)
    }
}`,
    },
    android: {
      language: 'kotlin',
      code: `// Android: 애니메이션 배율 설정
// Settings > Accessibility > Display > Remove animations (또는)
// Settings > Developer options > Window/Transition/Animator animation scale

// ──────────────────────────────────────────────
// 애니메이션 배율 확인
// ──────────────────────────────────────────────
class AnimationHelper(private val context: Context) {

    // 애니메이터 배율 (0.0 = 비활성화, 1.0 = 기본, 2.0 = 느림)
    val animatorScale: Float
        get() = Settings.Global.getFloat(
            context.contentResolver,
            Settings.Global.ANIMATOR_DURATION_SCALE,
            1.0f
        )

    val isAnimationDisabled: Boolean
        get() = animatorScale == 0f

    // 조건부 애니메이션
    fun conditionalAnimation(view: View, action: () -> Unit) {
        if (isAnimationDisabled) {
            action()
        } else {
            view.animate()
                .setDuration((300 * animatorScale).toLong())
                .alpha(1f)
                .start()
        }
    }
}

// ──────────────────────────────────────────────
// Compose: LocalDensity + 애니메이션 제어
// ──────────────────────────────────────────────
@Composable
fun AnimatedCard(isExpanded: Boolean) {
    // Compose는 시스템 애니메이터 배율을 자동으로 반영함
    // 추가로 직접 제어하려면:
    val density = LocalDensity.current
    val configuration = LocalConfiguration.current

    // 사용자 정의: 애니메이션 배율 읽기
    val context = LocalContext.current
    val animScale = remember {
        Settings.Global.getFloat(
            context.contentResolver,
            Settings.Global.ANIMATOR_DURATION_SCALE,
            1.0f
        )
    }

    val size by animateDpAsState(
        targetValue = if (isExpanded) 200.dp else 100.dp,
        animationSpec = if (animScale == 0f) {
            snap()    // 애니메이션 비활성화 시 즉시 전환
        } else {
            spring(
                dampingRatio = Spring.DampingRatioMediumBouncy,
                stiffness = Spring.StiffnessMedium
            )
        },
        label = "cardSize"
    )

    Box(modifier = Modifier.size(size).background(MaterialTheme.colorScheme.primaryContainer))
}

// 애니메이션 배율 변경 감지
class MainActivity : AppCompatActivity() {
    private val animScaleObserver = object : ContentObserver(Handler(Looper.getMainLooper())) {
        override fun onChange(selfChange: Boolean) {
            // 애니메이션 설정 변경됨 — UI 갱신
            onAnimationSettingChanged()
        }
    }

    override fun onResume() {
        super.onResume()
        contentResolver.registerContentObserver(
            Settings.Global.getUriFor(Settings.Global.ANIMATOR_DURATION_SCALE),
            false,
            animScaleObserver
        )
    }
}`,
    },
    web: {
      language: 'css',
      code: `/* 웹: prefers-reduced-motion 미디어 쿼리 */

/* ──────────────────────────────────────────────
   모든 애니메이션의 기본 원칙:
   1. 기본적으로 모션 있게 구현
   2. prefers-reduced-motion: reduce 에서 모션 제거/단순화
   ────────────────────────────────────────────── */

/* 전역 리셋: Reduce Motion 활성화 시 모든 애니메이션 제거 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration:        0.01ms !important;
    animation-iteration-count: 1      !important;
    transition-duration:       0.01ms !important;
    scroll-behavior:           auto   !important;  /* 부드러운 스크롤 제거 */
  }
}

/* ──────────────────────────────────────────────
   컴포넌트별 적용 예시
   ────────────────────────────────────────────── */

/* 로딩 스피너 */
.spinner {
  animation: spin 1s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
    /* 애니메이션 대신 정적 상태 표시 */
    opacity: 0.6;
  }
}

/* 슬라이드 전환 → 페이드 전환으로 대체 */
.page-transition {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

@media (prefers-reduced-motion: reduce) {
  .page-transition {
    transition: opacity 0.15s ease;   /* 슬라이드 제거, 페이드만 유지 */
    transform: none !important;
  }
}

/* 패럴랙스 효과 제거 */
.hero-section {
  background-attachment: fixed;    /* 패럴랙스 */
}

@media (prefers-reduced-motion: reduce) {
  .hero-section {
    background-attachment: scroll;  /* 일반 스크롤 */
  }
}

/* ──────────────────────────────────────────────
   JavaScript: prefers-reduced-motion 감지
   ────────────────────────────────────────────── */
/*
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function animate(element: HTMLElement) {
  if (prefersReducedMotion.matches) {
    // 즉시 최종 상태로 전환
    element.style.opacity = '1';
    element.style.transform = 'none';
    return;
  }

  // 일반 애니메이션
  element.animate([
    { opacity: 0, transform: 'translateY(20px)' },
    { opacity: 1, transform: 'translateY(0)' },
  ], {
    duration: 300,
    easing: 'ease-out',
    fill: 'forwards',
  });
}

// 설정 변경 실시간 감지
prefersReducedMotion.addEventListener('change', (e) => {
  if (e.matches) {
    // 진행 중인 애니메이션 중단
    document.getAnimations().forEach(anim => anim.cancel());
  }
});
*/`,
    },
  },

  a11y_custom_action: {
    caption: 'accessibilityCustomActions vs TalkBack custom actions vs ARIA actions',
    ios: {
      language: 'swift',
      code: `import UIKit
import SwiftUI

// ──────────────────────────────────────────────
// UIKit: UIAccessibilityCustomAction
// VoiceOver 로터에서 스와이프 업/다운으로 실행
// ──────────────────────────────────────────────
class MessageCell: UITableViewCell {
    var message: Message?

    override var accessibilityCustomActions: [UIAccessibilityCustomAction]? {
        get {
            guard let message else { return nil }

            var actions: [UIAccessibilityCustomAction] = []

            // 기본 액션
            actions.append(UIAccessibilityCustomAction(
                name: "답장",
                target: self,
                selector: #selector(replyToMessage)
            ))

            actions.append(UIAccessibilityCustomAction(
                name: "전달",
                target: self,
                selector: #selector(forwardMessage)
            ))

            // 조건부 액션
            if message.isUnread {
                actions.append(UIAccessibilityCustomAction(
                    name: "읽음으로 표시",
                    target: self,
                    selector: #selector(markAsRead)
                ))
            }

            // iOS 14+: 클로저 기반 액션
            if #available(iOS 14.0, *) {
                actions.append(UIAccessibilityCustomAction(
                    name: "별표 표시",
                    image: UIImage(systemName: "star"),  // 로터에 아이콘 표시
                    actionHandler: { [weak self] _ in
                        self?.toggleStar()
                        return true  // true: 성공, false: 실패
                    }
                ))
            }

            actions.append(UIAccessibilityCustomAction(
                name: "삭제",
                image: UIImage(systemName: "trash"),
                actionHandler: { [weak self] _ in
                    self?.deleteMessage()
                    return true
                }
            ))

            return actions
        }
        set { super.accessibilityCustomActions = newValue }
    }

    @objc func replyToMessage() -> Bool {
        // 답장 화면 열기
        MessageComposer.open(replyTo: message)
        return true
    }

    @objc func forwardMessage() -> Bool {
        ShareSheet.show(message: message)
        return true
    }

    @objc func markAsRead() -> Bool {
        message?.markAsRead()
        // 상태 변경 후 VoiceOver에 공지
        UIAccessibility.post(
            notification: .announcement,
            argument: "메시지를 읽음으로 표시했습니다"
        )
        return true
    }

    @objc func toggleStar() { /* ... */ }
    @objc func deleteMessage() { /* ... */ }
}

// ──────────────────────────────────────────────
// SwiftUI: .accessibilityAction(named:)
// ──────────────────────────────────────────────
struct MessageRow: View {
    let message: Message
    @State private var isStarred = false

    var body: some View {
        HStack {
            Text(message.sender).bold()
            Text(message.preview)
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel("\\(message.sender)의 메시지: \\(message.preview)")

        // 커스텀 액션 등록
        .accessibilityAction(named: "답장") {
            MessageComposer.open(replyTo: message)
        }
        .accessibilityAction(named: "전달") {
            ShareSheet.show(message: message)
        }
        .accessibilityAction(named: isStarred ? "별표 해제" : "별표 표시") {
            isStarred.toggle()
        }
        .accessibilityAction(.delete) {   // .delete: 시스템 제공 표준 액션
            MessageStore.shared.delete(message)
        }
        .accessibilityAction(.escape) {   // .escape: 뒤로가기 제스처
            dismiss()
        }
    }
}

// ──────────────────────────────────────────────
// UIAccessibilityCustomRotor: 로터에 커스텀 항목 추가
// VoiceOver 두 손가락 회전 → 로터 항목 선택 → 스와이프 탐색
// ──────────────────────────────────────────────
class ArticleViewController: UIViewController {

    override var accessibilityCustomRotors: [UIAccessibilityCustomRotor]? {
        get {
            // "링크" 로터: 본문 내 링크만 순서대로 탐색
            let linkRotor = UIAccessibilityCustomRotor(name: "링크") { [weak self] predicate in
                guard let self else { return nil }
                let links = self.extractLinks()
                let currentIndex = predicate.currentItem.targetElement
                    .flatMap { links.firstIndex(of: $0 as! UIView) } ?? -1

                let nextIndex = predicate.searchDirection == .next
                    ? currentIndex + 1
                    : currentIndex - 1

                guard nextIndex >= 0, nextIndex < links.count else { return nil }
                return UIAccessibilityCustomRotorItemResult(targetElement: links[nextIndex], targetRange: nil)
            }

            // "헤딩" 로터
            let headingRotor = UIAccessibilityCustomRotor(name: "헤딩") { [weak self] predicate in
                // ... 헤딩 레이블들 순환
                return nil
            }

            return [linkRotor, headingRotor]
        }
        set { super.accessibilityCustomRotors = newValue }
    }

    func extractLinks() -> [UIView] { [] }
}`,
    },
    android: {
      language: 'kotlin',
      code: `// Android: TalkBack Custom Actions
// AccessibilityNodeInfoCompat.AccessibilityActionCompat

// ──────────────────────────────────────────────
// ViewCompat.setAccessibilityDelegate 로 커스텀 액션 등록
// ──────────────────────────────────────────────
class MessageViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

    fun bind(message: Message) {
        itemView.contentDescription = "\${message.sender}의 메시지: \${message.preview}"

        ViewCompat.setAccessibilityDelegate(itemView, object : AccessibilityDelegateCompat() {
            override fun onInitializeAccessibilityNodeInfo(
                host: View,
                info: AccessibilityNodeInfoCompat
            ) {
                super.onInitializeAccessibilityNodeInfo(host, info)

                // 커스텀 액션 추가
                info.addAction(
                    AccessibilityNodeInfoCompat.AccessibilityActionCompat(
                        R.id.action_reply,    // 고유 ID (res/values/ids.xml 에 정의)
                        "답장"
                    )
                )
                info.addAction(
                    AccessibilityNodeInfoCompat.AccessibilityActionCompat(
                        R.id.action_forward,
                        "전달"
                    )
                )

                if (message.isUnread) {
                    info.addAction(
                        AccessibilityNodeInfoCompat.AccessibilityActionCompat(
                            R.id.action_mark_read,
                            "읽음으로 표시"
                        )
                    )
                }

                // 표준 액션 재정의
                info.addAction(AccessibilityNodeInfoCompat.ACTION_LONG_CLICK)
            }

            override fun performAccessibilityAction(
                host: View,
                action: Int,
                args: Bundle?
            ): Boolean {
                return when (action) {
                    R.id.action_reply -> {
                        MessageComposer.open(host.context, message)
                        true
                    }
                    R.id.action_forward -> {
                        ShareSheet.show(host.context, message)
                        true
                    }
                    R.id.action_mark_read -> {
                        message.markAsRead()
                        host.announceForAccessibility("메시지를 읽음으로 표시했습니다")
                        true
                    }
                    else -> super.performAccessibilityAction(host, action, args)
                }
            }
        })
    }
}

// ──────────────────────────────────────────────
// Compose: semantics customActions
// ──────────────────────────────────────────────
@Composable
fun MessageRow(message: Message, onReply: () -> Unit, onDelete: () -> Unit) {
    Row(
        modifier = Modifier
            .semantics {
                contentDescription = "\${message.sender}의 메시지: \${message.preview}"

                customActions = listOf(
                    CustomAccessibilityAction(label = "답장") {
                        onReply(); true
                    },
                    CustomAccessibilityAction(label = "전달") {
                        ShareHelper.share(message); true
                    },
                    CustomAccessibilityAction(label = "삭제") {
                        onDelete(); true
                    },
                )

                // 표준 onClick 재정의
                onClick(label = "메시지 열기") {
                    // 탐색
                    true
                }
            }
    ) {
        Text(message.sender, fontWeight = FontWeight.Bold)
        Text(message.preview, maxLines = 1, overflow = TextOverflow.Ellipsis)
    }
}`,
    },
    web: {
      language: 'tsx',
      code: `// 웹: ARIA actions + keyboard interaction pattern

// ──────────────────────────────────────────────
// 패턴 1: aria-haspopup + 컨텍스트 메뉴
// ──────────────────────────────────────────────
function MessageRow({ message }: { message: Message }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = \`menu-\${message.id}\`;

  return (
    <li role="article" aria-label={\`\${message.sender}의 메시지: \${message.preview}\`}>
      <div className="message-content">
        <strong>{message.sender}</strong>
        <p>{message.preview}</p>
      </div>

      {/* 액션 메뉴 트리거 */}
      <button
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        aria-controls={menuId}
        aria-label="메시지 액션 메뉴"
        onClick={() => setMenuOpen(o => !o)}
      >
        <MoreVertIcon aria-hidden="true" />
      </button>

      {/* 드롭다운 메뉴 */}
      {menuOpen && (
        <ul
          id={menuId}
          role="menu"
          aria-label="메시지 옵션"
        >
          <li role="menuitem" tabIndex={-1} onClick={handleReply}>
            답장
          </li>
          <li role="menuitem" tabIndex={-1} onClick={handleForward}>
            전달
          </li>
          <li role="menuitem" tabIndex={-1} onClick={handleDelete}>
            삭제
          </li>
        </ul>
      )}
    </li>
  );
}

// ──────────────────────────────────────────────
// 패턴 2: 스와이프 대신 키보드 단축키 제공
// ──────────────────────────────────────────────
function useMessageKeyboardActions(message: Message) {
  return (e: React.KeyboardEvent) => {
    switch(e.key) {
      case 'r':
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          handleReply(message);
        }
        break;
      case 'd':
      case 'Delete':
        if (e.key === 'Delete' || !e.ctrlKey) {
          e.preventDefault();
          handleDelete(message);
        }
        break;
      case 's':
        e.preventDefault();
        handleStar(message);
        break;
    }
  };
}

// ──────────────────────────────────────────────
// 패턴 3: 인라인 액션 버튼 (항상 표시)
// ──────────────────────────────────────────────
function MessageActions({ message }: { message: Message }) {
  return (
    <div role="group" aria-label="메시지 액션">
      <button
        onClick={() => handleReply(message)}
        aria-label={\`\${message.sender}에게 답장\`}
      >
        <ReplyIcon aria-hidden="true" />
        <span>답장</span>
      </button>

      <button
        onClick={() => handleDelete(message)}
        aria-label={\`\${message.sender}의 메시지 삭제\`}
      >
        <DeleteIcon aria-hidden="true" />
        <span>삭제</span>
      </button>
    </div>
  );
}`,
    },
  },

  // === src/data/codeBlocks-ch15.ts ===
arch_tca_reducer: {
    caption: 'TCA Reducer vs MVI Reducer (Android) vs Redux Reducer (웹)',
    android: {
      language: 'kotlin',
      code: `// Android MVI — ViewModel 기반 Reducer
// Kotlin + Orbit MVI 라이브러리 (또는 수동 구현)

// 상태 정의
data class CounterState(
    val count: Int = 0,
    val isLoading: Boolean = false,
    val errorMessage: String? = null
)

// 인텐트 (Action) 정의
sealed class CounterIntent {
    data object Increment : CounterIntent()
    data object Decrement : CounterIntent()
    data object Reset : CounterIntent()
    data object LoadInitialCount : CounterIntent()
}

// Orbit MVI ViewModel
class CounterViewModel : ContainerHost<CounterState, Nothing>, ViewModel() {
    override val container = container<CounterState, Nothing>(CounterState())

    fun handleIntent(intent: CounterIntent) = intent {
        when (intent) {
            is CounterIntent.Increment -> reduce {
                state.copy(count = state.count + 1)
            }
            is CounterIntent.Decrement -> reduce {
                state.copy(count = maxOf(0, state.count - 1))
            }
            is CounterIntent.Reset -> reduce {
                state.copy(count = 0)
            }
            is CounterIntent.LoadInitialCount -> {
                reduce { state.copy(isLoading = true) }
                postSideEffect(/* ... */)
                try {
                    val count = repository.fetchInitialCount()
                    reduce { state.copy(count = count, isLoading = false) }
                } catch (e: Exception) {
                    reduce { state.copy(isLoading = false, errorMessage = e.message) }
                }
            }
        }
    }
}

// Composable에서 수집
@Composable
fun CounterScreen(viewModel: CounterViewModel = hiltViewModel()) {
    val state by viewModel.container.stateFlow.collectAsState()

    CounterContent(
        count = state.count,
        isLoading = state.isLoading,
        onIncrement = { viewModel.handleIntent(CounterIntent.Increment) },
        onDecrement = { viewModel.handleIntent(CounterIntent.Decrement) }
    )
}`,
    },
    web: {
      language: 'typescript',
      code: `// 웹 Redux — createSlice (Redux Toolkit)

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// 상태 타입
interface CounterState {
  count: number;
  isLoading: boolean;
  errorMessage: string | null;
}

const initialState: CounterState = {
  count: 0,
  isLoading: false,
  errorMessage: null,
};

// 비동기 Thunk
export const loadInitialCount = createAsyncThunk(
  'counter/loadInitial',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/counter/initial');
      const data = await response.json();
      return data.count as number;
    } catch (err) {
      return rejectWithValue('초기값 로드 실패');
    }
  }
);

// Slice (Reducer + Action 통합)
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1; // Immer로 불변성 자동 처리
    },
    decrement: (state) => {
      state.count = Math.max(0, state.count - 1);
    },
    reset: (state) => {
      state.count = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadInitialCount.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(loadInitialCount.fulfilled, (state, action: PayloadAction<number>) => {
        state.isLoading = false;
        state.count = action.payload;
      })
      .addCase(loadInitialCount.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;

// 컴포넌트에서 사용
function CounterComponent() {
  const count = useSelector((state: RootState) => state.counter.count);
  const isLoading = useSelector((state: RootState) => state.counter.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadInitialCount());
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS TCA — Reducer 구현
import ComposableArchitecture

// 1. State: 불변 구조체
@ObservableState
struct CounterFeature: Reducer {
    // State — 기능의 모든 상태
    struct State: Equatable {
        var count: Int = 0
        var isLoading: Bool = false
        var errorMessage: String? = nil
    }

    // Action — 모든 이벤트를 열거형으로 표현
    enum Action {
        case increment
        case decrement
        case reset
        case loadInitialCount
        // 비동기 결과는 별도 케이스로 분리
        case initialCountResponse(Result<Int, Error>)
    }

    // Dependency 주입
    @Dependency(\.counterClient) var counterClient

    // Reducer — (State, Action) → Effect
    // 순수 함수: 상태 변경 + Effect 반환만
    var body: some Reducer<State, Action> {
        Reduce { state, action in
            switch action {
            case .increment:
                state.count += 1
                return .none // 사이드 이펙트 없음

            case .decrement:
                state.count = max(0, state.count - 1)
                return .none

            case .reset:
                state.count = 0
                return .none

            case .loadInitialCount:
                state.isLoading = true
                state.errorMessage = nil
                // Effect 반환 — 비동기 작업
                return .run { send in
                    await send(.initialCountResponse(
                        Result { try await counterClient.fetchInitial() }
                    ))
                }

            case .initialCountResponse(.success(let count)):
                state.isLoading = false
                state.count = count
                return .none

            case .initialCountResponse(.failure(let error)):
                state.isLoading = false
                state.errorMessage = error.localizedDescription
                return .none
            }
        }
    }
}

// SwiftUI View — Store 구독
struct CounterView: View {
    // Store: 상태 보유 + Action 처리 런타임
    let store: StoreOf<CounterFeature>

    var body: some View {
        VStack(spacing: 20) {
            if store.isLoading {
                ProgressView()
            } else {
                Text("Count: \\(store.count)")
                    .font(.largeTitle)
            }

            if let error = store.errorMessage {
                Text(error).foregroundColor(.red)
            }

            HStack {
                Button("+") { store.send(.increment) }
                Button("-") { store.send(.decrement) }
                Button("초기화") { store.send(.reset) }
            }
        }
        .onAppear { store.send(.loadInitialCount) }
    }
}`,
    },
  },

  arch_tca_effect: {
    caption: 'TCA Effect (사이드 이펙트) vs MVI SideEffect vs Redux-Thunk/Saga',
    android: {
      language: 'kotlin',
      code: `// Android MVI 사이드 이펙트
// Orbit MVI의 postSideEffect + StateFlow

// SideEffect: 일회성 이벤트 (네비게이션, 토스트 등)
sealed class ProfileSideEffect {
    data class ShowToast(val message: String) : ProfileSideEffect()
    data object NavigateToHome : ProfileSideEffect()
    data class OpenExternalUrl(val url: String) : ProfileSideEffect()
}

@HiltViewModel
class ProfileViewModel @Inject constructor(
    private val userRepository: UserRepository
) : ContainerHost<ProfileState, ProfileSideEffect>, ViewModel() {

    override val container = container<ProfileState, ProfileSideEffect>(
        ProfileState()
    )

    // 비동기 작업 — Job 관리로 취소 가능
    private var searchJob: Job? = null

    fun loadProfile(userId: String) = intent {
        reduce { state.copy(isLoading = true) }
        try {
            val user = userRepository.getUser(userId)
            reduce { state.copy(user = user, isLoading = false) }
        } catch (e: Exception) {
            reduce { state.copy(isLoading = false, error = e.message) }
            postSideEffect(ProfileSideEffect.ShowToast("로드 실패: \${e.message}"))
        }
    }

    // 디바운스 검색 — Job 취소 후 재실행
    fun onSearchTextChanged(query: String) = intent {
        reduce { state.copy(searchQuery = query) }
        searchJob?.cancel()
        searchJob = viewModelScope.launch {
            delay(300) // 300ms 디바운스
            try {
                val results = userRepository.search(query)
                reduce { state.copy(searchResults = results) }
            } catch (e: CancellationException) {
                // 취소됨 — 무시
            }
        }
    }

    fun onLogoutClicked() = intent {
        userRepository.logout()
        postSideEffect(ProfileSideEffect.NavigateToHome)
    }
}

// Composable에서 SideEffect 처리
@Composable
fun ProfileScreen(viewModel: ProfileViewModel = hiltViewModel()) {
    val context = LocalContext.current

    CollectSideEffect(viewModel.container.sideEffectFlow) { effect ->
        when (effect) {
            is ProfileSideEffect.ShowToast ->
                Toast.makeText(context, effect.message, Toast.LENGTH_SHORT).show()
            is ProfileSideEffect.NavigateToHome ->
                navController.navigate("home") { popUpTo(0) }
            is ProfileSideEffect.OpenExternalUrl ->
                context.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(effect.url)))
        }
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// 웹: Redux-Saga로 복잡한 사이드 이펙트 처리

import { call, put, takeLatest, cancel, fork, delay } from 'redux-saga/effects';

// Redux-Saga — 제너레이터 기반 비동기 처리
function* loadProfileSaga(action: ReturnType<typeof loadProfile>) {
  try {
    yield put(setLoading(true));
    // call: 비동기 함수 호출 (테스트 가능)
    const user: User = yield call(apiClient.fetchUser, action.payload.userId);
    yield put(setUser(user));
  } catch (error) {
    yield put(setError((error as Error).message));
    yield put(showToast({ message: '로드 실패', type: 'error' }));
  } finally {
    yield put(setLoading(false));
  }
}

// takeLatest: 마지막 요청만 처리 (디바운스 효과)
function* searchUsersSaga(action: ReturnType<typeof searchTextChanged>) {
  yield delay(300); // 디바운스
  try {
    const results: User[] = yield call(apiClient.searchUsers, action.payload.query);
    yield put(setSearchResults(results));
  } catch (error) {
    yield put(setSearchError((error as Error).message));
  }
}

// 루트 Saga — 모든 워커 Saga 등록
function* rootSaga() {
  // takeLatest: 이전 요청 자동 취소
  yield takeLatest(loadProfile.type, loadProfileSaga);
  yield takeLatest(searchTextChanged.type, searchUsersSaga);
}

// ─── Redux-Thunk 방식 (더 단순) ───
// createAsyncThunk 내부에서 사이드 이펙트 처리
export const loadProfileThunk = createAsyncThunk(
  'profile/load',
  async (userId: string, { dispatch, rejectWithValue }) => {
    try {
      const user = await apiClient.fetchUser(userId);
      return user;
    } catch (error) {
      dispatch(showToast({ message: '로드 실패', type: 'error' }));
      return rejectWithValue((error as Error).message);
    }
  }
);

// Abort Controller로 취소
const promise = dispatch(loadProfileThunk('user-123'));
// 컴포넌트 언마운트 시 취소
return () => promise.abort();`,
    },
    ios: {
      language: 'swift',
      code: `// iOS TCA — Effect 패턴 총정리
import ComposableArchitecture

struct ProfileFeature: Reducer {
    @ObservableState
    struct State: Equatable {
        var user: User? = nil
        var isLoading = false
        var searchQuery = ""
        var searchResults: [User] = []
        var errorMessage: String? = nil
    }

    enum Action {
        case loadProfile(userID: String)
        case profileResponse(Result<User, Error>)
        case searchTextChanged(String)
        case searchResponse(Result<[User], Error>)
        case logoutTapped
        case logoutCompleted
    }

    // 취소 식별자 — Hashable 필수
    private enum CancelID {
        case search
        case profileLoad
    }

    @Dependency(\.userClient) var userClient
    @Dependency(\.authClient) var authClient

    var body: some Reducer<State, Action> {
        Reduce { state, action in
            switch action {
            // ─── .run: 비동기 Effect ───
            case .loadProfile(let userID):
                state.isLoading = true
                state.errorMessage = nil
                return .run { send in
                    await send(.profileResponse(
                        Result { try await userClient.fetchUser(userID) }
                    ))
                }
                // cancelInFlight: 진행 중인 동일 CancelID Effect 자동 취소
                .cancellable(id: CancelID.profileLoad, cancelInFlight: true)

            case .profileResponse(.success(let user)):
                state.isLoading = false
                state.user = user
                return .none

            case .profileResponse(.failure(let error)):
                state.isLoading = false
                state.errorMessage = error.localizedDescription
                return .none

            // ─── 디바운스 검색 ───
            case .searchTextChanged(let query):
                state.searchQuery = query
                guard !query.isEmpty else {
                    state.searchResults = []
                    return .cancel(id: CancelID.search) // 즉시 취소
                }
                return .run { send in
                    // 300ms 대기 (디바운스)
                    try await Task.sleep(for: .milliseconds(300))
                    await send(.searchResponse(
                        Result { try await userClient.search(query) }
                    ))
                }
                .cancellable(id: CancelID.search, cancelInFlight: true)

            case .searchResponse(.success(let users)):
                state.searchResults = users
                return .none

            case .searchResponse(.failure):
                state.searchResults = []
                return .none

            // ─── 순차 Effect 체인 ───
            case .logoutTapped:
                // .concatenate: 순서대로 실행
                return .concatenate(
                    .run { _ in try await authClient.revokeTokens() },
                    .run { _ in await authClient.clearLocalData() },
                    .send(.logoutCompleted) // 완료 후 Action 발송
                )

            case .logoutCompleted:
                // 네비게이션은 부모 Reducer가 처리
                return .none
            }
        }
    }
}`,
    },
  },

  arch_tca_dependency: {
    caption: 'TCA @Dependency vs Android Hilt @Inject vs React Context DI',
    android: {
      language: 'kotlin',
      code: `// Android Hilt DI — 컴파일 타임 어노테이션 기반

// 1. 모듈 정의 — 인터페이스를 구현체에 바인딩
@Module
@InstallIn(SingletonComponent::class)
abstract class RepositoryModule {

    @Binds
    @Singleton
    abstract fun bindUserRepository(
        impl: UserRepositoryImpl
    ): UserRepository
}

@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {

    @Provides
    @Singleton
    fun provideRetrofit(): Retrofit = Retrofit.Builder()
        .baseUrl(BuildConfig.BASE_URL)
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    @Provides
    @Singleton
    fun provideUserApiService(retrofit: Retrofit): UserApiService =
        retrofit.create(UserApiService::class.java)
}

// 2. ViewModel에 주입
@HiltViewModel
class ProfileViewModel @Inject constructor(
    private val getUserUseCase: GetUserUseCase,
    private val analyticsService: AnalyticsService,
    private val savedStateHandle: SavedStateHandle
) : ViewModel() {
    // ...
}

// 3. 테스트 — @UninstallModules + 커스텀 모듈
@HiltAndroidTest
@UninstallModules(RepositoryModule::class)
class ProfileViewModelTest {

    @Module
    @InstallIn(SingletonComponent::class)
    abstract class FakeRepositoryModule {
        @Binds
        abstract fun bindUserRepository(
            fake: FakeUserRepository
        ): UserRepository
    }

    @Inject lateinit var viewModel: ProfileViewModel

    @Test
    fun testLoadProfile() = runTest {
        // Hilt가 FakeUserRepository 주입
        viewModel.loadProfile("user-123")
        // assertions...
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// 웹 React — Context API로 DI
// + tsyringe (데코레이터 기반 DI 컨테이너)

// ─── Context API 방식 ───
// 의존성 인터페이스
interface UserService {
  fetchUser: (id: string) => Promise<User>;
  updateUser: (user: User) => Promise<User>;
}

// Context 생성
const UserServiceContext = createContext<UserService | null>(null);

// 커스텀 훅
function useUserService(): UserService {
  const service = useContext(UserServiceContext);
  if (!service) throw new Error('UserServiceProvider 누락');
  return service;
}

// Provider (실제 구현)
function AppProviders({ children }: { children: React.ReactNode }) {
  const userService: UserService = useMemo(() => ({
    fetchUser: (id) => fetch(\`/api/users/\${id}\`).then(r => r.json()),
    updateUser: (user) => fetch('/api/users', {
      method: 'PUT',
      body: JSON.stringify(user),
    }).then(r => r.json()),
  }), []);

  return (
    <UserServiceContext.Provider value={userService}>
      {children}
    </UserServiceContext.Provider>
  );
}

// 테스트에서 Mock Provider
function renderWithMocks(ui: React.ReactElement) {
  const mockUserService: UserService = {
    fetchUser: jest.fn().mockResolvedValue(mockUser),
    updateUser: jest.fn().mockResolvedValue(mockUser),
  };
  return render(
    <UserServiceContext.Provider value={mockUserService}>
      {ui}
    </UserServiceContext.Provider>
  );
}

// ─── tsyringe 방식 ───
import { injectable, inject, container } from 'tsyringe';

@injectable()
class ProfileViewModel {
  constructor(
    @inject('UserRepository') private userRepo: UserRepository,
    @inject('Analytics') private analytics: AnalyticsService
  ) {}
}

// 테스트에서 교체
container.register('UserRepository', { useClass: MockUserRepository });`,
    },
    ios: {
      language: 'swift',
      code: `// iOS TCA — @Dependency 시스템
import ComposableArchitecture

// ─── Step 1: 의존성 인터페이스 정의 ───
struct UserClient {
    var fetchUser: @Sendable (String) async throws -> User
    var updateUser: @Sendable (User) async throws -> User
    var searchUsers: @Sendable (String) async throws -> [User]
}

// ─── Step 2: DependencyKey로 등록 ───
extension UserClient: DependencyKey {
    // 실제 앱 구현체
    static let liveValue = UserClient(
        fetchUser: { id in
            let url = URL(string: "https://api.example.com/users/\\(id)")!
            let (data, _) = try await URLSession.shared.data(from: url)
            return try JSONDecoder().decode(User.self, from: data)
        },
        updateUser: { user in
            var request = URLRequest(url: URL(string: "https://api.example.com/users/\\(user.id)")!)
            request.httpMethod = "PUT"
            request.httpBody = try JSONEncoder().encode(user)
            let (data, _) = try await URLSession.shared.data(for: request)
            return try JSONDecoder().decode(User.self, from: data)
        },
        searchUsers: { query in
            let url = URL(string: "https://api.example.com/users/search?q=\\(query)")!
            let (data, _) = try await URLSession.shared.data(from: url)
            return try JSONDecoder().decode([User].self, from: data)
        }
    )

    // 테스트 기본값 — 실제 네트워크 미호출
    static let testValue = UserClient(
        fetchUser: { _ in .mock },
        updateUser: { user in user },
        searchUsers: { _ in [] }
    )

    // SwiftUI Preview 기본값
    static var previewValue = UserClient(
        fetchUser: { _ in .preview },
        updateUser: { user in user },
        searchUsers: { _ in [.preview, .preview2] }
    )
}

// DependencyValues에 등록 (타입 안전)
extension DependencyValues {
    var userClient: UserClient {
        get { self[UserClient.self] }
        set { self[UserClient.self] = newValue }
    }
}

// ─── Step 3: Reducer에서 사용 ───
struct ProfileFeature: Reducer {
    struct State: Equatable { var user: User? }
    enum Action { case loadUser(String); case userResponse(User) }

    // 선언만으로 자동 주입 — 테스트/프리뷰/프로덕션 자동 구분
    @Dependency(\\..userClient) var userClient

    var body: some Reducer<State, Action> {
        Reduce { state, action in
            switch action {
            case .loadUser(let id):
                return .run { send in
                    let user = try await userClient.fetchUser(id)
                    await send(.userResponse(user))
                }
            case .userResponse(let user):
                state.user = user
                return .none
            }
        }
    }
}

// ─── Step 4: TestStore에서 Mock 교체 ───
@Test
func testLoadUser() async {
    let mockUser = User(id: "1", name: "테스트 유저")
    let store = TestStore(initialState: ProfileFeature.State()) {
        ProfileFeature()
    } withDependencies: {
        // 클로저로 특정 의존성만 교체
        \$0.userClient.fetchUser = { _ in mockUser }
    }

    await store.send(.loadUser("1"))
    await store.receive(.userResponse(mockUser)) {
        \$0.user = mockUser
    }
}`,
    },
  },

  arch_viper_structure: {
    caption: 'VIPER 구조 vs Android Clean Architecture vs Feature-based React',
    android: {
      language: 'kotlin',
      code: `// Android Clean Architecture — 레이어별 구조
// Feature: 프로필

// ─── Domain Layer ───
// Entity
data class UserProfile(
    val id: String,
    val displayName: String,
    val email: String,
    val avatarUrl: String?,
    val isPremium: Boolean
)

// Repository 인터페이스
interface UserProfileRepository {
    suspend fun getProfile(userId: String): UserProfile
    suspend fun updateProfile(profile: UserProfile): UserProfile
}

// UseCase
class GetUserProfileUseCase @Inject constructor(
    private val repository: UserProfileRepository
) {
    suspend operator fun invoke(userId: String): Result<UserProfile> =
        runCatching { repository.getProfile(userId) }
}

// ─── Data Layer ───
@Singleton
class UserProfileRepositoryImpl @Inject constructor(
    private val remoteDataSource: UserProfileRemoteDataSource,
    private val localDataSource: UserProfileLocalDataSource
) : UserProfileRepository {

    override suspend fun getProfile(userId: String): UserProfile {
        return try {
            val dto = remoteDataSource.fetchProfile(userId)
            localDataSource.saveProfile(dto)
            dto.toDomain()
        } catch (e: Exception) {
            localDataSource.getProfile(userId)?.toDomain()
                ?: throw e
        }
    }

    override suspend fun updateProfile(profile: UserProfile): UserProfile {
        val dto = remoteDataSource.updateProfile(profile.toDto())
        localDataSource.saveProfile(dto)
        return dto.toDomain()
    }
}

// ─── Presentation Layer ───
@HiltViewModel
class UserProfileViewModel @Inject constructor(
    private val getProfileUseCase: GetUserProfileUseCase,
    savedStateHandle: SavedStateHandle
) : ViewModel() {

    private val userId = savedStateHandle.get<String>("userId")!!

    private val _uiState = MutableStateFlow<ProfileUiState>(ProfileUiState.Loading)
    val uiState: StateFlow<ProfileUiState> = _uiState.asStateFlow()

    init {
        loadProfile()
    }

    private fun loadProfile() = viewModelScope.launch {
        _uiState.value = ProfileUiState.Loading
        getProfileUseCase(userId)
            .onSuccess { profile ->
                _uiState.value = ProfileUiState.Success(profile.toUiModel())
            }
            .onFailure { error ->
                _uiState.value = ProfileUiState.Error(error.message ?: "오류")
            }
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// 웹 Feature-based 구조 (Next.js App Router)
// features/profile/ 폴더 구조

// ─── features/profile/types.ts ───
export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  avatarUrl: string | null;
  isPremium: boolean;
}

// ─── features/profile/api.ts (Data Layer) ───
export const profileApi = {
  getProfile: async (userId: string): Promise<UserProfile> => {
    const res = await fetch(\`/api/users/\${userId}\`);
    if (!res.ok) throw new Error('프로필 로드 실패');
    return res.json();
  },
  updateProfile: async (profile: Partial<UserProfile> & { id: string }): Promise<UserProfile> => {
    const res = await fetch(\`/api/users/\${profile.id}\`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
    if (!res.ok) throw new Error('프로필 업데이트 실패');
    return res.json();
  },
};

// ─── features/profile/hooks.ts (UseCase 역할) ───
export function useUserProfile(userId: string) {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: () => profileApi.getProfile(userId),
    staleTime: 5 * 60 * 1000, // 5분 캐시
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: profileApi.updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(['profile', data.id], data);
    },
  });
}

// ─── features/profile/components/ProfileCard.tsx (View) ───
export function ProfileCard({ userId }: { userId: string }) {
  const { data: profile, isLoading, error } = useUserProfile(userId);
  const { mutate: updateProfile } = useUpdateProfile();

  if (isLoading) return <ProfileSkeleton />;
  if (error) return <ErrorMessage error={error} />;
  if (!profile) return null;

  return (
    <div className="profile-card">
      <Avatar src={profile.avatarUrl} name={profile.displayName} />
      <h2>{profile.displayName}</h2>
      {profile.isPremium && <PremiumBadge />}
      <button onClick={() => updateProfile({ id: profile.id, displayName: 'New Name' })}>
        편집
      </button>
    </div>
  );
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS VIPER — 전체 구조
// Feature: 프로필

// ─── Entity ───
struct UserProfile: Codable, Equatable {
    let id: String
    let displayName: String
    let email: String
    let avatarURL: URL?
    let isPremium: Bool
}

// ─── Interactor ───
// 비즈니스 로직만 담당, UI 몰라야 함
protocol ProfileInteractorProtocol: AnyObject {
    func loadProfile(userID: String)
    func updateDisplayName(_ name: String)
}

protocol ProfileInteractorOutputProtocol: AnyObject {
    func didLoadProfile(_ profile: UserProfile)
    func didFailToLoadProfile(with error: Error)
    func didUpdateProfile(_ profile: UserProfile)
}

class ProfileInteractor: ProfileInteractorProtocol {
    weak var output: ProfileInteractorOutputProtocol?
    private let userRepository: UserRepository

    init(userRepository: UserRepository) {
        self.userRepository = userRepository
    }

    func loadProfile(userID: String) {
        Task {
            do {
                let profile = try await userRepository.getUser(id: userID)
                await MainActor.run {
                    output?.didLoadProfile(profile)
                }
            } catch {
                await MainActor.run {
                    output?.didFailToLoadProfile(with: error)
                }
            }
        }
    }

    func updateDisplayName(_ name: String) {
        guard name.count >= 2 else {
            // 비즈니스 규칙 검증
            return
        }
        // ... 업데이트 로직
    }
}

// ─── Presenter ───
// View ↔ Interactor 사이 중재, 표시 로직 담당
protocol ProfilePresenterProtocol: AnyObject {
    func viewDidLoad()
    func didTapEditButton()
}

class ProfilePresenter: ProfilePresenterProtocol {
    weak var view: ProfileViewProtocol?
    var interactor: ProfileInteractorProtocol?
    var router: ProfileRouterProtocol?

    private let userID: String

    init(userID: String) {
        self.userID = userID
    }

    func viewDidLoad() {
        view?.showLoadingIndicator()
        interactor?.loadProfile(userID: userID)
    }

    func didTapEditButton() {
        router?.navigateToEditProfile()
    }
}

extension ProfilePresenter: ProfileInteractorOutputProtocol {
    func didLoadProfile(_ profile: UserProfile) {
        view?.hideLoadingIndicator()
        // Domain Entity → View Model 변환 (Presenter 책임)
        let viewModel = ProfileViewModel(
            displayName: profile.displayName,
            email: profile.email,
            avatarURL: profile.avatarURL,
            badgeText: profile.isPremium ? "Premium" : nil
        )
        view?.displayProfile(viewModel)
    }

    func didFailToLoadProfile(with error: Error) {
        view?.hideLoadingIndicator()
        view?.displayError("프로필을 불러오지 못했습니다.")
    }

    func didUpdateProfile(_ profile: UserProfile) {
        // ...
    }
}

// ─── View ───
protocol ProfileViewProtocol: AnyObject {
    func showLoadingIndicator()
    func hideLoadingIndicator()
    func displayProfile(_ viewModel: ProfileViewModel)
    func displayError(_ message: String)
}

class ProfileViewController: UIViewController, ProfileViewProtocol {
    var presenter: ProfilePresenterProtocol?

    override func viewDidLoad() {
        super.viewDidLoad()
        presenter?.viewDidLoad()
    }

    func showLoadingIndicator() { /* ... */ }
    func hideLoadingIndicator() { /* ... */ }
    func displayProfile(_ viewModel: ProfileViewModel) { /* ... */ }
    func displayError(_ message: String) { /* ... */ }
}

// ─── Router ───
protocol ProfileRouterProtocol: AnyObject {
    func navigateToEditProfile()
    func navigateBack()
}

class ProfileRouter: ProfileRouterProtocol {
    weak var viewController: UIViewController?

    func navigateToEditProfile() {
        let editVC = EditProfileModule.build()
        viewController?.navigationController?.pushViewController(editVC, animated: true)
    }

    func navigateBack() {
        viewController?.navigationController?.popViewController(animated: true)
    }
}

// ─── Builder (모듈 조립) ───
enum ProfileModule {
    static func build(userID: String) -> UIViewController {
        let interactor = ProfileInteractor(userRepository: DIContainer.resolve())
        let router = ProfileRouter()
        let presenter = ProfilePresenter(userID: userID)
        let viewController = ProfileViewController()

        presenter.view = viewController
        presenter.interactor = interactor
        presenter.router = router
        interactor.output = presenter
        viewController.presenter = presenter
        router.viewController = viewController

        return viewController
    }
}`,
    },
  },

  arch_coordinator: {
    caption: 'Coordinator 패턴 vs Android Navigation Component vs React Router',
    android: {
      language: 'kotlin',
      code: `// Android Navigation Component + SafeArgs
// nav_graph.xml + NavController

// 1. Navigation Graph 정의 (res/navigation/nav_graph.xml)
/*
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    app:startDestination="@id/homeFragment">

    <fragment android:id="@+id/homeFragment"
        android:name=".HomeFragment">
        <action
            android:id="@+id/action_home_to_profile"
            app:destination="@id/profileFragment" />
    </fragment>

    <fragment android:id="@+id/profileFragment"
        android:name=".ProfileFragment">
        <!-- SafeArgs: 타입 안전 인자 -->
        <argument
            android:name="userId"
            app:argType="string" />
    </fragment>

    <!-- 딥링크 -->
    <deepLink app:uri="app://example.com/profile/{userId}" />
</navigation>
*/

// 2. Composable Navigation (현대적 방식)
sealed class Screen(val route: String) {
    object Home : Screen("home")
    object Profile : Screen("profile/{userId}") {
        fun createRoute(userId: String) = "profile/\$userId"
    }
    object Settings : Screen("settings")
}

@Composable
fun AppNavGraph(navController: NavHostController) {
    NavHost(navController, startDestination = Screen.Home.route) {
        composable(Screen.Home.route) {
            HomeScreen(
                onNavigateToProfile = { userId ->
                    navController.navigate(Screen.Profile.createRoute(userId))
                }
            )
        }
        composable(
            route = Screen.Profile.route,
            arguments = listOf(navArgument("userId") { type = NavType.StringType })
        ) { backStackEntry ->
            val userId = backStackEntry.arguments?.getString("userId")!!
            ProfileScreen(
                userId = userId,
                onNavigateBack = { navController.popBackStack() }
            )
        }
        composable(Screen.Settings.route) {
            SettingsScreen()
        }
    }
}

// 3. ViewModel에서 네비게이션 이벤트
@HiltViewModel
class ProfileViewModel @Inject constructor(
    private val userRepo: UserRepository
) : ViewModel() {

    private val _navigationEvent = Channel<NavigationEvent>()
    val navigationEvent = _navigationEvent.receiveAsFlow()

    fun onLogout() {
        viewModelScope.launch {
            userRepo.logout()
            _navigationEvent.send(NavigationEvent.NavigateToLogin)
        }
    }
}

// Composable에서 이벤트 수집
LaunchedEffect(Unit) {
    viewModel.navigationEvent.collect { event ->
        when (event) {
            is NavigationEvent.NavigateToLogin ->
                navController.navigate("login") {
                    popUpTo(0) { inclusive = true }
                }
        }
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// 웹 React Router v6 — 선언적 라우팅

// ─── 라우트 정의 ───
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeLoader, // 데이터 미리 로드
      },
      {
        path: 'profile/:userId',
        element: <ProfilePage />,
        loader: async ({ params }) => {
          return await fetchUserProfile(params.userId!);
        },
      },
      {
        path: 'settings',
        element: <PrivateRoute><SettingsPage /></PrivateRoute>,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

// ─── 프로그래매틱 네비게이션 ───
function ProfilePage() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const profile = useLoaderData() as UserProfile;

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login', { replace: true }); // replace: 히스토리 교체
  };

  const handleEditProfile = () => {
    navigate(\`/profile/\${userId}/edit\`, {
      state: { from: 'profile' }, // 상태 전달
    });
  };

  return (
    <div>
      <h1>{profile.displayName}</h1>
      <button onClick={handleEditProfile}>편집</button>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}

// ─── 인증 가드 ───
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS Coordinator + SwiftUI NavigationPath

import SwiftUI

// ─── 라우트 정의 ───
enum AppRoute: Hashable, Identifiable {
    case home
    case profile(userID: String)
    case editProfile(userID: String)
    case settings
    case onboarding(step: OnboardingStep)
    case webView(url: URL)

    var id: String {
        switch self {
        case .home: return "home"
        case .profile(let id): return "profile-\\(id)"
        case .editProfile(let id): return "editProfile-\\(id)"
        case .settings: return "settings"
        case .onboarding(let step): return "onboarding-\\(step)"
        case .webView(let url): return "webView-\\(url)"
        }
    }
}

enum OnboardingStep: Int, Hashable {
    case welcome, permissions, profileSetup, complete
}

// ─── AppRouter (Coordinator 역할) ───
@Observable
final class AppRouter {
    var path = NavigationPath()        // NavigationStack 경로
    var presentedSheet: AppRoute?      // Sheet 표시 중인 경로
    var presentedFullScreen: AppRoute? // FullScreen 표시 중인 경로
    var isLoggedIn: Bool = false

    // Push 네비게이션
    func push(_ route: AppRoute) {
        path.append(route)
    }

    func pop() {
        guard !path.isEmpty else { return }
        path.removeLast()
    }

    func popToRoot() {
        path.removeLast(path.count)
    }

    // Modal 표시
    func present(_ route: AppRoute, fullScreen: Bool = false) {
        if fullScreen {
            presentedFullScreen = route
        } else {
            presentedSheet = route
        }
    }

    func dismiss() {
        presentedSheet = nil
        presentedFullScreen = nil
    }

    // 딥링크 처리
    func handleDeepLink(_ url: URL) {
        guard let components = URLComponents(url: url, resolvingAgainstBaseURL: false),
              let host = components.host else { return }

        switch host {
        case "profile":
            if let userID = components.queryItems?.first(where: { \$0.name == "id" })?.value {
                popToRoot()
                push(.profile(userID: userID))
            }
        case "settings":
            popToRoot()
            push(.settings)
        default:
            break
        }
    }

    // 로그아웃 처리
    func logout() {
        path = NavigationPath()
        presentedSheet = nil
        presentedFullScreen = nil
        isLoggedIn = false
    }
}

// ─── RootView ───
struct RootView: View {
    @State private var router = AppRouter()

    var body: some View {
        Group {
            if router.isLoggedIn {
                NavigationStack(path: \$router.path) {
                    HomeView()
                        .navigationDestination(for: AppRoute.self) { route in
                            destinationView(for: route)
                        }
                }
                .sheet(item: \$router.presentedSheet) { route in
                    NavigationStack { destinationView(for: route) }
                }
                .fullScreenCover(item: \$router.presentedFullScreen) { route in
                    destinationView(for: route)
                }
            } else {
                LoginView()
            }
        }
        .environment(router)
        .onOpenURL { url in
            router.handleDeepLink(url)
        }
    }

    @ViewBuilder
    private func destinationView(for route: AppRoute) -> some View {
        switch route {
        case .home:
            HomeView()
        case .profile(let userID):
            ProfileView(userID: userID)
        case .editProfile(let userID):
            EditProfileView(userID: userID)
        case .settings:
            SettingsView()
        case .onboarding(let step):
            OnboardingView(step: step)
        case .webView(let url):
            SafariView(url: url)
        }
    }
}

// ─── 자식 View에서 라우터 사용 ───
struct ProfileView: View {
    @Environment(AppRouter.self) private var router
    let userID: String

    var body: some View {
        VStack {
            // ...
            Button("편집") {
                router.push(.editProfile(userID: userID))
            }
            Button("설정") {
                router.present(.settings)
            }
        }
    }
}`,
    },
  },

  arch_clean_usecase: {
    caption: 'Clean Architecture UseCase vs Android UseCase vs React Query',
    android: {
      language: 'kotlin',
      code: `// Android Clean Architecture — UseCase 패턴
// invoke operator 관례 사용

// ─── Domain Layer UseCase ───
class GetUserProfileUseCase @Inject constructor(
    private val userRepository: UserRepository,
    private val dispatcher: CoroutineDispatcher = Dispatchers.IO
) {
    // invoke: useCase(param) 형태로 호출 가능
    suspend operator fun invoke(userId: String): Result<UserProfile> =
        withContext(dispatcher) {
            runCatching {
                val profile = userRepository.getProfile(userId)
                // 비즈니스 규칙 적용
                require(profile.id.isNotBlank()) { "유효하지 않은 사용자 ID" }
                profile
            }
        }
}

class UpdateUserProfileUseCase @Inject constructor(
    private val userRepository: UserRepository,
    private val analyticsRepository: AnalyticsRepository
) {
    suspend operator fun invoke(profile: UserProfile): Result<UserProfile> =
        runCatching {
            // 비즈니스 규칙 검증
            require(profile.displayName.length >= 2) { "이름은 2자 이상이어야 합니다" }
            require(profile.displayName.length <= 30) { "이름은 30자 이하여야 합니다" }
            require(profile.email.contains("@")) { "유효한 이메일을 입력하세요" }

            val updated = userRepository.updateProfile(profile)
            // 부수 효과 — 애널리틱스 이벤트
            analyticsRepository.track("profile_updated", mapOf("userId" to profile.id))
            updated
        }
}

// ─── ViewModel에서 UseCase 조합 ───
@HiltViewModel
class ProfileViewModel @Inject constructor(
    private val getProfile: GetUserProfileUseCase,
    private val updateProfile: UpdateUserProfileUseCase,
    savedStateHandle: SavedStateHandle
) : ViewModel() {

    private val userId = savedStateHandle.get<String>("userId")!!

    val profileState = flow {
        emit(ProfileUiState.Loading)
        getProfile(userId)
            .onSuccess { emit(ProfileUiState.Success(it.toUiModel())) }
            .onFailure { emit(ProfileUiState.Error(it.message ?: "오류")) }
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), ProfileUiState.Loading)

    fun save(profile: UserProfile) = viewModelScope.launch {
        updateProfile(profile)
            .onSuccess { /* 성공 처리 */ }
            .onFailure { /* 에러 처리 */ }
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// 웹 React Query — UseCase 역할을 하는 커스텀 훅

// ─── API 레이어 (Data Layer) ───
const userApi = {
  getProfile: async (userId: string): Promise<UserProfileDTO> => {
    const res = await apiClient.get(\`/users/\${userId}\`);
    return res.data;
  },
  updateProfile: async (data: UpdateProfileRequest): Promise<UserProfileDTO> => {
    const res = await apiClient.put(\`/users/\${data.id}\`, data);
    return res.data;
  },
};

// ─── 도메인 변환 (DTO → Domain Model) ───
function toDomainUser(dto: UserProfileDTO): UserProfile {
  return {
    id: dto.user_id,
    displayName: dto.display_name,
    email: dto.email_address,
    avatarUrl: dto.avatar_url ?? null,
    isPremium: dto.subscription_tier === 'premium',
  };
}

// ─── UseCase 커스텀 훅 ───
// GetUserProfile UseCase
export function useUserProfile(userId: string) {
  return useQuery({
    queryKey: ['user', 'profile', userId],
    queryFn: async () => {
      const dto = await userApi.getProfile(userId);
      return toDomainUser(dto); // DTO → Domain 변환
    },
    staleTime: 5 * 60 * 1000,  // 5분 캐시
    retry: (failureCount, error) => {
      // 404는 재시도 안 함
      if (axios.isAxiosError(error) && error.response?.status === 404) return false;
      return failureCount < 3;
    },
  });
}

// UpdateUserProfile UseCase — 비즈니스 규칙 포함
export function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UpdateProfileInput) => {
      // 비즈니스 규칙 검증
      if (profile.displayName.length < 2) throw new Error('이름은 2자 이상이어야 합니다');
      if (profile.displayName.length > 30) throw new Error('이름은 30자 이하여야 합니다');
      if (!profile.email.includes('@')) throw new Error('유효한 이메일을 입력하세요');

      const dto = await userApi.updateProfile(profile);
      return toDomainUser(dto);
    },
    onSuccess: (updatedUser) => {
      // 캐시 업데이트
      queryClient.setQueryData(['user', 'profile', updatedUser.id], updatedUser);
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['user', 'list'] });
    },
  });
}

// ─── 컴포넌트에서 사용 ───
function ProfilePage({ userId }: { userId: string }) {
  const { data: profile, isLoading } = useUserProfile(userId);
  const { mutate: update, isPending } = useUpdateUserProfile();

  if (isLoading) return <Skeleton />;

  return (
    <ProfileForm
      profile={profile!}
      onSubmit={(data) => update({ id: userId, ...data })}
      isSubmitting={isPending}
    />
  );
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS Clean Architecture — UseCase 구현

// ─── Domain Layer (프레임워크 미의존) ───

// 비즈니스 에러
enum ProfileError: LocalizedError {
    case invalidDisplayName(reason: String)
    case invalidEmail
    case notFound
    case serverError(String)

    var errorDescription: String? {
        switch self {
        case .invalidDisplayName(let reason): return reason
        case .invalidEmail: return "유효한 이메일을 입력하세요"
        case .notFound: return "사용자를 찾을 수 없습니다"
        case .serverError(let msg): return msg
        }
    }
}

// Entity
struct UserProfile: Equatable {
    let id: String
    var displayName: String
    var email: String
    var avatarURL: URL?
    var isPremium: Bool

    // 비즈니스 규칙을 Entity에 캡슐화
    var isValidDisplayName: Bool {
        (2...30).contains(displayName.count)
    }

    var isValidEmail: Bool {
        displayName.contains("@") && email.contains(".")
    }
}

// Repository 프로토콜
protocol UserProfileRepository {
    func getProfile(userID: String) async throws -> UserProfile
    func updateProfile(_ profile: UserProfile) async throws -> UserProfile
}

// ─── UseCase ───
struct GetUserProfileUseCase {
    let repository: UserProfileRepository

    func execute(userID: String) async throws -> UserProfile {
        guard !userID.isEmpty else {
            throw ProfileError.invalidDisplayName(reason: "유효하지 않은 사용자 ID")
        }
        return try await repository.getProfile(userID: userID)
    }
}

struct UpdateUserProfileUseCase {
    let repository: UserProfileRepository
    let analyticsService: AnalyticsServiceProtocol

    func execute(profile: UserProfile) async throws -> UserProfile {
        // 비즈니스 규칙 검증
        guard profile.isValidDisplayName else {
            if profile.displayName.count < 2 {
                throw ProfileError.invalidDisplayName(reason: "이름은 2자 이상이어야 합니다")
            } else {
                throw ProfileError.invalidDisplayName(reason: "이름은 30자 이하여야 합니다")
            }
        }
        guard profile.isValidEmail else {
            throw ProfileError.invalidEmail
        }

        let updated = try await repository.updateProfile(profile)
        // 부수 효과 — 애널리틱스
        analyticsService.track(event: "profile_updated", properties: ["userId": profile.id])
        return updated
    }
}

// ─── TCA에서 UseCase 통합 ───
struct ProfileFeature: Reducer {
    @ObservableState
    struct State: Equatable {
        var profile: UserProfile? = nil
        var isLoading = false
        var errorMessage: String? = nil
    }

    enum Action {
        case loadProfile(String)
        case updateProfile(UserProfile)
        case profileResponse(Result<UserProfile, Error>)
        case updateResponse(Result<UserProfile, Error>)
    }

    // UseCase를 @Dependency로 주입
    @Dependency(\\.getUserProfileUseCase) var getProfile
    @Dependency(\\.updateUserProfileUseCase) var updateProfile

    var body: some Reducer<State, Action> {
        Reduce { state, action in
            switch action {
            case .loadProfile(let userID):
                state.isLoading = true
                return .run { send in
                    await send(.profileResponse(
                        Result { try await getProfile.execute(userID: userID) }
                    ))
                }

            case .updateProfile(let profile):
                state.isLoading = true
                return .run { send in
                    await send(.updateResponse(
                        Result { try await updateProfile.execute(profile: profile) }
                    ))
                }

            case .profileResponse(.success(let profile)),
                 .updateResponse(.success(let profile)):
                state.isLoading = false
                state.profile = profile
                state.errorMessage = nil
                return .none

            case .profileResponse(.failure(let error)),
                 .updateResponse(.failure(let error)):
                state.isLoading = false
                state.errorMessage = error.localizedDescription
                return .none
            }
        }
    }
}`,
    },
  },

  arch_clean_repository: {
    caption: 'Repository 패턴 vs Android Repository vs SWR/React Query',
    android: {
      language: 'kotlin',
      code: `// Android Repository 패턴
// 오프라인 우선 + Cache-and-Network

@Singleton
class UserRepositoryImpl @Inject constructor(
    private val remoteDataSource: UserRemoteDataSource,
    private val localDataSource: UserLocalDataSource, // Room DAO
    private val networkMonitor: NetworkMonitor
) : UserRepository {

    // 캐시 우선 → 네트워크 갱신 (Offline-first)
    override fun getUserProfile(userId: String): Flow<Resource<UserProfile>> = flow {
        // 1. 로컬 캐시 즉시 반환
        val cached = localDataSource.getUser(userId)
        if (cached != null) {
            emit(Resource.Success(cached.toDomain()))
        } else {
            emit(Resource.Loading)
        }

        // 2. 네트워크 연결 시 원격 데이터 가져오기
        if (networkMonitor.isConnected) {
            try {
                val remote = remoteDataSource.fetchUser(userId)
                localDataSource.upsertUser(remote) // 캐시 갱신
                emit(Resource.Success(remote.toDomain()))
            } catch (e: Exception) {
                if (cached == null) {
                    emit(Resource.Error(e.message ?: "알 수 없는 오류"))
                }
                // 캐시가 있으면 에러 무시 (오프라인 허용)
            }
        }
    }.flowOn(Dispatchers.IO)

    // 업데이트: Optimistic Update 패턴
    override suspend fun updateProfile(profile: UserProfile): Result<UserProfile> =
        withContext(Dispatchers.IO) {
            val originalProfile = localDataSource.getUser(profile.id)
            // Optimistic: 즉시 로컬 업데이트
            localDataSource.upsertUser(profile.toEntity())
            try {
                val updated = remoteDataSource.updateUser(profile.toDto())
                localDataSource.upsertUser(updated)
                Result.success(updated.toDomain())
            } catch (e: Exception) {
                // 실패 시 롤백
                originalProfile?.let { localDataSource.upsertUser(it) }
                Result.failure(e)
            }
        }

    // 검색: 원격만 (캐시 불필요)
    override suspend fun searchUsers(query: String): Result<List<UserProfile>> =
        withContext(Dispatchers.IO) {
            runCatching {
                remoteDataSource.searchUsers(query).map { it.toDomain() }
            }
        }
}`,
    },
    web: {
      language: 'typescript',
      code: `// 웹 SWR / React Query — 자동 캐싱 + 재검증

// ─── SWR 방식 ───
import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

// 캐시 키 팩토리 (타입 안전)
const userKeys = {
  profile: (userId: string) => \`/api/users/\${userId}\` as const,
  list: (page: number) => \`/api/users?page=\${page}\` as const,
  search: (query: string) => \`/api/users/search?q=\${query}\` as const,
};

// Repository 역할을 하는 훅
export function useUserRepository() {
  return {
    // 프로필 조회 (캐시 우선, 백그라운드 재검증)
    getProfile: (userId: string) => useSWR(
      userKeys.profile(userId),
      fetcher,
      {
        revalidateOnFocus: true,
        dedupingInterval: 2000,
        fallbackData: getCachedProfile(userId), // 초기 캐시
      }
    ),

    // 업데이트: Optimistic UI
    updateProfile: async (profile: UserProfile) => {
      const key = userKeys.profile(profile.id);

      // 즉시 로컬 업데이트 (Optimistic)
      await mutate(key, profile, false);

      try {
        const updated = await apiClient.put(\`/api/users/\${profile.id}\`, profile);
        await mutate(key, updated.data); // 서버 응답으로 확정
        return updated.data;
      } catch (error) {
        await mutate(key); // 실패 시 재검증으로 롤백
        throw error;
      }
    },
  };
}

// ─── React Query 방식 (더 명시적) ───
export const userRepository = {
  getProfile: (userId: string) => ({
    queryKey: ['user', userId],
    queryFn: () => apiClient.get<UserProfile>(\`/api/users/\${userId}\`).then(r => r.data),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  }),

  updateProfile: () => ({
    mutationFn: (profile: UserProfile) =>
      apiClient.put<UserProfile>(\`/api/users/\${profile.id}\`, profile).then(r => r.data),
    onMutate: async (newProfile: UserProfile) => {
      const queryClient = useQueryClient();
      await queryClient.cancelQueries({ queryKey: ['user', newProfile.id] });
      const previous = queryClient.getQueryData(['user', newProfile.id]);
      queryClient.setQueryData(['user', newProfile.id], newProfile);
      return { previous }; // 롤백용 컨텍스트
    },
    onError: (_err: Error, _vars: UserProfile, context: { previous: UserProfile }) => {
      const queryClient = useQueryClient();
      queryClient.setQueryData(['user', context.previous.id], context.previous);
    },
  }),
};`,
    },
    ios: {
      language: 'swift',
      code: `// iOS Clean Architecture — Repository 구현체

// ─── Domain Layer: 프로토콜만 ───
protocol UserRepository {
    func getProfile(userID: String) async throws -> UserProfile
    func updateProfile(_ profile: UserProfile) async throws -> UserProfile
    func searchUsers(query: String) async throws -> [UserProfile]
    func getCachedProfile(userID: String) -> UserProfile?
}

// ─── Data Layer: 구현체 ───

// DTO (Data Transfer Object) — API 응답 매핑
struct UserProfileDTO: Codable {
    let user_id: String
    let display_name: String
    let email_address: String
    let avatar_url: String?
    let subscription_tier: String

    func toDomain() -> UserProfile {
        UserProfile(
            id: user_id,
            displayName: display_name,
            email: email_address,
            avatarURL: avatar_url.flatMap(URL.init),
            isPremium: subscription_tier == "premium"
        )
    }
}

// Actor: 스레드 안전한 캐시
actor ProfileCache {
    private var cache: [String: (profile: UserProfile, timestamp: Date)] = [:]
    private let ttl: TimeInterval = 5 * 60 // 5분

    func get(userID: String) -> UserProfile? {
        guard let entry = cache[userID] else { return nil }
        guard Date().timeIntervalSince(entry.timestamp) < ttl else {
            cache.removeValue(forKey: userID)
            return nil
        }
        return entry.profile
    }

    func set(_ profile: UserProfile) {
        cache[profile.id] = (profile, Date())
    }

    func invalidate(userID: String) {
        cache.removeValue(forKey: userID)
    }
}

// Repository 구현체
final class UserRepositoryImpl: UserRepository {
    private let remoteDataSource: UserRemoteDataSource
    private let localDataSource: UserLocalDataSource // CoreData / SwiftData
    private let cache = ProfileCache()

    init(
        remoteDataSource: UserRemoteDataSource,
        localDataSource: UserLocalDataSource
    ) {
        self.remoteDataSource = remoteDataSource
        self.localDataSource = localDataSource
    }

    // 캐시 → 로컬 → 원격 순서 (오프라인 우선)
    func getProfile(userID: String) async throws -> UserProfile {
        // 1. 메모리 캐시
        if let cached = await cache.get(userID: userID) {
            // 백그라운드에서 갱신 (Stale-While-Revalidate)
            Task { try? await refreshFromRemote(userID: userID) }
            return cached
        }

        // 2. 로컬 DB
        if let local = try await localDataSource.getProfile(userID: userID) {
            await cache.set(local)
            Task { try? await refreshFromRemote(userID: userID) }
            return local
        }

        // 3. 원격 API
        return try await fetchFromRemote(userID: userID)
    }

    private func fetchFromRemote(userID: String) async throws -> UserProfile {
        let dto = try await remoteDataSource.fetchProfile(userID: userID)
        let profile = dto.toDomain()
        await cache.set(profile)
        try? await localDataSource.saveProfile(profile)
        return profile
    }

    private func refreshFromRemote(userID: String) async throws {
        let dto = try await remoteDataSource.fetchProfile(userID: userID)
        let profile = dto.toDomain()
        await cache.set(profile)
        try? await localDataSource.saveProfile(profile)
    }

    // Optimistic Update
    func updateProfile(_ profile: UserProfile) async throws -> UserProfile {
        // 즉시 캐시/로컬 업데이트
        await cache.set(profile)
        try? await localDataSource.saveProfile(profile)

        do {
            let dto = try await remoteDataSource.updateProfile(UserProfileDTO(profile))
            let confirmed = dto.toDomain()
            await cache.set(confirmed)
            try? await localDataSource.saveProfile(confirmed)
            return confirmed
        } catch {
            // 실패 시 캐시 무효화 (재조회 강제)
            await cache.invalidate(userID: profile.id)
            throw error
        }
    }

    func searchUsers(query: String) async throws -> [UserProfile] {
        let dtos = try await remoteDataSource.searchUsers(query: query)
        return dtos.map { \$0.toDomain() }
    }

    func getCachedProfile(userID: String) -> UserProfile? {
        // 동기 접근 — 캐시만 (Actor 외부에서)
        // 실제 구현에서는 nonisolated 또는 별도 동기 캐시 사용
        nil
    }
}`,
    },
  },

  arch_modularization: {
    caption: 'SPM 모듈화 vs Android 멀티모듈 vs Nx monorepo',
    android: {
      language: 'kotlin',
      code: `// Android 멀티모듈 — Gradle
// settings.gradle.kts

rootProject.name = "MyApp"
include(
    ":app",
    ":feature:home",
    ":feature:profile",
    ":feature:auth",
    ":core:design-system",
    ":core:network",
    ":core:database",
    ":core:domain"
)

// feature/home/build.gradle.kts
plugins {
    alias(libs.plugins.android.library)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.hilt)
    alias(libs.plugins.ksp)
}

android {
    namespace = "com.example.feature.home"
    // ...
}

dependencies {
    implementation(project(":core:domain"))
    implementation(project(":core:design-system"))
    implementation(project(":core:network"))

    // Hilt
    implementation(libs.hilt.android)
    ksp(libs.hilt.compiler)
}

// core/domain/build.gradle.kts (순수 Kotlin 모듈)
plugins {
    alias(libs.plugins.kotlin.jvm) // Android 없이 순수 Kotlin
}

dependencies {
    // 최소한의 의존성
    implementation(libs.kotlinx.coroutines.core)
    testImplementation(libs.junit5)
}

// feature/home/src/main/.../HomeNavigation.kt
// 피처 모듈은 외부에 자신의 네비게이션을 노출
object HomeNavigation {
    const val route = "home"

    fun NavGraphBuilder.homeGraph(navController: NavController) {
        navigation(
            startDestination = "home_main",
            route = route
        ) {
            composable("home_main") {
                HomeScreen(navController = navController)
            }
            composable("home_detail/{itemId}") { backStackEntry ->
                HomeDetailScreen(
                    itemId = backStackEntry.arguments?.getString("itemId") ?: ""
                )
            }
        }
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// 웹 Nx monorepo
// nx.json + project.json

// nx.json (의존성 규칙 강제)
{
  "targetDefaults": {
    "build": { "dependsOn": ["^build"] }
  },
  "plugins": [
    {
      "plugin": "@nx/eslint/plugin",
      "options": {
        "targetName": "lint"
      }
    }
  ]
}

// libs/feature-home/project.json
{
  "name": "feature-home",
  "tags": ["scope:feature", "type:ui"],
  "targets": {
    "build": {
      "executor": "@nx/vite:build"
    },
    "test": {
      "executor": "@nx/vitest:vitest"
    }
  }
}

// .eslintrc.json — 모듈 경계 강제
{
  "rules": {
    "@nx/enforce-module-boundaries": [
      "error",
      {
        "depConstraints": [
          {
            "sourceTag": "scope:feature",
            "onlyDependOnLibsWithTags": ["scope:ui", "scope:data", "scope:domain"]
          },
          {
            "sourceTag": "scope:domain",
            "onlyDependOnLibsWithTags": ["scope:domain"]
          }
        ]
      }
    ]
  }
}

// libs/feature-home/src/index.ts — 공개 API
export { HomePage } from './lib/HomePage';
export { homeRoutes } from './lib/routes';
export type { HomePageProps } from './lib/types';
// 내부 구현은 export 안 함

// apps/web/src/app.tsx — 피처 조합
import { homeRoutes } from '@myapp/feature-home';
import { profileRoutes } from '@myapp/feature-profile';
import { authRoutes } from '@myapp/feature-auth';

const router = createBrowserRouter([
  ...authRoutes,
  {
    path: '/',
    element: <AppLayout />,
    children: [...homeRoutes, ...profileRoutes],
  },
]);`,
    },
    ios: {
      language: 'swift',
      code: `// iOS SPM 멀티모듈 — Package.swift

// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "MyAppPackages",
    platforms: [.iOS(.v17)],
    products: [
        // 외부에 노출하는 라이브러리
        .library(name: "AppFeature",    targets: ["AppFeature"]),
        .library(name: "HomeFeature",   targets: ["HomeFeature"]),
        .library(name: "ProfileFeature",targets: ["ProfileFeature"]),
        .library(name: "AuthFeature",   targets: ["AuthFeature"]),
        .library(name: "DesignSystem",  targets: ["DesignSystem"]),
        .library(name: "NetworkKit",    targets: ["NetworkKit"]),
        .library(name: "DatabaseKit",   targets: ["DatabaseKit"]),
        .library(name: "CoreDomain",    targets: ["CoreDomain"]),
    ],
    dependencies: [
        // 외부 패키지
        .package(url: "https://github.com/pointfreeco/swift-composable-architecture", from: "1.0.0"),
        .package(url: "https://github.com/pointfreeco/swift-dependencies", from: "1.0.0"),
    ],
    targets: [
        // ─── 최하위: CoreDomain (프레임워크 미의존) ───
        .target(
            name: "CoreDomain",
            dependencies: [],  // 아무것도 의존하지 않음
            path: "Sources/CoreDomain"
        ),

        // ─── 인프라 모듈 ───
        .target(
            name: "NetworkKit",
            dependencies: ["CoreDomain"],
            path: "Sources/NetworkKit"
        ),
        .target(
            name: "DatabaseKit",
            dependencies: ["CoreDomain"],
            path: "Sources/DatabaseKit"
        ),

        // ─── UI 공통 ───
        .target(
            name: "DesignSystem",
            dependencies: [],
            path: "Sources/DesignSystem",
            resources: [.process("Resources")] // 에셋, 폰트
        ),

        // ─── 피처 모듈 ───
        .target(
            name: "AuthFeature",
            dependencies: [
                "CoreDomain",
                "NetworkKit",
                "DesignSystem",
                .product(name: "ComposableArchitecture", package: "swift-composable-architecture"),
            ],
            path: "Sources/AuthFeature"
        ),
        .target(
            name: "HomeFeature",
            dependencies: [
                "CoreDomain",
                "NetworkKit",
                "DatabaseKit",
                "DesignSystem",
                .product(name: "ComposableArchitecture", package: "swift-composable-architecture"),
            ],
            path: "Sources/HomeFeature"
        ),
        .target(
            name: "ProfileFeature",
            dependencies: [
                "CoreDomain",
                "NetworkKit",
                "DatabaseKit",
                "DesignSystem",
                .product(name: "ComposableArchitecture", package: "swift-composable-architecture"),
            ],
            path: "Sources/ProfileFeature"
        ),

        // ─── 앱 루트 피처 (피처 조합) ───
        .target(
            name: "AppFeature",
            dependencies: [
                "AuthFeature",
                "HomeFeature",
                "ProfileFeature",
                .product(name: "ComposableArchitecture", package: "swift-composable-architecture"),
            ],
            path: "Sources/AppFeature"
        ),

        // ─── 테스트 타겟 ───
        .testTarget(
            name: "HomeFeatureTests",
            dependencies: [
                "HomeFeature",
                .product(name: "ComposableArchitecture", package: "swift-composable-architecture"),
            ],
            path: "Tests/HomeFeatureTests"
        ),
    ]
)

// ─── 피처 모듈의 공개 API 관리 ───
// Sources/HomeFeature/HomeFeature.swift
// public: 다른 모듈에서 접근 가능
public struct HomeFeature: Reducer {
    // ...
}

// Sources/HomeFeature/HomeView.swift
public struct HomeView: View {
    public let store: StoreOf<HomeFeature>
    public init(store: StoreOf<HomeFeature>) {
        self.store = store
    }
    public var body: some View { /* ... */ }
}

// Sources/HomeFeature/Internal/HomeAPI.swift
// internal (기본): 모듈 외부 접근 불가
struct HomeAPIClient { /* ... */ }`,
    },
  },

  arch_dependency_injection: {
    caption: 'swift-dependencies / Swinject vs Hilt/Koin vs tsyringe/InversifyJS',
    android: {
      language: 'kotlin',
      code: `// Android — Hilt (컴파일 타임) + Koin (런타임) 비교

// ─── Hilt (Google 권장, 컴파일 타임 DI) ───
@HiltAndroidApp
class MyApplication : Application()

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Provides
    @Singleton
    fun provideDatabase(@ApplicationContext context: Context): AppDatabase =
        Room.databaseBuilder(context, AppDatabase::class.java, "app.db")
            .fallbackToDestructiveMigration()
            .build()

    @Provides
    @Singleton
    fun provideOkHttpClient(): OkHttpClient = OkHttpClient.Builder()
        .addInterceptor(AuthInterceptor())
        .connectTimeout(30, TimeUnit.SECONDS)
        .build()
}

// 스코프별 DI
@ActivityScoped    // Activity 생명주기
@FragmentScoped    // Fragment 생명주기
@ViewModelScoped   // ViewModel 생명주기
@Singleton         // 앱 전체

// ─── Koin (런타임 DI, 설정 간단) ───
val appModule = module {
    single { // 싱글톤
        AppDatabase.getInstance(androidContext())
    }
    single<UserRepository> {
        UserRepositoryImpl(get(), get()) // 자동 주입
    }
    viewModel { (userId: String) -> // 파라미터 있는 ViewModel
        ProfileViewModel(userId, get(), get())
    }
    factory { // 매번 새 인스턴스
        CreateOrderUseCase(get())
    }
}

// Application에서 시작
class MyApp : Application() {
    override fun onCreate() {
        super.onCreate()
        startKoin {
            androidLogger(Level.DEBUG)
            androidContext(this@MyApp)
            modules(appModule)
        }
    }
}

// ViewModel에서 사용
class ProfileViewModel(
    private val userId: String,
    private val userRepo: UserRepository,  // Koin이 주입
    private val analytics: AnalyticsService
) : ViewModel() {
    // ...
}`,
    },
    web: {
      language: 'typescript',
      code: `// 웹 — tsyringe (Microsoft) vs InversifyJS

// ─── tsyringe ───
import 'reflect-metadata';
import { injectable, inject, container, singleton } from 'tsyringe';

// 인터페이스 토큰
const TOKENS = {
  UserRepository: 'UserRepository',
  AnalyticsService: 'AnalyticsService',
  Config: 'Config',
} as const;

// 구현체
@singleton()
@injectable()
class UserRepositoryImpl implements UserRepository {
  constructor(
    @inject(TOKENS.Config) private config: AppConfig
  ) {}

  async getUser(id: string): Promise<User> {
    const res = await fetch(\`\${this.config.apiBaseUrl}/users/\${id}\`);
    return res.json();
  }
}

// 등록
container.register(TOKENS.UserRepository, { useClass: UserRepositoryImpl });
container.register(TOKENS.Config, {
  useValue: { apiBaseUrl: process.env.API_BASE_URL }
});

// 사용
@injectable()
class ProfileService {
  constructor(
    @inject(TOKENS.UserRepository) private userRepo: UserRepository,
    @inject(TOKENS.AnalyticsService) private analytics: AnalyticsService
  ) {}
}

const service = container.resolve(ProfileService);

// 테스트에서 Mock 등록
const testContainer = container.createChildContainer();
testContainer.register(TOKENS.UserRepository, { useClass: MockUserRepository });

// ─── React + 간단한 DI (Context 기반) ───
// tsyringe 없이 Context만으로도 충분한 경우
function createServiceContainer(config: AppConfig) {
  const httpClient = new HttpClient(config.apiBaseUrl);
  const userRepository = new UserRepositoryImpl(httpClient);
  const analyticsService = new AnalyticsServiceImpl();

  return { userRepository, analyticsService };
}

const ServiceContext = createContext<ReturnType<typeof createServiceContainer> | null>(null);

// Provider
function ServiceProvider({ children }: { children: React.ReactNode }) {
  const services = useMemo(() => createServiceContainer(appConfig), []);
  return <ServiceContext.Provider value={services}>{children}</ServiceContext.Provider>;
}

// 사용
function useUserRepository() {
  const ctx = useContext(ServiceContext);
  if (!ctx) throw new Error('ServiceProvider 누락');
  return ctx.userRepository;
}`,
    },
    ios: {
      language: 'swift',
      code: `// iOS DI 전략 비교
// 1. swift-dependencies (TCA 공식)
// 2. Factory (경량)
// 3. Swinject (엔터프라이즈)
// 4. 순수 생성자 주입

import Dependencies

// ─── 1. swift-dependencies ───
// 의존성 정의
struct UserClientDependency {
    var fetchUser: @Sendable (String) async throws -> UserProfile
    var searchUsers: @Sendable (String) async throws -> [UserProfile]
}

extension UserClientDependency: DependencyKey {
    static let liveValue = UserClientDependency(
        fetchUser: { id in
            try await NetworkLayer.shared.get("/users/\\(id)")
        },
        searchUsers: { query in
            try await NetworkLayer.shared.get("/users/search?q=\\(query)")
        }
    )
    static let testValue = UserClientDependency(
        fetchUser: { _ in .mock },
        searchUsers: { _ in [] }
    )
}

extension DependencyValues {
    var userClient: UserClientDependency {
        get { self[UserClientDependency.self] }
        set { self[UserClientDependency.self] = newValue }
    }
}

// ─── 2. Factory (경량 DI 라이브러리) ───
import Factory

// Container 확장으로 등록
extension Container {
    // .singleton: 앱 전체 하나
    var networkClient: Factory<NetworkClientProtocol> {
        self { NetworkClient(baseURL: AppConfig.baseURL) }
            .singleton
    }

    // .cached: 처음 접근 시 생성 후 유지
    var userRepository: Factory<UserRepository> {
        self { UserRepositoryImpl(networkClient: self.networkClient()) }
            .cached
    }

    // factory (기본): 매번 새 인스턴스
    var createOrderUseCase: Factory<CreateOrderUseCase> {
        self { CreateOrderUseCase(repository: self.userRepository()) }
    }
}

// @Injected로 자동 주입
class ProfileViewModel: ObservableObject {
    @Injected(\\.userRepository) private var repository
    @Injected(\\.analyticsService) private var analytics

    // 또는 생성자에서 수동
    // init(repository: UserRepository = Container.shared.userRepository())
}

// 테스트에서 교체
Container.shared.userRepository.register {
    MockUserRepository()
}

// ─── 3. 순수 생성자 주입 (의존성 없는 최선) ───
// 가장 명시적이고 테스트하기 쉬움

struct ProfileFeatureFactory {
    static func make(userID: String) -> ProfileView {
        let networkClient = NetworkClient(baseURL: AppConfig.baseURL)
        let userDataSource = UserRemoteDataSource(client: networkClient)
        let localDataSource = UserLocalDataSource(db: DatabaseManager.shared)
        let repository = UserRepositoryImpl(
            remote: userDataSource,
            local: localDataSource
        )
        let getProfileUseCase = GetUserProfileUseCase(repository: repository)
        let store = Store(
            initialState: ProfileFeature.State(),
            reducer: ProfileFeature()
        ) {
            \$0.getUserProfileUseCase = getProfileUseCase
        }
        return ProfileView(store: store)
    }
}`,
    },
  },

  arch_testing_tca: {
    caption: 'TCA TestStore vs MVI ViewModel 테스트 vs Redux mock store',
    android: {
      language: 'kotlin',
      code: `// Android MVI — Turbine + Coroutine Test

@OptIn(ExperimentalCoroutinesApi::class)
class ProfileViewModelTest {

    @get:Rule
    val mainDispatcherRule = MainDispatcherRule()

    private lateinit var viewModel: ProfileViewModel
    private val mockRepository = mockk<UserRepository>()

    @BeforeEach
    fun setUp() {
        viewModel = ProfileViewModel(
            userId = "user-123",
            userRepository = mockRepository,
            analyticsService = mockk(relaxed = true)
        )
    }

    @Test
    fun \`loadProfile 성공 시 Success 상태로 전환\`() = runTest {
        // Given
        val expectedUser = UserProfile(id = "user-123", displayName = "테스트")
        coEvery { mockRepository.getProfile("user-123") } returns expectedUser

        // When & Then — Turbine으로 Flow 단계별 검증
        viewModel.uiState.test {
            assertEquals(ProfileUiState.Loading, awaitItem())
            viewModel.loadProfile()
            assertEquals(ProfileUiState.Success(expectedUser.toUiModel()), awaitItem())
            cancelAndIgnoreRemainingEvents()
        }
    }

    @Test
    fun \`loadProfile 실패 시 Error 상태로 전환\`() = runTest {
        // Given
        coEvery { mockRepository.getProfile(any()) } throws IOException("네트워크 오류")

        viewModel.uiState.test {
            skipItems(1) // Loading 스킵
            viewModel.loadProfile()
            val errorState = awaitItem() as ProfileUiState.Error
            assertTrue(errorState.message.contains("네트워크"))
            cancelAndIgnoreRemainingEvents()
        }
    }

    @Test
    fun \`검색 디바운스 — 300ms 내 여러 입력은 마지막 것만 처리\`() = runTest {
        coEvery { mockRepository.searchUsers("swift") } returns listOf(
            UserProfile(id = "1", displayName = "SwiftDev")
        )

        viewModel.onSearchTextChanged("s")
        viewModel.onSearchTextChanged("sw")
        viewModel.onSearchTextChanged("swi")
        viewModel.onSearchTextChanged("swif")
        viewModel.onSearchTextChanged("swift")

        advanceTimeBy(400) // 300ms 디바운스 통과

        // "swift"로 검색 1번만 호출되었는지 확인
        coVerify(exactly = 1) { mockRepository.searchUsers("swift") }
        coVerify(exactly = 0) { mockRepository.searchUsers("s") }
    }
}`,
    },
    web: {
      language: 'typescript',
      code: `// 웹 Redux — @reduxjs/toolkit + jest

import { configureStore } from '@reduxjs/toolkit';
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';

// 테스트용 스토어 팩토리
function createTestStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefault) =>
      getDefault({ thunk: { extraArgument: { api: mockApiClient } } }),
  });
}

// ─── Reducer 단위 테스트 (순수 함수) ───
describe('profileSlice', () => {
  test('increment action', () => {
    const initial = { count: 0 };
    const result = counterReducer(initial, increment());
    expect(result.count).toBe(1);
  });

  test('loadProfile.fulfilled', () => {
    const mockUser = { id: '1', displayName: '테스트' };
    const action = loadProfile.fulfilled(mockUser, '', '1');
    const result = profileReducer(initialState, action);
    expect(result.user).toEqual(mockUser);
    expect(result.isLoading).toBe(false);
  });
});

// ─── Thunk 통합 테스트 ───
describe('loadProfile thunk', () => {
  test('성공 시 user 상태 업데이트', async () => {
    const mockUser = { id: 'user-123', displayName: '홍길동' };
    mockApiClient.get.mockResolvedValueOnce({ data: mockUser });

    const store = createTestStore();
    await store.dispatch(loadProfile('user-123'));

    const state = store.getState().profile;
    expect(state.user).toEqual(mockUser);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  test('실패 시 error 상태 업데이트', async () => {
    mockApiClient.get.mockRejectedValueOnce(new Error('서버 오류'));

    const store = createTestStore();
    await store.dispatch(loadProfile('user-123'));

    const state = store.getState().profile;
    expect(state.user).toBeNull();
    expect(state.error).toBe('서버 오류');
  });
});

// ─── 컴포넌트 통합 테스트 ───
test('ProfilePage 렌더링 및 인터랙션', async () => {
  const store = createTestStore({
    profile: { user: mockUser, isLoading: false }
  });

  const { getByText, getByRole } = render(
    <Provider store={store}><ProfilePage userId="1" /></Provider>
  );

  expect(getByText('홍길동')).toBeInTheDocument();

  await act(async () => {
    fireEvent.click(getByRole('button', { name: '편집' }));
  });

  expect(store.getState().profile.isEditing).toBe(true);
});`,
    },
    ios: {
      language: 'swift',
      code: `// iOS TCA — TestStore로 결정론적 테스트

import ComposableArchitecture
import Testing

// ─── 기본 TestStore 사용법 ───
@MainActor
struct ProfileFeatureTests {

    @Test
    func loadProfile_success() async {
        let mockUser = UserProfile(id: "user-123", displayName: "테스트 유저")

        // TestStore 생성: 초기 상태 + Reducer + Mock 의존성
        let store = TestStore(initialState: ProfileFeature.State()) {
            ProfileFeature()
        } withDependencies: {
            // 특정 의존성만 Mock으로 교체
            \$0.userClient.fetchUser = { _ in mockUser }
        }

        // Action 발송 + 상태 변화 명시적 선언
        // 선언하지 않은 변화가 있으면 테스트 실패 (exhaustive)
        await store.send(.loadProfile("user-123")) {
            \$0.isLoading = true  // isLoading만 변해야 함
        }

        // Effect 결과(Action) 수신 + 상태 변화 선언
        await store.receive(\\.profileResponse.success) {
            \$0.isLoading = false
            \$0.user = mockUser
        }
        // 모든 Effect가 완료되었는지 자동 검증
    }

    @Test
    func loadProfile_failure() async {
        let store = TestStore(initialState: ProfileFeature.State()) {
            ProfileFeature()
        } withDependencies: {
            \$0.userClient.fetchUser = { _ in
                throw URLError(.badServerResponse)
            }
        }

        await store.send(.loadProfile("user-123")) {
            \$0.isLoading = true
        }

        await store.receive(\\.profileResponse.failure) {
            \$0.isLoading = false
            \$0.errorMessage = "The operation couldn't be completed."
        }
    }

    // ─── 복잡한 Effect 취소 테스트 ───
    @Test
    func searchDebounce_cancelsPreviousRequest() async {
        let clock = TestClock()

        let store = TestStore(initialState: SearchFeature.State()) {
            SearchFeature()
        } withDependencies: {
            \$0.continuousClock = clock
            \$0.searchClient.search = { query in
                [UserProfile(id: "1", displayName: query)]
            }
        }

        // 빠른 연속 입력
        await store.send(.queryChanged("s")) {
            \$0.query = "s"
        }
        await store.send(.queryChanged("sw")) {
            \$0.query = "sw"
        }
        await store.send(.queryChanged("swift")) {
            \$0.query = "swift"
        }

        // 300ms 경과 전: Effect 없음
        await clock.advance(by: .milliseconds(200))
        // TestStore: 예상치 못한 Action 없음 — 자동 검증

        // 300ms 경과 후: "swift"로만 검색
        await clock.advance(by: .milliseconds(100))
        await store.receive(\\.searchResponse.success) {
            \$0.results = [UserProfile(id: "1", displayName: "swift")]
        }
        // "s", "sw"로는 검색 미발생 — TestStore가 검증
    }

    // ─── Non-exhaustive 테스트 (일부 상태만 검증) ───
    @Test
    func loadProfile_onlyCheckUser() async {
        let mockUser = UserProfile(id: "1", displayName: "테스트")

        // exhaustivity: .off — 선언 안 한 상태 변화도 허용
        let store = TestStore(initialState: ProfileFeature.State()) {
            ProfileFeature()
        } withDependencies: {
            \$0.userClient.fetchUser = { _ in mockUser }
        }
        store.exhaustivity = .off(showSkippedAssertions: true)

        await store.send(.loadProfile("1"))
        // isLoading 변화는 검증하지 않고 user만 검증
        await store.receive(\\.profileResponse.success) {
            \$0.user = mockUser
            // \$0.isLoading 검증 생략 — exhaustivity: .off 이므로 허용
        }
    }

    // ─── Scope 자식 기능 테스트 ───
    @Test
    func childFeatureInParent() async {
        let store = TestStore(
            initialState: AppFeature.State(
                profile: ProfileFeature.State()
            )
        ) {
            AppFeature()
        }

        // 자식 Action은 부모 Action으로 래핑
        await store.send(.profile(.loadProfile("user-1"))) {
            \$0.profile.isLoading = true
        }
    }
}`,
    },
  },

};
