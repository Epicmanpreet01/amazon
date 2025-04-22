import { normalisePrice } from "../backend/utils.js";

export class Product{
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(product) {
    this.id = product.id;
    this.image = product.image.replace('images/products/','');
    this.name = product.name;
    this.rating = product.rating;
    this.priceCents = product.priceCents;
  }

  getRatingUrl() {
    return `assets/img/ratings/rating-${this.rating.stars * 10}.png`; 
  }

  getRatingCount() {
    return this.rating.count;
  }

  getPrice() {
    return normalisePrice(this.priceCents);
  }

  extraInfoHTML() {
    return `<a style='visibility: hidden; cursor: pointer;' class='size-chart' href="assets/img/product/${this.sizeChartLink}" target="_blank">Size Chart</a>
    `;
  }
}


export class Clothing extends Product{
  type;
  sizeChartLink;

  constructor(product) {
    super(product);
    this.type = product.type;
    this.sizeChartLink = product.sizeChartLink;
  }

  extraInfoHTML() {
    return `<a class='extra-info' href="assets/img/product/${this.sizeChartLink}" target="_blank">Size Chart</a>`;
  }
}

export class Appliances extends Product {
  instructionsLink;
  warrantyLink;

  constructor(product) {
    super(product);
    this.instructionsLink = product.instructionsLink;
    this.warrantyLink = product.warrantyLink;
  }
  extraInfoHTML() {
    return `
      <a class='extra-info' href="assets/img/product/${this.instructionsLink}" target="_blank">Instructions</a>
      <a class='extra-info' href="assets/img/product/${this.warrantyLink}" target="_blank">Warranty</a>
    `;
  }
}

export let itemList = []; 

export function loadProducts(fun) {
  fetch('https://supersimplebackend.dev/products')
    .then(response => response.json())
      .then((data) => {
        itemList = data.map((element) => {
          return (element.type === 'clothing')? new Clothing(element) : new Product(element); 
        })
      })
        .then(fun);
}
