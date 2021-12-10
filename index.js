const express = require("express")

const app = express()

app.get("/" , (req,res)=>{
    console.log("Hello")
    res.send("Hello")
})

app.listen(8000 , ()=>{
    console.log("Server is up")
})