import React from 'react';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  width: 393px;
  height: 852px;
  position: relative;
  background: #FFF8E2;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const Logo = styled.img`
  width: 53px;
  height: 43px;
  position: absolute;
  left: 50%;
  top: 19px;
  transform: translateX(-50%);
`;

const LoadingImage = styled.img`
  width: 298px;
  height: 298px;
  position: absolute;
  left: 50%;
  top: 251px;
  transform: translateX(-50%);
`;

const LoadingText = styled.span`
  color: black;
  font-size: 28px;
  font-family: Gmarket Sans TTF;
  font-weight: 700;
  word-wrap: break-word;
  position: absolute;
  top: 580px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 100%;
`;

const Loading: React.FC = () => {
  return (
    <LoadingContainer>
      <Logo src="/onboarding.png" alt="로고" />
      <LoadingImage src="/loading.png" alt="로딩 이미지" />
      <LoadingText>조금만 기다시게나</LoadingText>
    </LoadingContainer>
  );
};

export default Loading; 