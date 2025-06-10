const { check,param} = require("express-validator");
const mongoose=require("mongoose");

const addcategoryValidator = [
    check("title").notEmpty().withMessage("title is required"),
    check("desc").optional() // if description is optional
];


const idValidator = [
    param("id").custom(async (id) => {
        if (id && !mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid category id");
        }
        return true;
    })
];

module.exports = { addcategoryValidator,idValidator };