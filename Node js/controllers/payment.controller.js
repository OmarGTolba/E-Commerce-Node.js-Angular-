const Payment = require('../models/payment.model')
const User = require('../models/user.schema')

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
  // const order = await Order.findById(req.body.orderId)
  // if(!order){
  //     res.status(404).send({message: `there is no order with this id ${req.body.orderId}`})
  // }

  // const totalPrice = order.totalPrice;

  const session = await stripe.checkout.sessions.create({
    line_items: req.body.order?.map((item) => ({
      price_data: {
        currency: 'egp',
        unit_amount: item.price * 100,
        product_data: {
          name: item.name,
          description: item.description,
        },
      },
      quantity: item.amount,
    })),
    mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}/orders?success=true`,
    cancel_url: `${req.protocol}://${req.get('host')}/cart?canceled=true`,
    customer_email: await findUserEmailById(req.body.user),
  })
  res.status(200).json({ status: 'success', session })
}

module.exports = {
  checkoutSession,
  getAllPayments,
}
