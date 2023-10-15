import { Game, Renderer } from "./game"
import { Gameboard } from "./gameboard"
import { Fleet, defaultShips } from "./ship"
console.log("main blah blah")
const fleets = [Fleet(), Fleet()]
fleets.forEach(fleet => {
    fleet.placeShips(defaultShips())
})
const game = Game(Gameboard(fleets[0]), Gameboard(fleets[1]))
const renderer = Renderer(game, document.getElementById("main"), document)
renderer.render(game)