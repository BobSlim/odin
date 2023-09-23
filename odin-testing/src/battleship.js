import VectorUtils from "./vector.js"

//a vector is an array of [x, y].

const Vector = VectorUtils()

export const Ship = (length, name = "") => {
    let hitCount = 0
    let isPlaced = false

    const isSunk = () => {
        return hitCount >= length
    }

    const hit = () => {
        hitCount++
        if(isSunk()){return true}
        return false
    }

    return { 
        length,
        name, 
        isPlaced, 
        hit, 
        get isSunk(){return isSunk()}, 
    }
}

export const Gameboard = () => {

    const Gamecell = (coords) => {
        let shipRef = null
        let hit = false
        return {coords, shipRef, hit}
    }

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

    const getShipCells = (ship) => {
        const cells = board.flat().filter(x => x.shipRef == ship)
        if(!cells){
            throw new Error("ship cells could not be found")
        }
        return cells 
    }

    const print = () => {
        const symbol = (cell) => {
            let output = 
                cell.hit ? "x" : 
                cell.shipRef ? cell.shipRef.name.slice(0,1) : 
                "."
            return output
        }
        const string = board.map(x => x.map(y => symbol(y)).join(" ")).join("\n")
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

    const getPlaceCells = (startCoord, direction, length) => {
        const shipCoords = [...Array(length).keys()].map(x => 
            Vector.add(startCoord, Vector.scale(direction, x))
        )
        const boardCells = shipCoords.map(e => getCell(e))
        return boardCells
    }

    const validateCells = (boardCells) => {
        if(boardCells.some(x => x instanceof Error)){
            return new Error("some cells could not be acquired.")
        }

        if(boardCells.some(x => x.shipRef)){
            return new Error("cannot overlap ships")
        }

        if(boardCells.some(x => x.hit)){
            return new Error("cells have been hit; will result in softlock")
        }
        return true
    }

    const placeShip = (startCoord, direction = [0,1], shipName = "Patrol Boat") => {
        const newShip = getShip(shipName)
        const boardCells = getPlaceCells(startCoord, direction, newShip.length)
        const cellValid = validateCells(boardCells)
        if(cellValid instanceof Error){
            return cellValid
        }
        if(newShip.isPlaced){
            throw new Error("ship already been placed, remove first.")
        }
        for(let cell of boardCells){
            cell.shipRef = newShip
        }
        newShip.isPlaced = true
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
        removeShip, 
        receiveAttack, 
        getCell,
        ships,
        get isAllSunk(){return ships.filter(x => x.isPlaced).every(x => x.isSunk)}, 
        get isAllPlaced(){return ships.every(x => x.isPlaced)},
        print
    }
}