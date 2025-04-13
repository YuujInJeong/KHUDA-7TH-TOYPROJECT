import React from 'react';
import styled from 'styled-components';
import Modal from '../common/Modal';

interface CorrectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  explanation: string;
}

const Title = styled.h2`
  color: #27ae60;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const Message = styled.p`
  font-size: 18px;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`;

const Explanation = styled.div`
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 30px;
`;

const ExplanationTitle = styled.h3`
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
`;

const ExplanationText = styled.p`
  font-size: 16px;
  color: #333;
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  ${({ variant }) =>
    variant === 'primary'
      ? `
    background-color: #27ae60;
    color: white;
    &:hover {
      background-color: #219a52;
    }
  `
      : `
    background-color: #95a5a6;
    color: white;
    &:hover {
      background-color: #7f8c8d;
    }
  `}
`;

const CorrectModal: React.FC<CorrectModalProps> = ({
  isOpen,
  onClose,
  onNext,
  explanation,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Title>정답입니다! 🎉</Title>
      <Message>잘하셨어요!</Message>
      <Explanation>
        <ExplanationTitle>설명</ExplanationTitle>
        <ExplanationText>{explanation}</ExplanationText>
      </Explanation>
      <ButtonContainer>
        <Button variant="secondary" onClick={onClose}>
          종료하기
        </Button>
        <Button variant="primary" onClick={onNext}>
          다음 문제
        </Button>
      </ButtonContainer>
    </Modal>
  );
};

export default CorrectModal; 