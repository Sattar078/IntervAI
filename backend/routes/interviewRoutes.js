const express = require('express');
const {
  startInterview,
  submitAnswer,
  getHistory
} = require('../controllers/interviewController');

const router = express.Router();

router.post('/start', startInterview);
router.post('/answer', submitAnswer);
router.get('/history/:userId', getHistory);

module.exports = router;