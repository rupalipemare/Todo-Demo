var passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth20').Strategy,
    User = require('./../model/user');
module.exports = function () {
    passport.use(new GoogleStrategy({
            clientID: '103773079529-blq5u8n36mfhegqqbbqokm3r3gc5jiuk.apps.googleusercontent.com',
            clientSecret: 'G2Ts8DbismCBLxvxdnu6Xswx',
            callbackURL: "http://localhost:3000/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, cb) {
            User.findOne({ googleId : profile.id }, function (err, user) {
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
                            facebookId : '',
                            googleId : profile.id,
                        });
                        // send email to user just in case required to send the newly created
                        // credentails to user for future login without using google login
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
        }
    ));
};