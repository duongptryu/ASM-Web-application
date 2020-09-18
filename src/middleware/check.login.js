const jwt = require('jsonwebtoken')
const Trainer = require('../models/trainer')
const Trainee = require('../models/trainee')
const Admin = require('../models/admin')
const Staff = require('../models/staff')


exports.isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace("Bearer ", "")
        const decode = jwt.verify(token, "thisismytoken")
        const user = await Admin.findOne({_id: decode._id, role: decode.role, 'tokens.token': token})

        if(!user){
            throw new Error()
        }
        req.user= user;
        req.token = token
        next()
    } catch (error) {
        res.status(400).send("please login")
    }
}

exports.isStaff = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace("Bearer ","")
        const decode = jwt.verify(token, "thisismytoken")
        const user = await Staff.findOne({_id: decode._id, role: decode.role, 'tokens.token': token})
        if(!user){
            throw new Error()
        }
        req.user= user;
        req.token = token
        next()
    } catch (error) {
        res.status(400).send("please login")
    }
}

exports.isTrainer = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace("Bearer ","")
        const decode = jwt.verify(token, "thisismytoken")
        const user = await Trainer.findOne({_id: decode._id, role: decode.role, 'tokens.token': token})
        if(!user){
            throw new Error()
        }
        req.user= user;
        req.token = token
        next()
    } catch (error) {
        res.status(400).send("please login")
    }
}


exports.isTrainee = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace("Bearer ","")
        const decode = jwt.verify(token, "thisismytoken")
        const user = await Trainee.findOne({_id: decode._id, role: decode.role, 'tokens.token': token})
        if(!user){
            throw new Error()
        }
        req.user= user;
        req.token = token
        next()
    } catch (error) {
        res.status(400).send("please login")
    }
}