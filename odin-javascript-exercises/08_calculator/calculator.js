const add = function(addend1, addend2) {
	return addend1 + addend2;
};

const subtract = function(minuend, subtrahend) {
	return minuend - subtrahend;
};

const sum = function(sumArray) {
  let totalSum = 0
  for (let i = 0; i < sumArray.length; i++){
    totalSum += sumArray[i]
  }
  return totalSum
};

const multiply = function(multiplierArray) {
  return multiplyAllInArray(multiplierArray)
};

function multiplyAllInArray(multiplands = []){
  let product = 1
  for (let i = 0; i < multiplands.length; i++){
    product *= multiplands[i]
  }
  return product
}

const power = function(base, exponent) {
	return Math.pow(base, exponent);
};

const factorial = function(product) {
	let factorArray = []
  for(let i = 1; i < product; i++){
    factorArray.push(i+1)
  };
  return multiplyAllInArray(factorArray)
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};
