import { Gameboard } from "./gameboard";
import { directionArray, randomInt } from "./vector";

export const Player = (isComputer = true) => {
    const board = Gameboard();
    /**
     * @type Player
     */
    let enemy;
    const randomCoords = () => {
        return [randomInt(9), randomInt(9)];
    };

    const placeRemainingShips = () => {
        const remainingShips = board.ships.filter(x => !x.isPlaced);
        while (remainingShips.length > 0) {
            const ship = remainingShips.shift();
            placeShipRandomly(ship);
        }
    };

    const placeShipRandomly = (ship) => {
        while (!ship.isPlaced) {
            const coords = randomCoords();
            const randomDirection = directionArray[randomInt(3)];
            if (board.checkShipPlace(coords, randomDirection, ship.name)) {
                board.placeShip(coords, randomDirection, ship.name);
            }
        }
    };

    const setEnemy = (enemyRef) => {
        enemy = enemyRef;
        return enemy;
    };

    const attackEnemy = (coords) => {
        if (!coords) { coords = randomShot(); }
        enemy.board.receiveAttack(coords);
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