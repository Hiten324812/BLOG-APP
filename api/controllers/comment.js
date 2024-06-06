
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

exports.likecomment = async (req,res,next) => {
    try {

        const com = await Comment.findById(req.params.commentid);

        if (!com)
            {
                return next(errorhandler(404,'comment not found'))
            }

            const index = com.likes.indexOf(req.user.id)

            if ( index === -1 )
            {
              com.likes.push(req.user.id)
              com.numberoflikes += 1
            }
            else 
            {
               com.likes.splice(index,1)
               com.numberoflikes -= 1
            }
          

            await com.save()

            res.status(200).json(com)

            


        
    } catch (error) {

        next(error)
        
    }
}

exports.editcomment = async (req,res,next) => {


    try {
        
        const com = await Comment.findById(req.params.commentid)

        if (!com)
            {
                return next(errorhandler(404,'comment not found'))
            }

      

            if ( com.userid.toString() !== req.user.id.toString() && !req.user.isadmin)
            {
                return next(errorhandler(403,'you are not not allowed to edit others comment'))
            }

            const editcom = await Comment.findByIdAndUpdate(
                req.params.commentid ,
                {
                    content : req.body.content 
                }
                ,{
                    new : true
                }
            )
            .populate(
                {
                    path : "userid" ,
                    select : "username profilepicture"
                }
            )

            res.status(200).json(editcom)


    } catch (error) {

        console.log(error)
        
    }

}

exports.deletecomment = async (req,res,next) => {

   try {
     
       const com = await Comment.findById(req.params.commentid);

       if (!com)
        {
            return next(errorhandler(404,'comment not found '))
        }

        if ( req.user.id.toString() !== com.userid.toString() && !req.user.isadmin)
        {
            return next(errorhandler(403,'you are not allowed to delete comment'))
        }

        await Comment.findByIdAndDelete(com._id);

        res.status(200).json('comment deleted successfully')

   } catch (error) {
    
   }
}