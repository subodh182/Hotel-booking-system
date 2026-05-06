require('dotenv').config({ path: require('path').join(__dirname, 'src/.env') });

const express = require('express');
const connectDB = require('./src/config/db');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/rooms', require('./src/routes/rooms'));
app.use('/api/bookings', require('./src/routes/bookings'));

app.get('/api', (req, res) => {
  res.json({ status: 'LuxStay API is running ✅' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));