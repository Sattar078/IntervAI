import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicyPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans py-16 transition-colors duration-300"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-sm text-slate-500 mb-8">Last updated: October 2023</p>
          
          <h3 className="text-xl font-bold mb-4">1. Information We Collect</h3>
          <p className="mb-6 text-slate-600 dark:text-slate-400 leading-relaxed">
            When you register for an account, we collect personal information such as your name and email address. When you use our mock interview tools, we temporarily process your resume text and audio input to generate AI feedback. We do not permanently store your resume text unless you opt-in to save your session history.
          </p>
          
          <h3 className="text-xl font-bold mb-4">2. How We Use AI</h3>
          <p className="mb-6 text-slate-600 dark:text-slate-400 leading-relaxed">
            Our platform uses intelligent algorithms to process your interview questions and answers to generate evaluation metrics and personalized feedback. We process your data securely and do not use your private interview answers to train our own models.
          </p>

          <h3 className="text-xl font-bold mb-4">3. Data Security</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We implement a variety of security measures to maintain the safety of your personal information. Your account data is encrypted and protected behind secure networks, accessible only by a limited number of persons who have special access rights to such systems.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicyPage;