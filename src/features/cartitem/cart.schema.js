import mongoose from "mongoose";

export const cartSchema=new mongoose.Schema({
    // here we have to give reference also i.e form which collection this userId and prodId comes from
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    prodId:{type:mongoose.Schema.Types.ObjectId,ref:"products"},
    quantity:Number
})