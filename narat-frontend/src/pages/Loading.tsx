import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  margin-top: 20px;
  font-size: 18px;
  color: #333;
`;

const Loading: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 토큰이 있는지 확인
    const token = localStorage.getItem('token');
    
    // 2초 후에 적절한 페이지로 리다이렉트
    const timer = setTimeout(() => {
      if (token) {
        navigate('/dashboard');
      } else {
        navigate('/onboarding');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <LoadingContainer>
      <LoadingSpinner />
      <LoadingText>로딩중...</LoadingText>
    </LoadingContainer>
  );
};

export default Loading; 