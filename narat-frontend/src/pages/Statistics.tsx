// src/pages/Statistics.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { studyService } from '../api/services';
import { getSessionToken } from '../api/axios';
import { RecentWrongAnswer } from '../types/auth';
import Loading from './Loading';

const StyledContainer = styled.div`
  width: 100%;
  max-width: 393px;
  height: 100vh;
  position: relative;
  background: #FFF8E2;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLogo = styled.img`
  width: 53px;
  height: 43px;
  position: absolute;
  top: 19px;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledBackButton = styled.span`
  color: #3C3A3A;
  font-size: 15px;
  font-family: 'Gmarket Sans TTF';
  font-weight: 500;
  word-wrap: break-word;
  position: fixed;
  bottom: 20px;
  left: 20px;
  cursor: pointer;
  z-index: 10;
`;

const StyledResultCard = styled.div`
  width: 90%;
  max-width: 344px;
  height: 721px;
  margin-top: 74px;
  position: relative;
  background: rgba(255, 255, 255, 0.83);
  border-radius: 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledScoreContainer = styled.div`
  display: flex;
  align-items: baseline;
  margin-top: 26px;
  gap: 5px;
`;

const StyledScoreNumber = styled.span`
  color: black;
  font-size: 77px;
  font-family: 'Gmarket Sans TTF';
  font-weight: 500;
  word-wrap: break-word;
`;

const StyledScoreUnit = styled.span`
  color: black;
  font-size: 20px;
  font-family: 'Gmarket Sans TTF';
  font-weight: 500;
  word-wrap: break-word;
`;

const StyledTitle = styled.span`
  color: transparent;
  font-size: 24px;
  font-family: 'Gmarket Sans TTF';
  font-weight: 700;
  word-wrap: break-word;
  margin-top: 20px;
  -webkit-text-stroke: 1px black;
  text-stroke: 1px black;
`;

const StyledSubtitle = styled.p`
  color: black;
  font-size: 13px;
  font-family: 'Gmarket Sans TTF';
  font-weight: 300;
  text-align: center;
  word-wrap: break-word;
  margin-top: 20px;
`;

const StyledOnboardingImage = styled.img`
  width: 171px;
  height: 32px;
  margin-top: 20px;
`;

const StyledStarImage = styled.img`
  width: 45px;
  height: 47px;
  position: absolute;
  top: 140px;
  left: 25%;
  transform: translateX(-50%);
`;

const StyledUnderlineImage = styled.img`
  width: 200px;
  height: 40px;
  position: absolute;
  top: 160px;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledProgressBarContainer = styled.div`
  width: 90%;
  max-width: 281px;
  height: 30px;
  margin-top: 30px;
  position: relative;
  background: #F3F3F3;
  border-radius: 20px;
  overflow: hidden;
`;

const StyledProgressBar = styled.div<{ $progress: number }>`
  width: ${props => props.$progress}%;
  height: 100%;
  background: #B4D000;
  border-radius: 20px;
  transition: width 0.5s ease-in-out;
`;

const StyledLoadingImage = styled.img`
  width: 45px;
  height: 45px;
  position: absolute;
  top: 310px;
  right: 20px;
`;

const StyledWrongAnswerBox = styled.div`
  width: 90%;
  max-width: 294px;
  height: 176px;
  margin-top: 30px;
  background: #F7FEBF;
  border-radius: 15px;
  padding: 15px;
  overflow-y: auto;
`;

const StyledWrongAnswerTitle = styled.span`
  color: black;
  font-size: 16px;
  font-family: 'Gmarket Sans TTF';
  font-weight: 700;
  word-wrap: break-word;
  display: block;
  margin-bottom: 10px;
`;

const StyledWrongAnswer = styled.p`
  margin: 5px 0;
  font-size: 13px;
  font-family: 'Gmarket Sans TTF';
  line-height: 1.4;
`;

const StyledCorrectText = styled.span`
  color: black;
  font-family: 'Gmarket Sans TTF';
  font-weight: 700;
  font-size: 13px;
`;

const StyledWrongText = styled.span`
  color: #FF0000;
  font-family: 'Gmarket Sans TTF';
  font-weight: 500;
  font-size: 13px;
`;

const StyledNormalText = styled.span`
  color: black;
  font-family: 'Gmarket Sans TTF';
  font-weight: 300;
  font-size: 13px;
`;

