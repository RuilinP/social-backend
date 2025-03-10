const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/', authMiddleware, postController.createPost);
router.get('/', postController.getAllPosts);
router.delete('/:id', authMiddleware, postController.deletePost);

module.exports = router;
