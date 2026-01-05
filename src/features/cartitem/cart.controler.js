import CartModel from "./cart.model.js";
import CartItemRepository from "./cartitem.repository.js";
import { ObjectId } from "mongodb";

export default class CartControler {
   constructor(){
    this.cartRepository=new CartItemRepository();
   }

  async addtocart(req, res) {
    try{
       const { quantity,prodId } = req.body;
      const userId = req.userId;
      const item= new CartModel(new ObjectId(userId),new ObjectId(prodId), quantity);
      await this.cartRepository.addCartItem(item);
      res.status(200).send(`item added to cart`);
    }
    catch(err){
       res.status(500).send({message:"internal server error",error:err.message});
    }
  }

  async getcart(req, res) {
    try{
    const cart = await this.cartRepository.getCart(req.userId);
      res.status(200).send(cart);
    }catch(err){
      throw err;
    }
  }

  async deleteItem(req, res) {
    try{
    const {prodId} = req.query;
   const result= await this.cartRepository.deleteItem(prodId,req.userId);
   if(result.deletedCount===0){
     return res.status(404).send('item not found');
   }
      res.status(200).send('item removed');
    }catch(err){
      throw err;
    }
  }
}
