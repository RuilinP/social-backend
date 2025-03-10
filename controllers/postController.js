const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    try {
        const { content } = req.body;
        const post = await Post.create({
            userId: req.user.id,
            content
        });

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
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
