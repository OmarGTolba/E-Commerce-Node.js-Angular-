const express = require('express')
const { getUserFavProduct ,AddNewFavProduct,DelFromFav} = require('../controllers/ProductFav.controller')
const router = express.Router()

router.get('/:id', getUserFavProduct)  //userId
router.post('/:userId/:id', AddNewFavProduct) //productId
router.delete('/:userId/:id', DelFromFav)     //prouctId

module.exports = router;