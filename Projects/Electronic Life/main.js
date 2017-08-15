const Vector = require("./vector.js");
const Grid = require("./grid.js");
const World = require("./world.js");
const Wall = require("./wall.js");
const BouncingCritter = require("./bouncing_critter.js");
const WallFollower = require("./wallfollower.js");
const LifelikeWorld = require("./lifelikeWorld");
const Plant = require("./plant.js");
const PlantEater = require("./planteater.js");

const plan = [
  "############",
  "#     #    #",
  "#   ~    ~ #",
  "#  ##      #",
  "#  ##  o####",
  "#          #",
  "############"
];
const legend = {"#": Wall, "~": WallFollower, "o": BouncingCritter};

const grid = new Grid(5, 5);
console.log(grid.get(new Vector(1, 1)));
// → undefined
grid.set(new Vector(1, 1), "X");
console.log(grid.get(new Vector(1, 1)));
// → X

var world = new World(plan, legend);
console.log(world.toString());

for (var i = 0; i < 5; i++) {
  world.turn();
  console.log(world.toString());
}

var valley = new LifelikeWorld(
  ["############################",
   "#####                 ######",
   "##   ***                **##",
   "#   *##**         **  O  *##",
   "#    ***     O    ##**    *#",
   "#       O         ##***    #",
   "#                 ##**     #",
   "#   O       #*             #",
   "#*          #**       O    #",
   "#***        ##**    O    **#",
   "##****     ###***       *###",
   "############################"],
  {"#": Wall,
   "O": PlantEater,
   "*": Plant}
);

for (var i = 0; i < 5; i++) {
  valley.turn();
  console.log(valley.toString());
}
