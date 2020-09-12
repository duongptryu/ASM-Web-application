const mongoose = require('../db/db')

const staffSchema = mongoose.Schema({
    username:{
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    }
})

const staff = mongoose.model('Staff', staffSchema)

module.exports = staff

