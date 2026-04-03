import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Platform, ProgressStorage } from '../types';
import { loadProgress, saveProgress, chapterKey } from '../utils/storage';

interface ProgressContextValue {
  isCompleted: (platform: Platform, id: number) => boolean;
  markComplete: (platform: Platform, id: number) => void;
  markIncomplete: (platform: Platform, id: number) => void;
  getCompletionRate: (platform: Platform, total: number) => number;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressStorage>(loadProgress);

  const update = (next: ProgressStorage) => {
    setProgress(next);
    saveProgress(next);
  };

  const isCompleted = (platform: Platform, id: number) =>
    progress.chapters[chapterKey(platform, id)]?.completed ?? false;

  const markComplete = (platform: Platform, id: number) => {
    const key = chapterKey(platform, id);
    update({
      ...progress,
      chapters: {
        ...progress.chapters,
        [key]: { completed: true, completedAt: new Date().toISOString() },
      },
    });
  };

  const markIncomplete = (platform: Platform, id: number) => {
    const key = chapterKey(platform, id);
    update({
      ...progress,
      chapters: {
        ...progress.chapters,
        [key]: { completed: false },
      },
    });
  };

  const getCompletionRate = (platform: Platform, total: number) => {
    if (total === 0) return 0;
    const completed = Array.from({ length: total }, (_, i) => i).filter((i) =>
      isCompleted(platform, i)
    ).length;
    return Math.round((completed / total) * 100);
  };

  return (
    <ProgressContext.Provider value={{ isCompleted, markComplete, markIncomplete, getCompletionRate }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
