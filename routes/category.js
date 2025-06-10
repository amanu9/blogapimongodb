const express=require("express");
const router=express.Router();
const {addCategory,updateCategory,deleteCategory}=require("../controllers/category")// call the exct name of the controller to avoid import error
 const {addcategoryValidator,idValidator}=require("../validator/category");
const validate=require("../validator/validate");
const { authenticate } = require("../middleware"); // to make it protected route using middleware
const isAdmin=require("../middleware/isAdmin");// to check the role who can add the post 


//router.post("/",authenticate,isAdmin,addcategoryValidator,validate,addCategory);//consider the order of your middle ware firs authenticated then isadmin middle 
router.post("/add", addcategoryValidator, validate, authenticate, isAdmin, addCategory);// add category
router.put("/update/:id", authenticate, isAdmin,idValidator,validate, updateCategory);// update category
router.delete("/:id", authenticate, isAdmin,idValidator,validate, deleteCategory);

module.exports=router;// exporting the route