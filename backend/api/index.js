require('dotenv').config({ path: require('path').join(__dirname, '../src/.env') });

const express = require('express');
const connectDB = require('../src/config/db');
const cors = require('cors');

const app = express();

// CORS — allow all origins for Vercel deployment
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Connect DB (cached for serverless)
connectDB();

// Routes
app.use('/api/auth', require('../src/routes/auth'));
app.use('/api/rooms', require('../src/routes/rooms'));
app.use('/api/bookings', require('../src/routes/bookings'));

// Health check
app.get('/api', (req, res) => {
  res.json({ status: 'LuxStay API is running ✅' });
});

module.exports = app;
