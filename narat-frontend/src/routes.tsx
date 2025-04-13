import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import Statistics from './pages/Statistics';
import Loading from './pages/Loading';
import NotFound from './pages/NotFound';
import { UserProfileForm } from './components/auth/UserProfileForm';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/notfound" element={<NotFound />} />
      <Route
        path="/profile"
        element={
          <UserProfileForm
            user={{
              id: 'temp-id',
              username: '임시 사용자',
              email: 'temp@example.com',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }}
            onSubmit={() => console.log('프로필 업데이트')}
          />
        }
      />
      <Route path="*" element={<Navigate to="/notfound" replace />} />
    </Routes>
  );
};

export default AppRoutes; 