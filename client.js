'use strict';

class Client {
  get(endpoint) {
    return fetch(`http://localhost:3000/${endpoint}`).then(response => response.json());
  }
  post(endpoint, data) {
    return fetch(`http://my-json-server.typicode.com/artemkarimov/Lab4/${endpoint}`, { method: "POST", body: JSON.stringify(data) }).then(response => response.json());
  }
}

export default Client;