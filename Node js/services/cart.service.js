const Cart = require('../models/cart.model')

const getCartService = async (user) => {
  try {
    return await Cart.findOne({ user }).populate('items.product_id')
  } catch (error) {
    throw new Error('Failed to get cart')
  }
}

const addToCartService = async (cart) => {
    return await Cart.create(cart)
}

const clearCartService = async(user)=>{
    return await Cart.deleteMany({ user: user})
}
module.exports = {
  getCartService,
  addToCartService,
  clearCartService
}
