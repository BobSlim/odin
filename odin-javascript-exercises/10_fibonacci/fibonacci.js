const fibonacci = function (targetIndex) {
  if (targetIndex < 0) {
    return "OOPS";
  }
  let fibonacciSequence = [0, 1];
  for (i = 0; targetIndex >= fibonacciSequence.length; i++) {
    fibonacciSequence.push(fibonacciSequence[i] + fibonacciSequence[i + 1]);
  }
  return fibonacciSequence[targetIndex];
};

// Do not edit below this line
module.exports = fibonacci;
