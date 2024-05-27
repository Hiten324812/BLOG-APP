const jwt =require('jsonwebtoken')

const error = require('./error')


 exports.verifytoken = (req,res,next) => {
    const token = req.cookies.access;


    if ( !token ) {
        return next(error(401,'unauthorized accesss'));
    }

    jwt.verify(token,process.env.JWT_SECRET , (err,user) => {
        if(err)
            {
                return next(error(401,'unauthorized access'))
            }
            req.user = user;
         
            next();
    })

    
}

