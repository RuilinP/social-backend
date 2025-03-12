const User = require('./User');
const Post = require('./Post');
const PostLike = require('./PostLike');
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

// User - PostLike
User.hasMany(PostLike, { foreignKey: 'userId' });
PostLike.belongsTo(User, { foreignKey: 'userId' });

// Post - PostLike
Post.hasMany(PostLike, { foreignKey: 'userId' });
PostLike.belongsTo(Post, { foreignKey: 'userId' });

// User - Commentlike
Comment.hasMany(CommentLike, { foreignKey: 'commentId' });
CommentLike.belongsTo(Comment, { foreignKey: 'commentId' });


module.exports = { User, Post, PostImage, Comment };
