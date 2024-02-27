const mongoose = require('mongoose')
const Rating = require('./rating.model')

const reviewSchema = mongoose.Schema({
  title: {
    type: String,
    reuired: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  prdId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Product" ,
    required: true
  },
  date:{
    type: Date,
    default: Date.now,
  }
})

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: 'user', select: 'email name' })
  next()
})


reviewSchema.statics.calcAvgRatingAndCount = async function (productId) {
  const result = await this.aggregate([
    { $match: { prdId: productId } },
    {
      $group: {
        _id: '$prdId',
        avgRating: { $avg: '$rating' },
        countRatings: { $sum: 1 },
      },
    },
  ])
  console.log(result)

  const existingRating = await Rating.findOne({ prdId: productId })

  if (!existingRating) {
    const newRating = Rating.create({
      prdId: productId,
      ratingsAvg: result[0].avgRating,
      ratingsQuantity: result[0].countRatings,
    })
  } else {
    await Rating.findOneAndUpdate(
      { prdId: productId },
      {
        ratingsAvg: result[0].avgRating,
        ratingsQuantity: result[0].countRatings,
      },
    )
  }
}

reviewSchema.post('save', async function () {
  await this.constructor.calcAvgRatingAndCount(this.prdId)
})

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review
