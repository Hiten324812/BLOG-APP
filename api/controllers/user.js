
const User = require('../models/user');
const errorhandler = require('../utils/error')
const bcryptjs = require('bcryptjs')

exports.updateuser = async (req,res,next) => {
    

    if ( req.user.id !== req.params.userid ){
            return next(errorhandler(403,'you are not allowed to update user'));
    }

    if ( req.body.password.includes(' ') === true ) {
          return next(errorhandler(400,'password contains space'))
    }

    const newpassword = bcryptjs.hashSync(req.body.password,10)

    try{

        const updateuser = await User.findByIdAndUpdate(req.user.id , {
            $set : {
                password : newpassword,
                profilepicture : req.body.profilepicture
            }
        } , {new : true });

        const { password , ...rest } = updateuser._doc

        res.status(200).json(rest);

    }catch(error) {
           
        next(error)
    }

}

exports.deleteuser = async (req,res,next) => {

    if ( req.user.id !== req.params.userid ) {
        return next(errorhandler(403,'you are not allowed to delete user'))
    } 

    try {

        await User.findByIdAndDelete(req.user.id);

        res.status(200).json('user has been deleted')

    } catch(error) {
            next(error)
    }
}

exports.signout = async (req,res,next) => {
      
    try{
        res.clearCookie('access')
        .status(200)
        .json('user has been signed out');


    } catch (error) {
        next(error)
    }
}

exports.getUsers = async ( req,res,next ) => {

    if (!req.user.isadmin)
    {
        return next(403,'you are not allowed to see all users.')
    }

    try {
       
        const startindex = parseInt(req.query.startindex) || 0 ;
        const limit = parseInt(req.query.limit) || 10 ;

        const sortdirection = req.query.sort === 'desc' ? -1 : 1 ;

        const users = await User.find()
        .sort({createdAt : sortdirection})
        .skip(startindex)
        .limit(limit)

        const totalusers = await User.countDocuments()

        const userwithoutpassword = users.map( (user) => {
            const { password , ...rest } = user._doc
            return rest;
        })
     
        const now = new Date();

        const onemonthago = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        )

   

        const lastmonthusers = await User.find({
            createdAt : { $gte : onemonthago }
        })

        res.status(200).json({
            users , totalusers ,
            lastmonthusers
        })


        
    } catch (error) {
        next(error)
    }
}

exports.deleteuser = async (req,res,next) => {
     
       if (!req.user.isadmin)
        {
            return next(403,'you are not allowed to delete user access')
        }

        try {

            await User.findByIdAndDelete(req.params.userid) ;

            res.status(200).json('you have deleted user successfully')

        } catch(error) {

            next(error)

        }



}