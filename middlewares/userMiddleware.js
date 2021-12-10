const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const User = require("../models/userModel");


exports.isLogin = (req,res,next) => {
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
       req.id = id
       next()
    }
}