const repeatString = function (repeatedString, repeatNumber) {
  finalString = "";
  if (repeatNumber < 0) {
    return "ERROR";
  }
  for (i = 0; i < repeatNumber; i++) {
    finalString = finalString + repeatedString;
  }
  return finalString;
};

// Do not edit below this line
module.exports = repeatString;
