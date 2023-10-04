import { Ship } from "#src/ship";

describe("ship", () => {
    test("hit twice and sunk", () => {
        const ship = Ship("Destroyer");
        expect(ship.isSunk).toBe(false);
        expect(ship.hit()).toBe(false);
        expect(ship.isSunk).toBe(false);
        expect(ship.hit()).toBe(true);
        expect(ship.isSunk).toBe(true);
    });
    test("correct length", () => {
        const ship = Ship("Destroyer")
        expect(ship.length).toBe(2)
    });
});
