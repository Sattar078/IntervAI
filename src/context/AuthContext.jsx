import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  // Login function - stores user data
  const login = (userData) => {
    const userToStore = {
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || '',
      profilePic: userData.profilePic || null,
      phone: userData.phone || '',
      bio: userData.bio || '',
      location: userData.location || ''
    };
    setUser(userToStore);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userToStore));
  };

  // Register function - stores user data
  const register = (userData) => {
    const userToStore = {
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || 'Software Developer',
      profilePic: userData.profilePic || null,
      phone: userData.phone || '',
      bio: userData.bio || '',
      location: userData.location || ''
    };
    setUser(userToStore);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userToStore));
  };

  // Update user profile
  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // Logout function - clears user data
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        updateProfile,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
