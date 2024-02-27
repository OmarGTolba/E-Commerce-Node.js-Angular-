const express = require("express");
const router = express.Router();
const {
  addToCart,
  updateCartItem,
  removeFromCart,
  getCart,
  clearCart,
} = require("../controllers/cart.controller");

router.post("/", addToCart);
router.get("/",getCart)
router.delete("/:product_id", removeFromCart);
router.patch("/:product_id", updateCartItem);
router.delete("/", clearCart);

module.exports = router;

