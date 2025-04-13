// src/api/axios.ts
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL || 'https://api.khuda-ml.store';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // CORS 요청 시 쿠키 포함
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // 세션 토큰이 존재하는 경우 추가
    const sessionToken = localStorage.getItem('session_token');
    if (sessionToken) {
      config.headers['Session-Token'] = sessionToken;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;
      
      switch (status) {
        case 401:
          // 인증되지 않은 사용자
          localStorage.removeItem('token');
          localStorage.removeItem('session_token');
          // 세션 만료시 로그인 페이지로 리다이렉트
          if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
            window.location.href = '/login';
          }
          break;
          
        case 403:
          // 권한 없음
          console.error('권한이 없습니다');
          break;
          
        case 404:
          // 리소스를 찾을 수 없음
          console.error('요청한 리소스를 찾을 수 없습니다');
          break;
          
        case 500:
          // 서버 에러
          console.error('서버 오류가 발생했습니다');
          break;
          
        default:
          // 기타 에러
          console.error(`에러가 발생했습니다: ${status}`);
      }
    } else if (error.request) {
      // 요청은 보냈으나 응답을 받지 못한 경우
      console.error('서버에서 응답이 없습니다. 네트워크 연결을 확인해주세요');
    } else {
      // 요청 설정 중 에러가 발생한 경우
      console.error('요청 중 에러가 발생했습니다:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// API 에러를 처리하는 유틸리티 함수
export const handleApiError = (error: any): string => {
  let errorMessage = '알 수 없는 오류가 발생했습니다';
  
  if (error.response && error.response.data) {
    // 서버에서 에러 메시지를 보낸 경우
    errorMessage = error.response.data.message || error.response.data.detail || errorMessage;
  } else if (error.message) {
    // Axios나 JavaScript 에러 메시지
    errorMessage = error.message;
  }
  
  return errorMessage;
};

// 세션 토큰 관리 함수들
export const setSessionToken = (token: string): void => {
  localStorage.setItem('session_token', token);
};

export const getSessionToken = (): string | null => {
  return localStorage.getItem('session_token');
};

export const removeSessionToken = (): void => {
  localStorage.removeItem('session_token');
};

// 인증 토큰 관리 함수들
export const setAuthToken = (token: string): void => {
  localStorage.setItem('token', token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('token');
};