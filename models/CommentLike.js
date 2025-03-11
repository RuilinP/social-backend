const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Comment = require('./Comment');

const CommentLike = sequelize.define('CommentLike', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.STRING, 
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  commentId: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: Comment,
      key: 'id'
    },
    onDelete: 'CASCADE'
  }

});


module.exports = CommentLike;
