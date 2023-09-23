import { Gameboard } from "./battleship";
import vector from "./vector";

const Vector = vector()
const randomInt = (max) => {
    return Math.floor(Math.random()*max)
}

export const Player = () => {
    const board = Gameboard()
    let enemy
    const placeRemainingShips = () => {
        const remainingShips = board.ships.filter(x => !x.isPlaced)
        while(remainingShips.length > 0){
            const ship = remainingShips.shift()
            while (!ship.isPlaced){
                const randomDirection = Vector.directionArray[randomInt(3)]
                const randomCoords = [randomInt(9), randomInt(9)]
                if(board.checkShipPlace(randomCoords, randomDirection, ship.name)){
                    board.placeShip(randomCoords, randomDirection, ship.name)
                }
            }
        }
    }
    return {
        board,
        placeRemainingShips,
        }
}