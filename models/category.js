const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        maxlength : 32,
        trim : true
    }
},{timestamps : true})

module.exports = mongoose.model("Category",categorySchema);