import { Player } from "./player";
import { renderer } from "./renderer";

export const Game = () => {
    const players = [Player(), Player()]
    players[0].setEnemy(players[1])
    players[1].setEnemy(players[0])
    let currentPlayer = 0
    const isCurrentTurn = (board) => board == players[currentPlayer].board
    const swapTurn = () => {
        currentPlayer = (currentPlayer + 1) % 2
        currentPlayer.turn()
    }
    const handleClick = (event, acceptFunct, board) => {
        if(!isCurrentTurn(board)){return}
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
            document.getElementById("main").appendChild(renderer(player.board, handleClick))
        }
    }
    return {startGame}
}