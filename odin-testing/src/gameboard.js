import { Gamecell } from "./gamecell"
import { Ship } from "./ship"
import { add, randomInt, scale } from "./vector"

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

export const defaultShips = () => [
    Ship(5, "Carrier"),
    Ship(4, "Battleship"),
    Ship(3, "Cruiser"),
    Ship(3, "Submarine"),
    Ship(2, "Destroyer")
]

export const Gameboard = (board = initializeBoard(10, 10), ships = defaultShips()) => {
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
    const getRandomShot = () => {
        const openCells = getOpenCells();
        return openCells[randomInt(openCells.length - 1)].coords;
    };
    const print = () => board.map(x => x.map(y => y.symbol).join(" ")).join("\n")
    const receiveAttack = (coords) => {
        const cell = getCell(coords)
        if(cell.isHit){throw new Error("cell already hit")}
        return cell.hit()
    }

    const { placeShip, checkShipPlace, removeShip } = shipPlacer(getShip, getShipCells, getCell)

    return { 
        placeShip,
        checkShipPlace,
        removeShip, 
        receiveAttack, 
        getCell,
        getHitCount,
        getRandomShot,
        ships,
        get isAllSunk(){return ships.filter(x => x.isPlaced).every(x => x.isSunk)}, 
        get isAllPlaced(){return ships.every(x => x.isPlaced)},
        print
    }
}

const shipPlacer = (getShip, getShipCells, getCell) => {
    const removeShip = (shipName) => {
        const ship = getShip(shipName)
        if (!ship.isPlaced) {
            throw new Error("ship is not placed")
        }
        getShipCells(ship).forEach(x => x.shipRef = null)
        ship.isPlaced = false
        return true
    }

    const checkShipPlace = (startCoord, direction = [0, 1], shipName = "Destroyer") => {
        const ship = getShip(shipName)
        const cells = shipCells(startCoord, direction, ship.length)
        return !(cells instanceof Error)
    }

    const placeShip = (startCoord, direction = [0, 1], shipName = "Destroyer") => {
        const ship = getShip(shipName)
        const cells = shipCells(startCoord, direction, ship.length)
        return commitShip(cells, ship)
    }

    const shipCells = (startCoord, direction, length) => {
        const shipCoords = [...Array(length).keys()].map(x => add(startCoord, scale(direction, x)))
        const boardCells = shipCoords.map(e => getCell(e))
        if (boardCells.some(x => x instanceof Error)) return new Error("cells not acquired")
        if (boardCells.some(x => x.shipRef)) return new Error("attempting to overlap ships")
        return boardCells

    }
    const commitShip = (cells, ship) => {
        if (cells instanceof Error) {
            return cells
        }
        if (ship.isPlaced) {
            throw new Error("ship already placed")
        }
        for (let cell of cells) {
            cell.shipRef = ship
        }
        ship.isPlaced = true
        return true
    }
    return { placeShip, checkShipPlace, removeShip }
}
