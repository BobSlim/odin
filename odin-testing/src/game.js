import { Gameboard } from "./battleship";
import vector from "./vector";

const Vector = vector()
const randomInt = (max) => {
    return Math.floor(Math.random()*max)
}

export const Player = () => {
    const board = Gameboard()
    let enemy
    const randomCoords = () => {
        return [randomInt(9), randomInt(9)]
    }

    const placeRemainingShips = () => {
        const remainingShips = board.ships.filter(x => !x.isPlaced)
        while(remainingShips.length > 0){
            const ship = remainingShips.shift()
            while (!ship.isPlaced){
                const coords = randomCoords()
                const randomDirection = Vector.directionArray[randomInt(3)]
                if(board.checkShipPlace(coords, randomDirection, ship.name)){
                    board.placeShip(coords, randomDirection, ship.name)
                }
            }
        }
    }
    return {
        board,
        placeRemainingShips,
        }
}