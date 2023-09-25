import { Ship } from "#src/ship";

describe("ship", () => {
    test("hit twice and sunk", () => {
        const ship = Ship(2);
        expect(ship.isSunk).toBe(false);
        expect(ship.hit()).toBe(false);
        expect(ship.isSunk).toBe(false);
        expect(ship.hit()).toBe(true);
        expect(ship.isSunk).toBe(true);
    });
});
