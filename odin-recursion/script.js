const sumRange = (n) => {
    if(n==1){
        return n
    }else{
        return n + sumRange(n-1)
    }
}

const power = (x, n) => {
    if(n==1){
        return x
    }else{
        return x * power(x, n-1)
    }
}

const factorial = (n) => {
    if(n==1){
        return n
    }else{
        return n * factorial(n-1)
    }
}

const testArray = [
    [6, 5, 4, 8, 6, 1],
    [8, 6, 1],
    [6, 5, 4],
    [9],
    [5],
]

const lessThanSeven = (num) => {
    console.log(num)
    return num < 7 ? true : false
}

const all = (arr, funct) => {
    if(arr.length == 0){
        return true
    }else{
        if(funct(arr.pop())){
            return all(arr, funct)
        }else{
            return false
        }
    }
}

const productOfArray = (arr) => {
    if(arr.length == 1){
        return arr[0]
    }else{
        return arr.slice(-1) * productOfArray(arr.slice(0,-1))
    }
}

const nestedObject = {
    data: {
        info: {
            stuff: {
                thing: {
                    moreStuff: {
                        magicNumber: 44,
                        something: 'foo2'
                    }
                }
            }
        }
    }
}


const contains = (object, find) => {
    for(i in object){
        const item = object[i]
        if(item == find){
            return true
        }else if (typeof item == 'object'){
            return contains(item, find)
        }
    }
    return false
}

const addArray = (array) => {
    if(array.length == 0){return 0}
    let acc = 0
    const arrayCopy = array.slice()
    const i = arrayCopy.pop()
    if(typeof i == "number"){
        acc += i
    }else if(Array.isArray(i)){
        acc += addArray(i)
    }
    return acc + addArray(arrayCopy)
}

const addSquaredArray = (array) => {
    if(array.length == 0){return 0}
    let acc = 0
    const arrayCopy = array.slice()
    const i = arrayCopy.pop()
    if(typeof i == "number"){
        acc += i*i
    }else if(Array.isArray(i)){
        acc += addSquaredArray(i)
    }
    return acc + addSquaredArray(arrayCopy)
}

const nestedArrays = [
    ...testArray,
    [2, [2,3]],
    [[[[[[[[[1]]]]]]]]],
    [10,[[10],10],[10]],
]

const replicate = (n, x) => {
    if(n==1){
        return [x]
    }
    if(n<=0){
        return []
    }
    else{
        return [x].concat(replicate(n-1, x))
    }
}

const fibs = (iter) =>{
    let prevOld = 0
    let prevNew = 1
    for (let index = 0; index < iter; index++) {
        const newNumber = prevOld + prevNew
        prevOld = prevNew;
        prevNew = newNumber;
    }
    return prevNew
}

const fibsRec = (iter) => {
    if(iter==1){return 1}
    if(iter<=0){return 0}
    return fibsRec(iter-1) + fibsRec(iter-2)
}

// for(i of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]){
//     console.log(fibsRec(i))
// }

const mergeSort = (arr) => {
    const length = arr.length
    if(length == 1){return arr}
    const array = arr.slice()
    const leftArray = mergeSort(array.splice(0, Math.floor(length/2)))
    const rightArray = mergeSort(array)
    let newArray = []
    while(rightArray.length > 0 && leftArray.length > 0){
        newArray.push(minArray(leftArray, rightArray).shift())
    }
    newArray = newArray.concat(leftArray).concat(rightArray)
    return newArray
}

const minArray = (array1, array2) => {
    return array1[0] < array2[0] ? array1 : array2
}

for(i of testArray){
    console.log({input: i, output: mergeSort(i)})
}