import { renderer } from "./renderer";
import { add, chooseRandomElement, randomInt, scale, directionArray } from "./vector"

export const Ship = ({name = "", dict}) => {
    let startCoord;
    let direction;
    return {
        name,
        startCoord,
        direction,
        get length(){return dict[name]},
    };
};

const buildFleet = (dict) => 
    Object.keys(dict).map(x => Ship(x, dict))

const shipDict = {
    "Carrier": 5,
    "Battleship": 4,
    "Cruiser": 3,
    "Submarine": 3,
    "Destroyer": 2,
}

const getLocationsMap = (fleet) => 
    new Map(
        fleet.flatmap(ship => shipMap(ship, shipCells(ship)))
    )

const placeRemainingShips = (fleet) => 
    fleet.map(ship => {
        ship.startCoord ? placeShipRandomly(fleet, ship) : ship;
    });

const isCoordinateTaken = (fleet, coordinate) => 
    getLocationsMap(fleet).has(coordinate)

const placeShipRandomly = (fleet, ship) => {
    const coords = getRandomCoords();
    const randomDirection = chooseRandomElement(directionArray);
    placeShip(coords, randomDirection, ship.name, false);
};

const shipCells = ({startCoord, direction, length}) => 
    [...Array(length).keys()]
        .map(x => add(startCoord, scale(direction, x)))

const shipMap = (ship, cells) =>
    cells.map(cell => [cell, ship])

const isCoordinateValid = (boardSize, coordinate) => 
    coordinate.every(x => x < boardSize && x >= 0)

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

export const Gamecell = (coords = [0,0]) => {
    let shipRef = null;
    let isHit = false;
    const hit = () => {
        isHit = true;
        if(shipRef){
            return {sunk: shipRef.hit()}
        }
        return false
    }
    const symbol = () => 
        isHit ? "x" :
        shipRef ? shipRef.name.slice(0, 1) :
        ".";

    return {
        coords,
        get shipRef() { return shipRef; },
        set shipRef(newShip) { shipRef = newShip; },
        get isHit() { return isHit; },
        hit,
        get symbol() { return symbol(); }
    };
};

export const Player = (board = Gameboard(), turnAction) => {
    /**
     * @type Player
     */
    let enemy;

    const placeRemainingShips = () => {
        board.placeRemainingShips()
    };

    const setEnemy = (enemyRef) => {
        enemy = enemyRef;
        return enemy;
    };

    const attackEnemy = (coords) => {
        if (!coords) { coords = randomShot(); }
        return enemy.board.receiveAttack(coords);
    };

    const randomShot = () => enemy.board.getRandomShot();

    const turn = () => {
        if(isComputer){
            attackEnemy()
        }
    }

    return {
        board,
        placeRemainingShips,
        setEnemy,
        attackEnemy,
        turn,
    };
};

export const Game = () => {
    const players = [Player(false), Player(true)]
    players[0].setEnemy(players[1])
    players[1].setEnemy(players[0])
    let currentPlayerIndex = 0
    const isCurrentTurn = (player) => player == players[currentPlayerIndex]
    const swapTurn = () => {
        console.log("turn swapped!")
        currentPlayerIndex = (currentPlayerIndex + 1) % 2
        players[currentPlayerIndex].turn()
    }
    const handleClick = (event, acceptFunct, player) => {
        if(!isCurrentTurn(player)){return}
        const outcome = acceptFunct()
        switch(outcome){
            case "hit":
                break;
            case "miss":
                break;
        }
        swapTurn()
    }
    const startGame = () => {
        for(let player of players){
            player.placeRemainingShips()
            document.getElementById("main").appendChild(renderer(player, handleClick))
        }
    }
    return {startGame}
}