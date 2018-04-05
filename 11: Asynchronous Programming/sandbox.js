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

defineRequestType("note", (nest, content, source, done) => {
  console.log(`${nest.name} received note: ${content}`);
  done();
});

bigOak.send("Cow Pasture", "note", "Let's caw loudly at 7PM",
            () => {
              //Log of handler function defined above confirms that message was received
              console.log("Note delivered.")
            });