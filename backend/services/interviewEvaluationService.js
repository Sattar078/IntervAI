/**
 * interviewEvaluationService.js
 * Evaluates interview answers using STAR method and provides structured feedback
 * with scoring and follow-up questions based on performance
 */

const interviewQuestions = {
  junior: [
    {
      id: 1,
      question: "Tell me about a time when you had to debug a complex issue in your code. What was the problem, and how did you solve it?",
      level: "junior",
      topic: "problem-solving"
    },
    {
      id: 2,
      question: "Describe a situation where you worked on a team project. What was your role and how did you contribute?",
      level: "junior",
      topic: "teamwork"
    },
    {
      id: 3,
      question: "Tell me about a time when you learned a new technology or framework. How did you approach the learning process?",
      level: "junior",
      topic: "learning"
    },
    {
      id: 4,
      question: "Can you describe when you received critical feedback? How did you handle it?",
      level: "junior",
      topic: "feedback"
    },
    {
      id: 5,
      question: "Tell me about your first significant coding project. What challenges did you face?",
      level: "junior",
      topic: "technical"
    }
  ],
  mid: [
    {
      id: 6,
      question: "Describe a time when you had to optimize a slow application. What was your approach and what were the results?",
      level: "mid",
      topic: "technical"
    },
    {
      id: 7,
      question: "Tell me about a time when you mentored a junior developer. How did you help them grow?",
      level: "mid",
      topic: "leadership"
    },
    {
      id: 8,
      question: "Describe a situation where you had to make a difficult technical decision. How did you evaluate the options?",
      level: "mid",
      topic: "decision-making"
    },
    {
      id: 9,
      question: "Tell me about a time when a project deadline was at risk. How did you respond?",
      level: "mid",
      topic: "crisis-management"
    },
    {
      id: 10,
      question: "Describe when you had to refactor legacy code. What was the challenge and outcome?",
      level: "mid",
      topic: "technical"
    }
  ],
  senior: [
    {
      id: 11,
      question: "Tell me about a time when you architected a solution for a complex system. How did you approach the design?",
      level: "senior",
      topic: "architecture"
    },
    {
      id: 12,
      question: "Describe a situation where you had to lead a cross-functional team through a major change. How did you handle it?",
      level: "senior",
      topic: "leadership"
    },
    {
      id: 13,
      question: "Tell me about a time when you identified a significant technical debt in your organization. How did you address it?",
      level: "senior",
      topic: "technical"
    },
    {
      id: 14,
      question: "Describe when you had to hire and build a high-performing technical team from scratch.",
      level: "senior",
      topic: "team-building"
    },
    {
      id: 15,
      question: "Tell me about a time when you had to make a strategic decision that impacted the business significantly.",
      level: "senior",
      topic: "strategy"
    }
  ]
};

const followUpQuestions = {
  harder: [
    "Can you walk me through your specific decision-making process in more detail?",
    "What would you do differently if faced with a similar situation today?",
    "How did this experience shape your approach to similar challenges?",
    "What was the most challenging aspect of this situation?",
    "Can you quantify the impact or improvements you achieved?"
  ],
  easier: [
    "What was your primary responsibility in this situation?",
    "Can you break down the steps you took to resolve this?",
    "How did this experience help you grow?",
    "What would you consider the main lesson here?",
    "How did others react to your solution?"
  ]
};

/**
 * Evaluates answer using STAR method
 * Returns comprehensive feedback with score and suggestions
 */
export const evaluateAnswer = (answer, question, role = 'mid') => {
  const starAnalysis = analyzeStar(answer);
  const score = calculateScore(starAnalysis);
  const strengths = identifyStrengths(starAnalysis, answer);
  const weaknesses = identifyWeaknesses(starAnalysis, answer);
  const suggestions = generateSuggestions(starAnalysis, score);
  
  const followUp = score > 8 
    ? getHarderFollowUp(question)
    : score < 5
    ? getEasierFollowUp(question)
    : null;

  return {
    question,
    evaluation: {
      score,
      starAnalysis,
      strengths,
      weaknesses,
      correct_answer: generateIdealAnswer(question, role),
      improvement_suggestions: suggestions
    },
    followUpQuestion: followUp
  };
};

/**
 * Analyzes answer against STAR criteria
 */
function analyzeStar(answer) {
  const lowerAnswer = answer.toLowerCase();
  
  return {
    situation: {
      present: hasSituationContext(lowerAnswer),
      details: extractContextDetails(answer),
      score: hasSituationContext(lowerAnswer) ? 1 : 0
    },
    task: {
      present: hasTaskDescription(lowerAnswer),
      details: extractTaskDetails(answer),
      score: hasTaskDescription(lowerAnswer) ? 1 : 0
    },
    action: {
      present: hasActionDescription(lowerAnswer),
      details: extractActionDetails(answer),
      score: hasActionDescription(lowerAnswer) ? 2 : 0,
      qualityScore: evaluateActionQuality(lowerAnswer)
    },
    result: {
      present: hasResult(lowerAnswer),
      details: extractResultDetails(answer),
      score: hasResult(lowerAnswer) ? 1 : 0,
      quantified: hasQuantifiableResult(lowerAnswer)
    }
  };
}

