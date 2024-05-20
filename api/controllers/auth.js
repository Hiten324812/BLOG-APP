const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const errorhandler = require('../utils/error')

exports.signup = async (req,res,next) => {

 const { username , email , password } = req.body 

 if ( !username || !email || !password || username === '' || email === '' || password === '') {
   next(errorhandler(400,'all fields are required'))
 }

  const hashedpassword = bcryptjs.hashSync(password,12)

  const newuser = new User({
    username,
    email,
    password : hashedpassword
  })
 

 try {
    await newuser.save();

    res.json({message : "signup successfully"})
 }
 catch (error) {

    next(error);

 }


}