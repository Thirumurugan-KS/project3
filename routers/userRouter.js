const express = require("express")
const router = express.Router()

const {home , signUp , signIn , signOut} = require("../controllers/userController")

//Home Route
router.route("/").get(home)


//User Route
router.route("/signup").post(signUp)
router.route("/signin").post(signIn)
router.route("/signout").get(signOut)

module.exports = router