const mongoose = require('../db/db')

const categorySchema = mongoose.Schema({
    categoryName: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        require: true
    }
})

categorySchema.virtual('courses', {
    ref: 'Course',
    localField: '_id',
    foreignField: 'courseCategory'
})

const category = mongoose.model('CourseCategory', categorySchema)

module.exports = category