export {capitalize, reverseString, calculator, caesarShift, analyzeArray}

const capitalize = (string) => {
    return string.slice(0, 1).toUpperCase() + string.slice(1)
}

const reverseString = (string) => {
    string = string.split("")
    let output = []
    while (string.length >= 1){
        output.push(string.pop())
    }
    return output.join("")
}

const calculator = () => {
    return {
        add: (num1, num2) => {return num1 + num2},
        subtract: (num1, num2) => {return num1 - num2},
        divide: (num1, num2) => {return num1 / num2},
        multiply: (num1, num2) => {return num1 * num2},
    }
}

const caesarShift = (string, shift) => {
    if(shift == 0){return string}
    const stringArray = string.split("")
    const shiftedArray = stringArray.map((x) => 
        x = shiftChar(x, shift)
    )
    return shiftedArray.join("")
}

const unicodeStart = {
    lower: 97,
    upper: 65,
}

const findCase = (char) => {
    if(char.match(/[a-z]/)){return "lower"}
    if(char.match(/[A-Z]/)){return "upper"}
    return ""
}

const shiftChar = (char, shift) => {
    const charCase = findCase(char)
    if(!charCase){return char}
    let newUnicode = char.codePointAt(0) + shift
    //modulus allows for wrapping around letters. some silly modulo operation https://stackoverflow.com/questions/3417183/modulo-of-negative-numbers.
    newUnicode = (((((newUnicode - unicodeStart[charCase]) % 26) + 26) % 26)) + unicodeStart[charCase]
    const output = String.fromCharCode(newUnicode)
    return output
}

const analyzeArray = (array) => {
    return {
        average: array.reduce((acc, val) => acc + val) / array.length,
        min: Math.min(...array),
        max: Math.max(...array),
        length: array.length
    }
}