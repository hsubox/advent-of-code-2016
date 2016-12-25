/*
--- Day 24: Air Duct Spelunking ---

You've finally met your match; the doors that provide access to the roof are locked tight, and all of the controls and related electronics are inaccessible. You simply can't reach them.

The robot that cleans the air ducts, however, can.

It's not a very fast little robot, but you reconfigure it to be able to interface with some of the exposed wires that have been routed through the HVAC system. If you can direct it to each of those locations, you should be able to bypass the security controls.

You extract the duct layout for this area from some blueprints you acquired and create a map with the relevant locations marked (your puzzle input). 0 is your current location, from which the cleaning robot embarks; the other numbers are (in no particular order) the locations the robot needs to visit at least once each. Walls are marked as #, and open passages are marked as .. Numbers behave like open passages.

For example, suppose you have a map like the following:

###########
#0.1.....2#
#.#######.#
#4.......3#
###########
To reach all of the points of interest as quickly as possible, you would have the robot take the following path:

0 to 4 (2 steps)
4 to 1 (4 steps; it can't move diagonally)
1 to 2 (6 steps)
2 to 3 (2 steps)
Since the robot isn't very fast, you need to find it the shortest route. This path is the fewest steps (in the above example, a total of 14) required to start at 0 and then visit every other location at least once.

Given your actual map, and starting from location 0, what is the fewest number of steps required to visit every non-0 number marked on the map at least once?

Your puzzle answer was 518.

--- Part Two ---

Of course, if you leave the cleaning robot somewhere weird, someone is bound to notice.

What is the fewest number of steps required to start at 0, visit every non-0 number marked on the map at least once, and then return to 0?

Your puzzle answer was 716.
*/

