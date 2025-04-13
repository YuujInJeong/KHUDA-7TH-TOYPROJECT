import React from 'react';
import styled from 'styled-components';
import Modal from '../common/Modal';

interface QuizResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  stats: {
    totalQuestions: number;
    correctAnswers: number;
    accuracy: number;
    timeSpent: number;
  };
}

const Title = styled.h2`
  color: #3498db;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
`;

const StatTitle = styled.h3`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const StatValue = styled.p`
  font-size: 24px;
  color: #333;
  font-weight: bold;
`;

const Message = styled.p`
  font-size: 18px;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  ${({ variant }) =>
    variant === 'primary'
      ? `
    background-color: #3498db;
    color: white;
    &:hover {
      background-color: #2980b9;
    }
  `
      : `
    background-color: #95a5a6;
    color: white;
    &:hover {
      background-color: #7f8c8d;
    }
  `}
`;

const QuizResultModal: React.FC<QuizResultModalProps> = ({
  isOpen,
  onClose,
  onRestart,
  stats,
}) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}분 ${remainingSeconds}초`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Title>오늘의 퀴즈 결과</Title>
      <StatsGrid>
        <StatCard>
          <StatTitle>총 문제</StatTitle>
          <StatValue>{stats.totalQuestions}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>정답</StatTitle>
          <StatValue>{stats.correctAnswers}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>정답률</StatTitle>
          <StatValue>{stats.accuracy}%</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>소요 시간</StatTitle>
          <StatValue>{formatTime(stats.timeSpent)}</StatValue>
        </StatCard>
      </StatsGrid>
      <Message>
        {stats.accuracy >= 80
          ? '훌륭합니다! 계속 이렇게 열심히 해주세요! 🎉'
          : stats.accuracy >= 60
          ? '잘하셨어요! 조금만 더 노력하면 더 좋은 결과를 얻을 수 있어요! 💪'
          : '아쉽네요. 다음에는 더 좋은 결과를 기대할게요! 📚'}
      </Message>
      <ButtonContainer>
        <Button variant="secondary" onClick={onClose}>
          대시보드로
        </Button>
        <Button variant="primary" onClick={onRestart}>
          다시 시작
        </Button>
      </ButtonContainer>
    </Modal>
  );
};

export default QuizResultModal; 