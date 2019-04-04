// Variable Declaration

var canvas = document.getElementById("myCanvas");
var highscore = document.getElementById("highscore");
var ctx = canvas.getContext("2d");
var direction, snake, score, food;

// listen to keyboard events to move the snake

document.addEventListener("keydown", direction);

function direction(event) {
  let key = event.keyCode;
  if (key == 37 && direction != "RIGHT") {
    direction = "LEFT";
  } else if (key == 38 && direction != "DOWN") {
    direction = "UP";
  } else if (key == 39 && direction != "LEFT") {
    direction = "RIGHT";
  } else if (key == 40 && direction != "UP") {
    direction = "DOWN";
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
function eatFood(){
  var lastball = snake[snake.length - 1];
  if (lastball.x == food.x * 20 && lastball.y == food.y * 20) {
    score++;
    add();
    createFood();
  }
}

function game() {
  ctx.clearRect(0, 0, 888, 555);
  snake.shift();
  add();
  eatFood();

  for (var i = 0; i < snake.length; i++) {
    ball = snake[i];
    if (i == snake.length - 1) {
      ctx.fillStyle = "lightgreen";
    } else {
      ctx.fillStyle = "#ff0000";
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
    // draw the snake

    ctx.fillRect(ball.x, ball.y, 19, 19);
  }
  // draw the food

  ctx.fillRect(food.x * 20, food.y * 20, 19, 19);
}
// start the game

setInterval(game, 250);
