const express = require ("express")
const router = express.Router()
const { createNewUse, findAllUsers, login, updateUser } = require("../controllers/user.controller");
const app =express();


router.get("/",findAllUsers)
router.post("/",createNewUse)
router.post("/login",login)
router.patch("/profile",updateUser)
// router.get("/get",getProducts)

module.exports = router;