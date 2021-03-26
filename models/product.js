const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const productSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        maxlength : 32,
        trim : true
    },
    description : {
        type : String,
        maxlength : 2000,
        required : true
    },
    price : {
        type : Number,
        required : true,
        maxlength : 32
    },
    category : {
        type : ObjectId, //refer to category schema
        ref : "Category",
        required : true
    },
    quantity : {
        type : Number,
    },
    photo : {
        data : Buffer,
        contentType : String
    },
    shipping : {
        default : false,
        type : Boolean
    }
},{timestamps : true})

module.exports = mongoose.model("Product",productSchema)