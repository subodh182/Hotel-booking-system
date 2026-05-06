require('dotenv').config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);
const express = require('express');
const connectDB = require('./src/config/db');

const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'frontend')));
const cors = require("cors");
app.use(cors());
connectDB();

app.use(express.json());

app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/rooms', require('./src/routes/rooms'));
app.use('/api/bookings', require('./src/routes/bookings'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} `));