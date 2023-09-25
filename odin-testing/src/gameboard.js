import { Gamecell } from "./gamecell"
import { Ship } from "./ship"
import { add, scale } from "./vector"

//a vector is an array of [x, y].

export const Gameboard = () => {
    let board = []
    let ships = [
        Ship(5, "Carrier"),
        Ship(4, "Battleship"),
        Ship(3, "Destroyer"),
        Ship(3, "Submarine"),
        Ship(2, "Patrol Boat")
    ]

    for (let x = 0; x < 10; x++) {
        let row = []
        for (let y = 0; y < 10; y++) {
            row.push(Gamecell([x, y]))
        }
        board.push(row)
    }

    const getShip = (shipName) => {
        const ship = ships.find(x => x.name.toLowerCase() == shipName.toLowerCase())
        if(ship == undefined){
            throw new Error("no ship with that name found.")
        }
        return ship 
    }

    const getCell = (coords) => {
        const x = coords[0]
        const y = coords[1]
        if(x < 0 | x > 9 | y < 0 | y > 9){
            return new Error("requested cell out of bounds")
        }
        const cell = board[coords[0]][coords[1]]
        return cell
    }

    const getBoard = () => {
        return board
    }

    const getHitCount = () => {
        return board.flat().filter(x => x.hit).length
    }

    const getShipCells = (ship) => {
        const cells = board.flat().filter(x => x.shipRef == ship)
        if(!cells){
            throw new Error("ship cells could not be found")
        }
        return cells 
    }

    const print = () => {
        const string = board.map(x => x.map(y => y.symbol).join(" ")).join("\n")
        return string
    }

    const removeShip = (shipName) => {
        const ship = getShip(shipName)
        if(!ship.isPlaced){
            throw new Error("ship is not placed")
        }
        getShipCells(ship).forEach(x => x.shipRef = null)
        ship.isPlaced = false
        return true
    }

    const checkShipPlace = (startCoord, direction = [0,1], shipName = "Patrol Boat") => {
        const ship = getShip(shipName)
        const cells = shipCells(startCoord, direction, ship.length)
        return !(cells instanceof Error)
    }

    const placeShip = (startCoord, direction = [0,1], shipName = "Patrol Boat") => {
        const ship = getShip(shipName)
        const cells = shipCells(startCoord, direction, ship.length)
        return commitShip(cells, ship)
    }

    const shipCells = (startCoord, direction, length) => {
        const shipCoords = [...Array(length).keys()].map(x => 
            add(startCoord, scale(direction, x))
        )
        const boardCells = shipCoords.map(e => getCell(e))
        if(boardCells.some(x => x instanceof Error)){
            return new Error("some cells could not be acquired.")
        }

        if(boardCells.some(x => x.shipRef)){
            return new Error("cannot overlap ships")
        }

        if(boardCells.some(x => x.hit)){
            return new Error("cells have been hit; will result in softlock")
        }
        return boardCells

    }
    const commitShip = (cells, ship) => {
        if(cells instanceof Error){
            return cells
        }
        if(ship.isPlaced){
            throw new Error("ship already been placed, remove first.")
        }
        for(let cell of cells){
            cell.shipRef = ship
        }
        ship.isPlaced = true
        return true
    }

    const receiveAttack = (coords) => {
        const cell = getCell(coords)
        if(cell.hit){throw new Error("cell already hit")}
        cell.hit = true
        if(cell.shipRef){
            cell.shipRef.hit()
        }
        return !!cell.shipRef
    }
    return { 
        placeShip,
        checkShipPlace,
        removeShip, 
        receiveAttack, 
        getCell,
        getBoard,
        getHitCount,
        ships,
        get isAllSunk(){return ships.filter(x => x.isPlaced).every(x => x.isSunk)}, 
        get isAllPlaced(){return ships.every(x => x.isPlaced)},
        print
    }
}