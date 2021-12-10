const mongoose = require('mongoose');
const Product = require("../models/productModel")

exports.addProduct = async (req,res) => {
    
    try{
        const { name , category , stock , description , price , brand} = req.body

        console.log(req.body)

    if(name && category && stock && description && price && brand)
    {
        const id = req.id
        const product = await Product.create({
            name : name,
            category : category,
            stock : stock,
            user : id,
            description : description,
            price : price,
            brand : brand
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


exports.addReview = async(req,res) =>{

    const { rating , comment , productId } = req.body
    console.log(productId)

    try{

        const product = await Product.findById(productId)

        if(!product){

            res.json({
                message : "Product not found",
                status : "fail"
            })
        }
        const reviews = {
            user : req.user._id,
            name : req.user.name,
            rating : rating,
            comment : comment
        }

        const isPresent = product.reviews.find( (rev) => {
            return rev.user.toString() == req.user._id.toString()
        })

        if(isPresent){
            console.log("true")
        }
        else{
            console.log("false")
        }

        if(isPresent){

            await product.reviews.forEach( rev => {
                if(rev.user.toString() === req.user._id.toString()){
                    rev.rating = rating
                    rev.comment = comment
                }
            });
        }
        else{

            await product.reviews.push(reviews)

        }

        product.numberOfReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc,item) => item.rating + acc , 0) / product.numberOfReviews


        await product.save()

        res.json(product)
    }
    catch(error){
        res.json({
            message : "Error occured",
            status : "fail"
        })
    }
}

exports.showReview = async(req,res) => {

    const id = req.query.productId
    try{

        const product = await Product.findById(id)

        if(!product){
            res.json({
                message : "Product not found",
                status : "fail"
            })
        }
        else{
            res.json({
                product,
                status : "ok"
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

exports.deleteReview = async(req,res) => {

    const { productId } = req.body

    try{

        const product = await Product.findById(productId)

        if(!product){
            res.json({
                message : "Product not found",
                status : "fail"
            })
        }
        else{
            res.json({
                message : "Successfully deleted",
                status : "ok"
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