var input = `#################################################################################################################################################################################
#...................#.#.#.........#.........#...............#.....#.....#.........#.............#.............#...#.......#.......#...#...#.......#...#...#.#...#.........#...#.#
#.#.#.#.#.#.#.#.#.#.#.#.#.###.###.#.###.#.#.#.#.#.#.#.#.###.#.#.#.#.#.#.#.#.#######.#####.###.#.###.#.#.#.#.#.#.#.#.###.#.#.#########.#.###.###.#.#.#####.#.#.#####.###.#.#.#.#.#
#...#.....#.#...#...#...#.#...#...#.....#...#.#.....#...#.......#.#.....#...........#.........#.#.....#.#...#.........#.#.....#.........#...#.....#.....#.....#...#.#.....#.....#
#.#.#.###.#.#.#.#.#.#.#.#.#.#.#.###.#####.#.###.###.#.###.###.#.#.#.#####.#####.#.#.#.#.###.#.#.#.#.#.#.#######.#.#.#####.#.#####.###.###.#.#.###.#.#.#.###.###.#.#.#.###.#.#.#.#
#.#.#...#...#...........#.......#...#.#.#.#.....#.#.......#...#...#.#.....#...#...#.#.#...........#.#...#...#...#.....#...........#...#0....#...#.#.#.....#.......#.....#...#...#
#.#.#.#.#.#.#.###########.###.###.###.#.#.#.#.#.#.#########.#####.#.#.###.#.#.#.#.#####.#.#.#.###.#.#.###.###.###.#.#.#.###.#.#.#.#.#######.#.#.#.#.#.###.#######.#######.#####.#
#.....#...#...#.#3........#.......#.#...#.#.#...#.......#.#.......#.#...#...#.#.....#...#.....#...#.#.....#.#.......#.......#...............#...#.......#.......#.#.............#
#.#.#.###.###.#.###.#.###.#.#.#.###.#.###.#.#.#######.#.#.###.#.###.#.#.#.#########.#.#.#####.#.#.#.#.#.#.#.#.#.#####.#####.#.###.###.###.###.#.#.###.#.#.###.###.###.#.###.#.###
#...#.....#.......#.#.#...#.............#...........#...........#.....#.#.......#.....#.......#.......#.#.....#.....#.....#.....#.#...#.......#.......#.#.....#.#...#.....#...#.#
#####.###.###.#.###.###.#.#.#####.#.###.#####.#.#.#.#########.#.#.###.#.#.#.#.#.#.###.###.#.#.###.###.#.#####.#.###.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#####.#.#####.#####.###.#.#.#.#
#.....#.........#.......#.#.......#.#.....#...#...#.............#.....#.......#.#...#...#...#...#.....#...#.....#.....#...#.....#...#.#...#...#...#.....#.....#.......#.#...#...#
#.#.#.#.###.#.#.#.#.#.#.#.#.#####.###.###.#####.#.#.#####.#.###.#.#.#.###.#.#.###.#.###.#.#.#.###.###.#.#.#.#########.###.#.#.#.#.#.#.#.#####.#.###.#.#.#.#.###.#.#.#.#.#.#####.#
#.....#.#.....#.....#.....#.#...............#.#.........#.....#.#.....#.....#...#.....#.#.#.#.#...#...#...............#...#.#...#...#.#.#...#.#.#.....#.....#...#...#.#...#...#.#
#.###.#.#.#.#.#.#.#.#.#####.#.#.###.#.#.###.#.#######.#.#.#.#.#.#.#########.###.#.###.###.#.#.#.#########.#.#.###.#.#.#.###.###.###.###.#.###.#.#.#.#.#.###.#.#.###.#.#.#.#.#.#.#
#.#.#.#.#.#...#...#...#.........#...........#...#...#...#.....#...#.#.#.......#.#.....#...........#.........#.......#...#.#.#...#.........#1#.#...#.#.............#...#.........#
###.#.#.###.#.#.#.#.#.#####.#########.###.#.#.#####.###.###.#.#.#.#.#.#.#.###.#.#.#.#.#.#####.#.#.#####.#######.###.#.#.#.#.#.#.#.###.#.#.#.#.###.#.#.#.#.#.###.#.#####.###.#####
#...#.#.....#.....#.........#...#...#...#...#...#.......#.......#.....#.........#.#...#.....#.#...#.....#...#...#.#.#.......#.....#.....#.#...#.#.............#.#...........#.#.#
#.#.#.#.#.###.###.#.#.###.###.###.#.#.#.#####.#.###.###.#.###.#######.###.#.###.#.#.#.#.#.#.#####.###.#.#.#.#.#.#.###########.#.#.#.#.#.#.#.#.#.#.###.###.#.###.#.#.#.###.#.#.#.#
#.........#...#.....#.#...#...#...............#.....#.......#...#.....#...#.#...#.#...#.#.........#...#.#.#.....#.....#.......#.......#.....#.#...........#.....#.#...........#.#
#####.#.#.#.#.#.###.#.#.#.#.#.#.#####.###.#.#.#.###.#.###.#.#.#.#.#.#.###.#.#.###.#.#.#.#.###.#.#.#.#####.#.#####.###.#.#.#.###.#.#.###.###.###.#####.#.#.#.#.#.#.#.###.#####.#.#
#2..........#...#...#.#...#.#.............#.#.#.......#...#.....#...........#.#...#.#.#.....#.#...#.#.#.........#...#...#.#...#.....#.........#...#...#...#.....#.....#.....#...#
#####.#.#.###.#.#####.###.#.#.#.###.###.###.###.#.###.#.#.#####.#.#.#########.#.###.#.#####.#.#####.#.#.###.#.#.#.#.###.###.#.###.#######.#############.###.###.###.###.###.#.###
#.#.......#...#...#...#.......#...........#...#.#.....#...#.......#.....#...#.....#.#.......#.........#...#.#.....#.#...#.............#.....#.............#.#...#.#...#.......#.#
#.#.#.#####.#.#.###.###.###.#.#.#.#.#.#####.#.#.#.#.###.###.#.#####.#.#####.#.#.###.#.#####.#.###.###.###.#.###.#.#.#.#.#.#########.###.###.#######.###.#.#.#.###.#####.###.#.#.#
#.....#.#...#.#.....#...#.....#...#...#...#.#...#...#.#.......#.#...#.......#.#.#.............#...#...#...#.....#.#.........#...#.#.#...#...#...........#...#.#7#.#.....#.....#.#
###.#.#.#.#.#.#.#.#.#.#.#.###.#.#.###.#.#.#.###.#.#.#.#.#.#####.#.#######.#.###.#.#.#.#.#.#####.###.#.#.#.#.#.#.#.#.#.#.#.###.###.#.#.#.#.###.#.#.###.#.#.#.###.#.###.#.#.###.#.#
#.#...#.....#.#...#.#.......#.#.......#.........#.#.#.#...............#.....#...#.#.........#.......#.#.#.#...#...#.#.#.....#.....#.#.#...#...#...#.#.#.....#...#.....#...#...#.#
#.#####.#######.#.#########.#.#.###.###.#.#####.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.###.#.#####.###.#.#.#.#.#.###.#######.#.#.###.#.#.#.###.###.#.###.###.#.#.###.#.###.#.#.#.#####.#.#
#.#.........#.#.#...#.....#.....#...#.............#...#...#.#.......#...#.#.......#.......#...#.....#...#...#.............#.#.........#...#...#...........#...#.......#.#.....#.#
#.#.#.#######.#.#.#.###.#.#.#.#.###.#.#.#.#.#.#.#.#.#####.#.#.###.#.#.#.#.#.#.#.#.###.###.###.#####.#.#.#####.#.#######.#.#.#.#.###.#.#.#.#.###.#.#.#.#.#.#####.#.#.#.#######.#.#
#...#.#.......#.#...#...........#...#.......#.....#...#.....#.........#.....#...#.........#.#...#...#...#.....#.......#...#.............#.#.........#.....#.....#.....#.#...#.#.#
#.###.#.###.#.###.#.###########.#######.###.#########.#.#.#.#.#.###.###.#.#.#.###.#.###.###.#.#.#.#.#.#.#.###.#.#####.#####.#.###.###.#.#.#.#######.###.#.#.#####.###.#.#.###.#.#
#.#.....#.....#.#.....#4........#...#...#.#.....#...#.#.#...#.#.........#.....#.......#.#.......#.#.....#.....#...............#.....#.#.#.#...#.........#...#...#.........#...#.#
###.#####.#.#.#.#########.#.#.#####.#.#.#.###.###.#.#.#.#.#.###.#.#.###.###.#.###.###.#.###########.###.#.#.#.#.###.#####.#.#.#.#.###.###.#.#.#.#.#.#.#.#.###.###.#.###.#.#.#.#.#
#.........#.#.....#.....#.#.....#.#.#.#...#.....#.......#...#.#...#.....#.......#.....#.........#.......#...#.#.#.......#.......#...#...#...#...#.#.#...#.....#...#...#...#.....#
#.#.###.###.###.###.#.###.#.#.###.###.###.#.#.#.#.#####.###.#.#.#.#.#.###.#.#####.#.###.#.#.#.#.#.#.###.#.###.#.#.#.#.#########.#.#####.#.#.#.#.#####.#.#.#######.#.#.###.###.#.#
#.............#.#...#.#.....#.#...#.........#.....#...#.......#...#.......#.......#...........#...#...#.#...#...#.....#...........#.....#.#...#.....#.....#.#.........#.....#.#.#
#.#.#.###.#.#.#####.###.#.#.#.#.#.#.#.#####.###.#.#.#####.#.#.#.#.#####.#.###.#####.#############.#.#.###.#.#.#.#####.#.#.#.#.#.#.#.###.###.###.#.#.#.###.#.#.#.#.#.#.###.#.###.#
#.#...#.#.#.....#.............#...#.........#...#.#...#...#...#...#...........#.#.#.#.....#...#.....#.#.#...#...#.#.........#.....#.........#...........#.....#...#...#.......#.#
#.#.#.#.#.###.#.#.###.#.#######.#.#.#.#.#.#.#.#.#.###.#.###.###.###.#####.#.###.#.#.###.#.#.#######.#.#.#.###.###.#.###.#####.#.#.#####.#.#.#.#.#####.#.#.#####.#.#####.#########
#.......#.....#...#...#.....#...........#...#.#...#.........#...#.....#...........#.....#.#.....#...#...#.#...#...#...#.....#...........#...#.#...#...#.....#.....#...........#6#
#.#.#.#.#######.###.#.#.###.#.#.###.#####.#.###.#.#######.#.#####.#.#.#.#########.#.###.#.#.#####.#.#.###.#.#########.###.#.#####.###.#.###.#.#.#.###.#.###.#.#.#.#.#.#.#.#####.#
#.....#.............#...#.#...#...#.#5......#...#...#.....#.............#.#.......#.....#.....#...........#.........#...#.#.....#.#.#.#...#...........#.#.#.......#.............#
#################################################################################################################################################################################`;
var valuesToFind = 8;

