import { add, scale } from "./vector";

const shipDict = {
    "Carrier": 5,
    "Battleship": 4,
    "Cruiser": 3,
    "Submarine": 3,
    "Destroyer": 2,
}

export const defaultShips = (dict = shipDict) => 
    Object.keys(dict).map(x => Ship(x, dict))

export const Ship = (name = "", dict = shipDict) => {
    let hitCount = 0;
    let location;
    let direction;
    const length = () => dict[name]
    const isSunk = () => hitCount >= length();
    const hit = () => {
        hitCount++;
        return isSunk();
    };

    const place = (newLocation = undefined, newDirection = undefined) => {
        location = newLocation;
        direction = newDirection;
        return shipCoords({location, direction, length: length()})
    }

    return {
        get length(){ return length(); },
        name,
        location,
        direction,
        get isPlaced() {return !!location},
        hit,
        get isSunk() { return isSunk(); },
    };
};

export const shipCoords = ({location, direction, length}) =>
    (!location | !direction) ? 
        [] : 
        [...Array(length).keys()].map(x => add(location, scale(direction, x)))

export const Fleet = () => {
    let ships = []
    const map = () => {
        ships.map(ship => [shipCoords(ship)])
    }
    const isPointOccupied = (coords) =>
        !!ships.flatmap(ship => shipCoords(ship)).find(coords)
}

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

const placeShip = (startCoord, direction = [0, 1], shipName = "Destroyer", justCheck = false) => {
    const ship = getShip(shipName)
    const cells = shipCells(startCoord, direction, ship.length)
    if(justCheck){return !(cells instanceof Error)} //valid ship place
    return commitShip(cells, ship)
}