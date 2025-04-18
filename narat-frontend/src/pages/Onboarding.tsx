import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

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

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const decoded: any = jwtDecode(credentialResponse.credential);
      
      // 백엔드로 구글 토큰 전송
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential: credentialResponse.credential,
          email: decoded.email,
          name: decoded.name,
          picture: decoded.picture
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem('token', data.token);
        // 로그인 성공 후 메인 페이지로 이동
        navigate('/main');
      } else {
        console.error('로그인 실패');
      }
    } catch (error) {
      console.error('로그인 처리 중 오류 발생:', error);
    }
  };

  const handleGoogleError = () => {
    console.error('Google 로그인 실패');
  };

  return (
    <OnboardingContainer>
      <LogoImage src="/khud_logo.png" alt="KHUD 로고" />
      <OnboardingImage src="/onboarding.png" alt="온보딩 이미지" />
      <Title>당신은 한국어를 <br/>얼마나 잘 사용하고 계신가요?</Title>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        useOneTap
        theme="filled_blue"
        size="large"
        width="240"
        text="signin_with"
        shape="rectangular"
        logo_alignment="left"
        locale="ko"
      />
      <TeamInfo>정유진 박정식 박지연 오찬세<br/>오종현 지민석 최예지 한지훈</TeamInfo>
    </OnboardingContainer>
  );
};

export default Onboarding; 