var map = input.split('\n').map((row) => row.split(''));
var maxX = map.length;
var maxY = map[0].length;

function findPositionOf(item, map) {
  for (var i = 0; i < maxX; i++) {
    for (var j = 0; j < maxY; j++) {
      if (map[i][j] == item) {
        return [i, j];
      }
    }
  }
}
var valuePositions = Array(valuesToFind);
for (var i = 0; i < valuesToFind; i++) {
  valuePositions[i] = findPositionOf(i.toString(), map);
}

function getNeighbors([x, y], map) {
  var possiblePositions = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]].filter(([x, y]) => {
    return x >= 0 && x < maxX && y >= 0 && y < maxY;
  }).filter(([x, y]) => {
    return map[x][y] !== "#";
  });
  return possiblePositions;
}

function findDistance(initialPosition, destinationPosition) {
  var queue = [[initialPosition, 0]];
  var visited = new Set();
  while (queue.length > 0) {
    var [position, steps] = queue.shift();
    //console.log(position, steps, visited.size);
    if (position.toString() == destinationPosition.toString()) {
      break;
    }
    getNeighbors(position, map).filter((neighbor) => {
      return !visited.has(neighbor.toString());
    }).forEach((neighbor) => {
      queue.push([neighbor, steps + 1]);
      visited.add(neighbor.toString());
    });
  }
  return steps;
}

