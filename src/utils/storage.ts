import type { ProgressStorage, Persona } from '../types';

const STORAGE_KEY = 'crossfront_v1';

const DEFAULT_PROGRESS: ProgressStorage = {
  version: 1,
  persona: null,
  chapters: {},
};

export function loadProgress(): ProgressStorage {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed = JSON.parse(raw) as ProgressStorage;
    // 버전이 다르면 초기화
    if (parsed.version !== DEFAULT_PROGRESS.version) return { ...DEFAULT_PROGRESS };
    return parsed;
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export function saveProgress(data: ProgressStorage): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function chapterKey(platform: string, id: number): string {
  return `${platform}_${id}`;
}

export function loadPersona(): Persona | null {
  const stored = localStorage.getItem('crossfront_persona');
  if (stored === 'android' || stored === 'web') return stored;
  return null;
}

export function savePersona(persona: Persona): void {
  localStorage.setItem('crossfront_persona', persona);
}
