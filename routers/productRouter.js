const express = require("express")
const router = express.Router()

const { isLogin, isAdmin } = require("../middlewares/userMiddleware")
const { addProduct, showProducts , showProduct, 
    deleteProduct , addReview, showReview, deleteReview} = require("../controllers/productController")

//user Route
router.route("/products").get( isLogin  , showProducts)
router.route("/product/:id").get( isLogin  , showProduct)
router.route("/review").put( isLogin  , addReview)
router.route("/review").get( isLogin  , showReview)
router.route("/review").delete( isLogin  , deleteReview)


//Admin Route
router.route("/admin/product/add").post( isLogin ,isAdmin ,addProduct)
router.route("/admin/products").get( isLogin ,isAdmin , showProducts)
router.route("/admin/product/:id").get( isLogin ,isAdmin , showProduct)
router.route("/admin/product/:id").delete( isLogin ,isAdmin , deleteProduct)


module.exports = router