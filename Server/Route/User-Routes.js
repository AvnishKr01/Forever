const express = require('express');
const userController = require('../Controller/User-Controller');

const userRouter = express.Router();

userRouter.route('/home').get(userController.home);
userRouter.route('/login').post(userController.login)
userRouter.route('/register').post(userController.register)
userRouter.route('/admin').post(userController.admin)

module.exports = userRouter;