import React from 'react';

const FeedbackDisplay = ({ feedback, onNext }) => {
  if (!feedback) return null;
  
  // Simple logic to color the score differently based on performance
  const scoreColor = feedback.score >= 8 ? 'text-emerald-500 border-emerald-500' : 'text-amber-500 border-amber-500';

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-8 border border-gray-200 dark:border-slate-700 text-center">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">AI Evaluation</h2>
      
      <div className="flex justify-center mb-6">
        <div className={`w-28 h-28 rounded-full flex items-center justify-center border-4 ${scoreColor} text-4xl font-extrabold shadow-sm`}>
          {feedback.score}<span className="text-lg text-gray-400 font-medium">/10</span>
        </div>
      </div>
      
      <div className="text-left space-y-4 mb-8">
        <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-slate-700">
          <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Correct Answer</h3>
          <p className="text-gray-700 dark:text-gray-300">{feedback.correctAnswer}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
            <h3 className="font-bold text-emerald-800 dark:text-emerald-400 mb-1">Strengths</h3>
            <p className="text-emerald-700 dark:text-emerald-300 text-sm">{feedback.strengths}</p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-xl border border-amber-100 dark:border-amber-800/30">
            <h3 className="font-bold text-amber-800 dark:text-amber-400 mb-1">Weaknesses</h3>
            <p className="text-amber-700 dark:text-amber-300 text-sm">{feedback.weaknesses}</p>
          </div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30">
          <h3 className="font-bold text-blue-800 dark:text-blue-400 mb-1">Improvement Suggestion</h3>
          <p className="text-blue-700 dark:text-blue-300 text-sm">{feedback.improvementSuggestion}</p>
        </div>
      </div>
      
      <button
        onClick={onNext}
        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl transition-colors shadow-sm"
      >
        Next Question
      </button>
    </div>
  );
};

export default FeedbackDisplay;