import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TopReactQuestionsPage = () => {
  const questions = [
    { id: 1, q: "What is the Virtual DOM and how does React use it?", level: "Beginner" },
    { id: 2, q: "Explain the difference between functional and class components.", level: "Beginner" },
    { id: 3, q: "What are React Hooks? Name a few common ones.", level: "Beginner" },
    { id: 4, q: "What is JSX?", level: "Beginner" },
    { id: 5, q: "How do you pass data from a parent to a child component?", level: "Beginner" },
    { id: 6, q: "What is the purpose of the 'key' prop when rendering lists?", level: "Beginner" },
    { id: 7, q: "What is state in React?", level: "Beginner" },
    { id: 8, q: "How do you handle events in React?", level: "Beginner" },
    { id: 9, q: "What is the useState hook?", level: "Beginner" },
    { id: 10, q: "What is the difference between state and props?", level: "Beginner" },
    { id: 11, q: "How do you conditionally render components in React?", level: "Beginner" },
    { id: 12, q: "What is a controlled component?", level: "Beginner" },
    { id: 13, q: "What is React DOM?", level: "Beginner" },
    { id: 14, q: "What is the component lifecycle?", level: "Beginner" },
    { id: 15, q: "How do you handle forms in React?", level: "Beginner" },
    { id: 16, q: "How does the useEffect hook work and what are its dependencies?", level: "Intermediate" },
    { id: 17, q: "What is prop drilling and how can you avoid it?", level: "Intermediate" },
    { id: 18, q: "Explain the concept of Higher-Order Components (HOCs).", level: "Intermediate" },
    { id: 19, q: "What is Context API and when should you use it over Redux?", level: "Intermediate" },
    { id: 20, q: "What are fragments in React?", level: "Intermediate" },
    { id: 21, q: "What is the useRef hook and when would you use it?", level: "Intermediate" },
    { id: 22, q: "What is the useReducer hook?", level: "Intermediate" },
    { id: 23, q: "How do you optimize performance in a React application?", level: "Intermediate" },
    { id: 24, q: "What is strict mode in React?", level: "Intermediate" },
    { id: 25, q: "Explain the concept of lazy loading in React.", level: "Intermediate" },
    { id: 26, q: "What is React Router and how does it work?", level: "Intermediate" },
    { id: 27, q: "How do you manage global state in a large application?", level: "Intermediate" },
    { id: 28, q: "What are pure components?", level: "Intermediate" },
    { id: 29, q: "What are error boundaries?", level: "Intermediate" },
    { id: 30, q: "How do you test React components?", level: "Intermediate" },
    { id: 31, q: "What is custom hook and why would you create one?", level: "Intermediate" },
    { id: 32, q: "Explain the concept of render props.", level: "Intermediate" },
    { id: 33, q: "What is the difference between synthetic events and native events?", level: "Intermediate" },
    { id: 34, q: "How do you handle routing with dynamic parameters?", level: "Intermediate" },
    { id: 35, q: "What is the useLayoutEffect hook?", level: "Intermediate" },
    { id: 36, q: "How does React Fiber improve performance?", level: "Advanced" },
    { id: 37, q: "Explain the differences between useMemo and useCallback.", level: "Advanced" },
    { id: 38, q: "What are React Server Components and how do they differ from SSR?", level: "Advanced" },
    { id: 39, q: "Explain React's reconciliation algorithm.", level: "Advanced" },
    { id: 40, q: "How do you implement code splitting in a React app?", level: "Advanced" },
    { id: 41, q: "What is hydration in Server-Side Rendering (SSR)?", level: "Advanced" },
    { id: 42, q: "Explain the concept of concurrent mode in React.", level: "Advanced" },
    { id: 43, q: "How do you handle memory leaks in React applications?", level: "Advanced" },
    { id: 44, q: "What is Redux middleware and how does Redux Thunk work?", level: "Advanced" },
    { id: 45, q: "Explain the differences between React.memo and useMemo.", level: "Advanced" },
    { id: 46, q: "How do you prevent unnecessary re-renders?", level: "Advanced" },
    { id: 47, q: "What are portals in React?", level: "Advanced" },
    { id: 48, q: "How do you implement authentication in a React application?", level: "Advanced" },
    { id: 49, q: "Explain the architecture of a Next.js application.", level: "Advanced" },
    { id: 50, q: "What are the limitations of React?", level: "Advanced" },
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
        <Link to="/home" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block">&larr; Back to Dashboard</Link>
        
        <div className="flex items-center gap-6 mb-10">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center rounded-2xl text-4xl shadow-sm flex-shrink-0">
            📘
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Top 50 React Questions</h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">The ultimate cheat sheet for mastering your next frontend interview.</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-10">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 dark:text-slate-200">Question Bank</h3>
            <span className="text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400 px-3 py-1 rounded-full">All 50 Questions</span>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {questions.map((item) => (
              <div key={item.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex gap-4 items-start">
                  <span className="text-slate-400 dark:text-slate-500 font-bold mt-0.5">{item.id}.</span>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.q}
                  </h4>
                </div>
                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg whitespace-nowrap ${
                  item.level === 'Beginner' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                  item.level === 'Intermediate' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                  'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                }`}>
                  {item.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link 
            to="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1"
          >
            Practice these in Mock Interview
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default TopReactQuestionsPage;