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

       try{
         await this.likeRepository.likeItem(userId,id,type);
         res.status(200).send(`${type} is liked`);
       }catch(err){
        throw err;
       }

    //    if(type=="product"){
    //     try{
    //         await this.likeRepository.likeProduct(userId,id);
    //       res.status(200).send("product is liked")
    //     }catch(err){
    //         res.status(400).send(err.message)
    //     }
    //    }else{
    //     try{
    //       await this.likeRepository.likeCategory(userId,id);
    //       res.status(200).send("category is liked")
    //     }catch(err){
    //       res.status(400).send(err.message);
    //     }
    //    }
    }

    async getLikes(req,res){
        try{
          const {userId}=req.body;
          const likes=await this.likeRepository.getLikes(userId);
          return res.status(200).send(likes);
        }catch(err){
            throw err;
        }
    }
}