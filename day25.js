var input = `cpy a d
cpy 15 c
cpy 170 b
inc d
dec b
jnz b -2
dec c
jnz c -5
cpy d a
jnz 0 0
cpy a b
cpy 0 a
cpy 2 c
jnz b 2
jnz 1 6
dec b
dec c
jnz c -4
inc a
jnz 1 -7
cpy 2 b
jnz c 2
jnz 1 4
dec b
dec c
jnz 1 -4
jnz 0 0
out b
jnz a -19
jnz 1 -21`;

function getValueOrRegister(item, register) {
  var valueOrRegister = Number(item);
  if (isNaN(valueOrRegister)) {
    valueOrRegister = register[item];
  }
  return valueOrRegister;
}

function runInstructions(register) {
  var transmittedMessage = "";
  var instructions = input.split("\n");
  var idx = 0;
  while (idx < instructions.length) {
    var instruction = instructions[idx];
    var words = instruction.split(" ");
    if (words.length == 2) {
      if (words[0] == "inc") {
        register[words[1]] += 1;
        idx += 1;
      } else if (words[0] == "dec") {
        register[words[1]] -= 1;
        idx += 1;
      } else if (words[0] == "out") {
        var valueOrRegister = getValueOrRegister(words[1], register);
        transmittedMessage += valueOrRegister;
        if (transmittedMessage.length >= 12) {
          return transmittedMessage;
        }
        idx += 1;
      } else { // "tgl"
        var valueOrRegister = getValueOrRegister(words[1], register);
        if (idx + valueOrRegister >= 0 && idx + valueOrRegister < instructions.length) {
          var args = instructions[idx + valueOrRegister].split(" ");
          if (args.length == 2) {
            if (args[0] == "inc") {
              args[0] = "dec";
            } else {
              args[0] = "inc";
            }
          } else { // args.length == 3
            if (args[0] == "jnz") {
              args[0] = "cpy";
            } else {
              args[0] = "jnz";
            }
          }
          instructions[idx + valueOrRegister] = args.join(" ");
        }
        idx += 1;
      }
    } else if (words.length == 3) {
      var valueOrRegister = getValueOrRegister(words[1], register);
      if (words[0] == "cpy") {
        if (register.hasOwnProperty(words[2])) {
          register[words[2]] = valueOrRegister;
        }
        idx += 1;
      } else { // jnz
        if (valueOrRegister == 0) {
          idx += 1;
        } else {
          var valueOrRegister2 = getValueOrRegister(words[2], register);
          idx += valueOrRegister2;
        }
      }
    }
  }
  return register;
}

var i = 0;
while (true) {
  var register = {
    a: i,
    b: 0,
    c: 0,
    d: 0
  };
  var message = runInstructions(register);
  if (message == "010101010101" || message == "101010101010") {
    console.log(i);
    break;
  }
  i++;
}
