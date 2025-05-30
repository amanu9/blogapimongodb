

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: Number, default: 3 }, // Fixed: Number instead of number
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema); // Direct export