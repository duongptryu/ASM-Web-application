const express = require('express');
const route = express.Router();
const trainerController = require('../controller/trainerController');
const staffController = require('../controller/staffController')

route.get('profile/me', staffController.getTraineeAccount)

route.get('/views', trainerController.getCourse)

module.exports = route