import { add, subtract, multiply, scale, length, compare, normalize, getPointsBetween } from "#src/vector.js";

describe("vectorutil", () => {
    test("adds", () => {
        expect(add([0, 2], [3, 2])).toEqual([3, 4]);
    });
    test("subtracts", () => {
        expect(subtract([0, 2], [3, 2])).toEqual([-3, 0]);
    });
    test("multiplies", () => {
        expect(multiply([0, 2], [0, 3])).toEqual([0, 6]);
    });
    test("scalar", () => {
        expect(scale([0, 2], 3)).toEqual([0, 6]);
    });
    test("length", () => {
        expect(length([3, 4])).toBe(5);
    });
    test("compare", () => {
        expect(compare([3, 5], [3, 7])).toEqual([true, false]);
    });
    test("normalize", () => {
        expect(normalize([4, 0])).toEqual([1, 0]);
    });
    test("get between points", () => {
        expect(getPointsBetween([3, 5], [3, 7])).toEqual([[3, 5], [3, 6], [3, 7]]);
    });
});
