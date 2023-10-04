export const Ship = (length = 1, name = "") => {
    let hitCount = 0;
    let isPlaced = false;

    const isSunk = () => hitCount >= length;
    const hit = () => {
        hitCount++;
        return isSunk();
    };

    return {
        length,
        name,
        isPlaced,
        hit,
        get isSunk() { return isSunk(); },
    };
};
