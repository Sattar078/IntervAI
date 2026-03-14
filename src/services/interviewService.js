/**
 * interviewService.js
 * Frontend service for interview operations
 * Handles API calls for question generation and answer evaluation
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Gets a random interview question based on level
 */
export const getInterviewQuestion = async (role = 'Software Developer', difficulty = 'mid') => {
  try {
    const response = await fetch(`${API_BASE_URL}/interviews/question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role, difficulty })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.question;
  } catch (error) {
    console.error('Error fetching interview question:', error);
    throw error;
  }
};

/**
 * Evaluates an interview answer using STAR method
 * Returns structured feedback with score and follow-up question
 */
export const evaluateInterviewAnswer = async (question, answer, role = 'Software Developer') => {
  try {
    const response = await fetch(`${API_BASE_URL}/interviews/evaluate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        question, 
        answer, 
        role 
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.evaluation;
  } catch (error) {
    console.error('Error evaluating interview answer:', error);
    throw error;
  }
};

/**
 * Starts a new interview session
 */
export const startInterviewSession = async (role = 'Software Developer', difficulty = 'mid') => {
  try {
    const response = await fetch(`${API_BASE_URL}/interviews/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role, difficulty })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error starting interview session:', error);
    throw error;
  }
};

/**
 * Saves interview feedback to database
 */
export const saveInterviewFeedback = async (sessionId, question, answer, evaluation) => {
  try {
    const response = await fetch(`${API_BASE_URL}/interviews/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        sessionId,
        question, 
        answer, 
        evaluation,
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error saving interview feedback:', error);
    throw error;
  }
};

/**
 * Gets user's interview history
 */
export const getInterviewHistory = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/interviews/history/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.history;
  } catch (error) {
    console.error('Error fetching interview history:', error);
    throw error;
  }
};

/**
 * Gets performance statistics
 */
export const getPerformanceStats = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/interviews/stats/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.stats;
  } catch (error) {
    console.error('Error fetching performance stats:', error);
    throw error;
  }
};

export default {
  getInterviewQuestion,
  evaluateInterviewAnswer,
  startInterviewSession,
  saveInterviewFeedback,
  getInterviewHistory,
  getPerformanceStats
};
