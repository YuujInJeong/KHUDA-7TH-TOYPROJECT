// src/pages/Quiz.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import QuizRightModal from './modal/QuizRightModal';
import QuizWrongModal from './modal/QuizWrongModal';
import QuitQuizModal from './modal/QuitQuizModal';
import Loading from './Loading';
import { Question } from '../types/auth';
import { questionService } from '../api/services';
import { logService } from '../api/services';
import { studyService } from '../api/services';
import { getSessionToken, setSessionToken } from '../api/axios';
import { sessionService } from '../api/services';

const QuizContainer = styled.div`
  width: 393px;
  height: 852px;
  position: relative;
  background: #FFF8E2;
  overflow: hidden;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
`;

const Progress = styled.div`
  width: 52px;
  height: 27px;
  position: absolute;
  left: 170px;
  top: 100px;
  border-radius: 24px;
  border: 1px black solid;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-family: 'Gmarket Sans TTF', sans-serif;
  font-weight: 500;
`;

const QuestionText = styled.h2`
  font-size: 28px;
  color: #3C3A3A;
  margin-bottom: 24px;
  line-height: 1.5;
  font-family: 'Gmarket Sans TTF', sans-serif;
  font-weight: 500;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: absolute;
  left: 50%;
  top: 65%;
  transform: translateX(-50%);
  width: 80%;
`;

const OptionButton = styled.button<{ selected: boolean; isCorrect?: boolean; isWrong?: boolean }>`
  padding: 16px;
  border-radius: 31px;
  border: 1px solid ${({ selected, isCorrect, isWrong }) => {
    if (isCorrect) return '#4CAF50';
    if (isWrong) return '#F44336';
    if (selected) return '#FFD85F';
    return '#3C3A3A';
  }};
  background-color: ${({ selected, isCorrect, isWrong }) => {
    if (isCorrect) return 'rgba(76, 175, 80, 0.2)';
    if (isWrong) return 'rgba(244, 67, 54, 0.2)';
    if (selected) return 'rgba(255, 216, 95, 0.4)';
    return 'transparent';
  }};
  color: #3C3A3A;
  font-size: 16px;
  text-align: center;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  font-family: 'Gmarket Sans TTF', sans-serif;
  font-weight: 500;
  width: 251px;
  height: 50px;
  margin: 0 auto;

  &:hover {
    background-color: ${({ selected, isCorrect, isWrong }) => {
      if (isCorrect) return 'rgba(76, 175, 80, 0.3)';
      if (isWrong) return 'rgba(244, 67, 54, 0.3)';
      if (selected) return 'rgba(255, 216, 95, 0.5)';
      return 'rgba(255, 216, 95, 0.2)';
    }};
  }
`;

const Explanation = styled.div`
  margin-top: 24px;
  padding: 16px;
  background-color: rgba(255, 202.98, 248.93, 0.54);
  border-radius: 8px;
  font-size: 15px;
  color: #3C3A3A;
  font-family: 'Gmarket Sans TTF', sans-serif;
  font-weight: 500;
  text-align: center;
  width: 172px;
  height: 13px;
  position: absolute;
  left: 139px;
  top: 297px;
`;

const NavigationButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: absolute;
  left: 71px;
  top: 406px;
`;

const NavigationButton = styled.button`
  width: 251px;
  height: 50px;
  background: rgba(255, 216.50, 95.49, 0.40);
  border-radius: 31px;
  border: none;
  color: #3C3A3A;
  font-size: 16px;
  font-family: 'Gmarket Sans TTF', sans-serif;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: rgba(255, 216.50, 95.49, 0.6);
  }
`;

const QuitButton = styled.button`
  background: none;
  border: none;
  color: #3C3A3A;
  font-size: 16px;
  font-family: 'Gmarket Sans TTF', sans-serif;
  font-weight: 500;
  cursor: pointer;
  position: absolute;
  left: 20px;
  bottom: 20px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const QuizImage = styled.img`
  width: 53px;
  height: 43px;
  position: absolute;
  left: 170px;
  top: 19px;
`;

