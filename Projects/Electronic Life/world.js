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

module.exports = World;
