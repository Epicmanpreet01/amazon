import { deliveryObject } from '../data/delivery.js';
import { orders } from '../data/order.js'; 
import { itemList, loadProducts } from '../data/products.js';

function trackingPageLoader() {
  const url = new URL(window.location.href);
  const itemObj = orders.returnItemObj(url.searchParams.get('orderId'),url.searchParams.get('productId'));

  const mainEle = document.querySelector('.js-main');
  let mainEleHTML = '';
  const product = searchProduct(itemObj.productId);
  mainEleHTML = returnTrackingPageHTML(product);
  mainEle.innerHTML = mainEleHTML;

  updateStatusBar();

  function returnTrackingPageHTML(itemListProduct) {
    return `<div class="main-header">
        <a href="order.html">
          View all orders
        </a>
      </div>
      
      <div class="main-body">
        <div class="delivery-time">
          ${(deliveryObject.getDeliveryStatus(itemObj.deliveryId, orders.returnOrderTime(url.searchParams.get('orderId')))? 'Delivered on' : 'Arrving on')} ${deliveryObject.getDelivery(deliveryObject.getDeliveryMode(itemObj.deliveryId), orders.returnOrderTime(url.searchParams.get('orderId')))}
        </div>

        <div class="order-details">
          <div class="order-name">
            ${itemListProduct.name}
          </div>
          <div class="quantity">
            Quantity: <span class="quantity-value">${itemObj.quantity}</span>
          </div>
        </div>

        <div class="order-picture">
          <img src="assets/img/product/${itemListProduct.image}" alt="order picture">
        </div>
      </div>

      <div class="order-progress-bar">
        <div class="order-status-container">
          <div class="status-1">
            Preparing
          </div>
          <div class="status-2">
            Shipped
          </div>
          <div class="status-3">
            Delivered
          </div>
        </div>
        <div class="status-bar">
          <div class=status-bar-progress></div>
        </div>
      </div>`
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

  function updateStatusBar() {
    const statusBarEle = document.querySelector('.status-bar-progress');
    if(deliveryObject.getDeliveryStatus()) {
      document.querySelector('.status-1').style.color = 'black';
      document.querySelector('.status-3').style.color = 'green';
      statusBarEle.classList.add('complete');
      statusBarEle.classList.remove('preparing');
    } else {
      document.querySelector('.status-1').style.color = 'green';
      document.querySelector('.status-3').style.color = 'black';
      statusBarEle.classList.add('preparing');
      statusBarEle.classList.remove('complete');
    }
  }
  
}

async function loadTrackingPage() {
  await loadProducts();
  trackingPageLoader();
}

loadTrackingPage();