const User = require('./User');
const Post = require('./Post');
const PostImage = require('./PostImage');

User.hasMany(Post, { foreignKey: 'userId', onDelete: 'CASCADE' });
Post.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(PostImage, { foreignKey: 'postId', onDelete: 'CASCADE' });
PostImage.belongsTo(Post, { foreignKey: 'postId' });

module.exports = { User, Post };
