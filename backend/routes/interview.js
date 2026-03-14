import express from "express";
import { supabase } from "../config/supabase.js";
import { generateInterviewQuestion, evaluateAnswer } from "../services/geminiService.js";
import { 
  evaluateAnswer as evaluateAnswerWithSTAR,
  getRandomQuestion,
  getQuestionsByLevel
} from "../services/interviewEvaluationService.js";

const router = express.Router();

// GET /api/interviews/question - Get a random question
router.post("/question", async (req, res) => {
  try {
    const { role = "Software Developer", difficulty = "mid" } = req.body;

    // Get random question based on difficulty level
    const question = getRandomQuestion(difficulty);

    if (!question) {
      return res.status(404).json({ error: "No questions found for this level" });
    }

    res.status(200).json({ 
      message: "Question retrieved successfully",
      question: question.question,
      id: question.id,
      level: question.level,
      topic: question.topic
    });
  } catch (error) {
    console.error("Route Error [POST /question]:", error.message);
    res.status(500).json({ error: "Failed to retrieve question", details: error.message });
  }
});

// POST /api/interviews/start
router.post("/start", async (req, res) => {
  try {
    const { role, difficulty } = req.body;

    if (!role || !difficulty) {
      return res.status(400).json({ error: "Role and difficulty are required." });
    }

    // 1. Generate question via Gemini
    const question = await generateInterviewQuestion(role, difficulty);

    // 2. Store the generated question in the Supabase 'interviews' table
    const { data, error } = await supabase
      .from("interviews")
      .insert([{ role, difficulty, question }])
      .select()
      .single();

    if (error) throw error;

    // 3. Return the generated question
    res.status(200).json({ 
      message: "Interview started successfully", 
      question: question,
      record: data 
    });
  } catch (error) {
    console.error("Route Error [POST /start]:", error.message || error);
    // Ensure we return a structured JSON error if Gemini generation fails
    res.status(500).json({ error: "Failed to connect to AI and generate question.", details: error.message });
  }
});

// POST /api/interviews/evaluate - Evaluate answer with STAR method
router.post("/evaluate", async (req, res) => {
  try {
    const { question, answer, role = "Software Developer" } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ error: "Question and answer are required." });
    }

    // Evaluate answer using STAR method
    const evaluation = evaluateAnswerWithSTAR(answer, question, role);

    res.status(200).json({ 
      message: "Answer evaluated successfully",
      evaluation 
    });
  } catch (error) {
    console.error("Route Error [POST /evaluate]:", error.message);
    res.status(500).json({ error: "Failed to evaluate answer", details: error.message });
  }
});

export default router;