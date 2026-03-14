import React from 'react';

const FeedbackPanel = ({ feedback, onNext }) => {
  if (!feedback) return null;
  
  const getScoreColor = (score) => {
    if (score >= 85) return 'text-emerald-500 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
    if (score >= 60) return 'text-amber-500 border-amber-500 bg-amber-50 dark:bg-amber-900/20';
    return 'text-red-500 border-red-500 bg-red-50 dark:bg-red-900/20';
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm p-6 md:p-10 border border-gray-200 dark:border-slate-700">
      <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
        
        <div className="shrink-0 flex flex-col items-center mx-auto md:mx-0">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center border-8 ${getScoreColor(feedback.score)}`}>
            <span className="text-4xl font-extrabold">{feedback.score}</span>
          </div>
          <span className="text-sm font-semibold text-gray-500 mt-3 uppercase tracking-wider">AI Score</span>
        </div>

        <div className="flex-1 space-y-4 w-full">
          <div className="bg-gray-50 dark:bg-slate-900 rounded-2xl p-5 border border-gray-100 dark:border-slate-700">
            <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Detailed Feedback</h4>
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-lg">
              {feedback.detailedReview}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30">
              <span className="block text-emerald-700 dark:text-emerald-400 font-bold mb-1">Strengths</span>
              <span className="text-emerald-600 dark:text-emerald-300 text-sm">{feedback.strengths}</span>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30">
              <span className="block text-amber-700 dark:text-amber-400 font-bold mb-1">To Improve</span>
              <span className="text-amber-600 dark:text-amber-300 text-sm">{feedback.improvements}</span>
            </div>
          </div>
        </div>
      </div>
      
      <button
        onClick={onNext}
        className="w-full py-4 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white text-lg font-bold rounded-2xl transition-colors shadow-md"
      >
        Next Question
      </button>
    </div>
  );
};

export default FeedbackPanel;