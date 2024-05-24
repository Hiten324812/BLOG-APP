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
    } ,
    profilepicture : {
        type : String,
        default : "https://cdn1.vectorstock.com/i/1000x1000/31/05/profile-outline-symbol-dark-on-white-background-vector-4453105.jpg"
    }
} , { timestamps : true }
)

const User = mongoose.model('user',userschema)


module.exports = User

