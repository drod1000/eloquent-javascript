var bigOak = require("./crow-tech").bigOak;
var defineRequestType = require("./crow-tech").defineRequestType;

//Callback Example
bigOak.readStorage("food caches", caches => {
  //Callback function will be called by read storage
  let firstCache = caches[0];
  bigOak.readStorage(firstCache, info => {
    //Callback function will be called by read storage
    console.log(info);
  });
});
