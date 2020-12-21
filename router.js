'use strict';

class Router {
  getCurrentState() {
    let viewName = '';
    let endpointName = '';
    switch (window.location.hash.split('/')[0]) {
      case '#catalogue':
        viewName = 'cataloguePage';
        endpointName = 'db';
        break;
      case '#category':
        viewName = 'categoryPage';
        endpointName = 'products';
        break;
      case '#product':
        viewName = 'productPage';
        endpointName = 'products';
        break;
      case '#cart':
        viewName = 'cartPage';
        endpointName = 'db';
        break;
      case '#orders':
        viewName = 'orderPage';
        endpointName = 'db';
        break;
      case '#action':
        viewName = 'actionPage';
        endpointName = 'specialOffers';
        break;
      default:
        window.location.hash = '#';
        viewName = "mainPage";
        endpointName = 'db';
        break;
    }
    return {
      viewName,
      endpointName
    };
  }
}

export default Router;