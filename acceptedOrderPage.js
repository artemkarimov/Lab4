'use strict';

const view = data => {
  return `<h1 class="order_accepted"> Your order #${data.id} is accepted. </h1>
    <h1 class="order_accepted_ty"> Thank you for choosing The Comic Shop! </h1>
    <button class="backButton" id="backButton" onclick="toMain()"> Back to Main Page </button>`;
};

export default view;