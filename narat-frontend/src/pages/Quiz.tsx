import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import QuizRightModal from './modal/QuizRightModal';
import QuizWrongModal from './modal/QuizWrongModal';
import QuitQuizModal from './modal/QuitQuizModal';
import Loading from './Loading';

// 퀴즈 데이터 타입
interface QuizQuestion {
  question_id: string;
  wrong_sentence: string;
  right_sentence: string;
  wrong_word: string;
  right_word: string;
  location: string;
  difficulty_level: number;
  explanation: string;
}

// 샘플 퀴즈 데이터 (CSV 데이터 기반)
const sampleQuestions: QuizQuestion[] = [
  {
    question_id: "1",
    wrong_sentence: "일을 하던지 말던지 마음을 정해야지.",
    right_sentence: "일을 하든지 말든지 마음을 정해야지.",
    wrong_word: "하던지 말던지",
    right_word: "하든지 말든지",
    location: "일을 [하든지 말든지] 마음을 정해야지.",
    difficulty_level: 3,
    explanation: "'-던'은 과거에 일어난 일을 회상하여 말할 때 쓰는 어미입니다. 따라서 \"하던지 말던지\"는 문법적으로 맞지 않습니다."
  },
  {
    question_id: "2",
    wrong_sentence: "방을 깨끗히 유지하는 것이 중요하다.",
    right_sentence: "방을 깨끗이 유지하는 것이 중요하다.",
    wrong_word: "깨끗히",
    right_word: "깨끗이",
    location: "방을 [깨끗이] 유지하는 것이 중요하다.",
    difficulty_level: 1,
    explanation: "뒤에 -하다가 붙을 수 있는 어근 가운데 끝 음절이 'ㅅ' 받침으로 끝나는 경우엔 -이로 적습니다."
  },
  {
    question_id: "3",
    wrong_sentence: "부끄러움을 무릎쓰다.",
    right_sentence: "부끄러움을 무릅쓰다.",
    wrong_word: "무릎쓰고",
    right_word: "무릅쓰고",
    location: "부끄러움을 [무릅쓰다].",
    difficulty_level: 4,
    explanation: "무릎은 넓적다리와 정강이를 잇는 부분을 말하는데, 이 무릎을 쓸 때는 무릅이 아니라 무릎이 맞습니다. 그러나 '실례를 무릅쓰고', '실례를 무릅쓰다' 라고 할 때는 '무릅쓰다'가 맞습니다."
  },
  {
    question_id: "4",
    wrong_sentence: "그는 나에게 책을 주었다.",
    right_sentence: "그는 나에게 책을 주었다.",
    wrong_word: "주었다",
    right_word: "주었다",
    location: "그는 나에게 책을 [주었다].",
    difficulty_level: 1,
    explanation: "이 문장은 문법적으로 맞습니다."
  },
  {
    question_id: "5",
    wrong_sentence: "나는 어제 학교에 갔다.",
    right_sentence: "나는 어제 학교에 갔다.",
    wrong_word: "갔다",
    right_word: "갔다",
    location: "나는 어제 학교에 [갔다].",
    difficulty_level: 1,
    explanation: "이 문장은 문법적으로 맞습니다."
  }
];

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
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
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

  // 한글 숫자 배열
  const koreanNumbers = ['하나', '둘', '셋', '넷', '다섯', '여섯', '일곱', '여덟', '아홉', '열'];

  useEffect(() => {
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

  // 문제가 로드되면 현재 문제에 대한 옵션을 설정
  useEffect(() => {
    if (questions.length > 0) {
      setupCurrentQuestion();
    }
  }, [questions, currentQuestionIndex]);

  // 현재 문제에 대한 옵션을 설정하는 함수
  const setupCurrentQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    
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
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // 이미 답을 선택한 경우

    setSelectedAnswer(answerIndex);
    const isAnswerCorrect = answerIndex === correctOptionIndex;
    setIsCorrect(isAnswerCorrect);
    
    if (isAnswerCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setShowRightModal(true);
    } else {
      setShowWrongModal(true);
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
          correctAnswers 
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
        <Progress>{koreanNumbers[currentQuestionIndex]}</Progress>
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
            {isLastQuestion ? '결과 보기' : '하든지 말든지'}
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
        explanation={currentQuestion.explanation}
      />

      <QuizWrongModal 
        isOpen={showWrongModal}
        onClose={() => setShowWrongModal(false)}
        onNext={handleNextQuestion}
        isLastQuestion={isLastQuestion}
        correctAnswer={currentQuestion.right_word}
        explanation={currentQuestion.explanation}
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