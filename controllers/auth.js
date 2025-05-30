const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const signup = async (req, res, next) => {
   
    try {
    
        // 1. Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, role } = req.body;
        
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
     throw new Error("aman eroro");
};

module.exports = {
    signup
};