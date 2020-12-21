'use strict';

import localStorageData from './index.js';

const view = db => {
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
  return `<h1 class="cataloguePage"> Confirm Your Order </h1>
  <div class="fields">
    <form class="leftfields">
      <p class="fieldName" id="fieldName"> Name * </p>
      <input type="text" class="field" id="field1" size="40"  required pattern="[A-Z][a-z]*" oninput="checkingValidity('field1')">
      <p class="fieldName" id="fieldName"> SurName * </p>
      <input type="text" class="field" id="field2" size="40" required pattern="[A-Z][a-z]*" oninput="checkingValidity('field2')">
      <p class="fieldName" id="fieldName"> Phone Number * </p>
      <input type="tel" class="field" id="field3" size="40" required pattern="[+][3][8][0][0-9]{9}" oninput="checkingValidity('field3')">
      <p class="fieldName" id="fieldName"> E-mail * </p>
      <input type="text" class="field" id="field4" size="40" required pattern="[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*" oninput="checkingValidity('field4')">
      <p class="fieldName" id="fieldName"> City * </p>
      <input type="text" class="field" id="field5" size="40" required pattern="[A-Z][a-z]*" oninput="checkingValidity('field5')">
    </form>
    <p class="required"> * - required fields </p>
  </div>
  <h1 class="total"> Order Cost: $${values.reduce((prev, curr) => prev + curr).toFixed(2)} </h1>
  <button class="confirm" id="confirm" onclick="getStatus()"> Confirm </button>`
};

export default view;