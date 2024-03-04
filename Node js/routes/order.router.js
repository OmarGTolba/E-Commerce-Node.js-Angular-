const express = require('express')
const {auth}=require("../middleware/auth")
const {admin}=require("../middleware/admin")

const router = express.Router()
const{getAllOrders,getOrderById,updateStatusOfOrder,getUserOrder,getUserOrders}=require('../controllers/order.controller')


router.get('/', admin, getAllOrders)

router.get('/:id', auth, getOrderById )

router.post('/:id/user', auth, getUserOrder )

router.get('/:id/user/orders',auth,getUserOrders )

// router.post('/', auth, createNewOrder);

router.patch('/:id/:name', auth, updateStatusOfOrder);


module.exports = router;