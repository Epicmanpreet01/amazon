import { normalisePrice } from "../backend/utils.js";

console.log('Test suite: normalisePrice');

console.log('Base case: 2095');
if(normalisePrice(2095) === '20.95') {
  console.log('passed');
} else{
  console.log('failed')
}

console.log('edge case: 2000.4');
if(normalisePrice(2000.4) === '20.00') {
  console.log('passed');
} else{
  console.log('failed');
}

console.log(normalisePrice(-2095));
console.log(normalisePrice(-2000.4))