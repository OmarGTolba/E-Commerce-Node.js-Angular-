const asyncHandler = require('express-async-handler')
const categoryModule = require('../models/category.model')

const getAllCategories = asyncHandler(async (req, res) => {
  const categoryList = await categoryModule.find()
  res.status(200).json({ results: categoryList.length, data: categoryList })
})

const getCategoryById = asyncHandler(async (req, res) => {
  const category = await categoryModule.findById(req.params.id)
  res.status(200).json({ data: category })
})

const updateCategory = asyncHandler(async (req, res) => {
  const category = {
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  }
  const updatedCategory = await categoryModule.findByIdAndUpdate(
    req.params.id,
    category,
  )
  res.status(200).json({ data: updatedCategory })
})

const addNewCategory = asyncHandler(async (req, res) => {
  let { name, icon, color } = req.body
  const newcategory = await categoryModule.create({ name, icon, color })
  res.status(201).json({ data: newcategory })
})

const deleteCategory = asyncHandler(async (req, res) => {
  const cat = await categoryModule.findByIdAndDelete(req.params.id)
  res.status(201).json({ data: cat, massage: 'category deleted' })
})

module.exports = {
  getAllCategories,
  getCategoryById,
  updateCategory,
  addNewCategory,
  deleteCategory,
}
