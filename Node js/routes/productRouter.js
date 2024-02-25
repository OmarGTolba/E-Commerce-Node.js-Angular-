const express = require('express')
const {getAllProducts, getProductById,addNewProduct, updateProduct, deleteProduct}=require("../controllers/productService")
const { addNewReview, getReviews, getRating } = require("../controllers/review.controller")
const {auth}=require("../middleware/auth")
const {admin}=require("../middleware/admin")

const router = express.Router()

router.get('/', getAllProducts)

router.get('/:id', auth, getProductById)
router.patch('/:id', admin, updateProduct)

router.post('/', admin, addNewProduct)
router.delete('/:id',deleteProduct)


router.post("/:id/reviews", addNewReview )
router.get("/:id/reviews", getReviews)
router.post("/:id/ratings", getRating)

module.exports = router;