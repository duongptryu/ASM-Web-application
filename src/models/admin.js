const mongoose = require("../db/db");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { use } = require("../routes/admin");

const adminSchema = mongoose.Schema({
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
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
});

adminSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.tokens
  delete userObject.password
  delete userObject.role
  return userObject
}

adminSchema.methods.generateAuthorToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString(), role: user.role },
    "thisismytoken"
  );
  user.tokens.push({ token });
  await user.save();
  return token;
};

adminSchema.statics.findAndCheck = async (username, password) => {
  const user = await admin.findOne({ username: username });
  if (!user) {
    throw new Error("Username not correctly");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("password is incorrect");
  }
  return user;
};

const admin = mongoose.model("Admin", adminSchema);

module.exports = admin;
