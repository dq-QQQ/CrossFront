import { useState, useCallback } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { usePersona } from '../../context/PersonaContext';
import type { CompareCodeBlockProps } from '../../types';

interface Tab {
  key: 'android' | 'web' | 'ios';
  label: string;
  badge: string;
}

const ALL_TABS: Tab[] = [
  { key: 'android', label: 'Android', badge: 'Kotlin' },
  { key: 'web',     label: 'Web',     badge: 'TypeScript' },
  { key: 'ios',     label: 'iOS',     badge: 'Swift' },
];

export default function CompareCodeBlock({ ios, android, web, caption }: CompareCodeBlockProps) {
  const { persona } = usePersona();

  const availableTabs = ALL_TABS.filter((t) => {
    if (t.key === 'ios') return true;
    if (t.key === 'android') return !!android;
    if (t.key === 'web') return !!web;
    return false;
  });

  const defaultTab = (() => {
    if (persona === 'android' && android) return 'android';
    if (persona === 'web' && web) return 'web';
    return 'ios';
  })();

  const [activeTab, setActiveTab] = useState<'android' | 'web' | 'ios'>(
    defaultTab as 'android' | 'web' | 'ios'
  );
  const [copied, setCopied] = useState(false);

  const activeCode = activeTab === 'android' ? android : activeTab === 'web' ? web : ios;

  const handleCopy = useCallback(() => {
    if (!activeCode) return;
    navigator.clipboard.writeText(activeCode.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [activeCode]);

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
      {/* 탭 헤더 */}
      <div className="flex items-center justify-between bg-gray-900 px-4 pt-3 pb-0">
        <div className="flex gap-1">
          {availableTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-t transition-colors ${
                activeTab === tab.key
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.label}
              <span className={`ml-1.5 text-[10px] px-1 rounded ${
                activeTab === tab.key ? 'bg-indigo-500 text-white' : 'bg-gray-700 text-gray-400'
              }`}>
                {tab.key === 'android'
                  ? android?.language ?? tab.badge
                  : tab.key === 'web'
                  ? web?.language ?? tab.badge
                  : ios.language ?? tab.badge}
              </span>
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="text-xs text-gray-400 hover:text-white transition-colors pb-2 select-none"
        >
          {copied ? '✓ 복사됨' : '복사'}
        </button>
      </div>

      {/* 캡션 */}
      {caption && (
        <div className="bg-gray-800 px-4 py-1.5 text-xs text-gray-400 border-b border-gray-700">
          {caption}
        </div>
      )}

      {/* 코드 영역 */}
      <div className="bg-gray-900">
        {activeCode && (
          <SyntaxHighlighter
            language={activeCode.language}
            style={oneDark}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              fontSize: '0.85rem',
              background: 'transparent',
              padding: '1.25rem 1.5rem',
            }}
            showLineNumbers={activeCode.code.split('\n').length > 5}
          >
            {activeCode.code.trim()}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
}
