import { normalisePrice } from "../backend/utils.js";
import {addItems} from '../backend/index.js';

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

export function loadProducts() {

  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    itemList = JSON.parse(xhr.response).map(item =>{

      if(item.type === 'clothing') {
        return new Clothing(item);
      } else if(item.type === 'appliance') {
        return new Appliances(item);
      } else{
        return new Product(item);
      }
    });
    document.querySelector('.item-grid').innerHTML = itemList.map(addItems).join("");
  })
  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}