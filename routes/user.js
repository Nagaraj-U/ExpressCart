const express = require("express")
const router = express.Router()
const {userById,read,update,userOrders} = require("../controllers/user")
const {requireSignin,isAuth,isAdmin} = require("../controllers/auth")


//https://www.geeksforgeeks.org/express-js-router-param-function/
router.param("userId",userById); //grabs userid from route params (used in display basic info of user)


//authenticated user ,admin , signed in users can only access

router.get("/user/:userId",requireSignin,isAuth,read);
router.put("/user/:userId",requireSignin,isAuth,update);
router.get("/orders/by/user/:userId",requireSignin,isAuth,userOrders);


module.exports = router