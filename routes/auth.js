const express = require("express")
const router = express.Router()


//controllers
const {signup,signin,signout,requireSignin} = require("../controllers/auth")
const {userSignupValidator} = require("../validator/index")


router.get("/",(req,res)=>{
    res.send("user home route")
})

router.post("/signup",userSignupValidator,signup)
router.post("/signin",signin)
router.get("/signout",signout)



module.exports = router