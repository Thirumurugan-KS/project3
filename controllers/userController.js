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

exports.signUp = async (req,res) => {
    
    try{
        console.log(req.body)
        const { name , email , password , phonenumber } = req.body
    if(name && email && password && phonenumber)
    {
        
        const user = await User.create({
            name : name,
            email : email,
            password : password,
            phonenumber : phonenumber
        })
        
        
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