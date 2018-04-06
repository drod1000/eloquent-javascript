var bigOak = require("./crow-tech").bigOak;
var defineRequestType = require("./crow-tech").defineRequestType;

function storage(nest, name) {
  return new Promise(resolve => {
    nest.readStorage(name, result => resolve(result));
  });
}

storage(bigOak, "enemies")
  .then(value => console.log("Got", value));