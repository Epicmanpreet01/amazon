import { Product, Clothing, Appliances } from "../../data/products.js";
import { normalisePrice } from "../../backend/utils.js";

describe('Testing product.js', () => {
  describe('Testing Product class functionality', () => {
    const product = new Product({
      id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      image: "intermediate-composite-basketball.jpg",
      name: "Intermediate Size Basketball",
      rating: {
        stars: 4,
        count: 127
      },
      priceCents: 2095,
      keywords: [
        "sports",
        "basketballs"
      ]
    })

    it('testing getPrice', ()=> {
      expect(product.getPrice()).toBe(normalisePrice(product.priceCents));
    })

    it('testing getRatingCount', ()=> {
      expect(product.getRatingCount()).toBe(product.rating.count);
    })

    it('testing getRatingUrl', ()=> {
      expect(product.getRatingUrl()).toContain(product.rating.stars * 10);
    })

  })

  describe('Testing Clothing class functionality', ()=> {
    const clothing = new Clothing({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: [
        "socks",
        "sports",
        "apparel"
      ],
      type: 'clothing',
      sizeChartLink: 'clothing-size-chart.png'
    })

    it('testing extraInfoHTML', ()=> {
      expect(clothing.extraInfoHTML()).toContain(clothing.sizeChartLink);
    })
  })

  describe('Testing Applienace class functionality', ()=> {
    const appliance = new Appliances({
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197
      },
      priceCents: 1899,
      keywords: [
        "toaster",
        "kitchen",
        "appliances"
      ],
      type: 'appliance',
      instructionsLink: 'appliance-instructions.png',
      warrantyLink: 'appliance-warranty.png'
    })

    it('testing extraInfoHTML', ()=> {
      expect(appliance.extraInfoHTML()).toContain(appliance.instructionsLink);
      expect(appliance.extraInfoHTML()).toContain(appliance.warrantyLink);
    })
  })
})