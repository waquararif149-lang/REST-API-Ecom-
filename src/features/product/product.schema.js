import mongoose from "mongoose";

export const productSchema=new mongoose.Schema({
    name:String,
    desc:String,
    price:Number,
    imageUrl:String,
    category:String,
    size:{type:[String]},
    stock:Number,
    reviews:[
        {
            type:mongoose.Types.ObjectId,ref:'Review',
        }
    ],
    categories:[
        {
            type:mongoose.Schema.Types.ObjectId,ref:'category',
        }
    ]
})