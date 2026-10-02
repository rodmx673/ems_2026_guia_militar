import { Portion, Flashcard, QuizQuestion } from '../types/ems';
import { CATEGORY_1_PORTIONS } from './category1Content';
import { ADDITIONAL_PORTIONS } from './categoriesOverviewData';
import { CATEGORIES_DATA } from './categoriesData';

export const ALL_PORTIONS: Portion[] = [
  ...CATEGORY_1_PORTIONS,
  ...ADDITIONAL_PORTIONS
];

export function getPortionById(id: string): Portion | undefined {
  return ALL_PORTIONS.find(p => p.id === id);
}

export function getPortionsByCategory(categoryId: number): Portion[] {
  return ALL_PORTIONS.filter(p => p.categoryId === categoryId);
}

export function getAllFlashcards(): Flashcard[] {
  return ALL_PORTIONS.flatMap(p => p.flashcards);
}

export function getFlashcardsByCategory(categoryId: number): Flashcard[] {
  return ALL_PORTIONS.filter(p => p.categoryId === categoryId).flatMap(p => p.flashcards);
}

export function getAllQuizzes(): { portion: Portion; questions: QuizQuestion[] }[] {
  return ALL_PORTIONS.map(p => ({
    portion: p,
    questions: p.quiz
  }));
}

export function getCategoryById(id: number) {
  return CATEGORIES_DATA.find(c => c.id === id);
}
