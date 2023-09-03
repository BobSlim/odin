const sumAll = function (number1, number2) {
  if (!(checkInt(number1) && checkInt(number2))) {
    return "ERROR";
  }
  let combined = number1 + number2;
  return ((Math.abs(number1 - number2) + 1) * combined) / 2;
};

function checkInt(valueToCheck) {
  return Number.isInteger(valueToCheck) && valueToCheck > 0;
}

console.log(sumAll(2, 3));
console.log(sumAll("blah", 2));

// Do not edit below this line
module.exports = sumAll;
