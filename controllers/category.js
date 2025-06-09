
const Category = require("../models/Category"); // Ensure correct path
const User = require("../models/User"); // Ensure User model is also imported
const addCategory=async(req,res,next)=>{
    try{
const {title,desc}=req.body;
const {_id}=req.user;

const iscategoryExist=await Category.findOne({title});
if(iscategoryExist){
     
            return res.status(400).json({ 
                error: "category already exist " 
            });
        

}

const user=User.findById(_id)// getting user
//checking user
if(!user){
     
            return res.status(400).json({ 
                error: "user not found" 
            });
        

}
const newCategory=new Category({title,desc,updatedBy:_id})
await newCategory.save();

// sending response
 res.status(201).json({ 
            success: true,
            message: "category created successfully",
            data: newCategory// return addedd category in response 
        });
    }
    catch(error){
        next(error);
    }
}

module.exports={addCategory};