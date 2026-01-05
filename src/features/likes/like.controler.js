import LikeRepository from "./like.repository.js";


export default class LikeControler{
    constructor(){
        this.likeRepository=new LikeRepository();
    }

    async likeItem(req,res){
       const userId=req.userId;
       const{id,type}=req.body;
       if(type!="product" && type!="category"){
        res.status(400).send("invalid type");
       }
       if(type=="product"){
        try{
            await this.likeRepository.likeProduct(userId,id);
          res.status(200).send("product is liked")
        }catch(err){
            res.status(400).send(err.message)
        }
       }else{
        try{
          await this.likeRepository.likeCategory(userId,id);
          res.status(200).send("category is liked")
        }catch(err){
          res.status(400).send(err.message);
        }
       }
    }

    async getLikes(req,res){
        try{
          
        }catch(err){
            throw err;
        }
    }
}