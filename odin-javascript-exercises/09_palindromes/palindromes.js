const palindromes = function (palindromeCandidate) {
  let cleanCandidate = removeNonLetters(palindromeCandidate);
  return cleanCandidate == reverseString(cleanCandidate);
};

function removeNonLetters(stringToClean) {
  let cleanedString = stringToClean.replaceAll(/[^a-zA-Z]/g, "");
  cleanedString = cleanedString.toLowerCase();
  return cleanedString;
}

function reverseString(stringToReverse) {
  return stringToReverse.split("").reverse().join("");
}

// Do not edit below this line
module.exports = palindromes;
