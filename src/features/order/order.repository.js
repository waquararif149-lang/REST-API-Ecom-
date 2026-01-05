import { getdb } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
import OrderModal from "./order.modal.js";
import { getClient } from "../../config/mongodb.js";

export default class OrderRepository{
    constructor(){
        this.collection="orders";
    }

    async PlaceOrder(userId){
       const client=getClient();
       const session=client.startSession();
       session.startTransaction();

    try{
      //1. get the cartitem and calculate totalamount
      const items=await this.getCartitemAndCalTotalAmount(userId,session);
      const totalAmount=items.reduce((acc,item)=>acc+item.totalAmount,0);
        console.log(totalAmount);

      //2. create order record
       const db=getdb();
       const order=new OrderModal(new ObjectId(userId),totalAmount,items.prodId);
       await db.collection(this.collection).insertOne(order,{session});
      //3. reduce the stock 
      // {here stock means total no. of a specific products is available in products
      // collection. in products collection stock field is created using comand line}
      for(let item of items){
        await db.collection("products").updateOne(
          {_id:item.prodId},
          {$inc:{stock:-item.quantity},},
          {session}
        )
      }
      //4. clear cartitem
      await db.collection("cartitems").deleteMany({userId:new ObjectId(userId)},{session})
      session.commitTransaction();
      session.endSession();
    }
      catch(err){
        session.abortTransaction();
        session.endSession();
        throw err;
      }
    }

    async getCartitemAndCalTotalAmount(userId,session){
        const db=getdb();
       return await db.collection("cartitems").aggregate([
          //1. get cartitems for this userId
          {
            $match:{userId:new ObjectId(userId)}
          },
          //2.get the products from products collection
          {
            $lookup:{
                from:"products",
                localField:"prodId",
                foreignField:"_id",
                as:"productInfo"
            }
          },
          //3.unwind the productInfo
          {
            $unwind:"$productInfo"
          },
          //4.calculate totalamount for each cartitems
          {
            $addFields:{
                "totalAmount":{
                    $multiply:["$productInfo.price","$quantity"]
                }
            }
          }
        ],{session}).toArray();
    }
}