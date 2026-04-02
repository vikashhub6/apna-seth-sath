// routes/chat.route.js

const express = require('express');
const { protect } = require('../middlewares/auth.middleware');
const { chatController } = require('../controllers/chat.controller');
const chatUpload = require('../middlewares/file.middleware');

const router = express.Router();

router.post('/chat', protect, chatUpload.single('file'), chatController);
module.exports = router;