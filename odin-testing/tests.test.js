import {capitalize, reverseString, calculator, caesarShift, analyzeArray} from "./tests.js";

test('test', () => {
    expect(1).toBe(1);
})

test('capitalize a', () => {
    expect(capitalize("a")).toBe("A")
})

test('capitalize aardvark', () => {
    expect(capitalize("aardvark")).toBe("Aardvark")
})

test('capitalize do not', () => {
    expect(capitalize("a")).toBe("A")
})

test('capitalize number', () => {
    expect(capitalize("1")).toBe("1")
})

test('capitalize empty string', () => {
    expect(capitalize("")).toBe("")
})

test('reverse', () => {
    expect(reverseString("trains")).toBe("sniart")
})

const calc = calculator()

test('add', () => {
    expect(calc.add(2, 3)).toBe(5)
})

test('sub', () => {
    expect(calc.subtract(2, 3)).toBe(-1)
})

test('mult', () => {
    expect(calc.multiply(2, 3)).toBe(6)
})

test('divide', () => {
    expect(calc.divide(2, 3)).toBeCloseTo(0.666666666666666666666666666667)
})

test('shift', () => {
    expect(caesarShift("abC", 2)).toBe("cdE")
})

test('shift backwards', () => {
    expect(caesarShift("cde.", -2)).toBe("abc.")
})

test('wrap', () => {
    expect(caesarShift("z", 1)).toBe("a")
})

test('wrap backwards', () => {
    expect(caesarShift("a", -1)).toBe("z")
})

test('analyze array', () => {
    expect(analyzeArray([1,2,3])).toEqual({
        average: 2,
        min: 1,
        max: 3,
        length: 3
    })
})