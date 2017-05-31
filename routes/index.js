var express = require('express');
var router = express.Router();
var indexController = require('./../controller/index');
var passport = require('passport');

/* GET index page. */
router.get('/', indexController.index);

/* GET login page. */
router.get('/login', indexController.login);

/* Verify user login. */
router.post('/login', function(request, response, next){
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            var message = "Invalid credentials";
            return response.render('login', {message: info.message, userLoggedIn: null});
        }
        request.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            request.session.user = user;
            response.redirect('/task/pendingTaskList');
        });
    })(request, response, next);
});
/* Login using google */
router.get('/auth/google', passport.authenticate('google', { scope: ['profile']}));
router.get('/auth/google/callback', function(request, response, next) {
        passport.authenticate('google', function (err, user, info) {
            if (err) {
                return next(err);
            }
            // Successful authentication, redirect home.
            if (!user) {
                console.log('in not user');
                var message = "Invalid credentials";
                // response.redirect('/login');
                return response.render('login', {message: info.message, userLoggedIn: null});
            }
            request.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                request.session.user = user;
                response.redirect('/task/pendingTaskList');
            });
        })(request, response, next);
});

/* Login using facebook */
router.get('/auth/facebook',passport.authenticate('facebook'));
router.get('/auth/facebook/callback', function(request, response, next) {
    passport.authenticate('facebook', function (err, user, info) {
        if (err) {
            return next(err);
        }
        // Successful authentication, redirect home.
        if (!user) {
            console.log('in not user');
            var message = "Invalid credentials";
            // response.redirect('/login');
            return response.render('login', {message: info.message, userLoggedIn: null});
        }
        request.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            request.session.user = user;
            response.redirect('/task/pendingTaskList');
        });
    })(request, response, next);
});

module.exports = router;
