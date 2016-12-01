/*
http://adventofcode.com/2016/day/1

--- Day 1: No Time for a Taxicab ---

You're airdropped near Easter Bunny Headquarters in a city somewhere. "Near", unfortunately, is as close as you can get - the instructions on the Easter Bunny Recruiting Document the Elves intercepted start here, and nobody had time to work them out further.

The Document indicates that you should start at the given coordinates (where you just landed) and face North. Then, follow the provided sequence: either turn left (L) or right (R) 90 degrees, then walk forward the given number of blocks, ending at a new intersection.

There's no time to follow such ridiculous instructions on foot, though, so you take a moment and work out the destination. Given that you can only walk on the street grid of the city, how far is the shortest path to the destination?

For example:

Following R2, L3 leaves you 2 blocks East and 3 blocks North, or 5 blocks away.
R2, R2, R2 leaves you 2 blocks due South of your starting position, which is 2 blocks away.
R5, L5, R5, R3 leaves you 12 blocks away.
How many blocks away is Easter Bunny HQ?

Answer: 278

--- Part Two ---

Then, you notice the instructions continue on the back of the Recruiting Document. Easter Bunny HQ is actually at the first location you visit twice.

For example, if your instructions are R8, R4, R4, R8, the first location you visit twice is 4 blocks away, due East.

How many blocks away is the first location you visit twice?

Answer: 161

*/

var input = "L1, R3, R1, L5, L2, L5, R4, L2, R2, R2, L2, R1, L5, R3, L4, L1, L2, R3, R5, L2, R5, L1, R2, L5, R4, R2, R2, L1, L1, R1, L3, L1, R1, L3, R5, R3, R3, L4, R4, L2, L4, R1, R1, L193, R2, L1, R54, R1, L1, R71, L4, R3, R191, R3, R2, L4, R3, R2, L2, L4, L5, R4, R1, L2, L2, L3, L2, L1, R4, R1, R5, R3, L5, R3, R4, L2, R3, L1, L3, L3, L5, L1, L3, L3, L1, R3, L3, L2, R1, L3, L1, R5, R4, R3, R2, R3, L1, L2, R4, L3, R1, L1, L1, R5, R2, R4, R5, L1, L1, R1, L2, L4, R3, L1, L3, R5, R4, R3, R3, L2, R2, L1, R4, R2, L3, L4, L2, R2, R2, L4, R3, R5, L2, R2, R4, R5, L2, L3, L2, R5, L4, L2, R3, L5, R2, L1, R1, R3, R3, L5, L2, L2, R5";
var directions = input.split(", ");

var my_location = [0, 0];
var visited = new Set();
var orientation = {
  x: 0,
  y: 1,
  getOrientation: function() {
    return [this.x, this.y];
  },
  rotateLeft: function() {
    [this.x, this.y] = [-1 * this.y, this.x];
  },
  rotateRight: function() {
    [this.x, this.y] = [this.y, -1 * this.x];
  }
};

directions.forEach(function(direction) {
  var turn = direction[0];
  switch(turn) {
    case "L":
      orientation.rotateLeft();
      break;
    case "R":
      orientation.rotateRight();
      break;
  }
  var distance = Number(direction.slice(1));
  var unitInOrientation = orientation.getOrientation();
  for (var a = 0; a < distance; a++) {
    for (var i = 0; i < unitInOrientation.length; i++) {
      my_location[i] += unitInOrientation[i];
    }
    if (visited.has(my_location.toString())) {
      console.log("Already visited location: " + my_location);
      console.log("Already visited location: " + my_location.map(Math.abs).reduce((a, b) => a + b));
    } else {
      visited.add(my_location.toString());
    }
  }
})
console.log("Final location: " + my_location);
console.log("Final distance: " + my_location.map(Math.abs).reduce((a, b) => a + b));
