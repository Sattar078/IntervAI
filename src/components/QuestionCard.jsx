import React from 'react';

const QuestionCard = ({ category, question, currentQuestionNum, totalQuestions, difficulty }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm p-8 border border-gray-200 dark:border-slate-700 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 dark:bg-slate-700">
        <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${(currentQuestionNum / totalQuestions) * 100}%` }}></div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 mt-2">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 rounded-lg">{category}</span>
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 rounded-lg">{difficulty}</span>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold">Question {currentQuestionNum} of {totalQuestions}</span>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 leading-tight">
        {question}
      </h2>
    </div>
  );
};

export default QuestionCard