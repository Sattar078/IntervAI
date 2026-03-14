import { GoogleGenerativeAI } from "@google/generative-ai";

// Debug log to verify the key is loaded
console.log("Gemini API Key Loaded:", process.env.GEMINI_API_KEY ? "Yes ✅" : "No ❌");

// Initialize the client using the key from the environment
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateInterviewQuestion(role, difficulty) {
  try {
    if (!process.env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is missing in backend.");
    console.log(`[Gemini] Sending request to generate question for role: ${role} | difficulty: ${difficulty}`);
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `You are a senior technical interviewer. Generate one technical interview question for a ${role} developer with ${difficulty} difficulty.\n\nReturn only the question text.`;
    
    const result = await model.generateContent(prompt);
    console.log("[Gemini] Successfully generated question.");
    return result.response.text().trim();
  } catch (error) {
    console.error("[Gemini] Error generating question:", error.message || error);
    throw error;
  }
}

export async function evaluateAnswer(question, answer) {
  try {
    if (!process.env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is missing in backend.");
    console.log("[Gemini] Sending request to evaluate answer...");
    
    const model = genAI.getGenerativeModel({
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
    
    console.log("[Gemini] Successfully evaluated answer.");
    return JSON.parse(responseText);
  } catch (error) {
    console.error("[Gemini] Error evaluating answer:", error.message || error);
    throw error;
  }
}