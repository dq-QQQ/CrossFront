import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PersonaProvider } from './context/PersonaContext';
import { ProgressProvider } from './context/ProgressContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import RoadmapPage from './pages/RoadmapPage';
import ChapterPage from './pages/ChapterPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <PersonaProvider>
      <ProgressProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path=":platform" element={<RoadmapPage />} />
              <Route path=":platform/chapter/:id" element={<ChapterPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProgressProvider>
    </PersonaProvider>
  );
}
