import loadCart from "./checkout/cartSummary.js";
import loadHeader from './checkout/head.js';
import loadOrderSummary from "./checkout/orderSummary.js";
// import '../data/car.js';
// import cart from '../data/cart-oop.js';
// import {cart, businessCart} from '../data/cart-class.js';

export default function checkOutLoader() {
    loadCart();
    loadHeader();
    loadOrderSummary();
}

checkOutLoader();