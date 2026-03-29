const express = require('express');
const router = express.Router();

const schemes = [
  { _id: '1', name: 'Ayushman Bharat - PMJAY', description: 'Health insurance cover of ₹5 lakh per family per year for secondary and tertiary hospitalization.', eligibility: { maxIncome: 200000, ageMin: 0, ageMax: 100, gender: 'all' }, status: 'ACTIVE ENROLLMENT', category: 'Insurance', link: '#' },
  { _id: '2', name: 'National Health Mission', description: 'Comprehensive healthcare delivery system focusing on reproductive, maternal, neonatal and child health.', eligibility: { maxIncome: 500000, ageMin: 0, ageMax: 60, gender: 'all' }, status: 'ACTIVE ENROLLMENT', category: 'General', link: '#' },
  { _id: '3', name: 'Rural Care Initiative', description: 'Bridging the gap in healthcare accessibility for remote and underserved rural communities nationwide.', eligibility: { maxIncome: 150000, ageMin: 18, ageMax: 70, gender: 'all' }, status: 'POLICY UPDATES', category: 'Rural', link: '#' },
  { _id: '4', name: 'Pradhan Mantri Suraksha Bima Yojana', description: 'Accident insurance scheme providing ₹2 lakh coverage at just ₹20 per year premium.', eligibility: { maxIncome: 1000000, ageMin: 18, ageMax: 70, gender: 'all' }, status: 'ACTIVE ENROLLMENT', category: 'Insurance', link: '#' },
  { _id: '5', name: 'Janani Suraksha Yojana', description: 'Safe motherhood intervention to reduce maternal and neonatal mortality by promoting institutional delivery.', eligibility: { maxIncome: 300000, ageMin: 18, ageMax: 45, gender: 'female' }, status: 'ACTIVE ENROLLMENT', category: 'Maternal', link: '#' },
  { _id: '6', name: 'Rashtriya Arogya Nidhi', description: 'Financial assistance to patients living below poverty line who are suffering from life threatening diseases.', eligibility: { maxIncome: 100000, ageMin: 0, ageMax: 100, gender: 'all' }, status: 'ACTIVE ENROLLMENT', category: 'Critical Care', link: '#' },
];

router.get('/', (req, res) => {
  const { age, income, gender } = req.query;
  let filtered = schemes;
  if (age) filtered = filtered.filter(s => parseInt(age) >= s.eligibility.ageMin && parseInt(age) <= s.eligibility.ageMax);
  if (income) filtered = filtered.filter(s => parseInt(income) <= s.eligibility.maxIncome);
  if (gender && gender !== 'all') filtered = filtered.filter(s => s.eligibility.gender === 'all' || s.eligibility.gender === gender);
  res.json({ success: true, data: filtered });
});

module.exports = router;
