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

function playRound(playerThrow){
    let computerThrow = getComputerChoice()
    let outcome = evaluateThrow(playerThrow, computerThrow)

    switchImage(img_playerHand, playerThrow);
    switchImage(img_enemyHand, computerThrow);
    img_playerHand.classList.remove("playerAnimate");
    void img_playerHand.offsetWidth
    img_enemyHand.classList.remove("enemyAnimate");
    void img_enemyHand.offsetWidth

    switch(outcome){
        case "win": 
            winCount++;
            div_playerScore.textContent = winCount;
            div_playerScore.classList.remove("punch")
            void div_playerScore.offsetWidth;
            div_playerScore.classList.add("punch")
            break;
        case "loss": 
            lossCount++; 
            div_enemyScore.textContent = lossCount;

            div_enemyScore.classList.remove("punch")
            void div_enemyScore.offsetWidth;
            div_enemyScore.classList.add("punch")
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

    img_playerHand.classList.add("playerAnimate");
    img_playerHand.setAttribute("src", "images/rock.png")
    img_enemyHand.classList.add("enemyAnimate");
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