var distanceMatrix = Array(valuesToFind).fill(0).map((row) => Array(valuesToFind).fill(0));
for (var i = 0; i < valuesToFind; i++) {
  for (var j = 0; j < valuesToFind; j++) {
    if (j < i) {
      distanceMatrix[i][j] = distanceMatrix[j][i];
    }
    if (j > i) {
      distanceMatrix[i][j] = findDistance(valuePositions[i], valuePositions[j]);
    }
  }
}

function permutator(inputArr) {
  var results = [];
  function permute(arr, memo = []) {
    for (var i = 0; i < arr.length; i++) {
      var cur = arr.splice(i, 1);
      if (arr.length == 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }
  return permute(inputArr);
}
var arr = [...Array(valuesToFind - 1).keys()].map((value) => value + 1);
var permutations = permutator(arr);

// Part 1
var min = Infinity;
for (var i = 0; i < permutations.length; i++) {
  var score = distanceMatrix[0][permutations[i][0]];
  for (var j = 0; j < valuesToFind - 2; j++) {
    score += distanceMatrix[permutations[i][j]][permutations[i][j + 1]];
  }
  min = Math.min(min, score);
}
console.log(min);

// Part 2
var min = Infinity;
for (var i = 0; i < permutations.length; i++) {
  var score = distanceMatrix[0][permutations[i][0]];
  for (var j = 0; j < arr.length - 1; j++) {
    score += distanceMatrix[permutations[i][j]][permutations[i][j + 1]];
  }
  score += distanceMatrix[permutations[i][arr.length - 1]][0];
  min = Math.min(min, score);
}
console.log(min);