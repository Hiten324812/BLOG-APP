
const mongoose = require('mongoose')

const schema = mongoose.Schema


const postschema = schema({
    userid : {
        type : schema.Types.ObjectId,
        required : true
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