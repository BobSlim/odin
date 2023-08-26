"use strict";

const THROW_INDEX = ["rock", "paper", "scissors"];

let winCount = 0
let lossCount = 0

let selectedButton = "rock"

const btn_rock = document.querySelector("#rock")
const btn_scissors = document.querySelector("#scissors")
const btn_paper = document.querySelector("#paper")

btn_rock.addEventListener("click", () => {animate(0)}) 
btn_paper.addEventListener("click", () => {animate(1)})
btn_scissors.addEventListener("click", () => {animate(2)})

const img_playerHand = document.querySelector("#playerHand");
const img_enemyHand = document.querySelector("#enemyHand");

const div_score = document.querySelector(".score")
const div_playerScore = document.querySelector("#playerScore")
const div_enemyScore = document.querySelector("#enemyScore")

img_playerHand.addEventListener("animationend", () => {handleAnimationEnd()})

function setButtonDisabledState(state){
    btn_rock.disabled = state;
    btn_scissors.disabled = state;
    btn_paper.disabled = state;
}



function handleAnimationEnd(){
    //dostuff
}

function animateElement(htmlElement, animation = ''){
    htmlElement.classList.remove(animation);
    void htmlElement.offsetWidth;
    htmlElement.classList.add(animation);
}

function playRound(playerThrow){
    let computerThrow = getComputerChoice()
    let outcome = evaluateThrow(playerThrow, computerThrow)

    switchImage(img_playerHand, playerThrow);
    switchImage(img_enemyHand, computerThrow);
    
    switch(outcome){
        case "win": 
            winCount++;
            div_playerScore.textContent = winCount;
            animateElement(div_playerScore,'punch')
            break;
        case "loss": 
            lossCount++; 
            div_enemyScore.textContent = lossCount;
            animateElement(div_enemyScore,'punch')
            break;
    };

    setButtonDisabledState(false);

    let gameEndState = 0;

    if(winCount >= 5){
        gameEndState = 1;
    }else if(lossCount >= 5){
        gameEndState = 2;
    }else{
        gameEndState = 0;
    };

    if(gameEndState){
        endGame(gameEndState);
    }
};

function switchImage(targetImage, stanceIndex){
    switch(stanceIndex){
        case 0:
            targetImage.setAttribute("src", "images/rock.png");
            break;
        case 1:
            targetImage.setAttribute("src", "images/paper.png");
            break;
        case 2:
            targetImage.setAttribute("src", "images/scissors.png");
            break;
        default:
            break;
    }
}

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
    };
};

function animate(selectedButton){
    setButtonDisabledState(true);

    animateElement(img_playerHand, 'playerAnimate')
    img_playerHand.setAttribute("src", "images/rock.png")

    animateElement(img_enemyHand, 'enemyAnimate')
    img_enemyHand.setAttribute("src", "images/rock.png")

    setTimeout(playRound, 2000, selectedButton);
};

function evaluateThrow(playerThrow, computerThrow){
    if(playerThrow == computerThrow){
        return "draw";
    }else if(
        playerThrow == computerThrow + 1 || 
        playerThrow == 0 && computerThrow == 2
    ){
        return "win";
    }else{
        return "loss";
    };
};

function endGame(endState){
    setButtonDisabledState(true);
    let gameWinString = "UNDEFINED"
    if(endState == 1){
        gameWinString = "YOU WIN!"
    }else{
        gameWinString = "YOU LOSE!"
    }
    div_score.textContent = gameWinString + " Please refresh to play again!"
};