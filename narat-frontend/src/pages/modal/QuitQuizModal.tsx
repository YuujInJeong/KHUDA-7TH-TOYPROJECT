import React from 'react';
import styled from 'styled-components';
import { Button } from '../../components/common/Button';

interface QuitQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalOverlay = styled.div`
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

const ModalContent = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 24px;
  width: 300px;
  height: 209px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const QuitImage = styled.img`
  width: 100px;
  height: 73px;
  position: absolute;
  left: 95px;
  top: 16px;
`;

const TitleText = styled.div`
  color: #1E1E1E;
  font-size: 14px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  position: absolute;
  left: 95px;
  top: 100px;
  text-align: center;
`;

const MessageText = styled.div`
  color: #1E1E1E;
  font-size: 12px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  line-height: 15.02px;
  position: absolute;
  left: 95px;
  top: 120px;
  text-align: center;
`;

const CancelButton = styled.div`
  width: 130px;
  height: 32px;
  position: absolute;
  left: 15px;
  top: 157px;
  background: #E2E2E2;
  border-radius: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ConfirmButton = styled.div`
  width: 130px;
  height: 32px;
  position: absolute;
  left: 155px;
  top: 157px;
  background: #A97700;
  border-radius: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ButtonText = styled.span`
  color: black;
  font-size: 14px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
`;

const WhiteButtonText = styled.span`
  color: white;
  font-size: 14px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
`;

const QuitQuizModal: React.FC<QuitQuizModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <QuitImage src="/quit.png" alt="종료" />
        <TitleText>그만 두시나요?</TitleText>
        <MessageText>진행상황은 저장되지 않습니다.</MessageText>
        <CancelButton onClick={onClose}>
          <ButtonText>취소</ButtonText>
        </CancelButton>
        <ConfirmButton onClick={onConfirm}>
          <WhiteButtonText>나가기</WhiteButtonText>
        </ConfirmButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default QuitQuizModal; 