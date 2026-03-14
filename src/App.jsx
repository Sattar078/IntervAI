/**
 * App.jsx
 * Main application entry point and router configuration.
 * Wraps the application in global layout components and manages page transitions.
 */
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import InterviewPage from './pages/InterviewPage';
import RecentPerformancePage from './pages/RecentPerformancePage';
import AnswerBoxPage from './pages/AnswerBoxPage';
import SystemDesignPage from './pages/SystemDesignPage';
import StateManagementPage from './pages/StateManagementPage';
import BehavioralPage from './pages/BehavioralPage';
import ReviewPage from './pages/ReviewPage';
import TopReactQuestionsPage from './pages/TopReactQuestionsPage';
import StarMethodGuide from './pages/StarMethodGuide';
import AboutUsPage from './pages/AboutUsPage';
import CareersPage from './pages/CareersPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import NotificationsPage from './pages/NotificationsPage';

const App = () => {
  const location = useLocation();
  
  // Define routes where the Navbar and Footer should be hidden
  const hideLayoutRoutes = ['/login', '/register'];
  const showLayout = !hideLayoutRoutes.includes(location.pathname);

  return (
    <AuthProvider>
      {/* Global layout wrapper for screen height and flex column structure */}
      <div className="min-h-screen flex flex-col">
      {showLayout && <Navbar />}
      {/* Main content wrapper pushes the footer to the bottom */}
      <div className="flex-1">
        {/* AnimatePresence enables Framer Motion exit/enter animations */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Authenticated/App Routes */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/interview" element={<InterviewPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/performance" element={<RecentPerformancePage />} />
            <Route path="/answer-box" element={<AnswerBoxPage />} />
            <Route path="/system-design" element={<SystemDesignPage />} />
            <Route path="/state-management" element={<StateManagementPage />} />
            <Route path="/behavioral" element={<BehavioralPage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/resources/react-50" element={<TopReactQuestionsPage />} />
            <Route path="/resources/star-method" element={<StarMethodGuide />} />
            {/* Company / Legal Routes */}
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
          </Routes>
        </AnimatePresence>
      </div>
      {showLayout && <Footer />}
      </div>
    </AuthProvider>
  );
};

export default App