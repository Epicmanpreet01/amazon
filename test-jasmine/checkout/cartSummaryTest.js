import loadCart from "../../backend/checkout/cartSummary.js";
import { loadFromCart } from "../../data/cart.js";



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
  })

  it('cart items load properly when not empty', () =>{
    loadCart();
  })

})