const mongoose = require("mongoose")
const crypto = require("crypto")
const uuid = require("uuid")
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema(
    {
        name:{
            type : String,
            required : true,
            trim : true,   //remove whitespaces at begin and end
            maxlength : 32
        },
        email : {
            type : String,
            required : true,
            trim : true,
            unique : true
        },
        hashed_password : {
            type : String,
            trim : true,
            required : true
           
        },
        about : {
            type : String,
            trim : true
        },
        salt : String,   //salting password using uuid (generates unique strings)
        role : {
            type : Number,
            default : 0  //0 : user 1 : admin
        },
        history : {
            type : Array,
            default : []  //purchased products
        }
    },{timestamps:true}  //applies timestamps to each elements
);




//mongoose virtual fields and methods

userSchema.virtual('password')
.set(function(password){   //get password from client and set
    this._password = password,
    this.salt = uuidv4(),    //random string
    this.hashed_password = this.encyptPassword(password)
})
.get(function(){
    return this._password
})


userSchema.methods = {
    encyptPassword : function(password){
        if(!password){
            return ""
        }
        try {
            return crypto
            .createHmac("sha1",this.salt)
            .update(password)
            .digest("hex")
        }catch {
            return ""
        }
    }
}

module.exports = mongoose.model("User",userSchema)


/*
references :
https://www.geeksforgeeks.org/node-js-crypto-createhmac-method/

*/