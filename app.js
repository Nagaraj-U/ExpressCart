require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

//app
const app = express()
const port = process.env.PORT || 3000

//import routes
const userRoute = require("./routes/user")

//db
mongoose.connect(process.env.DATABASE,
  { useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true}).then(()=>{console.log("database connected");});

    
//require middlewares
app.use(userRoute);


app.listen(port,(req,res)=>{
    console.log(`server running on port ${port}`);
})

