const httpRequestLink = new XMLHttpRequest();

httpRequestLink.addEventListener('load', () => {
  console.log(httpRequestLink.response);
})

httpRequestLink.open('GET','https://supersimplebackend.dev/cart');
httpRequestLink.send();