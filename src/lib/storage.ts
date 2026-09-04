import { defaultQuestions, type Question } from '../content';

const key = 'env867-progress';
export type MemoryState = 'again' | 'hard' | 'good' | 'easy';
export type MemoryItem = {
  id: string;
  kind: 'card' | 'question' | 'page';
  title: string;
  dueAt: string;
  intervalDays: number;
  ease: number;
  repetitions: number;
  lastFeedback?: MemoryState;
};
export type ChapterReview = { queue: string[]; paused: boolean; completed: boolean; completedAt?: string };
export type ReadingProgress = { chapterId: string; pageNumber: number };
export type ChapterReadingProgress = { pageNumber: number; percent: number; lastReadAt: string; completedAt?: string };
export type Progress = {
  read: string[];
  answers: Record<string, string>;
  grades: Record<string, string>;
  questions: Question[];
  memory: Record<string, MemoryItem>;
  chapterReview: Record<string, ChapterReview>;
  activity: Record<string, number>;
  reading: ReadingProgress;
  chapterProgress: Record<string, ChapterReadingProgress>;
  settings: { baseUrl: string; apiKey: string; model: string };
};

export const initialProgress: Omit<Progress, 'questions'> = {
  read: [], answers: {}, grades: {}, memory: {}, chapterReview: {}, activity: {},
  reading: { chapterId: '第一章 环科绪论部分与环工绪论部分', pageNumber: 4 },
  chapterProgress: {},
  settings: { baseUrl: 'https://wawapii.com', apiKey: '', model: 'databricks-gpt-5-6-luna' },
};

export function loadProgress(seed: Question[]): Progress {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || 'null') as Partial<Progress> | null;
    return {
      ...initialProgress,
      ...saved,
      questions: saved?.questions || seed,
      memory: saved?.memory || {},
      chapterReview: saved?.chapterReview || {},
      activity: saved?.activity || {},
      reading: {
        ...initialProgress.reading,
        ...saved?.reading,
        pageNumber: Math.max(1, Number(saved?.reading?.pageNumber) || 1),
      },
      chapterProgress: saved?.chapterProgress || {},
      settings: { ...initialProgress.settings, ...saved?.settings, model: 'databricks-gpt-5-6-luna' },
    };
  } catch { return { ...initialProgress, questions: seed }; }
}
export function saveProgress(progress: Progress) {
  localStorage.setItem(key, JSON.stringify({ ...progress, settings: { ...progress.settings, apiKey: '' } }));
}

export function scheduleMemory(item: MemoryItem | undefined, feedback: MemoryState, id: string, kind: MemoryItem['kind'], title: string): MemoryItem {
  const current = item ?? { id, kind, title, dueAt: new Date().toISOString(), intervalDays: 0, ease: 2.5, repetitions: 0 };
  const intervals: Record<MemoryState, number> = { again: 0.04, hard: Math.max(1, current.intervalDays * 1.2 || 1), good: current.repetitions < 1 ? 1 : Math.max(2, current.intervalDays * current.ease), easy: Math.max(3, current.intervalDays * (current.ease + 0.35)) };
  const intervalDays = intervals[feedback];
  const ease = Math.max(1.3, current.ease + (feedback === 'easy' ? 0.15 : feedback === 'hard' ? -0.15 : feedback === 'again' ? -0.25 : 0));
  return { ...current, title, intervalDays, ease, repetitions: feedback === 'again' ? 0 : current.repetitions + 1, dueAt: new Date(Date.now() + intervalDays * 86400000).toISOString(), lastFeedback: feedback };
}
export function dueMemory(memory: Record<string, MemoryItem>) { return Object.values(memory).filter((item) => new Date(item.dueAt).getTime() <= Date.now()); }
