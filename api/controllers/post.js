
const errorhandler = require('../utils/error')
const Post = require('../models/post')
const slug = require('unique-slug')
const uniqueSlug = require('unique-slug')

exports.createpost = async (req,res,next) => {
     
    if ( !req.user.isadmin ) {
        return next(errorhandler(403,'You are not allowed to create post'))
    }

    console.log(req.body)

    if ( !req.body.title || !req.body.content ) {
        return next(errorhandler(403,'please provide all required fields'))
    }

    const slug = uniqueSlug() + req.body.title.trim().split(' ').join('-').toLowerCase() 


    const newpost = new Post({
        ...req.body ,
        slug ,
        userid : req.user.id
    })


    try {
        const savedpost = await newpost.save();

        res.status(200).json(savedpost)

    } catch(error) {
            next(error)
    }


}

exports.getpost = async (req,res,next) => {

    try {
        
       const startindex = parseInt(req.query.startIndex) || 0 ;

       const limit = parseInt(req.query.limit) || 10 ;

       const sortdirection = req.query.order === 'asc' ? 1 : -1 ;

       const query = {};

       if (req.query.userid) {
           query.userid = req.query.userid;
       }
       
       if (req.query.category) {
           query.category = req.query.category;
       }
       
       if (req.query.searchterm) {
           query.$or = [
               { title: { $regex: req.query.searchterm, $options: 'i' } },
               { content: { $regex: req.query.searchterm, $options: 'i' } }
           ];
       }
       
       const posts = await Post.find(query)
       .sort( {updatedAt : sortdirection} )
       .skip(startindex)
       .limit(limit)
        
       const total = await Post.countDocuments();

       res.status(200).json(posts)

    } catch (error) {
        console.log(error)
        next(errorhandler(403,'result query not found'))
    }
}

exports.deletepost = async (req,res,next) => {
    if ( !req.user.isadmin || req.user.id !== req.params.userid){
        return next(errorhandler(403,'you are not allowed delete post'))
    }

    try {
        await Post.findByIdAndDelete(req.params.postid)

        res.status(200).json('the post has been deleted successfully')
    
    } catch (error) {
        next(error);
    }



}