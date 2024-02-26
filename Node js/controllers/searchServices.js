const asyncHandler = require('express-async-handler')
const productModel =require('../models/productModel')
const categoryModel=require("../models/categoryModel")

const searchForProduct = asyncHandler(async (req, res) => {
    const name = req.params.name;
    const productList = await productModel.find({name:{"$regex":name,"$options":"i"}});
    
    res.status(200).json({ results: productList.length, data: productList });
})
const searchForCategory = asyncHandler(async (req, res) => {
    const name = req.params.name;
    const categoryList = await categoryModel.find({name:{"$regex":name,"$options":"i"}});

let productList=[]; 
let product=[] ;
for (let index = 0; index < categoryList.length; index++) {
   console.log(categoryList.length);
    product.push(await productModel.find({categories:categoryList[index]._id})) 
}
console.log(product); 
// console.log(productList);


    res.status(200).json({ results: categoryList.length, data: product });
})


module.exports = {searchForProduct,searchForCategory};