const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const postController = require('../controllers/postController');
const postLikeController = require('../controllers/postLikeController');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});
const upload = multer({ storage });

// Post Routes
router.post('/', authMiddleware, upload.array('images', 5), postController.createPost);
router.use('/uploads', express.static('uploads'));
router.get('/', postController.getAllPosts);
router.delete('/:id', authMiddleware, postController.deletePost);

// Post Like Routes
router.post('/:postId/like', authMiddleware, postLikeController.likePost);
router.delete('/:postId/unlike', authMiddleware, postLikeController.unlikePost);
router.get('/:postId/count', postLikeController.getPostLikesCount);
router.get('/:postId/likers', postLikeController.getPostLikers);

module.exports = router;
