const reverseString = function (targetString = "") {
  finalString = "";
  for (let i = 0; i <= targetString.length; i++) {
    finalString = finalString + targetString.charAt(targetString.length - i);
  }
  return finalString;
};

// Do not edit below this line
module.exports = reverseString;
