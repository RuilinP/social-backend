const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const postController = require('../controllers/postController');
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

router.post('/', authMiddleware, upload.array('images', 5), postController.createPost);
router.use('/uploads', express.static('uploads'));
router.get('/', postController.getAllPosts);
router.delete('/:id', authMiddleware, postController.deletePost);

module.exports = router;
