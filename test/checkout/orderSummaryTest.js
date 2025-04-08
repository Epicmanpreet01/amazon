import loadOrderSummary from "../../backend/checkout/orderSummary.js";
import { Cart } from "../../data/cart.js";
import { normalisePrice } from "../../backend/utils.js";

describe('integration testing orderSummary render', () => {
  const cart = new Cart('test-cart');
  beforeEach(()=>{
    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 2,
      deliveryId: '1'
    }];
    spyOn(localStorage, 'getItem');
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'clear');
    document.querySelector('.js-test-container').innerHTML = `
      <div class="cart-items"></div>
      <div class="empty-cart"></div>
      <div class="item-no"></div>
      <div class="order-summary"></div>
    `;
    loadOrderSummary(cart,cart.getCartQuantity());
  })

  afterEach(()=> {
    document.querySelector('.js-test-container').innerHTML = '';
  })

  it('order summary UI loads when cart not empty', () => {
    const cartQuantity = cart.getCartQuantity();
    const totalPrice = cart.getTotalPrice();
    const shippingPrice = cart.getShippingPrice();
    expect(
      document.querySelector('.total-item-no').innerText
    ).toBe(String(cartQuantity));
    
    expect(
      document.querySelector('.total-item-price').innerText
    ).toContain(normalisePrice(totalPrice));

    expect(
      document.querySelector('.shipping-price').innerText
    ).toContain(normalisePrice(shippingPrice));

    expect(
      document.querySelector('.total-before-tax-price').innerText
    ).toContain(normalisePrice(totalPrice+shippingPrice));

    expect(
      document.querySelector('.tax-price').innerText
    ).toContain(normalisePrice((totalPrice+shippingPrice)*0.1));

    expect(
      document.querySelector('.total-price').innerText
    ).toContain(normalisePrice((totalPrice+shippingPrice) + (totalPrice+shippingPrice)*0.1));
  })
})