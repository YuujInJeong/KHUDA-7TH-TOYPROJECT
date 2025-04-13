import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';

// 임시 퀴즈 데이터 타입
interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// 임시 퀴즈 데이터
const sampleQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: '다음 중 "안녕하세요"의 의미와 가장 가까운 것은?',
    options: ['Hello', 'Goodbye', 'Thank you', 'Sorry'],
    correctAnswer: 0,
    explanation: '"안녕하세요"는 영어로 "Hello"에 해당합니다.'
  },
  {
    id: '2',
    question: '다음 중 "감사합니다"의 의미와 가장 가까운 것은?',
    options: ['Hello', 'Goodbye', 'Thank you', 'Sorry'],
    correctAnswer: 2,
    explanation: '"감사합니다"는 영어로 "Thank you"에 해당합니다.'
  },
  {
    id: '3',
    question: '다음 중 "가다"의 과거형은?',
    options: ['가다', '갔다', '가고', '가면'],
    correctAnswer: 1,
    explanation: '"가다"의 과거형은 "갔다"입니다.'
  },
  {
    id: '4',
    question: '다음 중 "먹다"의 과거형은?',
    options: ['먹다', '먹었다', '먹고', '먹으면'],
    correctAnswer: 1,
    explanation: '"먹다"의 과거형은 "먹었다"입니다.'
  },
  {
    id: '5',
    question: '다음 중 "하다"의 현재진행형은?',
    options: ['하다', '했다', '하고 있다', '했었다'],
    correctAnswer: 2,
    explanation: '"하다"의 현재진행형은 "하고 있다"입니다.'
  },
  {
    id: '6',
    question: '다음 중 "오다"의 현재진행형은?',
    options: ['오다', '왔다', '오고 있다', '왔었다'],
    correctAnswer: 2,
    explanation: '"오다"의 현재진행형은 "오고 있다"입니다.'
  },
  {
    id: '7',
    question: '다음 중 "보다"의 명령형은?',
    options: ['보다', '봐', '봤다', '보고'],
    correctAnswer: 1,
    explanation: '"보다"의 명령형은 "봐"입니다.'
  },
  {
    id: '8',
    question: '다음 중 "주다"의 명령형은?',
    options: ['주다', '줘', '줬다', '주고'],
    correctAnswer: 1,
    explanation: '"주다"의 명령형은 "줘"입니다.'
  },
  {
    id: '9',
    question: '다음 중 "가다"의 부정형은?',
    options: ['가다', '가지 않다', '가고', '가면'],
    correctAnswer: 1,
    explanation: '"가다"의 부정형은 "가지 않다"입니다.'
  },
  {
    id: '10',
    question: '다음 중 "하다"의 부정형은?',
    options: ['하다', '하지 않다', '하고', '하면'],
    correctAnswer: 1,
    explanation: '"하다"의 부정형은 "하지 않다"입니다.'
  }
];

const QuizContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px;
  display: flex;
  flex-direction: column;
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

const Progress = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray[600]};
`;

const QuizCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const QuestionText = styled.h2`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 24px;
  line-height: 1.5;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;

const OptionButton = styled.button<{ selected: boolean; isCorrect?: boolean; isWrong?: boolean }>`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme, selected, isCorrect, isWrong }) => {
    if (isCorrect) return theme.colors.success;
    if (isWrong) return theme.colors.error;
    if (selected) return theme.colors.primary;
    return theme.colors.gray[300];
  }};
  background-color: ${({ theme, selected, isCorrect, isWrong }) => {
    if (isCorrect) return `${theme.colors.success}20`;
    if (isWrong) return `${theme.colors.error}20`;
    if (selected) return `${theme.colors.primary}20`;
    return 'transparent';
  }};
  color: ${({ theme, selected, isCorrect, isWrong }) => {
    if (isCorrect) return theme.colors.success;
    if (isWrong) return theme.colors.error;
    if (selected) return theme.colors.primary;
    return theme.colors.text;
  }};
  font-size: 1rem;
  text-align: left;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme, selected, isCorrect, isWrong }) => {
      if (isCorrect) return `${theme.colors.success}30`;
      if (isWrong) return `${theme.colors.error}30`;
      if (selected) return `${theme.colors.primary}30`;
      return theme.colors.gray[100];
    }};
  }
`;

