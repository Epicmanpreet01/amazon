import { cart,priceList } from '../data/cart.js';
import { itemList } from '../data/products.js';


function addCart(product, quantity) {
    return `<div class="cart-item big-cart-item">
                    <section class="item-header-section">
                        <p class="delivery-date">Delivery date: <span class="date">Thursday, March 13</span></p>
                    </section>

                    <section class="item-main-section">
                        <div class="item-img-container">
                            <img src="assets/img/product/${product.image}" alt="item image" class="item-img">
                        </div>

                        <div class="item-info">
                            <p class="item-name">${product.name}</p>

                            <p class="item-price">$${product.priceCents / 100}</p>

                            <div class="item-quantity-container">
                                <p class="item-quantity">Quantity: ${quantity}</p>
                                <p class="item-quantity-update">Update</p>
                                <p class="item-quantity-delete">Delete</p>
                            </div>
                        </div>

                        <div class="item-delivery-options">
                            <div class="delivery-header-container">
                                <p class="delivery-header">Choose a delivery option:</p>
                            </div>
                            <div class="delivery-options-container">
                                <div class="delivery-option-container">
                                    <input type="radio" id="march-19" class="delivery-option" name="delivery-option">
                                    <div class="delivery-lbl-container">
                                        <label for="march-19" class="delivery-option-desc">Wednesday, March 19</label>
                                        <p class="shipping">FREE Shipping</p>
                                    </div>
                                </div>
                                
                                <div class="delivery-option-container">
                                    <input type="radio" id="march-13" class="delivery-option" name="delivery-option">
                                    <div class="delivery-lbl-container">
                                        <label for="march-13" class="delivery-option-desc">Thursday, March 13</label>
                                        <p class="shipping">$4.99 - Shipping</p>
                                    </div>
                                </div>

                                <div class="delivery-option-container">
                                    <input type="radio" id="march-11" class="delivery-option" name="delivery-option">
                                    <div class="delivery-lbl-container">
                                        <label for="march-11" class="delivery-option-desc">Tuesday, March 11</label>
                                        <p class="shipping">$9.99 - Shipping</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div class="cart-item small-cart-item">
                    <section class="item-header-section">
                        <p class="delivery-date">Delivery date: <span class="date">Thursday, March 13</span></p>
                    </section>

                    <section class="item-main-section">
                        <div class="item-img-container">
                            <img src="assets/img/product/${product.image}" class="item-img">
                        </div>

                        <div class="item-info">
                            <p class="item-name">${product.name}</p>

                            <p class="item-price">$7.99</p>

                            <div class="item-quantity-container">
                                <p class="item-quantity">Quantity: ${quantity}</p>
                                <p class="item-quantity-update">Update</p>
                                <p class="item-quantity-delete">Delete</p>
                            </div>
                        </div>

                    </section>

                    <div class="item-delivery-options">
                        <div class="delivery-header-container">
                            <p class="delivery-header">Choose a delivery option:</p>
                        </div>
                        <div class="delivery-options-container">
                            <div class="delivery-option-container">
                                <input type="radio" id="march-19" class="delivery-option" name="delivery-option">
                                <div class="delivery-lbl-container">
                                    <label for="march-19" class="delivery-option-desc">Wednesday, March 19</label>
                                    <p class="shipping">FREE Shipping</p>
                                </div>
                            </div>
                            
                            <div class="delivery-option-container">
                                <input type="radio" id="march-13" class="delivery-option" name="delivery-option">
                                <div class="delivery-lbl-container">
                                    <label for="march-13" class="delivery-option-desc">Thursday, March 13</label>
                                    <p class="shipping">$4.99 - Shipping</p>
                                </div>
                            </div>

                            <div class="delivery-option-container">
                                <input type="radio" id="march-11" class="delivery-option" name="delivery-option">
                                <div class="delivery-lbl-container">
                                    <label for="march-11" class="delivery-option-desc">Tuesday, March 11</label>
                                    <p class="shipping">$9.99 - Shipping</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
}


function loadHeader(quantity) {
    document.querySelector('.item-no').innerHTML = quantity;
}

function loadOrderSummary(totalItemPrice, quantity) {
    if (!totalItemPrice) {
        return;
    }
    const shippingPrice = 998;
    const totalBeforeTax = totalItemPrice + shippingPrice;
    const estimatedTax = totalBeforeTax * 0.1;
    const orderTotal = totalBeforeTax + estimatedTax;


    document.querySelector('.total-item-no').innerHTML = quantity;

    document.querySelector('.total-item-price').innerHTML = (totalItemPrice/100).toFixed(2);

    document.querySelector('.shipping-price').innerHTML = (shippingPrice/100).toFixed(2);

    document.querySelector('.total-before-tax-price').innerHTML = (totalBeforeTax/100).toFixed(2);

    document.querySelector('.tax-price').innerHTML = (estimatedTax/100).toFixed(2);

    document.querySelector('.total-price').innerHTML = (Math.round(orderTotal)/100).toFixed(2);

    console.log(Math.round(orderTotal)/100);

}
console.log();

const checkOutLoader = function () {

    let totalItemPrice = 0;
    let quantity = 0

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
        cartItems.innerHTML += addCart(product, cartItem.quantity);
        totalItemPrice += product.priceCents * cartItem.quantity;
        quantity += cartItem.quantity;
    })
    loadHeader(quantity);
    loadOrderSummary(totalItemPrice, quantity);
}


checkOutLoader();