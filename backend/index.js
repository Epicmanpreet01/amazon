function addItems(item) {
  return `<div class="item" id="${item.id}">
          <div class="img-container">
              <img src="assets/img/product/${item.image}" alt="item-pic" class="item-img">
          </div>
          <div class="item-info-container">
              <p class="item-name">${item.name}</p>
          </div>
          <div class="rating">
            <div class="rating-star-container">
              <img src="assets/img/ratings/rating-${item.rating.stars * 10}.png" class="rating-star">
            </div>
            <p class="rating-number">${item.rating.count}</p>
          </div>
          <div class="price-container">
              <p class="price">$${(item.priceCents / 100).toFixed(2)}</p>
          </div>
          <div class="item-selection-container">
              <select name="item-no" class="item-no" id="${item.id + '-selector'}">
                  ${Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('')}
              </select>
          </div>
          <div class="add-message" id="${item.id + '-message'}">
            <img src="assets/img/product/checkmark.png">
            Added
          </div>
          <button class="add-to-cart" id="${item.id}-btn" data-product-id="${item.id}">Add to Cart</button>
      </div>`;
}

function searchItems(key) {
  const itemGrid = document.querySelector('.item-grid');
  let results = "";

  itemList.forEach((item) => {
    if (!key || item.name.toLowerCase().includes(key.toLowerCase())) {
      results += addItems(item);
    }
  });

  itemGrid.innerHTML = results || '<p class="no-results">No matches found for your search.</p>';

  document.querySelector('.search-bar').value = "";
}
document.querySelector('.item-grid').innerHTML = itemList.map(addItems).join("");

document.querySelector('.search-bar').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    const searchKey = this.value.trim().toLowerCase();
    searchItems(searchKey);
  }
});

document.querySelector('.search-btn').addEventListener('click', function() {
  searchItems(document.querySelector('.search-bar').value.trim().toLowerCase());
});

/*Add to cart*/


/*add message*/

let addMessageTimeOutId;

function showAddMessage(id){
  document.getElementById(id+"-message").classList.remove('fade-message');
  document.getElementById(id+'-message').classList.add('visible-message');
}

function fadeAddMessage(id){
  document.getElementById(id+'-message').classList.remove('visible-message');
  document.getElementById(id+"-message").classList.add('fade-message');
}

document.querySelectorAll('.add-to-cart').forEach(function(element) {
  element.addEventListener('click', function() {
    const id = this.id.replace("-btn","");
    showAddMessage(id);
    addMessageTimeOutId = setTimeout(function() {
      fadeAddMessage(id);
    }, 2000);

    const productId = this.dataset.productId;
    const quantity = parseInt(document.getElementById(id+'-selector').value);
    document.getElementById(id+'-selector').value = '1';

    addCart(productId,quantity);

  })
  clearTimeout(addMessageTimeOutId);
})




/*cart*/

function addCart(id,quantity){
  let inCart = false

  cart.forEach((item) => {
    if(item.productId === id) {
      item.quantity +=quantity;
      inCart = true;
    }
  })

  if(!inCart) {
    cart.push({
      productId: id,
      quantity: quantity
    })
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  updateCartQuantity();
}



const updateCartQuantity = () =>{
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity +=item.quantity;
  })

  document.querySelector('.cart-item-no').innerText = cartQuantity;
} 

/*Item Selector*/

let selectorFlag = []


document.querySelectorAll('.item-no').forEach(function (element) {
  element.addEventListener('click', function() {
    itemSelector(this.id);
  })
});

document.body.addEventListener('keydown', function(event) {
  if(selectorFlag.length !== 0){
    if(event.key === 'Escape'){
      emptySelectorFlag();
    }
  }
});

document.body.addEventListener('click', function(event) {
  if(!selectorFlag.includes(event.target.id) && selectorFlag.length !== 0) {
    emptySelectorFlag();
  }
});

function itemSelector(id) {
  if(!selectorFlag.includes(id) && selectorFlag.length === 0){
    document.getElementById(id).style.border = '1px solid orange';
    selectorFlag.push(id);
  } else if(!selectorFlag.includes(id) && selectorFlag.length !== 0){
    emptySelectorFlag();
    document.getElementById(id).style.border = '1px solid orange';
    selectorFlag.push(id);
  } else{
    document.getElementById(id).style.border = '1px solid rgb(240,240,240)';
    selectorFlag.pop();
  }
}

function emptySelectorFlag() {
  const lastElement = selectorFlag.pop();
  document.getElementById(lastElement).style.border = '1px solid rgb(240,240,240)';
}