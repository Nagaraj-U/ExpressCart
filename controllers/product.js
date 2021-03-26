const Product = require("../models/product")
const formidable = require("formidable") //to get req.body in the form of "form"
const fs = require("fs") //file read
const _ = require("lodash")
const {errorHandler} = require("../helpers/dbErrorHandler") //database error handler

exports.create = (req,res) => {

    //using formidable instead of req.body to handle image files
    let form = new formidable.IncomingForm() 
    form.keepExtensions = true // all kind of images (png,jpeg ...)
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error : errorHandler(err) 
            })
        }

        let product = new Product(fields)

        //checking if images present in form
        if(files.photo){ //images -> files ("photo" : name under which client sends photo )
            product.photo.data = fs.readFileSync(files.photo.path) //schema fields
            product.photo.contentType = files.photo.type
        }

        product.save((err,result)=>{
            if(err){
                return res.status(400).json({
                    error : errorHandler(err)
                })
            }

            res.json({result})
        })
    })

    
}