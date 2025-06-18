const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    mimetype: { type: String, required: true },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("File", FileSchema);