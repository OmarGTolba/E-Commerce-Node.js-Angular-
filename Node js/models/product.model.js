const { number } = require('joi');
const mongoose = require('mongoose')


const productSchema =new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product required"],
        maxlength: [32, 'Too long Product name'],
        minlength: [3, 'Too short Product name']
    },
    description: {
        type: String,
    },
    images: [{
        type: String,
    }],
    brand: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        default: 0
    },
    categories:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,

    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255

    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },

    image: String,

})
const Product = mongoose.model('Product',productSchema)


module.exports = Product;