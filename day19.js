const assert = require('assert');

// Part 1
function winningElf(n) {
  var elves = Array(n).fill(1);
  var i = 0;
  while (true) {
    if (elves[i] !== 0) {
      var j = i + 1;
      j = j % n;
      while (elves[j] == 0) {
        j += 1;
        j = j % n;
      }
      elves[i] += elves[j];
      elves[j] = 0;
    }
    if (elves[i] === n) {
      break;
    }
    i += 1;
    i = i % n;
  }
  return i + 1;
}

var input = 3017957;
assert.equal(winningElf(5), 3);
console.log(winningElf(input));

// Part 2
/*
Learned from looking for patterns:

For numbers that are multiples of powers of 3
3 --> 3
6 --> 6
9 --> 9
12 --> 12

For other numbers, converting to base 3 and removing first digit
10 --> 101 --> 01 --> 1
11 --> 102 --> 02 --> 2
13 --> 111 --> 11 --> 4
14 --> 112 --> 12 --> 5
*/

function winningElfCircle(n) {
  var str = n.toString(3);
  if (str.match(/^[12]0*$/g)) {
    return n;
  }
  return parseInt(str.slice(1), 3);
}
assert.equal(winningElfCircle(5), 2);
console.log(winningElfCircle(input));