const Explanation = styled.div`
  margin-top: 24px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  border-radius: 8px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div<{ isCorrect: boolean }>`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const ModalTitle = styled.h2<{ isCorrect: boolean }>`
  font-size: 1.5rem;
  color: ${({ theme, isCorrect }) => isCorrect ? theme.colors.success : theme.colors.error};
  margin-bottom: 16px;
`;

const ModalMessage = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 24px;
`;

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: API에서 추천 시스템을 통해 문제 불러오기
    // 임시로 샘플 데이터 사용
    const fetchQuestions = async () => {
      try {
        // API 호출 대신 지연 시간 추가
        await new Promise(resolve => setTimeout(resolve, 1000));
        setQuestions(sampleQuestions);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // 이미 답을 선택한 경우

    setSelectedAnswer(answerIndex);
    const isAnswerCorrect = answerIndex === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(isAnswerCorrect);
    
    if (isAnswerCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
    
    setShowModal(true);
  };

  const handleNextQuestion = () => {
    setShowModal(false);
    setSelectedAnswer(null);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // 모든 문제를 풀었을 때 통계 페이지로 이동
      navigate('/statistics', { 
        state: { 
          totalQuestions: questions.length, 
          correctAnswers 
        } 
      });
    }
  };

  if (isLoading) {
    return (
      <QuizContainer>
        <Header>
          <Title>퀴즈</Title>
          <Progress>문제 불러오는 중...</Progress>
        </Header>
        <QuizCard>
          <QuestionText>문제를 불러오는 중입니다...</QuestionText>
        </QuizCard>
      </QuizContainer>
    );
  }

  if (questions.length === 0) {
    return (
      <QuizContainer>
        <Header>
          <Title>퀴즈</Title>
        </Header>
        <QuizCard>
          <QuestionText>문제를 불러올 수 없습니다.</QuestionText>
          <Button onClick={() => navigate('/dashboard')}>대시보드로 돌아가기</Button>
        </QuizCard>
      </QuizContainer>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <QuizContainer>
      <Header>
        <Title>퀴즈</Title>
        <Progress>{currentQuestionIndex + 1} / {questions.length}</Progress>
      </Header>

      <QuizCard>
        <QuestionText>{currentQuestion.question}</QuestionText>
        
        <OptionsContainer>
          {currentQuestion.options.map((option, index) => (
            <OptionButton
              key={index}
              selected={selectedAnswer === index}
              isCorrect={selectedAnswer !== null && index === currentQuestion.correctAnswer}
              isWrong={selectedAnswer === index && selectedAnswer !== currentQuestion.correctAnswer}
              onClick={() => handleAnswerSelect(index)}
            >
              {option}
            </OptionButton>
          ))}
        </OptionsContainer>

        {selectedAnswer !== null && (
          <Explanation>
            <strong>설명:</strong> {currentQuestion.explanation}
          </Explanation>
        )}

        <NavigationButtons>
          <Button 
            onClick={() => navigate('/dashboard')} 
            variant="outline"
          >
            종료하기
          </Button>
          {selectedAnswer !== null && (
            <Button onClick={handleNextQuestion}>
              {currentQuestionIndex < questions.length - 1 ? '다음 문제' : '결과 보기'}
            </Button>
          )}
        </NavigationButtons>
      </QuizCard>

      {showModal && (
        <Modal>
          <ModalContent isCorrect={isCorrect}>
            <ModalTitle isCorrect={isCorrect}>
              {isCorrect ? '정답입니다!' : '오답입니다.'}
            </ModalTitle>
            <ModalMessage>
              {isCorrect 
                ? '잘하셨습니다! 다음 문제로 넘어가세요.' 
                : `정답은 "${currentQuestion.options[currentQuestion.correctAnswer]}" 입니다.`}
            </ModalMessage>
            <Button onClick={handleNextQuestion}>
              {currentQuestionIndex < questions.length - 1 ? '다음 문제' : '결과 보기'}
            </Button>
          </ModalContent>
        </Modal>
      )}
    </QuizContainer>
  );
};

export default Quiz; 