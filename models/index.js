const User = require('./User');
const Post = require('./Post');
const PostImage = require('./PostImage');
const Comment = require('./Comment');
const CommentLike = require('./CommentLike');

// User - Post
User.hasMany(Post, { foreignKey: 'userId', onDelete: 'CASCADE' });
Post.belongsTo(User, { foreignKey: 'userId' });

// Post - PostImage
Post.hasMany(PostImage, { foreignKey: 'postId', onDelete: 'CASCADE' });
PostImage.belongsTo(Post, { foreignKey: 'postId' });

// User - Comment
User.hasMany(Comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'userId' });

// Post - Comment
Post.hasMany(Comment, { foreignKey: 'postId', onDelete: 'CASCADE' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

// User/Comment - Commentlike
User.hasMany(CommentLike, { foreignKey: 'userId' });
CommentLike.belongsTo(User, { foreignKey: 'userId' });
Comment.hasMany(CommentLike, { foreignKey: 'commentId' });
CommentLike.belongsTo(Comment, { foreignKey: 'commentId' });


module.exports = { User, Post, PostImage, Comment };
