'use strict';

const view = products => {
  const category = window.location.hash.split('/')[1];
  const categoryProducts = products.filter(product => product.category === category);
  const comics = [];
  const graphicNovels = [];
  if (categoryProducts.length > 7) {
    comics.push(...categoryProducts.slice(0, 7));
    graphicNovels.push(...categoryProducts.slice(7, categoryProducts.length));
    return `<h1 class="cataloguePage"> ${categoryProducts[0].categoryName} </h1>
      <div class="divider"></div>
      <div class="DCComics">
        <h2 class="section"> Comics </h2>
        <div class="comicsInCategory">
          <ul id="listOfComics" class="list">
            ${comics.map(product => `<li class="item-a">
              <div class="catalogueBox">
                <img src="${product.image}" class="comics_image_catalogue" alt="darkknight">
                <a href="#${product.url}" class="comic_book_catalogue"> ${product.name} </a>
                <p class="descriptionCatalogue"> Price: $${product.price} </p>
                <button class="addCategory" id="add1" onclick="addToCart(${product.productID})"> Add to Cart </button>
              </div>
            </li>
            `).join('')}
          </ul>
        </div>
      </div>
      <div class="divider"></div>
      <h2 class="section"> Graphic Novels </h2>
      <div class="gnInCatalogue">
        <ul id="listOfComics" class="list">
          ${graphicNovels.map(product => `<li class="item-a">
            <div class="catalogueBox">
              <img src="${product.image}" class="comics_image_catalogue" alt="darkknight">
              <a href="#${product.url}" class="comic_book_catalogue"> ${product.name} </a>
              <p class="descriptionCatalogue"> Price: $${product.price} </p>
              <button class="addCategory" id="add1" onclick="addToCart(${product.productID})"> Add to Cart </button>
            </div>
          </li>
          `).join('')}
        </ul>
      </div>`;
  }
  else {
    return `<h1 class="cataloguePage"> ${categoryProducts[0].categoryName} </h1>
      <div class="divider"></div>
      <div class="oneSection">
      <h2 class="section"> Comics </h2>
      <div class="comicsInCategory">
        <ul id="listOfComics" class="list">
        ${categoryProducts.map(product => `<li class="item-a">
            <div class="catalogueBox">
              <img src="${product.image}" class="comics_image_catalogue">
              <a href="#${product.url}" class="comic_book_catalogue"> ${product.name} </a>
              <p class="descriptionCatalogue"> Price: $${product.price} </p>
              <button class="addCategory" id="add1" onclick="addToCart(${product.productID})"> Add to Cart </button>
            </div>
          </li>
          `).join('')}
        </ul>
      </div>`;
  }
};

export default view;