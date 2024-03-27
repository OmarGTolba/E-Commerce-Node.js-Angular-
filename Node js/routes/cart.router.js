const express = require("express");
const router = express.Router();
const {
  addToCart,
  updateCartItem,
  removeFromCart,
  getCart,
  clearCart,
} = require("../controllers/cart.controller");

router.get("/",getCart)
router.post("/", addToCart);
router.delete("/:product_id", removeFromCart);
router.patch("/:product_id", updateCartItem);
router.delete("/", clearCart);

module.exports = router;

