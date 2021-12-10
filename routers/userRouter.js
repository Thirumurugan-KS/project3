const express = require("express")
const router = express.Router()

const {home , signUp , signIn} = require("../controllers/userController")

//Home Route
router.route("/").get(home)


//User Route
router.route("/signup").post(signUp)
router.route("/signin").post(signIn)


module.exports = router