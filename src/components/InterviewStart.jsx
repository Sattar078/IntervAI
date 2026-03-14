import React, { useState } from 'react';

const InterviewStart = ({ categoryTitle, onBegin }) => {
  const [difficulty, setDifficulty] = useState('Intermediate');
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm p-8 border border-gray-200 dark:border-slate-700 w-full max-w-2xl mx-auto text-center">
      <div className="w-20 h-20 mx-auto bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mb-6">
        <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      
      <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Ready for your {categoryTitle} Interview?
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        The AI will evaluate your answers in real-time, providing feedback on your technical accuracy and communication skills.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => setDifficulty(level)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${difficulty === level ? 'bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600'}`}
          >
            {level}
          </button>
        ))}
      </div>

      <button
        onClick={() => onBegin(difficulty)}
        className="w-full md:w-auto px-12 py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold rounded-2xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Start Session
      </button>
    </div>
  );
};

export default InterviewStart;