const HighlightedText = styled.span`
  background-color: rgba(255, 182, 193, 0.6);
  padding: 0 2px;
  border-radius: 2px;
`;

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showRightModal, setShowRightModal] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showWrongSentence, setShowWrongSentence] = useState(true);
  const [options, setOptions] = useState<string[]>([]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [timeSpent, setTimeSpent] = useState<number[]>([]);

  // 한글 숫자 배열
  const koreanNumbers = ['하나', '둘', '셋', '넷', '다섯', '여섯', '일곱', '여덟', '아홉', '열'];

  // 세션 생성 또는 가져오기
  useEffect(() => {
    const initSession = async () => {
      try {
        // 기존 세션 확인
        const existingSessionToken = getSessionToken();
        
        if (!existingSessionToken) {
          // 새 세션 생성
          const sessionData = await sessionService.createSession();
          setSessionId(sessionData.session_id);
          setSessionToken(sessionData.session_id);
        } else {
          setSessionId(existingSessionToken);
        }
      } catch (error) {
        console.error('Failed to initialize session:', error);
      }
    };

    initSession();
  }, []);

  // 문제 가져오기
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        // 실제 API 사용
        const fetchedQuestions = await questionService.getQuestions({ limit: 10 }); 
        setQuestions(fetchedQuestions);
        setIsLoading(false);
        setStartTime(Date.now());
      } catch (error) {
        console.error('Failed to fetch questions:', error);
        setIsLoading(false);
      }
    };

    if (sessionId) {
      fetchQuestions();
    }
  }, [sessionId]);

  // 문제가 로드되면 현재 문제에 대한 옵션을 설정
  useEffect(() => {
    if (questions.length > 0) {
      setupCurrentQuestion();
    }
  }, [questions, currentQuestionIndex]);

  // 현재 문제에 대한 옵션을 설정하는 함수
  const setupCurrentQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;
    
    // 랜덤하게 틀린 문장 또는 맞은 문장을 보여줄지 결정
    const showWrong = Math.random() > 0.5;
    setShowWrongSentence(showWrong);
    
    // 옵션 배열 생성 (wrong_word와 right_word를 랜덤하게 배치)
    const optionsArray = [currentQuestion.wrong_word, currentQuestion.right_word];
    
    // 옵션 순서 랜덤화
    const shuffledOptions = [...optionsArray].sort(() => Math.random() - 0.5);
    setOptions(shuffledOptions);
    
    // 정답 인덱스 찾기
    const correctIndex = shuffledOptions.indexOf(currentQuestion.right_word);
    setCorrectOptionIndex(correctIndex);
    
    // 시작 시간 설정
    setStartTime(Date.now());
  };

  const handleAnswerSelect = async (answerIndex: number) => {
    if (selectedAnswer !== null) return; // 이미 답을 선택한 경우

    setSelectedAnswer(answerIndex);
    const isAnswerCorrect = answerIndex === correctOptionIndex;
    setIsCorrect(isAnswerCorrect);
    
    // 소요 시간 계산 (초 단위)
    const elapsedTime = (Date.now() - startTime) / 1000;
    setTimeSpent([...timeSpent, elapsedTime]);
    
    // 정답 여부에 따라 모달 표시
    if (isAnswerCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setShowRightModal(true);
    } else {
      setShowWrongModal(true);
    }
    
    // 학습 로그 기록
    try {
      if (sessionId) {
        // 로그 API 호출
        await logService.createLog({
          question_id: questions[currentQuestionIndex].question_id,
          correct: isAnswerCorrect,
          delaytime: elapsedTime
        });
        
        // 학습 결과 제출
        await studyService.submitAnswer({
          session_token: sessionId,
          question_id: questions[currentQuestionIndex].question_id,
          correct: isAnswerCorrect
        });
      }
    } catch (error) {
      console.error('Failed to log answer:', error);
    }
  };

  const handleNextQuestion = () => {
    setShowRightModal(false);
    setShowWrongModal(false);
    setSelectedAnswer(null);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // 모든 문제를 풀었을 때 통계 페이지로 이동
      navigate('/statistics', { 
        state: { 
          totalQuestions: questions.length, 
          correctAnswers,
          averageTime: timeSpent.reduce((a, b) => a + b, 0) / timeSpent.length,
          totalTime: timeSpent.reduce((a, b) => a + b, 0)
        } 
      });
    }
  };

  const handleQuitQuiz = () => {
    setShowQuitModal(true);
  };

  const confirmQuitQuiz = () => {
    navigate('/dashboard');
  };

  // 문제 텍스트에서 강조할 부분을 찾아 하이라이트 처리하는 함수
  const getHighlightedQuestionText = () => {
    if (questions.length === 0 || !questions[currentQuestionIndex]) return '';
    
    const currentQuestion = questions[currentQuestionIndex];
    const questionText = showWrongSentence ? currentQuestion.wrong_sentence : currentQuestion.right_sentence;
    const highlightWord = showWrongSentence ? currentQuestion.wrong_word : currentQuestion.right_word;
    
    // 강조할 단어를 찾아서 하이라이트 처리
    const parts = questionText.split(highlightWord);
    
    if (parts.length > 1) {
      return (
        <>
          {parts[0]}
          <HighlightedText>{highlightWord}</HighlightedText>
          {parts[1]}
        </>
      );
    }
    
    return questionText;
  };

  if (isLoading) {
    return <Loading />;
  }

  if (questions.length === 0) {
    return (
      <QuizContainer>
        <Header>
          <QuizImage src="/onboarding.png" alt="로고" />
        </Header>
        <QuestionText>문제를 불러올 수 없습니다.</QuestionText>
        <NavigationButton onClick={() => navigate('/dashboard')}>대시보드로 돌아가기</NavigationButton>
      </QuizContainer>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <QuizContainer>
      <QuizImage src="/onboarding.png" alt="로고" />
      <Header>
        <Progress>{currentQuestionIndex + 1} / {questions.length}</Progress>
      </Header>

      <QuestionText>{getHighlightedQuestionText()}</QuestionText>
      
      <OptionsContainer>
        {options.map((option, index) => (
          <OptionButton
            key={index}
            selected={selectedAnswer === index}
            isCorrect={selectedAnswer !== null && index === correctOptionIndex}
            isWrong={selectedAnswer === index && selectedAnswer !== correctOptionIndex}
            onClick={() => handleAnswerSelect(index)}
            disabled={selectedAnswer !== null}
          >
            {option}
          </OptionButton>
        ))}
      </OptionsContainer>

      {selectedAnswer !== null && (
        <Explanation>
          {currentQuestion.explanation}
        </Explanation>
      )}

      <NavigationButtons>
        {selectedAnswer !== null && (
          <NavigationButton onClick={handleNextQuestion}>
            {isLastQuestion ? '결과 보기' : '다음 문제'}
          </NavigationButton>
        )}
      </NavigationButtons>
      
      <QuitButton onClick={handleQuitQuiz}>
        처음으로
      </QuitButton>

      <QuizRightModal 
        isOpen={showRightModal}
        onClose={() => setShowRightModal(false)}
        onNext={handleNextQuestion}
        isLastQuestion={isLastQuestion}
        explanation={currentQuestion?.explanation}
        rightWord={currentQuestion?.right_word}
        rightSentence={currentQuestion?.right_sentence}
      />

      <QuizWrongModal 
        isOpen={showWrongModal}
        onClose={() => setShowWrongModal(false)}
        onNext={handleNextQuestion}
        isLastQuestion={isLastQuestion}
        correctAnswer={currentQuestion?.right_word || ''}
        explanation={currentQuestion?.explanation}
        wrongWord={currentQuestion?.wrong_word}
        rightWord={currentQuestion?.right_word}
        wrongSentence={currentQuestion?.wrong_sentence}
        rightSentence={currentQuestion?.right_sentence}
      />

      <QuitQuizModal 
        isOpen={showQuitModal}
        onClose={() => setShowQuitModal(false)}
        onConfirm={confirmQuitQuiz}
      />
    </QuizContainer>
  );
};

export default Quiz;