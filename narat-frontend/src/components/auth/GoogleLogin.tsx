import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';

const LoginContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px;
`;

const Logo = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray[600]};
  text-align: center;
  margin-bottom: 2rem;
`;

const GoogleLogin: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // TODO: 실제 구글 로그인 로직 구현
    // 임시로 대시보드로 이동
    navigate('/dashboard');
  };

  return (
    <LoginContainer>
      <Logo>NARAT</Logo>
      <Title>로그인</Title>
      <Subtitle>구글 계정으로 간편하게 로그인하세요</Subtitle>
      <Button onClick={handleGoogleLogin} size="lg" fullWidth>
        구글로 로그인
      </Button>
    </LoginContainer>
  );
};

export default GoogleLogin;
