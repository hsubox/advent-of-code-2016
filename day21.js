/*
--- Day 21: Scrambled Letters and Hash ---

The computer system you're breaking into uses a weird scrambling function to store its passwords. It shouldn't be much trouble to create your own scrambled password so you can add it to the system; you just have to implement the scrambler.

The scrambling function is a series of operations (the exact list is provided in your puzzle input). Starting with the password to be scrambled, apply each operation in succession to the string. The individual operations behave as follows:

swap position X with position Y means that the letters at indexes X and Y (counting from 0) should be swapped.
swap letter X with letter Y means that the letters X and Y should be swapped (regardless of where they appear in the string).
rotate left/right X steps means that the whole string should be rotated; for example, one right rotation would turn abcd into dabc.
rotate based on position of letter X means that the whole string should be rotated to the right based on the index of letter X (counting from 0) as determined before this instruction does any rotations. Once the index is determined, rotate the string to the right one time, plus a number of times equal to that index, plus one additional time if the index was at least 4.
reverse positions X through Y means that the span of letters at indexes X through Y (including the letters at X and Y) should be reversed in order.
move position X to position Y means that the letter which is at index X should be removed from the string, then inserted such that it ends up at index Y.
For example, suppose you start with abcde and perform the following operations:

swap position 4 with position 0 swaps the first and last letters, producing the input for the next step, ebcda.
swap letter d with letter b swaps the positions of d and b: edcba.
reverse positions 0 through 4 causes the entire string to be reversed, producing abcde.
rotate left 1 step shifts all letters left one position, causing the first letter to wrap to the end of the string: bcdea.
move position 1 to position 4 removes the letter at position 1 (c), then inserts it at position 4 (the end of the string): bdeac.
move position 3 to position 0 removes the letter at position 3 (a), then inserts it at position 0 (the front of the string): abdec.
rotate based on position of letter b finds the index of letter b (1), then rotates the string right once plus a number of times equal to that index (2): ecabd.
rotate based on position of letter d finds the index of letter d (4), then rotates the string right once, plus a number of times equal to that index, plus an additional time because the index was at least 4, for a total of 6 right rotations: decab.
After these steps, the resulting scrambled password is decab.

Now, you just need to generate a new scrambled password and you can access the system. Given the list of scrambling operations in your puzzle input, what is the result of scrambling abcdefgh?

Your puzzle answer was gfdhebac.

--- Part Two ---

You scrambled the password correctly, but you discover that you can't actually modify the password file on the system. You'll need to un-scramble one of the existing passwords by reversing the scrambling process.

What is the un-scrambled version of the scrambled password fbgdceah?

Your puzzle answer was dhaegfbc.
*/

