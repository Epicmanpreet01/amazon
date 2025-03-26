import { itemList } from "./products.js";
import { getItemShippingPrice } from "./delivery.js";


class Cart{
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromCart();
  }

  #saveCart() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  #loadFromCart() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 2,
      deliveryId: '2'
    }];
  }

  addCart(id,quantity){
    let inCart = false
  
    this.cartItems.forEach((item) => {
      if(item.productId === id) {
        item.quantity +=quantity;
        inCart = true;
      }
    })
  
    if(!inCart) {
      this.cartItems.push({
        productId: id,
        quantity: quantity,
        deliveryId: '1'
      })
    }
  
    this.#saveCart();
  }

  getCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach(item => {
      cartQuantity += item.quantity;
    })
  
    return cartQuantity;
  }

  removeCartItem(id) {
    const newCart = [];
  
    this.cartItems.forEach(item =>{
      if(item.productId !== id) {
        newCart.push(item);
      }
    })
    
    this.cartItems = newCart;
    this.#saveCart();
  }

  updateItemQuantity(id, newQuantity) {
    newQuantity = parseInt(newQuantity);
    if(newQuantity === 0) {
      removeCartItem(id);
    } else if(newQuantity >0){
      this.cartItems.forEach(item => {
        if(item.productId === id){
          item.quantity = newQuantity;
          return;
        }
      })
      this.#saveCart();
    } else{
      alert("Error: Invalid input");
    }
  }

  updateDeliveryId(productId, deliveryId) {
  
    if(!['1','2','3'].includes(deliveryId)){
      return;
    }
  
    let flag = false;
    this.cartItems.forEach(item => {
      if (item.productId === productId) {
          flag = true;
          item.deliveryId = deliveryId;
      }
    });
  
    if(flag){
      this.#saveCart();
    }
  }

  getShippingPrice() {
    let shippingPrice = 0;
    this.cartItems.forEach(element => {
        if(['1','2','3'].includes(element.deliveryId)){
          shippingPrice += getItemShippingPrice(element.deliveryId);
        } else{
          element.deliveryId = '1';
        }
        
    })
    return shippingPrice;
  }

  getTotalPrice() {
      let totalItemPrice = 0;
  
      this.cartItems.forEach(cartItem => {
          itemList.forEach(product => {
              if(product.id === cartItem.productId) {
                  totalItemPrice += product.priceCents * cartItem.quantity;
                  return;
              }
          })
      })
  
      return totalItemPrice;
  }
}

const cart = new Cart('cart');

export {cart};