

const Cart = require('../models/cart.model');

const getCartService = async (email) => {
    try {
        return await Cart.findOne({email }).populate('products');
    } catch (error) {
        throw new Error('Failed to get cart');
    }
};


module.exports = {

    getCartService
};
