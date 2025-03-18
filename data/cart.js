import { getItemShippingPrice } from "./delivery.js";
import { itemList } from "./products.js";

export let cart;

loadFromCart();

export const priceList = JSON.parse(localStorage.getItem('price')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function loadFromCart() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
}

export function addCart(id,quantity){
    let inCart = false
  
    cart.forEach((item) => {
      if(item.productId === id) {
        item.quantity +=quantity;
        inCart = true;
      }
    })
  
    if(!inCart) {
      cart.push({
        productId: id,
        quantity: quantity,
        deliveryId: '1'
      })
    }
  
    saveCart();
  }

export function getCartQuantity() {
  let cartQuantity = 0;
  cart.forEach(item => {
    cartQuantity += item.quantity;
  })

  return cartQuantity;
}

export function removeCartItem(id) {
  
  const newCart = [];

  cart.forEach(item =>{
    if(item.productId !== id) {
      newCart.push(item);
    }
  })
  
  cart = newCart;
  saveCart();
}


export function updateItemQuantity(id, newQuantity) {
  newQuantity = parseInt(newQuantity);
  if(newQuantity === 0) {
    removeCartItem(id);
  } else if(newQuantity >0){
    cart.forEach(item => {
      if(item.productId === id){
        item.quantity = newQuantity;
        return;
      }
    })
    saveCart();
  } else{
    alert("Error: Invalid input");
  }
} 

export function updateDeliveryId(productId, deliveryId) {

  if(!['1','2','3'].includes(deliveryId)){
    return;
  }

  let flag = false;
  cart.forEach(item => {
    if (item.productId === productId) {
        flag = true;
        item.deliveryId = deliveryId;
    }
  });

  if(flag){
    saveCart();
  }
}
export function getShippingPrice() {
  let shippingPrice = 0;
  cart.forEach(element => {
      shippingPrice += getItemShippingPrice(element.deliveryId);
  })
  return shippingPrice;
}

export function getTotalPrice() {
    let totalItemPrice = 0;

    cart.forEach(cartItem => {
        itemList.forEach(product => {
            if(product.id === cartItem.productId) {
                totalItemPrice += product.priceCents * cartItem.quantity;
                return;
            }
        })
    })

    return totalItemPrice;
}