import loadCart from "./checkout/cartSummary.js";
import loadHeader from './checkout/head.js';
import loadOrderSummary from "./checkout/orderSummary.js";

export default function checkOutLoader() {
    loadCart();
    loadHeader();
    loadOrderSummary();


}

checkOutLoader();