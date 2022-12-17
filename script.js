const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

//increase snake size
class snakePart {
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}

//add event listener to let user control snake 
document.addEventListener('keydown', keyDown);

//speed of screen updating
let speed = 7;

//snake head
let tileCount = 20;
let tileSize = canvas.clientWidth/tileCount - 2;
let headX = 10;
let headY = 10;

//initial snake speed
let xvelocity = 0;
let yvelocity = 0;

//draw apple
let appleX = 5;
let appleY = 5;

const snakePartsArray = []; //array to store snake part 
let tailLength = 2; //initial start of snake 

//scores
let score = 0;

function drawGame() {
    changeSnakePostion(); //snake position after user input
    let result = isGameOver(); //set gameover function in result
    if(result){ //check if gameover function return any responds (can only return equals true)
        return; //when return game over = true, then stop following the function
    }
    clearScreen();
    drawSnake(); //display snake on canvas
    drawFood(); //display food on canvas

    checkEat(); //check snake and food at same position, if same = ate = random spawn food on play area
    drawScore(); //display score
    setTimeout(drawGame, 1000/speed); //update screen 7 times a second. 
}

function isGameOver(){
    let gameOver = false;
    
    //check if the game has started ie. if the snake started moving
    if(yvelocity===0 && xvelocity===0){
        return false;
    }

    if(headX < 0){ //check if snake hit left side of wall
        gameOver = true;
    }

    else if(headX === tileCount){ //check if snake hit right side of wall
        gameOver = true;
    }

    else if(headY < 0){ //check if snake hit top of wall
        gameOver = true;
    }

    else if (headY === tileCount){ //check if snake hit bottom of wall
        gameOver = true;
    }

        //check if snake hit himself
    for(let i=0; i<snakePartsArray.length; i++) {
            let part = snakePartsArray[i];
                // if snake hit himself, it will trigger game over to be true
                if(part.x === headX && part.y === headY){
                    gameOver = true;
                    break; //break loop
                }
        }

    if(gameOver){
        context.fillStyle = "red";
        context.font = "50px verdana";
        context.fillText("Game Over!", canvas.clientWidth/6.5, canvas.clientHeight/2);
    }

    return gameOver;

}

function drawScore() {
    context.fillStyle = "white" //set text color as white
    context.font = "10px verdana" //set text size and font 
    //position of text, user screen width - 50 and height of 10)
    context.fillText("Score: "+ score, canvas.clientWidth - 50, 10);
}

function clearScreen(){
    context.fillStyle = 'black';
    context.fillRect(0,0, canvas.clientHeight,canvas.clientWidth);
}

function drawSnake(){
    //drawing snake body
        context.fillStyle = "green";
        //loop through snakepart array
        for (let i=0; i<snakePartsArray.length; i++){
            let part = snakePartsArray[i]
            //fill in snake body as green
                context.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
        }
        //put item at the end of list next to head
        snakePartsArray.push(new snakePart (headX, headY));
        //when ate food, array from 0 become 1, then i = 0, so smaller than array. so generate body part, wait till user ate another food, then repeat
        if(snakePartsArray.length>tailLength){
            snakePartsArray.shift();//remove furthest item from  snake part if we have more than our tail size
        }

          //drawing the snake head
          context.fillStyle = "orange";
          context.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePostion() {

    headX = headX + xvelocity;
    headY = headY + yvelocity;

}

function drawFood(){

    context.fillStyle = "red";
    context.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);

}

function checkEat() {
    if(appleX == headX && appleY == headY) //if snake head = apple position = ate
    {
        appleX = Math.floor(Math.random()*tileCount); //random generate appleX position
        appleY = Math.floor(Math.random()*tileCount); //random generate appleY position
        
        tailLength++; //increase tail length
        score++; //increase score value
    }
}

//since it is a 2D canvas/ 2D game, we can imagine it being on a flat surface, using x as horizon and y as vertical
function keyDown(event){
    
    //up arrow 
    if (event.keyCode == 38) //keyCode means the number for each key on keyboard
    {
        if(yvelocity == 1)
        return; //prevent snake from moving in opposite direction e.g moving into itself
        xvelocity = 0;
        yvelocity = -1; //move up 1 tile
    }

    //down arrow
    if (event.keyCode == 40) 
    {
        if(yvelocity == -1)
        return; //prevent snake from moving in opposite direction e.g moving into itself
        xvelocity = 0;
        yvelocity = 1; //move down 1 tile
    }

    //left arrow
    if (event.keyCode == 37)
    {
        if(xvelocity == 1)
        return; //prevent snake from moving in opposite direction e.g moving into itself
        xvelocity = -1; //move left 1 tile
        yvelocity = 0;
    }

    //right arrow
    if (event.keyCode == 39)
    {
        if(xvelocity == -1)
        return; //prevent snake from moving in opposite direction e.g moving into itself
        xvelocity = 1; //move right 1 tile
        yvelocity = 0;
    }
}

drawGame();