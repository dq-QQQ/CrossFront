import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p className="text-6xl mb-4">🗺️</p>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">페이지를 찾을 수 없어요</h1>
      <p className="text-gray-500 mb-6">로드맵에 없는 경로입니다.</p>
      <Link to="/" className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
