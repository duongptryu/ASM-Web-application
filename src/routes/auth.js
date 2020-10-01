const express = require('express')
const route = express.Router()
const authController = require('../controller/auth')

route.post('/admin-login', authController.adminLogin)

route.post('/staff-login', authController.staffLogin)

route.post('/trainee-login', authController.traineeLogin)

route.post('/trainer-login', authController.trainerLogin)

// route.post('/logout', authController.logout)

module.exports = route