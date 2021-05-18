const express = require("express")
const router = express.Router()

const {requireSignin,isAuth, isAdmin} = require("../controllers/auth")
const {userById,addOrderToPurchaseHistory} = require("../controllers/user")
const {create,listOrders,getStatusValues,updateStatus,orderById} = require("../controllers/order")
const {increaseCountDecreaseQuantity} = require("../controllers/product")

router.post("/order/create/:userId",requireSignin,isAuth,addOrderToPurchaseHistory,increaseCountDecreaseQuantity,create)
router.get("/order/list/:userId",requireSignin,isAuth,isAdmin,listOrders)
router.get("/order/status-values/:userId",requireSignin,isAuth,isAdmin,getStatusValues)
router.put("/order/:orderId/status/:userId",requireSignin,isAuth,isAdmin,updateStatus)
router.param("userId",userById)
router.param("orderId",orderById)

module.exports = router