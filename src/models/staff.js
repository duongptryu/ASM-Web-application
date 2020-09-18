const mongoose = require("../db/db");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const staffSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  nameStaff: {
    type: String,
    require: true
  },
  age:{
    type: Number,
    require: true
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
  staffStatus:{
    type: Boolean,
    require: true
  },
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
});


staffSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.tokens
  return userObject
}


staffSchema.methods.generateAuthorToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString(), role: user.role },
    "thisismytoken"
  );
  user.tokens.push({ token });
  await user.save();
  return token;
};

staffSchema.statics.findAndCheck = async (username, password) => {
  const user = await staff.findOne({ username: username });
  if (!user) {
    throw new Error("Username not correctly");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("password is incorrect");
  }
  return user;
};

const staff = mongoose.model("Staff", staffSchema);

module.exports = staff;
