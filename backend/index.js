const itemList = JSON.parse(localStorage.getItem('items')) || [
    ['Black and Gray Athletic Cotton Socks - 6 Pairs', 'athletic-cotton-socks-6-pairs.jpg',87,10.90],
    ['Intermediate Size Basketball','intermediate-composite-basketball.jpg',127,20.95],
    ['Adults Plain Cotton T-Shirt - 2 Pack','adults-plain-cotton-tshirt-2-pack-teal.jpg',56,7.99],
    ['2 Slot Toaster - Black','black-2-slot-toaster.jpg',2197,18.99],
    ['6 Piece White Dinner Plate Set','6-piece-white-dinner-plate-set.jpg',37,20.67],
    ['6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set','6-piece-non-stick-baking-set.webp',175,34.99],
    ['Plain Hooded Fleece Sweatshirt','plain-hooded-fleece-sweatshirt-yellow.jpg',320,24.00],
    ['Luxury Towel Set - Graphite Gray','luxury-tower-set-6-piece.jpg',144,35.99],
    ['Liquid Laundry Detergent, 110 Loads, 82.5 Fl Oz','liquid-laundry-detergent-plain.jpg',305,28.99],
    ['Waterproof Knit Athletic Sneakers - Gray','knit-athletic-sneakers-gray.jpg',89,33.90],
    ["Women's Chiffon Beachwear Cover Up - Black",'women-chiffon-beachwear-coverup-black.jpg',235,20.70],
    ['Round Sunglasses','round-sunglasses-black.jpg',30,15.60]
];


itemList.forEach(function(item) {
    const itemGrid = document.querySelector('.item-grid');
    itemGrid.innerHTML += `<div class="item">
            <div class="img-container">
                <img src="assets/img/${item[1]}" alt="item-pic" class="item-img">
            </div>
            <div class="item-info-container">
                <p class="item-name">${item[0]}</p>
            </div>
            <div class="rating">
                <div class="rating-stars">
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                <span class="fa fa-star"></span> 
                </div>
                <p class="rating-number">${item[2]}</p>
            </div>
            
            <div class="price-container">
                <p class="price">$${item[3].toFixed(2)}</p>
            </div>
            
            <div class="item-selection-container">
                <select name="item-no" class="item-no">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>
            
            <button class="add-to-cart">Add to Cart</button>
        </div>`;
});