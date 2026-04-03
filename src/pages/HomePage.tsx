import { Link } from 'react-router-dom';
import PersonaSelector from '../components/common/PersonaSelector';
import { usePersona } from '../context/PersonaContext';
import { IOS_CHAPTERS } from '../data/chapters';
import { useProgress } from '../context/ProgressContext';

export default function HomePage() {
  const { persona } = usePersona();
  const { getCompletionRate } = useProgress();
  const rate = getCompletionRate('ios', IOS_CHAPTERS.length);

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* 히어로 */}
      <section className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <span className="text-indigo-500">✕</span> CrossFront
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
          다른 플랫폼 개발자를 위한<br />
          <span className="text-indigo-600">iOS 전환 가이드</span>
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto">
          Android/웹에서 이랬는데, iOS에선 이렇게 해요.<br />
          비교 코드로 배우는 가장 빠른 iOS 입문.
        </p>

        {/* 페르소나 선택 */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-4">나는 어떤 개발자인가요?</p>
          <PersonaSelector variant="hero" />
        </div>

        {persona && (
          <Link
            to="/ios"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors mt-4"
          >
            iOS 로드맵 시작하기 →
          </Link>
        )}
      </section>

      {/* 진도 요약 */}
      {rate > 0 && (
        <section className="mb-12 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">iOS 학습 진도</span>
            <span className="text-sm font-bold text-indigo-600">{rate}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${rate}%` }}
            />
          </div>
        </section>
      )}

      {/* 챕터 미리보기 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">iOS 학습 로드맵</h2>
          <Link to="/ios" className="text-sm text-indigo-600 hover:underline">전체 보기 →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {IOS_CHAPTERS.slice(0, 3).map((ch) => (
            <Link
              key={ch.id}
              to={`/ios/chapter/${ch.id}`}
              className="p-5 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-medium text-indigo-500">Chapter {ch.id}</span>
                <span className="text-xs text-gray-400">{ch.estimatedMinutes}분</span>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-1">
                {ch.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">{ch.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 특징 섹션 */}
      <section className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {[
          { icon: '⚡', title: '비교 코드', desc: 'Android/웹 코드와 Swift 코드를 나란히 비교' },
          { icon: '🗺️', title: '명확한 로드맵', desc: 'Day 1부터 App Store 배포까지 단계별 안내' },
          { icon: '🔖', title: '진도 추적', desc: '완료한 챕터를 기억해 어디서 멈췄는지 확인' },
        ].map((feat) => (
          <div key={feat.title} className="p-6 bg-white rounded-2xl border border-gray-200">
            <div className="text-3xl mb-3">{feat.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-1">{feat.title}</h3>
            <p className="text-sm text-gray-500">{feat.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
