const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    product_id: {
        type:mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

const cartUserSchema = new mongoose.Schema({
   user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    items:[cartSchema]
});

const Cart = mongoose.model('Cart', cartUserSchema);

module.exports = Cart;