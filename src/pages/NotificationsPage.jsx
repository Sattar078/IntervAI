import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NotificationsPage = () => {
  const navigate = useNavigate();
  
  const notifications = [
    { id: 1, type: 'success', title: 'New High Score!', message: 'You scored a 9.1 on your recent System Design interview. Great job!', time: '2 hours ago', unread: true, icon: '🏆', color: 'emerald' },
    { id: 2, type: 'info', title: 'New Questions Added', message: 'We just added 20 new questions to the React and Node.js interview tracks.', time: '1 day ago', unread: true, icon: '✨', color: 'blue' },
    { id: 3, type: 'warning', title: 'Weekly Goal Reminder', message: 'You need 2 more mock interviews to hit your weekly goal. Keep the streak alive!', time: '2 days ago', unread: false, icon: '🔥', color: 'amber' },
    { id: 4, type: 'system', title: 'System Maintenance', message: 'Scheduled maintenance will occur on Sunday at 2 AM UTC.', time: '1 week ago', unread: false, icon: '⚙️', color: 'slate' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans py-12 transition-colors duration-300"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <button onClick={() => navigate(-1)} className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block">&larr; Go Back</button>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Notifications</h1>
          </div>
          <button className="text-sm font-bold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Mark all as read
          </button>
        </div>

        <div className="space-y-4">
          {notifications.map((notif) => (
            <div key={notif.id} className={`bg-white dark:bg-slate-900 rounded-2xl p-6 border ${notif.unread ? 'border-blue-500/50 shadow-md' : 'border-slate-200 dark:border-slate-800 shadow-sm opacity-75 hover:opacity-100'} flex gap-5 transition-all group`}>
              <div className={`w-12 h-12 rounded-full bg-${notif.color}-100 dark:bg-${notif.color}-900/30 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
                {notif.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`text-lg font-bold ${notif.unread ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                    {notif.title}
                  </h3>
                  <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">{notif.time}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{notif.message}</p>
              </div>
              {notif.unread && (
                <div className="flex-shrink-0 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationsPage;