import { Player } from "./player";
import { renderer } from "./renderer";

export const Game = () => {
    const player1 = Player()
    const player2 = Player()
    const players = [player1, player2]
    player1.setEnemy(player2)
    player2.setEnemy(player1)
    const startGame = () => {
        for(let player of players){
            player.placeRemainingShips()
            document.getElementById("main").appendChild(renderer(player.board))
        }
    }
    return {startGame}
}