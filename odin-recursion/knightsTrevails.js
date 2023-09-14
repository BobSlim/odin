//helpers

const symbolIn = (element, array) => {
    const symbolArray = array.map(x => x.toString())
    return symbolArray.includes(element.toString())
}

//vectors
const newBoard = () => {
    return [...Array(8)].map(_=>Array(8).fill(false))
}

let board = newBoard()

const moveVectors = [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
]

const validCoords = (coords) => {
    if(!Array.isArray(coords)){return false}
    if(coords.length != 2){return false}
    for(let i of coords){
        if(i < 0 || i > 7){return false}
    }
    return true
}

const addVectors = (vector1, vector2) => {
    return vector1.map((x, i) => x + vector2[i])
}

const subtractVectors = (vector1, vector2) => {
    return vector1.map((x, i) => x - vector2[i])
}

const lengthVector = (vector) => {
    return Math.hypot(vector[0], vector[1])
}
//knight stuff

class knightPosition {
    constructor(coord, parent){
        this.coord = coord
        this.parent = parent
        }
    get token(){
        return this.coord.toString()
    }
    }

class knightTree {
    constructor(start, end){
        this.root = new knightPosition(start, null)
        this.end = end
        this.discovered = new Set()
    }

    search = (position = this.root, queue = []) => {
        const possibleMoves = this.discoverMoves(position.coord, moveVectors) //array of coordinates
        const newPositions = possibleMoves.map(x => new knightPosition(x, position))
        for (const i of newPositions) {
            const positionToken = i.coord.toString()
            if(this.end.toString() == positionToken){return i}
            this.discovered.add(positionToken)
        }

        const newQueue = queue.concat(newPositions)
        if(!newQueue.length){return false} //this should never happen

        const nextPosition = newQueue.shift()
        return this.search(nextPosition, newQueue)
    }

    discoverMoves = (origin, array) => {
        const initialMoves = array.map(coord => addVectors(coord, origin))
        const filteredMoves = initialMoves.filter(coord => 
            validCoords(coord) && 
            !this.discovered.has(coord.toString())
        )
        return filteredMoves
    }

    path = (position) => {
        if(!position.parent){return [position]}
        return [...this.path(position.parent), position]
    }
}

const knightMoves = (start, end) => {
    const tree = new knightTree(start, end)
    console.log(tree)
    const path = tree.path(tree.search())
    return path.map(x => x.coord)
};

//driver and animation code

let path = knightMoves([0,0], [4,4])
console.log(path)
let pathPointer = 0

const stepPath = () => {
    positionElement(knight, path[pathPointer++])
}

const positionElement = (element, coords) => {
    element.style.left = `${512 - (64 * (7 - coords[0] + 1))}px`
    element.style.top = `${512 - (64 * (coords[1] + 1))}px`
}

const knight = document.getElementById("knight")
positionElement(knight, [0,0])