import {cart as cartObj} from '../data/cart.js';
import loadCart from "./checkout/cartSummary.js";
import loadHeader from './checkout/head.js';
import loadOrderSummary from "./checkout/orderSummary.js";
import { loadProducts } from '../data/products.js';




export default async function checkOutLoader(cart = cartObj) {
    await loadProducts();
    loadCart(cart);
    loadHeader(cart.getCartQuantity());
    loadOrderSummary(cart, cart.getCartQuantity());
}

checkOutLoader();