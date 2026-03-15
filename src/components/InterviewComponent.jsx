/**
 * InterviewComponent.jsx
 * Interactive interview component using STAR method evaluation
 * Shows question, accepts answer, and provides detailed feedback
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { generateQuestion, evaluateAnswer } from '../aiService';

const InterviewComponent = ({ role = 'Software Developer', difficulty = 'mid', onComplete = null }) => {
  const { user } = useAuth();
  const [stage, setStage] = useState('loading'); // loading, question, evaluating, feedback
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Map difficulty values
  const mapDifficulty = (diff) => {
    if (diff === 'easy') return 'Beginner';
    if (diff === 'mid') return 'Intermediate';
    if (diff === 'hard') return 'Advanced';
    return 'Intermediate';
  };

  // Load question on mount
  useEffect(() => {
    loadQuestion();
  }, []);

  const loadQuestion = async () => {
    try {
      setLoading(true);
      setError('');
      const mappedDiff = mapDifficulty(difficulty);
      const newQuestion = await generateQuestion(role, mappedDiff);
      setQuestion(newQuestion);
      setStage('question');
    } catch (err) {
      setError(err.message);
      setStage('error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      setError('Please provide an answer before submitting');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setStage('evaluating');

      const result = await evaluateAnswer(question, answer);
      setEvaluation(result);
      setStage('feedback');
    } catch (err) {
      setError(err.message);
      setStage('question');
    } finally {
      setLoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (onComplete) {
      onComplete(evaluation);
    }
    setAnswer('');
    setEvaluation(null);
    loadQuestion();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 text-white font-sans py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Interview Practice
          </h1>
          <div className="flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 bg-blue-500/20 border border-blue-400 rounded-full text-sm">Role: {role}</span>
            <span className="px-4 py-2 bg-purple-500/20 border border-purple-400 rounded-full text-sm capitalize">Level: {difficulty}</span>
            {user && <span className="px-4 py-2 bg-emerald-500/20 border border-emerald-400 rounded-full text-sm">User: {user.name}</span>}
          </div>
        </div>

        {/* Loading State */}
        {stage === 'loading' && (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-blue-400 border-t-cyan-400 rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-300">Loading your interview question...</p>
          </div>
        )}

        {/* Question Stage */}
        {stage === 'question' && (
          <div className="space-y-8">
            {/* Question Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
              <div className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-sm font-bold mb-3 uppercase tracking-wider">
                Interview Question
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white leading-relaxed">
                {question}
              </h2>
              <div className="bg-blue-500/20 border-l-4 border-blue-400 p-4 rounded">
                <p className="text-sm text-blue-100">
                  💡 <strong>Tip:</strong> Use the STAR method - describe the Situation, Task, Action, and Result clearly to provide a comprehensive answer.
                </p>
              </div>
            </div>

            {/* Answer Input */}
            <div className="space-y-4">
              <label className="block">
                <span className="text-lg font-semibold text-gray-200 mb-2 block">Your Answer</span>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Take your time and provide a detailed answer. Include specific examples and outcomes..."
                  className="w-full h-64 p-6 bg-white/10 border border-white/20 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 outline-none resize-none text-white placeholder-gray-400"
                />
              </label>
              <div className="text-right text-sm text-gray-400">
                {answer.length} characters
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-400 rounded-lg p-4 text-red-200">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmitAnswer}
              disabled={loading || !answer.trim()}
              className="w-full py-4 bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all transform hover:-translate-y-0.5 shadow-lg"
            >
              {loading ? 'Evaluating...' : 'Submit Answer'}
            </button>
          </div>
        )}

        {/* Evaluating State */}
        {stage === 'evaluating' && (
          <div className="text-center py-12">
            <div className="inline-block mb-4">
              <div className="w-12 h-12 border-4 border-cyan-400 border-t-blue-400 rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-300 text-lg">Analyzing your answer using STAR method...</p>
          </div>
        )}

        {/* Feedback Stage */}
        {stage === 'feedback' && evaluation && (
          <div className="space-y-6">
            {/* Score Card */}
            <div className="bg-linear-to-br from-emerald-500/20 to-blue-500/20 border border-emerald-400/30 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Evaluation Results</h3>
                <div className="text-6xl font-extrabold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {evaluation.evaluation.score}/10
                </div>
              </div>
              
              {/* Score Bar */}
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full transition-all rounded-full ${
                    evaluation.evaluation.score >= 8 ? 'bg-emerald-500' :
                    evaluation.evaluation.score >= 6 ? 'bg-blue-500' :
                    evaluation.evaluation.score >= 4 ? 'bg-amber-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${(evaluation.evaluation.score / 10) * 100}%` }}
                />
              </div>
            </div>

            {/* STAR Analysis */}
            {evaluation.evaluation.starAnalysis && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['situation', 'task', 'action', 'result'].map((element) => {
                  const data = evaluation.evaluation.starAnalysis[element];
                  const isPresent = data.present || data.score > 0;
                  
                  return (
                    <div key={element} className={`p-4 rounded-lg border ${isPresent ? 'bg-emerald-500/10 border-emerald-400' : 'bg-red-500/10 border-red-400'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xl ${isPresent ? '✓' : '✗'}`}></span>
                        <h4 className="font-bold capitalize">{element}</h4>
                      </div>
                      <p className="text-sm text-gray-300">{data.details || 'Not sufficiently addressed'}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Strengths */}
            {evaluation.evaluation.strengths && evaluation.evaluation.strengths.length > 0 && (
              <div className="bg-emerald-500/10 border border-emerald-400 rounded-xl p-6">
                <h4 className="text-lg font-bold mb-4 text-emerald-300">✓ Strengths</h4>
                <ul className="space-y-2">
                  {evaluation.evaluation.strengths.map((strength, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-emerald-400">•</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Weaknesses */}
            {evaluation.evaluation.weaknesses && evaluation.evaluation.weaknesses.length > 0 && (
              <div className="bg-amber-500/10 border border-amber-400 rounded-xl p-6">
                <h4 className="text-lg font-bold mb-4 text-amber-300">⚠ Areas for Improvement</h4>
                <ul className="space-y-2">
                  {evaluation.evaluation.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-amber-400">•</span>
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Suggestions */}
            {evaluation.evaluation.improvement_suggestions && evaluation.evaluation.improvement_suggestions.length > 0 && (
              <div className="bg-blue-500/10 border border-blue-400 rounded-xl p-6">
                <h4 className="text-lg font-bold mb-4 text-blue-300">💡 Improvement Tips</h4>
                <ul className="space-y-2">
                  {evaluation.evaluation.improvement_suggestions.map((suggestion, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-blue-400">→</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ideal Answer */}
            <div className="bg-purple-500/10 border border-purple-400 rounded-xl p-6">
              <h4 className="text-lg font-bold mb-3 text-purple-300">📚 Ideal Answer Structure</h4>
              <p className="text-gray-300">{evaluation.evaluation.correct_answer}</p>
            </div>

            {/* Follow-up Question */}
            {evaluation.followUpQuestion && (
              <div className="bg-linear-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400 rounded-xl p-6">
                <h4 className="text-lg font-bold mb-3 text-cyan-300">➜ Follow-up Question</h4>
                <p className="text-lg text-white mb-6">{evaluation.followUpQuestion}</p>
                <p className="text-sm text-gray-400">Ready to practice with the next question?</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                onClick={handleNextQuestion}
                className="flex-1 py-4 bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-xl transition-all transform hover:-translate-y-0.5 shadow-lg"
              >
                Next Question
              </button>
              <button
                onClick={() => {
                  setAnswer('');
                  setStage('question');
                }}
                className="flex-1 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-all"
              >
                Retry Answer
              </button>
            </div>
          </div>
        )}

        {/* Error State */}
        {stage === 'error' && (
          <div className="bg-red-500/20 border border-red-400 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Error Loading Question</h3>
            <p className="text-red-200 mb-6">{error}</p>
            <button
              onClick={loadQuestion}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewComponent;
