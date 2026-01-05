import mongoose from "mongoose";

export const reviewSchema=new mongoose.Schema({
   prodId:{
    type:mongoose.Types.ObjectId,ref:'product'
   },
   userId:{type:mongoose.Types.ObjectId,ref:'user'},
   rating:Number
})