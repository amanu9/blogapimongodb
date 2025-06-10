
const Category = require("../models/Category");
const User = require("../models/User");
const { param } = require("../routes/category");

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

const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { _id } = req.user;
        const { title, desc } = req.body;

        // Find the category to update
        const category = await Category.findById(id);

        if (!category) {
            res.code = 404;
            throw new Error("Resource not found");
        }

        // Check if another category with the same title already exists
        const isCategoryExist = await Category.findOne({ 
            title, 
            
        });
        
        if (isCategoryExist) {
            return res.status(400).json({ 
                error: "Category with this title already exists" 
            });
        }

       

        // Update the category
        category.title = title || category.title;
        category.desc = desc || category.desc;
        category.updatedBy = _id;
        
        await category.save();

        // Send response
        res.status(200).json({ 
            success: true,
            message: "Category updated successfully",
            data: category
        });
    }
    catch (error) {
        next(error);
    }
}
// delete category

const deleteCategory=async(req,res,next)=>{
try{
    const {id}=req.params
const category=await Category.findById(id);

  if (!category) {
            return res.status(400).json({ 
                error: "Category not exists" 
            });
        }
        await Category.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            message:"category deleted successfully"

        })
}

catch(error){
    next(error)
}

}

// get category with search 
const getCategory=async(req,res,next)=>{
try{
  
//const category=await Category.find({});//get all category
const {q}=req.query
let query={};
if(q){
  const search  =RegExp(q,"i")// i for insensative search with capital or samll 
  query={$or:[{title:search},{desc:search}]}// to search with title and descriptiion
}
const category=await Category.find();


  if (!category) {
            return res.status(400).json({ 
                error: "Category not exists" 
            });
        }
        res.status(200).json({
            success:true,
            message:"all category list success",
            data:{category}

        })
}

catch(error){
    next(error)
}

}

// get category with pagination and search
const getCategories = async (req, res, next) => {
  try {
    const { q, size, page } = req.query;
    let query = {};

    const sizeNumber = parseInt(size) || 6;
    const pageNumber = parseInt(page) || 1;

    if (q) {
      const search = RegExp(q, "i");

      query = { $or: [{ title: search }, { desc: search }] };
    }

    const total = await Category.countDocuments(query);
    const pages = Math.ceil(total / sizeNumber);

    const categories = await Category.find(query)
      .skip((pageNumber - 1) * sizeNumber)
      .limit(sizeNumber)
      .sort({ _id: -1 });

    res.status(200).json({
      code: 200,
      status: true,
      message: "Get category list successfully",
      data: { categories, total, pages },
    });
  } catch (error) {
    next(error);
  }
};
// getting unique category 
const getCategoryDetail=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const category=await Category.findById(id)
        if(!category){
            return res.status(400).json({ 
                error: "Category not exists" 
            }); 
        }
        res.status(200).json({
            success:true,
            message:"catagory get successfully",
            data:{category}
        })

    }
    catch(error){
        next(error)
    }

}
module.exports={addCategory,updateCategory,deleteCategory,getCategory,getCategories,getCategoryDetail};