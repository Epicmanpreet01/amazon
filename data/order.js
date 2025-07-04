class OrderList {
  #localStorageKey;
  orderList;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.orderList = this.#loadOrders() || [];
  }

  #loadOrders() {
    return JSON.parse(localStorage.getItem(this.#localStorageKey));
  }

  #updateOrders() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.orderList));
  }

  createUniqueID() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  createOrderObject(cart) {
    this.orderList.unshift({
      id : this.createUniqueID(),
      orderTime : new Date().toLocaleString(),
      totalCostCents : (cart.getTotalPrice() + cart.getShippingPrice()) * 1.1,
      products : cart.cartItems
    });

    this.#updateOrders();
  }

  returnItemObj(orderId, productId) {
    const order = this.orderList.find(order => order.id === orderId);
    const item = order.products.find(item => item.productId === productId);
    return item;
  }

  returnOrderTime(orderId) {
    return this.orderList.find(item => item.id === orderId).orderTime;
  }
}

export const orders = new OrderList('orders');