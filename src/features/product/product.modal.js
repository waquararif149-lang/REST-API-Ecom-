import ApplicationError from "../../../errorHandler/errorhandler.js";
import UserModal from "../user/user.modal.js";

export default class ProductModal {
  constructor(name, desc, price, imageUrl, categories, size) {
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.imageUrl = imageUrl;
    this.categories=categories;
    this.size = size;
  }

  // static rating(userId,prodId,rating){
  //   //1. check userid and prodid is valid or not
  //    const user=UserModal.getAll().find(u=>u.id==userId);
  //    const product=products.find(p=>p.id==prodId);
  //    if(!user || !product){
  //     throw new ApplicationError('userid or productid is incorect',400);
  //    }
  //    if(!product.ratings){
  //       product.ratings=[];
  //       product.ratings.push({
  //         userId:userId,
  //         rating:rating
  //       })
  //    }else{
  //      const existingratingindex=product.ratings.findIndex(u=>u.userId==userId);
  //      if(existingratingindex>=0){
  //        product.ratings[existingratingindex]={
  //           userId:userId,
  //           rating:rating
  //        }
  //      }else{
  //         product.ratings.push({
  //         userId:userId,
  //         rating:rating
  //       })
  //      }
  //    }
  // }
}

var products = [
  new ProductModal(
    1,
    "product1",
    "description1",
    1000,
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "category1",
    ["S", "M"]
  ),
  new ProductModal(
    2,
    "product2",
    "description2",
    2000,
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "category2",
    ["S", "M", "L"]
  ),
  new ProductModal(
    3,
    "product3",
    "description3",
    3000,
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "category3",
    ["S", "M"]
  ),
  new ProductModal(
    4,
    "product4",
    "description4",
    4000,
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "category4",
    ["S"]
  ),
  new ProductModal(
    5,
    "product5",
    "description5",
    5000,
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D%3D&auto=format&fit=crop&w=500&q=60",
    "category5",
    []
  ),
];
