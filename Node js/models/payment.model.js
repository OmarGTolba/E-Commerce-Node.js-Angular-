const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: {
    type: Date,
    default: Date.now,
  },
  orderId:{
    type: String
  }
})

paymentSchema.pre(/^find/, function (next) {
  this.populate({ path: 'user', select: 'email name' })
  next()
})

const Payment = mongoose.model('Payment', paymentSchema)
module.exports = Payment
