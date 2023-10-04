import { Player } from "./player";
import { renderer } from "./renderer";

export const Game = () => {
    const players = [Player(), Player()]
    players[0].setEnemy(players[1])
    players[1].setEnemy(players[0])
    let currentPlayerIndex = 0
    const isCurrentTurn = (player) => player == players[currentPlayerIndex]
    const swapTurn = () => {
        console.log("turn swapped!")
        currentPlayerIndex = (currentPlayerIndex + 1) % 2
        players[currentPlayerIndex].turn()
    }
    const handleClick = (event, acceptFunct, player) => {
        if(!isCurrentTurn(player)){return}
        const outcome = acceptFunct()
        switch(outcome){
            case "hit":
                break;
            case "miss":
                break;
        }
        swapTurn()
    }
    const startGame = () => {
        for(let player of players){
            player.placeRemainingShips()
            document.getElementById("main").appendChild(renderer(player, handleClick))
        }
    }
    return {startGame}
}