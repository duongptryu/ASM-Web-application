const Admin = require('../models/admin')
const Staff = require('../models/staff')
const Trainer = require('../models/trainer')
const Trainee = require('../models/trainee')



exports.adminLogin = async (req, res) => {
  console.log(req)
    const listAllow = ["username", "password"];
    const listReq = Object.keys(req.body);
    const check = listReq.every((obj) => {
      return listAllow.includes(obj);
    });
  
    if (!check) {
      return res.status(400).send("Error, invalid input");
    }
    try {
      const user = await Admin.findAndCheck(req.body.username, req.body.password)
      const token = await user.generateAuthorToken();
     res.status(200).send({user: user, token: token})
    } catch (error) {
      res.status(500).send(error.message)
    }
  }


exports.staffLogin = async (req, res) => {
    const listAllow = ["username", "password"];
    const listReq = Object.keys(req.body);
    const check = listReq.every((obj) => {
      return listAllow.includes(obj);
    });
  
    if (!check) {
      return res.status(400).send("Error, invalid input");
    }
    try {
      const user = await Staff.findAndCheck(req.body.username, req.body.password)
      const token = await user.generateAuthorToken();
     res.status(200).send({user: user, token: token})
    } catch (error) {
      res.status(500).send(error.message)
    }
}


exports.trainerLogin = async (req, res) => {
    const listAllow = ["username", "password"];
    const listReq = Object.keys(req.body);
    const check = listReq.every((obj) => {
      return listAllow.includes(obj);
    });
  
    if (!check) {
      return res.status(400).send("Error, invalid input");
    }
    try {
      const user = await Trainer.findAndCheck(req.body.username, req.body.password)
      const token = await user.generateAuthorToken();
     res.status(200).send({user: user, token: token})
    } catch (error) {
      res.status(500).send(error.message)
    }
}


exports.traineeLogin = async (req, res) => {
    const listAllow = ["username", "password"];
    const listReq = Object.keys(req.body);
    const check = listReq.every((obj) => {
      return listAllow.includes(obj);
    });
  
    if (!check) {
      return res.status(400).send("Error, invalid input");
    }
    try {
      const user = await Trainee.findAndCheck(req.body.username, req.body.password)
      const token = await user.generateAuthorToken();
     res.status(200).send({user: user, token: token})
    } catch (error) {
      res.status(500).send(error.message)
    }
}
  
exports.logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
          return token.token.toString() !== req.token.toString()
        })
        await req.user.save();
        res.status(200).send('Logout success')
      } catch (error) {
        res.status(500).send(error.toString());
      }
}
  