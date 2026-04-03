import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CHAPTERS_BY_PLATFORM } from '../data/chapters';
import { CODE_BLOCKS } from '../data/codeBlocks';
import type { Platform } from '../types';
import { useProgress } from '../context/ProgressContext';
import CompareCodeBlock from '../components/common/CompareCodeBlock';
import ExternalLinks from '../components/common/ExternalLinks';

// 마크다운 내 COMPARE_BLOCK:key 를 컴포넌트로 치환하기 위한 파서
function parseContent(raw: string): Array<{ type: 'md' | 'compare'; value: string }> {
  const parts: Array<{ type: 'md' | 'compare'; value: string }> = [];
  const lines = raw.split('\n');
  let mdBuffer: string[] = [];

  for (const line of lines) {
    const match = line.match(/^COMPARE_BLOCK:(\w+)$/);
    if (match) {
      if (mdBuffer.length) {
        parts.push({ type: 'md', value: mdBuffer.join('\n') });
        mdBuffer = [];
      }
      parts.push({ type: 'compare', value: match[1] });
    } else {
      mdBuffer.push(line);
    }
  }
  if (mdBuffer.length) parts.push({ type: 'md', value: mdBuffer.join('\n') });
  return parts;
}

export default function ChapterPage() {
  const { platform = 'ios', id = '0' } = useParams<{ platform: string; id: string }>();
  const chapters = CHAPTERS_BY_PLATFORM[platform];
  const chapterId = parseInt(id, 10);

  const chapter = chapters?.find((c) => c.id === chapterId);
  const { isCompleted, markComplete, markIncomplete } = useProgress();

  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // 마크다운 파일 동적 import
    import(`../content/${platform}/chapter-${chapterId}.md?raw`)
      .then((mod) => {
        setContent(mod.default);
        setLoading(false);
      })
      .catch(() => {
        setContent('');
        setLoading(false);
      });
  }, [platform, chapterId]);

  if (!chapters || !chapter) return <Navigate to={`/${platform}`} replace />;

  const prevChapter = chapters.find((c) => c.id === chapterId - 1);
  const nextChapter = chapters.find((c) => c.id === chapterId + 1);
  const completed = isCompleted(platform as Platform, chapterId);

  const segments = parseContent(content);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* 상단 내비 */}
      <div className="flex items-center justify-between mb-8 text-sm text-gray-500">
        <Link to={`/${platform}`} className="hover:text-indigo-600 transition-colors flex items-center gap-1">
          ← 로드맵으로
        </Link>
        <span>{chapterId + 1} / {chapters.length} 챕터</span>
      </div>

      {/* 챕터 헤더 */}
      <div className="mb-8">
        <span className="text-xs font-medium text-indigo-500 uppercase tracking-wide">
          Chapter {chapterId}
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mt-1 mb-2">{chapter.title}</h1>
        <p className="text-gray-500">{chapter.subtitle}</p>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-xs text-gray-400">⏱ {chapter.estimatedMinutes}분</span>
          {completed && (
            <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">✓ 완료</span>
          )}
        </div>
      </div>

      <hr className="border-gray-200 mb-8" />

      {/* 콘텐츠 */}
      {loading ? (
        <div className="text-center py-16 text-gray-400">불러오는 중...</div>
      ) : (
        <div className="prose prose-gray max-w-none">
          {segments.map((seg, i) =>
            seg.type === 'compare' ? (
              CODE_BLOCKS[seg.value] ? (
                <CompareCodeBlock key={i} {...CODE_BLOCKS[seg.value]} />
              ) : null
            ) : (
              <ReactMarkdown key={i} remarkPlugins={[remarkGfm]}>
                {seg.value}
              </ReactMarkdown>
            )
          )}
        </div>
      )}

      {/* 외부 링크 */}
      {chapter.externalLinks && chapter.externalLinks.length > 0 && (
        <ExternalLinks links={chapter.externalLinks} />
      )}

      <hr className="border-gray-200 my-10" />

      {/* 하단: 이전/다음 + 완료 버튼 */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex gap-3 w-full sm:w-auto">
          {prevChapter ? (
            <Link
              to={`/${platform}/chapter/${prevChapter.id}`}
              className="flex-1 sm:flex-none text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors text-center"
            >
              ← {prevChapter.title}
            </Link>
          ) : <div className="flex-1 sm:flex-none" />}

          {nextChapter ? (
            <Link
              to={`/${platform}/chapter/${nextChapter.id}`}
              className="flex-1 sm:flex-none text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors text-center"
            >
              {nextChapter.title} →
            </Link>
          ) : <div className="flex-1 sm:flex-none" />}
        </div>

        <button
          onClick={() =>
            completed
              ? markIncomplete(platform as Platform, chapterId)
              : markComplete(platform as Platform, chapterId)
          }
          className={`w-full sm:w-auto px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
            completed
              ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {completed ? '✓ 완료됨 (취소)' : '완료로 표시'}
        </button>
      </div>
    </div>
  );
}
