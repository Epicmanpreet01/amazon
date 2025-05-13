export const deliveryObject = {
  delivery: [
    {
      id: '1',
      priceCents: 0,
      deliveryTime: 7
    } , {
      id: '2',
      priceCents: 499,
      deliveryTime: 5
    }, {
      id: '3',
      priceCents: 999,
      deliveryTime: 3
    }
  ],
  getDelivery(mode, referenceDate = 0) {
    let baseDate;

    if (typeof referenceDate === 'string') {
      const datePart = referenceDate.split(',')[0].trim();
      baseDate = dayjs(datePart, 'M/D/YYYY');
    }
    if (!baseDate || !baseDate.isValid()) {
      baseDate = dayjs();
    }

    let delivery = baseDate.add(mode, 'days');

    while (['Sunday', 'Saturday'].includes(delivery.format('dddd'))) {
      delivery = delivery.add(1, 'days');
    }

    return delivery.format('dddd, MMMM D');
  },

  getItemShippingPrice(deliveryId) {
    const deliveryOption = this.delivery.find(element => element.id === deliveryId);
    
    if (deliveryOption) {
      return Number(deliveryOption.priceCents);
    }
  
    return 0;
  },

  getDeliveryStatus(deliveryId, referenceDate) {
    const mode = this.getDeliveryMode(deliveryId);
    const today = dayjs().format('dddd,MMMM D');
    const deliveryDate = this.getDelivery(mode, referenceDate); 
    return today === deliveryDate;
  },

  getDeliveryMode(deliveryId) {
    return 7 - ((Number(deliveryId) - 1) * 2);
  }
}
