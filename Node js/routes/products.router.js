const express = require ("express");
const router = express.Router();
const { getAllProducts, getProductById, AddProduct } = require("../controllers/products.controller");

const { addNewReview, getReviews, getRating } = require("../controllers/review.controller")



module.exports = router

const app =express()


// app.use(auth)
 router.get("/",getAllProducts)
 router.get("/:id",getProductById)
 router.post("/",AddProduct)
 router.post("/:id/reviews", addNewReview )
 router.get("/:id/reviews", getReviews)
 router.post("/:id/ratings", getRating)




module.exports = router;