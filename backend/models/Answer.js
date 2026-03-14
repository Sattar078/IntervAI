const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    strengths: { type: String },
    weaknesses: { type: String },
    correctAnswer: { type: String },
    improvementSuggestion: { type: String }
  },
  { _id: false }
);

const answerSchema = new mongoose.Schema(
  {
    interviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InterviewSession',
      required: true
    },
    question: {
      type: String,
      required: [true, 'Question is required'],
      trim: true
    },
    userAnswer: {
      type: String,
      required: [true, 'User answer is required'],
      trim: true
    },
    aiFeedback: {
      type: feedbackSchema,
      default: {}
    },
    score: {
      type: Number,
      min: 0,
      max: 10,
      required: true
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;