'use strict';
var User = require('./../model/user');
var Task = require('./../model/task');

module.exports = {

    pendingTaskList: function (request, response) {
        var userLoggedIn = request.session.user;
        Task.find({status : 'Pending'}, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                if (data) {
                    response.render('pendingTaskList', {userLoggedIn: userLoggedIn, message: '', task: data});
                } else {
                    response.redirect('completedTaskList');
                }
            }
        });
    },
    completedTaskList: function (request, response) {
        var userLoggedIn = request.session.user;
        Task.find({status :  'Completed'}, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                if(data != '') {
                    response.render('completedTaskList', {userLoggedIn: userLoggedIn, message: '', task: data});
                }else{
                    response.redirect('/task/pendingTaskList');
                }
            }
        });
    },
    addTask: function (request, response) {
        var userLoggedIn = request.session.user;
        response.render('addTask', {userLoggedIn: userLoggedIn, message: ''});
    },
    saveTask: function (request, response) {
        var userLoggedIn = request.session.user;
        var task = new Task(request.body[0]);
        task.user_id = userLoggedIn._id;
        var error = task.validateSync();
        if (error) {
            response.json({error: true, message: error});
        } else {
            task.save(function (err) {
                if (err) {
                    response.json({error: true, message: err});
                } else {
                    response.json({success: true});
                }
            });
        }
    },
    addManyTask: function (request, response) {
        var userLoggedIn = request.session.user;
        var i = 0;
        var taskData = [];
        request.body.forEach(function (item) {
            item['user_id'] = userLoggedIn._id;
            taskData.push(item);
        });
        Task.create(taskData, function (err) {
            if (err) {
                response.json({error: true, message: err});
            } else {
                response.json({success: true});
            }
        });
    },
    updateTaskView: function (request, response) {
        var userLoggedIn = request.session.user;
        Task.findById(request.params.id, function (err, data) {
            if (err)
                response.redirect('/task/pendingTaskList');
            response.render('updateTask', {userLoggedIn: userLoggedIn, message: '', task: data});
        });
    },
    updateTask: function (request, response) {
        var userLoggedIn = request.session.user;
        var task;
        Task.findById(request.body.id , function(err, data){
            if(err){
                console.log(err);
            }else{
                task = data;
                task.title = request.body.title;
                task.description = request.body.description;
                task.status = request.body.status;
                var error  = task.validateSync();
                if(error){
                    response.render('updateTask/'+ request.params.id, {message: error, userLoggedIn: userLoggedIn, task : task});
                }else{
                    task.save(function(err){
                       if(err)
                            response.render('updateTask/'+ request.params.id, {message: error, userLoggedIn: userLoggedIn, task : task});
                        response.redirect('/task/completedTaskList');
                    });
                }
            }
        });
    },
    updateStatus : function (request, response) {
        Task.findOneAndUpdate({_id : request.params.id}, {status : 'Pending'}, function(err, data){
            if(err){
                console.log(err);
            }else{
                response.redirect('/task/completedTaskList');
            }
        });
    },
    deleteTask: function (request, response) {
        var userLoggedIn = request.session.user;
        // delete task from db
        Task.remove({_id : request.params.id}, function(err){
            if(err){
                console.log(err);
            }else{
                response.redirect('/pendingTaskList');
            }
        });
    },
    deleteManyTask : function(request, response) {
        // Task.deleteMany({ status: 'Completed'}, function (err) {
        //     });
        var id =  request.body;
        Task.remove({_id: {$in: id}}, function (err) {
            if(err){
                response.json({success : false, error : err});
            }else{
                response.json({success : true});
            }
        });
    },
};