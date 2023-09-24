import Gameboard from "../gameboard.js"
import vector from "../vector.js";

const Vector = vector()

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
        expect(board.placeShip([0,0], Vector.getDirection("left"))).toBeInstanceOf(Error)
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