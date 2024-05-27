
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