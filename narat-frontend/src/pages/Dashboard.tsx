// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { logService, studyService } from '../api/services';
import { logout } from '../api/auth';
import Loading from './Loading';
import { CategoryStat, DifficultyLevelStat, RecentWrongAnswer, StudyStats, TimeStats } from '../types/auth';
import { getSessionToken, setSessionToken } from '../api/axios';
import { sessionService } from '../api/services';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const DashboardContainer = styled.div`
  width: 393px;
  height: 852px;
  position: relative;
  background: #FFF8E2;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  animation: ${fadeIn} 1s ease-in-out forwards;
`;

const Logo = styled.img`
  width: 53px;
  height: 43px;
  position: absolute;
  left: 170px;
  top: 19px;
`;

const Card = styled.div`
  width: 334px;
  height: 126px;
  position: absolute;
  left: 29px;
  top: 173px;
  background: rgba(255, 255, 255, 0.73);
  border-radius: 8px;
  border: 1px rgba(164.16, 164.16, 164.16, 0.35) solid;
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Card2 = styled.div`
  width: 334px;
  height: 131px;
  position: absolute;
  left: 29px;
  top: 312px;
  background: rgba(255, 255, 255, 0.73);
  border-radius: 8px;
  border: 1px rgba(164.16, 164.16, 164.16, 0.35) solid;
  display: flex;
  flex-direction: column;
  padding: 15px;
  overflow: hidden;
`;

const Card3 = styled.div`
  width: 162px;
  height: 181px;
  position: absolute;
  left: 29px;
  top: 459px;
  background: rgba(255, 255, 255, 0.73);
  border-radius: 8px;
  border: 1px rgba(164.16, 164.16, 164.16, 0.35) solid;
  padding: 10px;
`;

const Card4 = styled.div`
  width: 162px;
  height: 181px;
  position: absolute;
  left: 201px;
  top: 459px;
  background: rgba(255, 255, 255, 0.73);
  border-radius: 8px;
  border: 1px rgba(164.16, 164.16, 164.16, 0.35) solid;
  padding: 10px;
`;

const ProgressBarBackground = styled.div`
  width: 129px;
  height: 20px;
  position: relative;
  background: #F3F3F3;
  border-radius: 20px;
  margin-top: 8px;
`;

const ProgressBarFill = styled.div<{ width: string }>`
  width: ${props => props.width};
  height: 20px;
  position: absolute;
  left: 0;
  top: 0;
  background: #FFCBCB;
  border-radius: 20px;
`;

const Divider = styled.div`
  width: 308px;
  height: 0px;
  position: absolute;
  left: 43px;
  top: 345px;
  opacity: 0.80;
  outline: 0.30px black solid;
  outline-offset: -0.15px;
`;

const Divider2 = styled.div`
  width: 129px;
  height: 0px;
  margin-top: 8px;
  margin-bottom: 8px;
  opacity: 0.80;
  outline: 0.30px black solid;
  outline-offset: -0.15px;
`;

const QuizButton = styled.div`
  width: 274px;
  height: 54px;
  position: absolute;
  left: 59px;
  top: 708px;
  background: #B4D000;
  border-radius: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ButtonText = styled.span`
  color: white;
  font-size: 16px;
  font-family: Gmarket Sans TTF;
  font-weight: 700;
  word-wrap: break-word;
`;

const Text = styled.span`
  color: black;
  font-size: 12px;
  font-family: Gmarket Sans TTF;
  font-weight: 500;
  word-wrap: break-word;
`;

const CardTitle = styled.span`
  color: black;
  font-size: 12px;
  font-family: Gmarket Sans TTF;
  font-weight: 500;
  word-wrap: break-word;
  margin-bottom: 10px;
  display: block;
`;

const WrongSentenceItem = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
  line-height: 1.3;
`;

const CorrectWord = styled.span`
  color: #27ae60;
  font-weight: bold;
`;

const WrongWord = styled.span`
  color: #e74c3c;
  text-decoration: line-through;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  position: absolute;
  left: 264px;
  top: 196px;
  background: #FFEFEF;
  border-radius: 9999px;
  border: 4px #FFCBCB solid;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AvatarText = styled.span`
  color: #D76D6D;
  font-size: 38px;
  font-family: Gmarket Sans TTF;
  font-weight: 500;
  word-wrap: break-word;
`;

const UserGreeting = styled.div`
  position: absolute;
  left: 43px;
  top: 80px;
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  color: #143E00;
  font-size: 16px;
  font-family: Hakgyoansim Allimjang TTF;
  font-weight: 400;
  word-wrap: break-word;
`;

const UserMessage = styled.span`
  color: #143E00;
  font-size: 14px;
  font-family: Hakgyoansim Allimjang TTF;
  font-weight: 400;
  word-wrap: break-word;
`;

const StatRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const StatLabel = styled.span`
  color: black;
  font-size: 12px;
  font-family: Gmarket Sans TTF;
  font-weight: 500;
  word-wrap: break-word;
  width: 120px;
`;

const StatValue = styled.span`
  color: black;
  font-size: 25px;
  font-family: Gmarket Sans TTF;
  font-weight: 500;
  word-wrap: break-word;
`;

const StatUnit = styled.span`
  color: black;
  font-size: 12px;
  font-family: Gmarket Sans TTF;
  font-weight: 500;
  word-wrap: break-word;
  margin-left: 2px;
`;

const LogoutText = styled.span`
  color: black;
  font-size: 12px;
  font-family: Gmarket Sans TTF;
  font-weight: 500;
  word-wrap: break-word;
  position: absolute;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
`;

const CategoryLabel = styled.span`
  color: black;
  font-size: 10px;
  font-family: Gmarket Sans TTF;
  font-weight: 500;
  word-wrap: break-word;
  margin-bottom: 4px;
  display: block;
