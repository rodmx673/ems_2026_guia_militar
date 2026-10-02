import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress, ExamAttempt } from '../types/ems';

const STORAGE_KEY = 'ems_2026_progress_v1';

const INITIAL_PROGRESS: UserProgress = {
  streakDays: 4,
  lastStudiedDate: new Date().toISOString().split('T')[0],
  completedPortionIds: ['1.1'],
  masteredFlashcardIds: ['fc-1.1-1', 'fc-1.1-2', 'fc-1.1-3'],
  quizScores: {
    '1.1': 100
  },
  failedQuestionIds: [],
  examAttempts: [
    {
      id: 'attempt-demo-1',
      simulacroId: 'sim-1',
      simulacroTitle: 'Simulacro 1: Disciplina y Deberes Militares',
      date: new Date(Date.now() - 86400000 * 2).toLocaleDateString('es-MX'),
      score: 11,
      totalQuestions: 12,
      percentage: 91,
      passed: true,
      timeSpentSeconds: 1420,
      categoryBreakdown: { 1: { correct: 7, total: 8 }, 2: { correct: 4, total: 4 } }
    }
  ]
};

interface ProgressContextType {
  progress: UserProgress;
  markPortionCompleted: (portionId: string) => void;
  togglePortionCompleted: (portionId: string) => void;
  toggleFlashcardMastered: (flashcardId: string) => void;
  recordQuizScore: (portionId: string, percentage: number) => void;
  recordExamAttempt: (attempt: ExamAttempt) => void;
  resetAllProgress: () => void;
  addFailedQuestion: (questionId: string) => void;
  removeFailedQuestion: (questionId: string) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_PROGRESS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Error saving EMS progress', e);
    }
  }, [progress]);

  const markPortionCompleted = (portionId: string) => {
    setProgress(prev => {
      if (prev.completedPortionIds.includes(portionId)) return prev;
      return {
        ...prev,
        completedPortionIds: [...prev.completedPortionIds, portionId]
      };
    });
  };

  const togglePortionCompleted = (portionId: string) => {
    setProgress(prev => {
      const exists = prev.completedPortionIds.includes(portionId);
      return {
        ...prev,
        completedPortionIds: exists
          ? prev.completedPortionIds.filter(id => id !== portionId)
          : [...prev.completedPortionIds, portionId]
      };
    });
  };

  const toggleFlashcardMastered = (flashcardId: string) => {
    setProgress(prev => {
      const exists = prev.masteredFlashcardIds.includes(flashcardId);
      return {
        ...prev,
        masteredFlashcardIds: exists
          ? prev.masteredFlashcardIds.filter(id => id !== flashcardId)
          : [...prev.masteredFlashcardIds, flashcardId]
      };
    });
  };

  const recordQuizScore = (portionId: string, percentage: number) => {
    setProgress(prev => {
      const updatedScores = { ...prev.quizScores, [portionId]: percentage };
      const completedPortions = prev.completedPortionIds.includes(portionId)
        ? prev.completedPortionIds
        : [...prev.completedPortionIds, portionId];
      return {
        ...prev,
        quizScores: updatedScores,
        completedPortionIds: completedPortions
      };
    });
  };

  const recordExamAttempt = (attempt: ExamAttempt) => {
    setProgress(prev => ({
      ...prev,
      examAttempts: [attempt, ...prev.examAttempts]
    }));
  };

  const addFailedQuestion = (questionId: string) => {
    setProgress(prev => {
      if (prev.failedQuestionIds.includes(questionId)) return prev;
      return {
        ...prev,
        failedQuestionIds: [...prev.failedQuestionIds, questionId]
      };
    });
  };

  const removeFailedQuestion = (questionId: string) => {
    setProgress(prev => ({
      ...prev,
      failedQuestionIds: prev.failedQuestionIds.filter(id => id !== questionId)
    }));
  };

  const resetAllProgress = () => {
    setProgress({
      streakDays: 1,
      lastStudiedDate: new Date().toISOString().split('T')[0],
      completedPortionIds: [],
      masteredFlashcardIds: [],
      quizScores: {},
      failedQuestionIds: [],
      examAttempts: []
    });
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markPortionCompleted,
        togglePortionCompleted,
        toggleFlashcardMastered,
        recordQuizScore,
        recordExamAttempt,
        resetAllProgress,
        addFailedQuestion,
        removeFailedQuestion
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useEMSProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useEMSProgress must be used within a ProgressProvider');
  }
  return context;
};
