export const Ship = (length, name = "") => {
    let hitCount = 0;
    let isPlaced = false;

    const isSunk = () => hitCount >= length;
    const hit = () => {
        hitCount++;
        if (isSunk()) { return true; }
        return false;
    };

    return {
        length,
        name,
        isPlaced,
        hit,
        get isSunk() { return isSunk(); },
    };
};
