const mongoose = require('mongoose');
const User = require('../models/user');
const InterviewSession = require('../models/InterviewSession');
const Answer = require('../models/Answer');
const { generateQuestion, evaluateAnswer } = require('../services/geminiService');
const asyncHandler = require('../middleware/asyncHandler');
const ApiError = require('../utils/ApiError');

/**
 * POST /api/interview/start
 * Body: { userId?, name?, email?, category, difficulty }
 *
 * If userId not provided, creates/fetches user using name+email.
 * Returns: { interviewId, question, category, difficulty }
 */
exports.startInterview = asyncHandler(async (req, res) => {
  const { userId, name, email, category, difficulty } = req.body;

  if (!category || !difficulty) {
    throw new ApiError(400, 'category and difficulty are required');
  }

  if (!['Frontend', 'React', 'Backend', 'HR'].includes(category)) {
    throw new ApiError(400, 'Invalid category');
  }

  if (!['easy', 'medium', 'hard'].includes(difficulty)) {
    throw new ApiError(400, 'Invalid difficulty');
  }

  let user;

  if (userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new ApiError(400, 'Invalid userId');
    }
    user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
  } else {
    if (!name || !email) {
      throw new ApiError(
        400,
        'Either userId or both name and email are required'
      );
    }

    user =
      (await User.findOne({ email: email.toLowerCase().trim() })) ||
      (await User.create({
        name: name.trim(),
        email: email.toLowerCase().trim()
      }));
  }

  const question = await generateQuestion(category, difficulty);

  const interview = await InterviewSession.create({
    userId: user._id,
    category,
    difficulty,
    score: 0
  });

  res.status(201).json({
    interviewId: interview._id,
    question,
    category,
    difficulty
  });
});

/**
 * POST /api/interview/answer
 * Body: { interviewId, question, answer }
 *
 * Uses Gemini to evaluate and store the answer, then updates session score
 * as the average of all answer scores in that interview.
 *
 * Returns: { score, strengths, weaknesses, correctAnswer, improvementSuggestion }
 */
exports.submitAnswer = asyncHandler(async (req, res) => {
  const { interviewId, question, answer } = req.body;

  if (!interviewId || !question || !answer) {
    throw new ApiError(
      400,
      'interviewId, question, and answer are all required'
    );
  }

  if (!mongoose.Types.ObjectId.isValid(interviewId)) {
    throw new ApiError(400, 'Invalid interviewId');
  }

  const interview = await InterviewSession.findById(interviewId);
  if (!interview) {
    throw new ApiError(404, 'Interview session not found');
  }

  const evaluation = await evaluateAnswer(question, answer);

  const createdAnswer = await Answer.create({
    interviewId: interview._id,
    question: question.trim(),
    userAnswer: answer.trim(),
    aiFeedback: {
      strengths: evaluation.strengths,
      weaknesses: evaluation.weaknesses,
      correctAnswer: evaluation.correctAnswer,
      improvementSuggestion: evaluation.improvementSuggestion
    },
    score: evaluation.score
  });

  // Recalculate average score for the interview
  const agg = await Answer.aggregate([
    { $match: { interviewId: interview._id } },
    {
      $group: {
        _id: '$interviewId',
        avgScore: { $avg: '$score' }
      }
    }
  ]);

  const avgScore = agg[0]?.avgScore ?? 0;
  interview.score = Math.round(avgScore * 10) / 10;
  await interview.save();

  res.status(201).json({
    answerId: createdAnswer._id,
    interviewId: interview._id,
    score: evaluation.score,
    strengths: evaluation.strengths,
    weaknesses: evaluation.weaknesses,
    correctAnswer: evaluation.correctAnswer,
    improvementSuggestion: evaluation.improvementSuggestion,
    interviewScore: interview.score
  });
});

/**
 * GET /api/interview/history/:userId
 *
 * Returns all interview sessions for the user, with associated answers.
 */
exports.getHistory = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, 'Invalid userId');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const sessions = await InterviewSession.find({ userId })
    .sort({ createdAt: -1 })
    .lean();

  const interviewIds = sessions.map((s) => s._id);
  const answers = await Answer.find({
    interviewId: { $in: interviewIds }
  })
    .sort({ createdAt: 1 })
    .lean();

  const answersByInterview = answers.reduce((acc, ans) => {
    const key = ans.interviewId.toString();
    if (!acc[key]) acc[key] = [];
    acc[key].push(ans);
    return acc;
  }, {});

  const result = sessions.map((session) => ({
    ...session,
    answers: answersByInterview[session._id.toString()] || []
  }));

  res.status(200).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    },
    interviews: result
  });
});