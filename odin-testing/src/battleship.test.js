import { Gameboard, Ship, VectorUtils } from "./battleship.js"

const Vector = VectorUtils()

describe("vectorutil", () => {
    test("adds", () => {
        expect(Vector.add([0,2], [3,2])).toEqual([3,4])
    });
    test("subtracts", () => {
        expect(Vector.subtract([0,2], [3,2])).toEqual([-3,0])
    });
    test("multiplies", () => {
        expect(Vector.multiply([0,2], [0,3])).toEqual([0,6])
    })
    test("scalar", () => {
        expect(Vector.scale([0,2], 3)).toEqual([0,6])
    })
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

describe("ship", () => {
    test("hit twice and sunk", () => {
        const ship = Ship(2)
        expect(ship.isSunk).toBe(false)
        expect(ship.hit()).toBe(false)
        expect(ship.isSunk).toBe(false)
        expect(ship.hit()).toBe(true)
        expect(ship.isSunk).toBe(true)
    });
})

const board = Gameboard()
board.placeShip([0,0])

describe("gameboard", () => {
    test("refuses out of bounds", () => {
        expect(() => board.placeShip([9,9], "down", "Battleship")).toThrow()
    })
    test("hit shot", () => {
        expect(board.receiveAttack([0,0])).toBe(true)
    });
    test("miss shot", () => {
        expect(board.receiveAttack([1,0])).toBe(false)
    })
    test("all ships sunk", () => {
        expect(board.isAllSunk).toBe(false)
    })
    test("sink ship", () => {
        expect(board.receiveAttack([0,1])).toBe(true)
    })
    test("all ships sunk", () => {
        expect(board.isAllSunk).toBe(true)
    })
})