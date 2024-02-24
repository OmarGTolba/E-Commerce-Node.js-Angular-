const express = require('express')
const {auth}=require("../middleware/auth")
const {admin}=require("../middleware/admin")

const router = express.Router()
const{getAllOrders,getOrderById,createNewOrder,cancelOrder,getUserOrder}=require('../controllers/orderService')


router.get('/', admin, getAllOrders)

router.get('/:id', auth, getOrderById )

router.get('/:id/user', auth, getUserOrder )

router.post('/', auth, createNewOrder);

router.patch('/:id/cancel', auth, cancelOrder);



module.exports = router;