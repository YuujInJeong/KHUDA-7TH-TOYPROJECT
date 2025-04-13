import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const LoginBox = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const GoogleIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Google OAuth URL로 리다이렉트
    window.location.href = 'https://api.khuda-ml.store/auth/google/login';
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Title>NARAT 로그인</Title>
        <GoogleButton onClick={handleGoogleLogin}>
          <GoogleIcon src="/google-icon.png" alt="Google" />
          Google로 로그인
        </GoogleButton>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login; 