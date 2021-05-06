//express validator

exports.userSignupValidator = (req,res,next)=>{
    req.check("name","Name is required").notEmpty()

    req.check("email","Email must be between 3 to 32 charecters")
                .matches(/.+\@.+\..+/) //regex for checking @ in mail
                .withMessage("email should contain @ ")
                .isLength({min : 4, max : 32})

    req.check("password","password is required").notEmpty()
    req.check("password").isLength({min : 6})
                         .withMessage("password should be atleast 6 charecters")  //overrides default error msg
                         .matches(/\d/)
                         .withMessage("password should contain atleast one digit")
                
    const errors = req.validationErrors()
    if(errors){
        const firstError = errors.map((error)=>error.msg)[0]  //display first error msg
        return res.status(400).json({error : firstError})
    }
    next()
} 
