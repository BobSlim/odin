import { add, isPointValid, scale } from "./vector";

export const defaultShips = () => [
    Ship("Carrier", 5),
    Ship("Battleship", 4),
    Ship("Cruiser", 3),
    Ship("Submarine", 3),
    Ship("Destroyer", 2),
]

export const Ship = (name = "", length = 1) => {
    let hitCount = 0;
    const isSunk = () => hitCount >= length;
    const hit = () => {
        hitCount++;
        return isSunk();
    };

    return {
        name,
        length,
        isSunk,
        hit,
    };
};

export const shipCoords = (length, location, direction) =>
    (!location | !direction) ? 
        [] : 
        [...Array(length).keys()].map(x => add(location, scale(direction, x)))

export const getKeys = array => array.map(([key, value]) => key)
const getValues = array => array.map(([key, value]) => value)
const excludeValue = (array, excludedValue) => array.filter(([key, value]) => value != excludedValue)
export const isOccupied = (map, coord) => new Set(getKeys(map).map(x => x.toString())).has(coord.toString())

export const Fleet = (ships, boardSize = 10) => {
    let shipCoordinates = []
    const fleetIsOccupied = (coord) => isOccupied(shipCoordinates, coord)

    const place = (ship, location, direction) => {
        const locations = shipCoords(ship.length, location, direction)
        if(locations.some(coord => fleetIsOccupied(coord) | !isPointValid(coord, boardSize))){return false}
        shipCoordinates = shipCoordinates.concat(locations.map(x => [x, ship]))
        return shipCoordinates
    }

    const remove = (ship) => {
        shipCoordinates = excludeValue(shipCoordinates, ship)
        return shipCoordinates
    }

    return {
        get shipCoordinates(){return shipCoordinates},
        ships,
        place,
        remove,
    }
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