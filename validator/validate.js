
// this function was to show the all validation at once rather than one by one in my response body post man
const { validationResult } = require("express-validator");

const validate=(req,res,next)=>{
    const errors=validationResult(req)
    console.log(errors);
    const mapedErrors={}
  if(Object.keys(errors.errors).length===0){
next();
  }else{
errors.errors.map((eror)=>{
mapedErrors[eror.path]=eror.msg
})
res.status(400).json(mapedErrors)
  }
}
module.exports=validate;