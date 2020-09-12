const express = require('express');
const route = express.Router();
const traineeController = require('../controller/traineeController');
const adminController = require('../controller/adminController')

route.get('profile/me', adminController.getAccountStaff)

route.patch('update/me', adminController.updateAccountTrainer)

route.get('/views', traineeController.getTopic)

module.exports = route