const express = require('express')
const {getAllProducts, getProductById,addNewProduct, updateProduct, deleteProduct}=require("../controllers/productService")
const router = express.Router()

router.get('/', getAllProducts)

router.get('/:id', getProductById)
router.patch('/:id', updateProduct)

router.post('/',addNewProduct)
router.delete('/:id',deleteProduct)

module.exports = router;