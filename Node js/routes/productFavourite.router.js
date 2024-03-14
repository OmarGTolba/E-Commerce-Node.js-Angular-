const express = require('express')
const { getUserFavProduct ,AddNewFavProduct,DelFromFav,isFav} = require('../controllers/ProductFav.controller')
const router = express.Router()

router.get('/:id', getUserFavProduct)  //userId
router.post('/:userId/:id', AddNewFavProduct) //productId
router.delete('/:userId/:id', DelFromFav)     //prouctId
router.get('/:userId/:id', isFav)
module.exports = router;