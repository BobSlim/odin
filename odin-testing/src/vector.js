export {add, subtract, multiply, scale, randomInt, chooseRandomElement, isPointValid}

const add = (vector1, vector2) => {
    return vector1.map((x, i) => x + vector2[i])
}

const subtract = (vector1, vector2) => {
    return vector1.map((x, i) => x - vector2[i])
}

const multiply = (vector1, vector2) => {
    return vector1.map((x, i) => x * vector2[i])
}

const scale = (vector1, scalar) => {
    return vector1.map(x => x * scalar)
}

const randomInt = (max) => {
    return Math.floor(Math.random()*max)
}

const chooseRandomElement = (array) => array[randomInt(array.length -1)]

const isPointValid = (coords, boardSize) =>
    !coords.some(x => x < 0 | x > boardSize - 1)