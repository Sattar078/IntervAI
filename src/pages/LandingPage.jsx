import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  
  const heroImages = [
    "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ];
  
  const slides = [
    {
      icon: '🎯',
      title: 'Tailored Questions',
      desc: 'Questions adapted to your desired role, difficulty level, and even directly from your uploaded resume.',
      iconBg: 'bg-blue-100 dark:bg-blue-900/50',
      iconText: 'text-blue-600'
    },
    {
      icon: '⚡',
      title: 'Real-time Evaluation',
      desc: 'Receive an immediate 1-10 score alongside deep analysis of your strengths and specific areas to improve.',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/50',
      iconText: 'text-emerald-600'
    },
    {
      icon: '📈',
      title: 'Track Progress',
      desc: 'Monitor your performance over time with a unified confidence score and an executive summary of your skills.',
      iconBg: 'bg-purple-100 dark:bg-purple-900/50',
      iconText: 'text-purple-600'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const heroTimer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(heroTimer);
  }, [heroImages.length]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300 flex flex-col">

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-12">
          {/* Text Content */}
          <div className="md:w-1/2 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-semibold mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              AI Powered Interview Platform
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white">
              Master your next interview with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">AI feedback</span>.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              Practice role-specific questions, speak your answers, and get instant, actionable feedback from an expert AI technical interviewer. Build your confidence today.
            </p>
            
            <Link 
              to="/register" 
              className="inline-block px-8 py-4 bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-gray-200 dark:text-slate-900 text-white text-lg font-bold rounded-2xl shadow-lg transition-all transform hover:-translate-y-1"
            >
              Start Your Free Session
            </Link>
          </div>

          {/* Image Slider */}
          <div className="md:w-1/2 w-full relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl shrink-0">
            {heroImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Interview Slide ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentHeroSlide ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            
            {/* Slider Indicators */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHeroSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentHeroSlide ? 'w-8 bg-blue-500' : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to hero slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-24 max-w-3xl mx-auto w-full relative">
          <div className="overflow-hidden relative rounded-3xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 p-8 md:p-12 text-left min-h-[280px] flex items-center">
            {slides.map((slide, index) => (
              <div 
                key={index}
                className={`absolute inset-0 p-8 md:p-12 transition-all duration-700 ease-in-out flex flex-col justify-center ${index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}`}
              >
                <div className={`w-14 h-14 ${slide.iconBg} ${slide.iconText} flex items-center justify-center rounded-2xl text-3xl mb-6`}>
                  {slide.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{slide.title}</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{slide.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center gap-3 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-blue-600 w-10' : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;