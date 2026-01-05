import express from "express";
import { upload } from "../../middleware/fileupload.middleware.js";
import ProductControler from "./product.controler.js";
const Router = express.Router();

const productControler = new ProductControler();
Router.post('/rate',(req,res)=>{
   productControler.rateProduct(req,res);
});
Router.get("/", (req,res)=>{
    productControler.getAllProducts(req,res);
});
Router.post("/", upload.single("imageUrl"), (req,res)=>{
    productControler.addProduct(req,res);
});
Router.get("/filter", (req,res)=>{
    productControler.filterProducts(req,res);
});
Router.get('/averagePrice',(req,res,next)=>{
    productControler.getAveragePriceByCategory(req,res);
})
Router.get("/:id", (req,res)=>{
    productControler.getOneProduct(req,res);
});

export default Router;
