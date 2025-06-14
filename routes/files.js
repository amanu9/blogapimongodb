const express=require("express");
const router=express.Router();
const {uploadFile}=require("../controllers/file")
const { authenticate } = require("../middleware");
const upload=require("../middleware/upload")

//upload.array("images", 10) //   to limit the Maximum 10 files if we need like this
router.post("/upload",authenticate,upload.single("image"),uploadFile);//here single is middle to upload single file ware and image is the feild name to make it multiplr
// change the single to array 
//router.post("/upload",authenticate,upload.array("image"),uploadFile);//for multiple file use array instead of single



module.exports=router;