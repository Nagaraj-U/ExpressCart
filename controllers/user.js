const User = require("../models/user")
const {Order} = require("../models/order")
const {errorHandler} = require("../helpers/dbErrorHandler")
exports.userById = (req,res,next,id) =>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error : "user not found"
            })
        }

        req.profile = user;
        next()
    })
}

exports.read = (req,res)=> {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

exports.update = (req,res)=>{
    User.findOneAndUpdate(
        {_id : req.profile._id},
        { $set : req.body},
        {new:true} ,
        (err,user)=>{
            if(err){
                return res.status(400).json({
                    error : "you are not authorized to perform this action"
                })
            }
            user.hashed_password = undefined
            user.salt = undefined
            return res.json(user)
        })
                
}

exports.addOrderToPurchaseHistory = (req,res,next) =>{
    let history = []
    //req.body : contains .order (which has products[],time,amount) details , .user details  (SEE CHECKOUT.JS)
    req.body.order.products.forEach(item => {
        history.push({
            _id : item._id, //product 
            name : item.name,
            description : item.description,
            transaction_id : req.body.order.transaction_id,
            category : item.category,
            amount : req.body.order.amount,
            quantity : item.count,
            time : req.body.order.updated,
            address : req.body.order.address
        })
    });

    User.findOneAndUpdate({_id : req.profile._id},{$push : {history : history}},{new : true},(err,results)=>{
        if(err){
            return res.status(400).json({
                error : "something went wrong ! couldn't add order to user history"
            })
        }
        
        next()
    })
}

exports.userOrders = (req,res) => {
    Order.find({user: req.profile._id})
    .populate("user","_id name")
    .exec((err,orders)=>{
        if(err){
            return res.status(400).json({
                error : errorHandler(err)
            })
        }
        res.json(orders)
    })
}