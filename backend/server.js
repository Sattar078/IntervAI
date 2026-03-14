import "dotenv/config"; // Ensure this is the very first import so env vars load immediately
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import interviewRoutes from "./routes/interview.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { supabase } from "./config/supabase.js";

const app = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: '*', // tighten in production (e.g. specific frontend URL)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Database test route
app.get('/api/db-test', async (req, res) => {
  try {
    const { data, error } = await supabase.from('interviews').select('*').limit(5);
    
    if (error) throw error;
    
    console.log('✅ Database connected successfully');
    res.status(200).json({ status: 'Database connected successfully', data });
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    res.status(500).json({ status: 'Database connection failed', error: error.message });
  }
});

// Routes
app.use('/api/interviews', interviewRoutes);

// 404 & error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});