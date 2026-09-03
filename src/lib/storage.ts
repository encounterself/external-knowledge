import { defaultQuestions, type Question } from '../content';

const key = 'env867-progress';
export type Progress = {
  read: string[];
  answers: Record<string, string>;
  grades: Record<string, string>;
  questions: Question[];
  settings: { baseUrl: string; apiKey: string; model: string };
};

export const initialProgress: Omit<Progress, 'questions'> = {
  read: [], answers: {}, grades: {},
  settings: { baseUrl: 'https://api.openai.com/v1', apiKey: '', model: 'databricks-gpt-5-6-luna' },
};

export function loadProgress(seed: Question[]): Progress {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || 'null') as Partial<Progress> | null;
    return { ...initialProgress, ...saved, questions: saved?.questions || seed, settings: { ...initialProgress.settings, ...saved?.settings } };
  } catch {
    return { ...initialProgress, questions: seed };
  }
}

export function saveProgress(progress: Progress) { localStorage.setItem(key, JSON.stringify(progress)); }
