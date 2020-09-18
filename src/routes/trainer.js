const express = require('express');
const route = express.Router();
const trainerController = require('../controller/trainerController');
const adminController = require('../controller/adminController')
const checkLogin = require('../middleware/check.login')


route.get('/profile/me', checkLogin.isTrainer, trainerController.getAccount)

route.patch('/profile/update/me', checkLogin.isTrainer, adminController.updateAccountTrainer)

route.get('/view-topics', checkLogin.isTrainer, trainerController.getTopics)

module.exports = route
