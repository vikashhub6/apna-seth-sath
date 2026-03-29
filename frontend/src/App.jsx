import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './features/auth/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Layout from './shared/Layout';

import LoginPage from './features/auth/pages/LoginPage';
import SignupPage from './features/auth/pages/SignupPage';
import DashboardPage from './features/product/pages/DashboardPage';
import FeedPage from './features/product/pages/FeedPage';
import DoctorsPage from './features/product/pages/DoctorsPage';
import SchemesPage from './features/product/pages/SchemesPage';
import EmergencyPage from './features/product/pages/EmergencyPage';
import AwarenessPage from './features/product/pages/AwarenessPage';
import ChatbotPage from './features/product/pages/ChatbotPage';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute><Layout><DashboardPage /></Layout></ProtectedRoute>
          } />
          <Route path="/feed" element={
            <ProtectedRoute><Layout><FeedPage /></Layout></ProtectedRoute>
          } />
          <Route path="/doctors" element={
            <ProtectedRoute><Layout><DoctorsPage /></Layout></ProtectedRoute>
          } />
          <Route path="/schemes" element={
            <ProtectedRoute><Layout><SchemesPage /></Layout></ProtectedRoute>
          } />
          <Route path="/emergency" element={
            <ProtectedRoute><Layout><EmergencyPage /></Layout></ProtectedRoute>
          } />
          <Route path="/awareness" element={
            <ProtectedRoute><Layout><AwarenessPage /></Layout></ProtectedRoute>
          } />
          <Route path="/chatbot" element={
            <ProtectedRoute><Layout><ChatbotPage /></Layout></ProtectedRoute>
          } />

          {/* Redirect root */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
