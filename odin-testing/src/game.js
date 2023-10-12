export const Game = (playerBoard, computerBoard) => {
    const step = (coords) => {
        computerBoard.receiveAttack(coords)
        playerBoard.receiveAttack(playerBoard.getRandomShot())
        return data()
    }

    return {
        step,
        player: playerBoard,
        computer: computerBoard,
    }
}

export const Renderer = (gameObject) => {
    const renderCell = (cell) => {
        const cellDOM = document.createElement("div")
        cellDOM.classList.add("gamecell")
        const validClick = () => {
            cellDOM.classList.add(cell.shipRef ? "gamecell--hit" : "gamecell--miss")
            cellDOM.removeEventListener("click", handleClick)
            return player.board.receiveAttack(cell.coords)
        }
        cellDOM.addEventListener("click", (event) => {gameObject.step(cell.data().coords)})
        cellDOM.innerText = cell.shipRef ? cell.symbol : ""
        return cellDOM
    }
    const renderBoard = (board) => {
        const boardDOM = document.createElement("div")
        boardDOM.classList.add("gameboard")

        const cells = board.getCells().map( x => renderCell(x))
        for(let e of cells){
            boardDOM.appendChild(e)
        }
        return boardDOM
    }
    const render = (game) => {
        const gameDOM = document.getElementById("main")
        gameDOM.appendChild(renderBoard(game.player))
        gameDOM.appendChild(renderBoard(game.computer))
    }
    return {render}
}