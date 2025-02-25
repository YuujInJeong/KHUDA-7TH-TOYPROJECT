import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import { loginWithGoogle } from '@/api/auth';
import Button from '@/components/common/Button';

// 테스트용 토큰 (실제 구현에서는 Google OAuth 인증을 사용해야 함)
const TEST_TOKEN = 'test-google-token';

const GoogleLogin: React.FC = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      
      // 실제 구현에서는 Google OAuth 인증 과정을 통해 access_token을 획득해야 함
      // 여기서는 테스트용 토큰 사용
      const response = await loginWithGoogle({ access_token: TEST_TOKEN });
      
      if (response.session_token) {
        // 세션 토큰 저장
        localStorage.setItem('session_token', response.session_token);
        
        // 사용자 정보 업데이트
        setUser({
          displayName: response.display_name,
          studyLevel: response.study_level,
          isAuthenticated: true
        });
        
        // 학습 페이지로 이동
        navigate('/study');
      } else {
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Button
      variant="outline"
      fullWidth
      onClick={handleGoogleLogin}
      isLoading={isLoading}
      className="flex items-center justify-center border border-gray-300 py-3"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" className="mr-2">
        <g transform="translate(0.000000,20.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
          <path d="M92 178 c-19 -19 -14 -55 9 -68 37 -19 75 29 52 67 -14 22 -43 23
          -61 1z"/>
          <path d="M37 126 c-9 -22 2 -55 30 -84 l25 -27 -27 -3 c-22 -2 -26 -8 -23 -28
          3 -21 9 -24 48 -24 36 0 50 5 70 26 14 14 28 35 31 46 4 15 0 18 -19 18 -18 0
          -21 -3 -12 -12 9 -9 5 -12 -16 -12 -23 0 -25 2 -14 11 10 8 17 9 22 3 4 -7 15
          -8 28 -4 24 9 25 21 5 52 -11 18 -11 24 0 40 12 15 12 20 0 33 -8 8 -15 11
          -15 6 0 -5 -18 -9 -40 -9 -22 0 -40 4 -40 9 0 5 -6 3 -14 -4 -11 -9 -15 -9
          -19 0 -9 23 -31 11 -40 -21 -5 -17 -4 -26 3 -26 6 0 10 4 10 9 0 17 27 22 33
          6 4 -11 1 -15 -10 -15 -9 0 -13 -4 -10 -10 3 -5 1 -10 -6 -10 -10 0 -9 -5 2
          -21 18 -24 9 -22 -23 7 -16 14 -22 30 -19 47 3 19 0 27 -10 27 -8 0 -17 -7
          -20 -16z m83 -36 c0 -5 -2 -10 -4 -10 -3 0 -8 5 -11 10 -3 6 -1 10 4 10 6 0
          11 -4 11 -10z m48 -17 c2 -6 -7 -13 -19 -15 -15 -2 -24 2 -24 11 0 18 37 21
          43 4z"/>
          <path d="M114 106 c-3 -8 -4 -25 -2 -38 3 -20 8 -23 43 -23 25 0 43 6 47 14 4
          9 5 6 3 -6 -3 -15 -15 -24 -40 -30 -32 -8 -35 -11 -28 -34 l7 -24 33 3 c29 3
          35 8 40 33 4 17 7 44 7 60 0 17 5 29 11 29 8 0 8 4 0 14 -13 16 -113 18 -121
          2z"/>
        </g>
      </svg>
      Google로 로그인
    </Button>
  );
};

export default GoogleLogin;