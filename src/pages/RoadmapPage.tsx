import { useParams, Navigate } from 'react-router-dom';
import { CHAPTERS_BY_PLATFORM } from '../data/chapters';
import { useProgress } from '../context/ProgressContext';
import type { Platform } from '../types';
import ChapterCard from '../components/roadmap/ChapterCard';
import PersonaSelector from '../components/common/PersonaSelector';

const PLATFORM_LABEL: Record<string, string> = {
  ios: 'iOS',
  android: 'Android',
  web: 'Web',
};

export default function RoadmapPage() {
  const { platform = 'ios' } = useParams<{ platform: string }>();
  const chapters = CHAPTERS_BY_PLATFORM[platform];
  const { isCompleted, getCompletionRate } = useProgress();

  if (!chapters) return <Navigate to="/" replace />;

  const rate = getCompletionRate(platform as Platform, chapters.length);
  const completedCount = chapters.filter((ch) => isCompleted(platform as Platform, ch.id)).length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* 헤더 */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
          <div>
            <p className="text-sm text-indigo-600 font-medium mb-1">학습 로드맵</p>
            <h1 className="text-3xl font-bold text-gray-900">
              {PLATFORM_LABEL[platform]} 전환 가이드
            </h1>
            <p className="text-gray-500 mt-1">
              다른 플랫폼 개발자를 위한 비교 중심 학습 여정
            </p>
          </div>
          <PersonaSelector variant="compact" />
        </div>

        {/* 진도바 */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">전체 진도</span>
            <span className="font-semibold text-indigo-600">
              {completedCount} / {chapters.length} 챕터 ({rate}%)
            </span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-700"
              style={{ width: `${rate}%` }}
            />
          </div>
        </div>
      </div>

      {/* 챕터 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {chapters.map((ch) => (
          <ChapterCard
            key={ch.id}
            chapter={ch}
            isCompleted={isCompleted(platform as Platform, ch.id)}
          />
        ))}
      </div>
    </div>
  );
}
