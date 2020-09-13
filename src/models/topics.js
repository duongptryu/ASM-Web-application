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

topicSchema.virtual('courses', {
    ref: 'Course',
    localField: '_id',
    foreignField: 'topics.topic',
    justOne: false
})

topicSchema.virtual('trainers', {
    ref: 'Trainer',
    localField: '_id',
    foreignField: 'topics.topic'
})

const topic = mongoose.model('Topic', topicSchema)

module.exports = topic