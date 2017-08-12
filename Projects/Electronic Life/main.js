const Vector = require("./vector.js");
const Grid = require("./grid.js");
const World = require("./world.js");
const Wall = require("./wall.js");
const BouncingCritter = require("./bouncing_critter.js");

const plan = [
  "############################",
  "#      #    #      o      ##",
  "#                          #",
  "#          #####           #",
  "##         #   #    ##     #",
  "###           ##     #     #",
  "#           ###      #     #",
  "#   ####                   #",
  "#   ##       o             #",
  "# o  #         o       ### #",
  "#    #                     #",
  "############################"
];
const legend = {"#": Wall, "o": BouncingCritter};

const grid = new Grid(5, 5);
console.log(grid.get(new Vector(1, 1)));
// → undefined
grid.set(new Vector(1, 1), "X");
console.log(grid.get(new Vector(1, 1)));
// → X

var world = new World(plan, legend);
console.log(world.toString());
