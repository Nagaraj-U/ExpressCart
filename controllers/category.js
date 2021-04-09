const Category = require("../models/category")
const {errorHandler} = require("../helpers/dbErrorHandler")

exports.create = (req,res)=>{
    const category = new Category(req.body)
    category.save((err,data)=>{
        if(err){
            
            return res.status(400).json({
                error : errorHandler(err)               
            })
        }
        
         res.json(data)
    })
}

exports.categoryById = (req,res,next,id)=>{
    Category.findById(id).exec((err,category)=>{
        if(err || !category){
            return res.status(400).json({
                error : "No such category exist"
            })
        }
        req.category = category
        next()
    })
}


exports.read = (req,res)=>{
    return res.json(req.category)
}

exports.list = (req,res)=>{
    Category.find().exec((err,categories)=>{
        if(err){
            return res.status(400).json({
                error : errorHandler(err)
            })
        }

        res.json(categories)
    })
}

exports.update = (req,res)=>{
    let category = req.category //getting category which is already created
    category.name = req.body.name //setting new name 
    category.save((err,category)=>{
        if(err){
            return res.status(400).json({
                error : errorHandler(err)
            })
        }

        res.json(category)
    })
}

exports.remove = (req,res)=>{

    let category = req.category
    category.remove((err,data)=>{
        if(err){
            return res.status(400).json({
                error : errorHandler(err)
            })
        }

        res.json({
            "message" : "category deleted successfully !"
        })
    })
}