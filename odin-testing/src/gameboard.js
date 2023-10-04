import { Gamecell } from "./gamecell"
import { Ship, defaultShips, shipCoords } from "./ship"
import { add, chooseRandomElement, randomInt, scale, directionArray } from "./vector"

//a vector is an array of [x, y].

export const initializeBoard = (width, height) => {
    const board = []
    for (let x = 0; x < width; x++) {
        let row = []
        for (let y = 0; y < height; y++) {
            row.push(Gamecell([x, y]))
        }
        board.push(row)
    }
    return board
}

export const Gameboard = (board = initializeBoard(10, 10), fleet = defaultShips()) => {
    const getCell = (coords) => {
        if(coords.some(x => x < 0 | x > board.length - 1)){
            return new Error("out of bounds")
        }
        return board[coords[0]][coords[1]]
    }
    const getShip = (shipName) => ships.find(x => x.name == shipName)
    const getCells = () => board.flat()
    const getShipCells = (ship) => getCells().filter(x => x.shipRef == ship)
    const getHitCount = () => getCells().filter(x => x.isHit).length
    const getOpenCells = () => getCells().filter(x => !x.isHit)
    const getRandomShot = () => chooseRandomElement(getOpenCells()).coords
    const getRandomCoords = () => chooseRandomElement(getCells()).coords
    const getBoard = () => board

    const print = () => board.map(x => x.map(y => y.symbol).join(" ")).join("\n")
    const receiveAttack = (coords) => {
        const cell = getCell(coords)
        if(cell.isHit){throw new Error("cell already hit")}
        return cell.hit()
    }

    return { 
        receiveAttack, 
        getCell,
        getHitCount,
        getRandomShot,
        getRandomCoords,
        get isAllSunk(){return ships.filter(x => x.isPlaced).every(x => x.isSunk)}, 
        get isAllPlaced(){return ships.every(x => x.isPlaced)},
        print,
        getBoard,
    }
}