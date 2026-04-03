import type { ExternalLink } from '../../types';

const TYPE_ICON: Record<string, string> = {
  docs: '📄',
  video: '🎥',
  blog: '✍️',
};

const TYPE_LABEL: Record<string, string> = {
  docs: '공식 문서',
  video: '영상',
  blog: '블로그',
};

interface ExternalLinksProps {
  links: ExternalLink[];
}

export default function ExternalLinks({ links }: ExternalLinksProps) {
  if (links.length === 0) return null;

  return (
    <div className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
      <h3 className="text-sm font-semibold text-indigo-900 mb-3">참고 자료</h3>
      <ul className="space-y-2">
        {links.map((link, i) => (
          <li key={i}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-indigo-700 hover:text-indigo-900 hover:underline transition-colors"
            >
              <span>{TYPE_ICON[link.type]}</span>
              <span>{link.title}</span>
              <span className="text-xs text-indigo-400">({TYPE_LABEL[link.type]})</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
