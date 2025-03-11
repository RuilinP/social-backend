const CommentLike = require('../models/CommentLike');
const Comment = require('../models/Comment');
const User = require('../models/User');


exports.likeComment = async (req, res) => {
  try {

    const userId = req.user.id;
    
    const { commentId } = req.params;

    
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const existingLike = await CommentLike.findOne({
      where: { userId, commentId }
    });
    if (existingLike) {
      return res.status(400).json({ message: 'You already liked this comment' });
    }

    
    const newLike = await CommentLike.create({ userId, commentId });
    return res.status(201).json(newLike);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to like comment', error: error.message });
  }
};



exports.unlikeComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { commentId } = req.params;

    const existingLike = await CommentLike.findOne({
      where: { userId, commentId }
    });
    if (!existingLike) {
      return res.status(400).json({ message: 'You have not liked this comment' });
    }

    await existingLike.destroy();
    return res.json({ message: 'Comment unliked successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to unlike comment', error: error.message });
  }
};


exports.getCommentLikesCount = async (req, res) => {
  try {
    const { commentId } = req.params;


    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const count = await CommentLike.count({
      where: { commentId }
    });

    return res.json({
      commentId,
      likeCount: count
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to get comment likes count', error: error.message });
  }
};

exports.getCommentLikers = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const likers = await CommentLike.findAll({
      where: { commentId },
      include: {
        model: User,
        attributes: ['id', 'name', 'profile_picture'] 
      }
    });

    return res.json(likers.map(like => like.User));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to get comment likers', error: error.message });
  }
};
