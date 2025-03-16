import {cart, addCart, loadFromCart, updateItemQuantity} from '../../data/cart.js';

describe('Unit Test suites for cart.js', () => {
  describe('Test suite: addCart', () => {
  
    beforeEach(() =>{
      spyOn(localStorage, 'getItem').and.callFake(() =>{
        return JSON.stringify([{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryId: '1'
        }]);
      })
      loadFromCart();
      spyOn(localStorage, 'setItem');
    })
  
    afterEach(() =>{
      localStorage.clear();
    })
  
    it('item exists in cart', () => {
      addCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
      expect(cart[0].quantity).toBe(2);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(cart.length).toBe(1);
  
    })
  
    it('item does not exists in the cart', function() {
      addCart('15b6fc6f-327a-4ec4-896f-486349e85a3d',1);
      expect(cart.length).toBe(2);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  
    })
  })


  describe('test suite: updateItemQuantity', () =>{

    beforeEach(() =>{
      spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryId: '1'
        }]);
      })
      loadFromCart();
      spyOn(window,'alert');
      spyOn(localStorage, 'setItem');
    })

    afterEach(() => {
      localStorage.clear();
    })


    it('test case: if new quantity = 0', () => {
      updateItemQuantity('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 0);
      expect(cart.length).toBe(0);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledTimes(0);
    })

    it('test case: if new quantity > 0', () => {
      updateItemQuantity('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 2);
      expect(cart.length).toBe(1);
      expect(cart[0].quantity).toEqual(2);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledTimes(0);
    })

    it('test case: if new quantity is undefined or negative', () => {
      updateItemQuantity('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', -1);
      expect(cart.length).toBe(1);
      expect(cart[0].quantity).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(0);
      expect(window.alert).toHaveBeenCalledTimes(1);
    })
    
    it('edge case: if item does not exist in cart', () => {
      updateItemQuantity('15b6fc6f-327a-4ec4-896f-486349e85a3d', 1);
      expect(cart.length).toBe(1);
      expect(cart[0].quantity).toBe(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledTimes(0);
    })
  })
})