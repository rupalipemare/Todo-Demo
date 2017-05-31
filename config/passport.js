var passport = require('passport'),
    localStrategy = require('./localStrategy'),
    google = require('./google'),
    facebook = require('./facebook'),
    User = require('./../model/user');

module.exports = function(app){
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(function(user, done){
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
    localStrategy();
    google();
    facebook();
};
    