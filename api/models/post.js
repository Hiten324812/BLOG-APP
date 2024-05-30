
const mongoose = require('mongoose')
const { schema } = require('./user')

const postschema = mongoose.Schema({
    userid : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'user'
    } ,
    content : {
        type : String,
        required : true 
    } ,
    title : {
        type : String ,
        required : true ,
        unique : true
    } ,
    image : {
        type : String ,
        default : "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png"
    } , 
    category : {
        type : String ,
        default : 'uncategorized'
    } ,
    slug : {
        type : String,
        required : true ,
        unique : true 
    }
} , { timestamps : true })

module.exports = mongoose.model('post',postschema)