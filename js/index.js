
//Game constants & variable
let inputDir = {x:0, y: 0};
const foodSound = new Audio('https://github.com/omkarmraskar/Snake-Game/blob/main/music/food.mp3?raw=true');
const gameOverSound = new Audio('https://github.com/omkarmraskar/Snake-Game/blob/main/music/gameover.mp3?raw=true');
const moveSound = new Audio('https://github.com/omkarmraskar/Snake-Game/blob/main/music/move.mp3?raw=true');
let speed = 2;
let lastPaintTime = 0;
let score = 0;
let HighScore = 0;
let lastInputDirection = inputDir;
let snakeArr = [
    {x: 13, y:15}
];
let food = {x:13, y:16};

//Game Function
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    
    //if you bump into yourself
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    //If you bump into the wall;
    if(snake[0].x >= 30 || snake[0].x <= 0 || snake[0].y >= 30 || snake[0].y <= 0){
        return true;
    }
}

function gameEngine(){

    
    //Part 1 Updating the snake array
    if(isCollide(snakeArr)){
        gameOverSound.play();
        location.reload();
        alert("Game Over. Press Any Key to Play");
        snakeArr = [{x: 13, y:15}];
        score = 0;
    }

    //If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        speed+=0.25;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score; 
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
        let a = 2;
        let b = 28;
        food = {x: Math.round(a + (b - a)*Math.random()), y: Math.round(a + (b - a)*Math.random())}
    }

    //Moving The Snake
    for (let i = snakeArr.length - 2; i>=0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Part 2 Display the snake and food;

    //Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
            if(inputDir.x == 1){
                snakeElement.style.transform = "rotate(-90deg)";
            }else if(inputDir.x == -1){
                snakeElement.style.transform = "rotate(90deg)";
            }
            else if(inputDir.y == -1){
                snakeElement.style.transform = "rotate(180deg)";
            }
            else if(inputDir.y == 1){
                snakeElement.style.transform = "rotate(0deg)";
            }
        }
        else{
            snakeElement.classList.add('snakeBody');
        }
        board.appendChild(snakeElement);
    });

    //Display Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement); 
}



//Main Logic

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
        
    
    switch (e.key) {
        case "ArrowUp":
            moveSound.play();
            if(lastInputDirection.y === 1) break;
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            moveSound.play();
            if(lastInputDirection.y === -1) break;
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            moveSound.play();
            if(lastInputDirection.x === 1) break;
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            moveSound.play();
            if(lastInputDirection.x === -1) break;
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
})
lastInputDirection = inputDir;
