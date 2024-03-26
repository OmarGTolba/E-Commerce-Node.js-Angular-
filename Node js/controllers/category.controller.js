const asyncHandler = require("express-async-handler");
const categoryModule = require("../models/category.model");

const getAllCategories = asyncHandler(async (req, res) => {
  const categoryList = await categoryModule.find();
  res.status(200).json({ results: categoryList.length, data: categoryList });
});

const getCategoryById = asyncHandler(async (req, res) => {
  const category = await categoryModule.findById(req.params.id);
  res.status(200).json({ data: category });
});

const updateCategory = asyncHandler(async (req, res) => {
  const category = {
    name_en: req.body.name_en,
    name_ar: req.body.name_ar,
    icon: req.body.icon,
  };
  const updatedCategory = await categoryModule.findByIdAndUpdate(
    req.params.id,
    category,
    { new: true }
  );
  res.status(200).json({ data: updatedCategory });
});

const addNewCategory = asyncHandler(async (req, res) => {
  let { name_en, name_ar, icon, color } = req.body;
  const newcategory = await categoryModule.create({
    name_en,
    name_ar,
    icon,
    color,
  });
  res.status(201).json({ data: newcategory });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const cat = await categoryModule.findByIdAndDelete(req.params.id);
  const allcat = await categoryModule.find();
  res.status(201).json({ data: allcat, massage: "category deleted" });
});

module.exports = {
  getAllCategories,
  getCategoryById,
  updateCategory,
  addNewCategory,
  deleteCategory,
};
