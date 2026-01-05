import mongoose from "mongoose";
import dotenv from "dotenv";
import { categorySchema } from "../features/product/category.schema.js";
dotenv.config();

const url=process.env.DB_URL;

export const conectToMongoose=async ()=>{
    try{
    await mongoose.connect(url);
    console.log("mongodb is conected using mongoose");
    addCategories();
   }catch(err){
    console.log(err);
   }
}

const addCategories=async()=>{
    const categoryModal=mongoose.model("category",categorySchema);
    const category=await categoryModal.find();
    if(!category || category.length==0){
        await categoryModal.insertMany([{category:"clothing"},{category:"electronics"},{category:"accesories"}]);
        console.log("category added");
    }
}