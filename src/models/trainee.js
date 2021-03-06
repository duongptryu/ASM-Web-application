const mongoose = require("../db/db");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


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
        company: {
          type: String,
          require: true,
        },
        position: {
          type: String,
          require: true,
        },
        timeStart: {
          type: Date,
          require: true,
        },
        timeEnd: {
          type: Date,
          require: true,
        },
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
        require: true,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
});

traineeSchema.methods.removeProperty = function () {
  const userObject = this.toObject()
  delete userObject.courses
  delete userObject.tokens
  delete userObject.password
  delete userObject.role
  return userObject
}


traineeSchema.methods.generateAuthorToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString(), role: user.role },
    "thisismytoken"
  );
  user.tokens.push({ token });
  await user.save();
  return token;
};

traineeSchema.statics.findAndCheck = async (username, password) => {
  const user = await trainee.findOne({ username: username });
  if (!user) {
    throw new Error("Username not correctly");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("password is incorrect");
  }
  return user;
};


const trainee = mongoose.model("Trainee", traineeSchema);

module.exports = trainee;
