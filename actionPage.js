'use strict';

const view = specialOffers => {
  const action = specialOffers.find(so => so.url === window.location.hash.split('/')[1]);
  return `<div class="product">
    <img src="${action.image}" alt="" class="special_offer_img">
    <div class="product_description_so">
      <h1 class="so_name"> ${action.name} </h1>
      <p class="disc"> -${action.discount}% </p>
      <p class="descrip"> Description: ${action.description} </p>
    </div>
    <div class="to_buy">
      <div class="to_buy_box_so">
        <p class="box_price1"> Price: $${action.price} </p>
        <p class="box_price2"> $${action.oldPrice} </p>
        <button class="addBox" id="add" onclick="addToCart('${action.url}')"> Add to Cart </button>
      </div>
    </div>
  </div>`;
}

export default view;