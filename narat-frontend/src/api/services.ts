import { api } from './axios';

// 사용자 관련 API
export const userService = {
  // 사용자 정보 조회
  getMe: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },
  
  // 사용자 학습 레벨 조회
  getStudyLevel: async () => {
    const response = await api.get('/users/me/study-level');
    return response.data;
  },
  
  // 사용자 학습 레벨 업데이트
  updateStudyLevel: async (level: number) => {
    const response = await api.put('/users/me/study-level', { level });
    return response.data;
  }
};

// 문제 관련 API
export const questionService = {
  // 문제 목록 조회
  getQuestions: async (params?: { category_id?: string; difficulty_level?: number; limit?: number; offset?: number }) => {
    const response = await api.get('/questions', { params });
    return response.data;
  },
  
  // 특정 문제 조회
  getQuestion: async (questionId: string) => {
    const response = await api.get(`/questions/${questionId}`);
    return response.data;
  },
  
  // 랜덤 문제 조회
  getRandomQuestion: async (params?: { category_id?: string; difficulty_level?: number }) => {
    const response = await api.get('/questions/random', { params });
    return response.data;
  }
};

// 카테고리 관련 API
export const categoryService = {
  // 카테고리 목록 조회
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
  
  // 특정 카테고리 조회
  getCategory: async (categoryId: string) => {
    const response = await api.get(`/categories/${categoryId}`);
    return response.data;
  },
  
  // 카테고리별 문제 조회
  getCategoryQuestions: async (categoryId: string, params?: { difficulty_level?: number; limit?: number; offset?: number }) => {
    const response = await api.get(`/categories/${categoryId}/questions`, { params });
    return response.data;
  }
};

// 학습 기록 관련 API
export const logService = {
  // 학습 기록 생성
  createLog: async (data: { question_id: string; correct: boolean; delaytime: number }) => {
    const response = await api.post('/logs', data);
    return response.data;
  },
  
  // 학습 기록 조회
  getLogs: async (params?: { limit?: number; offset?: number }) => {
    const response = await api.get('/logs', { params });
    return response.data;
  },
  
  // 학습 통계 조회
  getStats: async (params?: { category_id?: string; difficulty_level?: number }) => {
    const response = await api.get('/logs/stats', { params });
    return response.data;
  }
};

// 추천 관련 API
export const recommendationService = {
  // 추천 생성
  createRecommendation: async (recType: number) => {
    const response = await api.post('/recommendations', { rec_type: recType });
    return response.data;
  },
  
  // 추천 목록 조회
  getRecommendations: async (params?: { limit?: number; offset?: number }) => {
    const response = await api.get('/recommendations', { params });
    return response.data;
  },
  
  // 특정 추천 조회
  getRecommendation: async (recId: string) => {
    const response = await api.get(`/recommendations/${recId}`);
    return response.data;
  },
  
  // 추천 문제 목록 조회
  getRecommendationQuestions: async (recId: string) => {
    const response = await api.get(`/recommendations/${recId}/questions`);
    return response.data;
  }
};

// 세션 관련 API
export const sessionService = {
  // 세션 생성
  createSession: async () => {
    const response = await api.post('/sessions');
    return response.data;
  },
  
  // 세션 목록 조회
  getSessions: async (params?: { limit?: number; offset?: number }) => {
    const response = await api.get('/sessions', { params });
    return response.data;
  },
  
  // 특정 세션 조회
  getSession: async (sessionId: string) => {
    const response = await api.get(`/sessions/${sessionId}`);
    return response.data;
  }
}; 