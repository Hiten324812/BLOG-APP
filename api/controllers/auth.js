const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const errorhandler = require('../utils/error')
const jwt = require('jsonwebtoken')


exports.signup = async (req,res,next) => {

 const { username , email , password } = req.body 

 if ( !username || !email || !password || username === '' || email === '' || password === '') {
   return next(errorhandler(400,'all fields are required'))
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
    
   console.log(error)
    next(error);

 }


}

exports.signin = async (req,res,next) => {
  const { email , password } = req.body
 
  if( email === '' || password === '')
    {
      return next(errorhandler(404,'user not found'));
    }
  try {
        const validuser = await User.findOne({ email })

        if (!validuser)
          {
           return next(errorhandler(404,'user not found!!'))
          }

          const validpassword = bcryptjs.compareSync(password,validuser.password)

        if ( !validpassword ) {
          return next(errorhandler(400,'invalid password hiten'))
        }

        const token = jwt.sign({
            userid : validuser._id  
        } , process.env.JWT_SECRET 
      )

      const { password : pass  , ...rest } = validuser._doc


      res.status(200).cookie('access',token,{
        httpOnly : true 
      })
      .json(rest)
  }
  catch (error) {
    next(error)
  }
  
}