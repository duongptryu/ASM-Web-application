const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const adminRoute = require('./routes/admin')
const staffRoute = require('./routes/staff')
const traineeRoute = require('./routes/trainee')
const trainerRoute = require('./routes/trainer')
const authRoute = require('./routes/auth')
const { use } = require('./routes/admin')



const port = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())
app.use(cors({
    origin: "http://localhost:8080",
    // origin: "http://127.0.0.1:5500",
    credentials: true
}))

app.use((req, res, next) => {
    // res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use("/admin",adminRoute)
app.use("/staff", staffRoute)
app.use('/login', authRoute)
app.use('/trainee',traineeRoute)
app.use('/trainer', trainerRoute)


app.listen(port, () => {
    console.log('Server is running in port 3000')
})

 