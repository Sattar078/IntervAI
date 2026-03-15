import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutUsPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans py-16 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">IntervAI</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          We are on a mission to democratize technical interview preparation. Our AI-driven platform empowers developers worldwide to practice smarter, build confidence, and land their dream jobs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-16">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center text-2xl mb-6">
              🚀
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Our Mission</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              To provide accessible, high-quality, real-time interview feedback to everyone. We believe that with the right preparation tools, anyone can overcome interview anxiety and showcase their true potential.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center text-2xl mb-6">
              🤖
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Our Technology</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Our intelligent interview platform dynamically generates tailored technical questions, analyzes your responses, and provides actionable insights just like a real senior engineering manager would.
            </p>
          </div>
        </div>

        <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1">
          Join the Platform Today
        </Link>
      </div>
    </motion.div>
  );
};

export default AboutUsPage;