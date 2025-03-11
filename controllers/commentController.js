const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');


exports.createComment = async (req, res) => {
  try {
    
    const userId = req.user.id;

    const { postId } = req.params;

    const { content } = req.body;

    
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = await Comment.create({
      postId,
      userId,
      content
    });

    return res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'profile_picture']
        },
        {
          model: Post,
          attributes: ['content']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    return res.json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    
    const comments = await Comment.findAll({
      where: { postId },
      include: [
        {
          model: User,
          attributes: ['name', 'profile_picture']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    return res.json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};



exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    
    if (comment.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await comment.destroy();
    return res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
