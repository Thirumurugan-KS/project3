const express = require("express")
const router = express.Router()

const {home , signUp} = require("../controllers/userController")

//Home Route
router.route("/").get(home)


//User Route
router.route("/signup").get( (req,res)=>{
    res.send("sign up")
})


module.exports = router