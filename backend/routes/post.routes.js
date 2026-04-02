const express = require('express');
const router = express.Router();
const { createPost, getPosts, likePost, commentPost, deletePost } = require('../controllers/post.controller');
const { protect } = require('../middlewares/auth.middleware');

router.route('/').get(protect, getPosts).post(protect, createPost);
router.route('/:id').delete(protect, deletePost);
router.put('/:id/like', protect, likePost);
router.post('/:id/comment', protect, commentPost);

module.exports = router;
