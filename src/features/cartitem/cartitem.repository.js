import { getdb } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";

export default class CartItemRepository {
   constructor(){
     this.cartItemCollection='cartitems';
   }

   async addCartItem(newitem){
      try{
         const db=getdb();
         const collection=db.collection(this.cartItemCollection);
         const id=await this.NextCounter(db);
         //1. FIRST WAY TO ADD THE ITEM:-it is cheking if same user and prodid is in cart then it
              //it update(increment) the quantity,  and if not then just insert new one
         // const item=await collection.findOne({userId:new ObjectId(newitem.userId),prodId:new ObjectId(newitem.prodId)})
         // if(item){
         //    await collection.updateOne({userId:new ObjectId(newitem.userId),prodId:new ObjectId(newitem.prodId)},
         //    {$inc:{quantity:newitem.quantity}})
         // }else{
         //   await collection.insertOne(newitem);
         // }

         //2. SECOND WAY:- using upsert oprator
          await collection.updateOne({userId:new ObjectId(newitem.userId),prodId:new ObjectId(newitem.prodId)},
            {$setOnInsert:{_id:id},
            $inc:{quantity:newitem.quantity}},
            {upsert:true}
          )
      }catch(err){
         throw err;
      }
  }

  async getCart(userId){
     try{
        const db=getdb();
        const collection=db.collection(this.cartItemCollection);
        const cartitems=await collection.find({userId:new ObjectId(userId)}).toArray();
        return cartitems;
     }catch(err){
        throw err;
     }
}

   async deleteItem(prodId,userId){
      try{
         const db=getdb();
         const collection=db.collection(this.cartItemCollection);
         const result= await collection.deleteOne({prodId:new ObjectId(prodId),userId:new ObjectId(userId)});
         return result;
      }catch(err){
         throw err;
      }
    }

    async NextCounter(db){
      const resultDocument=await db.collection("counters").findOneAndUpdate(
         {_id:"cartItemid"},
         {$inc:{value:1}},
         {returnDocument:"after"}
      )
      console.log(resultDocument);
      return resultDocument.value;
    }
}