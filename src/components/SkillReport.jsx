import React from 'react';

const SkillReport = ({ reportData, onRestart }) => {
  // Expected reportData format: { overallScore: 82, technical: 85, communication: 75, problemSolving: 88, summary: '...' }
  
  const renderProgressBar = (label, score, colorClass) => (
    <div className="mb-5">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{label}</span>
        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{score}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5">
        <div className={`h-2.5 rounded-full ${colorClass}`} style={{ width: `${score}%` }}></div>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm p-8 md:p-12 border border-gray-200 dark:border-slate-700 w-full max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Interview Complete</h2>
        <p className="text-gray-500 dark:text-gray-400">Here is your AI-generated performance report.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="md:col-span-1 flex flex-col justify-center items-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/50">
          <span className="text-gray-500 dark:text-gray-400 font-semibold mb-2 text-sm uppercase tracking-wider">Overall Score</span>
          <span className="text-6xl font-black text-blue-600 dark:text-blue-400">{reportData.overallScore}</span>
        </div>
        
        <div className="md:col-span-2 flex flex-col justify-center">
          {renderProgressBar('Technical Accuracy', reportData.technical, 'bg-emerald-500')}
          {renderProgressBar('Communication Clarity', reportData.communication, 'bg-blue-500')}
          {renderProgressBar('Problem Solving', reportData.problemSolving, 'bg-purple-500')}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-slate-900 p-6 rounded-2xl mb-8 border border-gray-100 dark:border-slate-700">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3">AI Executive Summary</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {reportData.summary}
        </p>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={onRestart}
          className="px-10 py-4 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white text-lg font-bold rounded-xl transition-all shadow-md"
        >
          Start New Interview
        </button>
      </div>
    </div>
  );
};

export default SkillReport;