var express = require('express');
var router = express.Router();
var userController = require('./../controller/user');
var loginCheck = require('./../middleware/logincheck');

/* GET users listing. */
router.get('/addUser',userController.addUser);
router.post('/addUser',userController.saveUser);
router.use(loginCheck)
router.get('/updateUser/:id', userController.updateUserView);
router.post('/updateUser', userController.updateUser);
router.get('/deleteUser', userController.deleteUser);
router.get('/logout', userController.logout);

module.exports = router;
