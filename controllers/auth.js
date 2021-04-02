const User = require("../models/user")
const jwt = require("jsonwebtoken") //to generate signin token
const expressJwt = require("express-jwt") //to authorization of signin
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

exports.signin = (req,res)=>{
    const {email,password} = req.body;
    User.findOne({email},(err,user)=>{
        if(err || !user){
            res.status(400).json({error : "User doesn't exist !"})
        }

        //if user found check password and email match
        if(!user.authenticate(password)){
            return res.status(401).json({error : "email and password doesn't matched"})
        }

        //create authenticate function in user model (model/user.js)

        //generate signed token for user and store in cookie
        const token = jwt.sign({_id : user._id},process.env.JWT_SECRET)

        //persist token as 't' in cookie with expire date
        res.cookie("t",token,{expire : new Date() + 9999}) //expire after 9999 seconds

        //return responce to frontend client with user and token
        const {_id,name,email,role} = user;
        return res.json({token , user : {_id,name,email,role}})
    })
}

exports.signout = (req,res)=>{
    res.clearCookie("t"); //cookie is stored under name "t"
    return res.json({message : "user logged out successfully !"})
}


//middleware to verify json web tokens it automatically look for jwt
exports.requireSignin = expressJwt({  //requires cookie parser to be installed 
    secret : process.env.JWT_SECRET,
    userProperty : "auth",  
    algorithms : ["HS256"]
})

exports.isAuth = (req,res,next)=>{
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if(!user){
        return res.status(403).json({
            error : "Access Denied"
        })
    }

    next()
}

exports.isAdmin = (req,res,next)=>{
    if(req.profile.role == 0){ //0 : regular user 1 : admin
        return res.status(403).json({
            error : "Admin resource , Access Denied"
        })
    }
    next()

}
