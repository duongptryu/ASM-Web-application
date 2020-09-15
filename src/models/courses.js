const mongoose = require("../db/db");

const courseSchema = mongoose.Schema({
  courseName: {
    type: String,
    require: true,
    unique: true,
  },
  description: {
    type: String,
    require: true,
  },
  courseCategory: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "CourseCategory",
  },
  topics: [
    {
      topic: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Topic",
      },
    },
  ],
});


courseSchema.virtual('trainees', {
  ref: 'Trainee',
  localField: '_id',
  foreignField: 'courses.course',
  justOne: false
})

const course = mongoose.model("Course", courseSchema);

module.exports = course;
