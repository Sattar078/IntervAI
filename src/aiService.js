/**
 * aiService.js
 * Dummy data service module to simulate AI interview functionality.
 * Returns mock data to keep the application flow working.
 */

// Dummy interview questions for different categories
const dummyQuestions = {
  'Frontend': [
    { question: 'Explain the difference between var, let, and const in JavaScript.', difficulty: 'Beginner' },
    { question: 'What is the Virtual DOM and how does React use it?', difficulty: 'Intermediate' },
    { question: 'How does CSS Flexbox work?', difficulty: 'Beginner' },
    { question: 'Explain closure in JavaScript with an example.', difficulty: 'Intermediate' },
    { question: 'What are React hooks and why were they introduced?', difficulty: 'Intermediate' }
  ],
  'React': [
    { question: 'What is the purpose of useEffect hook?', difficulty: 'Beginner' },
    { question: 'Explain the difference between controlled and uncontrolled components.', difficulty: 'Intermediate' },
    { question: 'How does React handle state updates?', difficulty: 'Intermediate' },
    { question: 'What is the Context API and when should you use it?', difficulty: 'Intermediate' },
    { question: 'Explain prop drilling and how to avoid it.', difficulty: 'Intermediate' }
  ],
  'Backend': [
    { question: 'What are RESTful APIs and their principles?', difficulty: 'Beginner' },
    { question: 'Explain the difference between SQL and NoSQL databases.', difficulty: 'Intermediate' },
    { question: 'What is middleware in backend development?', difficulty: 'Beginner' },
    { question: 'How does authentication and authorization work?', difficulty: 'Intermediate' },
    { question: 'What is caching and why is it important?', difficulty: 'Intermediate' }
  ],
  'Behavioral': [
    { question: 'Tell me about a time you had to work with a difficult team member.', difficulty: 'Beginner' },
    { question: 'Describe a situation where you had to learn something new quickly.', difficulty: 'Beginner' },
    { question: 'How do you handle failures and setbacks?', difficulty: 'Intermediate' },
    { question: 'Tell us about your biggest achievement in a project.', difficulty: 'Beginner' },
    { question: 'How do you prioritize tasks when everything seems urgent?', difficulty: 'Intermediate' }
  ]
};

// Dummy evaluations
const generateDummyEvaluation = () => {
  const scores = [6, 7, 8, 8, 9];
  const evaluations = [
    {
      score: scores[Math.floor(Math.random() * scores.length)],
      strengths: 'Clear explanation with good understanding of concepts',
      weaknesses: 'Could provide more practical examples',
      correctAnswer: 'The concept you mentioned is correct and well explained.',
      improvements: ['Provide real-world examples', 'Discuss edge cases', 'Mention performance considerations'],
      detailedReview: 'Good understanding of the fundamental concepts. Try to relate your answer to real-world scenarios for better clarity.'
    },
    {
      score: 7,
      strengths: 'Demonstrated practical knowledge',
      weaknesses: 'Could go deeper into implementation details',
      correctAnswer: 'Your understanding is on the right track.',
      improvements: ['Discuss implementation approaches', 'Consider performance implications', 'Mention common pitfalls'],
      detailedReview: 'You showed solid practical knowledge. Consider exploring edge cases and performance optimizations in your future answers.'
    },
    {
      score: 8,
      strengths: 'Comprehensive answer with good technical depth',
      weaknesses: 'Could have mentioned additional considerations',
      correctAnswer: 'Your answer covers the core concepts well.',
      improvements: ['Mention scalability aspects', 'Discuss testing strategies', 'Add security considerations'],
      detailedReview: 'Excellent response! You covered the main points thoroughly. For next time, consider discussing scalability and security implications.'
    }
  ];
  return evaluations[Math.floor(Math.random() * evaluations.length)];
};

/**
 * Generates a single interview question based on category and difficulty.
 * @param {string} category - The interview category
 * @param {string} difficulty - The difficulty level
 * @returns {Promise<string>} A mock interview question
 */
export const generateQuestion = async (category, difficulty) => {
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const categoryKey = Object.keys(dummyQuestions).find(key => 
    key.toLowerCase() === category.toLowerCase()
  ) || 'Frontend';
  
  const questions = dummyQuestions[categoryKey];
  const filteredQuestions = questions.filter(q => q.difficulty === difficulty);
  
  if (filteredQuestions.length === 0) {
    return questions[Math.floor(Math.random() * questions.length)].question;
  }
  
  return filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)].question;
};

/**
 * Evaluates a candidate's answer to a question.
 * @param {string} question - The interview question
 * @param {string} answer - The candidate's answer
 * @returns {Promise<object>} Mock evaluation with score and feedback
 */
export const evaluateAnswer = async (question, answer) => {
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return generateDummyEvaluation();
};

/**
 * Generates an interview session with multiple questions.
 * @param {string} category - The interview category
 * @returns {Promise<Array>} Array of question objects with difficulty levels
 */
export const generateInterviewSession = async (category) => {
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const categoryKey = Object.keys(dummyQuestions).find(key => 
    key.toLowerCase() === category.toLowerCase()
  ) || 'Frontend';
  
  return dummyQuestions[categoryKey];
};

/**
 * Analyzes candidate performance from all answers.
 * @param {Array} qnaList - List of questions and answers
 * @returns {Promise<object>} Mock performance analysis
 */
export const generateFinalReport = async (qnaList) => {
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return {
    weakAreas: ['Async/Await Patterns', 'System Design', 'Advanced Data Structures'],
    suggestedTopics: ['Event Loop', 'Microservices Architecture', 'Algorithm Optimization'],
    candidateLevel: 'Intermediate'
  };
};

/**
 * Generates interview questions based on resume content.
 * @param {string} resumeText - The candidate's resume text
 * @returns {Promise<Array>} Array of question objects tailored to resume
 */
export const generateQuestionsFromResume = async (resumeText) => {
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return a mix of frontend and backend questions since we don't know what's in resume
  return [
    { question: 'Can you walk us through a challenging project you mentioned in your resume?', difficulty: 'Intermediate' },
    { question: 'What was your role in the team and what did you learn?', difficulty: 'Beginner' },
    { question: 'How did you handle technical challenges in your previous projects?', difficulty: 'Intermediate' },
    { question: 'What technologies have you worked with most extensively?', difficulty: 'Beginner' },
    { question: 'Can you describe your most complex technical achievement?', difficulty: 'Advanced' }
  ];
};