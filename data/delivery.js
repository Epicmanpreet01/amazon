export const delivery = [
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
]

export function getDelivery(mode) {
  const today = dayjs();

  const delivery =  today.add(mode, 'days');

  return delivery.format('dddd,'+' MMMM D');
}

export function getItemShippingPrice(deliveryId) {
  const deliveryOption = delivery.find(element => element.id === deliveryId);
  
  if (deliveryOption) {
    return Number(deliveryOption.priceCents);
  }

  return 0;
}