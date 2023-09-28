
import { Gameboard } from "#src/gameboard";
import { getDirection } from "#src/vector";

describe("gameboard", () => {
    let board
    beforeEach(() => {
        board = Gameboard()
    })
    afterEach(() => {
        board = null
    })
    test("refuses out of bounds", () => {
        expect(board.placeShip([9,9], getDirection("down"), "Battleship")).toBeInstanceOf(Error)
        expect(board.placeShip([0,0], getDirection("left"))).toBeInstanceOf(Error)
    })
    test("miss shot", () => {
        expect(board.receiveAttack([1,0])).toBe(false)
    })
    test("hit shot", () => {
        board.placeShip([0,0], getDirection("down"))
        expect(board.receiveAttack([0,0])).toBeTruthy()
    });
    test("sink ship", () => {
        board.placeShip([0,0], getDirection("down"))
        board.receiveAttack([0,0])
        expect(board.receiveAttack([0,1]).sunk).toBe(true)
    })
    test("all ships sunk", () => {
        board.placeShip([0,0], getDirection("down"))
        board.receiveAttack([0,0])
        expect(board.isAllSunk).toBe(false)
        board.receiveAttack([0,1])
        expect(board.isAllSunk).toBe(true)
    })
    test("removes ship properly", () => {
        let newBoard = Gameboard()
        newBoard.placeShip([0,0], getDirection("down"), "Destroyer")
        expect(newBoard.getCell([0,0]).shipRef).toBeTruthy
        newBoard.removeShip("Destroyer")
        expect(newBoard.getCell([0,0]).shipRef).toBeFalsy
    })
})

describe("print", () => {
    test("with two hits", () => {
        const board = Gameboard()
        board.receiveAttack([0,0])
        board.receiveAttack([0,1])
        expect(board.print()).toBe(
        `x x . . . . . . . .
. . . . . . . . . .
. . . . . . . . . .
. . . . . . . . . .
. . . . . . . . . .
. . . . . . . . . .
. . . . . . . . . .
. . . . . . . . . .
. . . . . . . . . .
. . . . . . . . . .`)
    })
})