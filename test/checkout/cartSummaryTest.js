import loadCart from "../../backend/checkout/cartSummary.js";
import { Cart } from "../../data/cart.js";
import { deliveryObject } from "../../data/delivery.js";
import { itemList, loadProducts } from "../../data/products.js";

describe('Integrated test for rendering cart summary', () =>{
  const cart = new Cart('test-cart-summary');

  beforeAll(async () =>{
    await loadProducts();
  })

  beforeEach(async() => {
    cart.cartItems = [
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryId: '1'
      },
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 2,
        deliveryId: '1'
      }
    ];
    document.querySelector('.js-test-container').innerHTML = `
      <div class="cart-items"></div>
      <div class="empty-cart"></div>
      <div class="item-no"></div>
      <div class="order-summary"></div>
    `;

    await new Promise(resolve => {
      loadCart(cart);
      setTimeout(resolve, 0);
    });
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = ''
  })

  it('cart loads when not empty', () =>{
    console.log('Loaded products:', itemList.map(p => p.name));
    const [item1, item2] = cart.cartItems;
    const product1 = item1.productId;
    const product2 = item2.productId;
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
    ).toContain(`$10.90`);
    expect(
      document.querySelector(`.item-price-${product2}`).innerText
    ).toContain('$20.95');
    /*Correct delivery option checked at launch*/
    expect(
      document.getElementById(`big-delivery-1-${product1}`).checked
    ).toBe(true);
    expect(
      document.getElementById(`big-delivery-1-${product2}`).checked
    ).toBe(true);

    let name1;
    let name2;
    itemList.forEach(element => {
      if(element.id === product1) {
        name1 = element.name;
      } else if(element.id === product2) {
        name2 = element.name;
      }
    })

    expect(
      document.querySelector(`.item-name-${product1}`).innerText
    ).toContain(name1);
    expect(
      document.querySelector(`.item-name-${product2}`).innerText
    ).toContain(name2);
  })

  it('default UI when cart empty loads', () => {
    cart.cartItems = [];
    loadCart(cart);
    expect(
      document.querySelectorAll('.cart-item').length
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

  
  it('delete button works correctly', async () => {
    const [item1, item2] = cart.cartItems;
    const product1 = item1.productId;
    const product2 = item2.productId;

    // Trigger delete
    document.querySelector(`.item-quantity-delete-${product1}`).click();

    // Wait for re-render (event loop tick)
    await new Promise(resolve => {
      loadCart(cart);
      setTimeout(resolve, 0);
    });

    expect(document.querySelector(`.cart-item-${product1}`)).toBe(null);

    // Delete second item
    document.querySelector(`.item-quantity-delete-${product2}`).click();

    await new Promise(resolve => {
      loadCart(cart);
      setTimeout(resolve, 0);
    });
    
    expect(document.querySelectorAll('.cart-item').length).toBe(0);
  });

  it('update button works correctly', () => {
    const [item1, item2] = cart.cartItems;
    const product1 = item1.productId;
    const product2 = item2.productId;
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
    const [item1, item2] = cart.cartItems;
    const product1 = item1.productId;
    const product2 = item2.productId;
    
    const today = dayjs();
    let deliverydate = deliveryObject.getDelivery(7);

    expect(
      document.querySelector(`.delivery-date-${product1}`).innerText
    ).toContain(deliverydate);
    expect(
      document.querySelector(`.delivery-date-${product2}`).innerText
    ).toContain(deliverydate);

    deliverydate = deliveryObject.getDelivery(5);

    document.querySelector(`#big-delivery-2-${product1}`).click();
    expect(
      document.querySelector(`#big-delivery-2-${product1}`).checked
    ).toBe(true);
    document.querySelector(`#big-delivery-2-${product2}`).click();
    expect(
      document.querySelector(`#big-delivery-2-${product2}`).checked
    ).toBe(true);
    expect(
      document.querySelector(`.delivery-date-${product1}`).innerText
    ).toContain(deliverydate);
    expect(
      document.querySelector(`.delivery-date-${product2}`).innerText
    ).toContain(deliverydate);
  })
})