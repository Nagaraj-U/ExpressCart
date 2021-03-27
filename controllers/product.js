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

        //checking all fields are available in form
        const {name,description,price,quantity,category,shipping} = fields
        if(!name || !category || !price || !quantity || !description || !shipping){
            return res.status(400).json({
                error : "All fields all mandatory"
            })
        }


        //checking if images present in form
        //1kb = 1000bytes -> 1mb = 1000*1000
        if(files.photo){ //files (contain images or pdf etc) ("photo" : name under which client sends photo )
            // console.log(`file size  ${files.photo.size} `);

            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error : "Image should be less that 1 mb"
                })
            }
            
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

exports.productById = (req,res,next,id)=>{ //takes 4 paramaters
    Product.findById(id).exec((err,product)=>{
        if(err || !product){
            return res.status(400).json({
                error : "No such product found"
            })
        }

        req.product = product
        next()
    })
}

exports.read = (req,res)=>{
    req.product.photo = undefined
    return res.json(req.product)
}

exports.remove = (req,res)=>{
    let product = req.product
    product.remove((err,deletedProduct)=>{
        if(err){
            return res.status(400).json({
                error : errorHandler(err)
            })
        }

        res.json({
            "message" : "product deleted successfully"
        })
    })
}

exports.update = (req,res) =>{
    //using formidable instead of req.body to handle image files
    let form = new formidable.IncomingForm() 
    form.keepExtensions = true
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error : errorHandler(err) 
            })
        }

        let product = req.product
        product = _.extend(product,fields) //lodash library inbuilt func to update

        //checking all fields are available in form
        const {name,description,price,quantity,category,shipping} = fields
        if(!name || !category || !price || !quantity || !description || !shipping){
            return res.status(400).json({
                error : "All fields all mandatory"
            })
        }

        if(files.photo){ 

            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error : "Image should be less that 1 mb"
                })
            }
            
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