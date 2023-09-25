export const Gamecell = (coords = [0,0]) => {
    let shipRef = null;
    let hit = false;
    const symbol = () => 
        hit ? "x" :
        shipRef ? shipRef.name.slice(0, 1) :
        ".";

    return {
        coords,
        get shipRef() { return shipRef; },
        set shipRef(newShip) { shipRef = newShip; },
        get hit() { return hit; },
        set hit(newHit) { hit = newHit; },
        get symbol() { return symbol(); }
    };
};