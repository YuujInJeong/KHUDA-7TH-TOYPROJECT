import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GoogleLogin from './components/auth/GoogleLogin';
import { UserProfileForm } from './components/auth/UserProfileForm';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<GoogleLogin />} />
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
    </Routes>
  );
};

export default AppRoutes; 