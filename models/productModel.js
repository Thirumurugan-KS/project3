const express = require("express")
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name : String,
    category : String,
    description : String,
    stock : Number,
    price : Number,
    user : mongoose.Types.ObjectId,
    brand : String,
    rating : {
        type : Number,
        default : 0
            },
    numberOfReviews :{
        type : Number,
        default : 0
            },
    reviews : [
    {
        user : mongoose.Types.ObjectId,
        name : String,
        rating : Number,
        comment : String

    }
                ],
    createdAt : {
        type : Date,
        default : Date.now()
}
})



module.exports = mongoose.model("product" , productSchema)
