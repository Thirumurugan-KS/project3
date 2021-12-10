const express = require("express")
const router = express.Router()

const { isLogin, isAdmin } = require("../middlewares/userMiddleware")
const { addProduct } = require("../controllers/productController")


//Admin Route
router.route("/admin/product/add").post( isLogin ,isAdmin ,addProduct)

module.exports = router