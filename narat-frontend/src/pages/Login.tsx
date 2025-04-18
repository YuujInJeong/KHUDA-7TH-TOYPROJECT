// src/pages/Login.tsx
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../api/services';
import { setAuthToken } from '../api/axios';

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const LoginContainer = styled.div<{ isFading: boolean }>`
  width: 393px;
  height: 852px;
  position: relative;
  background: #FFF8E2;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  animation: ${({ isFading }) => (isFading ? fadeOut : fadeIn)} 1s ease-in-out forwards;
`;

const LogoImage = styled.img`
  width: 31px;
  height: 31px;
  position: absolute;
  left: 12px;
  top: 16px;
  object-fit: contain;
`;

const LoginImage = styled.img`
  width: 390px;
  height: 315px;
  margin-bottom: 2rem;
`;

const WelcomeText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const UserName = styled.span`
  color: #143E00;
  font-size: 15px;
  font-family: 'Hakgyoansim Allimjang TTF', sans-serif;
  font-weight: 400;
  word-wrap: break-word;
`;

const Welcome = styled.span`
  color: #8D8D8D;
  font-size: 20px;
  font-family: 'Hakgyoansim Allimjang TTF', sans-serif;
  font-weight: 400;
  word-wrap: break-word;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #143E00;
  animation: spin 1s ease-in-out infinite;
  margin-top: 20px;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, user } = useAuth();
  const [userName, setUserName] = useState<string>('');
  const [isFading, setIsFading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 페이지 로드 시 2초 후 대시보드로 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  // URL 쿼리 파라미터에서 코드 가져오기
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    const error = queryParams.get('error');
    
    if (error) {
      setError('로그인 중 오류가 발생했습니다');
      setIsLoading(false);
      return;
    }
    
    if (code) {
      // 구글 OAuth 콜백 처리
      const handleGoogleCallback = async () => {
        try {
          const response = await authService.googleCallback(code);
          if (response.token) {
            setAuthToken(response.token);
            
            // 사용자 정보 가져오기
            const userData = await authService.googleLogin();
            if (userData) {
              login(userData);
              setUserName(userData.display_name || '사용자');
            }
          }
        } catch (err) {
          console.error('Failed to handle Google callback:', err);
          setError('로그인 처리 중 오류가 발생했습니다');
          setIsLoading(false);
        }
      };
      
      handleGoogleCallback();
    } else {
      // 코드가 없는 경우 로딩 상태만 표시
      setIsLoading(true);
    }
  }, [location.search, login]);

  // 이미 로그인된 경우 사용자 이름 설정
  useEffect(() => {
    if (isAuthenticated && user) {
      setUserName(user.display_name);
    }
  }, [isAuthenticated, user]);

  return (
    <LoginContainer isFading={isFading}>
      <LogoImage src="/khud_logo.png" alt="KHUD 로고" />
      <LoginImage src="/onboarding.png" alt="로그인 이미지" />
      <WelcomeText>
        <UserName>{userName || '사용자'}님</UserName>
        <Welcome>환영합니다</Welcome>
      </WelcomeText>
      
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </LoginContainer>
  );
};

export default Login;