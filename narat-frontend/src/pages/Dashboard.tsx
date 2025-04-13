import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';

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
`;

const ProgressBarBackground = styled.div`
  width: 129px;
  height: 20px;
  position: absolute;
  left: 43px;
  top: 518px;
  background: #F3F3F3;
  border-radius: 20px;
`;

const ProgressBarFill = styled.div<{ width: string }>`
  width: ${props => props.width};
  height: 20px;
  position: absolute;
  left: 43px;
  top: 518px;
  background: #FFCBCB;
  border-radius: 20px;
`;

const ProgressBarBackground2 = styled.div`
  width: 129px;
  height: 20px;
  position: absolute;
  left: 43px;
  top: 555px;
  background: #F3F3F3;
  border-radius: 20px;
`;

const ProgressBarFill2 = styled.div<{ width: string }>`
  width: ${props => props.width};
  height: 20px;
  position: absolute;
  left: 43px;
  top: 555px;
  background: #FFCBCB;
  border-radius: 20px;
`;

const ProgressBarBackground3 = styled.div`
  width: 129px;
  height: 20px;
  position: absolute;
  left: 43px;
  top: 592px;
  background: #F3F3F3;
  border-radius: 20px;
`;

const ProgressBarFill3 = styled.div<{ width: string }>`
  width: ${props => props.width};
  height: 20px;
  position: absolute;
  left: 43px;
  top: 592px;
  background: #FFCBCB;
  border-radius: 20px;
`;

const ProgressBarBackground4 = styled.div`
  width: 129px;
  height: 17.19px;
  position: absolute;
  left: 218px;
  top: 510px;
  background: #F3F3F3;
  border-radius: 20px;
`;

const ProgressBarFill4 = styled.div<{ width: string }>`
  width: ${props => props.width};
  height: 17.19px;
  position: absolute;
  left: 218px;
  top: 510px;
  background: #FFCBCB;
  border-radius: 20px;
`;

const ProgressBarBackground5 = styled.div`
  width: 129px;
  height: 17.19px;
  position: absolute;
  left: 218px;
  top: 533.20px;
  background: #F3F3F3;
  border-radius: 20px;
`;

const ProgressBarFill5 = styled.div<{ width: string }>`
  width: ${props => props.width};
  height: 17.19px;
  position: absolute;
  left: 218px;
  top: 533.20px;
  background: #FFCBCB;
  border-radius: 20px;
`;

const ProgressBarBackground6 = styled.div`
  width: 129px;
  height: 17.19px;
  position: absolute;
  left: 218px;
  top: 556.41px;
  background: #F3F3F3;
  border-radius: 20px;
`;

const ProgressBarFill6 = styled.div<{ width: string }>`
  width: ${props => props.width};
  height: 17.19px;
  position: absolute;
  left: 218px;
  top: 556.41px;
  background: #FFCBCB;
  border-radius: 20px;
`;

const ProgressBarBackground7 = styled.div`
  width: 129px;
  height: 17.19px;
  position: absolute;
  left: 218px;
  top: 579.61px;
  background: #F3F3F3;
  border-radius: 20px;
`;

const ProgressBarFill7 = styled.div<{ width: string }>`
  width: ${props => props.width};
  height: 17.19px;
  position: absolute;
  left: 218px;
  top: 579.61px;
  background: #FFCBCB;
  border-radius: 20px;
`;

const ProgressBarBackground8 = styled.div`
  width: 129px;
  height: 17.19px;
  position: absolute;
  left: 218px;
  top: 602.81px;
  background: #F3F3F3;
  border-radius: 20px;
`;

const ProgressBarFill8 = styled.div<{ width: string }>`
  width: ${props => props.width};
  height: 17.19px;
  position: absolute;
  left: 218px;
  top: 602.81px;
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
  position: absolute;
  left: 43px;
  top: 495px;
  opacity: 0.80;
  outline: 0.30px black solid;
  outline-offset: -0.15px;
`;

const Divider3 = styled.div`
  width: 129px;
  height: 0px;
  position: absolute;
  left: 214px;
  top: 495px;
  opacity: 0.80;
  outline: 0.30px black solid;
  outline-offset: -0.15px;
`;

const Divider4 = styled.div`
  width: 193px;
  height: 0px;
  position: absolute;
  left: 43px;
  top: 210px;
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

const GrayText = styled.span`
  color: #565656;
  font-size: 12px;
  font-family: Gmarket Sans TTF;
  font-weight: 500;
  word-wrap: break-word;
`;

const Title = styled.span`
  color: black;
  font-size: 12px;
  font-family: Gmarket Sans TTF;
  font-weight: 500;
  word-wrap: break-word;
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
`;

const TimeUnit = styled.span`
  color:rgb(0, 0, 0);
  font-size: 12px;
  font-family: Gmarket Sans TTF;
  font-weight: 500;
  word-wrap: break-word;
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
`;

const CardTitle = styled.span`
  color: black;
  font-size: 12px;
  font-family: Gmarket Sans TTF;
  font-weight: 500;
  word-wrap: break-word;
  margin-bottom: 10px;
`;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const USER_NICKNAME = "사용자"; // 실제로는 사용자 정보에서 가져와야 함

  const handleQuizClick = () => {
    navigate('/quiz');
  };

  return (
    <DashboardContainer>
      <Logo src="/onboarding.png" alt="로고" />
      
      <UserGreeting>
        <UserName>{USER_NICKNAME}</UserName>
        <UserMessage>님의 <br/>학습을 응원합니다 :)</UserMessage>
      </UserGreeting>
      
      <Card>
        <CardTitle>누적 학습 현황</CardTitle>
        <CardContent>
          <StatRow>
            <StatLabel>오늘의 정답률</StatLabel>
            <StatValue>90</StatValue>
            <StatUnit>%</StatUnit>
          </StatRow>
          <StatRow>
            <StatLabel>평균 풀이 시간</StatLabel>
            <StatValue>90</StatValue>
            <TimeUnit>m</TimeUnit>
          </StatRow>
        </CardContent>
      </Card>
      <Card2>
        <CardTitle>최근에 틀린 문장</CardTitle>
      </Card2>
      <Divider4 />
      
      <Card3 />
      <ProgressBarBackground />
      <ProgressBarFill width="84px" />
      <ProgressBarBackground2 />
      <ProgressBarFill2 width="115.69px" />
      <ProgressBarBackground3 />
      <ProgressBarFill3 width="115.69px" />
      <Text style={{ position: 'absolute', left: '43px', top: '480px' }}>카테고리별 학습현황</Text>
      <Divider2 />
      
      <Card4 />
      <ProgressBarBackground4 />
      <ProgressBarFill4 width="115.69px" />
      <ProgressBarBackground5 />
      <ProgressBarFill5 width="115.69px" />
      <ProgressBarBackground6 />
      <ProgressBarFill6 width="115.69px" />
      <ProgressBarBackground7 />
      <ProgressBarFill7 width="115.69px" />
      <ProgressBarBackground8 />
      <ProgressBarFill8 width="115.69px" />
      <Text style={{ position: 'absolute', left: '218px', top: '480px' }}>난이도별 학습현황</Text>
      <Divider3 />
      
      <QuizButton onClick={handleQuizClick}>
        <ButtonText>한국어 능력 확인 하러가기</ButtonText>
      </QuizButton>
      
      <LogoutText>로그아웃</LogoutText>
      
      <Avatar>
        <AvatarText>S</AvatarText>
      </Avatar>
      
      <Divider />
    </DashboardContainer>
  );
};

export default Dashboard; 