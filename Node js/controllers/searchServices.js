const asyncHandler = require('express-async-handler')
const productModel =require('../models/productModel')
const categoryModel=require("../models/categoryModel")

const searchForProduct = asyncHandler(async (req, res) => {
    const name = req.params.name;
    const productList = await productModel.find({name});
    res.status(200).json({ results: productList.length, data: productList });
})
const searchForCategory = asyncHandler(async (req, res) => {
    const name = req.params.name;
    const categoryList = await categoryModel.find({name});
    const productList = await productModel.find({categories:categoryList._id});

    res.status(200).json({ results: categoryList.length, data: productList });
})


module.exports = {searchForProduct,searchForCategory};