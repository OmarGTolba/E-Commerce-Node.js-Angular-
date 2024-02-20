const express = require('express')
const router = express.Router()
const {searchForProduct, searchForCategory}=require("../controllers/searchServices")

router.get('/product/:name', searchForProduct)
router.get('/category/:name', searchForCategory)
module.exports = router;