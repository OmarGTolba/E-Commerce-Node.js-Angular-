const express = require("express")
const { addNewReview, getReviews, getRating } = require("../controllers/review.controller")
const router = express.Router()

router.post("/:id/reviews", addNewReview)
router.get("/:id/reviews", getReviews)
router.post("/:id/ratings", getRating)

module.exports = router
