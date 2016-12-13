/*
--- Day 13: A Maze of Twisty Little Cubicles ---

You arrive at the first floor of this new building to discover a much less welcoming environment than the shiny atrium of the last one. Instead, you are in a maze of twisty little cubicles, all alike.

Every location in this area is addressed by a pair of non-negative integers (x,y). Each such coordinate is either a wall or an open space. You can't move diagonally. The cube maze starts at 0,0 and seems to extend infinitely toward positive x and y; negative values are invalid, as they represent a location outside the building. You are in a small waiting area at 1,1.

While it seems chaotic, a nearby morale-boosting poster explains, the layout is actually quite logical. You can determine whether a given x,y coordinate will be a wall or an open space using a simple system:

Find x*x + 3*x + 2*x*y + y + y*y.
Add the office designer's favorite number (your puzzle input).
Find the binary representation of that sum; count the number of bits that are 1.
If the number of bits that are 1 is even, it's an open space.
If the number of bits that are 1 is odd, it's a wall.
For example, if the office designer's favorite number were 10, drawing walls as # and open spaces as ., the corner of the building containing 0,0 would look like this:

  0123456789
0 .#.####.##
1 ..#..#...#
2 #....##...
3 ###.#.###.
4 .##..#..#.
5 ..##....#.
6 #...##.###
Now, suppose you wanted to reach 7,4. The shortest route you could take is marked as O:

  0123456789
0 .#.####.##
1 .O#..#...#
2 #OOO.##...
3 ###O#.###.
4 .##OO#OO#.
5 ..##OOO.#.
6 #...##.###
Thus, reaching 7,4 would take a minimum of 11 steps (starting from your current location, 1,1).

What is the fewest number of steps required for you to reach 31,39?

Your puzzle answer was 96.

--- Part Two ---

How many locations (distinct x,y coordinates, including your starting location) can you reach in at most 50 steps?

Your puzzle answer was 141.
*/

// initialize board
var coordinates = [1, 1];
const officersNumber = 1358;
var width = 60;
var height = 60;
var destination = [31, 39];
var distanceMax = 50;
var maze = [];
for (var i = 0; i < height; i++) {
  var row = [];
  for (var j = 0; j < width; j++) {
    row.push(determineType([i, j]));
  }
  maze.push(row);
}

function determineType(coordinates) {
  const [x, y] = coordinates;
  const result = x*x + 3*x + 2*x*y + y + y*y;
  const sum = result + officersNumber;
  const countOnes = sum.toString(2).split('').reduce((a, b) => (b == "1") ? a + 1: a, 0);
  return countOnes % 2 == 0 ? "." : "#";
}

function getValidNeighbors(coordinates, maze) {
  const [x, y] = coordinates;
  const allNeighbors = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]];
  const potentialNeighbors = allNeighbors.filter((coord) => {
    const [x, y] = coord;
    return !(x < 0 || x >= height || y < 0 || y > width);
  });
  const validNeighbors = potentialNeighbors.filter((coord) => {
    const [x, y] = coord;
    return maze[x][y] == ".";
  });
  return validNeighbors;
}

function findShortestPath(initialCoordinates, maze) {
  var queue = [];
  var visited = new Set();
  queue.push([initialCoordinates, 0]);
  while (queue.length > 0) {
    var [coordinates, distance] = queue.shift();
    if (coordinates[0] == destination[0] && coordinates[1] == destination[1]) {
      return distance;
    }

    var neighbors = getValidNeighbors(coordinates, maze).filter((neighbor) => {
      return !visited.has(neighbor.join());
    });
    var neighborsWithDistances = neighbors.map((neighbor) => {
      return [neighbor, distance + 1];
    });
    queue.push(...neighborsWithDistances);
    neighbors.forEach((neighbor) => visited.add(neighbor.join()));
  }
  return -1;
}

var resultA = findShortestPath(coordinates, maze);
console.log(resultA);

function findWithinDistance(initialCoordinates, maze, distanceMax) {
  var queue = [];
  var visited = new Set();
  queue.push([initialCoordinates, 0]);
  while (queue.length > 0) {
    var [coordinates, distance] = queue.shift();
    if (distance == distanceMax) {
      return visited.size;
    }

    var neighbors = getValidNeighbors(coordinates, maze).filter((neighbor) => {
      return !visited.has(neighbor.join());
    });
    var neighborsWithDistances = neighbors.map((neighbor) => {
      return [neighbor, distance + 1];
    });
    queue.push(...neighborsWithDistances);
    neighbors.forEach((neighbor) => visited.add(neighbor.join()));
  }
  return -1;
}

var resultB = findWithinDistance(coordinates, maze, distanceMax);
console.log(resultB);
