import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300 flex flex-col"
    >
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-semibold mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          AI Powered Interview Platform
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl text-slate-900 dark:text-white">
          Master your next interview with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">AI feedback</span>.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Practice role-specific questions, speak your answers, and get instant, actionable feedback from an expert AI technical interviewer. Build your confidence today.
        </p>
        
        <Link 
          to="/register" 
          className="px-8 py-4 bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-gray-200 dark:text-slate-900 text-white text-lg font-bold rounded-2xl shadow-lg transition-all transform hover:-translate-y-1"
        >
          Start Your Free Session
        </Link>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto text-left">
          <div className="bg-white dark:bg-slate-800/50 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 hover:animate-glow transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 flex items-center justify-center rounded-xl text-2xl mb-6">🎯</div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Tailored Questions</h3>
            <p className="text-slate-600 dark:text-slate-400">Questions adapted to your desired role, difficulty level, and even directly from your uploaded resume.</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800/50 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 hover:animate-glow transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 flex items-center justify-center rounded-xl text-2xl mb-6">⚡</div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Real-time Evaluation</h3>
            <p className="text-slate-600 dark:text-slate-400">Receive an immediate 1-10 score alongside deep analysis of your strengths and specific areas to improve.</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800/50 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 hover:animate-glow transition-shadow">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 text-purple-600 flex items-center justify-center rounded-xl text-2xl mb-6">📈</div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Track Progress</h3>
            <p className="text-slate-600 dark:text-slate-400">Monitor your performance over time with a unified confidence score and an executive summary of your skills.</p>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default LandingPage;