const express=require('express')
const  {getAllCategories}=require("../controllers/category.controller")
const router=express.Router()
const {admin}=require("../middleware/admin")
const { getAllUsers } = require('../services/user.service')
const { getAllProducts } = require('../controllers/product.controller')
const { getAllOrders } = require('../controllers/order.controller')

router.get('/categories', getAllCategories) 
router.get('/users', getAllUsers) 
router.get('/orders', getAllOrders)
router.get('/products', getAllProducts)

module.exports=router;