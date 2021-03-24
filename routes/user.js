const express = require("express")
const router = express.Router()
const {findById} = require("../controllers/user")
const {requireSignin,isAuth,isAdmin} = require("../controllers/auth")


//https://www.geeksforgeeks.org/express-js-router-param-function/
router.param("userId",findById); //grabs userid from route params (used in display basic info of user)


//authenticated user ,admin , signed in users can only access
router.get("/user/:userId",requireSignin,isAuth,isAdmin,(req,res)=>{
    res.json({
        user : req.profile
    })
})


module.exports = router