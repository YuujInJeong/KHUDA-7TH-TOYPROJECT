import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalStyles } from './styles/globalStyles';

// Components
import GoogleLogin from './components/auth/GoogleLogin';
import UserProfileForm from './components/auth/UserProfileForm';
import QuestionCard from './components/study/QuestionCard';
import AnswerSubmission from './components/study/AnswerSubmission';
import StudyHistory from './components/study/StudyHistory';
import QuestionStats from './components/statistics/QuestionStats';
import UserStats from './components/statistics/UserStats';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Routes>
          <Route path="/login" element={<GoogleLogin />} />
          <Route path="/profile" element={<UserProfileForm />} />
          <Route path="/study" element={<QuestionCard />} />
          <Route path="/answer" element={<AnswerSubmission />} />
          <Route path="/history" element={<StudyHistory />} />
          <Route path="/stats/questions" element={<QuestionStats />} />
          <Route path="/stats/user" element={<UserStats />} />
        </Routes>
      </AppContainer>
    </>
  );
};

export default App;