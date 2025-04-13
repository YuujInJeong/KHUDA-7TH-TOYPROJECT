export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  title: string;
  content: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Recommendation {
  id: string;
  userId: string;
  type: number;
  status: boolean;
  createdAt: string;
  questions: Question[];
}

export interface UserLog {
  id: string;
  userId: string;
  questionId: string;
  correct: boolean;
  delayTime: number;
  createdAt: string;
}

export interface StudyStats {
  totalQuestions: number;
  correctQuestions: number;
  correctRate: number;
  avgTimeSpent: number;
  categoryStats: {
    [key: string]: {
      total: number;
      correct: number;
      correctRate: number;
    };
  };
  difficultyStats: {
    [key: number]: {
      total: number;
      correct: number;
      correctRate: number;
    };
  };
}
