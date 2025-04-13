import React from 'react';
import styled from 'styled-components';

interface QuizRightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  isLastQuestion: boolean;
  explanation?: string;
  rightWord?: string;
  rightSentence?: string;
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
  width: 339px;
  height: 531px;
  position: relative;
  background: white;
  overflow: hidden;
  border-radius: 15px;
`;

const RightImage = styled.img`
  width: 121px;
  height: 121px;
  left: 108px;
  top: 88px;
  position: absolute;
`;

const TitleText = styled.div`
  color: #FF6E6E;
  font-size: 30px;
  font-family: 'Gmarket Sans TTF', sans-serif;
  font-weight: 700;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 250px;
  transform: translateX(-50%);
`;

const SentenceText = styled.div`
  color: black;
  font-size: 24px;
  font-family: 'Gmarket Sans TTF', sans-serif;
  font-weight: 500;
  position: absolute;
  left: 50%;
  top: 290px;
  transform: translateX(-50%);
  width: 90%;
  line-height: 1.5;
  text-align: center;
`;

const ExplanationText = styled.div`
  color: black;
  font-size: 13px;
  font-family: 'Gmarket Sans TTF', sans-serif;
  font-weight: 500;
  position: absolute;
  left: 50%;
  top: 380px;
  transform: translateX(-50%);
  width: 280px;
  line-height: 1.5;
  text-align: center;
`;

const HighlightText = styled.span`
  color: black;
  font-size: 24px;
  font-family: 'Gmarket Sans TTF', sans-serif;
  font-weight: 700;
  background-color: rgba(255, 182, 193, 0.6);
  padding: 0 2px;
  border-radius: 2px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 40px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const NextButton = styled.button`
  width: 178px;
  height: 45.29px;
  background: #A97700;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 16px;
  font-family: 'Gmarket Sans TTF', sans-serif;
  font-weight: 500;
  border: none;
`;

const QuizRightModal: React.FC<QuizRightModalProps> = ({ 
  isOpen, 
  onClose, 
  onNext, 
  isLastQuestion,
  explanation = "'-던'은 과거에 일어난 일을 회상하여 말할 때 쓰는 어미입니다. 따라서 하던지 말던지는 문법적으로 맞지 않습니다.",
  rightWord = "하든지 말든지",
  rightSentence = "일을 하든지 말든지 마음을 정해야지."
}) => {
  if (!isOpen) return null;

  // 설명 텍스트에서 강조할 부분을 찾아 하이라이트 처리하는 함수
  const getHighlightedExplanation = () => {
    return explanation;
  };

  // 문장에서 맞는 단어 부분을 하이라이트 처리하는 함수
  const getHighlightedSentence = () => {
    if (!rightSentence || !rightWord) return rightSentence;
    
    const parts = rightSentence.split(rightWord);
    
    if (parts.length > 1) {
      return (
        <>
          {parts[0]}
          <HighlightText>{rightWord}</HighlightText>
          {parts[1]}
        </>
      );
    }
    
    return rightSentence;
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <RightImage src="/right.png" alt="정답" />
        <TitleText>정답입니다</TitleText>
        <SentenceText>
          {getHighlightedSentence()}
        </SentenceText>
        <ExplanationText>
          {getHighlightedExplanation()}
        </ExplanationText>
        <ButtonContainer>
          <NextButton onClick={onNext}>
            {isLastQuestion ? '결과 보기' : '다음 문제로'}
          </NextButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default QuizRightModal; 