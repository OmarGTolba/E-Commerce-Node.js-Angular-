const asyncHandler = require('express-async-handler')
const productModel =require('../models/productModel')

const searchForProduct = asyncHandler(async (req, res) => {
    const name = req.params.name;
    const productList = await productModel.find({name});
    res.status(200).json({ results: productList.length, data: productList });
})

module.exports = searchForProduct;