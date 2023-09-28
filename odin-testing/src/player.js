import { Gameboard } from "./gameboard";

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