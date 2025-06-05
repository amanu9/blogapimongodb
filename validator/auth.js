const {check}=require("express-validator");// link js express validator here and store in variable check
const validateEmail=require("./validateemail");// importing email validator
// sign up validator
const signUpvalidator=[
    check("name").notEmpty().withMessage("name required"),
    check("email").notEmpty().withMessage("email is required").isEmail().withMessage("invalid email"),
    check("password").isLength({min:6}).withMessage("password is too short").notEmpty().withMessage("password is required"),
]

// signin validator
const signinValidator=[
    check("email").isEmail().withMessage("Invalid email").notEmpty().withMessage("Email is required"),
    check("password").notEmpty().withMessage("password is required")
]

// emailvalidator
const emailvalidator=[
    check("email").isEmail().withMessage("Invalid Email").notEmpty().withMessage("email is required")

]

// validator for user
const verifyUserValidator=[
    check("email").isEmail().withMessage("Invalid email").notEmpty().withMessage("Email is required"),
    check("code").notEmpty().withMessage("code is required")
]

// validator for user
const resetPasswordValidator=[
    check("email").isEmail().withMessage("Invalid email").notEmpty().withMessage("Email is required"),
    check("code").notEmpty().withMessage("code is required"),
   check("password").isLength({min:6}).withMessage("password is too short").notEmpty().withMessage("password is required"),
]

const changePasswordValidator = [
  check("currentPassword").notEmpty().withMessage("Current password is required"),
  check("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .notEmpty()
    .withMessage("New password is required")
];

const updateprofileValidator = [
  check("email").custom(async(email)=>{
    if(email){

        const isValidEmail=validateEmail(email);

        if(!isValidEmail){
            throw "Invalid Email"
        }

    }
  }),
  check("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .notEmpty()
    .withMessage("New password is required")
];

module.exports={signUpvalidator,signinValidator,emailvalidator,verifyUserValidator,resetPasswordValidator,changePasswordValidator,updateprofileValidator}