import { cart } from "../../data/cart.js";

export default function loadHeader(quantity=cart.getCartQuantity()) {
  document.querySelector('.item-no').innerHTML = quantity;
}