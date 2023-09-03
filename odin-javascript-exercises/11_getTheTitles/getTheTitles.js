const getTheTitles = function (library) {
  let bookTitles = [];
  bookTitles.push(library[0].title);
  bookTitles.push(library[1].title);
  return bookTitles;
};

// Do not edit below this line
module.exports = getTheTitles;
