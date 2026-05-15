import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

const UserModel = mongoose.model("users", userSchema);

export default class userRepository {
    async SignUp(user) {
        try {
            const newUser = new UserModel(user);
            await newUser.save();
            return newUser;
        } catch (err) {
                throw err;
        }
    }
    // async SignIn(email,password){
    //     try{
    //       return await UserModel.findOne({email,password});
    //     }catch(err){
    //         console.log(err);
    //     }
    // }

    async findbyEmail(email){
        try{
        return await UserModel.findOne({email});
        }catch(err){
            console.log(err);
        }
    }

    async resetPassword(userId,hashPssword){
        try{
          const user=await UserModel.findById(userId);
          if(user){
            user.password=hashPssword;
            user.save();
          }else{
            throw new Error("user is not found");
          }
        }catch(err){
            throw err;
        }
    }
}