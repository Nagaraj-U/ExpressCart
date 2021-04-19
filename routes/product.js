const express = require("express")
const router = express.Router()
const {requireSignin,isAdmin,isAuth} = require("../controllers/auth")
const {userById} = require("../controllers/user")
const {create,
       productById,
       read,
       remove,
       update,
       list,
       listRelated,
       listCategories,
       listBySearch,
       photo ,
       listSearchBar} = require("../controllers/product")

router.get("/product/:productId",read)
router.post("/product/create/:userId",requireSignin,isAdmin,isAuth,create)
router.delete("/product/:productId/:userId",requireSignin,isAdmin,isAuth,remove)
router.put("/product/:productId/:userId",update)
router.get("/product/photo/:productId",photo)

router.get("/products",list)
router.get("/products/search",listSearchBar)
router.get("/products/related/:productId",listRelated)
router.get("/products/categories",listCategories)
router.post("/products/by/search",listBySearch)

router.param("userId",userById); //creates user profile
router.param("productId",productById); //creates product profile


module.exports = router