export type ExamWeight = 'ALTO' | 'MEDIO' | 'BAJO';

export interface Category {
  id: number;
  number: number;
  name: string;
  shortName: string;
  dofDate: string;
  keyArticles: string;
  examWeight: ExamWeight;
  portionsCount: number;
  description: string;
  badge: string;
  color: string;
  keyConcepts: { concept: string; keyData: string; article: string }[];
}

export interface VideoScene {
  minute: string;
  visual: string;
  narration: string;
}

export interface ScenarioQuestion {
  id: string;
  question: string;
  answer: string;
  legalBasis: string;
}

export interface PracticalScenario {
  id: string;
  title: string;
  context: string;
  situation: string;
  questions: ScenarioQuestion[];
  solutionSummary: string;
}

export interface Flashcard {
  id: string;
  portionId: string;
  categoryId: number;
  question: string;
  answer: string;
  article: string;
}

export interface QuizQuestion {
  id: string;
  portionId: string;
  categoryId: number;
  question: string;
  options: [string, string, string, string];
  correctOptionIndex: number;
  legalBasis: string;
  explanation: string;
}

export interface AudioScript {
  durationEstimate: string;
  intro: string;
  development: string[];
  closure: string;
}

export interface ArticleReviewGroup {
  article: string;
  articleSummary: string;
  questions: QuizQuestion[];
}

export interface Portion {
  id: string;
  categoryId: number;
  portionNumber: string;
  title: string;
  articles: string;
  durationMinutes: number;
  audioScript: AudioScript;
  videoStoryboard: VideoScene[];
  videoUrl?: string;
  scenario: PracticalScenario;
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
  articleReviewGroups?: ArticleReviewGroup[];
}

export interface FrequentError {
  id: string;
  topic: string;
  categoryNumber: number;
  timesFailed: number;
  lastDate: string;
  action: string;
  legalArticle: string;
}

export interface ExamAttempt {
  id: string;
  simulacroId: string;
  simulacroTitle: string;
  date: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  timeSpentSeconds: number;
  categoryBreakdown: Record<number, { correct: number; total: number }>;
}

export interface UserProgress {
  streakDays: number;
  lastStudiedDate: string;
  completedPortionIds: string[];
  masteredFlashcardIds: string[];
  quizScores: Record<string, number>;
  failedQuestionIds: string[];
  examAttempts: ExamAttempt[];
}

export interface Simulacro {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  categories: number[];
  categoriesText: string;
  durationMinutes: number;
  totalQuestions: number;
  minPassingScore: number;
  questions: QuizQuestion[];
}
