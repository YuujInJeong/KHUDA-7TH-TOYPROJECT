// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/auth';
import { getCurrentUser } from '../api/auth';
import { getAuthToken, getSessionToken } from '../api/axios';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 앱 초기화 시 사용자 정보 로드
  useEffect(() => {
    const initializeAuth = async () => {
      const token = getAuthToken();
      const sessionToken = getSessionToken();
      
      if (token || sessionToken) {
        try {
          const userData = await getCurrentUser();
          setUser(userData);
        } catch (err) {
          console.error('Failed to fetch user data:', err);
          setError('사용자 정보를 가져오는데 실패했습니다.');
        }
      }
      
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setError(null);
  };

  const logout = () => {
    setUser(null);
  };

  const refreshUser = async () => {
    setLoading(true);
    try {
      const userData = await getCurrentUser();
      setUser(userData);
      setError(null);
    } catch (err) {
      console.error('Failed to refresh user data:', err);
      setError('사용자 정보를 새로고침하는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};