/**
 * ReviewPage.jsx
 * Displays a detailed breakdown of a past interview session, including
 * the questions asked, the user's answers, and the AI's specific feedback.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve session data passed from the routing state, or use a fallback
  const session = location.state?.session || { role: 'React Developer (Intermediate)', score: 8.2, date: 'Recent' };

  // Mock detailed Q&A data for the review
  const reviewData = [
    {
      id: 1,
      question: "What is the difference between SQL and NoSQL databases?",
      answer: "SQL databases are relational and use tables with fixed schemas. NoSQL databases are non-relational and can be document-based, key-value, or graph-based, making them more flexible for unstructured data.",
      feedback: {
        score: 8.5,
        strengths: "Good general overview and correctly identified the core structural differences.",
        weaknesses: "Could have mentioned specific use cases or ACID properties.",
        improvementSuggestion: "Try to mention scalability differences, such as vertical vs horizontal scaling, for a more complete answer."
      }
    },
    {
      id: 2,
      question: "Explain the concept of middleware in Express.js.",
      answer: "Middleware functions are functions that have access to the request and response objects. They can modify these objects, end the request-response cycle, or call the next middleware.",
      feedback: {
        score: 9.0,
        strengths: "Accurate and concise definition of the middleware lifecycle.",
        weaknesses: "Didn't provide an example of built-in or custom middleware.",
        improvementSuggestion: "Give a quick example, like `app.use(express.json())` or how it is used for authentication checking."
      }
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans py-12 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <button onClick={() => navigate(-1)} className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-flex items-center gap-2">
              &larr; Back to History
            </button>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Session Review</h1>
            <p className="text-slate-600 dark:text-slate-400 font-medium">{session.role} • {session.date}</p>
          </div>
          <div className="flex items-center gap-4 bg-white dark:bg-slate-900 px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-500">Overall Score</span>
            <span className={`text-3xl font-black ${session.score >= 8 ? 'text-emerald-500' : 'text-amber-500'}`}>{session.score}</span>
          </div>
        </div>

        {/* Q&A List */}
        <div className="space-y-8">
          {reviewData.map((item, index) => (
            <div key={item.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="mb-6">
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 block">Question {index + 1}</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-relaxed">{item.question}</h3>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 mb-6">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Your Answer</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{item.answer}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                  <h4 className="font-bold text-emerald-800 dark:text-emerald-400 mb-1 text-sm">Strengths</h4>
                  <p className="text-emerald-700 dark:text-emerald-300 text-sm">{item.feedback.strengths}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30">
                  <h4 className="font-bold text-blue-800 dark:text-blue-400 mb-1 text-sm">To Improve</h4>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">{item.feedback.improvementSuggestion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewPage;