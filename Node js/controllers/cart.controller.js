const Cart = require("../models/cart.model");
const cartService = require("../models/cart.model");
const Product = require("../models/product.model");

const getCart = async (req, res) => {
  try {
    const user = req.query.user;
    const userCart =await cartService.findOne({user}).populate('items.product_id')
    res.json(userCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { user, product_id, quantity } = req.body;
    
    const countInStock = await Product.findOne({_id: product_id})
    
    const count = countInStock.countInStock

    let cart = await cartService.findOne({ user });

    if (!cart) {
      cart = await cartService.create({ user, items: [] });
    }

    const existingItemIndex =  cart.items.findIndex((item) => {
      return  item.product_id && item.product_id.equals(product_id);
    });

    if (existingItemIndex !== -1 && cart.items[existingItemIndex].quantity + parseInt(quantity) < count) {
      console.log(cart.items[existingItemIndex].quantity + parseInt(quantity));
      cart.items[existingItemIndex].quantity += parseInt(quantity) ; 
      await Cart.updateOne({ user }, cart);
      res.status(201).send("Product added to the cart successfully.");
    } else if(existingItemIndex == -1 && quantity < count){
      cart.items.push({ product_id, quantity });
      await Cart.updateOne({ user }, cart);
      res.status(201).send("Product added to the cart successfully.");
    } else{
      res.status(404).send("No more products in the stock");
    }

   
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const {product_id}=req.params;
    const { quantity } = req.body;
    const user = req.query.user;
    const userCart = await cartService.findOne({ user: user })
    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }  
     const cartItem = userCart.items.findIndex(item => {
      return item.product_id==product_id;
    });
    if (cartItem == -1) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    userCart.items[cartItem].quantity = quantity;
    await userCart.save();
    res.json(userCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { product_id } = req.params;
    const user = req.query.user;
    const userCart = await cartService.findOne({ user: user }).populate('items.product_id').populate('user');

    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const index = userCart.items.findIndex(item => {
      return item.product_id && item.product_id.equals(product_id);
    });
  
    if (index === -1) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    const removedCartItem = userCart.items.splice(index, 1)[0];
    await userCart.save();

    res.json(removedCartItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const clearCart = async (req, res) => {
  try {
    const user = req.query.user; 
    await cartService.deleteMany({ user: user }); 
    res.json({ message: `All shopping carts for user ${user} cleared successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};