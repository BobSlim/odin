import { Gameboard, Ship } from "./battleship.js"
import vector from "./vector.js";

const Vector = vector()

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

describe("gameboard", () => {
    let board
    beforeEach(() => {
        board = Gameboard()
    })
    afterEach(() => {
        board = null
    })
    test("refuses out of bounds", () => {
        expect(board.placeShip([9,9], Vector.getDirection("down"), "Battleship")).toBeInstanceOf(Error)
    })
    test("miss shot", () => {
        expect(board.receiveAttack([1,0])).toBe(false)
    })
    test("hit shot", () => {
        board.placeShip([0,0], Vector.getDirection("down"))
        expect(board.receiveAttack([0,0])).toBe(true)
    });
    test("sink ship", () => {
        board.placeShip([0,0], Vector.getDirection("down"))
        board.receiveAttack([0,0])
        expect(board.receiveAttack([0,1])).toBe(true)
    })
    test("all ships sunk", () => {
        board.placeShip([0,0], Vector.getDirection("down"))
        board.receiveAttack([0,0])
        expect(board.isAllSunk).toBe(false)
        board.receiveAttack([0,1])
        expect(board.isAllSunk).toBe(true)
    })
    test("removes ship properly", () => {
        let newBoard = Gameboard()
        newBoard.placeShip([0,0], Vector.getDirection("down"), "Patrol Boat")
        expect(newBoard.getCell([0,0]).shipRef).toBeTruthy
        newBoard.removeShip("Patrol Boat")
        expect(newBoard.getCell([0,0]).shipRef).toBeFalsy
    })
})