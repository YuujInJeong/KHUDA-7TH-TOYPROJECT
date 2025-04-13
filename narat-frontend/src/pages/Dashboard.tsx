import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';

const DashboardContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const Username = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Content = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h2`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
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
  margin-top: 24px;
`;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const username = "사용자"; // 실제로는 AuthContext에서 가져와야 함

  return (
    <DashboardContainer>
      <Header>
        <Title>대시보드</Title>
        <UserInfo>
          <Avatar>{username.charAt(0)}</Avatar>
          <Username>{username}</Username>
        </UserInfo>
      </Header>

      <Content>
        <Card>
          <CardTitle>학습 통계</CardTitle>
          <StatsGrid>
            <StatItem>
              <StatValue>12</StatValue>
              <StatLabel>완료한 퀴즈</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>85%</StatValue>
              <StatLabel>정확도</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>5</StatValue>
              <StatLabel>학습 일수</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>120</StatValue>
              <StatLabel>학습 시간(분)</StatLabel>
            </StatItem>
          </StatsGrid>
        </Card>

        <ActionButtons>
          <Button onClick={() => navigate('/quiz')} fullWidth>
            퀴즈 시작하기
          </Button>
          <Button onClick={() => navigate('/statistics')} variant="outline" fullWidth>
            통계 보기
          </Button>
        </ActionButtons>
      </Content>
    </DashboardContainer>
  );
};

export default Dashboard; 