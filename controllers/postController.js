const Post = require('../models/Post');
const User = require('../models/User');
const PostImage = require('../models/PostImage'); 

exports.createPost = async (req, res) => {
    try {
        const { content } = req.body;
        const post = await Post.create({
            userId: req.user.id,
            content
        });

        if (req.files) {
            const images = req.files.map(file => ({
                postId: post.id,
                imageUrl: `/uploads/${file.filename}`
            }));
            await PostImage.bulkCreate(images);  
        }

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include:  [
                {
                    model: User,
                    attributes: ['name', 'profile_picture']
                },
                {
                    model: PostImage,
                    attributes: ['imageUrl']  // ✅ Include all images
                }
            ]
        });

        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        if (post.userId !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await post.destroy();
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
