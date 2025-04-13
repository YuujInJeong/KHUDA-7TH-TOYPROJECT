import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';

const OnboardingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #333;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 40px;
  max-width: 600px;
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/login');
  };

  return (
    <OnboardingContainer>
      <Title>NARAT에 오신 것을 환영합니다</Title>
      <Description>
        NARAT은 개인화된 학습 경험을 제공하는 교육 플랫폼입니다.
        맞춤형 문제를 통해 한국어 학습을 더욱 효과적으로 만들어보세요.
      </Description>
      <ButtonContainer>
        <Button onClick={handleStart} size="lg">
          시작하기
        </Button>
      </ButtonContainer>
    </OnboardingContainer>
  );
};

export default Onboarding; 