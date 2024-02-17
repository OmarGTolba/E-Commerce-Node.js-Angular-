const express = require('express')
const router = express.Router()
const searchForProduct=require("../controllers/searchServices")

router.get('/:name', searchForProduct)

module.exports = router;