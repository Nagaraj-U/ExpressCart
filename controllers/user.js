const User = require("../models/user")
const {errorHandler} = require("../helpers/dbErrorHandler")

exports.signup = (req,res)=>{
   const user = new User(req.body)
   user.save((err,user)=>{
       if(err){
            return res.status(400).json(
                {
                    err : errorHandler(err)
                })
       }
       //hiding fields in response
        user.salt = undefined
        user.hashed_password = undefined
        res.json({user})
   })
}