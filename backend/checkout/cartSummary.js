import { cart, removeCartItem, updateItemQuantity, updateDeliveryId } from '../../data/cart.js';
import { itemList } from '../../data/products.js';
import { getDelivery, delivery } from '../../data/delivery.js';
import {normalisePrice} from '../utils.js';
import checkOutLoader from '../checkout.js';

export default function loadCart() {
    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = '';
    cart.forEach(function (cartItem) {
        const productId = cartItem.productId;

        let product = {};
        
        itemList.forEach(function (item) {
            if (productId === item.id) {
                product = item;
                return;
            }
        })
        cartItems.insertAdjacentHTML('beforeend', addCart(product, cartItem.quantity));
        document.getElementById(`big-delivery-${cartItem.deliveryId}-${productId}`).checked = true;
        document.getElementById(`small-delivery-${cartItem.deliveryId}-${productId}`).checked = true;
        setDelivery(productId, cartItem.deliveryId);
    })


    function addCart(product, quantity) {
        return `<div class="cart-item big-cart-item cart-item-${product.id}">
                        <section class="item-header-section">
                            <p class="delivery-date delivery-date-${product.id}">Delivery date: <span class="date">${getDelivery(7)}</span></p>
                        </section>
    
                        <section class="item-main-section">
                            <div class="item-img-container">
                                <img src="assets/img/product/${product.image}" alt="item image" class="item-img">
                            </div>
    
                            <div class="item-info">
                                <p class="item-name">${product.name}</p>
    
                                <p class="item-price">$${normalisePrice(product.priceCents)}</p>
    
                                <div class="item-quantity-container item-quantity-container-${product.id}">
                                    <p class="item-quantity item-quantity-${product.id}">Quantity: ${quantity}</p>
                                    <input type="number" class="input-quantity input-quantity-${product.id}" data-product-id ="${product.id}"></input>
                                    <p class="item-quantity-save" data-product-id="${product.id}">Save</p>
                                    <p class="item-quantity-update" data-product-id="${product.id}">Update</p>
                                    <p class="item-quantity-delete" data-product-id="${product.id}">Delete</p>
                                </div>
                            </div>
    
                            ${returnDeliveryHTML(product.id, true)}
                        </section>
                    </div>
    
                    <div class="cart-item small-cart-item cart-item-${product.id}">
                        <section class="item-header-section">
                            <p class="delivery-date delivery-date-${product.id}">Delivery date: <span class="date">${getDelivery(7)}</span></p>
                        </section>
    
                        <section class="item-main-section">
                            <div class="item-img-container">
                                <img src="assets/img/product/${product.image}" class="item-img">
                            </div>
    
                            <div class="item-info">
                                <p class="item-name">${product.name}</p>
    
                                <p class="item-price">$7.99</p>
    
                                <div class="item-quantity-container item-quantity-container-${product.id}">
                                    <p class="item-quantity item-quantity-${product.id}">Quantity: ${quantity}</p>
                                    <input type="number" class="input-quantity input-quantity-${product.id}" data-product-id ="${product.id}"></input>
                                    <p class="item-quantity-save" data-product-id="${product.id}">Save</p>
                                    <p class="item-quantity-update" data-product-id="${product.id}">Update</p>
                                    <p class="item-quantity-delete" data-product-id="${product.id}">Delete</p>
                                </div>
                            </div>
    
                        </section>
    
                        ${returnDeliveryHTML(product.id,false)}
                    </div>`
    }
    
    function returnDeliveryHTML(id, mode) {
        if(mode){
            return `<div class="item-delivery-options">
                        <div class="delivery-header-container">
                            <p class="delivery-header">Choose a delivery option:</p>
                        </div>
                        <div class="delivery-options-container">
                            <div class="delivery-option-container" data-product-id="${id}">
                                <input type="radio" class="delivery-option" id="big-delivery-1-${id}" name="big-delivery-option-${id}" data-product-id="${id}" data-delivery-id="1">
                                <div class="delivery-lbl-container">
                                    <label for="day-7" class="delivery-option-desc">${getDelivery(7)}</label>
                                    <p class="shipping">FREE Shipping</p>
                                </div>
                            </div>
                            
                            <div class="delivery-option-container" data-product-id="${id}">
                                <input type="radio" class="delivery-option" name="big-delivery-option-${id}" id="big-delivery-2-${id}" data-product-id="${id}" data-delivery-id="2">
                                <div class="delivery-lbl-container">
                                    <label for="day-5" class="delivery-option-desc">${getDelivery(5)}</label>
                                    <p class="shipping">$4.99 - Shipping</p>
                                </div>
                            </div>
    
                            <div class="delivery-option-container" data-product-id="${id}">
                                <input type="radio" class="delivery-option" name="big-delivery-option-${id}" id="big-delivery-3-${id}" data-product-id="${id}" data-delivery-id="3">
                                <div class="delivery-lbl-container">
                                    <label for="day-3" class="delivery-option-desc">${getDelivery(3)}</label>
                                    <p class="shipping">$9.99 - Shipping</p>
                                </div>
                            </div>
                        </div>
                    </div>`
        } else{
            return `<div class="item-delivery-options">
                        <div class="delivery-header-container">
                            <p class="delivery-header">Choose a delivery option:</p>
                        </div>
                        <div class="delivery-options-container">
                            <div class="delivery-option-container" data-product-id="${id}">
                                <input type="radio" class="delivery-option delivery-option-${id}" id="small-delivery-1-${id}" name="small-delivery-option-${id}" data-product-id="${id}" data-delivery-id="1">
                                <div class="delivery-lbl-container">
                                    <label for="day-7" class="delivery-option-desc">${getDelivery(7)}</label>
                                    <p class="shipping">FREE Shipping</p>
                                </div>
                            </div>
                            
                            <div class="delivery-option-container" data-product-id="${id}">
                                <input type="radio" class="delivery-option" name="small-delivery-option-${id}" id="small-delivery-2-${id}" data-product-id="${id}" data-delivery-id="2">
                                <div class="delivery-lbl-container">
                                    <label for="day-5" class="delivery-option-desc">${getDelivery(5)}</label>
                                    <p class="shipping">$4.99 - Shipping</p>
                                </div>
                            </div>
    
                            <div class="delivery-option-container" data-product-id="${id}">
                                <input type="radio" class="delivery-option" name="small-delivery-option-${id}" id="small-delivery-3-${id}" data-product-id="${id}" data-delivery-id="3">
                                <div class="delivery-lbl-container">
                                    <label for="day-3" class="delivery-option-desc">${getDelivery(3)}</label>
                                    <p class="shipping">$9.99 - Shipping</p>
                                </div>
                            </div>
                        </div>
                    </div>`
        }
    }

    function setDelivery(productId, deliveryId) {
      let deliveryDate = '';
      const deliveryDateEle = document.querySelector(`.delivery-date-${productId}`);
      delivery.forEach(element =>{
          if(element.id === deliveryId){
              deliveryDate = getDelivery(element.deliveryTime);
              return;
          }
      })
      deliveryDateEle.innerText = "Delivery date: " + deliveryDate;
    }
    document.querySelectorAll('.item-quantity-delete, .small-cart-item .item-quantity-delete').forEach(element => {
        element.addEventListener('click', function() {
            const id = element.dataset.productId;
            removeCartItem(id);
            checkOutLoader();
        });
    });
  
    document.querySelectorAll('.item-quantity-update, .small-cart-item .item-quantity-update').forEach(element => {
        element.addEventListener('click', function() {
            const id = element.dataset.productId;
            document.querySelectorAll('.item-quantity-container-' + id).forEach(container => {
                container.classList.add('is-updating');
            });
            document.querySelectorAll('.item-quantity-' + id).forEach(qty => {
                qty.innerText = "Quantity: ";
            });
        });
    });
  
    document.querySelectorAll('.input-quantity, .small-cart-item .input-quantity').forEach(item => {
        item.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                const id = item.dataset.productId;
                updateItemQuantity(id, item.value);
                checkOutLoader();
                document.querySelectorAll(`.item-quantity-container-${id}`).forEach(container => {
                    container.classList.remove('is-updating');
                });
            }
        });
    });
  
    document.querySelectorAll('.item-quantity-save, .small-cart-item .item-quantity-save').forEach(element => {
        element.addEventListener('click', function() {
            const id = element.dataset.productId;
            const value = document.querySelector(`.input-quantity-${id}`).value;
            updateItemQuantity(id, value);
            checkOutLoader();
            document.querySelectorAll('.item-quantity-' + id).forEach(qty => {
                qty.innerText = `Quantity: ${value}`;
            });
            document.querySelectorAll(`.item-quantity-container-${id}`).forEach(container => {
                container.classList.remove('is-updating');
            });
        });
    });
  
    document.querySelectorAll('.delivery-option-container, .small-cart-item .delivery-option-container').forEach(element => {
        element.addEventListener('click', function() {
            const productId = element.dataset.productId;
            const deliveryId = element.children[0].dataset.deliveryId;
            element.children[0].checked = true;
            updateDeliveryId(productId, deliveryId);
            checkOutLoader();
        });
    });
}