import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CareersPage = () => {
  const openings = [
    { id: 1, role: "Senior AI Engineer", dept: "Engineering", location: "Remote", type: "Full-time" },
    { id: 2, role: "Frontend Developer (React)", dept: "Engineering", location: "San Francisco, CA / Remote", type: "Full-time" },
    { id: 3, role: "Product Designer", dept: "Design", location: "Remote", type: "Full-time" },
    { id: 4, role: "Technical Interview Consultant", dept: "Content", location: "Contract", type: "Part-time" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans py-16 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            Come build with us
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Help us shape the future of AI-driven education and career advancement. We are always looking for passionate people to join our fully remote team.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
            <h3 className="font-bold text-slate-800 dark:text-slate-200">Open Roles ({openings.length})</h3>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {openings.map((job) => (
              <div key={job.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">{job.role}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{job.dept} &bull; {job.location}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 rounded-lg">{job.type}</span>
                  <button className="text-blue-600 dark:text-blue-400 font-bold text-sm hover:underline">Apply &rarr;</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default CareersPage;