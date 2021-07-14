Deployed server heroku link:
http://jas-team-apex.herokuapp.com

Server register
http://jas-team-apex.herokuapp.com/user/register
-emailAddress:
-password:
-then role for "admin" otherwise it defaults to "user" without role.

Server login
http://jas-team-apex.herokuapp.com/user/login
-emailAddress:
-password:

Server CRUD POST
1-http://jas-team-apex.herokuapp.com/posts/create
2-http://jas-team-apex.herokuapp.com/stats/create

Server CRUD GET
1-http://jas-team-apex.herokuapp.com/posts/all
1-http://jas-team-apex.herokuapp.com/posts/mine
1-http://jas-team-apex.herokuapp.com/posts/one/:id

2-http://jas-team-apex.herokuapp.com/stats/all
2-http://jas-team-apex.herokuapp.com/stats/mine
2-http://jas-team-apex.herokuapp.com/stats/one/:id

Server CRUD PUT
1-http://jas-team-apex.herokuapp.com/posts/:postsId

2-http://jas-team-apex.herokuapp.com/stats/:statsId

Server CRUD DELETE
1-http://jas-team-apex.herokuapp.com/posts/delete/:postsId

2-http://jas-team-apex.herokuapp.com/stats/delete/:statsId

Token validation
-Used throughout this server

Database association
-UserModel.hasMany(PostsModel);
-PostsModel.belongsTo(UserModel);

-UserModel.hasOne(StatsModel);
-StatsModel.belongsTo(UserModel);

Role based access
-"user" was the default value unless otherwise entered via postman.

Server successfully deployed

http://jas-team-apex.herokuapp.com



