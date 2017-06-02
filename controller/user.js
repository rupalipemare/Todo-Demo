'use strict';
var User = require('./../model/user');
module.exports = {
    addUser : function (request, response) {
        response.render('addUser', {userLoggedIn : '', message : ''});
    },
    saveUser : function (request, response) {
        var user = new User(request.body);
        var error = user.validateSync();
        if(error){
            response.render('addUser', {message : error, userLoggedIn : ''})
        }else{
            user.save(function(err, data){
                if(err) {
                    response.render('addUser', {message: err, userLoggedIn: ''});
                }else {
                    response.redirect('/login');
                }
            });
        }
    },
    updateUserView : function (request, response) {
        var userLoggedIn = request.session.user;
        response.render('updateUser', {message: '', userLoggedIn: userLoggedIn , user : userLoggedIn});
    },
    updateUser : function (request, response) {
        var userLoggedIn = request.session.user;
        var user;
        User.findById(request.body.id, function(err, data) {
            if (err)
                console.log(err);
            user = data;
            user.name = request.body.name;
            user.username = request.body.username;
            if(request.body.password != ''){
                user.password = request.body.password;
            }
            var error = user.validateSync();
            if(error){
                response.render('updateUser/'+ request.params.id, {message : error, userLoggedIn : userLoggedIn})
            }else{
                user.save(function(err, data){
                    if(err) {
                        response.render('updateUser/'+ request.params.id, {message: err, userLoggedIn: userLoggedIn});
                    }else {
                        request.session.user = data;
                        response.redirect('/task/pendingTaskList');
                    }
                });
            }
        });

    },
    deleteUser : function (request, response) {
        var query = User.remove({_id : request.params.id});
        query.exec(function(err){
            if(err)
                console.log(err);
            response.redirect('/login');
        });
    },
    logout : function (request, response) {
        request.session.user = '';
        response.redirect('/');
    },
};