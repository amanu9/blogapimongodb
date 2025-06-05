const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");// express validator package
const generateToken=require("../utl/generateToken");// importing token
const generateCode=require("../utl/generateCode");
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
    delete userResponse.password;// removing password from response for security purpose

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
const verifycode = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }
    
    if (user.isVerified) {
      return res.status(400).json({ 
        success: false, 
        message: "User already verified" 
      });
    }

    const code = generateCode(6);
    user.verificationCode = code;
    await user.save();
    
    await sendEmail({
      emailTo: user.email,
      subject: "Email verification code",
      code,
      content: "Verify your account"
    });

    res.status(200).json({ 
      success: true, 
      message: "Verification code sent successfully" 
    });

  } catch (error) {
    next(error);
  }
};

// verify user

const verifyUser=async(req,res,next)=>{
  try{

    const {email,code}=req.body;
    const user= await User.findOne({email})

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }
    if (user.verificationCode!==code) {
      return res.status(404).json({ 
        success: false, 
        message: "Invalid code" 
      });
    }
    user.isVerified=true;// change the false status to true
    user.verificationCode=null// no needed the code again it reset the code to null because we dont need now since we verfied
    await user.save();
    res.status(200).json({ 
        success: true, 
        message: "user verified successfully" 
      });
    }

  
  catch(error){
    next(error)

  }
}

// forgot password

const forgotPasswordCode=async(req,res,next)=>{
  try{

    const {email}=req.body;
    const user= await User.findOne({email})

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }
  
  const code=generateCode(6)// generating 6 digit code
  user.forgotPasswordCodeUser=code// compar
  user.save();// save to db

  // then caal send email function

  await sendEmail({
    emailTo:user.email,
    code, 
    content:"use below code to change your password",
    subject:"Password Reset"
  });
  
    res.status(200).json({ 
        success: true, 
        message: "Password reset code sent successfully" 
      });
    }

  
  catch(error){
    next(error)

  }
}


// recover password

const recoverPassword=async(req,res,next)=>{
  try{
    const {email,code,password}=req.body;

 const user= await User.findOne({email})

 // check user first by email 
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }
     if (user.forgotPasswordCodeUser!==code) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid code" 
      });
    }
      // 3. Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        user.password=hashedPassword;
        user.forgotPasswordCodeUser=null;
        user.save();
        res.status(200).json({ 
        success: true, 
        message: "Password reset  successfully" ,
      });
    }
  

  catch(erorr){
    next(erorr)
  }
}
//password reset with user token 
// Change password (requires valid JWT)
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id; // From JWT middleware

    // 1. Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // 2. Verify current password against stored hash
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect"
      });
    }

    // 3. Hash and save new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    // 4. Respond with success
    res.status(200).json({
      success: true,
      message: "Password updated successfully"
    });

  } catch (error) {
    next(error);
  }
};

// exporting all module
module.exports = {
    signup,
    sinin,
    verifycode,
    verifyUser,
    forgotPasswordCode,
    recoverPassword,
    changePassword
};