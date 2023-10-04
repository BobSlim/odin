import { Gamecell } from "./gamecell"
import { Ship, defaultShips } from "./ship"
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
    const getRandomShot = () => chooseRandomElement(getOpenCells()).coords
    const getRandomCoords = () => chooseRandomElement(getCells()).coords
    const print = () => board.map(x => x.map(y => y.symbol).join(" ")).join("\n")
    const receiveAttack = (coords) => {
        const cell = getCell(coords)
        if(cell.isHit){throw new Error("cell already hit")}
        return cell.hit()
    }

    const { placeShip, removeShip, placeRemainingShips } = shipPlacer(getShip, getShipCells, getCell, ships, getRandomCoords)

    return { 
        placeShip,
        removeShip, 
        placeRemainingShips,
        receiveAttack, 
        getCell,
        getHitCount,
        getRandomShot,
        getRandomCoords,
        ships,
        get isAllSunk(){return ships.filter(x => x.isPlaced).every(x => x.isSunk)}, 
        get isAllPlaced(){return ships.every(x => x.isPlaced)},
        print
    }
}

const shipPlacer = (getShip, getShipCells, getCell, ships, getRandomCoords) => {
    const placeRemainingShips = () => {
        const remainingShips = ships.filter(x => !x.isPlaced);
        while (remainingShips.length > 0) {
            const ship = remainingShips.shift();
            placeShipRandomly(ship);
        }
    };

    const placeShipRandomly = (ship) => {
        while (!ship.isPlaced) {
            const coords = getRandomCoords();
            const randomDirection = chooseRandomElement(directionArray);
            placeShip(coords, randomDirection, ship.name, false);
        }
    };

    const removeShip = (shipName) => {
        const ship = getShip(shipName)
        if (!ship.isPlaced) {
            throw new Error("ship is not placed")
        }
        getShipCells(ship).forEach(x => x.shipRef = null)
        ship.isPlaced = false
        return true
    }

    const placeShip = (startCoord, direction = [0, 1], shipName = "Destroyer", justCheck = false) => {
        const ship = getShip(shipName)
        const cells = shipCells(startCoord, direction, ship.length)
        if(justCheck){return !(cells instanceof Error)} //valid ship place
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
    return { placeShip, removeShip, placeRemainingShips }
}
