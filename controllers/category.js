
const Category = require("../models/Category");
const User = require("../models/User");

const addCategory = async (req, res, next) => {
    try {
        const { title, desc } = req.body;
        const { _id } = req.user; // Extracted from authenticated user

        // 1. Check if category already exists
        const categoryExists = await Category.findOne({ title });
        if (categoryExists) {
            return res.status(400).json({
                success: false,
                message: "Category already exists"
            });
        }

        // 2. Verify user exists (MUST use await here)
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // 3. Create and save new category
        const newCategory = new Category({
            title,
            desc,
            updatedBy: _id
        });

        await newCategory.save();

        // 4. Successful response
        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: newCategory// to return the created category if you need
        });
    } catch (error) {
        next(error); // Pass to error handler middleware
    }
};
// update category controller 

const updateCategory=async(req,res,next)=>{
    try{
const {id}=req.params;
const {_id}=req.user;
const {title,desc}=req.body;

const category =await Category.findById(id)

if(!category){
    res.code=404;
    throw new Error("resource not found");
}

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
module.exports={addCategory,updateCategory};