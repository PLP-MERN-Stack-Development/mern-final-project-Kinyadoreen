// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const dashboardRoutes = require('./routes/dashboard');
const enrollmentRoutes = require('./routes/enrollments');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');

const app = express();

// Middleware
app.use(express.json());

// Enable CORS for React frontend
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true,               // Allows cookies or auth headers if needed
}));

// Routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://kinyadoreen01_db_user:dFWqKZlkzPcORwcO@cluster0.wqmrhpg.mongodb.net/edubridge?retryWrites=true&w=majority'
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(`✅ MongoDB Connected: ${MONGO_URI}`);
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

module.exports = app;
