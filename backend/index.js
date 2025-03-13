import {cart, addCart} from '../data/cart.js'
import {itemList} from '../data/products.js'
import {normalisePrice} from './utils.js'

function addItems(item) {
  return `<div class="item" id="${item.id}">
          <div class="img-container">
              <img src="assets/img/product/${item.image}" alt="item-pic" class="item-img">
          </div>
          <div class="item-info-container">
              <p class="item-name">${item.name}</p>
          </div>
          <div class="rating">
            <div class="rating-star-container">
              <img src="assets/img/ratings/rating-${item.rating.stars * 10}.png" class="rating-star">
            </div>
            <p class="rating-number">${item.rating.count}</p>
          </div>
          <div class="price-container">
              <p class="price">$${normalisePrice(item.priceCents)}</p>
          </div>
          <div class="item-selection-container">
              <select name="item-no" class="item-no item-no-${item.id}" id="${item.id}-selector">
                  ${Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('')}
              </select>
          </div>
          <div class="add-message add-message-${item.id}">
            <img src="assets/img/product/checkmark.png">
            Added
          </div>
          <button class="add-to-cart" data-product-id="${item.id}">Add to Cart</button>
      </div>`;
}

function searchItems(key) {
  const itemGrid = document.querySelector('.item-grid');
  let results = "";

  itemList.forEach((item) => {
    if (!key || item.name.toLowerCase().includes(key.toLowerCase())) {
      results += addItems(item);
    }
  });

  itemGrid.innerHTML = results || '<p class="no-results">No matches found for your search.</p>';

  document.querySelector('.search-bar').value = "";
}
document.querySelector('.item-grid').innerHTML = itemList.map(addItems).join("");

document.querySelector('.search-bar').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    const searchKey = this.value.trim().toLowerCase();
    searchItems(searchKey);
  }
});

document.querySelector('.search-btn').addEventListener('click', function() {
  searchItems(document.querySelector('.search-bar').value.trim().toLowerCase());
});

/*Add to cart*/

let addMessageTimeOutId;

function showAddMessage(id){
  document.querySelector(`.add-message-${id}`).classList.add('visible-message');
}

function fadeAddMessage(id){
  document.querySelector('.add-message-'+id).classList.remove('visible-message');
}

const updateCartQuantity = () =>{
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity +=item.quantity;
  })

  document.querySelector('.cart-item-no').innerText = cartQuantity;
} 

document.addEventListener("DOMContentLoaded", updateCartQuantity);

document.querySelectorAll('.add-to-cart').forEach(function(element) {
  element.addEventListener('click', function() {
    const productId = this.dataset.productId;
    showAddMessage(productId);
    addMessageTimeOutId = setTimeout(function() {
      fadeAddMessage(productId);
    }, 2000);
    const quantity = parseInt(document.querySelector('.item-no-'+productId).value);
    document.getElementById(productId).value = '1';
    addCart(productId,quantity);
    updateCartQuantity();
  })
  clearTimeout(addMessageTimeOutId);
})

/*Item Selector*/

let selectorFlag = []

function itemSelector(id) {
  if(!selectorFlag.includes(id) && selectorFlag.length === 0){
    document.getElementById(id).style.border = '1px solid orange';
    selectorFlag.push(id);
  } else if(!selectorFlag.includes(id) && selectorFlag.length !== 0){
    emptySelectorFlag();
    document.getElementById(id).style.border = '1px solid orange';
    selectorFlag.push(id);
  } else{
    document.getElementById(id).style.border = '1px solid rgb(240,240,240)';
    selectorFlag.pop();
  }
}

function emptySelectorFlag() {
  const lastElement = selectorFlag.pop();
  document.getElementById(lastElement).style.border = '1px solid rgb(240,240,240)';
}


document.querySelectorAll('.item-no').forEach(function (element) {
  element.addEventListener('click', function() {
    itemSelector(this.id);
  })
});

document.body.addEventListener('keydown', function(event) {
  if(selectorFlag.length !== 0){
    if(event.key === 'Escape'){
      emptySelectorFlag();
    }
  }
});

document.body.addEventListener('click', function(event) {
  if(!selectorFlag.includes(event.target.id) && selectorFlag.length !== 0) {
    emptySelectorFlag();
  }
});