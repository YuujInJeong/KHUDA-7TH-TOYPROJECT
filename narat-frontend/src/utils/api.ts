import axios from 'axios';

// API 기본 URL 설정
// ImportMeta 타입 오류 해결을 위한 환경변수 접근 방식 변경
const BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 응답 데이터만 반환하도록 인터셉터 설정
api.interceptors.response.use(
  (response) => {
    // 응답 데이터만 반환
    return response.data;
  },
  (error) => {
    // 에러 로깅 및 전파
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;