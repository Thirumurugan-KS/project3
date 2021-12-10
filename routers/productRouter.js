const express = require("express")
const router = express.Router()

const { isLogin, isAdmin } = require("../middlewares/userMiddleware")
const { addProduct, showProducts } = require("../controllers/productController")


//Admin Route
router.route("/admin/product/add").post( isLogin ,isAdmin ,addProduct)
router.route("/admin/products").post( isLogin ,isAdmin , showProducts)


module.exports = router