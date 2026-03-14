import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SystemDesignPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans py-12 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Link to="/home" className="text-sm font-bold text-amber-600 dark:text-amber-400 hover:underline mb-6 inline-block">&larr; Back to Dashboard</Link>
        
        <div className="w-20 h-20 mx-auto bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm">
          🏛️
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">System Design Prep</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Master scalable architecture, load balancing, caching strategies, and database sharding. This targeted module is designed to prepare you for high-level engineering interviews.
        </p>
        
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm text-left mb-10">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Core Concepts to Review:</h3>
          <ul className="space-y-3 text-slate-600 dark:text-slate-400 font-medium">
            <li className="flex items-center gap-3"><span className="text-amber-500">✓</span> Microservices vs Monoliths</li>
            <li className="flex items-center gap-3"><span className="text-amber-500">✓</span> CAP Theorem (Consistency, Availability, Partition Tolerance)</li>
            <li className="flex items-center gap-3"><span className="text-amber-500">✓</span> Message Queues and Pub/Sub (Kafka, RabbitMQ)</li>
            <li className="flex items-center gap-3"><span className="text-amber-500">✓</span> Database Replication and Partitioning</li>
          </ul>
        </div>

        <Link 
          to="/dashboard"
          className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1"
        >
          Start Practice Session
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </Link>
      </div>
    </motion.div>
  );
};

export default SystemDesignPage;