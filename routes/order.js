const express = require("express")
const router = express.Router()

const {requireSignin,isAuth} = require("../controllers/auth")
const {userById,addOrderToPurchaseHistory} = require("../controllers/user")
const {create} = require("../controllers/order")
const {increaseCountDecreaseQuantity} = require("../controllers/product")

router.post("/order/create/:userId",requireSignin,isAuth,addOrderToPurchaseHistory,increaseCountDecreaseQuantity,create)
router.param("userId",userById)

module.exports = router