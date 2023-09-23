import VectorUtils from "./vector.js";

const Vector = VectorUtils();
describe("vectorutil", () => {
    test("adds", () => {
        expect(Vector.add([0, 2], [3, 2])).toEqual([3, 4]);
    });
    test("subtracts", () => {
        expect(Vector.subtract([0, 2], [3, 2])).toEqual([-3, 0]);
    });
    test("multiplies", () => {
        expect(Vector.multiply([0, 2], [0, 3])).toEqual([0, 6]);
    });
    test("scalar", () => {
        expect(Vector.scale([0, 2], 3)).toEqual([0, 6]);
    });
    test("length", () => {
        expect(Vector.length([3, 4])).toBe(5);
    });
    test("compare", () => {
        expect(Vector.compare([3, 5], [3, 7])).toEqual([true, false]);
    });
    test("normalize", () => {
        expect(Vector.normalize([4, 0])).toEqual([1, 0]);
    });
    test("get between points", () => {
        expect(Vector.getPointsBetween([3, 5], [3, 7])).toEqual([[3, 5], [3, 6], [3, 7]]);
    });
});
