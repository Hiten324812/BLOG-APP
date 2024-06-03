const mongoose = require('mongoose')

const schema = mongoose.Schema

const commentschema = new schema({

    content : {
        type : String,
        required : true
    } ,
    postid : {
        type : schema.Types.ObjectId,
        required : true 
    } ,
    userid : {
        type : schema.Types.ObjectId,
        required : true ,
        ref : 'user'
    } ,
    likes : {
        type : Array ,
        default : []
    } ,
    numberoflikes : {
        type : Number ,
        default: 0
    }
} , { timestamps : true })

module.exports = mongoose.model('comment',commentschema)