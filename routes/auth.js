

const express = require("express");
const router = express.Router();
const { signup,sinin,verifycode,verifyUser} = require("../controllers/auth"); // Directly import signup
const {signUpvalidator,signinValidator,emailvalidator,verifyUserValidator}=require("../validator/auth");// validation calling
const validate=require("../validator/validate");

router.post("/signup",signUpvalidator,validate, signup); // Pass the function reference, not call it and route level validator with signUpvalidator  means signUpvalidator affected only with this route
// validate must pass after signUpvalidator

router.post("/signin",signinValidator,validate,sinin);//sign in route with validator and controller 
router.post("/send-verification-email",emailvalidator,validate,verifycode);//email verification
router.post("/verify-user",verifyUserValidator,validate,verifyUser);// verfiying user
module.exports = router;



