const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const useroutes = require('./routes/user')
const authroutes = require('./routes/auth')
const postroutes = require('./routes/post')
const commentroutes = require('./routes/comment')
const cookieparser = require('cookie-parser')
const cors = require('cors')
const path = require('path')

dotenv.config();

const app = express()

app.use(cookieparser())


app.use(express.json())

app.use(express.static(path.join(__dirname,'/client/dist')))



mongoose.connect(process.env.MONGO)
.then( (res) => {
    app.listen(3000);
})
.catch( err => {
    console.log(err)
})

app.use('/api/user' ,useroutes)
app.use('/api/auth', authroutes)
app.use('/api/post',postroutes)
app.use('/api/comment',commentroutes)









app.use((err,req,res,next) => {
    const statuscode = err.statuscode || 500
    const message = err.message || 'internal server'


    res.status(statuscode).json({
        success:false,
        statuscode,
        message
    })
})