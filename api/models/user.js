const mongoose = require('mongoose')


const schema = mongoose.Schema

const userschema = new schema({
    
    username : {
        type : String,
        required : true,
        unique : true
    } ,

    email : {
        type : String,
        required : true,
        unique : true
    } ,
    password : {
        type : String,
        required : true
    }
} , { timestamps : true }
)

const User = mongoose.model('user',userschema)


module.exports = User

