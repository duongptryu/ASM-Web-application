const mongoose = require("../db/db");

const traineeSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  dateOfBirth: {
    type: Date,
    require: true,
  },
  education: {
    type: String,
    require: true,
  },
  mainProgramLanguage: {
    type: String,
    require: true,
  },
  toeicScore: {
    type: Number,
    require: true,
  },
  experiences: [
    {
      experience: {
        type: String,
        description: String,
      },
    },
  ],
  address: {
    type: String,
    require: true,
  },
  courses: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        unique: true,
        require: true,
      },
    },
  ],
});

const trainee = mongoose.model("Trainee", traineeSchema);

module.exports = trainee;
