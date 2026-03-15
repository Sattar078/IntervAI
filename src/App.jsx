/**
 * App.jsx
 * Main application entry point and router configuration.
 * Wraps the application in global layout components and manages page transitions.
 */
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useRegisterSW } from 'virtual:pwa-register/react';
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
  
  // Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  // Service Worker Registration & PWA Updates
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegister(r) {
      console.log('SW Registered:', r);
    },
    onRegisterError(error) {
      console.error('SW Registration Error:', error);
    },
  });

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI to notify the user they can install the PWA
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the native install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    await deferredPrompt.userChoice;
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  // Define routes where the Navbar and Footer should be hidden
  const hideLayoutRoutes = ['/login', '/register'];
  const showLayout = !hideLayoutRoutes.includes(location.pathname);

  return (
    <AuthProvider>
      {/* Global layout wrapper for screen height and flex column structure */}
      <div className="min-h-screen flex flex-col">
      {showLayout && <Navbar />}
      
      {/* Custom PWA Install Modal */}
      {showInstallPrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Install App</h3>
            <p className="text-gray-600 mb-6">
              Install AI Interview Platform on your device for quick access and a better experience!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleInstallClick}
                className="bg-indigo-600 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-indigo-700 transition-colors w-full sm:w-auto"
              >
                Install
              </button>
              <button
                onClick={() => setShowInstallPrompt(false)}
                className="bg-gray-100 text-gray-800 font-semibold py-2.5 px-6 rounded-lg hover:bg-gray-200 transition-colors w-full sm:w-auto"
              >
                Not Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PWA Update / Offline Notifications */}
      {(offlineReady || needRefresh) && (
        <div className="bg-indigo-600 text-white px-4 py-3 flex justify-between items-center shadow-md text-sm sm:text-base">
          <span>
            {offlineReady
              ? 'App is ready to work offline!'
              : 'New content is available, click on reload button to update.'}
          </span>
          <div className="space-x-4">
            {needRefresh && (
              <button className="underline font-bold hover:text-indigo-200" onClick={() => updateServiceWorker(true)}>
                Reload
              </button>
            )}
            <button className="underline font-bold hover:text-indigo-200" onClick={() => { setOfflineReady(false); setNeedRefresh(false); }}>
              Close
            </button>
          </div>
        </div>
      )}

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