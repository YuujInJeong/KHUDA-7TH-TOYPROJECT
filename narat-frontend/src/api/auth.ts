// src/api/auth.ts
import { User } from '../types/auth';
import { api } from './axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.khuda-ml.store';

export const googleLogin = async (): Promise<void> => {
  window.location.href = `${API_BASE_URL}/auth/google/login`;
};

export const logout = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
    // 로그아웃 시 로컬 스토리지 초기화
    localStorage.removeItem('token');
    localStorage.removeItem('session_token');
  } catch (error) {
    console.error('Logout failed:', error);
    // 에러가 발생해도 로컬 스토리지는 정리
    localStorage.removeItem('token');
    localStorage.removeItem('session_token');
  }
};

export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await api.get('/users/me');
    return response.data;
  } catch (error) {
    console.error('Failed to get current user:', error);
    throw error;
  }
};

export const updateUserProfile = async (user: Partial<User>): Promise<User> => {
  try {
    const response = await api.put('/users/me', user);
    return response.data;
  } catch (error) {
    console.error('Failed to update user profile:', error);
    throw error;
  }
};

export const getUserStudyLevel = async (): Promise<{ level: 'S' | 'A' | 'B' }> => {
  try {
    const response = await api.get('/users/me/study-level');
    return response.data;
  } catch (error) {
    console.error('Failed to get user study level:', error);
    throw error;
  }
};

export const updateUserStudyLevel = async (level: 'S' | 'A' | 'B'): Promise<{ level: 'S' | 'A' | 'B' }> => {
  try {
    const response = await api.put('/users/me/study-level', { level });
    return response.data;
  } catch (error) {
    console.error('Failed to update user study level:', error);
    throw error;
  }
};