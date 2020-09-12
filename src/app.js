const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const adminRoute = require('./routes/admin')
const staffRoute = require('./routes/staff')
const traineeRoute = require('./routes/trainee')
const trainerRoute = require('./routes/trainer')
const authRoute = require('./routes/auth')



const port = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())


app.listen(port, () => {
    console.log('Server is running in port 3000')
})

