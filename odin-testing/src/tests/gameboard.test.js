
import { Gameboard, Gamecell } from "#src/gameboard";
import { Fleet, Ship } from "../ship";

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
        const ship = Ship("Destroyer", 2)
        const fleet = Fleet([ship])
        fleet.place(ship, [0,0], [0,1])
        board = Gameboard(fleet)
    })
    test("miss shot", () => {
        expect(board.receiveAttack([1,0]).hit).toBe(false)
    })
    test("hit shot", () => {
        expect(board.receiveAttack([0,0]).hit).toBe(true)
    });
    test("sink ship", () => {
        board.receiveAttack([0,0])
        expect(board.receiveAttack([0,1]).sunk).toBe(true)
    })
    test("all ships sunk", () => {
        board.receiveAttack([0,0])
        expect(board.receiveAttack([0,1]).allSunk).toBe(true)
    })
    test("with two hits", () => {
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