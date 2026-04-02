const express = require('express');
const router = express.Router();
const { signup, login, getProfile, updateProfile, getAllUsers } = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/', protect, getAllUsers);

module.exports = router;
