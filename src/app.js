const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const adminRoute = require('./routes/admin')
const staffRoute = require('./routes/staff')
const traineeRoute = require('./routes/trainee')
const trainerRoute = require('./routes/trainer')
const authRoute = require('./routes/auth')



const port = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use("/admin",adminRoute)
app.use("/staff", staffRoute)
app.use('/login', authRoute)
app.use('/trainee',traineeRoute)
app.use('/trainer', trainerRoute)


app.listen(port, () => {
    console.log('Server is running in port 3000')
})

 