import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import { logout } from '@/api/auth';
import { Book, BarChart2, User, LogOut, Award } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);
  const location = useLocation();

  const handleLogout = async () => {
    const sessionToken = localStorage.getItem('session_token');
    if (sessionToken) {
      try {
        await logout({ session_token: sessionToken });
        localStorage.removeItem('session_token');
        setUser(null);
      } catch (error) {
        console.error('로그아웃 중 오류 발생:', error);
      }
    }
  };

  // 현재 활성화된 페이지인지 확인하는 함수
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-indigo-700' : '';
  };

  if (!user?.isAuthenticated) {
    return null; // 로그인하지 않은 경우 네비게이션 바를 표시하지 않음
  }

  return (
    <nav className="bg-indigo-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* 로고 및 앱 이름 */}
          <div className="flex items-center">
            <span className="font-bold text-xl">NARAT</span>
          </div>

          {/* 내비게이션 링크 */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/study" 
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive('/study')}`}
            >
              <Book className="mr-1 h-5 w-5" />
              <span>학습</span>
            </Link>
            <Link 
              to="/recommendations" 
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive('/recommendations')}`}
            >
              <Award className="mr-1 h-5 w-5" />
              <span>추천</span>
            </Link>
            <Link 
              to="/statistics" 
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive('/statistics')}`}
            >
              <BarChart2 className="mr-1 h-5 w-5" />
              <span>통계</span>
            </Link>
            <Link 
              to="/profile" 
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive('/profile')}`}
            >
              <User className="mr-1 h-5 w-5" />
              <span>프로필</span>
            </Link>
          </div>

          {/* 사용자 정보 및 로그아웃 */}
          <div className="flex items-center">
            <span className="mr-4">{user.displayName}</span>
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              <LogOut className="mr-1 h-5 w-5" />
              <span className="hidden md:inline">로그아웃</span>
            </button>
          </div>
        </div>

        {/* 모바일 네비게이션 */}
        <div className="md:hidden flex justify-around py-2 border-t border-indigo-500">
          <Link 
            to="/study" 
            className={`flex flex-col items-center p-2 rounded-md ${isActive('/study')}`}
          >
            <Book className="h-5 w-5" />
            <span className="text-xs">학습</span>
          </Link>
          <Link 
            to="/recommendations" 
            className={`flex flex-col items-center p-2 rounded-md ${isActive('/recommendations')}`}
          >
            <Award className="h-5 w-5" />
            <span className="text-xs">추천</span>
          </Link>
          <Link 
            to="/statistics" 
            className={`flex flex-col items-center p-2 rounded-md ${isActive('/statistics')}`}
          >
            <BarChart2 className="h-5 w-5" />
            <span className="text-xs">통계</span>
          </Link>
          <Link 
            to="/profile" 
            className={`flex flex-col items-center p-2 rounded-md ${isActive('/profile')}`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs">프로필</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;