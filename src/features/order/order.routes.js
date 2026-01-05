import express from "express";
import OrderControler from "./order.controler.js";

const orderControler=new OrderControler();

const orderrouter=express.Router();

orderrouter.post('/',(req,res)=>{
    orderControler.placeOrder(req,res);
})




export default orderrouter;
