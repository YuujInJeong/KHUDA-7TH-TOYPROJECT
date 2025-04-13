import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/globalStyles';
import AppRoutes from './routes';

// Components
import GoogleLogin from './components/auth/GoogleLogin';
import { UserProfileForm } from './components/auth/UserProfileForm';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;