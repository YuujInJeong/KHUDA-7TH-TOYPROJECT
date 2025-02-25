import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, LogOut } from 'lucide-react';
import { AuthContext } from '@/context/AuthContext';
import Button from '@/components/common/Button';
import { updateProfile, logout } from '@/api/auth';

const ProfilePage: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [displayName, setDisplayName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (user?.displayName) {
      setDisplayName(user.displayName);
    }
  }, [user]);
  
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const sessionToken = localStorage.getItem('session_token');
      if (sessionToken) {
        await logout({ session_token: sessionToken });
        localStorage.removeItem('session_token');
        setUser(null);
        navigate('/login');
      }
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSave = async () => {
    try {
      setIsLoading(true);
      const sessionToken = localStorage.getItem('session_token');
      if (sessionToken) {
        await updateProfile({
          session_token: sessionToken,
          display_name: displayName
        });
        
        // 사용자 정보 업데이트
        if (user) {
          setUser({
            ...user,
            displayName
          });
        }
        
        setIsEditing(false);
      }
    } catch (error) {
      console.error('프로필 업데이트 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-medium text-gray-800 mb-6">내 프로필</h2>
      
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
          <User size={36} className="text-indigo-600" />
        </div>
        
        {isEditing ? (
          <div className="w-full max-w-xs">
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="이름을 입력하세요"
            />
            <div className="flex justify-center mt-3 space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setDisplayName(user?.displayName || '');
                }}
              >
                취소
              </Button>
              <Button
                variant="primary"
                onClick={handleSave}
                isLoading={isLoading}
              >
                저장
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-1">{user?.displayName}</h3>
            <p className="text-gray-500 mb-3">학습 레벨: {user?.studyLevel || 1}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              프로필 수정
            </Button>
          </div>
        )}
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h3 className="font-medium text-gray-800 mb-4">계정 정보</h3>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <Mail size={18} className="text-gray-400 mr-2" />
            <span className="text-gray-600">연결된 계정: Google</span>
          </div>
          
          <Button
            variant="danger"
            onClick={handleLogout}
            fullWidth
            isLoading={isLoading}
            className="mt-6"
          >
            <LogOut size={18} className="mr-2" />
            로그아웃
          </Button>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6 mt-6">
        <h3 className="font-medium text-gray-800 mb-4">학습 통계</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">총 문제 수</p>
            <p className="text-xl font-bold text-indigo-600">0</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">정답률</p>
            <p className="text-xl font-bold text-indigo-600">0%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;