// src/App.tsx
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/globalStyles';
import AppRoutes from './routes';
import { useAuth } from './context/AuthContext';
import Loading from './pages/Loading';

const App: React.FC = () => {
  const { loading, isAuthenticated } = useAuth();
  const [appReady, setAppReady] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 앱 초기화 로직
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // 앱 초기화 관련 작업 (폰트 로드, 기타 리소스 로드 등)
        // 여기에 필요한 초기화 로직 추가...
        
        // 초기화 완료
        setAppReady(true);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setAppReady(true); // 에러가 있어도 앱은 로드
      }
    };

    initializeApp();
  }, []);

  // 인증 상태에 따른 리다이렉트 처리
  useEffect(() => {
    if (appReady && !loading) {
      const publicPaths = ['/', '/login', '/notfound', '/loading'];
      const currentPath = location.pathname;
      
      // 인증되지 않은 사용자가 보호된 경로에 접근하려고 할 때
      if (!isAuthenticated && !publicPaths.includes(currentPath)) {
        navigate('/login', { state: { from: location } });
      }
    }
  }, [appReady, loading, isAuthenticated, location, navigate]);

  // 앱 초기화 전이거나 인증 로딩 중일 때 로딩 화면 표시
  if (!appReady || loading) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Loading />
      </ThemeProvider>
    );
  }

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppRoutes />
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;