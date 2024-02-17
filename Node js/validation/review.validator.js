const joi = require('joi')

const validateNewReview = (review) => {
  const schema = joi.object({
    user: joi.string().required(),
    title: joi.string().min(3).required(),
    rating: joi.number().min(1).max(5).required(),
  })
  return schema.validate(review)
}

module.exports = {
  validateNewReview,
}
