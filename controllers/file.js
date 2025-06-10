const uploadFile=(req,res,next)=>{
try{
 res.status(200).json({
            success:true,
            message:"file uploaded successfully",
            
        })
}
catch(error){
    next(error)
}
}


module.exports={uploadFile}