/**
 * Checks if answer contains situation context
 */
function hasSituationContext(answer) {
  const situationKeywords = ['was', 'were', 'during', 'at', 'encountered', 'faced', 'when', 'previous', 'worked on'];
  return situationKeywords.some(keyword => answer.includes(keyword));
}

/**
 * Checks if answer describes the task/challenge
 */
function hasTaskDescription(answer) {
  const taskKeywords = ['had to', 'needed to', 'was responsible for', 'my task', 'challenge', 'problem', 'goal'];
  return taskKeywords.some(keyword => answer.includes(keyword));
}

/**
 * Checks if answer describes specific actions taken
 */
function hasActionDescription(answer) {
  const actionKeywords = ['decided', 'implemented', 'created', 'developed', 'built', 'designed', 'analyzed', 'investigated', 'researched', 'proposed', 'suggested', 'worked', 'collaborated', 'communicated'];
  return actionKeywords.some(keyword => answer.includes(keyword));
}

/**
 * Checks if answer includes results
 */
function hasResult(answer) {
  const resultKeywords = ['resulted in', 'outcome', 'achieved', 'improved', 'reduced', 'increased', 'learned', 'gained', 'delivered', 'completed'];
  return resultKeywords.some(keyword => answer.includes(keyword));
}

/**
 * Checks if result is quantified
 */
function hasQuantifiableResult(answer) {
  const numberPattern = /\b(?:\d+%|\d+x|[$₹]\d+|reduced by \d+|improved \d+|saved \d+)/i;
  return numberPattern.test(answer);
}

/**
 * Evaluates quality of actions described
 */
function evaluateActionQuality(answer) {
  const proactiveKeywords = ['initiative', 'took charge', 'led', 'proposed', 'volunteered', 'drove'];
  const collaborativeKeywords = ['collaborated', 'worked with', 'coordinated', 'consulted', 'team'];
  const technicalKeywords = ['analyzed', 'investigated', 'researched', 'implemented', 'developed', 'architected'];
  
  let qualityScore = 1;
  
  if (proactiveKeywords.some(keyword => answer.includes(keyword))) qualityScore += 0.3;
  if (collaborativeKeywords.some(keyword => answer.includes(keyword))) qualityScore += 0.2;
  if (technicalKeywords.some(keyword => answer.includes(keyword))) qualityScore += 0.25;
  
  return Math.min(qualityScore, 1.5);
}

/**
 * Calculates overall score out of 10
 */
function calculateScore(starAnalysis) {
  let score = 0;
  
  score += starAnalysis.situation.score * 1; // 1 point for situation
  score += starAnalysis.task.score * 1.5; // 1.5 points for task
  score += starAnalysis.action.score * starAnalysis.action.qualityScore; // 2-3 points for action
  score += starAnalysis.result.score * 1.5; // 1.5 points for result
  
  if (starAnalysis.result.quantified) score += 1; // 1 bonus point for quantified results
  
  // Normalize to 10
  return Math.min(Math.round(score * 10) / 10, 10);
}

/**
 * Identifies strengths in the answer
 */
function identifyStrengths(starAnalysis, answer) {
  const strengths = [];
  
  if (starAnalysis.situation.score > 0) {
    strengths.push("Clearly described the situation and context");
  }
  if (starAnalysis.task.score > 0) {
    strengths.push("Identified the specific task or challenge");
  }
  if (starAnalysis.action.score > 0) {
    strengths.push("Detailed the actions you took");
    if (starAnalysis.action.qualityScore > 1) {
      strengths.push("Demonstrated proactive problem-solving and initiative");
    }
  }
  if (starAnalysis.result.score > 0) {
    strengths.push("Provided measurable outcomes and results");
    if (starAnalysis.result.quantified) {
      strengths.push("Quantified the impact with specific metrics");
    }
  }
  
  // Check for additional qualities
  if (answer.includes('learned') || answer.includes('grew')) {
    strengths.push("Highlighted personal growth and learning");
  }
  if (answer.toLowerCase().includes('collaboration') || answer.includes('team')) {
    strengths.push("Emphasized teamwork and collaboration");
  }
  
  return strengths.length > 0 ? strengths : ["Good effort in providing a response"];
};

/**
 * Identifies weaknesses in the answer
 */
