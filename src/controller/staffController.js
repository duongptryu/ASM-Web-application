const Trainee = require("../models/trainee");
const Trainer = require("../models/trainer");
const Course = require("../models/courses");
const Topic = require("../models/topics");
const Category = require("../models/course.category");
const mongoose = require("../db/db");
const bcrypt = require('bcryptjs');
const { populate } = require("../models/trainer");

exports.getTrainees = async (req, res) => {
  let match = {};
  const listSearch = [
    "id",
    "username",
    "name",
    "age",
    "dateOfBirth",
    "education",
    "mainProgramLanguage",
    "address",
    "company",
    "position",
    "timeStart",
    "timeEnd",
  ];
  const listReq = Object.keys(req.query);
  const check = listReq.every((element) => {
    return listSearch.includes(element);
  });
  if (!check) {
    return res.status(400).send({ error: "invalid search" });
  }

  listReq.forEach((element) => {
    if (element === "id") {
      match._id = req.query.id;
      return;
    }
    // console.log(element)
    // if(element === 'company' || element === 'position' || element === 'timeStart' || element === 'timeEnd'){
    //   match.experiences[['experience']].company = 'VNPT'
    //   return;
    // }
    match[element] = req.query[element];
  });
  console.log(match);
  try {
    const trainees = await Trainee.find(match).populate({
      path: 'courses.course',
      populate: {
        path: "topics.topic"
      }
    }).exec();
    if (trainees.length == 0) {
      return res.status(400).send("No staff account were found");
    }
    return res.status(200).send(trainees);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.createAccountTrainee = async (req, res) => {
  const listAllow = [
    "username",
    "password",
    "name",
    "age",
    "education",
    "mainProgramLanguage",
    "toeicScore",
    "experiences",
    "address",
  ];
  const listReq = Object.keys(req.body);
  const check = listAllow.every((element) => {
    return listReq.includes(element);
  });

  if (!check) {
    return res.status(400).send({ error: "Invalid input" });
  }
  const password = await bcrypt.hash(req.body.password, 8)
  req.body.password = password
  try {
    const trainee = new Trainee({ ...req.body, role: "trainee", courses:[] });
    await trainee.save();
    res.status(201).send({ user: trainee });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateAccountTrainee = async (req, res) => {
  const listAllow = [
    "username",
    "password",
    "name",
    "age",
    "dateOfBirth",
    "education",
    "mainProgramLanguage",
    "toeicScore",
    "experiences",
    "address",
    "courses",
  ];
  const listReq = Object.keys(req.body);
  const check = listReq.every((element) => {
    return listAllow.includes(element);
  });

  if (!check) {
    return res.status(400).send({ error: "Invalid input" });
  }

  const id = req.params.id;

  try {
    const trainee = await Trainee.findOne({ _id: id });
    listReq.forEach((element) => {
      trainee[element] = req.body[element];
    });
    await trainee.save();
    res.status(200).send({ message: "Update successful", trainee: trainee });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteAccountTrainee = async (req, res) => {
  const id = req.params.id;

  try {
    const trainee = Trainee.findOne({ _id: id });
    if (!trainee) {
      return res.status(204).send("Trainee is not exist");
    }
    await trainee.remove();
    res.status(200).send({ message: "delete successful" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getCourseCategory = async (req, res) => {
  let match = {};
  if (req.query.categoryName) {
    match.categoryName = req.query.categoryName;
  }
  if (req.query.id) {
    match._id = req.query.id;
  }
  try {
    const courseCategory = await Category.find(match);
    if (courseCategory.length == 0) {
      return res.status(404).send({ message: "No category found" });
    }
    res.status(200).send(courseCategory);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createCourseCategory = async (req, res) => {
  const listAllow = ["categoryName", "description"];
  const listReq = Object.keys(req.body);

  const check = listAllow.every((element) => {
    return listReq.includes(element);
  });

  if (!check) {
    return res.status(400).send({ error: "Error property" });
  }

  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).send({ message: "Create successful", category: category });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateCourseCategory = async (req, res) => {
  const listAllow = ["categoryName", "description"];
  const listReq = Object.keys(req.body);

  const check = listReq.every((element) => {
    return listAllow.includes(element);
  });
  if (!check) {
    return res.status(400).send({ message: "error property" });
  }
  const id = req.params.id;
  try {
    const category = await Category.findOne({ _id: id });
    if (!category) {
      return res.status(400).send({ message: "Category is not exist" });
    }
    listReq.forEach((element) => {
      category[element] = req.body[element];
    });
    await category.save();
    res.status(200).send({ message: "Update successful", category: category });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteCourseCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findOne({ _id: id });
    console.log(category);
    if (!category) {
      return res.status(400).send({ message: "Category is not exist" });
    }
    await category.remove();
    res.status(200).send({ message: "Delete account successful" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getCourse = async (req, res) => {
  let condition = {};
  if (req.query.id) {
    condition._id = req.query.id;
  }
  if (req.query.courseName) {
    condition.courseName = req.query.courseName;
  }
  try {
    const course = await Course.find(condition)
      .populate({
        path: "courseCategory",
      })
      .populate("topics.topic")
      .exec();
    if (course.length == 0) {
      return res.status(404).send({ message: "No course found" });
    }
    res.status(200).send(course);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createCourse = async (req, res) => {
  const listAllow = ["courseName", "description", "courseCategory"];
  const listReq = Object.keys(req.body);

  const check = listReq.every((element) => {
    return listAllow.includes(element);
  });

  if (!check) {
    return res.status(400).send({ error: "Error property" });
  }

  try {
    const course = new Course({...req.body, topics: []});
    await course.save();
    res.status(201).send({ message: "Create successful", course: course });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateCourse = async (req, res) => {
  const listAllow = ["courseName", "description", "courseCategory", "topics"];
  const listReq = Object.keys(req.body);
  const check = listReq.every((element) => {
    return listAllow.includes(element);
  });
  if (!check) {
    return res.status(400).send({ message: "error property" });
  }
  const id = req.params.id;
  try {
    const course = await Course.findOne({ _id: id });
    if (!course) {
      return res.status(400).send({ message: "Course is not exist" });
    }
    listReq.forEach((element) => {
      course[element] = req.body[element];
    });
    await course.save();
    res.status(200).send({ message: "Update successful", course: course });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteCourse = async (req, res) => {
  const id = req.params.id;
  try {
    const course = await Course.findOne({ _id: id });
    if (!course) {
      return res.status(400).send({ message: "Course is not exist" });
    }
    await course.remove();
    res.status(200).send({ message: "Delete course successful" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getTopic = async (req, res) => {
  let condition = {};
  if (req.query.id) {
    condition._id = req.query.id;
  }
  if (req.query.topicName) {
    condition.topicName = req.query.topicName;
  }
  try {
    const topics = await Topic.find(condition);
    if (topics.length == 0) {
      return res.status(404).send({ message: "No topic found" });
    }
    res.status(200).send(topics);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createTopic = async (req, res) => {
  const listAllow = ["topicName", "description"];
  const listReq = Object.keys(req.body);

  const check = listReq.every((element) => {
    return listAllow.includes(element);
  });

  if (!check) {
    return res.status(400).send({ error: "Error property" });
  }

  try {
    const topic = new Topic(req.body);
    await topic.save();
    res.status(201).send({ message: "Create successful", topic: topic });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateTopic = async (req, res) => {
  const listAllow = ["topicName", "description"];
  const listReq = Object.keys(req.body);
  const check = listReq.every((element) => {
    return listAllow.includes(element);
  });
  if (!check) {
    return res.status(400).send({ message: "error property" });
  }
  const id = req.params.id;
  try {
    const topic = await Topic.findOne({ _id: id });
    if (!topic) {
      return res.status(400).send({ message: "Topic is not exist" });
    }
    listReq.forEach((element) => {
      topic[element] = req.body[element];
    });
    await topic.save();
    res.status(200).send({ message: "Update successful", topic: topic });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteTopic = async (req, res) => {
  const id = req.params.id;
  try {
    const topic = await Topic.findOne({ _id: id });
    if (!topic) {
      return res.status(400).send({ message: "topic is not exist" });
    }
    await topic.remove();
    res.status(200).send({ message: "Delete topic successful" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


exports.addTopicToCourse = async (req, res) => {
  const idCourse = req.params.id
  try {
    const course = await Course.findOne({_id: idCourse})
    if(!course){
      return res.status(404).send({message: "Course not found"})
    }
    let check = false;
    req.body.listTopicAdd.forEach(element => {
      course.topics.filter(topic => {
         if(topic.topic.toString() === element.toString()){
           check = true;
           return false;
         }
      })
      course.topics.push({topic: element})
    })
    if(check){
      return res.status(400).send({message: "Topic already exist in the course"});
    }
    await course.save()
    res.status(200).send({message: "add topic to course successful", course: course})
  } catch (error) {
    res.status(500).send(error.message)
  }
}

exports.addTopicToTrainer = async (req, res) => {
  const idTrainer = req.params.id
  try {
    const trainer = await Trainer.findOne({_id: idTrainer})
    if(!trainer){
      return res.status(404).send({message: "Trainer account not found"})
    }
    let check = false;
    req.body.listTopicAdd.forEach(element => {
      trainer.topics.filter(topic => {
         if(topic.topic.toString() === element.toString()){
           check = true;
           return false;
         }
      })
      trainer.topics.push({topic: element})
    })
    if(check){
      return res.status(400).send({message: "Topic already exist"});
    }
    await trainer.save()
    res.status(200).send({message: "add topic to course successful", trainer: trainer})
  } catch (error) {
    res.status(500).send(error.message)
  }
}

exports.addCourseToTrainee = async (req, res) => {
  const idTrainee = req.params.id
  try {
    const trainee = await Trainee.findOne({_id: idTrainee})
    if(!trainee){
      return res.status(404).send({message: "Trainee account not found"})
    }
    let check = false;
    req.body.listCourseAdd.forEach(element => {
      trainee.courses.filter(course => {
         if(course.course.toString() === element.toString()){
           check = true;
           return false;
         }
      })
      trainee.courses.push({course: element})
    })
    if(check){
      return res.status(400).send({message: "Course already exist"});
    }
    await trainee.save()
    res.status(200).send({message: "add topic to course successful", trainee: trainee})
  } catch (error) {
    res.status(500).send(error.message)
  }
}