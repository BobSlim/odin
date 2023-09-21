export { Gameboard, Ship, VectorUtils }

//a vector is an array of [x, y].
const VectorUtils = () => {
    const add = (vector1, vector2) => {
        return vector1.map((x, i) => x + vector2[i])
    }

    const subtract = (vector1, vector2) => {
        return vector1.map((x, i) => x - vector2[i])
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
    return {add, subtract, length, compare, normalize, getPointsBetween}
}

const Vector = VectorUtils()

const Ship = (length, count = 0) => {
    const nameDict = {
        5: ["Carrier"],
        4: ["Battleship"],
        3: ["Destroyer", "Submarine"],
        2: ["Patrol Boat"]
    }

    let hitCount = 0
    const name = nameDict[length][count ? 1 : 0]
    
    const getLength = () => {
        return length
    }
    const isSunk = () => {
        return hitCount >= length
    }
    const hit = () => {
        hitCount++
        if(isSunk()){return true}
        return false
    }
    return { name, getLength, isSunk, hit }
}

const Gameboard = () => {

    const Gamecell = () => {
        let shipRef = null
        let hit = false
        return {shipRef, hit}
    }

    let board = []
    let ships = []

    for (let x = 0; x < 10; x++) {
        let row = []
        for (let y = 0; y < 10; y++) {
            row.push(Gamecell())
        }
        board.push(row)
    }

    const addShip = (startCoord, endCoord) => {
        const comparison = Vector.compare(startCoord, endCoord)
        if(comparison.every(x => x == false)){
            throw new Error("cannot place ships diagonally")
        }

        const shipCoords = Vector.getPointsBetween(startCoord, endCoord)
        const boardCells = shipCoords.map(e => board[e[0]][e[1]])
        const newShipLength = boardCells.length

        if(boardCells.some(x => x.shipRef)){
            throw new Error("cannot overlap ships")
        }


        const count = ships.filter(x => x.getLength() == newShipLength).length
        const newShip = Ship(newShipLength, count) 
        ships.push(newShip)

        for(let cell of boardCells){
            cell.shipRef = newShip
        }
        return true
    }

    const receiveAttack = (coords) => {
        const cell = board[coords[0]][coords[1]]
        if(cell.hit){throw new Error("cell already hit")}
        cell.hit = true
        return !!cell.shipRef
    }
    const isAllSunk = () => {
        return false
    }
    return { addShip, receiveAttack, isAllSunk }
}