import { ObjectId } from "mongodb";
import { getdb } from "../../config/mongodb.js";
import mongoose from "mongoose";
import { reviewSchema } from "./review.schema.js";
import { productSchema } from "./product.schema.js";
import { categorySchema } from "./category.schema.js";
import redisClient from "../../config/redis.js";

const productModel = new mongoose.model('product', productSchema);
const reviewModel = new mongoose.model('review', reviewSchema);
const categoryModal = new mongoose.model("category", categorySchema);

class ProductRepository {
   async addProduct(newProduct) {
      // const db=getdb();
      // const collection=db.collection('products');
      // return await collection.insertOne(newProduct);

      const categoryIds = [];
      newProduct.categories=newProduct.categories.split(",").map(e=> e.trim());
      // Loop over category names
      for (const catName of newProduct.categories) {

         let category = await categoryModal.findOne({
            category: catName
         });

         // Create category if not exists
         if (!category) {
            category = await categoryModal.create({
               category: catName,
               products: []
            });
         }

         categoryIds.push(category._id);
      }

      // Replace string categories with ObjectIds
      newProduct.categories = categoryIds;

      // Create product
      const product = new productModel(newProduct);
      await product.save();

      // Push productId into ALL categories
      await categoryModal.updateMany(
         { _id: { $in: categoryIds } },
         { $addToSet: { products: product._id } }
      );

      return product;
   }

   async getAllProducts() {
      try{
         //get data from redis
         const cached=await redisClient.get("products:all");
         //checking if redis have data or not
         if(cached){
            console.log("data from redis");
            return JSON.parse(cached);
         }
         //fetching data from mongodb
         const products=await productModel.find();
         //store data in redis
         await redisClient.set(
            "products:all",
            JSON.stringify(products),
            {
               expiration:{
                  type:"EX",
                  value:3600
               }
            }
         );
         return products;
      }catch(err){
         throw err;
      }
   }

   async getOneProduct(id) {
      const cached=await redisClient.get(`product:${id}`);
      if(cached){
         console.log("data from redis");
         return JSON.parse(cached);
      }
      const product=await productModel.findOne({_id:new ObjectId(id)});
      await redisClient.set(
         `product:${id}`,
         JSON.stringify(product),
         {
            expiration:{
               type:"EX",
               value:3600
            }
         }
      )
      return product;
   }

   async filterProducts(minPrice, category) {
      const db = getdb();
      const collection = db.collection('products');
      let query = {};
      if (minPrice !== undefined || maxPrice !== undefined) {
         if (minPrice !== undefined) {
            query.price = { $gte: Number(minPrice) };
         }
         // if(maxPrice !== undefined){
         //    query.price={$lte:Number(maxPrice)};
         // }
      }
      //when u pass the multiple category in query parameter in postman like this
      //category=['first','second'] then mongodb understand it like normal string so
      //we have to replace all single qotes to double qoutes and then parse it 
      category = JSON.parse(category.replace(/'/g, '"'));
      if (category !== undefined) {
         //$in operator consider the all parameter that u provide
         query = { $or: [{ category: { $in: category } }, query] }
      }
      //name:1 here 1 denotes inclusion mtlb isko dikhana hai and 0 means isko nahi dikhana hai
      //$slice is used to let say u have an array of ratings and u want to only show the first
      //two or last two or any number of ratings here 1 means show the first one ratings 
      //if i use $slice:-1 or -2 then it means last one or two ratings
      return await collection.find(query).project({ name: 1, price: 1, _id: 0, ratings: { $slice: 1 } }).toArray();
   }

   // **** FIRST WAY OF RATING A PRODUCT ****

   //    async rateProduct(userId,prodId,rating){
   //    try{
   //       const db=getdb();
   //       const collection=db.collection('products');
   //       //1. find the product
   //       const product= await collection.findOne({_id:new ObjectId(prodId),"ratings.userId":userId});
   //       //2. find the rating
   //       const userratings=product?.ratings?.find(r=>r.userId===userId);
   //       if(userratings){
   //          //3.update the rating
   //          await collection.updateOne(
   //             {_id:new ObjectId(prodId),"ratings.userId":userId},
   //             {$set:{"ratings.$.rating":rating}}
   //          );
   //       }else{
   //           await collection.updateOne(
   //          {_id:new ObjectId(prodId)},
   //          {
   //             $push:{
   //                ratings:{
   //                   userId:userId,
   //                   rating:rating
   //                }
   //             }
   //          }
   //         )
   //       }
   //    }catch(err){
   //    throw err;
   // }
   // }

   //   **** SECOND WAY OF RATING A PRODUCT ****
   //        async rateProduct(userId,prodId,rating){
   //    try{
   //       const db=getdb();
   //       const collection=db.collection('products');
   //       //1. removing existing rating if any
   //          await collection.updateOne(
   //          {_id:new ObjectId(prodId)},
   //          {
   //             $pull:{ratings:{userId:new ObjectId(userId)}}
   //          }
   //         )
   //         //2. add new rating
   //          await collection.updateOne(
   //          {_id:new ObjectId(prodId)},
   //          {
   //             $push:{
   //                ratings:{
   //                   userId:new ObjectId(userId),
   //                   rating:rating
   //                }
   //             }
   //          }
   //         )
   //    }catch(err){
   //    throw err;
   // }
   // }

   //   **** THIRD WAY OF RATING A PRODUCT(i.e using mongoose) ****

   async rateProduct(userId, prodId, rating) {
      try {
         const product = await productModel.findById(prodId);
         if (!product) {
            throw new Error("product not found");
         }
         const userReview = await reviewModel.findOne({ prodId: new ObjectId(prodId), userId: new ObjectId(userId) });
         if (userReview) {
            userReview.rating = rating;
            await userReview.save();
         } else {
            const newReview = new reviewModel(
               {
                  prodId: new ObjectId(prodId),
                  userId: new ObjectId(userId),
                  rating: rating
               }
            )
            await newReview.save();
         }
      } catch (err) {
         throw err;
      }
   }

   async calAvgPricePerCategory() {
      try {
         const db = getdb();
         const collection = db.collection("products");
         return await collection.aggregate(
            [
               //stage1
               {
                  $group: { _id: "$category", averagePrice: { $avg: "$price" } }
               }
            ]
         ).toArray();
      } catch (err) {
         throw err;
      }
   }

   async updateProduct(id,UpdatedData){
      try{
        return await productModel.findByIdAndUpdate(
          id,
          UpdatedData
        );
      }catch(err){
         throw err;
      }
   }
}

export default ProductRepository;