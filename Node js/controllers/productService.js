const asyncHandler = require('express-async-handler')
const productModel = require("../models/productModel")
const categoryModule = require("../models/categoryModel")
const Product = require('../models/productModel')

const Rating = require('../models/rating.model')
const { number } = require('joi')

const getAllProducts = asyncHandler(async (req, res) => {
    const productList = await productModel.find() //retrive just name 
    res.status(200).json({ results: productList.length, data: productList });
})

const getProductById = asyncHandler(async (req, res) => {
    prdId = ""
    prdId = req.params.id
    const products = await productModel.find();

    const hamada = await productModel.findById({ _id: prdId }).populate('categories')
    console.log(prdId);

    x = await Product.findById(prdId)
    console.log(x.rating);

    z = await Rating.findOne({ prdId }) 
    // console.log(z.ratingsAvg);

    if (z !== null) {
        const Updates = await productModel.updateOne({ _id: prdId }, { $set: { rating: z.ratingsAvg } });
    } 


    res.status(200).json({ results: hamada.length, data: hamada });
})







const addNewProduct = asyncHandler(async (req, res) => {
    const category = await categoryModule.findById(req.body.categories)
    if (!category) return res.status(400).send("invalid category")

    const { name, description, categories, brand, price, countInStock, rating, numReviews, isFeatured } = req.body
    const newProduct = await productModel.create({ name, description, categories, brand, price, countInStock, rating, numReviews, isFeatured })
    res.status(201).json({ data: newProduct })

})

const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params.id

    const Updates = await productModel.updateOne({ _id: id }, req.body)
    res.send(Updates)
})



const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    const product = await productModel.findOne({ _id: id })
    if (!product) {
        res.status(404).send(`there is no book with id ${req.params.id}`); return;
    }
    // const index = books.indexOf(course);
    // books.splice(index, 1)

    await productModel.deleteOne({ _id: id })
    res.send(product)
})



module.exports = {
    getAllProducts,
    getProductById,
    addNewProduct,
    updateProduct,
    deleteProduct
}