function lengthen(str) {
  return str + "0" + str.slice().split("").reverse().map((char) => {
    return (char == "1") ? "0" : "1";
  }).join("");
}

function getToFillLength(input, fillLength) {
  var data = input;
  while (data.length < fillLength) {
    data = lengthen(data);
  }
  return data.slice(0, fillLength);
}

function determineChecksum(diskData) {
  var checksum = diskData;
  while (checksum.length % 2 == 0) {
    var newChecksum = "";
    for (var i = 0; i < checksum.length; i += 2) {
      newChecksum += (checksum[i] == checksum[i+1]) ? "1" : "0";
    }
    checksum = newChecksum;
  }
  return checksum;
}

var input = `11011110011011101`;

var fillLength1 = 272;
var diskData1 = getToFillLength(input, fillLength1);
var checksum1 = determineChecksum(diskData1);
console.log(checksum1);

var fillLength2 = 35651584;
var diskData2 = getToFillLength(input, fillLength2);
var checksum2 = determineChecksum(diskData2);
console.log(checksum2);
