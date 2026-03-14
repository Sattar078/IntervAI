/**
 * RecentPerformancePage.jsx
 * Renders a full tabular history of all past interview sessions.
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RecentPerformancePage = () => {
  // Mock data representing previous evaluations fetched from the backend
  const initialSessions = [
    { id: 1, role: 'React Developer (Intermediate)', date: '2 days ago', score: 8.2, questions: 5, time: '14m 30s', tag: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    { id: 2, role: 'Backend Engineer (Beginner)', date: '5 days ago', score: 7.8, questions: 5, time: '12m 15s', tag: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
    { id: 3, role: 'HR & Behavioral', date: '1 week ago', score: 6.5, questions: 3, time: '8m 45s', tag: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
    { id: 4, role: 'System Design (Advanced)', date: '2 weeks ago', score: 9.1, questions: 4, time: '22m 10s', tag: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
    { id: 5, role: 'Frontend Developer (Beginner)', date: '3 weeks ago', score: 7.2, questions: 5, time: '15m 00s', tag: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  ];

  const additionalSessions = [
    { id: 6, role: 'Full Stack Engineer (Intermediate)', date: '1 month ago', score: 8.5, questions: 6, time: '18m 20s', tag: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' },
    { id: 7, role: 'React Developer (Beginner)', date: '1 month ago', score: 6.8, questions: 4, time: '10m 05s', tag: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    { id: 8, role: 'Database Administrator', date: '2 months ago', score: 8.9, questions: 5, time: '16m 40s', tag: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
  ];

  const [sessions, setSessions] = useState(initialSessions);
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = () => {
    setSessions(prev => [...prev, ...additionalSessions]);
    setHasMore(false); // Hide the button after loading the dummy batch
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans py-12 transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <Link to="/home" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline mb-2 inline-block">&larr; Back to Dashboard</Link>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Performance History</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Review your past mock interviews and track your progress over time.</p>
          </div>
          <button className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-shadow">
            Export Report (PDF)
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <th className="p-5 font-bold">Interview Track</th>
                  <th className="p-5 font-bold">Date</th>
                  <th className="p-5 font-bold">Details</th>
                  <th className="p-5 font-bold text-right">Score</th>
                  <th className="p-5 font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {sessions.map((session) => (
                  <tr key={session.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider mb-2 inline-block ${session.tag}`}>
                        {session.role.split(' ')[0]}
                      </span>
                      <p className="font-bold text-slate-900 dark:text-white">{session.role}</p>
                    </td>
                    <td className="p-5 text-slate-600 dark:text-slate-400 font-medium">
                      {session.date}
                    </td>
                    <td className="p-5 text-sm text-slate-500 dark:text-slate-400">
                      {session.questions} Qs &bull; {session.time}
                    </td>
                    <td className="p-5 text-right">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-100 dark:border-slate-800">
                        <span className={`font-black ${session.score >= 8 ? 'text-emerald-500' : session.score >= 7 ? 'text-blue-500' : 'text-amber-500'}`}>
                          {session.score}
                        </span>
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <Link to="/review" state={{ session }} className="text-blue-600 dark:text-blue-400 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity hover:underline">
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {hasMore ? (
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-center transition-colors">
              <button onClick={handleLoadMore} className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                Load More Sessions &darr;
              </button>
            </div>
          ) : (
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-center">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-500">No more sessions to load.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default RecentPerformancePage;