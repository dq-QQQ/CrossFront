import { Link } from 'react-router-dom';
import type { Chapter } from '../../types';

interface ChapterCardProps {
  chapter: Chapter;
  isCompleted: boolean;
}

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  available:    { label: '학습 가능',  className: 'bg-green-50 text-green-700' },
  'coming-soon': { label: '준비 중',   className: 'bg-gray-100 text-gray-400' },
  draft:        { label: '초안',      className: 'bg-yellow-50 text-yellow-600' },
};

export default function ChapterCard({ chapter, isCompleted }: ChapterCardProps) {
  const isAvailable = chapter.status === 'available';
  const badge = STATUS_BADGE[chapter.status];

  const inner = (
    <div
      className={`relative p-5 rounded-xl border transition-all group ${
        isAvailable
          ? 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-md cursor-pointer'
          : 'bg-gray-50 border-gray-200 opacity-60 cursor-default'
      } ${isCompleted ? 'border-l-4 border-l-green-400' : ''}`}
    >
      {/* 완료 뱃지 */}
      {isCompleted && (
        <span className="absolute top-3 right-3 text-green-500 text-lg">✓</span>
      )}

      <div className="flex items-start justify-between mb-2 pr-6">
        <span className="text-xs font-medium text-indigo-500">Chapter {chapter.id}</span>
        <span className="text-xs text-gray-400">{chapter.estimatedMinutes}분</span>
      </div>

      <h3 className={`font-semibold mb-1 ${isAvailable ? 'text-gray-900 group-hover:text-indigo-600 transition-colors' : 'text-gray-500'}`}>
        {chapter.title}
      </h3>
      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{chapter.subtitle}</p>

      {/* 토픽 태그 */}
      <div className="flex flex-wrap gap-1 mb-3">
        {chapter.topics.slice(0, 3).map((t) => (
          <span key={t} className="text-[11px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
            {t}
          </span>
        ))}
        {chapter.topics.length > 3 && (
          <span className="text-[11px] text-gray-400">+{chapter.topics.length - 3}</span>
        )}
      </div>

      {/* 상태 */}
      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${badge.className}`}>
        {badge.label}
      </span>
    </div>
  );

  if (!isAvailable) return inner;

  return (
    <Link to={`/ios/chapter/${chapter.id}`} className="block">
      {inner}
    </Link>
  );
}
