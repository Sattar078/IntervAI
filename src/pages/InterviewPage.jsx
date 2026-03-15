/**
 * InterviewPage.jsx
 * Full page for conducting behavioral and technical interviews
 * with STAR method evaluation and detailed feedback
 */

import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import InterviewComponent from '../components/InterviewComponent';
import { generateResumeQuiz } from '../services/interviewService';

const InterviewPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [role] = useState(searchParams.get('role') || user?.role || 'Software Developer');
  const [difficulty, setDifficulty] = useState(searchParams.get('difficulty') || 'mid');
  const [showSettings, setShowSettings] = useState(!searchParams.get('role'));
  const [sessionStats, setSessionStats] = useState({
    totalQuestions: 0,
    averageScore: 0,
    bestScore: 0,
    history: []
  });
  
  const [uploading, setUploading] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);

  const handleStartInterview = (newDifficulty) => {
    setDifficulty(newDifficulty);
    setShowSettings(false);
  };

  const handleQuestionComplete = (evaluation) => {
    // Update session stats
    setSessionStats(prev => ({
      totalQuestions: prev.totalQuestions + 1,
      averageScore: (prev.averageScore * (prev.totalQuestions) + evaluation.evaluation.score) / (prev.totalQuestions + 1),
      bestScore: Math.max(prev.bestScore, evaluation.evaluation.score),
      history: [...prev.history, {
        question: evaluation.question,
        score: evaluation.evaluation.score,
        timestamp: new Date().toISOString()
      }]
    }));
  };

  const handleEndSession = () => {
    setShowSettings(true);
    setSessionStats({
      totalQuestions: 0,
      averageScore: 0,
      bestScore: 0,
      history: []
    });
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    try {
      const questions = await generateResumeQuiz(file, user?.uid || 'anonymous');
      setQuizQuestions(questions);
      setQuizMode(true);
      setShowSettings(false);
    } catch (error) {
      alert("Failed to generate quiz from resume.");
    } finally {
      setUploading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Please Log In</h2>
          <p className="text-gray-300 mb-6">You need to be logged in to access interview practice.</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (quizMode) {
    if (currentQuizIndex >= quizQuestions.length) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
          <h2 className="text-4xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-2xl mb-8">Your Score: {quizScore} / {quizQuestions.length}</p>
          <button onClick={() => {
            setQuizMode(false);
            setShowSettings(true);
            setQuizScore(0);
            setCurrentQuizIndex(0);
            setQuizQuestions([]);
          }} className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors font-semibold">
            Back to Dashboard
          </button>
        </div>
      );
    }

    const currentQ = quizQuestions[currentQuizIndex];
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white/10 p-8 rounded-2xl border border-white/20 shadow-2xl">
          <h2 className="text-sm font-bold text-blue-400 mb-2">Question {currentQuizIndex + 1} of {quizQuestions.length}</h2>
          <h3 className="text-2xl font-bold mb-6 text-white">{currentQ.question}</h3>
          <div className="space-y-4">
            {currentQ.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => {
                  if (opt === currentQ.answer) setQuizScore(s => s + 1);
                  setCurrentQuizIndex(i => i + 1);
                }}
                className="w-full text-left p-4 rounded-xl border border-white/10 hover:bg-blue-500/20 hover:border-blue-400 transition-colors bg-slate-800/50 font-medium"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (showSettings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white font-sans py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Interview Practice
            </h1>
            <p className="text-gray-300 text-lg">Master behavioral questions using the STAR method</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: 'Junior Level',
                description: 'Build confidence with foundational interview questions',
                level: 'junior',
                icon: '🌱'
              },
              {
                title: 'Mid Level',
                description: 'Deepen your storytelling with complex scenarios',
                level: 'mid',
                icon: '⭐'
              },
              {
                title: 'Senior Level',
                description: 'Master advanced leadership and strategy questions',
                level: 'senior',
                icon: '👑'
              }
            ].map((level) => (
              <button
                key={level.level}
                onClick={() => handleStartInterview(level.level)}
                className="group relative bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-8 transition-all transform hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="text-4xl mb-4">{level.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{level.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{level.description}</p>
                <div className="inline-block px-4 py-2 bg-blue-500 group-hover:bg-blue-600 rounded-lg text-sm font-semibold transition-colors">
                  Start Practice
                </div>
              </button>
            ))}
          </div>

          {/* Session Stats */}
          {sessionStats.totalQuestions > 0 && (
            <div className="bg-white/10 border border-white/20 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6">Session Summary</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-500/20 rounded-lg p-4">
                  <div className="text-3xl font-bold text-blue-400">{sessionStats.totalQuestions}</div>
                  <div className="text-sm text-gray-300">Questions Answered</div>
                </div>
                <div className="bg-emerald-500/20 rounded-lg p-4">
                  <div className="text-3xl font-bold text-emerald-400">{sessionStats.averageScore.toFixed(1)}</div>
                  <div className="text-sm text-gray-300">Average Score</div>
                </div>
                <div className="bg-purple-500/20 rounded-lg p-4">
                  <div className="text-3xl font-bold text-purple-400">{sessionStats.bestScore.toFixed(1)}</div>
                  <div className="text-sm text-gray-300">Best Score</div>
                </div>
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-cyan-400 rounded-xl p-6">
              <h4 className="font-bold text-cyan-300 mb-3">What is STAR Method?</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li><strong>S</strong>ituation - Set the scene</li>
                <li><strong>T</strong>ask - Describe your responsibility</li>
                <li><strong>A</strong>ction - Explain initiatives taken</li>
                <li><strong>R</strong>esult - Share outcomes and learnings</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-pink-400 rounded-xl p-6">
              <h4 className="font-bold text-pink-300 mb-3">Interview Tips</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>✓ Use specific examples</li>
                <li>✓ Quantify results when possible</li>
                <li>✓ Show what you learned</li>
                <li>✓ Highlight your impact</li>
              </ul>
            </div>
          </div>

          {/* Resume Upload Section */}
          <div className="bg-white/5 border border-white/20 rounded-2xl p-8 text-center mt-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-white">Resume to Quiz</h3>
            <p className="text-gray-300 mb-6">Upload your resume and our AI will automatically generate a custom quiz based on your skills and experience.</p>
            <label className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold rounded-xl cursor-pointer transition-colors shadow-lg">
              {uploading ? 'Analyzing Resume...' : 'Upload Resume & Generate Quiz'}
              <input type="file" accept=".pdf,.doc,.docx,.txt" className="hidden" onChange={handleResumeUpload} disabled={uploading} />
            </label>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <InterviewComponent
        role={role}
        difficulty={difficulty}
        onComplete={handleQuestionComplete}
      />
      <div className="text-center py-6 bg-slate-900">
        <button
          onClick={handleEndSession}
          className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
        >
          End Session
        </button>
      </div>
    </div>
  );
};

export default InterviewPage;
