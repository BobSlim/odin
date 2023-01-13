const THROW_INDEX = ["rock", "paper", "scissors"];

function getComputerChoice(){
    return Math.floor(Math.random() * 3);
};

function translateThrowString(throwString){
    throwString = throwString.toLowerCase();
    let throwIndex = THROW_INDEX.indexOf(throwString);
    if(throwIndex == -1){
        alert("invalid throwString. Please choose from 'rock', 'paper', or 'scissors'.");
    }else{
        return throwIndex;
    }
};

function evaluateThrow(playerThrow, computerThrow){
    if(playerThrow == computerThrow){
        return "draw";
    }else if(
        playerThrow == ++computerThrow || 
        playerThrow == 0 && computerThrow == 2
    ){
        return "win";
    }else{
        return "loss";
    }
}

function playRound(){
    let computerThrow = getComputerChoice()
    let playerThrow = translateThrowString(prompt("What do you throw?"))
    let outcome = evaluateThrow(playerThrow, computerThrow)
    console.log(outcome + ". You threw " + THROW_INDEX[playerThrow] + ", the computer threw " + THROW_INDEX[computerThrow])
    return outcome
}

function playGame(){
    let gameLength = prompt("how long would you like the game to last?");
    let winCount = 0;
    let lossCount = 0;
    let drawCount = 0;
    for(let i = 0; i < gameLength; i++){
        switch(playRound()){
            case "win": winCount++; break;
            case "loss": lossCount++; break;
            case "draw": drawCount++; break;
        };
    };
    console.log("Game over! You won " + winCount + " times, lost " + lossCount + " times, and drew " + drawCount + " times. Thanks for playing!")
}