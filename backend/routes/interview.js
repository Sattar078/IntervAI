import express from "express";
import { supabase } from "../config/supabase.js";
import { generateInterviewQuestion, evaluateAnswer } from "../services/geminiService.js";

const router = express.Router();

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
    console.error("Route Error [POST /start]:", error.message);
    res.status(500).json({ error: "Failed to connect to AI and generate question. Please try again." });
  }
});

// POST /api/interviews/evaluate
router.post("/evaluate", async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ error: "Question and answer are required." });
    }

    // 1. Evaluate answer via Gemini
    const evaluation = await evaluateAnswer(question, answer);

    // 2. Save answer, score, and feedback into Supabase
    const { data, error } = await supabase
      .from("interviews")
      .insert([{ question, answer, score: evaluation.score, feedback: evaluation }])
      .select()
      .single();

    if (error) throw error;

    // 3. Return evaluation JSON
    res.status(200).json({ evaluation, record: data });
  } catch (error) {
    console.error("Route Error [POST /evaluate]:", error.message);
    res.status(500).json({ error: "Failed to connect to AI for evaluation. Please try again." });
  }
});

export default router;