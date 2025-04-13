import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { api } from '../api/axios';

interface Question {
  question_id: string;
  wrong_sentence: string;
  right_sentence: string;
  wrong_word: string;
  right_word: string;
  explanation: string;
}

const QuizContainer = styled.div`
  padding: 20px;
  max-width: 800px;
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

const QuitButton = styled.button`
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

const QuestionCard = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Sentence = styled.p`
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const AnswerInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await api.get('/questions/random');
      setQuestion(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch question:', error);
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!question) return;

    try {
      const isCorrect = answer.toLowerCase() === question.right_word.toLowerCase();
      await api.post('/logs', {
        question_id: question.question_id,
        correct: isCorrect,
        delaytime: 0, // TODO: 실제 시간 측정 구현
      });

      if (isCorrect) {
        // TODO: 정답 모달 표시
      } else {
        // TODO: 오답 모달 표시
      }
    } catch (error) {
      console.error('Failed to submit answer:', error);
    }
  };

  const handleQuit = () => {
    // TODO: 퀴즈 종료 모달 표시
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (!question) {
    return <div>문제를 불러올 수 없습니다.</div>;
  }

  return (
    <QuizContainer>
      <Header>
        <Title>오늘의 퀴즈</Title>
        <QuitButton onClick={handleQuit}>종료하기</QuitButton>
      </Header>

      <QuestionCard>
        <Sentence>{question.wrong_sentence}</Sentence>
        <AnswerInput
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="정답을 입력하세요"
        />
        <SubmitButton onClick={handleSubmit}>제출하기</SubmitButton>
      </QuestionCard>
    </QuizContainer>
  );
};

export default Quiz; 