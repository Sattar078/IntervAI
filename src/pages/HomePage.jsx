import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Welcome back! 👋</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Ready to crush your next interview? Choose an option below to get started.</p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link to="/dashboard" className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center rounded-2xl text-2xl mb-6 group-hover:scale-110 transition-transform">
              🎯
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">Topic-Based Mock Interview</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Practice specific skills like React, Frontend, Backend, or Behavioral questions.</p>
            <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-2">
              Start Practice <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </span>
          </Link>

          <Link to="/dashboard" state={{ type: 'resume' }} className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center rounded-2xl text-2xl mb-6 group-hover:scale-110 transition-transform">
              📄
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">Resume-Based Interview</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Upload your resume and get grilled on your actual experience and projects.</p>
            <span className="text-purple-600 dark:text-purple-400 font-bold flex items-center gap-2">
              Upload Resume <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </span>
          </Link>
        </div>

        {/* Stats / History */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Recent Performance</h3>
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                  {/* Progress Circle (82% of 251.2 circumference = 205.98, Offset = 45.2) */}
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset="45.2" className="text-emerald-500 transition-all duration-1000 ease-out" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">8.2</span>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Average Score</h4>
                <p className="text-slate-500 dark:text-slate-400">Based on your recent sessions</p>
              </div>
            </div>
            <div className="w-full md:w-auto flex-1 max-w-md space-y-4">
              <div>
                <div className="flex justify-between text-sm font-bold mb-1">
                  <span className="text-slate-600 dark:text-slate-300">Technical Accuracy</span>
                  <span className="text-emerald-600 dark:text-emerald-400">82%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000 ease-out" style={{width: '82%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-bold mb-1">
                  <span className="text-slate-600 dark:text-slate-300">Communication</span>
                  <span className="text-blue-600 dark:text-blue-400">75%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full transition-all duration-1000 ease-out" style={{width: '75%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-bold mb-1">
                  <span className="text-slate-600 dark:text-slate-300">Problem Solving</span>
                  <span className="text-purple-600 dark:text-purple-400">88%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full transition-all duration-1000 ease-out" style={{width: '88%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Section 1: Targeted Areas for Improvement */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Targeted Areas for Improvement</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             <Link to="/system-design" className="block bg-amber-50 dark:bg-amber-900/20 p-6 rounded-2xl border border-amber-100 dark:border-amber-800/30 hover:-translate-y-1 hover:shadow-md transition-all group">
               <h4 className="font-bold text-amber-800 dark:text-amber-400 mb-2">System Design</h4>
               <p className="text-sm text-amber-700 dark:text-amber-300 group-hover:text-amber-800 dark:group-hover:text-amber-200 transition-colors">Practice scalable architecture and load balancing questions.</p>
             </Link>
             <Link to="/state-management" className="block bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/30 hover:-translate-y-1 hover:shadow-md transition-all group">
               <h4 className="font-bold text-blue-800 dark:text-blue-400 mb-2">State Management</h4>
               <p className="text-sm text-blue-700 dark:text-blue-300 group-hover:text-blue-800 dark:group-hover:text-blue-200 transition-colors">Review Redux and Context API lifecycle patterns.</p>
             </Link>
             <Link to="/behavioral" className="block bg-purple-50 dark:bg-purple-900/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-800/30 hover:-translate-y-1 hover:shadow-md transition-all group">
               <h4 className="font-bold text-purple-800 dark:text-purple-400 mb-2">Behavioral</h4>
               <p className="text-sm text-purple-700 dark:text-purple-300 group-hover:text-purple-800 dark:group-hover:text-purple-200 transition-colors">Focus on the STAR method for leadership questions.</p>
             </Link>
          </div>
        </div>

        {/* New Section 2: Recent Interview Activity */}
        <div className="mt-12">
          <div className="flex justify-between items-end mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Interview Activity</h3>
            <Link to="/performance" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">View All &rarr;</Link>
          </div>
          <Link to="/performance" className="block bg-white dark:bg-slate-800 rounded-3xl p-2 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-blue-500 hover:shadow-md transition-all group">
            <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-slate-700/50 group-hover:bg-slate-50 dark:group-hover:bg-slate-700/50 transition-colors rounded-t-2xl">
               <div>
                 <p className="font-bold text-slate-800 dark:text-white">React Developer (Intermediate)</p>
                 <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">2 days ago • 5 Questions</p>
               </div>
               <div className="text-emerald-600 dark:text-emerald-400 font-extrabold text-lg">8.2 / 10</div>
            </div>
            <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-slate-700/50 group-hover:bg-slate-50 dark:group-hover:bg-slate-700/50 transition-colors">
               <div>
                 <p className="font-bold text-slate-800 dark:text-white">Backend Engineer (Beginner)</p>
                 <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">5 days ago • 5 Questions</p>
               </div>
               <div className="text-emerald-600 dark:text-emerald-400 font-extrabold text-lg">7.8 / 10</div>
            </div>
            <div className="flex justify-between items-center p-4 group-hover:bg-slate-50 dark:group-hover:bg-slate-700/50 transition-colors rounded-b-2xl">
               <div>
                 <p className="font-bold text-slate-800 dark:text-white">HR & Behavioral</p>
                 <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">1 week ago • 3 Questions</p>
               </div>
               <div className="text-amber-500 dark:text-amber-400 font-extrabold text-lg">6.5 / 10</div>
            </div>
            <div className="p-4 border-t border-slate-100 dark:border-slate-700/50 flex justify-center mt-2">
              <div className="px-8 py-3 bg-slate-900 group-hover:bg-black dark:bg-white dark:group-hover:bg-slate-200 dark:text-slate-900 text-white font-bold text-sm rounded-xl transition-all shadow-md">
                View Full Performance History
              </div>
            </div>
          </Link>
        </div>

        {/* New Section 3: Recommended Resources */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Recommended Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Link to="/resources/react-50" className="flex items-center gap-5 bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all hover:-translate-y-1 group">
               <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 text-blue-600 flex items-center justify-center rounded-2xl text-2xl flex-shrink-0">📘</div>
               <div>
                 <h4 className="font-bold text-slate-800 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Top 50 React Questions</h4>
                 <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Review the most frequently asked React concepts.</p>
               </div>
             </Link>
             <Link to="/resources/star-method" className="flex items-center gap-5 bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all hover:-translate-y-1 group">
               <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 flex items-center justify-center rounded-2xl text-2xl flex-shrink-0">⭐</div>
               <div>
                 <h4 className="font-bold text-slate-800 dark:text-white text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">The STAR Method Guide</h4>
                 <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Learn how to answer behavioral questions perfectly.</p>
               </div>
             </Link>
          </div>
        </div>

        {/* New Section 4: Weekly Goal Tracker */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Weekly Goal Tracker</h3>
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
            <div className="flex-1 max-w-xl">
              <p className="text-slate-600 dark:text-slate-400 mb-3 font-medium">You are almost there! Complete 2 more mock interviews to hit your weekly goal.</p>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-full h-3">
                  <div className="bg-blue-600 dark:bg-blue-500 h-3 rounded-full transition-all duration-500" style={{ width: '60%' }}></div>
                </div>
                <span className="font-bold text-slate-800 dark:text-white">3 / 5</span>
              </div>
            </div>
            <div className="hidden sm:flex w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-full items-center justify-center text-3xl ml-6">
              🔥
            </div>
          </div>
        </div>

        {/* New Section 5: Achievements & Badges */}
        <div className="mt-12 mb-12">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Your Achievements</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-center shadow-sm">
              <div className="text-4xl mb-3">🏅</div>
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">First Session</h4>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-center shadow-sm">
              <div className="text-4xl mb-3">⚡</div>
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">3-Day Streak</h4>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-center opacity-60 grayscale">
              <div className="text-4xl mb-3">💯</div>
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">Perfect Score</h4>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-center opacity-60 grayscale">
              <div className="text-4xl mb-3">🧠</div>
              <h4 className="font-bold text-slate-800 dark:text-white text-sm">React Master</h4>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;