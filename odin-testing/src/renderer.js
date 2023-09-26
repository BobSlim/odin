export const renderer = (board, handleClick) => {
    const makeCellElement = (cell) => {
        const element = document.createElement("div")
        element.classList.add("gamecell")
        const validClick = () => {
            element.classList.add(cell.shipRef ? "gamecell--hit" : "gamecell--miss")
            element.removeEventListener("click", handleClick)
            return board.receiveAttack(cell.coords)
        }
        element.addEventListener("click", (event) => {handleClick(event, validClick, board)})
        element.innerText = cell.shipRef ? cell.symbol : ""
        return element
    }
    const boardElement = document.createElement("div")
    boardElement.classList.add("gameboard")
    const cells = board.getBoard().flat()
    const cellElements= cells.map( x => makeCellElement(x))
    for(let e of cellElements){
        boardElement.appendChild(e)
    }
    return boardElement
}