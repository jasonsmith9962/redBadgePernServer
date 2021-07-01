const {DataTypes} = require('sequelize');//1
const db = require('../db');//2

const Posts = db.define('posts', {//3
    gamerTag: {
        type: DataTypes.STRING,
    },
    playersNeeded: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    micRequired: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM,
        values: ['casual', 'ranked'],
        allowNull: false
    },
    comments: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
})

module.exports = Posts;