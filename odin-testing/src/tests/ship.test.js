import { Ship } from "#src/ship";
import { Fleet, shipCoords, isOccupied, getKeys } from "../ship";


const sampleMap = [["a", "i"],["b", "j"]]
describe("utils", () => {
    test("getkeys", () => {
        expect(getKeys(sampleMap)).toEqual["a", "b"]
    })
    test("overlaps", () => {
        expect(isOccupied(sampleMap, ["c"])).toBe(false)
        expect(isOccupied(sampleMap, ["a"])).toBe(true)
    })
})

describe("ship", () => {
    test("hit and sunk", () => {
        const ship = Ship("Destroyer");
        expect(ship.hit()).toBe(ship.name);
    });
    test("hit and not sunk", () => {
        const ship = Ship("Destroyer", 2);
        expect(ship.hit()).toBe("");
        expect(ship.hit()).toBe(ship.name);
    });

    test("correct length", () => {
        const ship = Ship("Destroyer", 2)
        expect(ship.length).toBe(2)
    });
});

describe("fleet", () => {
    test("shipCoords", () => {
        expect(shipCoords(1, [0,0], [1,0])).toEqual([[0,0]])
    })
    test("places ship", () => {
        const fleet = Fleet();
        const ship = {length: 1}
        expect(fleet.place(ship, [0,0], [0,1])).toEqual([[[0,0], ship]])
    });
    test("attempts to overlap ship", () => {
        const fleet = Fleet();
        const ship = {length: 1}
        const ship2 = {length: 2}
        fleet.place(ship, [0,0], [0,1])
        expect(fleet.place(ship2, [0,0], [0,1])).toEqual(false)
        expect(fleet.shipCoordinates).toEqual([[[0,0], ship]])
    });
    test("removes ship", () => {
        const fleet = Fleet();
        const ship = {length: 1};
        fleet.place(ship, [0,0], [0,1])
        expect(fleet.remove(ship)).toEqual([])
    });
});

