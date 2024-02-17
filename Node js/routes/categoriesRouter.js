const express=require('express')
const  {getAllCategories,getCategoryById,updateCategory,addNewCategory,deleteCategory}=require("../controllers/categoryService")
const router=express.Router()

router.get('/',getAllCategories) 
router.get('/:id',getCategoryById) 
router.put('/:id',updateCategory)
router.post('/',addNewCategory)
router.delete('/:id',deleteCategory)

module.exports=router;