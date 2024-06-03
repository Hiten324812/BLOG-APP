
const Comment = require('../models/comment')
const errorhandler = require('../utils/error')

exports.createcomment = async (req,res,next) => {
    
    try {

        const { content ,userid ,postid } = req.body 

        if ( userid !== req.user.id )
            {
               return next(errorhandler(403,'you cannot match logined user'))
            }

            const newcomment = new Comment({
                postid,
                userid,
                content
            })

            await newcomment.save()

            res.status(200).json(newcomment);




    } catch(error) {
        next(error)
    }

}

exports.getpostscomment = async (req,res,next) => {

    try {
        
        const comments = await Comment.find({ postid : req.params.postid })
        .sort({createdAt : -1}).populate({
            path: 'userid',
            select: 'username profilepicture' // Exclude the password field
          })

          const totalcomments = await Comment.countDocuments(
            { postid : req.params.postid }
          )
          
       
        res.status(200).json({comments,totalcomments})


    } catch (error) {

        next(error)
        
    }
} 