var input = `reverse positions 1 through 6
rotate based on position of letter a
swap position 4 with position 1
reverse positions 1 through 5
move position 5 to position 7
swap position 4 with position 0
swap position 4 with position 6
rotate based on position of letter a
swap position 0 with position 2
move position 5 to position 2
move position 7 to position 1
swap letter d with letter c
swap position 5 with position 3
reverse positions 3 through 7
rotate based on position of letter d
swap position 7 with position 5
rotate based on position of letter f
swap position 4 with position 1
swap position 3 with position 6
reverse positions 4 through 7
rotate based on position of letter c
move position 0 to position 5
swap position 7 with position 4
rotate based on position of letter f
reverse positions 1 through 3
move position 5 to position 3
rotate based on position of letter g
reverse positions 2 through 5
rotate right 0 steps
rotate left 0 steps
swap letter f with letter b
rotate based on position of letter h
move position 1 to position 3
reverse positions 3 through 6
rotate based on position of letter h
swap position 4 with position 3
swap letter b with letter h
swap letter a with letter h
reverse positions 1 through 6
swap position 3 with position 6
swap letter e with letter d
swap letter e with letter h
swap position 1 with position 5
rotate based on position of letter a
reverse positions 4 through 5
swap position 0 with position 4
reverse positions 0 through 3
move position 7 to position 2
swap letter e with letter c
swap position 3 with position 4
rotate left 3 steps
rotate left 7 steps
rotate based on position of letter e
reverse positions 5 through 6
move position 1 to position 5
move position 1 to position 2
rotate left 1 step
move position 7 to position 6
rotate left 0 steps
reverse positions 5 through 6
reverse positions 3 through 7
swap letter d with letter e
rotate right 3 steps
swap position 2 with position 1
swap position 5 with position 7
swap letter h with letter d
swap letter c with letter d
rotate based on position of letter d
swap letter d with letter g
reverse positions 0 through 1
rotate right 0 steps
swap position 2 with position 3
rotate left 4 steps
rotate left 5 steps
move position 7 to position 0
rotate right 1 step
swap letter g with letter f
rotate based on position of letter a
rotate based on position of letter b
swap letter g with letter e
rotate right 4 steps
rotate based on position of letter h
reverse positions 3 through 5
swap letter h with letter e
swap letter g with letter a
rotate based on position of letter c
reverse positions 0 through 4
rotate based on position of letter e
reverse positions 4 through 7
rotate left 4 steps
swap position 0 with position 6
reverse positions 1 through 6
rotate left 2 steps
swap position 5 with position 3
swap letter b with letter d
swap letter b with letter d
rotate based on position of letter d
rotate based on position of letter c
rotate based on position of letter h
move position 4 to position 7`;

const assert = require('assert');

// Part 1
function swapPositions(x, y, str) {
  var [a, b] = [x, y].sort((a, b) => a - b);
  return str.slice(0, a) + str[b] + str.slice(a + 1, b) + str[a] + str.slice(b + 1);
}
assert.equal(swapPositions(4, 0, 'abcde'), 'ebcda');

function swapLetters(x, y, str) {
  var [positionX, positionY] = [str.indexOf(x), str.indexOf(y)].sort((a, b) => a - b);
  return swapPositions(positionX, positionY, str);
}
assert.equal(swapLetters('d', 'b', 'ebcda'), 'edcba');

function rotateLeft(str, times=1) {
  for (var i = 0; i < times; i++) {
    str = str.slice(1) + str.slice(0, 1);
  }
  return str;
}
assert.equal(rotateLeft('abcde', 1), 'bcdea');

function rotateRight(str, times=1) {
  for (var i = 0; i < times; i++) {
    str = str.slice(str.length - 1) + str.slice(0, str.length - 1);
  }
  return str;
}

function rotateLetter(x, str) {
  var idx = str.indexOf(x);
  var rotations = (idx >= 4) ? idx + 2 : idx + 1;
  return rotateRight(str, rotations);
}
assert.equal(rotateLetter('b', 'abdec'), 'ecabd');
assert.equal(rotateLetter('d', 'ecabd'), 'decab');

function reversePositions(x, y, str) {
  var [a, b] = [x, y].sort((a, b) => a - b);
  return str.slice(0, a) + str.slice(a, b + 1).split('').reverse().join('') + str.slice(b + 1);
}

function movePosition(x, y, str) {
  var arr = str.split('');
  var [toMove] = arr.splice(x, 1);
  arr.splice(y, 0, toMove);
  return arr.join('');
}
assert.equal(movePosition(1, 4, 'bcdea'), 'bdeac');
assert.equal(movePosition(3, 0, 'bdeac'), 'abdec');

