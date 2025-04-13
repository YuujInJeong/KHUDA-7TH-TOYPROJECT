import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { api } from '../api/axios';

interface UserStats {
  totalQuestions: number;
  correctAnswers: number;
  studyLevel: number;
}

const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
`;

const LogoutButton = styled.button`
  padding: 8px 16px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c0392b;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatTitle = styled.h3`
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
`;

const StatValue = styled.p`
  font-size: 24px;
  color: #333;
  font-weight: bold;
`;

const StartButton = styled.button`
  display: block;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
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

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<UserStats>({
    totalQuestions: 0,
    correctAnswers: 0,
    studyLevel: 1,
  });

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await api.get('/users/me/study-level');
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch user stats:', error);
      }
    };

    fetchUserStats();
  }, []);

  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <DashboardContainer>
      <Header>
        <Title>NARAT 대시보드</Title>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatTitle>총 문제 수</StatTitle>
          <StatValue>{stats.totalQuestions}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>정답률</StatTitle>
          <StatValue>
            {stats.totalQuestions > 0
              ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100)
              : 0}%
          </StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>학습 레벨</StatTitle>
          <StatValue>Level {stats.studyLevel}</StatValue>
        </StatCard>
      </StatsGrid>

      <StartButton onClick={handleStartQuiz}>
        오늘의 퀴즈 시작하기
      </StartButton>
    </DashboardContainer>
  );
};

export default Dashboard; 