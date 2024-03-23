const express = require ("express")
const router = express.Router()
const { getUserById,createNewUse, findAllUsers, login, updateUser, updateUserInfo, forgotPassword, getResetPassword } = require("../controllers/user.controller");
const app =express();


router.get("/",findAllUsers)
router.get("/:id",getUserById)
router.post("/",createNewUse)
router.post("/login",login)
router.patch("/profile",updateUser)
router.patch("/profile/update",updateUserInfo)
router.post("/password/forgotpassword", forgotPassword)
router.post("/password/reset-password/:id/:token", getResetPassword)

module.exports = router;