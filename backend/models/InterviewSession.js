const mongoose = require('mongoose');

const interviewSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    category: {
      type: String,
      enum: ['Frontend', 'React', 'Backend', 'HR'],
      required: true
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true
    },
    score: {
      type: Number,
      min: 0,
      max: 10,
      default: 0
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const InterviewSession = mongoose.model('InterviewSession', interviewSessionSchema);

module.exports = InterviewSession;