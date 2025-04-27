class Orders {
  orderList = [
    {
      productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
    }, {
      productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d'
    }
  ]

  #localStorageKey;

  constructor(key) {
    this.#localStorageKey = key;
  }
  
}