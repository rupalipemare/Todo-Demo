'use strict';
var express =  require('express'),
    router = express.Router(),
    taskController = require('./../controller/task'),
    loginCheck = require('./../middleware/logincheck');

router.use(loginCheck); 
router.get('/pendingTaskList', taskController.pendingTaskList);
router.get('/completedTaskList', taskController.completedTaskList);
router.get('/addTask', taskController.addTask);
router.post('/addTask', taskController.saveTask);
router.post('/addManyTask', taskController.addManyTask);
router.get('/updateTask/:id', taskController.updateTaskView);
router.post('/updateTask', taskController.updateTask);
router.get('/updateStatus/:id', taskController.updateStatus);
router.get('/deleteTask/:id', taskController.deleteTask);
router.post('/deleteManyTask', taskController.deleteManyTask);

module.exports = router;