function scramble(input, str) {
  input.split('\n').forEach((instruction) => {
    if (instruction.match(/swap position \w with position \w/)) {
      var result = (/swap position (\w) with position (\w)/).exec(instruction);
      str = swapPositions(Number(result[1]), Number(result[2]), str);
    } else if (instruction.match(/swap letter \w with letter \w/)) {
      var result = (/swap letter (\w) with letter (\w)/).exec(instruction);
      str = swapLetters(result[1], result[2], str);
    } else if (instruction.match(/rotate (left|right) \w steps?/)) {
      var result = (/rotate (left|right) (\w) steps?/).exec(instruction);
      var rotationAmount = Number(result[2]);
      if (result[1] == 'left') {
        str = rotateLeft(str, rotationAmount);
      } else {
        str = rotateRight(str, rotationAmount);
      }
    } else if (instruction.match(/rotate based on position of letter \w/)) {
      var result = (/rotate based on position of letter (\w)/).exec(instruction);
      str = rotateLetter(result[1], str);
    } else if (instruction.match(/reverse positions \w through \w/)) {
      var result = (/reverse positions (\w) through (\w)/).exec(instruction);
      str = reversePositions(Number(result[1]), Number(result[2]), str);
    } else if (instruction.match(/move position \w to position \w/)) {
      var result = (/move position (\w) to position (\w)/).exec(instruction);
      str = movePosition(Number(result[1]), Number(result[2]), str);
    } else {
      console.log('unknown instruction: ' + instruction);
    }
  });
  return str;
}

assert.equal(scramble(`swap position 4 with position 0
swap letter d with letter b
reverse positions 0 through 4
rotate left 1 step
move position 1 to position 4
move position 3 to position 0
rotate based on position of letter b
rotate based on position of letter d`, 'abcde'), 'decab');
console.log(scramble(input, 'abcdefgh'));

// Part 2
function reverseRotateLetter(x, str) {
  var counter = 0;
  var rotated = str;
  while (rotateLetter(x, rotateLeft(str, counter)) != str) {
    counter += 1;
  }
  return rotateLeft(str, counter);
}
assert.equal(reverseRotateLetter('b', 'ecabd'), 'abdec');
assert.equal(reverseRotateLetter('d', 'decab'), 'ecabd');

function reverseMovePosition(x, y, str) {
  var arr = str.split('');
  var [toMove] = arr.splice(y, 1);
  arr.splice(x, 0, toMove);
  return arr.join('');
}

function unscramble(input, str) {
  input.split('\n').reverse().forEach((instruction) => {
    if (instruction.match(/swap position \w with position \w/)) { // same
      var result = (/swap position (\w) with position (\w)/).exec(instruction);
      str = swapPositions(Number(result[1]), Number(result[2]), str);
    } else if (instruction.match(/swap letter \w with letter \w/)) { // same
      var result = (/swap letter (\w) with letter (\w)/).exec(instruction);
      str = swapLetters(result[1], result[2], str);
    } else if (instruction.match(/rotate (left|right) \w steps?/)) { // left -> right, right -> left
      var result = (/rotate (left|right) (\w) steps?/).exec(instruction);
      var rotationAmount = Number(result[2]);
      if (result[1] == 'left') {
        str = rotateRight(str, rotationAmount);
      } else {
        str = rotateLeft(str, rotationAmount);
      }
    } else if (instruction.match(/rotate based on position of letter \w/)) { // do in reverse
      var result = (/rotate based on position of letter (\w)/).exec(instruction);
      str = reverseRotateLetter(result[1], str);
    } else if (instruction.match(/reverse positions \w through \w/)) { // same
      var result = (/reverse positions (\w) through (\w)/).exec(instruction);
      str = reversePositions(Number(result[1]), Number(result[2]), str);
    } else if (instruction.match(/move position \w to position \w/)) { // reverse positions
      var result = (/move position (\w) to position (\w)/).exec(instruction);
      str = reverseMovePosition(Number(result[1]), Number(result[2]), str);
    } else {
      console.log('unknown instruction: ' + instruction);
    }
  });
  return str;
}

assert.equal(unscramble(`swap position 4 with position 0
swap letter d with letter b
reverse positions 0 through 4
rotate left 1 step
move position 1 to position 4
move position 3 to position 0
rotate based on position of letter b
rotate based on position of letter d`, 'decab'), 'abcde');
console.log(unscramble(input, 'fbgdceah'));
