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

 exports.showProducts = async (req,res) => {

     try{
         
         products = await Product.find({})

        res.json({
            products,
            status : "ok",
            message : "Success"
        })

     }
     catch(error){
        res.json({
        
            message : "Error occured",
            status : "fail"
        })
     }
 }

 exports.showProduct = async (req,res) => {
     const id = req.params.id
     try{
         const product = await Product.findById(id)

         if(product){
             res.json(product)
         }
         else
         {
            res.json({
                message : "Product not found",
                status : "fail"
            })
         }
     }
     catch(error){
        res.json({
            message : "Error occured",
            status : "fail"
        })
     }

 }



 exports.deleteProduct = async (req,res) => {
    const id = req.params.id
    try{
        const product = await Product.findById(id)

        if(product){
            await Product.deleteOne({ _id : id})
            res.json({
                message : "Product deleted successfully",
                status : "ok"
            })
        }
        else
        {
           res.json({
               message : "Product not found",
               status : "fail"
           })
        }
    }
    catch(error){
       res.json({
           message : "Error occured",
           status : "fail"
       })
    }
    console.log(id)
}