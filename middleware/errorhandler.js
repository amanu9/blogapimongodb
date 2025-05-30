const errorHandler=(error,res,req,next)=>{

const code=res.code? res.code:500;

res,status(code).json({code,status:false,message:error.message,stack:error.stack})// but not use stack for production
}
module.exports=errorHandler;