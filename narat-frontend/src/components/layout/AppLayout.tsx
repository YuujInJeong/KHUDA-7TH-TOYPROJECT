import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BarChart2, Lightbulb, User } from 'lucide-react';
import { AuthContext } from '@/context/AuthContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const goToPage = (path: string) => {
    navigate(path);
  };
  
  // 현재 활성화된 경로인지 확인
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  if (!user?.isAuthenticated) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* 상단 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-700">나랏말씀</h1>
          <button className="text-gray-600 hover:text-gray-800 rounded-full overflow-hidden">
            <img 
              src="https://via.placeholder.com/32" 
              alt="User Profile" 
              className="w-8 h-8 rounded-full" 
            />
          </button>
        </div>
      </header>
      
      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      
      {/* 하단 네비게이션 */}
      <footer className="bg-white shadow-md border-t border-gray-200 fixed bottom-0 w-full">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-around">
            <button 
              className={`font-medium text-sm flex flex-col items-center ${
                isActive('/study') ? 'text-indigo-600' : 'text-gray-500'
              }`}
              onClick={() => goToPage('/study')}
            >
              <Home size={20} className="mb-1" />
              홈
            </button>
            <button 
              className={`font-medium text-sm flex flex-col items-center ${
                isActive('/statistics') ? 'text-indigo-600' : 'text-gray-500'
              }`}
              onClick={() => goToPage('/statistics')}
            >
              <BarChart2 size={20} className="mb-1" />
              통계
            </button>
            <button 
              className={`font-medium text-sm flex flex-col items-center ${
                isActive('/recommendations') ? 'text-indigo-600' : 'text-gray-500'
              }`}
              onClick={() => goToPage('/recommendations')}
            >
              <Lightbulb size={20} className="mb-1" />
              추천
            </button>
            <button 
              className={`font-medium text-sm flex flex-col items-center ${
                isActive('/profile') ? 'text-indigo-600' : 'text-gray-500'
              }`}
              onClick={() => goToPage('/profile')}
            >
              <User size={20} className="mb-1" />
              프로필
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;