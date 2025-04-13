import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/common/Button';

const StatisticsContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

const StatisticsCard = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
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
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #3498db;
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
`;

const ChartContainer = styled.div`
  margin-top: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

interface LocationState {
  totalQuestions: number;
  correctAnswers: number;
}

const Statistics: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalQuestions, correctAnswers } = location.state as LocationState || { totalQuestions: 0, correctAnswers: 0 };

  const accuracy = Math.round((correctAnswers / totalQuestions) * 100) || 0;
  const averageTime = '2.5분'; // TODO: 실제 평균 시간 계산

  return (
    <StatisticsContainer>
      <StatisticsCard>
        <Title>학습 통계</Title>
        
        <StatsGrid>
          <StatCard>
            <StatValue>{totalQuestions}</StatValue>
            <StatLabel>총 퀴즈 수</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{correctAnswers}</StatValue>
            <StatLabel>정답 수</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{averageTime}</StatValue>
            <StatLabel>평균 응답 시간</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{accuracy}%</StatValue>
            <StatLabel>정확도</StatLabel>
          </StatCard>
        </StatsGrid>

        <ChartContainer>
          {/* TODO: 차트 컴포넌트 추가 */}
          <p style={{ textAlign: 'center', color: '#666' }}>
            차트가 곧 추가될 예정입니다.
          </p>
        </ChartContainer>

        <NavigationButtons>
          <Button onClick={() => navigate('/dashboard')}>돌아가기</Button>
          <Button onClick={() => navigate('/quiz')} variant="outline">다시 풀기</Button>
        </NavigationButtons>
      </StatisticsCard>
    </StatisticsContainer>
  );
};

export default Statistics; 