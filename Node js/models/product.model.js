const { number } = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name_en: {
    type: String,
    required: [true, "Product required"],
    maxlength: [100, "Too long Product name"],
    minlength: [3, "Too short Product name"],
  },
  name_ar: {
    type: String,
    required: [true, "Product required"],
  },
  description_en: {
    type: String,
  },
  description_ar: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
  brand_en: {
    type: String,
    default: "",
  },
  brand_ar: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  categories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: String,
    default: 'false',
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  }
});
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
