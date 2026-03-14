import React from 'react';
import { motion } from 'framer-motion';

const TermsOfServicePage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans py-16 transition-colors duration-300"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8">Terms of Service</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-sm text-slate-500 mb-8">Effective Date: October 2023</p>
          
          <h3 className="text-xl font-bold mb-4">1. Acceptance of Terms</h3>
          <p className="mb-6 text-slate-600 dark:text-slate-400 leading-relaxed">
            By accessing or using the IntervAI platform, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
          </p>
          
          <h3 className="text-xl font-bold mb-4">2. Use License</h3>
          <p className="mb-6 text-slate-600 dark:text-slate-400 leading-relaxed">
            We grant you a personal, non-exclusive, non-transferable license to use our AI mock interview tools for your personal career development. You may not attempt to reverse engineer the AI prompts, scrape questions, or use the service for automated commercial data generation.
          </p>

          <h3 className="text-xl font-bold mb-4">3. Disclaimer</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            The materials and feedback provided by the AI are for educational purposes only. IntervAI makes no warranties, expressed or implied, regarding your actual performance in real-world interviews or job placement outcomes.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TermsOfServicePage;