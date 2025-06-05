

const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware"); // Import from middleware for autheticate user for password reset based on token
const { signup,sinin,verifycode,verifyUser,forgotPasswordCode,recoverPassword,changePassword,updateProfile} = require("../controllers/auth"); // Directly import signup
const {signUpvalidator,signinValidator,emailvalidator,verifyUserValidator,resetPasswordValidator,changePasswordValidator}=require("../validator/auth");// validation calling
const validate=require("../validator/validate");

router.post("/signup",signUpvalidator,validate, signup); // Pass the function reference, not call it and route level validator with signUpvalidator  means signUpvalidator affected only with this route
// validate must pass after signUpvalidator

router.post("/signin",signinValidator,validate,sinin);//sign in route with validator and controller 
router.post("/send-verification-email",emailvalidator,validate,verifycode);//email verification
router.post("/verify-user",verifyUserValidator,validate,verifyUser);// verfiying user
router.post("/forgot-password-code",emailvalidator,validate,forgotPasswordCode);// forgot password routes
router.post("/reset-password",resetPasswordValidator,validate,recoverPassword);// password reset without token if we need that logic
router.put("/change-password", authenticate, changePasswordValidator, validate, changePassword);// password reset with token
router.put("/update-profile", authenticate,validate, updateProfile);// profile update

module.exports = router;



