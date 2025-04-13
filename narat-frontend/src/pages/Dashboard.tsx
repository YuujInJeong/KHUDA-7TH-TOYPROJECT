import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const LogoutButton = styled(Button)`
  background-color: #e74c3c;
  color: white;

  &:hover {
    background-color: #c0392b;
  }
`;

const MainContent = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h2`
  font-size: 20px;
  color: #333;
  margin-bottom: 15px;
`;

const CardContent = styled.p`
  color: #666;
  margin-bottom: 20px;
`;

const StartButton = styled(Button)`
  width: 100%;
`;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  return (
    <DashboardContainer>
      <Header>
        <UserInfo>
          <UserName>안녕하세요, {user?.username}님!</UserName>
        </UserInfo>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </Header>
      <MainContent>
        <Card>
          <CardTitle>오늘의 퀴즈</CardTitle>
          <CardContent>
            매일 새로운 문제로 한국어 실력을 향상시켜보세요.
          </CardContent>
          <StartButton onClick={handleStartQuiz}>퀴즈 시작하기</StartButton>
        </Card>
        <Card>
          <CardTitle>학습 통계</CardTitle>
          <CardContent>
            지금까지의 학습 기록과 통계를 확인해보세요.
          </CardContent>
          <StartButton onClick={() => navigate('/stats')}>통계 보기</StartButton>
        </Card>
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard; 