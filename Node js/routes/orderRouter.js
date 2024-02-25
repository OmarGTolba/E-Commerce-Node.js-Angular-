const express = require('express')

const router = express.Router()
const{getAllOrders,getOrderById,createNewOrder,cancelOrder,getUserOrder,getUserOrders}=require('../controllers/orderService')


router.get('/', getAllOrders)

router.get('/:id',getOrderById )

router.get('/:id/user',getUserOrder )

router.post('/', createNewOrder);
router.get('/:id/user/orders',getUserOrders )

router.patch('/:id/cancel', cancelOrder);

module.exports = router;