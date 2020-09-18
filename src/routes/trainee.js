const express = require('express');
const route = express.Router();
const traineeController = require('../controller/traineeController');
const checkLogin = require('../middleware/check.login')


route.get('/profile/me', checkLogin.isTrainee, traineeController.getAccount)

route.get('/view-course', checkLogin.isTrainee, traineeController.getCourse)

module.exports = route
