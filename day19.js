/*
--- Day 19: An Elephant Named Joseph ---

The Elves contact you over a highly secure emergency channel. Back at the North Pole, the Elves are busy misunderstanding White Elephant parties.

Each Elf brings a present. They all sit in a circle, numbered starting with position 1. Then, starting with the first Elf, they take turns stealing all the presents from the Elf to their left. An Elf with no presents is removed from the circle and does not take turns.

For example, with five Elves (numbered 1 to 5):

  1
5   2
 4 3
Elf 1 takes Elf 2's present.
Elf 2 has no presents and is skipped.
Elf 3 takes Elf 4's present.
Elf 4 has no presents and is also skipped.
Elf 5 takes Elf 1's two presents.
Neither Elf 1 nor Elf 2 have any presents, so both are skipped.
Elf 3 takes Elf 5's three presents.
So, with five Elves, the Elf that sits starting in position 3 gets all the presents.

With the number of Elves given in your puzzle input, which Elf gets all the presents?

Your puzzle answer was 1841611.

--- Part Two ---

Realizing the folly of their present-exchange rules, the Elves agree to instead steal presents from the Elf directly across the circle. If two Elves are across the circle, the one on the left (from the perspective of the stealer) is stolen from. The other rules remain unchanged: Elves with no presents are removed from the circle entirely, and the other elves move in slightly to keep the circle evenly spaced.

For example, with five Elves (again numbered 1 to 5):

The Elves sit in a circle; Elf 1 goes first:
  1
5   2
 4 3
Elves 3 and 4 are across the circle; Elf 3's present is stolen, being the one to the left. Elf 3 leaves the circle, and the rest of the Elves move in:
  1           1
5   2  -->  5   2
 4 -          4
Elf 2 steals from the Elf directly across the circle, Elf 5:
  1         1
-   2  -->     2
  4         4
Next is Elf 4 who, choosing between Elves 1 and 2, steals from Elf 1:
 -          2
    2  -->
 4          4
Finally, Elf 2 steals from Elf 4:
 2
    -->  2
 -
So, with five Elves, the Elf that sits starting in position 2 gets all the presents.

With the number of Elves given in your puzzle input, which Elf now gets all the presents?

Your puzzle answer was 1423634.

Both parts of this puzzle are complete! They provide two gold stars: **

At this point, all that is left is for you to admire your advent calendar.

Your puzzle input was 3017957.
*/

const assert = require('assert');

const input = 3017957;

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
