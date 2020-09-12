const express = require('express');
const route = express.Router();
const adminController = require('../controller/adminController');

route.get('/trainers', adminController.getAccountTrainer)

route.get('/staff', adminController.getAccountStaff)

route.post('/create-trainer', adminController.createAccountTrainer)

route.post('/create-staff', adminController.createAccountStaff)

route.patch('/update-trainer', adminController.updateAccountTrainer)

route.patch('/update-staff', adminController.updateAccountStaff)

route.delete('/delete-trainer', adminController.deleteAccountTrainer)

route.delete('/delete-staff', adminController.deleteStaffAccount)

module.exports = route