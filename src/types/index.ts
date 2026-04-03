export type Platform = 'ios' | 'android' | 'web';
export type Persona = 'android' | 'web';
export type ChapterStatus = 'available' | 'coming-soon' | 'draft';
export type LinkType = 'docs' | 'video' | 'blog';

export interface ExternalLink {
  title: string;
  url: string;
  type: LinkType;
  persona?: Persona; // undefined = 모든 페르소나에 표시
}

export interface Chapter {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  platform: Platform;
  topics: string[];
  estimatedMinutes: number;
  status: ChapterStatus;
  externalLinks?: ExternalLink[];
}

export interface ChapterProgress {
  completed: boolean;
  completedAt?: string; // ISO 8601
}

export interface ProgressStorage {
  version: number;
  persona: Persona | null;
  chapters: Record<string, ChapterProgress>; // key: '{platform}_{id}'
}

export interface CodeEntry {
  code: string;
  language: string;
}

export interface CompareCodeBlockProps {
  ios: CodeEntry;
  android?: CodeEntry;
  web?: CodeEntry;
  caption?: string;
}
