/**
 * Navbar.jsx
 * Persistent top navigation.
 * Dynamically updates its links/icons depending on whether the user is on public or private routes.
 */
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Check if current route is an internal app page to toggle user avatars and notifications
  const publicRoutes = ['/', '/login', '/register', '/about', '/careers', '/privacy', '/terms'];
  const isAuthenticatedRoute = !publicRoutes.includes(location.pathname);

  return (
    <nav className="bg-blue-600 border-b border-blue-700 sticky top-0 z-50 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to={isAuthenticatedRoute ? "/home" : "/"} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-blue-600 font-bold shadow-sm">
            AI
          </div>
          <span className="text-xl font-extrabold tracking-tight">
            IntervAI
          </span>
        </Link>
        <div>
          {isAuthenticatedRoute ? (
            <div className="flex items-center gap-4">
              {location.pathname === '/dashboard' && (
                <button className="text-sm font-semibold text-blue-100 hover:text-white transition-colors hidden sm:block">
                  Session History
                </button>
              )}
              <Link to="/notifications" className="relative p-2 text-blue-100 hover:text-white hover:bg-blue-700 rounded-full transition-colors focus:outline-none" aria-label="Notifications">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {/* Animated red dot for unread notifications */}
                <span className="absolute top-1.5 right-1.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-blue-600"></span>
                </span>
              </Link>
              <Link to="/profile" className="w-9 h-9 rounded-full bg-blue-700 border-2 border-white overflow-hidden block hover:ring-2 hover:ring-blue-300 transition-all">
                <img src={user?.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=0D8ABC&color=fff`} alt="User" />
              </Link>
            </div>
          ) : (
          location.pathname !== '/' && (
            <button 
              onClick={() => navigate(-1)}
              className="p-2 text-blue-100 hover:text-white hover:bg-blue-700 rounded-full transition-colors flex items-center justify-center"
              aria-label="Go back"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;