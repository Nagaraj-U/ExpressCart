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
    Product.findById(id)
    .populate("category")
    .exec((err,product)=>{
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



/**
getting product based on highest sold or new arrival 

by sell : /products?sortBy=sold&order=desc&limit=4

by arrival : /products?sortBy=created_at&order=desc&limit=4

if no specific params mentioned then return all products by default

**/
exports.list = (req,res)=>{
    let order = req.query.order ? req.query.order : "desc"
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Product.find()
                  .select("-photo")
                  .populate("category")
                  .sort([[sortBy,order]])
                  .limit(limit)

    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error : "No product found"
            })
        }

        res.json(products)
    })
}


/*
extracting all products which have have category of product in query
excluding current product
$ne : not equal
find by id follwed by category
*/
exports.listRelated = (req,res)=>{
    let limit = req.query.limit ? req.query.limit : 6

    Product.find({_id : {$ne : req.product} , category : req.product.category})
                .limit(limit)
                .populate("category","_id name") //extracting id and name
                .exec((err,products)=>{
                    if(err){
                        return res.status(400).json({
                            error : "No such products found"
                        })
                    }

                    res.json(products)
                })
}


//return all product distinct categories
exports.listCategories = (req,res)=>{
    
    Product.distinct("category").exec((err,categories) =>{
        if(err){
            return res.status(400).json({
                error : "No such categories found" 
            })
        }
        res.json(categories)
    })
}


/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};


//getting photo (in binary form ) ans setting to .jpg or .png according to req
exports.photo = (req,res,next)=>{
    if(req.product.photo.data){
        res.set('Content-Type',req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}


//returns products based on user types in search bar and category choosen in home page (requires database search)
exports.listSearchBar = (req,res) =>{
    const query = {
        name :"", //schema fields
        category : ""
    } //for this object for db search

    if(req.query.search){
        query.name = {$regex : req.query.search , $options : "i"} //regex provided by mongoose ie matches "/name/" and "i" : case insensitive

        if(req.query.category && req.query.category !== "all"){ //if user choses particular category from dropdown
            query.category = req.query.category
        }

        Product.find(query,(err,products) =>{
        if(err){
            return res.status(400).json({
                error : errorHandler(err)
            })
        }
        res.json(products)
        })
        .select("-photo") 
    }
}