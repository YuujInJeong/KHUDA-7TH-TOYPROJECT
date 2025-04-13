import { createBrowserRouter } from 'react-router-dom';
import Loading from '../pages/Loading';
import NotFound from '../pages/NotFound';
import Onboarding from '../pages/Onboarding';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Quiz from '../pages/Quiz';
import CorrectModal from '../components/modals/CorrectModal';
import WrongModal from '../components/modals/WrongModal';
import QuitModal from '../components/modals/QuitModal';
import Logout from '../pages/Logout';
import QuizResultModal from '../components/modals/QuizResultModal';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Loading />,
  },
  {
    path: '/onboarding',
    element: <Onboarding />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/quiz',
    element: <Quiz />,
  },
  {
    path: '/logout',
    element: <Logout />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]); 