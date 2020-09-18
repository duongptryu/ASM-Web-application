const Course = require('../models/courses')

exports.getAccount = async (req, res) => {
    const userObject = await req.user.removeProperty()
    res.status(200).send({ user: userObject })
}

exports.getTopics = async (req, res) => {
    try {
        const user = await req.user.populate({path: 'topics.topic'}).execPopulate();
        res.status(200).send({topics: user.topics })
    } catch (error) {
        res.status(500).send(error.message)
    }
}