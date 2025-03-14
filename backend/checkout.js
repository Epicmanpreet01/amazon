import { cart, removeCartItem, getCartQuantity, updateItemQuantity, updateDeliveryId } from '../data/cart.js';
import { itemList } from '../data/products.js';
import { getDelivery, delivery, getItemShippingPrice } from '../data/delivery.js';
import {normalisePrice,} from './utils.js';

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
                            <input type="radio" class="delivery-option" id="delivery-1-${id}" name="delivery-option-${id}" data-product-id="${id}" data-delivery-id="1">
                            <div class="delivery-lbl-container">
                                <label for="day-7" class="delivery-option-desc">${getDelivery(7)}</label>
                                <p class="shipping">FREE Shipping</p>
                            </div>
                        </div>
                        
                        <div class="delivery-option-container" data-product-id="${id}">
                            <input type="radio" class="delivery-option" name="delivery-option-${id}" id="delivery-2-${id}" data-product-id="${id}" data-delivery-id="2">
                            <div class="delivery-lbl-container">
                                <label for="day-5" class="delivery-option-desc">${getDelivery(5)}</label>
                                <p class="shipping">$4.99 - Shipping</p>
                            </div>
                        </div>

                        <div class="delivery-option-container" data-product-id="${id}">
                            <input type="radio" class="delivery-option" name="delivery-option-${id}" id="delivery-3-${id}" data-product-id="${id}" data-delivery-id="3">
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
                            <input type="radio" class="delivery-option delivery-option-${id}" id="delivery-1-${id}" name="delivery-option-${id}" data-product-id="${id}" data-delivery-id="1">
                            <div class="delivery-lbl-container">
                                <label for="day-7" class="delivery-option-desc">${getDelivery(7)}</label>
                                <p class="shipping">FREE Shipping</p>
                            </div>
                        </div>
                        
                        <div class="delivery-option-container" data-product-id="${id}">
                            <input type="radio" class="delivery-option" name="delivery-option-${id}" id="delivery-2-${id}" data-product-id="${id}" data-delivery-id="2">
                            <div class="delivery-lbl-container">
                                <label for="day-5" class="delivery-option-desc">${getDelivery(5)}</label>
                                <p class="shipping">$4.99 - Shipping</p>
                            </div>
                        </div>

                        <div class="delivery-option-container" data-product-id="${id}">
                            <input type="radio" class="delivery-option" name="delivery-option-${id}" id="delivery-3-${id}" data-product-id="${id}" data-delivery-id="3">
                            <div class="delivery-lbl-container">
                                <label for="day-3" class="delivery-option-desc">${getDelivery(3)}</label>
                                <p class="shipping">$9.99 - Shipping</p>
                            </div>
                        </div>
                    </div>
                </div>`
    }
}


function loadHeader(quantity=getCartQuantity()) {
    document.querySelector('.item-no').innerHTML = quantity;
}

function loadOrderSummary(quantity=getCartQuantity()) {
    let totalItemPrice = 0;

    cart.forEach(cartItem => {
        itemList.forEach(product => {
            if(product.id === cartItem.productId) {
                totalItemPrice += product.priceCents * cartItem.quantity;
                return;
            }
        })
    })
    const shippingPrice = getShippingPrice();
    const totalBeforeTax = totalItemPrice + shippingPrice;
    const estimatedTax = totalBeforeTax * 0.1;
    const orderTotal = totalBeforeTax + estimatedTax;


    document.querySelector('.total-item-no').innerHTML = quantity;

    document.querySelector('.total-item-price').innerHTML = normalisePrice(totalItemPrice);

    document.querySelector('.shipping-price').innerHTML = normalisePrice(shippingPrice);

    document.querySelector('.total-before-tax-price').innerHTML = normalisePrice(totalBeforeTax);

    document.querySelector('.tax-price').innerHTML = normalisePrice(estimatedTax);

    document.querySelector('.total-price').innerHTML = normalisePrice(Math.round(orderTotal));

}

function getShippingPrice() {
    let shippingPrice = 0;
    cart.forEach(element => {
        shippingPrice += getItemShippingPrice(element.deliveryId);
    })
    return shippingPrice;
}

const checkOutLoader = function () {
    cart.forEach(function (cartItem) {
        const productId = cartItem.productId;
        const cartItems = document.querySelector('.cart-items');
        let product = {};
        
        itemList.forEach(function (item) {
            if (productId === item.id) {
                product = item;
                return;
            }
        })
        cartItems.insertAdjacentHTML('beforeend', addCart(product, cartItem.quantity));
        setTimeout(() => {
            document.getElementById(`delivery-${cartItem.deliveryId}-${productId}`).checked = true;
            setDelivery(productId, cartItem.deliveryId);
        }, 0);
    })
    loadHeader();
    loadOrderSummary();
}
/*Loads page*/

checkOutLoader();

document.querySelectorAll('.item-quantity-delete').forEach(element => {
    element.addEventListener('click', function() {
        const id = element.dataset.productId;
        removeCartItem(id);
        loadHeader();
        loadOrderSummary();
    })
})



document.querySelectorAll('.item-quantity-update').forEach(element => {
    element.addEventListener('click', function() {
        const id = element.dataset.productId;
        document.querySelector('.item-quantity-container-'+id).classList.add('is-updating');
        document.querySelector('.item-quantity-'+id).innerText = "Quantity: "

        const value = document.querySelector('.input-quantity-'+id).value;
    })
})

document.querySelectorAll('.input-quantity').forEach(item => {

    item.addEventListener('keydown', function(event){
        
        if(event.key === 'Enter'){
            const id = item.dataset.productId;
            updateItemQuantity(id,item.value);
            loadHeader();
            loadOrderSummary();
            document.querySelector('.item-quantity-'+id).innerText = `Quantity: ${item.value}`;
            document.querySelector(`.item-quantity-container-${id}`).classList.remove('is-updating');
        }

    })
})


document.querySelectorAll('.item-quantity-save').forEach(element => {
    element.addEventListener('click', function() {
        const id = element.dataset.productId;
        const value = document.querySelector('.input-quantity-'+id).value;
        updateItemQuantity(id,value);
        loadHeader();
        loadOrderSummary();
        document.querySelector('.item-quantity-'+id).innerText = `Quantity: ${value}`;
        document.querySelector(`.item-quantity-container-${id}`).classList.remove('is-updating');
    })
})


document.querySelectorAll('.delivery-option-container').forEach(element => {
    element.addEventListener('click', function() {
        const productId = element.dataset.productId;
        const deliveryId = element.children[0].dataset.deliveryId;
        element.children[0].checked = true;
        updateDeliveryId(productId,deliveryId);
        setDelivery(productId, deliveryId);
        loadOrderSummary()
    });
});


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