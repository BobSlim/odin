export { Gameboard, Ship, VectorUtils }

//a vector is an array of [x, y].
const VectorUtils = () => {
    const add = (vector1, vector2) => {
        return vector1.map((x, i) => x + vector2[i])
    }

    const subtract = (vector1, vector2) => {
        return vector1.map((x, i) => x - vector2[i])
    }

    const multiply = (vector1, vector2) => {
        return vector1.map((x, i) => x * vector2[i])
    }

    const scale = (vector1, scalar) => {
        return vector1.map(x => x * scalar)
    }

    const length = (vector) => {
        return Math.hypot(vector[0], vector[1])
    }

    const compare = (vector1, vector2) => {
        return vector1.map((x, i) => x == vector2[i])
    }

    const normalize = (vector) => {
        return vector.map((x) => x == 0 ? 0 : x / Math.abs(x))
    }

    const getPointsBetween = (vector1, vector2) => {
        const step = normalize(subtract(vector2, vector1))
        const output = [vector1]
        let count = 0
        while(!(compare(output[output.length-1], vector2).every(x => x == true)) && count <= 1000){
            const nextStep = add(output[output.length-1], step)
            output.push(nextStep)
            count++
        }
        return output
    }
    return {add, subtract, multiply, scale, length, compare, normalize, getPointsBetween}
}

const Vector = VectorUtils()

const Ship = (length, name = "") => {
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

const Gameboard = () => {

    const Gamecell = () => {
        let shipRef = null
        let hit = false
        return {shipRef, hit}
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
            row.push(Gamecell())
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
        const cell = board[coords[0]][coords[1]]
        if(cell == undefined){
            throw new Error("requested cell out of bounds")
        }
        return cell
    }

    const getShipCells = (ship) => {
        const cells = board.flat().filter(x => x.shipRef == ship)
        if(!cells){
            return Error("ship cells could not be found")
        }
        return cells 
    }

    const getDirection = (directionKey) => {
        const direction = {
            DOWN: [0, 1],
            RIGHT: [1, 0],
            UP: [0, -1],
            LEFT: [-1, 0]
        }
        const vect = direction[directionKey.toUpperCase()]
        if (vect == undefined){
            throw new Error("invalid direction key")
        }
        return vect 
    }

    const removeShip = (shipName) => {
        const ship = getShip(shipName)
        if(!ship.isPlaced){
            return Error("ship is not placed")
        }
        getShipCells(ship).forEach(x => x.shipRef = null)
        ship.isPlaced = false
        return true
    }

    const placeShip = (startCoord, direction = "DOWN", shipName = "Patrol Boat") => {

        const newShip = getShip(shipName)

        if(newShip.isPlaced){
            throw new Error("ship already been placed, remove first.")
        }
        
        const directionVector = getDirection(direction)
        const shipCoords = [...Array(newShip.length).keys()].map(x => 
            Vector.add(startCoord, Vector.scale(directionVector, x))
        )
        const boardCells = shipCoords.map(e => getCell(e))

        if(boardCells.some(x => x.shipRef)){
            throw new Error("cannot overlap ships")
        }

        if(boardCells.some(x => x.hit)){
            throw new Error("cells have been hit; will result in softlock")
        }

        for(let cell of boardCells){
            cell.shipRef = newShip
        }
        newShip.isPlaced = true
        return true
    }

    const receiveAttack = (coords) => {
        const cell = board[coords[0]][coords[1]]
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
        get isAllSunk(){return ships.filter(x => x.isPlaced).every(x => x.isSunk)}, 
        get isAllPlaced(){return ships.every(x => x.isPlaced)} 
    }
}