const express = require("express")
const router = express.Router()

//controllers
const {sayHi} = require("../controllers/user")

router.get("/",sayHi)

module.exports = router