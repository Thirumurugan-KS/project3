const mongoose = require('mongoose');
const Product = require("../models/productModel")

exports.addProduct = async (req,res) => {
    
    try{
        const { name , category , stock} = req.body
    if(name)
    {
        const id = req.id
        const product = await Product.create({
            name : name,
            category : category,
            stock : stock,
            user : id
        })
        
    

        res.json({
            product,
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
            message : "Error occur while saving",
            status : "fail"
        })
    }

 }