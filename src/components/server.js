require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow cross-origin requests from your React frontend
app.use(express.json()); // Parse incoming JSON payloads

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'success', 
    message: 'IntervAI Backend is running smoothly.' 
  });
});

// Database Connection & Server Initialization
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB');
    
    // Only start listening for requests after the DB connection is established
    app.listen(PORT, () => {
      console.log(`🚀 Server is running in development mode on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
  });