const express = require("express")
const router = express.Router()

const {create,categoryById,read,list,update,remove} = require("../controllers/category")
const {requireSignin,isAuth,isAdmin} = require("../controllers/auth")
const {userById} = require("../controllers/user")


router.get("/category/:categoryId",read)
router.get("/categories",list)
router.post("/category/create/:userId",requireSignin,isAdmin,isAuth,create);
router.delete("/category/:categoryId/:userId",requireSignin,isAdmin,isAuth,remove);
router.put("/category/:categoryId/:userId",requireSignin,isAdmin,isAuth,update);


router.param("userId",userById); //find user id from params and create req.profile
router.param("categoryId",categoryById)

module.exports = router