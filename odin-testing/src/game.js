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

export const Renderer = (gameObject, frame, doc) => {
    const renderCell = (cell, isPlayer) => {
        const cellDOM = doc.createElement("button")
        cellDOM.classList.add("gamecell")
        const validClick = (event) => {
            cellDOM.classList.add(cell.shipRef ? "gamecell--hit" : "gamecell--miss")
            cellDOM.removeEventListener("click", validClick)
            gameObject.step(cell.coords)
            return gameObject.player.receiveAttack(cell.coords)
        }
        if(isPlayer){
            cellDOM.innerText = cell.shipRef ? cell.symbol : ""
        }else{
            cellDOM.addEventListener("click", (event) => {validClick(event)})
        }
        return cellDOM
    }
    const renderBoard = (board, isPlayer = false) => {
        const boardDOM = doc.createElement("div")
        boardDOM.classList.add("gameboard")

        const cells = board.getCells().map( x => renderCell(x, isPlayer))
        for(let e of cells){
            boardDOM.appendChild(e)
        }
        return boardDOM
    }
    const render = (game) => {
        frame.appendChild(renderBoard(game.player, true))
        frame.appendChild(renderBoard(game.computer))
    }
    return {render}
}