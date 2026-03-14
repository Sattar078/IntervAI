// Import the React library, which is required to build user interfaces and JSX
import React from 'react';
// Import the 'motion' component from framer-motion to enable page transition animations
import { motion } from 'framer-motion';
// Import the 'Link' component from react-router-dom to handle client-side routing (navigation without reloading)
import { Link } from 'react-router-dom';

// Define the StarMethodGuide functional component
const StarMethodGuide = () => {
  // Define an array of configuration objects for the four S.T.A.R. acronym cards.
  // Keeping this data in an array makes the UI highly editable. You can easily change text/icons here.
  const starCards = [
    {
      // Configuration for the "Situation" card
      letter: 'S',
      title: 'Situation',
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-400',
      icon: (
        // SVG icon representing a location pin
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
      ),
      desc: 'Set the scene and give the necessary details of your example. Describe the context or background of the challenge you faced.',
    },
    {
      // Configuration for the "Task" card
      letter: 'T',
      title: 'Task',
      color: 'amber',
      gradient: 'from-amber-500 to-orange-400',
      icon: (
        // SVG icon representing a target/goal
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
      ),
      desc: 'Describe what your responsibility was in that situation. Define the specific challenge, goal, or problem that needed to be solved.',
    },
    {
      // Configuration for the "Action" card
      letter: 'A',
      title: 'Action',
      color: 'purple',
      gradient: 'from-purple-500 to-fuchsia-400',
      icon: (
        // SVG icon representing a lightning bolt (action)
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
      ),
      desc: 'Explain exactly what steps you took to address it. Focus on your specific contribution, not just what the team did. Use "I" instead of "We".',
    },
    {
      // Configuration for the "Result" card
      letter: 'R',
      title: 'Result',
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-400',
      icon: (
        // SVG icon representing an upward trending graph (result)
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
      ),
      desc: 'Share what outcomes your actions achieved. Use quantifiable metrics and data wherever possible to show your direct impact.',
    },
  ];

  return (
    // motion.div wraps the whole page to provide enter/exit transitions managed by AnimatePresence in App.jsx
    <motion.div 
      // Initial state: invisible and pushed down 20px
      initial={{ opacity: 0, y: 20 }}
      // Animate state: fully visible and at its normal position
      animate={{ opacity: 1, y: 0 }}
      // Exit state: invisible and pushed up 20px (when navigating away)
      exit={{ opacity: 0, y: -20 }}
      // Transition timing: the animation will take exactly 0.5 seconds
      transition={{ duration: 0.5 }}
      // Container classes: sets minimum height, background colors, text colors, and smooth dark-mode transitions
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans py-12 transition-colors duration-300"
    >
      {/* Main wrapper to limit max width and center the content on large screens */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* A simple back navigation link pointing to the Home Dashboard */}
        <Link to="/home" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block">&larr; Back to Dashboard</Link>
        
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Inner div to create a glowing ring effect around the main icon */}
          <div className="inline-flex items-center justify-center p-1.5 mb-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 ring-1 ring-emerald-500/30">
            {/* Actual icon container with a strong background gradient */}
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            </div>
          </div>
          {/* The main title with the word "STAR" styled with transparent text and a gradient clip */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">STAR</span> Method
          </h1>
          {/* Subtitle text describing the page's purpose */}
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Learn how to answer behavioral interview questions effectively by structuring your stories for maximum impact.
          </p>
        </div>

        {/* STAR Explanation Cards */}
        {/* Grid layout: 1 column on mobile, 2 columns on tablet, 4 columns on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Loop over the starCards array and render a UI card for each object */}
          {starCards.map((card) => (
            // The main card container. Adds borders, shadows, hover lift (-translate-y-2), and overflow hiding
            <div key={card.letter} className="bg-white dark:bg-slate-800/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
              {/* Subtle animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              {/* Background decorative blob */}
              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${card.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`}></div>
              
              {/* Container for the big letter and the icon. z-10 keeps it above the background blobs */}
              <div className="flex items-center gap-4 mb-6 relative z-10">
                {/* Renders the large letter (S, T, A, R) with a background gradient clip */}
                <span className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br ${card.gradient}`}>{card.letter}</span>
                {/* Container for the SVG icon, dynamically setting its color based on the card object */}
                <div className={`p-3 rounded-2xl bg-${card.color}-100 dark:bg-${card.color}-900/30 text-${card.color}-600 dark:text-${card.color}-400 shadow-inner`}>
                  {card.icon}
                </div>
              </div>
              {/* The title (e.g., "Situation") */}
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 relative z-10">{card.title}</h3>
              {/* The description paragraph */}
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed relative z-10">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Example Section */}
        {/* A large container holding the timeline example of a STAR answer */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden mb-20">
          {/* Header of the example section with a distinct gray/dark background */}
          <div className="p-8 md:p-10 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900">
            <div className="flex items-center gap-3 mb-4">
              {/* A small pill badge identifying this as an "Example Question" */}
              <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400 rounded-full">Example Question</span>
            </div>
            {/* The mock question being asked */}
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              "Tell me about a time you solved a difficult problem."
            </h3>
          </div>
          
          <div className="p-8 md:p-10 relative">
            {/* Timeline Line: A vertical line drawn down the left side, hidden on very small screens */}
            <div className="absolute left-12 md:left-14 top-10 bottom-10 w-0.5 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
            
            <div className="space-y-10 relative">
              {/* Situation Timeline Item */}
              <div className="flex flex-col sm:flex-row gap-6 md:gap-10 items-start group">
                {/* The timeline dot containing the letter 'S', scales up slightly when hovered */}
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 border-4 border-white dark:border-slate-900 text-blue-600 dark:text-blue-400 font-black flex items-center justify-center flex-shrink-0 relative z-10 shadow-sm group-hover:scale-110 transition-transform">S</div>
                {/* The content box holding the text of the answer for this step */}
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl flex-1 border border-slate-100 dark:border-slate-700/50">
                  <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wider text-sm">Situation</h4>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">"In my previous role, our main application's database queries started taking over 5 seconds to load during peak hours, causing significant user churn."</p>
                </div>
              </div>
              
              {/* Task Timeline Item */}
              <div className="flex flex-col sm:flex-row gap-6 md:gap-10 items-start group">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 border-4 border-white dark:border-slate-900 text-amber-600 dark:text-amber-400 font-black flex items-center justify-center flex-shrink-0 relative z-10 shadow-sm group-hover:scale-110 transition-transform">T</div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl flex-1 border border-slate-100 dark:border-slate-700/50">
                  <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-2 uppercase tracking-wider text-sm">Task</h4>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">"I was assigned the responsibility to diagnose the root cause and reduce the query load time to under 1 second without upgrading our server tier."</p>
                </div>
              </div>
              
              {/* Action Timeline Item */}
              <div className="flex flex-col sm:flex-row gap-6 md:gap-10 items-start group">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 border-4 border-white dark:border-slate-900 text-purple-600 dark:text-purple-400 font-black flex items-center justify-center flex-shrink-0 relative z-10 shadow-sm group-hover:scale-110 transition-transform">A</div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl flex-1 border border-slate-100 dark:border-slate-700/50">
                  <h4 className="font-bold text-purple-600 dark:text-purple-400 mb-2 uppercase tracking-wider text-sm">Action</h4>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">"I used profiling tools to identify missing indexes on our most queried tables. I then refactored the ORM calls to avoid N+1 query problems and implemented a Redis caching layer for frequently accessed, static data."</p>
                </div>
              </div>
              
              {/* Result Timeline Item */}
              <div className="flex flex-col sm:flex-row gap-6 md:gap-10 items-start group">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 border-4 border-white dark:border-slate-900 text-emerald-600 dark:text-emerald-400 font-black flex items-center justify-center flex-shrink-0 relative z-10 shadow-sm group-hover:scale-110 transition-transform">R</div>
                <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-6 rounded-2xl flex-1 border border-emerald-100 dark:border-emerald-800/30">
                  <h4 className="font-bold text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-wider text-sm">Result</h4>
                  <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">"By deploying these changes, the average load time dropped to 300ms (a 94% improvement), user retention stabilized, and we saved $500/month on unnecessary database scaling."</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Practice Section CTA */}
        <div className="text-center">
          {/* A large Call-To-Action link button routing the user back to the interview dashboard */}
          <Link 
            to="/dashboard"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-lg font-bold rounded-2xl shadow-lg shadow-emerald-500/30 transition-all transform hover:-translate-y-1"
          >
            Practice STAR Answer
            {/* A right arrow SVG icon inside the button */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Exporting the component allows it to be imported in the App.jsx router
export default StarMethodGuide;