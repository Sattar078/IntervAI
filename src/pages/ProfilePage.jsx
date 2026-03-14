/**
 * ProfilePage.jsx
 * Allows users to edit personal details, view overarching stat blocks, 
 * upload a custom avatar, and configure account preferences.
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    name: '',
    role: '',
    email: '',
    profilePic: null
  });

  // Initialize profileDetails from user context
  useEffect(() => {
    if (user) {
      setProfileDetails({
        name: user.name || '',
        role: user.role || '',
        email: user.email || '',
        profilePic: user.profilePic || null
      });
    }
  }, [user]);

  const handleLogout = () => {
    // Call logout from auth context
    logout();
    navigate('/login');
  };

  // Generic change handler for text inputs in the profile form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails(prev => ({ ...prev, [name]: value }));
  };

  // Processes local file uploads to preview a profile picture using FileReader
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setProfileDetails(prev => ({ ...prev, profilePic: evt.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save profile changes to auth context
  const handleSaveProfile = () => {
    updateProfile(profileDetails);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans py-12 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight">Your Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: User Info */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-blue-100 border-4 border-white dark:border-slate-800 shadow-xl overflow-hidden mb-5 relative group">
                <img src={profileDetails.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileDetails.name)}&background=0D8ABC&color=fff&size=128`} alt="Profile" className="w-full h-full object-cover" />
                {isEditing && (
                  <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                    <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <span className="text-xs font-bold">Upload</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                )}
              </div>
              {isEditing ? (
                <>
                  <input type="text" name="name" value={profileDetails.name} onChange={handleInputChange} className="w-full text-center text-2xl font-bold text-slate-900 dark:text-white mb-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none px-2 py-1" />
                  <input type="text" name="role" value={profileDetails.role} onChange={handleInputChange} className="w-full text-center text-sm font-medium text-blue-600 dark:text-blue-400 mb-6 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none px-2 py-1" />
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{profileDetails.name}</h2>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-6">{profileDetails.role}</p>
                </>
              )}
              <button onClick={() => setIsEditing(!isEditing)} className={`w-full py-3 font-bold rounded-xl transition-colors text-sm shadow-inner ${isEditing ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                {isEditing ? 'Save Profile' : 'Edit Profile'}
              </button>isEditing ? handleSaveProfile() : setIsEditing(true
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-sm">Account Details</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span className="text-slate-500">Email</span>
                  {isEditing ? (
                    <input type="email" name="email" value={profileDetails.email} onChange={handleInputChange} className="font-medium text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-blue-500 outline-none px-2 py-0.5 text-right w-3/5" />
                  ) : (
                    <span className="font-medium text-slate-800 dark:text-slate-200">{profileDetails.email}</span>
                  )}
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span className="text-slate-500">Plan</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-md">Pro Tier</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">Member Since</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">October 2023</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Stats & Settings */}
          <div className="md:col-span-2 space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
                <span className="text-4xl mb-3">🎯</span>
                <span className="text-3xl font-black text-slate-900 dark:text-white mb-1">24</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Sessions</span>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="relative w-20 h-20 mb-3">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
                    {/* Background Circle */}
                    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                    {/* Progress Circle (84% of 175.93 circumference = 147.78, Offset = 28.15) */}
                    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray="175.93" strokeDashoffset="28.15" className="text-emerald-500 transition-all duration-1000 ease-out" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">8.4</span>
                  </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Avg Score</span>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
                <span className="text-4xl mb-3">🔥</span>
                <span className="text-3xl font-black text-amber-500 dark:text-amber-400 mb-1">5</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Day Streak</span>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-lg">Preferences</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-800 dark:text-slate-200">Email Notifications</h4>
                    <p className="text-sm text-slate-500">Receive weekly performance summaries and tips.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-red-100 dark:border-red-900/30 shadow-sm">
              <h3 className="font-bold text-red-600 dark:text-red-400 mb-2 text-lg">Account Actions</h3>
              <p className="text-sm text-slate-500 mb-6">Securely log out of your account or permanently delete your data.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={handleLogout} className="px-8 py-3.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 font-bold rounded-xl transition-colors text-sm text-center">
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;