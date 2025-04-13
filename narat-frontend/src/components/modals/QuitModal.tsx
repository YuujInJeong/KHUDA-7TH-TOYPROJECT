import React from 'react';
import styled from 'styled-components';
import Modal from '../common/Modal';

interface QuitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Title = styled.h2`
  color: #e74c3c;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const Message = styled.p`
  font-size: 18px;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
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
    background-color: #e74c3c;
    color: white;
    &:hover {
      background-color: #c0392b;
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

const QuitModal: React.FC<QuitModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Title>퀴즈를 종료하시겠습니까?</Title>
      <Message>
        지금까지의 학습 기록이 저장되지 않습니다.
        <br />
        정말로 종료하시겠습니까?
      </Message>
      <ButtonContainer>
        <Button variant="secondary" onClick={onClose}>
          취소
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          종료하기
        </Button>
      </ButtonContainer>
    </Modal>
  );
};

export default QuitModal; 