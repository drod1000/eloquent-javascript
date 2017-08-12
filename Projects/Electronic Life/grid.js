function Grid(width, height) {
  this.width = width;
  this.height = height;
  this.space = new Array();
  for(let i = 0; i < height; i++) {
    this.space[i] = new Array(width);
  }
}

Grid.prototype.isInside = function(vector) {
  return vector.x >= 0 && vector.x < this.width &&
         vector.y >= 0 && vector.y < this.height;
}

Grid.prototype.get = function(vector) {
  return this.space[vector.x][vector.y];
}

Grid.prototype.set = function(vector, value) {
  this.space[vector.x][vector.y] = value;
}

module.exports = Grid;
