require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const expressValidator = require("express-validator")

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")


//app
const app = express()
const port = process.env.PORT || 3000

//db
mongoose.connect(process.env.DATABASE,
  { useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true}).then(()=>{console.log("database connected");});


//middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(morgan('dev')) //log HTTP requests
app.use(expressValidator())//email,name,password validation
    
//route middlewares
app.use("/api",authRoutes);
app.use("/api",userRoutes);


app.listen(port,(req,res)=>{
    console.log(`server running on port ${port}`);
})

