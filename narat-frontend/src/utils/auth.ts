import api from './api';

// 인터페이스 정의
interface VerifySessionParams {
  session_token: string;
}

interface SessionResponse {
  is_valid: boolean;
  display_name: string;
  study_level: number;
}

// 세션 토큰 검증
export const verifySession = async (sessionToken: string): Promise<SessionResponse> => {
  const params: VerifySessionParams = { session_token: sessionToken };
  return await api.post('/api/auth/verify', params);
};

// 로그아웃 시 세션 제거
export const removeSession = (): void => {
  localStorage.removeItem('session_token');
};

// 세션 토큰 가져오기
export const getSessionToken = (): string | null => {
  return localStorage.getItem('session_token');
};

// 세션 토큰 저장
export const saveSessionToken = (token: string): void => {
  localStorage.setItem('session_token', token);
};