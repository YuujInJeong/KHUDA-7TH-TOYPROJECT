import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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

const Space = styled.span`
  color: #8D8D8D;
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

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userName, setUserName] = useState('USER');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 2초 후에 자동으로 대시보드로 이동
    const timer = setTimeout(() => {
      setIsFading(true);
      
      // 페이드 아웃 애니메이션을 위한 지연
      setTimeout(() => {
        // TODO: 실제 Google OAuth 로그인 구현
        // 임시로 로그인 처리
        login({
          id: '1',
          username: 'Test User',
          email: 'test@example.com',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        navigate('/dashboard');
      }, 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, login]);

  return (
    <LoginContainer isFading={isFading}>
      <LogoImage src="/khud_logo.png" alt="KHUD 로고" />
      <LoginImage src="/onboarding.png" alt="로그인 이미지" />
      <WelcomeText>
        <UserName>{userName}님</UserName>
        <Welcome>환영합니다</Welcome>
      </WelcomeText>
    </LoginContainer>
  );
};

export default Login; 