function identifyWeaknesses(starAnalysis, answer) {
  const weaknesses = [];
  
  if (starAnalysis.situation.score === 0) {
    weaknesses.push("Missing or vague situation/context setup");
  }
  if (starAnalysis.task.score === 0) {
    weaknesses.push("Did not clearly explain the challenge or task");
  }
  if (starAnalysis.action.score === 0) {
    weaknesses.push("Lacked specific details about actions taken");
  } else if (starAnalysis.action.score < 1.5) {
    weaknesses.push("Could provide more specific technical details about your approach");
  }
  if (starAnalysis.result.score === 0) {
    weaknesses.push("No clear results or outcomes mentioned");
  } else if (!starAnalysis.result.quantified) {
    weaknesses.push("Results could be more specific or quantified");
  }
  
  if (answer.length < 100) {
    weaknesses.push("Answer was too brief; consider providing more detail");
  }
  
  return weaknesses.length > 0 ? weaknesses : [];
}

/**
 * Generates improvement suggestions
 */
function generateSuggestions(starAnalysis, score) {
  const suggestions = [];
  
  if (starAnalysis.situation.score === 0) {
    suggestions.push("Start by setting the scene: What was the context? When was this? Who was involved?");
  }
  if (starAnalysis.task.score === 0) {
    suggestions.push("Clearly state what challenge you faced or what task you were responsible for");
  }
  if (starAnalysis.action.score < 1.5) {
    suggestions.push("Add more specifics: What steps did you take? What tools or technologies did you use?");
  }
  if (starAnalysis.result.score === 0) {
    suggestions.push("Always include outcomes: What happened as a result of your actions? What did you learn?");
  }
  if (!starAnalysis.result.quantified && starAnalysis.result.score > 0) {
    suggestions.push("Quantify your impact: Use metrics, percentages, or concrete numbers to show results");
  }
  
  if (score > 8) {
    suggestions.push("Excellent STAR structure! Consider deepening your reflection on what you learned.");
  } else if (score < 5) {
    suggestions.push("Focus on the STAR structure: Situation, Task, Action, Result. Make sure each element is clear.");
  }
  
  return suggestions.slice(0, 3); // Return top 3 suggestions
}

/**
 * Generates ideal/correct answer based on question
 */
function generateIdealAnswer(question, role) {
  const answerTemplates = {
    debug: "An ideal answer would describe a specific bug you encountered, explain your debugging methodology, detail the tools or techniques you used (logging, breakpoints, etc.), and include the resolution and what you learned.",
    leadership: "An ideal answer would show your approach to guiding others, specific techniques you used, how you measured their growth, and the positive outcomes for the team.",
    optimization: "An ideal answer should discuss your analysis process, the performance issues identified, the solutions implemented, technical details of the optimization, and quantified improvements.",
    technical: "An ideal answer would include the technology stack involved, your architectural decisions and reasoning, trade-offs you considered, implementation details, and measurable outcomes."
  };
  
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('debug') || lowerQuestion.includes('problem')) {
    return answerTemplates.debug;
  } else if (lowerQuestion.includes('mentor') || lowerQuestion.includes('lead')) {
    return answerTemplates.leadership;
  } else if (lowerQuestion.includes('optim') || lowerQuestion.includes('performance')) {
    return answerTemplates.optimization;
  } else {
    return answerTemplates.technical;
  }
}

/**
 * Helper: Extract situation details
 */
function extractContextDetails(answer) {
  const firstSentences = answer.split('.').slice(0, 2).join('.');
  return firstSentences.substring(0, 100) + '...';
}

/**
 * Helper: Extract task details
 */
function extractTaskDetails(answer) {
  const taskMatch = answer.match(/(challenge|task|problem|goal).*?[.!?]/i);
  return taskMatch ? taskMatch[0].substring(0, 100) : 'Not clearly stated';
}

/**
 * Helper: Extract action details
 */
function extractActionDetails(answer) {
  const actionMatch = answer.match(/(decided|implemented|created|developed|built|designed).*?[.!?]/i);
  return actionMatch ? actionMatch[0].substring(0, 100) : 'Not clearly stated';
}

/**
 * Helper: Extract result details
 */
function extractResultDetails(answer) {
  const resultMatch = answer.match(/(resulted in|outcome|achieved|improved|learned).*?[.!?]/i);
  return resultMatch ? resultMatch[0].substring(0, 100) : 'Not clearly stated';
}

/**
 * Gets harder follow-up question for high scores
 */
function getHarderFollowUp(question) {
  const questionIndex = Math.floor(Math.random() * followUpQuestions.harder.length);
  return followUpQuestions.harder[questionIndex];
}

/**
 * Gets easier follow-up question for low scores
 */
function getEasierFollowUp(question) {
  const questionIndex = Math.floor(Math.random() * followUpQuestions.easier.length);
  return followUpQuestions.easier[questionIndex];
}

/**
 * Gets a random question based on level
 */
export const getRandomQuestion = (level = 'mid') => {
  const questions = interviewQuestions[level] || interviewQuestions.mid;
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
};

/**
 * Gets all questions for a specific level
 */
export const getQuestionsByLevel = (level = 'mid') => {
  return interviewQuestions[level] || interviewQuestions.mid;
};

export default {
  evaluateAnswer,
  getRandomQuestion,
  getQuestionsByLevel,
  interviewQuestions
};
