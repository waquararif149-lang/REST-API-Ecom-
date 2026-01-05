import ProductModal from "../product/product.modal.js";

export default class CartModel {
  constructor(userId,prodId, quantity) {
    this.userId = userId;
    this.prodId = prodId;
    this.quantity = quantity;
  }

  static addtocart(prodId, userId, quantity) {
    const newitem = new CartModel(prodId, userId, quantity);
    cart.push(newitem);
    return newitem;
  }

  static getcart(userId) {
    console.log("this is total cart", cart);
    const usercart = cart.filter((u) => u.userId == userId);
    return usercart;
  }

  static deleteItem(prodId,userId) {
    const index = cart.findIndex((i) => i.prodId == prodId && i.userId==userId);
    if(!index){
      return "item not found";
    }
    cart.splice(index,1);
  }
}

var cart = [new CartModel(1, 2, 3),
  new CartModel(3, 1, 4)
];
