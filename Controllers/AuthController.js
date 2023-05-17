const UserModel = require("../Models/UserModel");
const jwt=require("jsonwebtoken");

const maxAge=3*24*60*60;

const createToken=async(id)=>{
    return jwt.sign({id},"Huzaifa Shaikh super secret key",{
        expiresIn:maxAge
    });
}

const handleErrors = (err)=>{
    let errors ={email:"", password:""};

    if(err.message === "incorrect Email")
    errors.email = "That email is not register"

    if(err.message === "incorrect password")
    errors.email = "The password is  incorrect"

    if(err.code===11000){
        errors.email = "Email is already register"
        return errors;
    }

    if(err.message.includes("user validate fail")){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message;
        })
    }
    return errors;
}


module.exports.register=async(req,res,next)=>{
    try{
        const {name,email,password}=req.body;

        const user=await UserModel.create({name,email,password});
        const token=await createToken(user._id);

        res.cookie("jwt",token,{
            withCredentials:true,
            httpOnly:false,
            maxAge:maxAge*1000
        });
        res.status(201).json({user: user._id, created:true});
    }catch(err){
        console.log(err);
        const errors = handleErrors(err)
        res.json({errors,created:false}); 
    }
}

module.exports.login=async(req,res,next)=>{
    try{
        const {email,password}=req.body;

        const user=await UserModel.login(email,password);
        const token=await createToken(user._id);

        res.cookie("jwt",token,{
            withCredentials:true,
            httpOnly:false,
            maxAge:maxAge*1000
        });
        res.status(200).json({user: user._id, token:token, created:true});
    }catch(err){
        console.log(err);
        const errors = handleErrors(err)
        res.json({errors,created:false}); 
    }
}
