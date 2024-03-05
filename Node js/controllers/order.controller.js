const asyncHandler = require('express-async-handler')
const orderModel = require('../models/order.model')
const OrderItemModel = require('../models/orderItem.model')
const Cart = require('../models/cart.model')
const User = require('../models/user.model')
const Cartservices=require('../services/cart.service')

const getAllOrders = asyncHandler(async (req, res) => {
  const order = await orderModel
    .find()
    .populate('user', 'name -_id')
    .populate({
      path: 'orderItemsIds',
      populate: {
        path: 'product',
        populate: 'categories',
      },
    })
  res.status(200).json({ results: order.length, data: order })
})

const getUserOrders = asyncHandler(async (req, res) => {
  const userId = req.params.id
  const userOrder = await orderModel
    .find({ user: userId })
    .populate('user', 'name -_id')
    .populate({
      path: 'orderItemsIds',
      populate: {
        path: 'product',
        populate: 'categories',
      },
    })
  res.status(200).json({ data: userOrder })
})

const getOrderById = asyncHandler(async (req, res) => {
  const order = await orderModel
    .findById(req.params.id)
    .populate('user', 'name -_id')
    .populate({
      path: 'orderItemsIds',
      populate: {
        path: 'product',
        populate: 'categories',
      },
    })
  res.status(200).json({ data: order })
})

const getUserOrder = asyncHandler(async (req, res) => {
  const userId = req.params.id 

  const userCarts = await Cart
    .find({ user: userId })
    .populate('items.product_id')
  console.log(userCarts[0].items[0].quantity)

  if (!userCarts || userCarts.length === 0) {
    return res.status(400).json({ message: 'No carts found for the user' })
  }

  const orderItemsIds = []
  let totalPrice = 0

  for (const userCart of userCarts) {
    for (const cartItem of userCart.items) {
      const { product_id, quantity } = cartItem

      const newItem = await OrderItemModel.create({
        quantity,
        product: product_id,
      })

      orderItemsIds.push(newItem._id)
    }
    totalPrice +=
      userCarts[0].items[0].product_id.price * userCarts[0].items[0].quantity
  }

  const { city, phone, status, dateOrdered } = req.body
  let user = await User.find({ _id: userId })

  const newOrder = await orderModel.create({
    orderItemsIds,
    city: city,
    phone,
    status,
    totalPrice,
    user: userId,
    dateOrdered,
  })

  const order = await orderModel
    .findById(newOrder._id)
    .populate('orderItemsIds')

  
  // Clear all user's carts after the order is created

  Cartservices.clearCartService(userId)
  res.status(200).json({ data: order })
})

const updateStatusOfOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id
  const status= req.params.name

  const updatedOrder = await orderModel.findByIdAndUpdate(
    orderId,
    { $set: { status: status } },
    { new: true },
  )

  if (!updatedOrder) {
    return res.status(404).json({ message: 'Order not found' })
  }

  res
    .status(200)
    .json({ message: 'Done successfully', data: updatedOrder })
})


module.exports = {
  getAllOrders,
  getOrderById,
  updateStatusOfOrder,
  getUserOrder,
  getUserOrders,
}
