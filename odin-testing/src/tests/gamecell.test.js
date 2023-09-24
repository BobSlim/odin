import gamecell from "../gamecell";

describe("symbol", () => {
    test("empty => .", () => {
        const cell = gamecell()
        expect(cell.symbol).toBe(".")
    })
    test("hit => x", () => {
        const cell = gamecell()
        cell.hit = true
        expect(cell.symbol).toBe("x")
    })
    test("patrol boat => P", () => {
        const cell = gamecell()
        cell.shipRef = {name: "Patrol Boat"}
        expect(cell.symbol).toBe("P")
    })
    test("prefers hit over object", () => {
        const cell = gamecell()
        cell.hit = true
        cell.shipRef = {name: "Patrol Boat"}
        expect(cell.symbol).toBe("x")
    })
})
