const express = require("express")
const router = express.Router()

const { isLogin, isAdmin } = require("../middlewares/userMiddleware")
const { addProduct, showProducts , showProduct, deleteProduct} = require("../controllers/productController")


//Admin Route
router.route("/admin/product/add").post( isLogin ,isAdmin ,addProduct)
router.route("/admin/products").post( isLogin ,isAdmin , showProducts)
router.route("/admin/product/:id").get( isLogin ,isAdmin , showProduct)
router.route("/admin/product/:id").delete( isLogin ,isAdmin , deleteProduct)


module.exports = router