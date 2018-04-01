var box = {
  locked: true,
  unlock: function() { this.locked = false; },
  lock: function() { this.locked = true; },
  withBoxUnlocked: function(func) {
    this.unlock();
    try { 
      func();
    } catch(e) {
      console.log("Caught function error");
    } finally {
      this.lock();
    }
  },
  _content: [],
  getContent() {
    if (this.locked) { 
      throw new Error("Locked!")
    }
    return this._content;
  }
}

function noError() {
  console.log("Just a regular function");
}

function withError() {
  throw new Error("Just a function that throws an error");
}

box.unlock();
box.withBoxUnlocked(noError);
try {
  box.getContent();
}
catch(e) {
  console.log("Unlocked, no error, is locked");
}

box.unlock();
box.withBoxUnlocked(withError);
try {
  box.getContent();
}
catch(e) {
  console.log("Unlocked, error, is locked");
}

box.lock();
box.withBoxUnlocked(noError);
try {
  box.getContent();
}
catch(e) {
  console.log("Locked, no error, is locked");
}

box.lock();
box.withBoxUnlocked(withError);
try {
  box.getContent();
}
catch(e) {
  console.log("Locked, error, is locked");
}