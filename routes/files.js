const express=require("express");
const router=express.Router();
const {uploadFile}=require("../controllers/file")
const { authenticate } = require("../middleware");
const upload=require("../middleware/upload")

router.post("/upload",authenticate,upload.single("image"),uploadFile);//here single is middle ware and image is the feild name 



module.exports=router;