import { Gamecell } from "#src/gamecell";

describe("symbol", () => {
    test("empty => .", () => {
        const cell = Gamecell()
        expect(cell.symbol).toBe(".")
    })
    test("hit => x", () => {
        const cell = Gamecell()
        cell.hit = true
        expect(cell.symbol).toBe("x")
    })
    test("patrol boat => P", () => {
        const cell = Gamecell()
        cell.shipRef = {name: "Destroyer"}
        expect(cell.symbol).toBe("D")
    })
    test("prefers hit over object", () => {
        const cell = Gamecell()
        cell.hit = true
        cell.shipRef = {name: "Destroyer"}
        expect(cell.symbol).toBe("x")
    })
})
