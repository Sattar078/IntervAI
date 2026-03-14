import React, { useState } from 'react';

const AnswerInput = ({ onSubmit }) => {
  const [answer, setAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmit(answer);
      setAnswer('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm p-6 md:p-8 border border-gray-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <label htmlFor="answer" className="text-lg font-bold text-gray-800 dark:text-gray-200">
          Your Response
        </label>
        <button
          type="button"
          onClick={() => setIsRecording(!isRecording)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${isRecording ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300'}`}
        >
          <div className={`w-2.5 h-2.5 rounded-full ${isRecording ? 'bg-red-600' : 'bg-gray-500 dark:bg-gray-400'}`}></div>
          {isRecording ? 'Recording...' : 'Use Voice'}
        </button>
      </div>
      
      <textarea
        id="answer"
        rows="5"
        className="w-full p-5 border border-gray-300 dark:border-slate-600 rounded-2xl bg-gray-50 dark:bg-slate-900/50 text-gray-800 dark:text-gray-100 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none mb-6 transition-all text-lg"
        placeholder="Type out your thought process and answer..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!answer.trim()}
          className="w-full md:w-auto px-10 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-lg font-bold rounded-xl transition-all shadow-md"
        >
          Submit Answer
        </button>
      </div>
    </form>
  );
};

export default AnswerInput;