const orderSchema = require('../models/order.model')
const Payment = require('../models/payment.model')
const User = require('../models/user.model')
const Product = require('../models/product.model')

const getAllPayments = async (req, res) => {
  const payments = await Payment.find()
  res.send(payments)
}

const findUserEmailById = async (userId) => {
  const user = await User.findById(userId)
  if (!user) {
    console.log('User not found')
    return
  }
  return user.email
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

let result
let order
checkoutSession = async (req, res) => {
  order = await orderSchema.findById(req.body.orderId).populate({
    path: 'orderItemsIds',
    populate: {
      path: 'product',
      populate: 'categories',
    },
  })
  if (!order) {
    res
      .status(404)
      .send({ message: `there is no order with this id ${req.body.orderId}` })
  }
  const session = await stripe.checkout.sessions.create({
    line_items: order.orderItemsIds?.map((item) => ({
      price_data: {
        currency: 'egp',
        unit_amount: item.product.price * 100,
        product_data: {
          name: item.product.name,
          description: item.product.description,
        },
      },
      quantity: 1,
    })),
    mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}/orders?success=true`,
    cancel_url: `${req.protocol}://${req.get('host')}/cart?canceled=true`,
    customer_email: await findUserEmailById(req.body.user),
  })
  res.status(200).json({ status: 'success', session })
  result = res.statusCode
}

const getResult = async (req, res) => {
  if (result == 200) {
    res.status(200).send('payment suucceeded')
    const orderUpdate = orderSchema.findByIdAndUpdate(order._id, {
      $set: { status: 'success' },
    })
    order.orderItemsIds.forEach(async (Ele) => {
      const product = await Product.findById({ _id: Ele.product._id })
      const upateCount = await Product.updateOne(
        { _id: product.product_id },
        { $set: { countInStock: product.countInStock - Ele.quantity } },
      )
    })
  } else {
    res.status(400).send('payment failed')
  }
}

module.exports = {
  checkoutSession,
  getAllPayments,
  getResult,
}
