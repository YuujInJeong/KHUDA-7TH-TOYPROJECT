// src/routes.tsx
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import Statistics from './pages/Statistics';
import Loading from './pages/Loading';
import NotFound from './pages/NotFound';
import Logout from './pages/Logout';
import { useAuth } from './context/AuthContext';
import { UserProfileForm } from './components/auth/UserProfileForm';

// 인증이 필요한 라우트를 위한 컴포넌트
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    // 로그인 페이지로 리다이렉트하면서 현재 페이지 정보를 state로 전달
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// 이미 인증된 사용자가 접근하면 대시보드로 리다이렉트하는 컴포넌트
interface PublicOnlyRouteProps {
  children: React.ReactNode;
}

const PublicOnlyRoute: React.FC<PublicOnlyRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  // 로그인 페이지나 회원가입 페이지에서 state로 전달된 from이 있으면 해당 페이지로 리다이렉트
  const from = location.state?.from?.pathname || '/dashboard';

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* 퍼블릭 라우트 - 인증 필요 없음 */}
      <Route path="/" element={
        <PublicOnlyRoute>
          <Onboarding />
        </PublicOnlyRoute>
      } />
      <Route path="/login" element={
        <PublicOnlyRoute>
          <Login />
        </PublicOnlyRoute>
      } />
      <Route path="/loading" element={<Loading />} />
      <Route path="/notfound" element={<NotFound />} />

      {/* 보호된 라우트 - 인증 필요 */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/quiz" element={
        <ProtectedRoute>
          <Quiz />
        </ProtectedRoute>
      } />
      <Route path="/statistics" element={
        <ProtectedRoute>
          <Statistics />
        </ProtectedRoute>
      } />
      <Route path="/logout" element={
        <ProtectedRoute>
          <Logout />
        </ProtectedRoute>
      } />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            {user && (
              <UserProfileForm
                user={user}
                onSubmit={() => console.log('프로필 업데이트')}
              />
            )}
          </ProtectedRoute>
        }
      />

      {/* 없는 경로는 NotFound 페이지로 리다이렉트 */}
      <Route path="*" element={<Navigate to="/notfound" replace />} />
    </Routes>
  );
};

export default AppRoutes;