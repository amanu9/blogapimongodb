const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");// express validator package
const generateToken=require("../utl/generateToken");// importing token
const generateCode=require("../utl/generateCode");
const sendemail=require("../utl/sendEmail");
const sendEmail = require("../utl/sendEmail");

const signup = async (req, res, next) => {
   
    try {
      const { name, email, password, role } = req.body;
    
        // 1. Validate input at once this wiil handle all input for my validationrather than using the below can use this
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }
        
        

//         if (!name) {
//             const error = new Error("Name is required");
//             error.statusCode = 400;// 400 means client side erorr
//             throw error;
//         }

//         if (!email) {
//             const error = new Error("Email is required");
//             error.statusCode = 400;
//             throw error;
//         }
//         if (!password) {
//             const error = new Error("password is required");
//             error.statusCode = 400;
//             throw error;
//         }
//  if (password.length<6) {
//             const error = new Error("password is too short");
//             error.statusCode = 400;
//             throw error;
//         }
        
        // 2. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                error: "Email already in use" 
            });
        }

        // 3. Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 4. Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 3 // Default to regular user (3) if not specified
        });

       
        const userResponse = { ...newUser.toObject() };

        delete userResponse.password;  //  Remove password from response for security

        // 6. Send success response
        res.status(201).json({ 
            success: true,
            message: "User created successfully",
            user: userResponse
        });

    } catch (error) {
        // Handle specific errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                success: false,
                error: error.message 
            });
        }
        
        // Pass other errors to error handling middleware
        next(error);
    }
    
};

// signin controller
const sinin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401; // Unauthorized
      throw error;
    }

    // 2. Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }
    const token=generateToken(user)

    // 3. Prepare user response (without password)
    const userResponse = { ...user.toObject() };
    delete userResponse.password;

    // 4. Send success response
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userResponse,
      data:{token}
    });

  } catch (error) {
    next(error);
  }
};

// send email verification code controller

const verifycode= async(req,res,next)=>{
try{
  const {email}=req.body;
    const user = await User.findOne({ email });
    if(!user){
      res.status=404;
      throw new Error("User not found");
    }
    if(user.isVerified){
      res.status=404;
      throw new Error("user already verified");
    }

const code=generateCode(6);
user.verificationCode=code;
await user.save();
await sendEmail({
  emailTo:user.email,
  subject:"Email verification code",
  code,
  content:"verify user account"

})
}catch(error){
  next(error)
}
}

module.exports = {
    signup,
    sinin,
    verifycode
};