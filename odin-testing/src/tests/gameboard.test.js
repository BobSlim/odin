
import { Gameboard } from "#src/gameboard";
import { getDirection } from "#src/vector";

import { Gamecell } from "#src/gamecell";

describe("symbol", () => {
    test("empty => .", () => {
        const cell = Gamecell()
        expect(cell.symbol).toBe(".")
    })
    test("hit => x", () => {
        const cell = Gamecell()
        cell.hit()
        expect(cell.symbol).toBe("x")
    })
    test("patrol boat => P", () => {
        const cell = Gamecell()
        cell.shipRef = {name: "Destroyer"}
        expect(cell.symbol).toBe("D")
    })
    test("prefers hit over object", () => {
        const cell = Gamecell()
        cell.hit()
        cell.shipRef = {name: "Destroyer"}
        expect(cell.symbol).toBe("x")
    })
})

describe("gameboard", () => {
    let board
    beforeEach(() => {
        board = Gameboard()
    })
    afterEach(() => {
        board = null
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