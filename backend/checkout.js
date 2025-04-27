import {cart as cartObj} from '../data/cart.js';
import loadCart from "./checkout/cartSummary.js";
import loadHeader from './checkout/head.js';
import loadOrderSummary from "./checkout/orderSummary.js";
import { asyncLoadProducts, loadProducts } from '../data/products.js';


loadProducts(checkOutLoader);

export default function checkOutLoader(cart = cartObj) {
    loadCart(cart);
    loadHeader(cart.getCartQuantity());
    loadOrderSummary(cart, cart.getCartQuantity());
}