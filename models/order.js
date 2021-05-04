const mongoose = require("mongoose")
const Schema = mongoose.Schema
const {ObjectId} = mongoose.Schema

const ItemSchema = new mongoose.Schema({
    product : {
        type : {ObjectId , ref : "Product"}
    },
    name : String,
    count : Number, //field created whilestoring in locastorage
    price : Number
},{timestamps : true})

const CartItem = mongoose.model("CartItem",ItemSchema)



const OrderSchema = new mongoose.Schema({
    products : [ItemSchema],
    transaction_id : {},
    amount : {
        type : Number
    },
    address : String,
    status : {
        type : String,
        default : "not processed",
        enum : ["not processed","processing","shipped","delivered","cancelled"]
    },
    user : {type : ObjectId , ref : "User"},
    updated : Date
},{timestamps : true})

const Order = mongoose.model("Order",OrderSchema)

module.exports = {Order,CartItem}