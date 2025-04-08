import {normalisePrice} from '../utils.js';


export default function loadOrderSummary(cart,quantity) {
    const totalItemPrice = cart.getTotalPrice();
    const shippingPrice = cart.getShippingPrice();
    const totalBeforeTax = totalItemPrice + shippingPrice;
    const estimatedTax = totalBeforeTax * 0.1;
    const orderTotal = totalBeforeTax + estimatedTax;

    const orderSummaryHTML = `<div class="order-summary-header">
                    <p>Order Summary</p>
                </div>

                <div class="order-field">
                    <p class="category">Item (<span class="total-item-no">${quantity}</span>):</p>
                    <p class="price">$<span class="total-item-price">${normalisePrice(totalItemPrice)}</span></p>
                </div>

                <div class="order-field">
                    <p class="category">Shipping & handling:</p>
                    <p class="price">$<span class="shipping-price">${normalisePrice(shippingPrice)}</span></p>
                </div>

                <div class="order-field">
                    <p class="category">Total before tax:</p>
                    <p class="price" id="total-before-tax">$<span class="total-before-tax-price">${normalisePrice(totalBeforeTax)}</span></p>
                </div>

                <div class="order-field">
                    <p class="category">Estimated tax (10%):</p>
                    <p class="price">$<span class="tax-price">${normalisePrice(estimatedTax)}</span></p>
                </div>

                <div class="horizontal-rule">
                </div>
                <div class="order-total">
                    <p class="total-lbl">Order total:</p>
                    <p class="total">$<span class="total-price">${normalisePrice(orderTotal)}</span></p>
                </div>

                <a href="order.html">
                    <button class="place-order-btn" ${checkEmpty()}>Place your order</button>
                </a>`

    document.querySelector('.order-summary').innerHTML = orderSummaryHTML;

    if(document.querySelector('.cart-items').style.display === 'none') {
        document.querySelector('.place-order-btn').style.disabled = true;
        document.querySelector('.place-order-btn').classList.add('is-disabled');
    } else{
        document.querySelector('.place-order-btn').style.disabled = false;
        document.querySelector('.place-order-btn').classList.remove('is-disabled');
    }

    function checkEmpty() {
        return (document.querySelector('.cart-items').style.display === 'none')? 'disabled' : '';
    }

}