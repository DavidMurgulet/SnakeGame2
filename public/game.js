const gameBoard = document.querySelector(".game-board");



let foodX, foodY;
let snakeX, snakeY;
let velocityX = 0, velocityY = 0; 
let snakeBody = [];
let gameEnd = false;
let setIntervalId; 
snakeY = 15;
snakeX = 3;


const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over!");
    location.reload();
}

const initGame = () => {
    if (gameEnd) {
        return handleGameOver();
    }
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    htmlMarkup += `<div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;


    if (snakeX == foodX && snakeY == foodY) {
        changeFoodPos();
        snakeBody.push([foodX, foodY]);
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i -1]; 
        
    }

    snakeBody[0] = [snakeX, snakeY]; 

    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameEnd = true;
    }

    for (let i = 0; i < snakeBody.length; i++)  {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0] }"></div>`;
        if (i != 0 && snakeBody[0][1] == snakeBody[i][1] && snakeBody[0][0] == snakeBody[i][0])
        gameEnd = true;
    }

    gameBoard.innerHTML = htmlMarkup;
} 

const changeDirection = (e) => {
    if (e.key == "ArrowUp" && velocityY != -1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != -1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

const changeFoodPos = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

changeFoodPos();
setIntervalId = setInterval(initGame, 150);
document.addEventListener("keydown", changeDirection);