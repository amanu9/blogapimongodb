

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: Number, default: 3 }, // Fixed: Number instead of number
    verificationCode:String,// to use for email verification
    isVerified:{type:Boolean,default:false},//check the user email
    forgotPasswordCodeUser:String// for password reset
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema); // Direct export