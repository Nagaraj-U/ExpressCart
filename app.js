require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const expressValidator = require("express-validator")
const cors = require("cors")

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const braintreeRoutes = require("./routes/braintree")
const orderRoutes = require("./routes/order")


//app
const app = express()
const port = process.env.PORT || 3000

//db
mongoose.connect(process.env.DATABASE,
  { useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true})
    .then(()=>{console.log("database connected");});


//middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(morgan('dev')) //log HTTP requests
app.use(expressValidator())//email,name,password validation
app.use(cors()) //helps to handle requests coming from different ports (from frontend port)
    
//route middlewares
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)
app.use("/api",braintreeRoutes)
app.use("/api",orderRoutes)


app.listen(port,(req,res)=>{
    console.log(`server running on port ${port}`);
})

