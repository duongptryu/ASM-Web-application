const mongoose = require("../db/db");
const jwt = require("jsonwebtoken")

const trainerSchema = mongoose.Schema({
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
  type: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  workingPlace: {
    type: String,
    require: true,
  },
  telephone: {
    type: Number,
    require: true,
  },
  topics: [
    {
      topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic"
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

trainerSchema.methods.generateAuthorToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString(), role: user.role },
    "thisismytoken"
  );
  user.tokens.push({ token });
  await user.save();
  return token;
};

trainerSchema.statics.findByIdAndCheck = async (username, password) => {
  const user = await User.findOne({ username: username });
  if (!user) {
    throw new Error("Username not correctly");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("password is incorrect");
  }
  return user;
};

const trainer = mongoose.model("Trainer", trainerSchema);

module.exports = trainer;
