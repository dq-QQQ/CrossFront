import { Link } from 'react-router-dom';
import { usePersona } from '../../context/PersonaContext';

const PERSONA_LABEL: Record<string, string> = {
  android: '🤖 Android 개발자',
  web: '🌐 웹 개발자',
};

export default function Header() {
  const { persona } = usePersona();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-gray-900 hover:text-indigo-600 transition-colors">
          <span className="text-indigo-600">✕</span>
          <span>CrossFront</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/ios" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            iOS 로드맵
          </Link>
          {persona && (
            <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-medium">
              {PERSONA_LABEL[persona]}
            </span>
          )}
        </nav>
      </div>
    </header>
  );
}
