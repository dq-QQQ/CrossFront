import { usePersona } from '../../context/PersonaContext';
import type { Persona } from '../../types';

interface PersonaSelectorProps {
  variant?: 'hero' | 'compact';
}

const OPTIONS: { value: Persona; emoji: string; title: string; desc: string }[] = [
  {
    value: 'android',
    emoji: '🤖',
    title: 'Android 개발자',
    desc: 'Kotlin / Java 경험 있음',
  },
  {
    value: 'web',
    emoji: '🌐',
    title: '웹 개발자',
    desc: 'React / Vue / JS 경험 있음',
  },
];

export default function PersonaSelector({ variant = 'hero' }: PersonaSelectorProps) {
  const { persona, setPersona } = usePersona();

  if (variant === 'compact') {
    return (
      <div className="flex gap-2">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setPersona(opt.value)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              persona === opt.value
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {opt.emoji} {opt.title}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setPersona(opt.value)}
          className={`group flex flex-col items-center gap-2 p-6 rounded-2xl border-2 transition-all w-full sm:w-56 ${
            persona === opt.value
              ? 'border-indigo-500 bg-indigo-50 shadow-md'
              : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-sm'
          }`}
        >
          <span className="text-4xl">{opt.emoji}</span>
          <span className="font-semibold text-gray-900">{opt.title}</span>
          <span className="text-sm text-gray-500">{opt.desc}</span>
          {persona === opt.value && (
            <span className="text-xs bg-indigo-500 text-white px-2 py-0.5 rounded-full">선택됨</span>
          )}
        </button>
      ))}
    </div>
  );
}
