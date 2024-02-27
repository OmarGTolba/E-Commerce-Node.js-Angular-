const mongoose = require('mongoose')

const orderSchema = mongoose.model(
  'Order',
  new mongoose.Schema({
    orderItemsIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true,
      },
    ],
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'Pending',
    },
    totalPrice: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    dateOrdered: {
      type: Date,
      default: Date.now,
    },
  }),
)

module.exports = orderSchema
