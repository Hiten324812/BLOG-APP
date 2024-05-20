const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const useroutes = require('./routes/user')
const authroutes = require('./routes/auth')

dotenv.config();

const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO)
.then( (res) => {
    app.listen(3000);
})
.catch( err => {
    console.log(err)
})

app.use('/api/user' ,useroutes);
app.use('/api/auth', authroutes)


app.use((err,req,res,next) => {
    const statuscode = err.statusCode || 500
    const message = err.message || 'internal server'

    res.status(statuscode).json({
        success:false,
        statuscode,
        message
    })
})