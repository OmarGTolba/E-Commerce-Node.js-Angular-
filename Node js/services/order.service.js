const asyncHandler = require('express-async-handler')
const orderModel = require('../models/order.model')
const OrderItemModel = require('../models/orderItem.model')

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
const getUserOrder = asyncHandler(async (req, res) => {
  const userId = req.params.id

  const userOrder = await orderModel.find({ user: userId }).populate({
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

const calculateTotalPrice = async (orderItemIds) => {
  let totalPrice = 0

  for (const item of orderItemIds) {
    const orderItem = await OrderItemModel.findById(item).populate(
      'product',
      'price',
    )
    totalPrice += orderItem.product.price * orderItem.quantity
  }

  return totalPrice
}

const createNewOrder = asyncHandler(async (req, res) => {
  const orderItemsIds = []

  for (const item of req.body.orderItems) {
    let { quantity, product } = item
    const newItem = await OrderItemModel.create({ quantity, product })

    orderItemsIds.push(newItem._id)
  }

  const totalPrice = await calculateTotalPrice(orderItemsIds)

  const { city, phone, status, user, dateOrdered } = req.body
  const newOrder = await orderModel.create({
    orderItemsIds,
    city,
    phone,
    status,
    totalPrice,
    user,
    dateOrdered,
  })

  if (!newOrder) {
    return res.status(400).send("the order can't be created")
  }
  res.status(200).json({ data: newOrder })
})

const cancelOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id

  const updatedOrder = await orderModel.findByIdAndUpdate(
    orderId,
    { $set: { status: 'canceled' } },
    { new: true },
  )

  if (!updatedOrder) {
    return res.status(404).json({ message: 'Order not found' })
  }

  res
    .status(200)
    .json({ message: 'Order canceled successfully', data: updatedOrder })
})

module.exports = {
  getAllOrders,
  getOrderById,
  createNewOrder,
  cancelOrder,
  getUserOrder,
}
