const Sequelize = require('sequelize');
// const User = require('./models/user');
// const Posts = require('./models/posts');
// const Stats = require('./models/stats');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    // dialect: 'postgres',
    // ssl: process.env.ENVIRONMENT === 'production',
})

// User = sequelize.import("./models/user");
// Stats = sequelize.import('./models/stats');
// Posts = sequelize.import('./models/posts');



module.exports = sequelize;