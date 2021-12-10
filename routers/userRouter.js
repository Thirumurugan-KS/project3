const express = require("express")
const router = express.Router()

router.route("/").get( (req,res)=>{
    console.log("Hello")
    res.send("Hello")
})

module.exports = router