'use strict';

import Client from './client.js';
import TemplateProcessor from './templateProcessor.js';
import Router from './router.js';

const router = new Router();
const templateProcessor = new TemplateProcessor();
const client = new Client();

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const mainFunction = async () => {
  let back = false;
  if (window.location.hash === '' && previousHash !== '') back = true;
  if (previousHash !== window.location.hash) {
    window.scrollTo(0, 0);
    document.getElementById('mainpart').innerHTML = '<img src="images/loader.gif" class="loader">';
    await sleep(500);
    previousHash = window.location.hash;
  }
  if (window.location.hash === '#cart' && (!localStorage.length || !JSON.parse(localStorage.getItem('cart')).length)) {
    window.location.hash = '';
    back = true;
  }
  check();
  const { viewName, endpointName } = router.getCurrentState();
  let view;
  if (viewName !== 'acceptedOrderPage') {
    import (`./${viewName}.js`)
      .then((viewModule) => {
        view = viewModule.default;
        return client.get(endpointName);
      })
      .then(data => {
        templateProcessor.render(view(data));
      });
  }
  if (back) {
    await sleep(500);
    slider();
  }
};

const check = () => {
  const body = document.getElementsByTagName('body')[0];
  const withNoGN = ['#category/image', '#category/darkhorse', '#category/dynamite'];
  if (withNoGN.includes(window.location.hash) || window.location.hash.includes('action')) {
    body.style.overflowY = 'hidden';
  }
  else body.style.overflowY = 'scroll';
  if (window.location.hash.includes('orders')) body.style.maxHeight = '100vh';
  if (window.location.hash === '#cart') {
    if (localStorageData.getData().length === 3) body.style.maxHeight = '100vh';
    if (localStorageData.getData().length === 2) body.style.overflowY = 'hidden';
    if (localStorageData.getData().length === 1) {
      body.style.overflowY = 'hidden';
      document.getElementById('footer').style.marginTop = '24vh';
    }
    else document.getElementById('footer').style.marginTop = '0vh';
  }
  else document.getElementById('footer').style.marginTop = '0vh';
};

const orderDetails = () => {
  const details = {
    clientMame: document.getElementById('field1').value,
    clientSurname: document.getElementById('field2').value,
    clientPhoneNumber: document.getElementById('field3').value,
    clientEmail: document.getElementById('field4').value,
    clientCity: document.getElementById('field5').value,
    orderDate: (new Date).toDateString(),
    orderTime: `${(new Date).getHours()}:${(new Date).getMinutes()}:${(new Date).getSeconds()}`
  }
  return details;
}

const circle = document.getElementById('circle');

const slider = () => {
  const firstSlide = document.getElementById('slide1');
  let checked = firstSlide;
  for (let i = 1; i <= 5; i++) {
    const radio = document.getElementById(`slide${i}`);
    const margin = 0 + 20 * (i - 1);
    radio.addEventListener('click', () => {
      document.getElementById('so1').style.marginLeft = `-${margin}%`;
      for (let j = 1; j <= 5; j++) {
        document.getElementById(`link${j}`).style.marginLeft = `-${margin}%`;
      }
      count = i;
    });
  }
  for (let i = 1; i <= 5; i++) {
    const slide = document.getElementById(`slide${i}`);
    slide.addEventListener('click', () => {
      if (checked && checked !== slide) {
        checked.checked = false;
      }
      checked = slide;
    });
  }
  let count = 1;
  const animation = () => {
    if (window.location.hash !== '') {
      clearInterval(interval);
      return;
    }
    document.getElementById(`slide${count}`).click();
    if (count === 5) count = 1;
    else count++;
  };
  const interval = setInterval(animation, 5000);
};

let previousHash;

window.addEventListener('hashchange', () => {
  mainFunction();
});

