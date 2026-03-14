/**
 * aiService.js
 * Core service module for interacting with the Google Gemini API.
 * Contains all prompt engineering and response parsing logic for the application.
 */

// Retrieve the API Key from the Vite environment variables (.env file). 
// The 'VITE_' prefix is required by Vite to expose it to the browser.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Construct the complete endpoint URL for the Gemini Pro model using the API key.
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

/**
 * A helper function to make API calls to Gemini.
 * This prevents us from having to rewrite the 'fetch' boilerplate in every single function below.
 * @param {string} prompt - The prompt to send to the AI.
 * @returns {Promise<string>} The AI's generated text content.
 */
const callGeminiAPI = async (prompt) => {
  try {
    // Perform a standard POST request to the Google API endpoint
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Gemini's specific required payload structure
      body: JSON.stringify({
        contents: [{
          parts: [{
            // Inject the prompt text provided by the calling function
            text: prompt
          }]
        }]
      }),
    });

    // Check if the HTTP status code is anything other than 200 OK
    if (!response.ok) {
      const errorBody = await response.json();
      console.error("API Error Response:", errorBody);
      throw new Error(`API request failed with status ${response.status}. See console for details.`);
    }

    // Parse the successful response body into a JavaScript object
    const data = await response.json();
    
    // Safely access the deeply nested text content using optional chaining (?.)
    // If any of these properties are missing, it safely falls back to undefined instead of crashing
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      console.error("Invalid API response structure:", data);
      throw new Error("Failed to parse a valid response from the AI.");
    }

    // Return the raw text string given by the AI
    return text;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Re-throw the error so that the React components (like Dashboard) can catch it and show an alert
    throw error;
  }
};

/**
 * Generates an interview question based on a category and difficulty.
 * @param {string} category - The interview category (e.g., 'React', 'Backend').
 * @param {string} difficulty - The difficulty level (e.g., 'Intermediate').
 * @returns {Promise<string>} A single interview question.
 */
export const generateQuestion = async (category, difficulty) => {
  // Define the strict instructions for the AI model
  const prompt = `
    You are an expert interviewer. Generate one technical interview question for a candidate 
    applying for a '${difficulty}' level '${category}' role.
    The question should be concise, clear, and focused on a single concept.
    Do not add any introductory text, conversational filler, or markdown formatting. 
    Just provide the raw question text.
  `;
  // Pass the prompt to our helper and return the result
  return callGeminiAPI(prompt);
};

/**
 * Evaluates a candidate's answer to a specific question.
 * @param {string} question - The interview question that was asked.
 * @param {string} answer - The candidate's answer.
 * @returns {Promise<object>} An evaluation object with score, review, strengths, and improvements.
 */
export const evaluateAnswer = async (question, answer) => {
  // Inject the specific question and user's answer into the prompt template
  const prompt = `
    You are an expert technical interviewer.

    Evaluate the following answer.

    Question:
    "${question}"

    Candidate Answer:
    "${answer}"

    // Strictly enforce a JSON response structure so our frontend can map it to variables smoothly
    Return the evaluation strictly in the following JSON format. Do not include any other text, explanations, or markdown formatting. Keep feedback concise and helpful.

    {
      "score": <Score (0-10) as a number>,
      "strengths": "<Strengths>",
      "weaknesses": "<Weaknesses>",
      "correctAnswer": "<Correct Answer>",
      "improvementSuggestion": "<Improvement Suggestion>"
    }
  `;

  const rawResponse = await callGeminiAPI(prompt);
  
  try {
    // AI responses often wrap JSON in markdown blocks (e.g., ```json ... ```).
    // This regex safely strips out the markdown backticks and 'json' text.
    const cleanedResponse = rawResponse.replace(/```json\n?|```/g, '').trim();
    // Convert the cleaned string into a usable JavaScript object
    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error("Failed to parse JSON from AI response:", rawResponse);
    throw new Error("The AI returned a response in an unexpected format.");
  }
};

