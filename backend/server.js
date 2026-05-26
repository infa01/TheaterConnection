require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const theatreRoutes = require('./routes/theatreRoutes');
const showRoutes = require('./routes/showRoutes');
const showtimeRoutes = require('./routes/showtimeRoutes');
const seatRoutes = require('./routes/seatRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/auth', authRoutes);
app.use('/theatres', theatreRoutes);
app.use('/shows', showRoutes);
app.use('/showtimes', showtimeRoutes);
app.use('/seats', seatRoutes);
app.use('/reservations', reservationRoutes);
app.use('/admin', adminRoutes);



const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json({
    message: 'Theater Reservation API is running'
  });
});

app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT NOW() AS server_time');
    res.json({
      message: 'Database connection successful',
      data: rows
    });
  } catch (error) {
    console.error('Database test failed:', error);
    res.status(500).json({
      message: 'Database connection failed',
      error: error.message
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});