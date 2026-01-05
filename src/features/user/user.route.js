import express from "express";
import UserControler from "./user.controler.js";
import jwtAuth from "../../middleware/jwt.middleware.js";
const userRouter=express.Router();

const  userControler=new UserControler();
// userRouter.post('/signup',userControler.SignUp);
// userRouter.post('/signin',userControler.SingIn);

userRouter.post('/signup',(req,res,next)=>{
    userControler.SignUp(req,res,next);
});

userRouter.post('/signin',(req,res)=>{
    userControler.SingIn(req,res);
});

userRouter.put('/resetPassword',jwtAuth,(req,res)=>{
    userControler.resetPassword(req,res);
})


export default userRouter;