const express = require("express")
const router = express.Router()

const {home , signUp , signIn , signOut ,
    forgetPassword , resetForgetPassword, userDashboard} = require("../controllers/userController")
    const { isLogin } = require("../middlewares/userMiddleware")
//Home Route
router.route("/").get(home)


//User Route
router.route("/signup").post(signUp)
router.route("/signin").post(signIn)
router.route("/signout").get(signOut)
router.route("/forgetpassword").post(forgetPassword)
router.route("/password/reset/:token").post(resetForgetPassword)
router.route("/userdashboard").get(isLogin ,userDashboard)

module.exports = router