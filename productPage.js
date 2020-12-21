'use strict';

const view = products => {
  const product = products.find(product => product.url === window.location.hash.slice(1));
  if (!product) {
    window.location.hash = '#';
    return;
  }
  const relatedPtoducts = products.filter(prod => product.relatedProducts.includes(prod.productID));
  return `<div class="product">
      <div class="pp_container" id="pp_container">
        <img src="${product.image}" id="pp_img">
      </div>
      <div class="product_description">
        <h1> ${product.name} </h1>
        <p class="descrpoint"> Publisher: ${product.publisher} </p>
        <p class="descrpoint"> Type: ${product.type} </p>
        <p class="descrpoint"> Written by: ${product.written} </p>
        <p class="descrpoint"> Art by: ${product.art} </p>
        <p class="descrpoint"> Cover by: ${product.cover} </p>
        <p class="descrpoint"> Year: ${product.year} </p>
        <p class="descrpoint"> Language: ${product.language} </p>
        <p class="descr"> Description: ${product.description}</p>
      </div>
      <div class="to_buy">
        <div class="to_buy_box">
          <p class="box_price"> Price: $${product.price} </p>
          <button class="addBox" id="add" onclick="addToCart(${product.productID})"> Add to Cart </button>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="related_products">
      <h1 class="rel"> Related Comics </h1>
      <div class="related_comics">
        <ul id="listOfComics" class="list">
          ${relatedPtoducts.map(product => `<li class="item-a">
            <div class="catalogueBox">
              <img src="${product.image}" class="comics_image_catalogue">
              <a class="comic_book_catalogue" href="#${product.url}"> ${product.name} </a>
              <p class="descriptionCatalogue"> Price: $${product.price} </p>
              <button class="addCatalogue" id="add2" onclick="addToCart(${product.productID})"> Add to Cart </button>
            </div>
          </li>
          `).join('')}
        </ul>
      </div>`
};

export default view;
