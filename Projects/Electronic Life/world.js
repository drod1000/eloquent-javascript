const Vector = require("./vector.js");
const Grid = require("./grid.js");

//Legend contains ch and object associated with it
function elementFromChar(legend, ch) {
  if (ch == " ")
    return null;
  //Looks up class and initializes
  var element = new legend[ch]();
  element.originChar = ch;
  return element;
}
//To be used when displaying world string
function charFromElement(element) {
  if (element == null)
    return " ";
  else
    return element.originChar;
}

function World(map, legend) {
  let grid = new Grid(map[0].length, map.length);
  this.grid = grid;
  this.legend = legend;
  for(let x = 0; x < map[0].length; x++) {
      for(let y = 0; y < map.length; y++) {
        grid.set(new Vector(x,y), elementFromChar(legend, map[y][x]));
      }
  }
}

World.prototype.toString = function() {
  let output = "";
  for (var y = 0; y < this.grid.height; y++) {
    for (var x = 0; x < this.grid.width; x++) {
      let element = this.grid.get(new Vector(x, y));
      output += charFromElement(element);
    }
    output += "\n";
  }
  return output;
}

World.prototype.turn = function() {
  var acted = [];
  this.grid.forEach(function(critter, vector) {
  if (critter.act && acted.indexOf(critter) == -1) {
    acted.push(critter);
    this.letAct(critter, vector);
    }
  }, this)
}

World.prototype.letAct = function(critter, vector) {
  var action = critter.act(new View(this.vector));
  if (action && action.type == "move") {
    var dest = this.checkDestination(action, vector);
    //moves critter to new location if valid and empty
    if(dest && this.grid.get(dest) == null) {
      this.grid.set(vector, null);
      this.grid.set(dest, critter);
    }
  }
}

World.prototype.checkDestination = function(action, vector) {
  if (directions.hasOwnProperty(action.direction)) {
    var dest = vector.plus(directions[action.direction]);
    if (this.grid.isInside(dest))
      return dest;
  }
};

module.exports = World;
