const express = require("express")
const router = express.Router()
const {requireSignin,isAdmin,isAuth} = require("../controllers/auth")
const {findById} = require("../controllers/user")
const {create} = require("../controllers/product")

router.param("userId",findById); //creates user profile
router.post("/product/create/:userId",requireSignin,isAdmin,isAuth,create)

module.exports = router