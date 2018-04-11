var bigOak = require("./crow-tech").bigOak;
var defineRequestType = require("./crow-tech").defineRequestType;
var everywhere = require("./crow-tech").everywhere;

function storage(nest, name) {
  return new Promise(resolve => {
    nest.readStorage(name, result => resolve(result));
  });
}

// storage(bigOak, "enemies")
//   .then(value => console.log("Got", value));

class Timeout extends Error {}

function request(nest, target, type, content) {
  return new Promise((resolve, reject) => {
    let done = false;
    function attempt(n) {
      nest.send(target, type, content, (failed, value) => {
        done = true;
        if (failed) reject(failed);
        else resolve(value);
      });
      setTimeout(() => {
        if (done) return;
        else if (n < 3) attempt(n + 1);
        else reject(new Timeout("Timed out"));
      }, 250);
    }
    attempt(1);
  });
}

function requestType(name, handler) {
  defineRequestType(name, (nest, content, source,
                           callback) => {
    try {
      Promise.resolve(handler(nest, content, source))
        .then(response => callback(null, response),
              failure => callback(failure));
    } catch (exception) {
      callback(exception);
    }
  });
}

requestType("ping", () => "pong");

function availableNeighbors(nest) {
  let requests = nest.neighbors.map(neighbor => {
    return request(nest, neighbor, "ping")
      .then(() => true, () => false);
  });
  return Promise.all(requests).then(result => {
    return nest.neighbors.filter((_, i) => result[i]);
  });
}

// availableNeighbors(bigOak).then(response => {
//   console.log(response);
// })

// import {everywhere} from "./crow-tech";


//BEGIN NETWORKING
everywhere(nest => {
  nest.state.gossip = [];
});

function sendGossip(nest, message, exceptFor = null) {
  //Documents that gossip in current nest
  nest.state.gossip.push(message);
  for (let neighbor of nest.neighbors) {
    if (neighbor == exceptFor) continue;
    //Send to every neighbor in the nest except the one who sent it
    request(nest, neighbor, "gossip", message);
  }
}

requestType("gossip", (nest, message, source) => {
  //If gossip already exists in this nest ignore it
  if (nest.state.gossip.includes(message)) return;
  console.log(`${nest.name} received gossip '${
               message}' from ${source}`);
  sendGossip(nest, message, source);
});

sendGossip(bigOak, "Kids with airgun in the park");
//END NETWORKING

//BEGIN MESSAGE ROUTING
requestType("connections", (nest, {name, neighbors}, source) => {
  let connections = nest.state.connections;
  //If connections haven't changed stop
  if (JSON.stringify(connections.get(name)) == JSON.stringify(neighbors)) return;
  //If connections have changed, set and broadcast
  connections.set(name, neighbors);
  broadcastConnections(nest, name, source);
});

function broadcastConnections(nest, name, exceptFor = null) {
  for (let neighbor of nest.neighbors) {
    if (neighbor == exceptFor) continue;
    request(nest, neighbor, "connections", { name,neighbors: nest.state.connections.get(name)});
  }
}

everywhere(nest => {
  nest.state.connections = new Map;
  nest.state.connections.set(nest.name, nest.neighbors);
  broadcastConnections(nest, nest.name);
});

function findRoute(from, to, connections) {
  let work = [{at: from, via: null}];
  for (let i = 0; i < work.length; i++) {
    let {at, via} = work[i];
    //Iterates through connections for at (from the first time)
    for (let next of connections.get(at) || []) {
      //If target is directly connected via their connections return next path
      if (next == to) return via;
      //Checks if what's currently next exists in work list as at
      //If it doesn't it adds it to work as at
      if (!work.some(w => w.at == next)) {
        //Adds paths to check in order that we come across them
        //TODO: still unclear on what via || next does
        work.push({at: next, via: via || next});
      }
    }
  }
  //If we get here there is no route
  return null;
}

function routeRequest(nest, target, type, content) {
  if (nest.neighbors.includes(target)) {
    return request(nest, target, type, content);
  } else {
    let via = findRoute(nest.name, target,
                        nest.state.connections);
    if (!via) throw new Error(`No route to ${target}`);
    return request(nest, via, "route",
                   {target, type, content});
  }
}

requestType("route", (nest, {target, type, content}) => {
  return routeRequest(nest, target, type, content);
});

routeRequest(bigOak, "Church Tower", "note",
             "Incoming jackdaws!");
//END MESSAGE ROUTING