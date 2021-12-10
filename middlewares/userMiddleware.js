const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const User = require("../models/userModel");


exports.isLogin = async(req,res,next) => {
    if(!req.cookies.token){
        res.json({
            message : "Token not found",
            status : "fail"
        })
    }
    else{
       const userToken = jwt.verify(req.cookies.token ,"thisissecretkey")
       console.log(userToken)
       console.log(Date.now())
       if(userToken.exp < Date.now()){
        res.json({
            message : "Token expires",
            status : "fail"
        })
       }
       const id = userToken.id
       const user = await User.findById(id)
       req.id = id
       req.user = user
       next()
    }
}



exports.isAdmin = async(req,res,next) => {
    const id = req.id 
    const user = await User.findById(id)

    if(user.role!=="admin"){
        res.json({
            message : "Your Role is not matching",
            status : "fail"
        })
    }

    next()

}