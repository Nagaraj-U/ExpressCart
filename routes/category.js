const express = require("express")
const router = express.Router()

const {create} = require("../controllers/category")
const {requireSignin,isAuth,isAdmin} = require("../controllers/auth")
const {findById} = require("../controllers/user")


router.param("userId",findById); //find user id from params and create req.profile
router.post("/category/create/:userId",requireSignin,isAdmin,isAuth,create);

module.exports = router