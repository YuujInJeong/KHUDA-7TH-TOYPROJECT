import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
`;

const LoginButton = styled.button`
  background-color: #4285f4;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #357abd;
  }
`;

const GoogleIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const GoogleLogin: React.FC = () => {
  const { login } = useAuth();

  const handleGoogleLogin = async () => {
    // TODO: Implement actual Google OAuth login
    // For now, just mock the login
    login({
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
    });
  };

  return (
    <LoginContainer>
      <LoginButton onClick={handleGoogleLogin}>
        <GoogleIcon src="/google-icon.png" alt="Google" />
        Google로 로그인
      </LoginButton>
    </LoginContainer>
  );
};

export default GoogleLogin;
