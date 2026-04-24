const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require("cors")


const app = express()
app.use(cors(
    {
        origin: true,
        credentials: true
    }
))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


const authRouter = require('./routes/auth.route')
const interviewRouter = require('./routes/interview.route')

app.use('/api/auth', authRouter)
app.use('/api/interview', interviewRouter)

module.exports = app
