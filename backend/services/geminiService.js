import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI = null;

// Initialize the client right before the request to ensure process.env is loaded
function getAIClient() {
  if (!genAI) {
    if (!process.env.GEMINI_API_KEY) {
      console.error("[Gemini Debug] API Key Loaded: No ❌");
      throw new Error("GEMINI_API_KEY is missing in backend .env file.");
    }
    console.log("[Gemini Debug] API Key Loaded: Yes ✅");
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
}

export async function generateInterviewQuestion(role, difficulty) {
  try {
    const ai = getAIClient();
    console.log(`[Gemini Debug] Sending request to generate question for role: ${role} | difficulty: ${difficulty}`);
    
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `You are a senior technical interviewer. Generate one technical interview question for a ${role} developer with ${difficulty} difficulty.\n\nReturn only the question text.`;
    
    const result = await model.generateContent(prompt);
    console.log("[Gemini Debug] Successfully generated question.");
    return result.response.text().trim();
  } catch (error) {
    console.error("[Gemini Debug] Error generating question:", error.message || error);
    throw error;
  }
}

export async function evaluateAnswer(question, answer) {
  try {
    const ai = getAIClient();
    console.log("[Gemini Debug] Sending request to evaluate answer...");
    
    const model = ai.getGenerativeModel({
      model: "gemini-1.5-flash",
      // Enforcing JSON output structure natively if supported
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
    You are a senior technical interviewer evaluating a candidate's answer.
    
    Question: "${question}"
    Candidate Answer: "${answer}"

    Evaluate the candidate's answer and return a structured JSON object with exactly the following keys:
    - "score" (a number from 0 to 10)
    - "strengths" (a short string)
    - "weaknesses" (a short string)
    - "correct_answer" (a short string providing the ideal answer)
    - "improvement_suggestions" (a short string with actionable advice)
    `;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text().trim();
    
    console.log("[Gemini Debug] Successfully evaluated answer.");
    return JSON.parse(responseText);
  } catch (error) {
    console.error("[Gemini Debug] Error evaluating answer:", error.message || error);
    throw error;
  }
}