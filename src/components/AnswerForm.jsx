import React, { useState } from 'react';

const AnswerForm = ({ onSubmit }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmit(answer);
      setAnswer('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-slate-700">
      <label htmlFor="answer" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Your Answer
      </label>
      <textarea
        id="answer"
        rows="6"
        className="w-full p-4 border border-gray-300 dark:border-slate-600 rounded-xl bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none resize-none mb-4 transition-colors"
        placeholder="Type your response here..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button
        type="submit"
        disabled={!answer.trim()}
        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors shadow-sm"
      >
        Submit Answer
      </button>
    </form>
  );
};

export default AnswerForm;