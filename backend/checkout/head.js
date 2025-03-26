import { getCartQuantity } from "../../data/cart.js";

export default function loadHeader(quantity=getCartQuantity()) {
  document.querySelector('.item-no').innerHTML = quantity;
}