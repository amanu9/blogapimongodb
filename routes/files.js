const express = require("express");
const router = express.Router();
const { uploadFile } = require("../controllers/file");
const { authenticate } = require("../middleware");
const { upload, saveToDb } = require("../middleware/upload");

router.post(
    "/upload",
    authenticate,
    upload.single("image"),
    saveToDb,
    uploadFile
);

module.exports = router;