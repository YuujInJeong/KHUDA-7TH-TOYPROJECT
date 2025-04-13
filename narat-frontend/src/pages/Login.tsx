import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

const LoginCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
`;

const GoogleButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  padding: 12px 24px;
  font-size: 16px;

  &:hover {
    background-color: #f8f8f8;
  }
`;

const GoogleIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleLogin = async () => {
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
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>NARAT 로그인</Title>
        <GoogleButton onClick={handleGoogleLogin}>
          <GoogleIcon src="/google-icon.png" alt="Google" />
          Google로 로그인
        </GoogleButton>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login; 