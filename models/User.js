const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: { type: DataTypes.STRING, primaryKey: true },  
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    profile_picture: { type: DataTypes.STRING }
});

module.exports = User;
