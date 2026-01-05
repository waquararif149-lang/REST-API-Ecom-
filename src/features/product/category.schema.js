import mongoose from "mongoose";

export const categorySchema=mongoose.Schema({
    category:{type:String},
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"product"
        }
    ]
})