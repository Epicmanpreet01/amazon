import {cart, addCart, loadFromCart, updateItemQuantity, removeCartItem, updateDeliveryId, getShippingPrice, getTotalPrice} from '../../data/cart.js';

describe('Test suites: cart.js', () => {
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
  
    it('works when item already exists in cart', () => {
      addCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
      expect(cart[0].quantity).toBe(2);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(cart.length).toBe(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  
    })
  
    it('works when item does not already exist', function() {
      addCart('15b6fc6f-327a-4ec4-896f-486349e85a3d',1);
      expect(cart.length).toBe(2);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
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


    it('if new quantity = 0', () => {
      updateItemQuantity('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 0);
      expect(cart.length).toBe(0);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledTimes(0);
      expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    })

    it('if new quantity > 0', () => {
      updateItemQuantity('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 2);
      expect(cart.length).toBe(1);
      expect(cart[0].quantity).toEqual(2);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledTimes(0);
      expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    })

    it('if new quantity is undefined or negative', () => {
      updateItemQuantity('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', -1);
      expect(cart.length).toBe(1);
      expect(cart[0].quantity).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(0);
      expect(window.alert).toHaveBeenCalledTimes(1);
      
    })
    
    it('if item does not exist in cart', () => {
      updateItemQuantity('15b6fc6f-327a-4ec4-896f-486349e85a3d', 1);
      expect(cart.length).toBe(1);
      expect(cart[0].quantity).toBe(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledTimes(0);
    })
  })

  describe('test suite: removeFromCart', ()=> {
    beforeEach(() =>{
      spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryId: '1'
        }]);
      })
      loadFromCart();
      spyOn(localStorage, 'setItem');
    })

    afterEach(() => {
      localStorage.clear();
    })

    it('item exists in cart', ()=> {
      removeCartItem('15b6fc6f-327a-4ec4-896f-486349e85a3d');
      expect(cart.length).toBe(1);
      expect(cart[0]).not.toBe(null);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    })

    it('item does not exist in cart', ()=>{
      removeCartItem('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart.length).toBe(0);
      expect(cart[0]).not.toBe(null);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(cart));
    })
  })

  describe('test suite: updateDeliveryOption', ()=> {

    beforeEach(() =>{
      spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryId: '1'
        }]);
      })
      loadFromCart();
      spyOn(localStorage, 'setItem');
    })

    afterEach(() => {
      localStorage.clear();
    })

    it('updates if item exists in cart', ()=> {
      updateDeliveryId('e43638ce-6aa0-4b85-b27f-e1d07eb678c6','2');
      expect(cart[0].deliveryId).toBe('2');
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    })

    it("doesn't update or save if item doesn't exist", () => {
      updateDeliveryId('15b6fc6f-327a-4ec4-896f-486349e85a3d', '1');
      expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    })

    it("doesn't updaate or save if incorrect deliveryId used", ()=>{
      updateDeliveryId('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '4');
      expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    })
  })

  describe('test suite: getShippingPrice', ()=> {
    beforeEach(() =>{
      spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryId: '1'
        }, {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 2,
          deliveryId: '2'
        }]);
      })
      loadFromCart();
      spyOn(localStorage, 'setItem');
    })

    afterEach(() => {
      localStorage.clear();
    })

    it('correct when valid delivery id', ()=> {
      const shippingPrice = getShippingPrice();

      expect(shippingPrice).toBe(499);
    })

    it('set default when invalid delivery id', ()=> {
      cart[1].deliveryId = '4';
      const shippingPrice = getShippingPrice();

      expect(cart[1].deliveryId).toBe('1');
      expect(shippingPrice).toBe(0);
    })
  })

  describe('test suite: getTotalPrice', () =>{
    beforeEach(() =>{
      spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryId: '1'
        }, {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 2,
          deliveryId: '2'
        }]);
      })
      loadFromCart();
      spyOn(localStorage, 'setItem');
    })

    it('correct price', () => {
      const totalPrice = getTotalPrice();
      expect(totalPrice).toBe(1090+(2*2095));
    })
    
  })
})