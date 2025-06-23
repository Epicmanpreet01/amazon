import { orders } from '../../data/order.js';
import { normalisePrice } from '../utils.js';

export default function loadOrderSummary(cart, quantity) {
  const totalItemPrice = cart.getTotalPrice();
  const shippingPrice = cart.getShippingPrice();
  const totalBeforeTax = totalItemPrice + shippingPrice;
  const estimatedTax = totalBeforeTax * 0.1;
  const orderTotal = totalBeforeTax + estimatedTax;

  const orderSummaryElement = document.querySelector('.order-summary');
  const cartItemsElement = document.querySelector('.cart-items');

  if (!orderSummaryElement || !cartItemsElement) {
    console.warn("Missing .order-summary or .cart-items in DOM");
    return;
  }

  const isCartEmpty = cartItemsElement.style.display === 'none';

  const orderSummaryHTML = `
    <div class="order-summary-header"><p>Order Summary</p></div>

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

    <div class="horizontal-rule"></div>
    <div class="order-total">
      <p class="total-lbl">Order total:</p>
      <p class="total">$<span class="total-price">${normalisePrice(orderTotal)}</span></p>
    </div>

    <button class="place-order-btn js-place-order-btn" ${isCartEmpty ? 'disabled' : ''}>
      Place your order
    </button>`;

  orderSummaryElement.innerHTML = orderSummaryHTML;

  const placeOrderBtn = document.querySelector('.place-order-btn');
  if (placeOrderBtn) {
    placeOrderBtn.disabled = isCartEmpty;
    placeOrderBtn.classList.toggle('is-disabled', isCartEmpty);

    placeOrderBtn.addEventListener('click', async function () {
      orders.createOrderObject(cart);
      cart.ordered();
      window.location.href = 'order.html';
    });
  }
}