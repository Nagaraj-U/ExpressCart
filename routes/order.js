const express = require("express")
const router = express.Router()

const {requireSignin,isAuth, isAdmin} = require("../controllers/auth")
const {userById,addOrderToPurchaseHistory} = require("../controllers/user")
const {create,listOrders} = require("../controllers/order")
const {increaseCountDecreaseQuantity} = require("../controllers/product")

router.post("/order/create/:userId",requireSignin,isAuth,addOrderToPurchaseHistory,increaseCountDecreaseQuantity,create)
router.get("/order/list/:userId",requireSignin,isAuth,isAdmin,listOrders)
router.param("userId",userById)

module.exports = router