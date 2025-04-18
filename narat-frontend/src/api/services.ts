// src/api/services.ts
import { api } from './axios';
import { 
  User, 
  Question, 
  Category, 
  UserLog, 
  Recommendation, 
  StudyStats, 
  RecentWrongAnswer, 
  StudyHistory,
  Session 
} from '../types/auth';

// 인증 관련 API
export const authService = {
  // Google OAuth 로그인
  googleLogin: async () => {
    const response = await api.get('/auth/google/login');
    return response.data;
  },
  
  // Google OAuth 콜백 처리
  googleCallback: async (code: string) => {
    const response = await api.get(`/auth/google/callback?code=${code}`);
    return response.data;
  },
  
  // 로그아웃
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  }
};

// 사용자 관련 API
export const userService = {
  // 사용자 정보 조회
  getMe: async (): Promise<User> => {
    const response = await api.get('/users/me');
    return response.data;
  },
  
  // 사용자 정보 업데이트
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await api.put('/users/me', userData);
    return response.data;
  },
  
  // 사용자 학습 레벨 조회
  getStudyLevel: async (): Promise<{ level: 'S' | 'A' | 'B' }> => {
    const response = await api.get('/users/me/study-level');
    return response.data;
  },
  
  // 사용자 학습 레벨 업데이트
  updateStudyLevel: async (level: 'S' | 'A' | 'B'): Promise<{ level: 'S' | 'A' | 'B' }> => {
    const response = await api.put('/users/me/study-level', { level });
    return response.data;
  }
};

// 문제 관련 API
export const questionService = {
  // 문제 목록 조회
  getQuestions: async (params?: { 
    category_id?: string; 
    difficulty_level?: number; 
    limit?: number; 
    offset?: number 
  }): Promise<Question[]> => {
    const response = await api.get('/questions', { params });
    return response.data;
  },
  
  // 특정 문제 조회
  getQuestion: async (questionId: string): Promise<Question> => {
    const response = await api.get(`/questions/${questionId}`);
    return response.data;
  },
  
  // 랜덤 문제 조회
  getRandomQuestion: async (params?: { 
    category_id?: string; 
    difficulty_level?: number 
  }): Promise<Question> => {
    const response = await api.get('/questions/random', { params });
    return response.data;
  }
};

// 카테고리 관련 API
export const categoryService = {
  // 카테고리 목록 조회
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data;
  },
  
  // 특정 카테고리 조회
  getCategory: async (categoryId: string): Promise<Category> => {
    const response = await api.get(`/categories/${categoryId}`);
    return response.data;
  },
  
  // 카테고리별 문제 조회
  getCategoryQuestions: async (
    categoryId: string, 
    params?: { 
      difficulty_level?: number; 
      limit?: number; 
      offset?: number 
    }
  ): Promise<Question[]> => {
    const response = await api.get(`/categories/${categoryId}/questions`, { params });
    return response.data;
  }
};

// 학습 기록 관련 API
export const logService = {
  // 학습 기록 생성
  createLog: async (data: { 
    question_id: string; 
    correct: boolean; 
    delaytime: number 
  }): Promise<UserLog> => {
    const response = await api.post('/logs', data);
    return response.data;
  },
  
  // 학습 기록 조회
  getLogs: async (params?: { 
    limit?: number; 
    offset?: number 
  }): Promise<UserLog[]> => {
    const response = await api.get('/logs', { params });
    return response.data;
  },
  
  // 학습 통계 조회
  getStats: async (params?: { 
    category_id?: string; 
    difficulty_level?: number 
  }): Promise<StudyStats> => {
    const response = await api.get('/logs/stats', { params });
    return response.data;
  }
};

// 추천 관련 API
export const recommendationService = {
  // 추천 생성
  createRecommendation: async (recType: number): Promise<Recommendation> => {
    const response = await api.post('/recommendations', { rec_type: recType });
    return response.data;
  },
  
  // 추천 목록 조회
  getRecommendations: async (params?: { 
    limit?: number; 
    offset?: number 
  }): Promise<Recommendation[]> => {
    const response = await api.get('/recommendations', { params });
    return response.data;
  },
  
  // 특정 추천 조회
  getRecommendation: async (recId: string): Promise<Recommendation> => {
    const response = await api.get(`/recommendations/${recId}`);
    return response.data;
  },
  
  // 추천 문제 목록 조회
  getRecommendationQuestions: async (recId: string): Promise<Question[]> => {
    const response = await api.get(`/recommendations/${recId}/questions`);
    return response.data;
  }
};

// 세션 관련 API
export const sessionService = {
  // 세션 생성
  createSession: async (): Promise<{ session_id: string }> => {
    const response = await api.post('/sessions');
    return response.data;
  },
  
  // 세션 목록 조회
  getSessions: async (params?: { 
    limit?: number; 
    offset?: number 
  }): Promise<Session[]> => {
    const response = await api.get('/sessions', { params });
    return response.data;
  },
  
  // 특정 세션 조회
  getSession: async (sessionId: string): Promise<Session> => {
    const response = await api.get(`/sessions/${sessionId}`);
    return response.data;
  }
};

// 학습 API
export const studyService = {
  // 학습 결과 제출
  submitAnswer: async (data: { 
    session_token: string; 
    question_id: string; 
    correct: boolean 
  }): Promise<{ success: boolean; explanation: string }> => {
    const response = await api.post('/api/study/submit', data);
    return response.data;
  },
  
  // 최근에 틀린 문제 목록 조회
  getRecentWrong: async (data: { 
    session_token: string; 
    limit?: number 
  }): Promise<{ recent_wrong_answers: RecentWrongAnswer[] }> => {
    const response = await api.post('/api/study/recent-wrong', data);
    return response.data;
  },
  
  // 학습 통계 조회
  getStudyStats: async (data: { 
    session_token: string 
  }): Promise<StudyStats> => {
    const response = await api.post('/api/study/stats', data);
    return response.data;
  },
  
  // 최근 학습 내역 조회
  getRecentHistory: async (data: { 
    session_token: string; 
    limit?: number 
  }): Promise<{ 
    recent_history: StudyHistory[]; 
    time_stats: { 
      average_time: number; 
      total_time: number; 
      total_questions: number 
    } 
  }> => {
    const response = await api.post('/api/study/recent-history', data);
    return response.data;
  }
};