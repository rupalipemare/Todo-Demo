'use strict';

module.exports = function (request, response, next) {
    if(!request.session.user && request.path != '/login'){
        response.redirect('/login');
    }else{
        next();
    }
};
