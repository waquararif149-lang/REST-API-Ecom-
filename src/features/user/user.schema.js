import mongoose from "mongoose";

export const userSchema=new mongoose.Schema({
   name:String,
   email:{type:String,unique:true,
      match:[/.+@.+\../,"plzz enter valid email"]
   },
   password:{type:String,
   //    validate:{
   //       validator:function(value){
   //          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
   //       },
   //       message:"password should be below 8-12 char and it contains a special char"
   //    }
   // },
   },
   type:{type:String,enum:["customer","seller"]}
});