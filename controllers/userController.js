const cloudinary = require("cloudinary").v2
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const User = require("../models/userModel")

cloudinary.config({
    cloud_name : 'dirl9qdbz',
    api_key : '366751568763697',
    api_secret : '0Tzbzs-pqoH3jlAelvnwNEl7eRg'
})


exports.home = (req,res)=>{
    console.log("Hello")
    res.send("Hello Test")
}

//signup
exports.signUp = async (req,res) => {
    
    try{
        const { name , email , password , phonenumber } = req.body
    if(name && email && password && phonenumber)
    {
        
        const user = await User.create({
            name : name,
            email : email,
            password : password,
            phonenumber : phonenumber
        })
        
        //todo
        if(user){
            if(req.files){

                let cloud = await cloudinary.uploader.upload(req.files.photo.tempFilePath , {
                    folder : "profile"
                })
                user.photo.id = cloud.public_id
                user.photo.secure_url = cloud.secure_url
                await user.save()
                res.json({user,
                status : "ok"})
            }
        }
        else{
            res.send("Already user present")
        }

        res.json({
            user,
            message : "User saved",
            status : "ok"
        })
    }
    else{
        res.json({
            message : "Please fill all the fields",
            status : "fail"
        })

    }
    }
    catch(error){
        
        res.json({
            message : "Duplicate Email or Some error occurs",
            status : "fail"
        })
    }

 }

 // signin
exports.signIn = async (req,res) => {

    const { email , password} = req.body

    try{
        if(email && password){

        }
        else{
            const user = await User.findOne({ email })

    if(!user){
        res.json({
            message : "User not found",
            status : "fail"
        })
    }
    else{

    const isValid = await user.isPasswordValid(password , user.password)
    if(!isValid){

        res.json({
            message : "Email or password is incorrect",
            status : "fail"
        })

    }
    else {
        let token = user.getToken()
        res.cookie("token" ,  token, {
            httpOnly : true,
            expiresIn : Date.now() * 3 * 60 * 60 * 1000
        }).json({
            status : "ok",
            user : user,
            token : token
        })
    }   
    }
        }
    }
    catch(error){
        res.json({
            message : "Error occured",
            status : "fail"
        })
    }
 
}