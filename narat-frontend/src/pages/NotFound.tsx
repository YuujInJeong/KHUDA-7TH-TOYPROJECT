import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotFoundContainer = styled.div`
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
  left: 170px;
  top: 19px;
`;

const Title = styled.span`
  color: black;
  font-size: 28px;
  font-family: Gmarket Sans TTF;
  font-weight: 700;
  word-wrap: break-word;
  position: absolute;
  top: 580px;
  text-align: center;
`;

const BackLink = styled(Link)`
  color: #3C3A3A;
  font-size: 15px;
  font-family: Gmarket Sans TTF;
  font-weight: 500;
  word-wrap: break-word;
  text-decoration: none;
  position: absolute;
  left: 43px;
  bottom: 43px;
`;

const NotFoundImage = styled.img`
  width: 387px;
  height: 258px;
  position: absolute;
  left: 3px;
  top: 297px;
`;

const NotFound: React.FC = () => {
  return (
    <NotFoundContainer>
      <Logo src="/onboarding.png" alt="로고" />
      <NotFoundImage src="/notfound.png" alt="404 이미지" />
      <Title>잘못 찾아왔네</Title>
      <BackLink to="/">처음으로</BackLink>
    </NotFoundContainer>
  );
};

export default NotFound; 