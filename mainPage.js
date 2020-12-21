'use strict';

const view = db => {
  const topFive = db.products.filter(product => db.topFiveProducts.includes(product.productID));
  return `<div class="specialOffers">
   <div class="container">
    <div class="slides">
    ${db.specialOffers.map(so => `
      <img src="${so.image}" class="so" id="so${so.specialOfferID}">
      <a href="#action/${so.url}" class="link${so.specialOfferID}" id="link${so.specialOfferID}"> Find Out More </a>
    `).join('')}
      </div>
    </div>
    <div class="radios">
    ${db.specialOffers.map(so => `<input type="radio" id="slide${so.specialOfferID}">`).join('')}
    </div>
  </div>
  <div class="top5">
    <h1 class="title"> Top 5 Comics This Month </h1>
    <div class="comics">
      <ul id="listOfComics" class="list">
      ${topFive.map((product, index) => `
        <li class="item-a">
            <div class="box">
              <img src="${product.image}" class="comics_image">
              <p class="number"> ${index + 1} </p>
              <a class="comic_book" href="#${product.url}"> ${product.name} </a>
              <p class="description"> Publisher: ${product.publisher} <br> Price: $${product.price} </p>
              <button class="add" id="add1" onclick="addToCart(${product.productID})"> Add to Cart </button>
            </div>
          </li>
      `)}
        </ul>
      </div>
    </div>
    <div class="about">
      <h1 class="about_us"> About Us </h1>
      <div class="info_logo">
        <h2 class="information"> The Comic Shop is the Internet shop that has been around since 2015. <br> 
          During five years we have presented our services to over 200 000 clients. <br> <br>
          If You're searching for all things comics, you've found the right place. <br>
          Here You can find comics from a lot of publishers like DC, Marvel, Image, <br> Dark Horse, Dynamite and others. <br>
          Also graphic novels, art books, toys, wall pictures, posters. <br> <br>
          Visit the <a href="#catalogue" class="catalogue"> Catalogue</a> page and find the comics from Your favourite publishers.
        </h2>
        <div class="photo">
          <img src="images/logo.png" alt="">
        </div>
      </div>
  `;
};

export default view;