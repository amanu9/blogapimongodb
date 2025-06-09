const mongoose=require("mongoose");


const categoryShcema=mongoose.Schema({
    title:{type:String,required:true},
    desc:String,
    updatedBy:{type:mongoose.Types.ObjectId,ref: "User",required:true} // reference to user model reference



}, { timestamps: true });

module.exports = mongoose.model("category", categoryShcema); // Direct export