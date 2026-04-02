const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware');

const doctors = [
  { _id: '1', name: 'Dr. Julian Thorne', specialization: 'Neurology Expert', rating: 4.9, experience: 15, available: true, image: '', fee: 800, about: 'Leading neurologist with expertise in cognitive disorders.' },
  { _id: '2', name: 'Dr. Elena Rossi', specialization: 'Genetics & Longevity', rating: 5.0, experience: 12, available: true, image: '', fee: 1200, about: 'Precision medicine specialist focused on genetic health.' },
  { _id: '3', name: 'Dr. Sarah Jenkins', specialization: 'Dermatology', rating: 4.7, experience: 8, available: false, image: '', fee: 600, about: 'Expert in skin health and cosmetic dermatology.' },
  { _id: '4', name: 'Dr. Alistair Vance', specialization: 'Cardiology', rating: 4.8, experience: 20, available: true, image: '', fee: 1500, about: 'Renowned cardiologist specializing in preventive cardiac care.' },
  { _id: '5', name: 'Dr. Priya Sharma', specialization: 'Mental Health', rating: 4.6, experience: 10, available: true, image: '', fee: 700, about: 'Compassionate psychiatrist with focus on holistic mental wellness.' },
  { _id: '6', name: 'Dr. Marcus Ray', specialization: 'Sports Medicine', rating: 4.8, experience: 11, available: true, image: '', fee: 900, about: 'Sports medicine expert helping athletes perform at peak levels.' },
];








router.get('/', (req, res) => {
  res.json({ success: true, data: doctors });
});

router.post('/:id/book',  (req, res) => {
  const { date, time, type } = req.body;
  res.json({ success: true, message: 'Session booked successfully!', data: { doctorId: req.params.id, date, time, type, bookingId: `BK${Date.now()}` } });
});

module.exports = router;
