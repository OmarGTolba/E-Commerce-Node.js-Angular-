const express = require ("express")
const router = express.Router()
const { getUserById,createNewUse, findAllUsers, login, updateUser, getProducts, updateUserInfo } = require("../controllers/user.controller");
const app =express();


router.get("/",findAllUsers)
router.get("/:id",getUserById)
router.post("/",createNewUse)
router.post("/login",login)
router.patch("/profile",updateUser)
router.patch("/profile/update",updateUserInfo)

module.exports = router;