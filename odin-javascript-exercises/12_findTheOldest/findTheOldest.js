let currentDate = new Date()

const findTheOldest = function(people) {
    let oldestPerson = {
        name: "null",
        yearOfDeath: 0,
        yearOfBirth: 0
    };
    for(i=0; i < people.length; i++){
        if(findAge(people[i]) > findAge(oldestPerson)){
            oldestPerson = people[i]
        }
    };
    return oldestPerson
};


function findAge(person){
    let oldestYear = 0
    if(person.yearOfDeath == null){
        oldestYear = currentDate.getFullYear();
    }else{
        oldestYear = person.yearOfDeath;
    };
    return oldestYear - person.yearOfBirth;
}

const testPerson = {
    name: "TEST",
    yearOfBirth: 1999,
    yearOfDeath: 2020
}

const testPerson2 = {
    name: "TEST2",
    yearOfBirth: 1999,
    yearOfDeath: 2021
}

const testPeople = [testPerson, testPerson2]

console.log(findAge(testPerson))
console.log(findTheOldest(testPeople))

// Do not edit below this line
module.exports = findTheOldest;
