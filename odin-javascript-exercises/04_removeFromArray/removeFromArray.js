const removeFromArray = function (
  originalArray = [],
  value1 = null,
  value2 = null,
  value3 = null,
  value4 = null,
) {
  valuesToRemove = [value1, value2, value3, value4];
  let finalArray = originalArray;
  valuesToRemove = removeOptionalParams(valuesToRemove);
  for (let i = 0; i < valuesToRemove.length; i++) {
    finalArray = finalArray.filter(
      (checkedValue) => checkedValue !== valuesToRemove[i],
    );
  }
  return finalArray;
};

function removeOptionalParams(targetArray) {
  for (i = targetArray.length - 1; i < targetArray.length; i--) {
    if (targetArray[i] == null) {
      targetArray.pop();
    } else {
      break;
    }
  }
  return targetArray;
}

console.log(removeFromArray([1, 2, 3, 4], 3));

// Do not edit below this line
module.exports = removeFromArray;
