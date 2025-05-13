import { orders } from "../data/order.js";
import { normalisePrice } from "./utils.js";
import { deliveryObject } from "../data/delivery.js";
import { itemList, loadProducts } from "../data/products.js";
import { cart } from '../data/cart.js';


export default async function orderLoader() {
  await loadProducts();
  loadOrders()
}


function loadOrders() {
  const orderListElement = document.querySelector('.order-list');
  orderListElement.innerHTML = '';
  let orderListHTML = '';

  orders.orderList.forEach((element) => {
    orderListHTML += returnOrderHTML(element);
  })

  orderListElement.innerHTML = orderListHTML; 
  

  function returnOrderHTML(order) {
    return `<div class="order">
                <div class="order-header">
                    <span class="order-header-info">
                        Order Placed: <span class="value">${order.orderTime}</span>
                    </span>
                    <span class="order-header-info total">
                        Total: <span class="value">$${normalisePrice(order.totalCostCents)}</span>
                    </span>
                    <span class="order-header-info">
                        Order ID: <span class="value">${order.id}</span>
                    </span>
                </div>
                <div class="order-main">
                  ${returnProductHTML(order.products, order)}
                </div>
            </div>`
  }

  function returnProductHTML(products, order) {
    let productHTML = '';
    products.forEach(product => {
      productHTML += `<div class = 'order-item'><div class="order-item-img-container">
              <img src="assets/img/product/${searchProduct(product.productId).image}" alt="order image" class="order-img">
          </div>

          <div class="order-item-info-container">
              <div class="order-item-info">
                  <p class="order-item-name">${searchProduct(product.productId).name}</p>
                  <p class="order-item-delivery-info"><span class="delivery-status">${(deliveryObject.getDeliveryStatus(product.deliveryId, order.orderTime)? 'Delivered on' : 'Arriving on' )} </span>: <span class="delivery-info-date">${deliveryObject.getDelivery(deliveryObject.getDeliveryMode(product.deliveryId),order.orderTime)}</span></p>
                  <p class="order-item-quantity">Quantity: <span>${product.quantity}</span></p>
                  <button class="buy-again-btn buy-again-btn-${product.productId}" data-product-id = ${product.productId}>
                      <img src="assets/img/orders/buy-again.png" alt="buy-again">
                      <span>Buy it again</span>
                  </button>
              </div>

              <a href='track.html?orderId=${order.id}&productId=${product.productId}&deliveryId=${product.deliveryId}'>
                  <button class="track-package-btn js-track-package-btn" data-order-id=${order.id} data-product-id = ${product.productId}>Track package</button>
              </a>
          </div></div>`
    })

    return productHTML;
  }

  function searchProduct(productID) {
    let product = {};
    itemList.forEach(function(element) {
      if(element.id === productID) {
        product = element;
        return;
      }
    })
    return product;
  }

  const updateCartQuantity = () =>{
    let cartQuantity = cart.getCartQuantity();
    const cartItemNo = document.querySelector('.cart-item-no')
    if(!cartQuantity){
      cartItemNo.style.display = 'none';
      return;
    }
  
    cartItemNo.style.display = 'inline-block';
    cartItemNo.innerText = cartQuantity;
  } 
  updateCartQuantity();


  document.querySelectorAll('.buy-again-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      cart.addCart(btn.dataset.productId,1);
      console.log(btn.dataset.productId);
      btn.innerHTML = `<img src="assets/img/orders/buy-again.png" alt="buy-again">
      <span>Added</span>`;
      setTimeout(() => {
      btn.innerHTML = `
        <img src="assets/img/orders/buy-again.png" alt="buy-again">
        <span>Buy it again</span>`
      }, 3000);
      updateCartQuantity();
    })
  })



}

orderLoader();