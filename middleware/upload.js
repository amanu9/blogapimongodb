const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");  // Files will be saved in 'uploads' directory
    },
    filename: (req, file, cb) => {
        try {
            const originalName = file.originalname;
            const extension = path.extname(originalName);  // Get file extension (.jpg, .png etc)
            const baseName = path.basename(originalName, extension);  // Get filename without extension
            
            // Process filename:
            // 1. Replace spaces with underscores
            // 2. Convert to lowercase
            // 3. Add timestamp to prevent duplicates
            const processedName = baseName.replace(/\s+/g, '_')
                                        .toLowerCase()  // Fixed typo: toLocalLowerCase → toLowerCase
                                        + '_' + Date.now() 
                                        + extension;

            cb(null, processedName);  // Final filename format: original_name_1234567890.jpg
        } catch (err) {
            cb(err);  // Handle any errors in filename processing
        }
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['.jpg', '.jpeg', '.png', '.gif','.pdf'];
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (allowedTypes.includes(ext)) {
        cb(null, true);  // Accept the file
    } else {
        cb(new Error(`Unsupported file type. Only ${allowedTypes.join(', ')} are allowed.`), false);
    }
};

const amanupload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024  // Limit file size to 5MB
    }
});

module.exports = amanupload;