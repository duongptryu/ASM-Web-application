const Course = require('../models/courses')

exports.getAccount = async (req, res) => {
    const userObject = await req.user.removeProperty()
    res.status(200).send({ user: userObject })
}

exports.getCourse = async (req, res) => {
    try {
        const user = await req.user.populate({path: 'courses.course', populate: {path: "topics.topic"}}).execPopulate();
        res.status(200).send({courses: user.courses })
    } catch (error) {
        res.status(500).send(error.message)
    }
}