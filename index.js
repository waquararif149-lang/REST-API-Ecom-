import "./env.js";
import express from "express";
import bodyParser from "body-parser";
import swagger from "swagger-ui-express";
import fs from "fs";
import path from "path";
import cors from "cors";
import ProductRouter from "./src/features/product/product.routes.js";
import cartrouter from "./src/features/cartitem/cart.route.js";
import userRouter from "./src/features/user/user.route.js";
import jwtAuth from "./src/middleware/jwt.middleware.js";
import logmiddleware from "./src/middleware/logger.middleware.js";
import ApplicationError from "./errorHandler/errorhandler.js";
import {connectMongoDB} from "./src/config/mongodb.js";
import {conectToMongoose} from "./src/config/mongoose.js";
import orderrouter from "./src/features/order/order.routes.js";
import likeRouter from "./src/features/likes/like.route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import redisClient from "./src/config/redis.js";

dotenv.config();

//this all step is done to parse and import the swagger.json 
const apiDocsPath = path.resolve(process.cwd(), "./swagger.json");
let apiDocs = {};
try {
  apiDocs = JSON.parse(fs.readFileSync(apiDocsPath, "utf8"));
} catch (e) {
  console.warn("Could not read swagger.json:", e.message);
}

const server = express();

//setting up cors library
var options={
  origin:'http://localhost:5500'
}
server.use(cors(options));
//Setting up swagger
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

server.use(express.json());
// app.use(express.urlencoded({ extended: true }));

server.use(logmiddleware);

server.use(bodyParser.json());
server.use("/api/cart", jwtAuth, cartrouter);
server.use("/api/users", userRouter);
server.use("/api/products", jwtAuth, ProductRouter); // protect products with jwtAuth
server.use('/api/orders',jwtAuth,orderrouter);
server.use('/api/likes',jwtAuth,likeRouter)

server.get("/", (req, res) => {
  res.send("welcome to ecom api");
});



server.use((error,req,res,next)=>{
  console.log(error);
   if(error instanceof mongoose.Error.ValidationError){
     return res.status(400).send(error.message);
   }

   if(error instanceof ApplicationError){
     return res.status(error.code).send(error.message);
   }
      res.status(500).send(error.message);
});

server.listen(3000, async() => {
  console.log("server is listening on 3000");
  await conectToMongoose().catch(err => console.error('Failed to connect to MongoDB:', err));
  await redisClient.connect();
});
