const asyncHandler = require('express-async-handler')
const productModel = require('../models/product.model')
const categoryModel = require("../models/category.model")

const searchForProduct = asyncHandler(async (req, res) => {
    const name = req.params.name;
    const productList = await productModel.find({ name: { "$regex": name, "$options": "i" } });

    res.status(200).json({ results: productList.length, data: productList });
})
const searchForCategory = asyncHandler(async (req, res) => {
    const name = req.params.name;
    const categoryList = await categoryModel.find({ name: { "$regex": name, "$options": "i" } });

    let product = [];
    for (let index = 0; index < categoryList.length; index++) {
        product.push(await productModel.find({ categories: categoryList[index]._id }))
    }

    res.status(200).json({ results: categoryList.length, data: product });
})


module.exports = { searchForProduct, searchForCategory };