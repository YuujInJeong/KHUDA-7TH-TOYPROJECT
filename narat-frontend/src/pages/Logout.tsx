import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { api } from '../api/axios';

const LogoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Message = styled.p`
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await api.post('/auth/logout');
        localStorage.removeItem('token');
        navigate('/login');
      } catch (error) {
        console.error('로그아웃 실패:', error);
        // 에러가 발생하더라도 토큰을 제거하고 로그인 페이지로 이동
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <LogoutContainer>
      <Message>로그아웃 중...</Message>
      <LoadingSpinner />
    </LogoutContainer>
  );
};

export default Logout; 