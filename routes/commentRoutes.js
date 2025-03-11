const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const commentController = require('../controllers/commentController');


router.get('/', commentController.getAllComments);


router.get('/post/:postId', commentController.getCommentsByPost);


router.post('/post/:postId', authMiddleware, commentController.createComment);


router.delete('/:id', authMiddleware, commentController.deleteComment);

module.exports = router;
