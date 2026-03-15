/**
 * App.jsx
 * Main application entry point and router configuration.
 * Wraps the application in global layout components and manages page transitions.
 */
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { AnimatePresence, motion } from 'framer-motion';
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

  // Splash Screen State (Only show on mobile screens initially)
  const [showSplash, setShowSplash] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    if (showSplash) {
      const splashTimer = setTimeout(() => {
        setShowSplash(false);
      }, 5000); // 5 seconds
      return () => clearTimeout(splashTimer);
    }
  }, [showSplash]);

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
      {/* Mobile Splash Screen Overlay */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-blue-900/60 backdrop-blur-2xl md:hidden"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring", bounce: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center text-white font-extrabold text-5xl shadow-2xl mb-6 ring-4 ring-white/20">
                AI
              </div>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-4xl font-extrabold text-white tracking-tight drop-shadow-lg"
              >
                IntervAI
              </motion.h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global layout wrapper for screen height and flex column structure */}
      <div className="min-h-screen flex flex-col">
      
      {/* Desktop Navbar */}
      {showLayout && <div className="hidden md:block"><Navbar /></div>}

      {/* Mobile Top Navbar (PWA) */}
      {showLayout && (
        <div className="md:hidden sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              AI
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">IntervAI</span>
          </Link>
          {deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-1.5 rounded shadow-sm transition-colors"
            >
              Install
            </button>
          )}
        </div>
      )}
      
      {/* Custom PWA Install Modal */}
      {showInstallPrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Install App</h3>
            <p className="text-gray-600 mb-6">
              Install IntervAI on your device for quick access and a better experience!
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
      <div className="flex-1 pb-16 md:pb-0">
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

        {/* Desktop Floating Install Button */}
        {deferredPrompt && showLayout && (
          <div className="hidden md:block fixed bottom-8 right-8 z-[100]">
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-full shadow-2xl font-bold transition-transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              Install App
            </button>
          </div>
        )}
      </div>
      
      {/* Desktop Footer */}
      {showLayout && <div className="hidden md:block"><Footer /></div>}

      {/* Mobile Bottom Navigation (PWA) */}
      {showLayout && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex justify-around items-center h-16 pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
          <Link to="/home" className={`flex flex-col items-center justify-center w-full h-full ${location.pathname === '/home' ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-500'}`}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-[10px] mt-1 font-medium">Home</span>
          </Link>
          <Link to="/interview" className={`flex flex-col items-center justify-center w-full h-full ${location.pathname === '/interview' ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-500'}`}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <span className="text-[10px] mt-1 font-medium">Interview</span>
          </Link>
          <Link to="/profile" className={`flex flex-col items-center justify-center w-full h-full ${location.pathname === '/profile' ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-500'}`}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-[10px] mt-1 font-medium">Profile</span>
          </Link>
        </div>
      )}
      </div>
    </AuthProvider>
  );
};

export default App