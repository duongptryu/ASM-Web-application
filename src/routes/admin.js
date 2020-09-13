const express = require('express');
const route = express.Router();
const adminController = require('../controller/adminController');

route.get('/trainer', adminController.getAccountTrainer)

route.get('/staff', adminController.getAccountStaff)

route.post('/create-trainer', adminController.createAccountTrainer)

route.post('/create-staff', adminController.createAccountStaff)

route.patch('/update-trainer/:id', adminController.updateAccountTrainer)

route.patch('/update-staff/:id', adminController.updateAccountStaff)

route.delete('/delete-trainer/:id', adminController.deleteAccountTrainer)

route.delete('/delete-staff/:id', adminController.deleteAccountStaff)

module.exports = route