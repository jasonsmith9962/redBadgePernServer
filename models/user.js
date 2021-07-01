const { DataTypes } = require('sequelize');
const db = require('../db');
const User = db.define('user', {
    emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM({
        values: ['user', 'admin']}),
        allowNull: false,
        defaultValue: 'user'
    },
    
});
module.exports = User;