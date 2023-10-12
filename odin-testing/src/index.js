import { Game, Renderer } from "./game"
import { Gameboard } from "./gameboard"
import { Fleet, defaultShips } from "./ship"
console.log("main blah blah")
const fleets = [Fleet(), Fleet()]
fleets.forEach(fleet => {
    fleet.placeShips(defaultShips())
})
const game = Game(Gameboard(Fleet()), Gameboard(Fleet()))
const renderer = Renderer(game)
renderer.render(game)