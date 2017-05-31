var passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    User = require('./../model/user');

module.exports = function () {
    passport.use(new localStrategy(function (username, password, done) {
        User.findOne({username : username}, function(err, user){
            if(err)
                console.log(err);
            if(!user){
                done(null, false, {message : "Invalid Username"});
            }else{
                user.comparePassword(password, function (err, result) {
                   if(err)
                       console.log(err);
                   if(result == true){
                       user = user;
                       done(null, user);
                   }else{
                        done(null, false, {message : "Invalid Password"});
                   } 
                });
            }
        });
    }));
};