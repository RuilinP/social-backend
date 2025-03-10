const User = require('./User');
const Post = require('./Post');

// Define associations here (instead of inside User.js or Post.js)
User.hasMany(Post, { foreignKey: 'userId', onDelete: 'CASCADE' });
Post.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Post };
