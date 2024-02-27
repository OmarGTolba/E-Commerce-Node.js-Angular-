const express=require('express')
const  {getAllCategories,getCategoryById,updateCategory,addNewCategory,deleteCategory}=require("../controllers/category.controller")
const router=express.Router()
const {auth}=require("../middleware/auth")
const {admin}=require("../middleware/admin")

router.get('/', getAllCategories) 
router.get('/:id', getCategoryById) 
router.put('/:id', admin, updateCategory)
router.post('/',admin, addNewCategory)
router.delete('/:id',admin, deleteCategory)

module.exports=router;