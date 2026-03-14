/**
 * Dashboard.jsx
 * The core interactive mock interview interface.
 * Handles the complete interview state machine (setup -> loading -> active -> completed)
 * and manages user input alongside AI evaluation data.
 */
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { generateInterviewSession, evaluateAnswer, generateQuestionsFromResume, generateQuestion } from '../aiService';
import * as pdfjsLib from 'pdfjs-dist';

// Configure the PDF.js worker using a CDN to avoid Vite compilation issues
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const Dashboard = () => {
  const location = useLocation();
  // Check routing state to determine whether to start in topic or resume mode
  const [interviewMode, setInterviewMode] = useState(location.state?.type === 'resume' ? 'resume' : 'topic');
  const [resumeText, setResumeText] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [status, setStatus] = useState('setup'); // setup, loading, active, evaluating, completed
  
  // Session tracking states
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerText, setAnswerText] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [sessionScores, setSessionScores] = useState([]);
  
  const categories = [
    { id: 'frontend', title: 'Frontend', icon: '🎨' },
    { id: 'react', title: 'React', icon: '⚛️' },
    { id: 'backend', title: 'Backend', icon: '⚙️' },
    { id: 'hr', title: 'Behavioral', icon: '🤝' },
  ];

  // Handles file upload and parses PDF if necessary
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type === 'application/pdf') {
      setIsParsing(true);
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let extractedText = '';
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          extractedText += textContent.items.map(item => item.str).join(' ') + '\n';
        }
        
        setResumeText(extractedText);
      } catch (error) {
        console.error("Error parsing PDF:", error);
        alert("Failed to parse PDF. Please try copying and pasting the text instead.");
      } finally {
        setIsParsing(false);
      }
    } else {
      const reader = new FileReader();
      reader.onload = (evt) => setResumeText(evt.target.result);
      reader.readAsText(file);
    }
  };

  // Generates generic questions based on a selected role/topic
  const startSession = async (catTitle) => {
    setActiveCategory(catTitle);
    setStatus('loading');
    setAnswerText('');
    setFeedback(null);
    setSessionScores([]);
    try {
      const qList = await generateInterviewSession(catTitle);
      setQuestions(qList);
      setCurrentIndex(0);
      setStatus('active');
    } catch (e) {
      alert('Error connecting to AI. Please check your API key and console.');
      setStatus('setup');
    }
  };

  // Analyzes provided text/resume and dynamically generates related questions
  const startResumeSession = async () => {
    if (!resumeText.trim()) return;
    setActiveCategory('Resume Based');
    setStatus('loading');
    setAnswerText('');
    setFeedback(null);
    setSessionScores([]);
    try {
      const qList = await generateQuestionsFromResume(resumeText);
      setQuestions(qList);
      setCurrentIndex(0);
      setStatus('active');
    } catch (e) {
      alert('Error connecting to AI. Please check your API key and console.');
      setStatus('setup');
    }
  };

  // Submits the user's typed/recorded answer to the AI for parsing and scores
  const handleSubmit = async () => {
    if (!answerText.trim()) return;
    setStatus('evaluating');
    try {
      const evaluation = await evaluateAnswer(questions[currentIndex].question, answerText);
      setFeedback(evaluation);
      setSessionScores(prev => [...prev, evaluation.score]);

      // Dynamic difficulty adjustment for the NEXT question
      // Note: Restricted to 'topic' mode as 'resume' mode requires full context to generate a single question
      if (currentIndex < questions.length - 1 && interviewMode === 'topic') {
        // Safely parse the current difficulty level
        const rawDiff = questions[currentIndex].difficulty || 'Intermediate';
        const currentDiff = rawDiff.charAt(0).toUpperCase() + rawDiff.slice(1).toLowerCase();
        
        const levels = ['Beginner', 'Intermediate', 'Advanced'];
        let diffIdx = levels.indexOf(currentDiff);
        if (diffIdx === -1) diffIdx = 1; // Default to Intermediate

        // Adjust the difficulty index based on the user's score
        if (evaluation.score > 7) {
          diffIdx = Math.min(levels.length - 1, diffIdx + 1); // Ask a harder question
        } else if (evaluation.score < 5) {
          diffIdx = Math.max(0, diffIdx - 1); // Ask an easier question
        }

        const nextDiff = levels[diffIdx];

        // If the difficulty changed, fetch a new question to replace the upcoming one in the queue
        if (nextDiff !== currentDiff) {
          try {
            const newQuestionText = await generateQuestion(activeCategory, nextDiff);
            setQuestions(prev => {
              const updatedQs = [...prev];
              updatedQs[currentIndex + 1] = { question: newQuestionText, difficulty: nextDiff };
              return updatedQs;
            });
          } catch (err) {
            console.error("Failed to dynamically adjust question difficulty:", err);
            // Fails silently; falls back to the original pre-generated question
          }
        }
      }

      setStatus('active');
    } catch (e) {
      alert('Error evaluating answer. Please try again.');
      setStatus('active');
    }
  };

  // Advances to the next question, or concludes the session if complete
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setAnswerText('');
      setFeedback(null);
    } else {
      setStatus('completed');
    }
  };

  // Calculate rolling statistics for real-time progress bars
  const avgScore = sessionScores.length > 0 ? (sessionScores.reduce((a, b) => a + b, 0) / sessionScores.length) : 0;
  const confidencePercentage = sessionScores.length > 0 ? Math.min(100, Math.round(avgScore * 10)) : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
        {/* STATE: SETUP */}
        {status === 'setup' && (
          <div className="max-w-5xl mx-auto transition-all duration-500">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-semibold mb-6 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                AI Engine Ready
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
                Start your mock interview
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Select a role-specific track below or paste your resume to generate tailored technical questions.
              </p>
            </div>

            <div className="flex justify-center mb-10">
              <div className="bg-slate-200 dark:bg-slate-800 p-1 rounded-xl inline-flex shadow-inner">
                <button onClick={() => setInterviewMode('topic')} className={`px-8 py-3 rounded-lg text-sm font-bold transition-all ${interviewMode === 'topic' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'}`}>Topic-Based</button>
                <button onClick={() => setInterviewMode('resume')} className={`px-8 py-3 rounded-lg text-sm font-bold transition-all ${interviewMode === 'resume' ? 'bg-white dark:bg-slate-900 text-purple-600 shadow-sm' : 'text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'}`}>Resume-Based</button>
              </div>
            </div>

            {interviewMode === 'topic' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => startSession(cat.title)}
                    className="group bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 text-center"
                  >
                    <div className="w-16 h-16 mx-auto bg-slate-50 dark:bg-slate-800 group-hover:bg-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 transition-colors duration-300">
                      <span className="group-hover:scale-110 transition-transform duration-300">{cat.icon}</span>
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{cat.title}</h3>
                  </button>
                ))}
              </div>
            ) : (
              <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="mb-6 text-center">
                  <div className="w-16 h-16 mx-auto bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center text-3xl mb-4">
                    📄
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Provide your Resume</h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-2">Our AI will analyze your skills and experience to ask personalized questions.</p>
                </div>

                <div className="w-full bg-slate-50 dark:bg-slate-950/50 border-2 border-dashed border-purple-200 dark:border-purple-900/50 hover:border-purple-500 dark:hover:border-purple-500 rounded-2xl p-8 text-center transition-colors relative mb-6 group">
                  <input 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    accept=".txt,.pdf"
                    onChange={handleFileUpload}
                  />
                  <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900/50 text-purple-600 rounded-full flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                    {isParsing ? (
                      <svg className="animate-spin w-6 h-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                    )}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-bold mb-1">
                    {isParsing ? 'Extracting text from PDF...' : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">PDF and TXT files supported</p>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
                  <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Or Paste Text</span>
                  <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
                </div>

                <textarea
                  rows="6"
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all mb-6 resize-none shadow-inner"
                  placeholder="Paste your resume text here (experience, skills, projects)..."
                ></textarea>
                <button 
                  onClick={startResumeSession}
                  disabled={!resumeText.trim()}
                  className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-400 disabled:dark:bg-slate-700 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1"
                >
                  Analyze & Generate Interview
                </button>
              </div>
            )}
          </div>
        )}

        {/* STATE: LOADING */}
        {status === 'loading' && (
          <div className="flex flex-col items-center justify-center py-32 transition-all duration-500">
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>
              <div className="absolute inset-2 bg-blue-600 rounded-full flex items-center justify-center shadow-xl">
                <span className="text-white text-2xl">✨</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Generating Questions...</h2>
            <p className="text-slate-500">Our AI is crafting a custom interview for the {activeCategory} track.</p>
          </div>
        )}

        {/* STATE: ACTIVE / EVALUATING */}
        {(status === 'active' || status === 'evaluating') && questions.length > 0 && (
          <div className="transition-all duration-500">
            
            {/* Header Stats Bar */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center text-xl font-bold">
                  {categories.find(c => c.title === activeCategory)?.icon || '🎯'}
                </div>
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">Current Session</h2>
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white">{activeCategory}</span>
                </div>
              </div>

              <div className="flex-1 w-full max-w-xl px-4 hidden md:block">
                <div className="flex justify-between text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  <span>Progress</span>
                  <span className="text-blue-600 dark:text-blue-400">Question {currentIndex + 1} of {questions.length}</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}></div>
                </div>
              </div>

              <div className="flex gap-6 text-right">
                <div>
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Avg Score</div>
                  <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">{sessionScores.length > 0 ? avgScore.toFixed(1) : '--'}<span className="text-sm text-slate-400 font-medium">/10</span></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* LEFT COLUMN: Question & Answer */}
              <div className="lg:col-span-2 space-y-6">
                {/* Question Card */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl p-8 md:p-10 shadow-lg text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-black opacity-10 rounded-full blur-xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white/20 text-white rounded-lg backdrop-blur-sm border border-white/10">
                        {questions[currentIndex]?.difficulty || 'Intermediate'}
                      </span>
                      <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-black/20 text-white rounded-lg backdrop-blur-sm border border-black/10">
                        Question {currentIndex + 1}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold leading-relaxed shadow-sm">
                      {questions[currentIndex]?.question}
                    </h2>
                  </div>
                </div>

                {/* Answer Input */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-6">
                    <label className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                      Your Response
                    </label>
                    <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-red-500 transition-colors bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">
                      <span className={`w-2.5 h-2.5 rounded-full bg-red-500 ${status === 'evaluating' ? '' : 'animate-pulse'}`}></span>
                      Record Audio
                    </button>
                  </div>
                  
                  <textarea
                    rows="7"
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    disabled={status === 'evaluating' || feedback !== null}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all disabled:opacity-50 text-lg leading-relaxed shadow-inner"
                    placeholder="Type your thought process and answer clearly..."
                  ></textarea>
                  
                  <div className="mt-6 flex justify-end">
                    <button 
                      onClick={handleSubmit}
                      disabled={status === 'evaluating' || !answerText.trim() || feedback !== null}
                      className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:dark:bg-slate-700 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2"
                    >
                      {status === 'evaluating' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          Analyzing Response...
                        </>
                      ) : 'Submit Answer'}
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Feedback Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  {feedback ? (
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-500">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          AI Evaluation
                        </h3>
                        <span className="px-3 py-1 text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400 rounded-lg">Instant Feedback</span>
                      </div>
                      
                      <div className="flex justify-center mb-8">
                        <div className={`relative w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-inner border-8 ${feedback.score >= 8 ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'}`}>
                          <span className="text-4xl font-black leading-none">{feedback.score}</span>
                          <span className="text-xs font-bold opacity-70 mt-1">/ 10</span>
                        </div>
                      </div>

                      <div className="space-y-4 flex-1">
                        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30">
                          <h4 className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-400 mb-1 text-sm uppercase tracking-wider">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            Strengths
                          </h4>
                          <p className="text-emerald-700 dark:text-emerald-300 text-sm leading-relaxed">{feedback.strengths}</p>
                        </div>
                        
                        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30">
                          <h4 className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-400 mb-1 text-sm uppercase tracking-wider">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                            To Improve
                          </h4>
                          <p className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed">{feedback.weaknesses}</p>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          <h4 className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-300 mb-1 text-sm uppercase tracking-wider">
                            💡 Suggestion
                          </h4>
                          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feedback.improvementSuggestion}</p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={handleNext} 
                        className="mt-8 w-full py-4 bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-gray-200 dark:text-slate-900 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Interview'}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </button>
                    </div>
                  ) : (
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 h-full min-h-[400px] flex flex-col items-center justify-center text-center opacity-70">
                      <div className="w-20 h-20 mb-6 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center">
                        <span className="text-4xl">🤖</span>
                      </div>
                      <h3 className="text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider mb-2">Awaiting Response</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[200px]">Submit your answer to receive instant AI feedback and scoring.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STATE: COMPLETED */}
        {status === 'completed' && (
          <div className="max-w-3xl mx-auto text-center py-16 transition-all duration-500">
            <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-8 shadow-lg">
              🎉
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Interview Complete!</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              Great job! You've successfully completed the {activeCategory} track. Review your overall performance below.
            </p>
            
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl mb-10 flex flex-col sm:flex-row items-center justify-center gap-12">
              <div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Average Score</div>
                <div className="text-6xl font-black text-blue-600">{avgScore.toFixed(1)}</div>
              </div>
              <div className="w-px h-24 bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>
              <div className="h-px w-full bg-slate-200 dark:bg-slate-800 block sm:hidden"></div>
              <div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Confidence</div>
                <div className="text-6xl font-black text-purple-600">{confidencePercentage}%</div>
              </div>
            </div>

            <button 
              onClick={() => setStatus('setup')} 
              className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition shadow-lg hover:-translate-y-1 transform"
            >
              Start New Session
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;