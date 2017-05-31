'use strict';

module.exports = {
    index : function(request, response){
        response.render('index', {userLoggedIn : '', title: 'Task Scheduler' });
    },
    login : function(request, response){
        response.render('login', {userLoggedIn : '', message :'', title: 'Express' });
    },
};