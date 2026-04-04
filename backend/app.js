const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({ 
  origin: ['http://localhost:5173', 'http://localhost:5174', 'https://apna-seth-sath.vercel.app'], 
  credentials: true 
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/posts', require('./routes/post.routes'));
app.use('/api/doctors', require('./routes/doctor.routes'));
app.use('/api/schemes', require('./routes/scheme.routes'));
app.use('/api/emergency', require('./routes/emergency.routes'));
app.use('/api/aibot', require('./routes/chat.routes')); 

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'SehatSaathi API is running 🏥' });
});

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

module.exports = app;