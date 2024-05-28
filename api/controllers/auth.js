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
          return next(errorhandler(400,'invalid password'))
        }

        const token = jwt.sign({
            id : validuser._id  ,
            isadmin : validuser.isadmin
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

exports.google = async(req,res,next) => {

  const { username , email , googlephotourl } = req.body

  try {
         const user = await User.findOne( {email})
         
         if (user){
          const token = jwt.sign( {id : user._id ,
            isadmin : user.isadmin
           } , process.env.JWT_SECRET)

          const { password , ...rest} = user._doc
         
          res.status(200).cookie('access' , token , {
            httpOnly : true
          }).json(rest)

         } 
         else {
          const generatepassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8) 

          const hashedpassword = bcryptjs.hashSync(generatepassword,12)

          const newuser = new User({
            username : username.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-8) ,
            email ,
            password : hashedpassword ,
            profilepicture : googlephotourl
          })

          await newuser.save();

           const token = jwt.sign({ id : newuser._id ,  
            isadmin : newuser.isadmin }, process.env.JWT_SECRET)

           const { password , ...rest} = newuser._doc
          res.status(200)
          .cookie('access',token , {
            httpOnly : true 
          }).json(rest)

         }
  }
  catch(err) {

  }

}