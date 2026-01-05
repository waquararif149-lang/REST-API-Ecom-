import ProductModal from "./product.modal.js";
import ProductRepository from "./product.repository.js";
export default class ProductControler {

   constructor(){
     this.productRepository=new ProductRepository();
   }

  async getAllProducts(req, res) {
    try{
      const products = await this.productRepository.getAllProducts();
      res.status(200).send(products);
    }catch(err){
      console.log(err)
       res.status(500).send({message:"internal server error",error:err.message});
    }
  }

  async addProduct(req, res) {
    try{
       const { name,desc,price, size,categories} = req.body;
       const imageUrl = req.file ? req.file.filename : "";
       const product=new ProductModal(name,desc,parseFloat(price),imageUrl,categories,null);
       await this.productRepository.addProduct(product);
       res.status(201).send(product);
    }catch(err){
       res.status(500).send({message:"internal server error",error:err.message});
    }
  }

  async rateProduct(req, res) {
    const {prodId,rating}=req.body;
    const userId=req.userId;
    await this.productRepository.rateProduct(userId,prodId,rating);
     return res.status(200).send("thank you for your rating")
  }

 async getOneProduct(req, res) {
    const id = req.params.id;
    const product = await this.productRepository.getOneProduct(id);
    if (!product) {
      res.status(404).send("product not found");
    } else {
      res.status(200).send(product);
    }
  }

 async filterProducts(req, res) {
   try{
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const category = req.query.category;
    const result = await this.productRepository.filterProducts(minPrice, category);
    console.log(result);
    if (!result || result.length === 0) {
      res.status(404).send({ message: "No products found for given filters" });
    } else {
      res.status(200).send(result);
    }
  }catch(err){
     res.status(500).send({message:"internal server error",error:err.message});
  }
}

async getAveragePriceByCategory(req,res,next){
  try{
   const result=await this.productRepository.calAvgPricePerCategory();
   res.status(200).send(result);
   next();
  }catch(err){
    throw err;
  }
}
}
