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
    let isPlaced = false;

    const length = () => dict[name]
    const isSunk = () => hitCount >= length();
    const hit = () => {
        hitCount++;
        return isSunk();
    };

    return {
        get length(){ return length(); },
        name,
        isPlaced,
        hit,
        get isSunk() { return isSunk(); },
    };
};