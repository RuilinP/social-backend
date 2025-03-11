const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Post = require('./Post');  

const PostImage = sequelize.define('PostImage', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Post,
            key: 'id'
        },
        onDelete: 'CASCADE' 
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = PostImage;
