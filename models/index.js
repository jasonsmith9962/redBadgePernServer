const UserModel = require('./user');
const StatsModel = require('./stats');
const PostsModel = require('./posts');
// const User = require('./user');
// const Posts = require('./posts');
// const Stats = require('./stats');

UserModel.hasMany(PostsModel);
PostsModel.belongsTo(UserModel);

UserModel.hasOne(StatsModel);
StatsModel.belongsTo(UserModel);


module.exports =  {UserModel, StatsModel, PostsModel}