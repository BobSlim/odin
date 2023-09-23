import { Player } from "./game";

describe("player", () => {
    test("places all ships", () => {
        const player = Player()
        expect(player.board.isAllPlaced).toBe(false)
        player.placeRemainingShips()
        expect(player.board.isAllPlaced).toBe(true)
    });
})
