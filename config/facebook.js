var passport = require('passport'),
    facebookStrategy = require('passport-facebook').Strategy,
    User = require('./../model/user');

module.exports = function () {
    passport.use(new facebookStrategy({
        clientID: '292044337915473',
        clientSecret: 'be03baed269997f731c4c561f1072c16',
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    }, function(accessToken, refreshToken, profile, cb){
        User.findOne({ facebookId : profile.id }, function (err, user) {
            if(err){
                return cb(err, false, {message : err});
            }else {
                if (user != '' && user != null) {
                    return cb(null, user, {message : "User "});
                } else {
                    var username  = profile.displayName.split(' ');
                    var userData = new User({
                        name : profile.displayName,
                        username : username[0],
                        password : username[0],
                        facebookId : profile.id,
                        googleId : '',
                    });
                    // send email to user just in case required to send the newly created
                    // credentails to user for future login without using facebook login
                    userData.save(function (err, newuser) {
                        if (err) {
                            return cb(null, false, {message : err + " !!! Please try again"});
                        }else{
                            return cb(null, newuser);
                        }
                    });
                }
            }
        });
    }));
};