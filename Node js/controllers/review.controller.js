const Review = require('../models/review.model')
const {
  addReview,
  showReview,
  showRating,
} = require('../services/review.service')
const { validateNewReview } = require('../validation/review.validator')

const addNewReview = async (req, res) => {
  const id = req.params.id
  const { error } = validateNewReview(req.body)

  if (error) {
    res.status(400).send({ message: error })
    return
  }

  const review = await addReview({ prdId: id, ...req.body })
  res.send(review)
}

const getReviews = async (req, res) => {
  const id = req.params.id
  const review = await showReview(id)
  res.send(review)
}

const getRating = async (req, res) => {
  const id = req.params.id
  const rating = await showRating(id)
  res.send(rating)
}


const updateReviews = (async (req, res) => {
  const id = req.params.id
  const Updates = await Review.updateOne({ _id: id }, req.body)
  res.send(Updates)
})

const getReviewById = (async (req, res) => {
  const id = req.params.id
  const Updates = await Review.updateOne({ _id: id }, req.body)
  res.send(Updates)
})




module.exports = {
  addNewReview,
  getReviews,
  getRating,
  updateReviews
}
