/**
 * AnswerBoxPage.jsx
 * A focused "Zen Mode" sandbox page for practicing answers to specific questions.
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AnswerBoxPage = () => {
  const [answer, setAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim()) {
      alert('Answer submitted for evaluation!');
      // Add AI Evaluation logic here
      setAnswer('');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans py-12 transition-colors duration-300 flex flex-col items-center justify-center"
    >
      <div className="max-w-3xl w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-semibold mb-4 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Focus Mode
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Practice Sandbox
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Write or record your answer in a distraction-free environment.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-10 relative overflow-hidden group hover:border-blue-500 dark:hover:border-blue-500 transition-colors duration-500">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500 opacity-5 dark:opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-500"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 bg-purple-500 opacity-5 dark:opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <label htmlFor="sandbox-answer" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                Your Answer
              </label>
              <button
                type="button"
                onClick={() => setIsRecording(!isRecording)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all shadow-sm border ${isRecording ? 'bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:border-red-800' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'}`}
              >
                <div className={`w-2.5 h-2.5 rounded-full ${isRecording ? 'bg-red-600 animate-pulse' : 'bg-slate-400 dark:bg-slate-500'}`}></div>
                {isRecording ? 'Recording...' : 'Use Voice'}
              </button>
            </div>
            
            <textarea
              id="sandbox-answer"
              rows="10"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all text-lg leading-relaxed shadow-inner"
              placeholder="Start typing your response here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            
            <div className="mt-8 flex items-center justify-between">
              <button 
                type="button"
                onClick={() => navigate(-1)}
                className="text-sm font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!answer.trim()}
                className="px-10 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 dark:disabled:bg-slate-800 dark:disabled:text-slate-600 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2"
              >
                Evaluate Answer
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AnswerBoxPage;