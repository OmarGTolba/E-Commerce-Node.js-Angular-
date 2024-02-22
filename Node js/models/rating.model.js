const mongoose = require('mongoose')

const ratingSchema = mongoose.Schema({
  ratingsAvg: {
    type: Number,
    default: 0,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  prdId: {
    type: String,
  },
})

const Rating = mongoose.model('Rating', ratingSchema)
module.exports = Rating
