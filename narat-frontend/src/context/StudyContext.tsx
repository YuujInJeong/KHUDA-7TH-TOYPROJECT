import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Question {
  id: string;
  title: string;
  content: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface StudyState {
  currentQuestion: Question | null;
  studyHistory: Question[];
  score: number;
}

interface StudyContextType {
  studyState: StudyState;
  setCurrentQuestion: (question: Question) => void;
  addToHistory: (question: Question) => void;
  updateScore: (points: number) => void;
  resetStudy: () => void;
}

const StudyContext = createContext<StudyContextType | undefined>(undefined);

export const useStudy = () => {
  const context = useContext(StudyContext);
  if (context === undefined) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
};

interface StudyProviderProps {
  children: ReactNode;
}

export const StudyProvider: React.FC<StudyProviderProps> = ({ children }) => {
  const [studyState, setStudyState] = useState<StudyState>({
    currentQuestion: null,
    studyHistory: [],
    score: 0,
  });

  const setCurrentQuestion = (question: Question) => {
    setStudyState(prev => ({ ...prev, currentQuestion: question }));
  };

  const addToHistory = (question: Question) => {
    setStudyState(prev => ({
      ...prev,
      studyHistory: [...prev.studyHistory, question],
    }));
  };

  const updateScore = (points: number) => {
    setStudyState(prev => ({ ...prev, score: prev.score + points }));
  };

  const resetStudy = () => {
    setStudyState({
      currentQuestion: null,
      studyHistory: [],
      score: 0,
    });
  };

  const value = {
    studyState,
    setCurrentQuestion,
    addToHistory,
    updateScore,
    resetStudy,
  };

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
};
