import { Gameboard, Ship, VectorUtils } from "./battleship.js"

const Vector = VectorUtils()

describe("vectorutil", () => {
    test("adds", () => {
        expect(Vector.add([0,2], [3,2])).toEqual([3,4])
    });
    test("subtracts", () => {
        expect(Vector.subtract([0,2], [3,2])).toEqual([-3,0])
    });
    test("length", () => {
        expect(Vector.length([3,4])).toBe(5)
    });
    test("compare", () => {
        expect(Vector.compare([3,5], [3,7])).toEqual([true, false])
    });
    test("normalize", () => {
        expect(Vector.normalize([4,0])).toEqual([1,0])
    });
    test("get between points", () => {
        expect(Vector.getPointsBetween([3,5], [3,7])).toEqual([[3,5], [3,6], [3,7]])
    });
})

let ship

describe("ship", () => {
    test("hit twice and sunk", () => {
        const ship = Ship(2)
        expect(ship.isSunk()).toBe(false)
        expect(ship.hit()).toBeFalsy()
        expect(ship.isSunk()).toBe(false)
        expect(ship.hit()).toBeTruthy()
        expect(ship.isSunk()).toBe(true)
    });

})

const board = Gameboard()
board.addShip([0,0], [1,0])

describe("gameboard", () => {
    test("hit shot", () => {
        expect(board.receiveAttack([0,0])).toBe(true)
    });
    test("miss shot", () => {
        expect(board.receiveAttack([0,1])).toBe(false)
    })
    test("sink ship", () => {
        expect(board.receiveAttack([1,0])).toBe(true)
    })
})