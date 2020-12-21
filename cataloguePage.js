'use strict';

const view = db => {
    return `
    <h1 class="cataloguePage"> Catalogue </h1>
      ${db.catalogue.map(section => `
      <div class="divider"></div>
      <a href="#${section.url}" class="categoryName"> ${section.category} </a>
      <div class="comicsInCatalogue">
        <ul id="listOfComics" class="list">
        ${db.products.filter(product => section.products.includes(product.productID)).map(prod => `
        <li class="item-a">
          <div class="catalogueBox">
            <img src="${prod.image}" class="comics_image_catalogue" alt="friends">
            <a href="#${prod.url}" class="comic_book_catalogue"> ${prod.name} </a>
            <p class="descriptionCatalogue"> Price: $${prod.price} </p>
            <button class="addCatalogue" id="add2" onclick="addToCart(${prod.productID})"> Add to Cart </button>
          </div>
        </li>
        `).join('')}
        </ul>
        </div>
      `).join('')}
    `
};

export default view;