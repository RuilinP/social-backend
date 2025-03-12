const PostLike = require('../models/PostLike');
const Post = require('../models/Post');
const User = require('../models/User');

exports.likePost = async (req, res) => {
    try {
        const userId = req.user.id;
        const { postId } = req.params;

        // Check post existing
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user liked the post
        const existingLike = await PostLike.findOne({ where: { userId, postId } });
        if (existingLike) {
            return res.status(400).json({ message: 'You already liked this post' });
        }

        // if the user did not like the post create a new like
        const newLike = await PostLike.create({ userId, postId });
        return res.status(201).json(newLike);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to like post', error: error.message });
    }
};

exports.unlikePost = async (req, res) => {
    try {
        const userId = req.user.id;
        const { postId } = req.params;

        // Check like existing
        const existingLike = await PostLike.findOne({ where: { userId, postId } });
        if (!existingLike) {
            return res.status(400).json({ message: 'You have not liked this post' });
        }

        // Remove like
        await existingLike.destroy();
        return res.json({ message: 'Post unliked successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to unlike post', error: error.message });
    }
};

exports.getPostLikesCount = async (req, res) => {
    try {
        const { postId } = req.params;

        // Check post existing
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Count likes for the post
        const count = await PostLike.count({ where: { postId } });

        return res.json({ postId, likeCount: count });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to get post likes count', error: error.message });
    }
};

exports.getPostLikers = async (req, res) => {
    try {
        const { postId } = req.params;

        // Check if post exists
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Get users who liked the post
        const likers = await PostLike.findAll({
            where: { postId },
            include: {
                model: User,
                attributes: ['id', 'name', 'profile_picture']
            }
        });

        return res.json(likers.map(like => like.User));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to get post likers', error: error.message });
    }
};
