class Order {
  #localStorageKey;
  orderList = JSON.parse(localStorage.getItem(this.#localStorageKey)) || {
    'b04750f8-1516-09d3-6fbd-989c6dae0ac4' : [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 2,
      deliveryId: '2'
    }], 'b04750f8-1516-09d3-6fbd-989c6dae0ac5' : [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 2,
      deliveryId: '2'
    }]
  }

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
  }

  #loadOrders() {
    this.orderList = JSON.parse(localStorage.getItem(this.#localStorageKey));
  }

  #updateOrders() {
    this.orderList = localStorage.setItem(JSON.stringify(this.#localStorageKey));
  }



  addOrder(cartItems) {
    this.orderList[]
  }
}


const orders = new Order('orders');