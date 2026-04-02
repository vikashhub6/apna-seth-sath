import { createBrowserRouter } from 'react-router-dom';
import Layout from '../shared/Layout';
import ProtectedRoute from './ProtectedRoute';

// Auth Pages
import LoginPage from '../features/auth/pages/LoginPage';
import SignupPage from '../features/auth/pages/SignupPage';

// Feature Pages
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import DoctorsPage from '../features/doctors/pages/DoctorsPage';
import EmergencyPage from '../features/emergency/pages/EmergencyPage';
import FeedPage from '../features/feed/pages/FeedPage';
import SchemesPage from '../features/schemes/pages/SchemesPage';
import AwarenessPage from '../features/awareness/pages/AwarenessPage';
import ChatbotPage from '../features/chatbot/pages/ChatbotPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/doctors',
        element: (
          <ProtectedRoute>
            <DoctorsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/emergency',
        element: (
          <ProtectedRoute>
            <EmergencyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/feed',
        element: (
          <ProtectedRoute>
            <FeedPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/schemes',
        element: (
          <ProtectedRoute>
            <SchemesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/awareness',
        element: (
          <ProtectedRoute>
            <AwarenessPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/chatbot',
        element: (
          <ProtectedRoute>
            <ChatbotPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
]);
