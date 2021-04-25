const express = require("express")
const router = express.Router()

const {isAuth,requireSignin} = require("../controllers/auth")
const {userById} = require("../controllers/user")
const {generateToken} = require("../controllers/braintree")

router.get("/braintree/getToken/:userId",isAuth,requireSignin,generateToken);
router.param("userId",userById)


module.exports = Router