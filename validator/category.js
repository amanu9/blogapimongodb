const { check } = require("express-validator");

const addcategoryValidator = [
    check("title").notEmpty().withMessage("title is required"),
    check("desc").optional() // if description is optional
];

module.exports = { addcategoryValidator };