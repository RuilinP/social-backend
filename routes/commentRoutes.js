const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const commentController = require('../controllers/commentController');
const commentLikeController = require('../controllers/commentLikeController');

router.get('/', commentController.getAllComments);


router.get('/post/:postId', commentController.getCommentsByPost);


router.post('/post/:postId', authMiddleware, commentController.createComment);


router.delete('/:id', authMiddleware, commentController.deleteComment);

//commentLike routes
router.post('/:commentId/like', authMiddleware, commentLikeController.likeComment);


router.delete('/:commentId/unlike', authMiddleware, commentLikeController.unlikeComment);


router.get('/:commentId/count', commentLikeController.getCommentLikesCount);


router.get('/:commentId/likers', commentLikeController.getCommentLikers);

module.exports = router;
