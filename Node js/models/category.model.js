const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: [true, 'Category required'],
    unique: [true, 'Category must be unique'],
    maxlength: [32, 'Too long category name'],
    minlength: [3, 'Too short category name'],
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
