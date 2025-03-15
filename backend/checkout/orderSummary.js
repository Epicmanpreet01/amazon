import { cart, getCartQuantity } from '../../data/cart.js';
import { itemList } from '../../data/products.js';
import { getItemShippingPrice } from '../../data/delivery.js';
import {normalisePrice} from '../utils.js';


export default function loadOrderSummary(quantity=getCartQuantity()) {
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

    document.querySelector('.total-price').innerHTML = normalisePrice(orderTotal);

    function getShippingPrice() {
      let shippingPrice = 0;
      cart.forEach(element => {
          shippingPrice += getItemShippingPrice(element.deliveryId);
      })
      return shippingPrice;
  }
}