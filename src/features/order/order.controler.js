import OrderRepository from "./order.repository.js";


export default class OrderControler{
    constructor(){
        this.orderRepository=new OrderRepository();
    }

    async placeOrder(req,res){
        try{
        const userId=req.userId;
        await this.orderRepository.PlaceOrder(userId);
        res.status(201).send("order created successfully");
        }catch(err){
          res.status(500).send({message:"internal server error",error:err.message});
        }
    }
}