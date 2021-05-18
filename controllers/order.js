const {Order,CartItem} = require("../models/order")
const {errorHandler} = require("../helpers/dbErrorHandler")

exports.create = (req,res) =>{
    console.log("order",req.body);
    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    order.save((err,data)=>{
        if(err){
            return res.status(400).json({
                error : errorHandler(err)
            })
        }
        res.json({data})
    })
}

exports.listOrders = (req,res) =>{
    Order.find()
    .populate("user","_id name")
    .sort("-updated")
    .exec((err,orders)=>{
        if(err){
            return res.status(400).json({
                error : errorHandler(err)
            })
        }

        res.json(orders)
    })
}

exports.getStatusValues = (req,res) =>{
    return res.json(Order.schema.path("status").enumValues)
}

exports.orderById = (req,res,next,id) =>{
    Order.findById(id)
    .populate("products.products","name price")
    .exec((err,order)=>{
        if(err || !order){
            return res.status(400).json({
                error : errorHandler(err)
            })
        }

        req.order = order
        next()
    })
}

exports.updateStatus = (req,res) =>{
    Order.updateOne({_id : req.body.orderId},{$set : {status : req.body.status}},(err,order)=>{
        if(err || !order){
            return res.status(400).json({
                error : errorHandler(err)
            })
        }

        res.json(order)
    })
}