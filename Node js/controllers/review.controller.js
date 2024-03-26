const Review = require("../models/review.model");
const {
  addReview,
  showReview,
  showRating,
} = require("../services/review.service");
const { validateNewReview } = require("../validation/review.validator");

const addNewReview = async (req, res) => {
  const id = req.params.id;
  const { error } = validateNewReview(req.body);

  if (error) {
    res.status(400).send({ message: error });
    return;
  }

  const review = await addReview({ prdId: id, ...req.body });
  res.send(review);
};

const getReviews = async (req, res) => {
  const id = req.params.id;
  const review = await showReview(id);
  res.send(review);
};

const getRating = async (req, res) => {
  const id = req.params.id;
  const rating = await showRating(id);
  res.send(rating);
};

const updateReviews = async (req, res) => {
  const id = req.params.id;
  const Updates = await Review.updateOne({ _id: id }, req.body);
  res.send(Updates);
};

const getReviewById = async (req, res) => {
  const id = req.params.id;
  const Updates = await Review.updateOne({ _id: id }, req.body);
  res.send(Updates);
};

const deletereview = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
      throw new Error("Review not found");
    }
    res.send({ message: "deleted" });
    return deletedReview;
  } catch (error) {
    console.error("Error deleting review:", error.message);
    throw error;
  }
};

module.exports = {
  addNewReview,
  getReviews,
  getRating,
  updateReviews,
  deletereview,
};
