const express = require('express');
const route = express.Router();
const adminController = require('../controller/adminController');
const checkLogin = require('../middleware/check.login')

route.get('/trainers',checkLogin.isAdmin, adminController.getTrainer)

route.get('/staff',checkLogin.isAdmin, adminController.getAccountStaff)

route.post('/create-trainer' ,checkLogin.isAdmin, adminController.createAccountTrainer)

route.post('/create-staff',checkLogin.isAdmin, adminController.createAccountStaff)

route.patch('/update-trainer/:id',checkLogin.isAdmin, adminController.updateAccountTrainer)

route.patch('/update-staff/:id',checkLogin.isAdmin, adminController.updateAccountStaff)

route.delete('/delete-trainer/:id',checkLogin.isAdmin, adminController.deleteAccountTrainer)

route.delete('/delete-staff/:id',checkLogin.isAdmin, adminController.deleteAccountStaff)

route.post('/create-admin', adminController.createAdmin)


module.exports = route