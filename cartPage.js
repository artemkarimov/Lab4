'use strict';

import localStorageData from './index.js';

const view = db => {
  if (!localStorage.length || !JSON.parse(localStorage.getItem('cart')).length) return;
  const added = localStorageData.getData();
  const cartProducts = [];
  for (const value of added) {
    const key = Object.keys(value)[0];
    let object;
    let id;
    if (key[0] === 'a') {
      object = db.specialOffers.find(value => value.url === key);
      id = object.url;
    }
    else {
      object = db.products.find(value => value.productID === Number(key));
      id = object.productID;
    }
    const objectCopy = Object.assign({}, object);
    objectCopy.ID = id;
    objectCopy.count = value[key];
    objectCopy.value = objectCopy.count * objectCopy.price;
    cartProducts.push(objectCopy);
  }
  const values = [];
  cartProducts.forEach(product => values.push(product.value));
  return `<h1 class="cataloguePage"> Shopping Cart </h1>
  <div class="divider"></div>
  <div id="actions">
  ${cartProducts.map(product => `
    <div class="box_sc">
      <img src="${product.image}" alt="" class="sc_product">
      <h1 class="sc_name"> ${product.name} </h1>
      <div class="quantity">
        <h1 class="quan_name"> Quantity </h1>
        <div class="count_box_container" id="count_box">
          <button class="minus_button" id="minus_button" onclick="less('${product.ID}')"> – </button>
          <div class="count_box"> <p class="number_sc"> ${product.count} </p> </div>
          <button class="plus_button" id="plus_button" onclick="more('${product.ID}')"> + </button>
        </div>
      </div>
      <div class="quantity">
        <h1 class="cost_name"> Cost </h1>
          <p class="cost_sc"> $${(product.count * product.price).toFixed(2)} </p>
      </div>
      <div class="rm">
        <button class="remove" onclick="remove('${product.ID}')"> </button>
      </div>
    </div>
    `)}
  </div>
  <h1 class="total"> Total: $${values.reduce((prev, curr) => prev + curr).toFixed(2)} </h1>
  <button class="makeOrder" id="makeOrder" onclick="order()"> Order </button>`
};

export default view;