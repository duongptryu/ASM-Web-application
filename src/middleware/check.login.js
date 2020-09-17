const jwt = require('jsonwebtoken')
const Trainer = require('../models/trainer')
const Trainee = require('../models/trainee')
const Admin = require('../models/admin')
const Staff = require('../models/staff')


const isAdmin = async (req, res, next) => {
    try {
        const token = req.header.authorization.replace("Bearer ","")
        const decode = jwt.verify(token, "thisismytoken")
        const user = await Admin.findOne({_id: decode._id, role: decode.role, 'tokens.token': token})
        if(!user){
            throw new Error("Invalid information")
        }
        req.user= user;
        req.token = token
        next()
    } catch (error) {
        res.status(500).send(error.message)
    }
}