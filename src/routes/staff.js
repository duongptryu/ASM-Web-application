const express = require('express');
const route = express.Router();
const staffController = require('../controller/staffController');
const adminController = require('../controller/adminController')
const checkLogin = require('../middleware/check.login')

route.get('/trainees', checkLogin.isStaff, staffController.getTrainees)

route.post('/create-trainee',checkLogin.isStaff, staffController.createAccountTrainee)

route.patch('/update-trainee/:id',checkLogin.isStaff, staffController.updateAccountTrainee)

route.delete('/delete-trainee/:id', checkLogin.isStaff,staffController.deleteAccountTrainee)



route.get('/course-categories',checkLogin.isStaff, staffController.getCourseCategory)

route.post('/create-course-category',checkLogin.isStaff, staffController.createCourseCategory)
 
route.patch('/update-course-category/:id',checkLogin.isStaff, staffController.updateCourseCategory)

route.delete('/delete-course-category/:id', checkLogin.isStaff,staffController.deleteCourseCategory)



route.get('/courses',checkLogin.isStaff, staffController.getCourse)

route.post('/create-course',checkLogin.isStaff, staffController.createCourse)

route.patch('/update-course/:id', checkLogin.isStaff,staffController.updateCourse)

route.delete('/delete-course/:id', checkLogin.isStaff,staffController.deleteCourse)



route.get('/topics',checkLogin.isStaff, staffController.getTopic)

route.post('/create-topic',checkLogin.isStaff, staffController.createTopic)

route.patch('/update-topic/:id', checkLogin.isStaff,staffController.updateTopic)

route.delete('/delete-topic/:id',checkLogin.isStaff, staffController.deleteTopic)


route.patch('/add-topic-to-course/:id',checkLogin.isStaff, staffController.addTopicToCourse)

route.patch('/add-topic-to-trainer/:id', checkLogin.isStaff,staffController.addTopicToTrainer)

route.patch('/add-course-to-trainee/:id', checkLogin.isStaff,staffController.addCourseToTrainee)



route.post('/create-trainer',checkLogin.isStaff, adminController.createAccountTrainer)

route.get('/trainers',checkLogin.isStaff, adminController.getTrainer)

route.patch('/update-trainer/:id',checkLogin.isStaff, adminController.updateAccountTrainer)

route.delete('/delete-trainer/:id',checkLogin.isStaff, adminController.deleteAccountTrainer)





module.exports = route