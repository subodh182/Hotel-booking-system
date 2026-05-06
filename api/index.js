

const express = require('express');
const connectDB = require('../backend/src/config/db');
const cors = require('cors');

const app = express();

// CORS — allow all origins for Vercel deployment
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Ensure DB is connected before handling any API request
app.use('/api', async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('DB Connection Failed:', err.message);
    res.status(500).json({ error: 'Database connection failed. Please check Vercel Environment Variables.' });
  }
});

// Routes
app.use('/api/auth', require('../backend/src/routes/auth'));
app.use('/api/rooms', require('../backend/src/routes/rooms'));
app.use('/api/bookings', require('../backend/src/routes/bookings'));

// Health check
app.get('/api', (req, res) => {
  res.json({ status: 'LuxStay API is running ✅' });
});

// Serve frontend for all other routes
const path = require('path');
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

module.exports = app;
