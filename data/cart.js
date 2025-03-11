export const cart = JSON.parse(localStorage.getItem('cart')) || [];

export const priceList = JSON.parse(localStorage.getItem('price')) || [];

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
  
    localStorage.setItem('cart', JSON.stringify(cart));
  }