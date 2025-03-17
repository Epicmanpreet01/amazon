import loadCart from "../../backend/checkout/cartSummary.js";
import { loadFromCart,cart } from "../../data/cart.js";
import { getDelivery } from "../../data/delivery.js";

describe('Integrated test for rendering cart summary', () =>{
  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake(()=> {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 2,
        deliveryId: '1'
      }]);
    })
    loadFromCart();
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'clear');
    document.querySelector('.js-test-container').innerHTML = `
    <div class="cart-items"></div>
    <div class="empty-cart"></div>
    <div class="item-no"></div>
    <div class="order-summary"></div>
    `
    loadCart();
  })

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  })

  it('cart loads when not empty', () =>{
    const product1 = cart[0].productId;
    const product2 = cart[1].productId;
    loadCart();  
    expect(
      document.querySelectorAll('.cart-item').length
    ).toBe(4);
    /*correct quantity displayed*/
    expect(
      document.querySelector(`.item-quantity-${product1}`).innerText
    ).toContain(1);
    expect(
      document.querySelector(`.item-quantity-${product2}`).innerText
    ).toContain(2);
    /*correct price displayed*/
    expect(
      document.querySelector(`.item-price-${product1}`).innerText
    ).toContain(10.90);
    expect(
      document.querySelector(`.item-price-${product2}`).innerText
    ).toContain(20.95);
    /*Correct delivery option checked at launch*/
    expect(
      document.getElementById(`big-delivery-1-${product1}`).checked
    ).toBe(true);
    expect(
      document.getElementById(`big-delivery-1-${product2}`).checked
    ).toBe(true);
  })

  it('default UI when cart empty loads', () => {
    document.querySelectorAll('.item-quantity-delete').forEach(element => {
      element.click();
    })

    expect(
      document.querySelectorAll('cart-item').length
    ).toBe(0);
    expect(
      document.querySelector('.cart-items').innerHTML
    ).toEqual('');
    expect(
      document.querySelector('.cart-items').style.display
    ).toEqual('none');
    expect(
      document.querySelector('.empty-cart').style.display
    ).not.toEqual('none');
  })

  it('delete button works correctly', () => {
    const product1 = cart[0].productId;
    const product2 = cart[1].productId;
    document.querySelector(`.item-quantity-delete-${product1}`).click();
    
    expect(
      document.querySelectorAll('.cart-item').length
    ).toBe(2);
    expect(
      document.querySelector(`cart-item-${product1}`)
    ).toBe(null);
    
    document.querySelector(`.item-quantity-delete-${product2}`).click();

    expect(
      document.querySelectorAll(`.cart-item`).length
    ).toBe(0);

    expect(
      document.querySelector(`.cart-item-${product2}`)
    ).toBe(null);
  })

  it('update button works correctly', () => {
    const product1 = cart[0].productId;
    const product2 = cart[1].productId;
    document.querySelector(`.item-quantity-update-${product1}`).click();

    expect(
      document.querySelector(`.item-quantity-container-${product1}`).classList.contains('is-updating')
    ).toEqual(true);

    document.querySelector(`.item-quantity-update-${product2}`).click();

    expect(
      document.querySelector(`.item-quantity-container-${product2}`).classList.contains('is-updating')
    ).toEqual(true);
  })

  it('Delivery interaction works', ()=>{
    const product1 = cart[0].productId;
    const product2 = cart[1].productId;
    
    const today = dayjs();
    let deliverydate = getDelivery(7);

    expect(
      document.querySelector(`.delivery-date-${product1}`).innerText
    ).toContain(deliverydate);
    expect(
      document.querySelector(`.delivery-date-${product2}`).innerText
    ).toContain(deliverydate);

    deliverydate = getDelivery(5);

    document.querySelector(`#big-delivery-2-${product1}`).click();
    document.querySelector(`#big-delivery-2-${product2}`).click();
    expect(
      document.querySelector(`.delivery-date-${product1}`).innerText
    ).toContain(deliverydate);
    expect(
      document.querySelector(`.delivery-date-${product2}`).innerText
    ).toContain(deliverydate);
  })
})