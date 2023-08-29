// Variable Declaration

var canvas = document.getElementById("myCanvas");
var highscore = document.getElementById("highscore");
var ctx = canvas.getContext("2d");
var direction, snake, score, food; 
let allScore = [];
let allHighScore = [];

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";


// listen to keyboard events to move the snake

document.addEventListener("keydown", direction);

function direction(event) {
  let key = event.keyCode;
  if (key == 37 && direction != "RIGHT") {
    direction = "LEFT";
    left.play();
  } else if (key == 38 && direction != "DOWN") {
    direction = "UP";
    up.play();
  } else if (key == 39 && direction != "LEFT") {
    direction = "RIGHT";
    right.play();
  } else if (key == 40 && direction != "UP") {
    direction = "DOWN";
    down.play();
  }
}

// initialize the game

function init() {
  direction = "RIGHT";
  score = 0;
  snake = [{ x: 40, y: 40 }, { x: 60, y: 40 }, { x: 80, y: 40 }];
  createFood();
}
// create food
function createFood() {
  food = {
    x: Math.floor(Math.random() * 39),
    y: Math.floor(Math.random() * 24)
  };
}

init();

// Create  Snake Movement

function add() {
  var lastball = snake[snake.length - 1];
  if (direction == "RIGHT") {
    snake.push({ x: lastball.x + 20, y: lastball.y });
  }
  if (direction == "DOWN") {
    snake.push({ x: lastball.x, y: lastball.y + 20 });
  }
  if (direction == "LEFT") {
    snake.push({ x: lastball.x - 20, y: lastball.y });
  }

  if (direction == "UP") {
    snake.push({ x: lastball.x, y: lastball.y - 20 });
  }
}

// How the snake eat the food

function eatFood() {
  var lastball = snake[snake.length - 1];
  if (lastball.x == food.x * 20  && lastball.y  == food.y*20 ) {
    eat.play()
    score++;
    add();
    createFood();
  }
}
// launch game function 
function game() {
  ctx.clearRect(0, 0, 888, 555);
  snake.shift();
  add();
  eatFood();
  var lastball = snake[snake.length - 1];

  for (var i = 0; i < snake.length; i++) {
    ball = snake[i];
    if (i == snake.length - 1) {
      ctx.fillStyle = "lightgreen";
    } else {
      ctx.fillStyle = "#ffa500";
    }

    if (ball.x > 780) {
      ball.x = 0;
    }

    if (ball.x < 0) {
      ball.x = 780;
    }
    if (ball.y > 480) {
      ball.y = 0;
    }
    if (ball.y < 0) {
      ball.y = 480;
    }
    // Game-Over Conditions

    if (lastball.x == ball.x && lastball.y == ball.y && i < snake.length - 2) {
      dead.play()
      alert(" Game Over  Try again " + score);

       // Calculate The Current High Score

      localStorage.setItem("score", score);
      var currentScore = Math.max([localStorage].map(x => x.score));
      allScore.push(currentScore);
      let bestScore = Math.max(...allScore);
      highscore.innerHTML = `${bestScore}`

    
      init();
    }

    // draw the snake

    ctx.fillRect(ball.x, ball.y, 19, 19);
  }
  // draw the food

  ctx.fillRect(food.x * 20, food.y * 20, 19, 19);

  // Current Score

  ctx.fillStyle = "black";
  ctx.font = "20px Changa one";
  ctx.fillText(" Your Score : " + score, 60, 500);
}
// start the game

setInterval(game, 50);
