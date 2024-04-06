const express = require('express')
const uploadImage = require('../services/cloudinary.service');

const {
  getAllProducts,
  getProductById,
  addNewProduct,
  updateProduct,
  deleteProduct,
  topRating
} = require('../controllers/product.controller')

const {
  addNewReview,
  getReviews,
  getRating,
  updateReviews,
  deletereview,
} = require('../controllers/review.controller')

const { auth } = require('../middleware/auth')
const { admin } = require('../middleware/admin')
const upload = require('../services/upload.service')

const router = express.Router()

router.get('/', getAllProducts)
router.get('/topRating', topRating)

router.get('/:id', getProductById)
router.patch('/:id', upload.array('images', 3),admin, uploadImage, updateProduct)

router.post('/', upload.array('images', 3), admin, uploadImage, addNewProduct)
router.delete('/:id', admin, deleteProduct)

router.post('/:id/reviews', auth, addNewReview)
router.get('/:id/reviews', getReviews)
router.patch('/:id/reviews', updateReviews)
router.delete('/:id/reviews', deletereview)
router.post('/:id/ratings', getRating)


module.exports = router
