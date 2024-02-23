const orderSchema = require('../models/orderModel')
const Payment = require('../models/payment.model')
const User = require('../models/user.schema')
const productModel = require("../models/productModel")

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

//TODO: Get checkout session from stripe and send it as response

checkoutSession = async (req, res) => {
  const order = await orderSchema.findById(req.body.orderId).populate({
    path: 'orderItemsIds', populate: {
        path: 'product', populate: 'categories'
}})
  if(!order){
      res.status(404).send({message: `there is no order with this id ${req.body.orderId}`})
  }

  const totalPrice = order.totalPrice;
  const session = await stripe.checkout.sessions.create({
    // line_items: req.body.order?.map((item) => ({
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
    // success_url: `${req.protocol}://${req.get('host')}/orders?success=true`,
    // cancel_url: `${req.protocol}://${req.get('host')}/cart?canceled=true`,
    customer_email: await findUserEmailById(req.body.user),
  })
  res.status(200).json({ status: 'success', session })
}


const result = (x) =>{
  console.log(x);

}
module.exports = {
  checkoutSession,
  getAllPayments,
}
