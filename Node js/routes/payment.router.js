const express = require("express")
const { checkoutSession, getAllPayments } = require("../controllers/payment.controller")

const router = express.Router()
router.get("/", getAllPayments)
router.post("/checkout", checkoutSession)

// router.post('/result', getResult)

module.exports = router