globalThis.checkingValidity = fieldID => {
  const field = document.getElementById(fieldID);
  if (!field.checkValidity()) field.style.border = '2px solid red';
  else field.style.border = '2px solid green';
  const fields = [];
  for (let i = 1; i <= 5; i++) {
    const field = document.getElementById(`field${i}`);
    fields.push(field);
  }
  const valid = fields.filter(field => field.style.border === '2px solid green');
  if (valid.length === 5) {
    document.getElementById('confirm').style.opacity = 1;
    document.getElementById('confirm').style.cursor = 'pointer';
  }
  else {
    document.getElementById('confirm').style.opacity = 0.5;
    document.getElementById('confirm').style.cursor = 'default';
  };
}

window.addEventListener('load', () => {
  window.location.hash = '#';
  previousHash = '#';
  if (!localStorage.length || !JSON.parse(localStorage.getItem('cart')).length) circle.innerText = 0;
  else circle.innerText = localStorageData.getProductNumber().reduce((prev, curr) => prev + curr);
  mainFunction();
});

class LocalStorageData {
  constructor(key) {
    this.key = key;
  }

  getData() {
    const data = localStorage.getItem(this.key);
    if (data) return JSON.parse(data);
  }

  setData(data) {
    const previousData = JSON.parse(localStorage.getItem(this.key));
    const object = {};
    if (!previousData) {
      object[data] = 1;
      localStorage.setItem(this.key, JSON.stringify([object]));
    }
    else {
      let present = false;
      for (const product of previousData) {
        if (Object.keys(product)[0] == data) {
          present = true;
          product[data]++;
          localStorage.setItem(this.key, JSON.stringify(previousData));
        }
      }
      if (!present) {
        object[data] = 1;
        previousData.push(object);
        localStorage.setItem(this.key, JSON.stringify(previousData));
      }
    }
  }
  
  getProductNumber() {
    const data = JSON.parse(localStorage.getItem(this.key));
    const count = [];
    for (const value of data) {
      count.push(Number(value[Object.keys(value)[0]]));
    }
    return count;
  }

  lowerProducts(productID) {
    const data = JSON.parse(localStorage.getItem(this.key));
    const product = data.find(value => Object.keys(value)[0] == productID);
    if (Number(product[Object.keys(product)[0]]) > 0) product[Object.keys(product)[0]]--;
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  removeProduct(productID) {
    const data = JSON.parse(localStorage.getItem(this.key));
    const product = data.find(value => Object.keys(value)[0] == productID);
    const index = data.indexOf(product);
    data.splice(index, 1);
    localStorage.setItem(this.key, JSON.stringify(data));
  }
}

globalThis.getStatus = async () => {
  if (document.getElementById('confirm').style.opacity != 1) return;
  document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
  let orderDet = orderDetails();
  let view;
  document.getElementById('mainpart').innerHTML = '<img src="images/loader.gif" class="loader">';
  await sleep(1000);
  import (`./acceptedOrderPage.js`)
    .then((viewModule) => {
    view = viewModule.default;
    return client.post('orders', orderDet);
  }).then((data) => {
    globalThis.history.pushState({}, null, `#order/${data.id}`)
    templateProcessor.render(view(data));
    circle.innerText = `0`;
    localStorage.clear();
  });
  previousHash = window.location.hash;
};

const localStorageData = new LocalStorageData('cart');

globalThis.addToCart = product => {
  localStorageData.setData(product);
  circle.innerText = localStorageData.getProductNumber().reduce((prev, curr) => prev + curr);
};

globalThis.more = product => {
  localStorageData.setData(product);
  circle.innerText = localStorageData.getProductNumber().reduce((prev, curr) => prev + curr);
  mainFunction();
};

globalThis.less = product => {
  localStorageData.lowerProducts(product);
  circle.innerText = localStorageData.getProductNumber().reduce((prev, curr) => prev + curr);
  mainFunction();
};

globalThis.remove = product => {
  localStorageData.removeProduct(product);
  if (!JSON.parse(localStorage.getItem('cart')).length) circle.innerText = 0;
  else circle.innerText = localStorageData.getProductNumber().reduce((prev, curr) => prev + curr);
  mainFunction();
};

globalThis.order = () => {
  window.location.hash = '#orders';
};

globalThis.toMain = () => {
  window.location.hash = '#';
};

export default localStorageData;