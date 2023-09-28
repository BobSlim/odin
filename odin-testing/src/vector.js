export {add, subtract, multiply, scale, length, compare, normalize, getPointsBetween, getDirection, directionArray, randomInt, chooseRandomElement}

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

const length = (vector) => {
    return Math.hypot(vector[0], vector[1])
}

const compare = (vector1, vector2) => {
    return vector1.map((x, i) => x == vector2[i])
}

const normalize = (vector) => {
    return vector.map((x) => x == 0 ? 0 : x / Math.abs(x))
}

const getPointsBetween = (vector1, vector2) => {
    const step = normalize(subtract(vector2, vector1))
    const output = [vector1]
    let count = 0
    while(!(compare(output[output.length-1], vector2).every(x => x == true)) && count <= 1000){
        const nextStep = add(output[output.length-1], step)
        output.push(nextStep)
        count++
    }
    return output
}

const directionArray = [[0,1],[1,0],[0,-1],[-1,0]]

const getDirection = (directionKey) => {
    const direction = {
        DOWN: 0,
        RIGHT: 1,
        UP: 2,
        LEFT: 3
    }
    const vect = directionArray[direction[directionKey.toUpperCase()]]
    if (vect == undefined){
        throw new Error("invalid direction key")
    }
    return vect 
}

const randomInt = (max) => {
    return Math.floor(Math.random()*max)
}

const chooseRandomElement = (array) => array[randomInt(array.length -1)]