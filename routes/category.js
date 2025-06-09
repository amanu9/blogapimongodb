const express=require("express");
const router=express.Router();
const {addCategory}=require("../controllers/category")// call the exct name of the controller to avoid import error
 const {addcategoryValidator}=require("../validator/category");
const validate=require("../validator/validate");
const { authenticate } = require("../middleware"); // to make it protected route using middleware
const isAdmin=require("../middleware/isAdmin");// to check the role who can add the post 


//router.post("/",authenticate,isAdmin,addcategoryValidator,validate,addCategory);//consider the order of your middle ware firs authenticated then isadmin middle 
router.post("/", addcategoryValidator, validate, authenticate, isAdmin, addCategory);

module.exports=router;// exporting the route