import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const OnboardingContainer = styled.div`
  width: 393px;
  height: 852px;
  position: relative;
  background: #FFF8E2;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const LogoImage = styled.img`
  width: 31px;
  height: 31px;
  position: absolute;
  left: 12px;
  top: 16px;
  object-fit: contain;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #242424;
  text-align: center;
  margin-bottom: 0.5rem;
  font-family: 'Gmarket Sans TTF', sans-serif;
  font-weight: 300;
  letter-spacing: 1.05px;
`;

const TeamInfo = styled.p`
  font-size: 12px;
  color: #DBDBDB;
  text-align: center;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  margin-top: 2rem;
`;

const OnboardingImage = styled.img`
  width: 390px;
  height: 315px;
  margin-bottom: 2rem;
`;

// 구글 로그인 버튼 스타일
const GoogleButton = styled.button`
  background-color: white;
  border: 1px solid #dadce0;
  border-radius: 4px;
  color: #3c4043;
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 40px;
  letter-spacing: 0.25px;
  outline: none;
  padding: 0 12px;
  position: relative;
  text-align: center;
  transition: background-color .218s, border-color .218s, box-shadow .218s;
  vertical-align: middle;
  white-space: nowrap;
  width: auto;
  min-width: 240px;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  
  &:hover {
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }
  
  &:active {
    background-color: #eeeeee;
  }
`;

const GoogleIcon = styled.div`
  margin-right: 12px;
  height: 18px;
  width: 18px;
`;

const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // 구글 로그인 로직 구현
    navigate('/login');
  };

  return (
    <OnboardingContainer>
      <LogoImage src="/khud_logo.png" alt="KHUD 로고" />
      <OnboardingImage src="/onboarding.png" alt="온보딩 이미지" />
      <Title>당신은 한국어를 <br/>얼마나 잘 사용하고 계신가요?</Title>
      <GoogleButton onClick={handleGoogleLogin}>
        <GoogleIcon>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block', width: '18px', height: '18px' }}>
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </svg>
        </GoogleIcon>
        Google로 로그인
      </GoogleButton>
      <TeamInfo>정유진 박정식 박지연 오찬세<br/>오종현 지민석 최예지 한지훈</TeamInfo>
    </OnboardingContainer>
  );
};

export default Onboarding; 