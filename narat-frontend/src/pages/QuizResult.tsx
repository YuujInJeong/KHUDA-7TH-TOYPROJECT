import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/common/Button';

const ResultContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResultCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 24px;
`;

const Score = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 16px;
`;

const ScoreText = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-bottom: 32px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 32px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray[600]};
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

interface LocationState {
  totalQuestions: number;
  correctAnswers: number;
}

const QuizResult: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalQuestions, correctAnswers } = location.state as LocationState;

  const score = Math.round((correctAnswers / totalQuestions) * 100);
  const accuracy = `${score}%`;
  const timeSpent = '5분'; // TODO: 실제 소요 시간 계산

  return (
    <ResultContainer>
      <ResultCard>
        <Title>퀴즈 결과</Title>
        <Score>{accuracy}</Score>
        <ScoreText>
          {totalQuestions}문제 중 {correctAnswers}문제를 맞추셨습니다!
        </ScoreText>

        <StatsGrid>
          <StatItem>
            <StatValue>{correctAnswers}</StatValue>
            <StatLabel>정답</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{totalQuestions - correctAnswers}</StatValue>
            <StatLabel>오답</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{timeSpent}</StatValue>
            <StatLabel>소요 시간</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{score}</StatValue>
            <StatLabel>정확도</StatLabel>
          </StatItem>
        </StatsGrid>

        <ActionButtons>
          <Button onClick={() => navigate('/dashboard')} fullWidth>
            대시보드로 돌아가기
          </Button>
          <Button onClick={() => navigate('/quiz')} variant="outline" fullWidth>
            다시 풀기
          </Button>
        </ActionButtons>
      </ResultCard>
    </ResultContainer>
  );
};

export default QuizResult; 