import Player from "./player";

export default Game = () => {
    const player1 = Player()
    const player2 = Player()
    const players = [player1, player2]
    player1.setEnemy(player2)
    player2.setEnemy(player1)
    const startGame = () => {
        for(let player of players){
            player.placeRemainingShips()
        }
    }
}