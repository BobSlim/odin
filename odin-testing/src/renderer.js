export const renderer = (player, handleClick) => {
    const makeCellElement = (cell) => {
        const element = document.createElement("div")
        element.classList.add("gamecell")
        const validClick = () => {
            element.classList.add(cell.shipRef ? "gamecell--hit" : "gamecell--miss")
            element.removeEventListener("click", handleClick)
            return player.board.receiveAttack(cell.coords)
        }
        element.addEventListener("click", (event) => {handleClick(event, validClick, player)})
        element.innerText = cell.shipRef ? cell.symbol : ""
        return element
    }
    const boardElement = document.createElement("div")
    boardElement.classList.add("gameboard")
    const cells = player.board.getBoard().flat()
    const cellElements= cells.map( x => makeCellElement(x))
    for(let e of cellElements){
        boardElement.appendChild(e)
    }
    return boardElement
}