const express = require('express');
const route = express.Router();
const staffController = require('../controller/staffController');
const adminController = require('../controller/adminController')

route.get('/trainees', staffController.getTrainees)

route.post('/create-trainee', staffController.createAccountTrainee)

route.patch('/update-trainee/:id', staffController.updateAccountTrainee)

route.delete('/delete-trainee/:id', staffController.deleteAccountTrainee)



route.get('/course-categories', staffController.getCourseCategory)

route.post('/create-course-category', staffController.createCourseCategory)
 
route.patch('/update-course-category/:id', staffController.updateCourseCategory)

route.delete('/delete-course-category/:id', staffController.deleteCourseCategory)



route.get('/courses', staffController.getCourse)

route.post('/create-course', staffController.createCourse)

route.patch('/update-course/:id', staffController.updateCourse)

route.delete('/delete-course/:id', staffController.deleteCourse)



route.get('/topics', staffController.getTopic)

route.post('/create-topic', staffController.createTopic)

route.patch('/update-topic/:id', staffController.updateTopic)

route.delete('/delete-topic/:id', staffController.deleteTopic)


route.patch('/add-topic-to-course/:id', staffController.addTopicToCourse)

route.patch('/add-topic-to-trainer/:id', staffController.addTopicToTrainer)

route.patch('/add-course-to-trainee/:id', staffController.addCourseToTrainee)



route.post('/create-trainer', adminController.createAccountTrainer)

route.get('/trainers', adminController.getTrainer)

route.patch('/update-trainer/:id', adminController.updateAccountTrainer)

route.delete('/delete-trainer/:id', adminController.deleteAccountTrainer)





module.exports = route