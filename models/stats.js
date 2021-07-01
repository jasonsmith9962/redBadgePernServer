const {DataTypes} = require('sequelize');//1
const db = require('../db');//2

const Stats = db.define('stats', {//3
    gamerTag: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    gamesPlayed: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    gamesWon: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    kdRatio: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },

})

module.exports = Stats;