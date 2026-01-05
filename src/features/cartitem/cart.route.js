import express from "express";
import CartControler from "./cart.controler.js";
import jwtAuth from "../../middleware/jwt.middleware.js";

const cartrouter = express.Router();
const cartControler = new CartControler();
cartrouter.post("/",(req,res)=>cartControler.addtocart(req,res));
// protect get cart so req.userId is available from jwt middleware
cartrouter.get("/",(req,res)=>cartControler.getcart(req,res));
cartrouter.delete("/delete",(req,res)=>cartControler.deleteItem(req,res));

export default cartrouter;
