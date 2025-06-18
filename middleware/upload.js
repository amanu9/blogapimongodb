const multer = require("multer");
const path = require("path");
const File = require("../models/File"); // Make sure you have this model import

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        try {
            const originalName = file.originalname;
            const extension = path.extname(originalName);
            const baseName = path.basename(originalName, extension);
            
            const processedName = baseName.replace(/\s+/g, '_')
                                        .toLowerCase()
                                        + '_' + Date.now() 
                                        + extension;

            cb(null, processedName);
        } catch (err) {
            cb(err);
        }
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['.jpg', '.jpeg', '.png', '.gif','.pdf'];
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (allowedTypes.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error(`Unsupported file type. Only ${allowedTypes.join(', ')} are allowed.`), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

// Middleware to save file info to database
const saveToDb = async (req, res, next) => {
    if (!req.file) {
        return next();
    }

    try {
        const file = new File({
            filename: req.file.filename,
            originalName: req.file.originalname,
            path: req.file.path,
            size: req.file.size,
            mimetype: req.file.mimetype,
            createdBy: req.user._id // Using the authenticated user
        });

        await file.save();
        req.file._id = file._id; // Attach MongoDB ID to the file object
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    upload,
    saveToDb
};