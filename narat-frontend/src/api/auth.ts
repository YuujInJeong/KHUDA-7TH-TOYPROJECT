import api from '@/utils/api';

// 인터페이스 정의
interface GoogleLoginParams {
  access_token: string;
}

interface VerifySessionParams {
  session_token: string;
}

interface LogoutParams {
  session_token: string;
}

interface UpdateProfileParams {
  session_token: string;
  display_name?: string;
  gender?: boolean;
  age?: number;
}

// API 응답 타입 정의
export interface AuthResponse {
  session_token: string;
  display_name: string;
  study_level: number;
}

export interface VerifyResponse {
  is_valid: boolean;
  display_name: string;
  study_level: number;
}

export interface LogoutResponse {
  success: boolean;
}

export interface UpdateProfileResponse {
  success: boolean;
}

// Google 로그인
export const loginWithGoogle = async (params: GoogleLoginParams): Promise<AuthResponse> => {
  try {
    // api 인스턴스는 이미 response.data를 반환하도록 설정되어 있습니다
    return await api.post('/api/auth/google', params);
  } catch (error) {
    console.error('Google 로그인 오류:', error);
    throw error;
  }
};

// 세션 검증
export const verifySession = async (sessionToken: string): Promise<VerifyResponse> => {
  try {
    const params: VerifySessionParams = { session_token: sessionToken };
    return await api.post('/api/auth/verify', params);
  } catch (error) {
    console.error('세션 검증 오류:', error);
    throw error;
  }
};

// 로그아웃
export const logout = async (params: LogoutParams): Promise<LogoutResponse> => {
  try {
    return await api.post('/api/auth/logout', params);
  } catch (error) {
    console.error('로그아웃 오류:', error);
    throw error;
  }
};

// 테스트용 세션 생성 (개발 환경에서만 사용)
export const createTestSession = async (params: GoogleLoginParams): Promise<VerifyResponse> => {
  try {
    return await api.post('/api/auth/test_session_create', params);
  } catch (error) {
    console.error('테스트 세션 생성 오류:', error);
    throw error;
  }
};

// 사용자 프로필 업데이트
export const updateProfile = async (params: UpdateProfileParams): Promise<UpdateProfileResponse> => {
  try {
    return await api.post('/api/auth/detail', params);
  } catch (error) {
    console.error('프로필 업데이트 오류:', error);
    throw error;
  }
};

export default {
  loginWithGoogle,
  verifySession,
  logout,
  createTestSession,
  updateProfile,
};