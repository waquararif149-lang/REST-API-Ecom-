import  express from "express"
import LikeControler from "./like.controler.js";

const likeRouter=express.Router();
const likeControler=new LikeControler();

likeRouter.post('/',(req,res)=>{
    likeControler.likeItem(req,res);
})

likeRouter.get('/getlike',(req,res)=>{
    likeControler.getLikes(req,res);
})

export default likeRouter;