
const div_etchContainer = document.querySelector("#etchContainer")

const btn_resChange = document.querySelector("#resolutionChangeButton")
btn_resChange.addEventListener("click", () => {
    let newGridSize = prompt("What size of grid do you want?");
    alterGridResolution(newGridSize);
    quotaEtchSquares(newGridSize * newGridSize);
})

function alterGridResolution(newSize = 4){
    div_etchContainer.style.gridTemplateColumns = "repeat(" + newSize + ", 1fr)"
    div_etchContainer.style.gridTemplateRows = "repeat(" + newSize + ", 1fr)"
    //dostuff
};

function quotaEtchSquares(targetSquares = 4){
    const currentSquares = div_etchContainer.childNodes.length
    if(currentSquares < targetSquares){
        populateEtchSquares(targetSquares - currentSquares);
    }else if(currentSquares == targetSquares){
        return "done!"
    }else if(currentSquares > targetSquares){
        removeEtchSquares(currentSquares - targetSquares);
    }else{
        alert("currentSquares is not a number!")
    };
};

function populateEtchSquares(squaresToAdd = 0){
    for(let i=0;i<squaresToAdd;i++){
        let newSquare = document.createElement('div');
        newSquare.classList.add('etchSquare')
        newSquare.addEventListener("mouseenter", () => {
            randomizeBackgroundColor(newSquare)
        });
        div_etchContainer.appendChild(newSquare)
    }
    //dostuff
};

function removeEtchSquares(squaresToRemove = 0){
    for(let i=0; i<squaresToRemove; i++){
        div_etchContainer.lastChild.remove();
    };
};

let currentColor = 0

function randomizeBackgroundColor(targetElement){
    randomColor = currentColor + randomInt(0,45);
    currentColor = randomColor;
    targetElement.style.backgroundColor = "hsl("+randomColor+", 100%, 50%)"
};

function addLoop(addend1, addend2){
    let sum = addend1 + addend2;
    if(sum > 360){
        sum = sum - 360;
    };
    return sum;
};

function randomInt(minInt, maxInt){  
    return Math.floor(Math.random() * (maxInt - minInt)) + minInt
};

