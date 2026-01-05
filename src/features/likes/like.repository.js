import mongoose from "mongoose"
import { LikeSchema } from "./like.schema.js"
import { ObjectId } from "mongodb"

const LikeModel = mongoose.model("like", LikeSchema)
export default class LikeRepository {

    async likeProduct(userId, prodId) {
        try {
            console.log(prodId)
            const user = await LikeModel.findOne({
                user: userId,
                likeble: prodId,
                types: "product"
            });
            if (user) {
                throw new Error("product is already liked");
            }
            const newlike = new LikeModel({
                user: new ObjectId(userId),
                likeble: new ObjectId(prodId),
                types: "product"
            })
            await newlike.save();
        } catch (err) {
            throw err;
        }
    }

    async likeCategory(userId, catId) {
        try {
            const user = await LikeModel.findOne({
                user: userId,
                likeble: catId,
                types: "category"
            });
            if (user) {
                throw new Error("category is already liked");
            }
            const newlike = new LikeModel({
                user: new ObjectId(userId),
                likeble: new ObjectId(catId),
                types: "category"
            })
            await newlike.save();
        } catch (err) {
            throw err;
        }
    }

    async getLikes(userId){
        
    }
}