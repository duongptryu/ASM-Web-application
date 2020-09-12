const mongoose = require('../db/db')

const topicSchema = mongoose.Schema({
    topicName: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        require: true
    }
})

const topic = mongoose.model('Topic', topicSchema)

module.exports = topic