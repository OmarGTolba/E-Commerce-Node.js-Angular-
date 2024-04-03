const express = require('express')
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
router.patch('/:id', upload.array('image', 2),admin, updateProduct)

router.post('/', upload.single('image'), admin, addNewProduct)
router.delete('/:id', admin, deleteProduct)

router.post('/:id/reviews', auth, addNewReview)
router.get('/:id/reviews', getReviews)
router.patch('/:id/reviews', updateReviews)
router.delete('/:id/reviews', deletereview)
router.post('/:id/ratings', getRating)


module.exports = router
