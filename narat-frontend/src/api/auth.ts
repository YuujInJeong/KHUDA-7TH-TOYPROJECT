import { User } from '../types/auth';

// TODO: 실제 API 구현 시 주석 해제
/*
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export const googleLogin = async (): Promise<void> => {
  window.location.href = `${API_BASE_URL}/auth/google/login`;
};

export const logout = async (): Promise<void> => {
  await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    credentials: 'include',
  });
  return response.json();
};

export const updateUserProfile = async (user: Partial<User>): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(user),
  });
  return response.json();
};
*/

// 임시 데이터
export const googleLogin = async (): Promise<void> => {
  console.log('Google login clicked');
};

export const logout = async (): Promise<void> => {
  console.log('Logout clicked');
};

export const getCurrentUser = async (): Promise<User> => {
  return {
    id: 'temp-user-id',
    username: '임시 사용자',
    email: 'temp@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

export const updateUserProfile = async (user: Partial<User>): Promise<User> => {
  return {
    id: 'temp-user-id',
    username: user.username || '임시 사용자',
    email: user.email || 'temp@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};
