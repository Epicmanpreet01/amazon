export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export const priceList = JSON.parse(localStorage.getItem('price')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
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
        quantity: quantity
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

  document.querySelector('.cart-item-'+id).remove();
  
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