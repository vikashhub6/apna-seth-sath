const express = require('express');
const router = express.Router();

const hospitals = [
  { _id: '1', name: 'St. Mary\'s Advanced Medical', distance: '0.8 miles', type: 'Tertiary Trauma Center', wait: '12 min', beds: 45, phone: '102', address: 'Central District', recommended: true, services: ['Emergency', 'ICU', 'Surgery', 'Diagnostics'] },
  { _id: '2', name: 'City Relief Hub', distance: '1.4 miles', type: 'Urgent Care', wait: '38 min', beds: 12, phone: '108', address: 'North Zone', recommended: false, services: ['Emergency', 'Pharmacy'] },
  { _id: '3', name: 'Mayfair Wellness Center', distance: '3.0 miles', type: 'Multi-Specialty', wait: '5 min', beds: 30, phone: '1800-599-0019', address: 'East Sector', recommended: false, services: ['Diagnostics', 'OPD', 'Fast Track'] },
  { _id: '4', name: 'Kensington Acute Care', distance: '1.6 miles', type: 'Emergency', wait: '20 min', beds: 20, phone: '102', address: 'West End', recommended: false, services: ['Emergency', 'High Load', 'Pharmacy'] },
];

router.get('/', (req, res) => {
  res.json({ success: true, data: hospitals });
});

module.exports = router;
