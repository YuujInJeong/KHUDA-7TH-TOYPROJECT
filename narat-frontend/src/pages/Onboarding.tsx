import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const OnboardingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 40px;
  text-align: center;
  line-height: 1.6;
  max-width: 600px;
`;

const StartButton = styled.button`
  padding: 15px 30px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <OnboardingContainer>
      <Title>NARAT에 오신 것을 환영합니다!</Title>
      <Description>
        NARAT은 개인화된 학습 경험을 제공하는 교육 플랫폼입니다.
        맞춤형 문제 추천 시스템을 통해 효과적인 학습을 경험해보세요.
      </Description>
      <StartButton onClick={() => navigate('/login')}>
        시작하기
      </StartButton>
    </OnboardingContainer>
  );
};

export default Onboarding; 