`;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout: authLogout } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [studyStats, setStudyStats] = useState<StudyStats | null>(null);
  const [recentWrongs, setRecentWrongs] = useState<RecentWrongAnswer[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    // 세션 초기화
    const initSession = async () => {
      try {
        // 기존 세션 확인
        let currentSessionId = getSessionToken();
        
        if (!currentSessionId) {
          // 새 세션 생성
          const sessionData = await sessionService.createSession();
          currentSessionId = sessionData.session_id;
          setSessionToken(currentSessionId);
        }
        
        setSessionId(currentSessionId);
        return currentSessionId;
      } catch (error) {
        console.error('Failed to initialize session:', error);
        return null;
      }
    };

    // 데이터 로드
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const sid = await initSession();
        
        if (sid) {
          // 학습 통계 가져오기
          const stats = await studyService.getStudyStats({ session_token: sid });
          setStudyStats(stats);
          
          // 최근 틀린 문제 가져오기
          const wrongAnswers = await studyService.getRecentWrong({ 
            session_token: sid, 
            limit: 3 
          });
          setRecentWrongs(wrongAnswers.recent_wrong_answers || []);
        }
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleQuizClick = () => {
    navigate('/quiz');
  };

  const handleLogout = async () => {
    try {
      await logout();
      authLogout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  // 카테고리 ID에 따른 이름 매핑
  const getCategoryName = (categoryId: string): string => {
    const categories: Record<string, string> = {
      '0': '문법적으로 틀린 단어/구절',
      '1': '용례가 다른 단어/구절',
      '2': '띄어쓰기 문제',
    };
    
    return categories[categoryId] || '기타';
  };

  // 난이도 레벨에 따른 설명 매핑
  const getDifficultyDescription = (level: number): string => {
    const difficulties: Record<number, string> = {
      1: '상식이다',
      2: '아이 뭐 헷갈릴 수도 있지~',
      3: '아 이게 맞던가..?',
      4: '헷갈린다. 네이버 검색 ㄱㄱ',
      5: '충격!!! 말도 안돼.'
    };
    
    return difficulties[level] || `난이도 ${level}`;
  };

  if (loading) {
    return <Loading />;
  }

  // 정답률 계산
  const getCorrectRate = (): number => {
    if (!studyStats) return 0;
    
    let totalCorrect = 0;
    let totalQuestions = 0;
    
    studyStats.difficulty_stats.forEach(stat => {
      totalCorrect += stat.correct;
      totalQuestions += stat.total;
    });
    
    return totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  };

  // 평균 풀이 시간 계산 (초 단위)
  const getAverageTime = (): number => {
    if (!studyStats?.time_stats) return 0;
    return Math.round(studyStats.time_stats.average_time);
  };

  return (
    <DashboardContainer>
      <Logo src="/onboarding.png" alt="로고" />
      
      <UserGreeting>
        <UserName>{user?.display_name || '사용자'}</UserName>
        <UserMessage>님의 <br/>학습을 응원합니다 :)</UserMessage>
      </UserGreeting>
      
      <Card>
        <CardTitle>누적 학습 현황</CardTitle>
        <CardContent>
          <StatRow>
            <StatLabel>오늘의 정답률</StatLabel>
            <StatValue>{getCorrectRate()}</StatValue>
            <StatUnit>%</StatUnit>
          </StatRow>
          <StatRow>
            <StatLabel>평균 풀이 시간</StatLabel>
            <StatValue>{getAverageTime()}</StatValue>
            <StatUnit>초</StatUnit>
          </StatRow>
        </CardContent>
      </Card>
      <Card2>
        <CardTitle>최근에 틀린 문장</CardTitle>
        {recentWrongs.length > 0 ? (
          recentWrongs.map((wrong, index) => (
            <WrongSentenceItem key={index}>
              {wrong.wrong_sentence.replace(wrong.wrong_word, 
                `${wrong.wrong_word} → ${wrong.right_word}`
              )}
            </WrongSentenceItem>
          ))
        ) : (
          <Text>최근에 틀린 문장이 없습니다.</Text>
        )}
      </Card2>
      <Divider />
      
      <Card3>
        <CardTitle>카테고리별 학습현황</CardTitle>
        <Divider2 />
        {studyStats?.category_stats ? (
          studyStats.category_stats.map((stat, index) => (
            <div key={index}>
              <CategoryLabel>{getCategoryName(stat.category)}</CategoryLabel>
              <ProgressBarBackground>
                <ProgressBarFill width={`${stat.correct_rate}%`} />
              </ProgressBarBackground>
            </div>
          ))
        ) : (
          <Text>학습 데이터가 없습니다.</Text>
        )}
      </Card3>
      
      <Card4>
        <CardTitle>난이도별 학습현황</CardTitle>
        <Divider2 />
        {studyStats?.difficulty_stats ? (
          studyStats.difficulty_stats.map((stat, index) => (
            <div key={index}>
              <CategoryLabel>{getDifficultyDescription(stat.level)}</CategoryLabel>
              <ProgressBarBackground>
                <ProgressBarFill width={`${stat.correct_rate}%`} />
              </ProgressBarBackground>
            </div>
          ))
        ) : (
          <Text>학습 데이터가 없습니다.</Text>
        )}
      </Card4>
      
      <QuizButton onClick={handleQuizClick}>
        <ButtonText>한국어 능력 확인 하러가기</ButtonText>
      </QuizButton>
      
      <LogoutText onClick={handleLogout}>로그아웃</LogoutText>
      
      <Avatar>
        <AvatarText>{user?.study_level || 'B'}</AvatarText>
      </Avatar>
    </DashboardContainer>
  );
};

export default Dashboard;