const StyledButtonContainer = styled.div`
  width: 90%;
  max-width: 274px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
  margin-bottom: 60px;
`;

const StyledSaveButton = styled.div`
  width: 100%;
  height: 54px;
  background: #B4D000;
  border-radius: 31px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 16px;
  font-family: 'Gmarket Sans TTF';
  font-weight: 700;
  cursor: pointer;
`;

const StyledRetryButton = styled.div`
  width: 100%;
  height: 54px;
  background: #9FB700;
  border-radius: 31px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 16px;
  font-family: 'Gmarket Sans TTF';
  font-weight: 700;
  cursor: pointer;
`;

// 로케이션 스테이트 타입 정의
interface LocationState {
  totalQuestions: number;
  correctAnswers: number;
  averageTime?: number;
  totalTime?: number;
}

const Statistics: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const stateData = location.state as LocationState;

  const [wrongAnswers, setWrongAnswers] = useState<RecentWrongAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);

  // 세션 토큰으로 최근 틀린 문제 가져오기
  useEffect(() => {
    const fetchWrongAnswers = async () => {
      try {
        setLoading(true);
        const sessionToken = getSessionToken();
        
        if (sessionToken) {
          const wrongData = await studyService.getRecentWrong({
            session_token: sessionToken,
            limit: 5
          });
          
          setWrongAnswers(wrongData.recent_wrong_answers || []);
        }
        
        // 퀴즈 결과에서 점수 계산
        if (stateData) {
          const calculatedScore = Math.round((stateData.correctAnswers / stateData.totalQuestions) * 100);
          setScore(calculatedScore);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch wrong answers:', error);
        setLoading(false);
      }
    };

    fetchWrongAnswers();
  }, [stateData]);

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  const handleRetryClick = () => {
    navigate('/quiz');
  };

  const handleSaveAsImage = () => {
    // 이미지 저장 로직
    alert('이미지 저장 기능은 곧 구현될 예정입니다.');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <StyledContainer>
      <StyledLogo src="/onboarding.png" alt="Logo" />
      <StyledBackButton onClick={handleBackClick}>&lt;&lt; 처음으로</StyledBackButton>
      <StyledResultCard>
        <StyledTitle>나랏말싸미</StyledTitle>
        <StyledScoreContainer>
          <StyledScoreNumber>{score}</StyledScoreNumber>
          <StyledScoreUnit>점</StyledScoreUnit>
        </StyledScoreContainer>
        <StyledStarImage src="/star.png" alt="Star" />
        <StyledUnderlineImage src="/underline.png" alt="Underline" />
        <StyledSubtitle>
          차곡차곡 쌓아나가는 <br/>우리글 실력
        </StyledSubtitle>
        <StyledProgressBarContainer>
          <StyledProgressBar $progress={score} />
          <StyledLoadingImage src="/loading.png" alt="Loading" />
        </StyledProgressBarContainer>
        <StyledWrongAnswerBox>
          <StyledWrongAnswerTitle>오답 문장 모아보기</StyledWrongAnswerTitle>
          {wrongAnswers.length > 0 ? (
            wrongAnswers.map((wrongAnswer, index) => (
              <StyledWrongAnswer key={index}>
                <StyledNormalText>
                  {wrongAnswer.wrong_sentence.split(wrongAnswer.wrong_word)[0]}
                </StyledNormalText>
                <StyledWrongText>{wrongAnswer.wrong_word} </StyledWrongText>
                <StyledNormalText>
                  {wrongAnswer.wrong_sentence.split(wrongAnswer.wrong_word)[1]} 
                </StyledNormalText>
                <StyledCorrectText>→ {wrongAnswer.right_word}</StyledCorrectText>
              </StyledWrongAnswer>
            ))
          ) : (
            <StyledNormalText>틀린 문제가 없습니다.</StyledNormalText>
          )}
        </StyledWrongAnswerBox>
        <StyledButtonContainer>
          <StyledSaveButton onClick={handleSaveAsImage}>이미지로 저장하기</StyledSaveButton>
          <StyledRetryButton onClick={handleRetryClick}>새로운 문제로 도전하기</StyledRetryButton>
        </StyledButtonContainer>
      </StyledResultCard>
    </StyledContainer>
  );
};

export default Statistics;