/**
 * Generates a set of 5 interview questions for a session.
 * @param {string} category - The interview category (e.g., 'React').
 * @returns {Promise<Array<{question: string, difficulty: string}>>} An array of question objects.
 */
export const generateInterviewSession = async (category) => {
  const prompt = `
    You are a technical interviewer.
    Generate 5 interview questions for a candidate applying for a '${category}' developer role.
    The difficulty should range from beginner to intermediate.
    Return the response strictly in the following JSON format. Do not add any other text, explanations, or markdown formatting.

    [
      {
        "question": "<The first question>",
        "difficulty": "<'Beginner' or 'Intermediate'>"
      },
      {
        "question": "<The second question>",
        "difficulty": "<'Beginner' or 'Intermediate'>"
      },
      {
        "question": "<The third question>",
        "difficulty": "<'Beginger' or 'Intermediate'>"
      },
      {
        "question": "<The fourth question>",
        "difficulty": "<'Beginner' or 'Intermediate'>"
      },
      {
        "question": "<The fifth question>",
        "difficulty": "<'Beginner' or 'Intermediate'>"
      }
    ]
  `;

  const rawResponse = await callGeminiAPI(prompt);
  try {
    // Strip markdown formatting before attempting to parse the JSON array
    const cleanedResponse = rawResponse.replace(/```json\n?|```/g, '').trim();
    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error("Failed to parse JSON for session:", rawResponse);
    throw new Error("The AI returned a session response in an unexpected format.");
  }
};

/**
 * Analyzes a candidate's overall performance based on all interview answers.
 * @param {Array<{question: string, answer: string}>} qnaList - List of questions and candidate's answers.
 * @returns {Promise<object>} Structured JSON with weak areas, suggested topics, and difficulty level.
 */
export const generateFinalReport = async (qnaList) => {
  // Convert the array of Q&A objects into a single readable text block using map and join
  const answersText = qnaList.map((item, index) => `Q${index + 1}: ${item.question}\nAnswer: ${item.answer}`).join('\n\n');

  const prompt = `
    Analyze the following interview answers from a candidate.

    Answers:
    ${answersText}

    Identify:
    1. Top 3 weak technical areas
    2. Suggested topics to learn
    3. Difficulty level of candidate

    Return strictly in the following JSON format. Do not include any other text, explanations, or markdown formatting.

    {
      "weakAreas": ["<Area 1>", "<Area 2>", "<Area 3>"],
      "suggestedTopics": ["<Topic 1>", "<Topic 2>", "<Topic 3>"],
      "candidateLevel": "<Beginner, Intermediate, or Advanced>"
    }
  `;

  const rawResponse = await callGeminiAPI(prompt);
  try {
    const cleanedResponse = rawResponse.replace(/```json\n?|```/g, '').trim();
    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error("Failed to parse JSON for final report:", rawResponse);
    throw new Error("The AI returned a final report in an unexpected format.");
  }
};

/**
 * Generates a set of 5 interview questions based on a candidate's resume.
 * @param {string} resumeText - The parsed text of the candidate's resume.
 * @returns {Promise<Array<{question: string, difficulty: string}>>} An array of question objects.
 */
export const generateQuestionsFromResume = async (resumeText) => {
  const prompt = `
    You are a technical recruiter.

    Generate 5 interview questions based on this resume:

    ${resumeText}

    Focus on:
    - skills mentioned
    - projects
    - technologies

    Return strictly in the following JSON format. Do not add any other text, explanations, or markdown formatting.

    [
      {
        "question": "<The first question>",
        "difficulty": "<'Beginner', 'Intermediate', or 'Advanced'>"
      },
      // ... exactly 5 questions
      {
        "question": "<The fifth question>",
        "difficulty": "<'Beginner', 'Intermediate', or 'Advanced'>"
      }
    ]
  `;

  const rawResponse = await callGeminiAPI(prompt);
  try {
    const cleanedResponse = rawResponse.replace(/```json\n?|```/g, '').trim();
    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error("Failed to parse JSON for resume questions:", rawResponse);
    throw new Error("The AI returned resume questions in an unexpected format.");
  }
};