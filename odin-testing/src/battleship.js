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

    const direction = {
        NORTH: [0, 1],
        EAST: [1, 0],
        SOUTH: [0, -1],
        WEST: [-1, 0]
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
    return {add, subtract, multiply, scale, length, compare, normalize, getPointsBetween, direction}
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

    const placeShip = (startCoord, direction = Vector.direction.NORTH, shipName = "Patrol Boat") => {
        const newShip = ships.find(x => x.name == shipName)

        if(newShip == undefined){
            throw new Error("no ship with that name found.")
        }

        if(newShip.isPlaced){
            throw new Error("ship already been placed, remove first.")
        }

        const shipCoords = [...Array(newShip.length).keys()].map(x => 
            Vector.add(startCoord, Vector.scale(direction, x))
        )
        const boardCells = shipCoords.map(e => board[e[0]][e[1]])

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
        receiveAttack, 
        get isAllSunk(){return ships.filter(x => x.isPlaced).every(x => x.isSunk)}, 
        get isAllPlaced(){return ships.every(x => x.isPlaced)} 
    }
}