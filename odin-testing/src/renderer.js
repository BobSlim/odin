export const renderer = (board) => {
    const makeCellElement = (cell) => {
        const element = document.createElement("div")
        element.classList.add("gamecell")
        if(cell.hit && cell.shipRef){
            element.classList.add("gamecell--hit")
        }else if(cell.hit){
            element.classList.add("gamecell--miss")
        }
        if(cell.shipRef){
            element.innerText = cell.symbol
        }
        element.addEventListener("click", () => {
            board.receiveAttack(cell.coords)
            element.replaceWith(makeCellElement(cell)) 
            })
        console.log(element)
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