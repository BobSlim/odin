export const Game = (playerBoard, computerBoard) => {
    const step = (coords) => {
        computerBoard.receiveAttack(coords)
        playerBoard.receiveAttack(playerBoard.getRandomShot())
        return {player: playerBoard, computer: computerBoard}
    }

    return {
        step,
        player: playerBoard,
        computer: computerBoard,
    }
}

export const Renderer = (gameObject, frame, fnCreateElement) => {
    const renderCell = (cell) => {
        const cellDOM = document.createElement("button")
        cellDOM.classList.add("gamecell")
        const validClick = (event) => {
            cellDOM.classList.add(cell.shipRef ? "gamecell--hit" : "gamecell--miss")
            cellDOM.removeEventListener("click", validClick)
            gameObject.step(cell.coords)
            return gameObject.player.receiveAttack(cell.coords)
        }
        cellDOM.addEventListener("click", (event) => {validClick(event)})
        cellDOM.innerText = cell.shipRef ? cell.symbol() : ""
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
        frame.appendChild(renderBoard(game.player))
        frame.appendChild(renderBoard(game.computer))
    }
    return {render}
}