import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';

const QuizContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

const QuizCard = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const QuestionText = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`;

const OptionButton = styled(Button)<{ isSelected: boolean; isCorrect?: boolean }>`
  width: 100%;
  text-align: left;
  padding: 15px 20px;
  background-color: ${props => 
    props.isCorrect === true ? '#2ecc71' : 
    props.isCorrect === false ? '#e74c3c' : 
    props.isSelected ? '#3498db' : 'white'};
  color: ${props => 
    props.isCorrect !== undefined ? 'white' : '#333'};
  border: 1px solid #ddd;
  
  &:hover {
    background-color: ${props => 
      props.isCorrect !== undefined ? props.isCorrect ? '#2ecc71' : '#e74c3c' : 
      '#f0f0f0'};
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const ProgressText = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 20px;
`;

// 임시 퀴즈 데이터
const sampleQuestions = [
  {
    id: 1,
    question: '다음 중 올바른 한국어 문장은?',
    options: [
      '나는 학교에 가요',
      '나는 학교에 가다',
      '나는 학교에 가고',
      '나는 학교에 가는'
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    question: '다음 중 존댓말이 아닌 것은?',
    options: [
      '안녕하세요',
      '감사합니다',
      '잘가',
      '실례합니다'
    ],
    correctAnswer: 2
  }
];

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = sampleQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === sampleQuestions.length - 1;

  const handleOptionSelect = (optionIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(optionIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    
    setTimeout(() => {
      if (isLastQuestion) {
        navigate('/dashboard');
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 1500);
  };

  return (
    <QuizContainer>
      <QuizCard>
        <ProgressText>
          문제 {currentQuestionIndex + 1} / {sampleQuestions.length}
        </ProgressText>
        <QuestionText>{currentQuestion.question}</QuestionText>
        <OptionsContainer>
          {currentQuestion.options.map((option, index) => (
            <OptionButton
              key={index}
              onClick={() => handleOptionSelect(index)}
              isSelected={selectedAnswer === index}
              isCorrect={showResult ? index === currentQuestion.correctAnswer : undefined}
            >
              {option}
            </OptionButton>
          ))}
        </OptionsContainer>
        <NavigationButtons>
          <Button onClick={() => navigate('/dashboard')}>취소</Button>
          <Button 
            onClick={handleNext}
            disabled={selectedAnswer === null}
          >
            {isLastQuestion ? '완료' : '다음'}
          </Button>
        </NavigationButtons>
      </QuizCard>
    </QuizContainer>
  );
};

export default Quiz; 